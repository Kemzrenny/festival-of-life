"use client";
import { useEffect, useRef, useState } from "react";
import { symbols } from "@/content/site";
import { Glyph } from "./Glyph";

export function Symbols() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => { if (timer.current) clearInterval(timer.current); timer.current = null; };
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => { if (!matchMedia("(max-width:820px)").matches) setI((v) => (v + 1) % symbols.length); }, 3200);
    return stop;
  }, []);
  return (
    <div className="sym-row" role="group" aria-label="The ten symbols">
      {symbols.map((s, k) => (
        <button key={s.name} type="button" className="sym" aria-pressed={k === i}
          style={{ backgroundImage: `url(/assets/sym-${s.glyph}.webp)` }} aria-label={`${s.name}: ${s.line}`}
          onClick={() => { stop(); setI(k); }}
          onMouseEnter={() => { if (!matchMedia("(max-width:820px)").matches) { stop(); setI(k); } }}>
          <span className="gl"><Glyph name={s.glyph} /></span>
          <span className="vn" aria-hidden="true">{s.name}</span>
          <span className="info" aria-hidden="true"><b>{s.name}</b><span>{s.line}</span></span>
        </button>
      ))}
    </div>
  );
}
