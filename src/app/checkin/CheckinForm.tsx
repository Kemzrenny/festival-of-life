"use client";
import { useCallback, useEffect, useState } from "react";
import { days, event } from "@/content/site";

type Session = "morning" | "evening";
type Counts = { date: string; morning: number | null; evening: number | null };

const VERSES = [
  { t: "But You, O Lord, are a shield for me, my glory and the One who lifts up my head.", r: "Psalm 3:3" },
  { t: "The Lord is my strength and my shield; my heart trusted in Him, and I am helped.", r: "Psalm 28:7" },
  { t: "This is the day the Lord has made; we will rejoice and be glad in it.", r: "Psalm 118:24" },
  { t: "I was glad when they said to me, “Let us go into the house of the Lord.”", r: "Psalm 122:1" },
  { t: "In Your presence is fullness of joy; at Your right hand are pleasures forevermore.", r: "Psalm 16:11" },
  { t: "Arise, shine; for your light has come! And the glory of the Lord is risen upon you.", r: "Isaiah 60:1" },
  { t: "Do not sorrow, for the joy of the Lord is your strength.", r: "Nehemiah 8:10" },
  { t: "The Lord bless you and keep you; the Lord make His face shine upon you, and be gracious to you.", r: "Numbers 6:24–25" },
  { t: "For the earth will be filled with the knowledge of the glory of the Lord, as the waters cover the sea.", r: "Habakkuk 2:14" },
  { t: "Now to Him who is able to do exceedingly abundantly above all that we ask or think.", r: "Ephesians 3:20" },
];

/** Lagos time: WAT is UTC+1 all year. */
function wat() {
  const d = new Date(Date.now() + 36e5);
  return { iso: d.toISOString().slice(0, 10), hour: d.getUTCHours(), d };
}

function dayLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  const long = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
  const short = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  const idx = days.findIndex((x) => x.date === short) ;
  const isFestival = idx >= 0 && iso.startsWith(String(event.year));
  return { long, festivalDay: isFestival ? idx + 1 : 0 };
}

export function CheckinForm() {
  const [session, setSession] = useState<Session>("morning");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<{ name: string; session: Session; verse: (typeof VERSES)[number] } | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [today, setToday] = useState<{ long: string; festivalDay: number } | null>(null);

  const refresh = useCallback(() => {
    fetch("/api/checkin", { cache: "no-store" }).then((r) => r.json()).then(setCounts).catch(() => undefined);
  }, []);

  useEffect(() => {
    const w = wat();
    setSession(w.hour < 14 ? "morning" : "evening");
    setToday(dayLabel(w.iso));
    refresh();
    const t = setInterval(refresh, 30000);
    return () => clearInterval(t);
  }, [refresh]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setErr("Please enter your name.");
    setBusy(true); setErr("");
    try {
      const res = await fetch("/api/checkin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, session }) });
      const data = await res.json();
      if (!data.ok) setErr(data.message || "Something went wrong. Please try again.");
      else {
        setDone({ name: data.name, session, verse: VERSES[Math.floor(Math.random() * VERSES.length)] });
        refresh();
      }
    } catch {
      setErr("We couldn't reach the check-in desk. Check your connection and try again.");
    }
    setBusy(false);
  }

  const again = () => { setDone(null); setName(""); setErr(""); };
  const sessions: { id: Session; label: string; time: string }[] = [
    { id: "morning", label: "Morning", time: `${event.morning}` },
    { id: "evening", label: "Evening", time: `${event.evening}` },
  ];

  return (
    <main className="ci">
      <div className="ci-card">
        <header className="ci-head">
          <img src="/assets/logo.webp" alt="Festival of Life" width={800} height={674} />
          <div>
            <p className="ci-eyebrow">Daily check-in</p>
            <h1>{today ? today.long : " "}</h1>
            <p className="ci-sub">{today?.festivalDay ? `Day ${today.festivalDay} of 5 · ` : ""}{event.theme}</p>
          </div>
        </header>

        {done ? (
          <section className="ci-done" aria-live="polite">
            <div className="ci-tick" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2>You&apos;re checked in, {done.name.split(" ")[0]}!</h2>
            <p className="ci-which">{done.session === "morning" ? "Morning session · 9 AM WAT" : "Evening session · 5 PM WAT"}</p>
            <blockquote className="ci-verse">“{done.verse.t}”<cite>{done.verse.r}</cite></blockquote>
            <button type="button" className="ci-btn ghost" onClick={again}>Check in someone else</button>
          </section>
        ) : (
          <form className="ci-form" onSubmit={submit} noValidate>
            <fieldset>
              <legend>Which session?</legend>
              <div className="ci-sessions">
                {sessions.map((s) => (
                  <label key={s.id} className={`ci-sess${session === s.id ? " on" : ""}`}>
                    <input type="radio" name="session" value={s.id} checked={session === s.id} onChange={() => setSession(s.id)} />
                    <b>{s.label}</b>
                    <span>{s.time}</span>
                    {counts && counts[s.id] !== null && <small>{counts[s.id]} checked in</small>}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="ci-field">
              <label htmlFor="ci-name">Your full name</label>
              <input id="ci-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Adaeze Okafor" maxLength={60} required />
              <p className="ci-hint">Use the same name every time you check in.</p>
            </div>
            <p className="ci-err" role="alert">{err}</p>
            <button className="ci-btn" type="submit" disabled={busy}>{busy ? "Checking in…" : "Check in"}</button>
          </form>
        )}
      </div>
      <p className="ci-foot">{event.name} {event.year} · {event.dates} · {event.city}</p>
    </main>
  );
}
