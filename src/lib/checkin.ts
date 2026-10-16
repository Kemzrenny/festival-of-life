/**
 * Daily check-in storage: Google Sheet via a small Apps Script web app (docs/checkin-sheet.gs).
 * Set CHECKIN_SHEET_WEBHOOK to the web-app URL. The script blocks duplicates (same name, same day, same session)
 * and adds every check-in as a row. With no URL set, check-in shows "not switched on yet".
 * CHECKIN_DEV_MEMORY=1 keeps check-ins in memory for local testing only.
 */

export type Session = "morning" | "evening";
export type Mode = "onsite" | "online";

export type CheckinResult =
  | { ok: true; name: string; session: Session; mode: Mode; date: string }
  | { ok: false; reason: "duplicate" | "invalid" | "not-configured" | "error"; message: string };

const SHEET = process.env.CHECKIN_SHEET_WEBHOOK || "";
const MEMORY = process.env.CHECKIN_DEV_MEMORY === "1";

/** Today's date in Lagos (WAT, UTC+1, no daylight saving). */
export function watNow() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  return { date: d.toISOString().slice(0, 10), iso: new Date().toISOString() };
}

/** Same name = same person; different spelling or extra names = different people. Case and spacing are ignored. */
export const normaliseName = (n: string) => n.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
export const cleanName = (n: string) => n.normalize("NFKC").replace(/\s+/g, " ").trim();

export const sessionLabel = (s: Session) => (s === "morning" ? "Morning (9 AM)" : "Evening (5 PM)");

const mem = globalThis as unknown as { __folCheckins?: Map<string, Set<string>> };
const memStore = () => (mem.__folCheckins ??= new Map());

export const isConfigured = () => Boolean(SHEET || MEMORY);

export async function checkIn(rawName: string, session: Session, mode: Mode): Promise<CheckinResult> {
  const name = cleanName(rawName);
  if (name.length < 2 || name.length > 60) return { ok: false, reason: "invalid", message: "Please enter your name." };
  if (session !== "morning" && session !== "evening") return { ok: false, reason: "invalid", message: "Pick the morning or evening session." };
  if (mode !== "onsite" && mode !== "online") return { ok: false, reason: "invalid", message: "Tell us if you're joining onsite or online." };
  if (!isConfigured()) return { ok: false, reason: "not-configured", message: "Check-in isn't switched on yet. Please speak to an usher." };

  const { date, iso } = watNow();
  const dup: CheckinResult = { ok: false, reason: "duplicate", message: `${name} is already checked in for this ${session}'s session.` };

  try {
    if (SHEET) {
      const res = await fetch(SHEET, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ date, session: sessionLabel(session), name, mode: mode === "onsite" ? "Onsite" : "Online", time: iso }),
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      const r = (await res.json()) as { ok: boolean; duplicate?: boolean };
      if (r.duplicate) return dup;
      if (!r.ok) throw new Error("Sheet refused");
      return { ok: true, name, session, mode, date };
    }
    const k = `${date}:${session}`, store = memStore();
    const set = store.get(k) ?? new Set<string>(); store.set(k, set);
    const id = normaliseName(name);
    if (set.has(id)) return dup;
    set.add(id);
    return { ok: true, name, session, mode, date };
  } catch {
    return { ok: false, reason: "error", message: "We couldn't check you in just now. Check your connection and try again." };
  }
}

/** Wakes the Apps Script up (it can take a few seconds to start after a quiet spell). */
export async function warmUp() {
  if (!SHEET) return;
  await fetch(SHEET, { cache: "no-store", redirect: "follow", signal: AbortSignal.timeout(10000) }).catch(() => undefined);
}
