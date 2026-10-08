"use client";
import { useEffect, useState } from "react";
import { event } from "@/content/site";

function parts(ms: number) {
  ms = Math.max(0, ms);
  const d = Math.floor(ms / 864e5); ms -= d * 864e5;
  const h = Math.floor(ms / 36e5); ms -= h * 36e5;
  const m = Math.floor(ms / 6e4); ms -= m * 6e4;
  return [d, h, m, Math.floor(ms / 1e3)];
}

export function Countdown() {
  const target = new Date(event.start).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const v = now === null ? [0, 0, 0, 0] : parts(target - now);
  const labels = ["Days", "Hours", "Minutes", "Seconds"];
  return (
    <div className="clock" role="timer" aria-label="Time until the first session">
      {v.map((n, i) => (
        <div className="unit" key={i}><b suppressHydrationWarning>{String(n).padStart(2, "0")}</b><small>{labels[i]}</small></div>
      ))}
    </div>
  );
}
