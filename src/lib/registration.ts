export type Registration = {
  name: string;
  phone: string;
  email?: string;
  days: string[];
  sessions: "Mornings" | "Evenings" | "Mornings and evenings";
  group: string;
  firstTime: string;
  submittedAt: string;
};

/**
 * Saves a registration. The storage choice is still open, so this is the single swap point:
 * set NEXT_PUBLIC_REGISTRATION_ENDPOINT (any URL that accepts a JSON POST — a Google Apps Script
 * web app, a Supabase function, Formspree, etc.) and every registration is sent there.
 * With no endpoint set, the form still works and people still get their I'm Attending card,
 * but nothing is stored.
 */
export async function saveRegistration(r: Registration): Promise<{ ok: boolean; stored: boolean }> {
  const url = process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT;
  if (!url) return { ok: true, stored: false };
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) });
    return { ok: res.ok, stored: res.ok };
  } catch {
    return { ok: false, stored: false };
  }
}
