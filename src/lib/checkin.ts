/**
 * Daily check-in storage.
 *
 * - Upstash Redis (Vercel → Storage → Upstash for Redis) is the source of truth for duplicate checks.
 *   Vercel injects KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN) when connected.
 * - Google Sheet (optional): set CHECKIN_SHEET_WEBHOOK to the Apps Script web-app URL in docs/checkin-sheet.gs.
 *   Every successful check-in is copied there as a row. If Redis isn't connected, the Sheet does the duplicate check.
 * - With neither connected, check-in returns "not set up" (CHECKIN_DEV_MEMORY=1 uses memory for local testing).
 */

export type Session = "morning" | "evening";

export type CheckinResult =
  | { ok: true; name: string; session: Session; date: string; count?: number }
  | { ok: false; reason: "duplicate" | "invalid" | "not-configured" | "error"; message: string };

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const SHEET = process.env.CHECKIN_SHEET_WEBHOOK || "";
const MEMORY = process.env.CHECKIN_DEV_MEMORY === "1";

/** Today's date and hour in Lagos (WAT, UTC+1, no daylight saving). */
export function watNow() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  return { date: d.toISOString().slice(0, 10), hour: d.getUTCHours(), iso: new Date().toISOString() };
}

/** Same name = same person; different spelling or extra names = different people. Case and spacing are ignored. */
export const normaliseName = (n: string) => n.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
export const cleanName = (n: string) => n.normalize("NFKC").replace(/\s+/g, " ").trim();

const key = (date: string, s: Session) => `fol26:checkin:${date}:${s}`;

async function redis(commands: (string | number)[][]) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  return (await res.json()) as { result: unknown; error?: string }[];
}

const mem = (globalThis as unknown as { __folCheckins?: Map<string, Set<string>> });
const memStore = () => (mem.__folCheckins ??= new Map());

async function toSheet(row: Record<string, string>, dedupe: boolean) {
  const res = await fetch(SHEET, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // Apps Script accepts plain text without a CORS preflight
    body: JSON.stringify({ ...row, dedupe }),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Sheet ${res.status}`);
  return (await res.json().catch(() => ({ ok: true }))) as { ok: boolean; duplicate?: boolean };
}

export const isConfigured = () => Boolean((REDIS_URL && REDIS_TOKEN) || SHEET || MEMORY);

export async function checkIn(rawName: string, session: Session): Promise<CheckinResult> {
  const name = cleanName(rawName);
  if (name.length < 2 || name.length > 60) return { ok: false, reason: "invalid", message: "Please enter your name." };
  if (session !== "morning" && session !== "evening") return { ok: false, reason: "invalid", message: "Pick the morning or evening session." };
  if (!isConfigured()) return { ok: false, reason: "not-configured", message: "Check-in isn't switched on yet. Please speak to an usher." };

  const { date, iso } = watNow();
  const id = normaliseName(name);
  const label = session === "morning" ? "Morning (9 AM)" : "Evening (5 PM)";
  const dup: CheckinResult = { ok: false, reason: "duplicate", message: `${name} is already checked in for this ${session}'s session.` };
  const row = { date, session: label, name, time: iso };

  try {
    if (REDIS_URL && REDIS_TOKEN) {
      const k = key(date, session);
      const [added, count] = await redis([["SADD", k, id], ["SCARD", k], ["EXPIRE", k, 60 * 60 * 24 * 120]]);
      if (added.result === 0) return dup;
      await redis([["RPUSH", `fol26:checkin:log`, JSON.stringify(row)]]).catch(() => undefined);
      if (SHEET) await toSheet(row, false).catch(() => undefined); // the Sheet is a copy; never block a check-in on it
      return { ok: true, name, session, date, count: Number(count.result) };
    }
    if (SHEET) {
      const r = await toSheet(row, true);
      if (r.duplicate) return dup;
      if (!r.ok) throw new Error("Sheet refused");
      return { ok: true, name, session, date };
    }
    const k = key(date, session), store = memStore();
    const set = store.get(k) ?? new Set<string>(); store.set(k, set);
    if (set.has(id)) return dup;
    set.add(id);
    return { ok: true, name, session, date, count: set.size };
  } catch {
    return { ok: false, reason: "error", message: "We couldn't check you in just now. Check your connection and try again." };
  }
}

export async function todaysCounts(): Promise<{ date: string; morning: number | null; evening: number | null }> {
  const { date } = watNow();
  try {
    if (REDIS_URL && REDIS_TOKEN) {
      const [m, e] = await redis([["SCARD", key(date, "morning")], ["SCARD", key(date, "evening")]]);
      return { date, morning: Number(m.result), evening: Number(e.result) };
    }
    if (MEMORY) {
      const s = memStore();
      return { date, morning: s.get(key(date, "morning"))?.size ?? 0, evening: s.get(key(date, "evening"))?.size ?? 0 };
    }
  } catch { /* fall through */ }
  return { date, morning: null, evening: null };
}
