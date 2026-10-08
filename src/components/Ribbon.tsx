"use client";
import { useEffect, useId, useRef } from "react";

type Props = {
  big: string; small: string; c1: string; c2: string; t1: string; t2: string;
  d: string; reverse?: boolean; bg: string; label?: string;
};

export function Ribbon({ big, small, c1, c2, t1, t2, d, reverse, bg, label }: Props) {
  const id = useId().replace(/:/g, "");
  const bigRef = useRef<SVGTextPathElement>(null);
  const smallRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tps = [bigRef.current, smallRef.current];
    const reps = [8, 14];
    const seg = [600, 600], off = [0, 0];
    const measure = () =>
      tps.forEach((tp, i) => {
        try { seg[i] = (tp!.parentNode as SVGTextElement).getComputedTextLength() / reps[i]; } catch { /* keep default */ }
      });
    let raf = 0, last = performance.now(), visible = true;
    const loop = (now: number) => {
      const dt = Math.min(50, now - last); last = now;
      if (visible) tps.forEach((tp, i) => {
        const sp = (i === 1 ? 0.05 : 0.035) * (reverse ? -1 : 1) * (i === 0 ? -1 : 1);
        off[i] = (off[i] + dt * sp) % seg[i];
        tp!.setAttribute("startOffset", (off[i] - seg[i]).toFixed(1));
      });
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(tps[0]!.ownerSVGElement!);
    document.fonts.ready.then(() => {
      measure();
      if (reduce) tps.forEach((tp, i) => tp!.setAttribute("startOffset", String(-seg[i] / 2)));
      else raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [reverse]);

  return (
    <div className="ribbon" style={{ ["--rb-bg" as string]: bg }} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 1600 310" preserveAspectRatio="xMidYMid slice">
        <defs>
          <path id={`a${id}`} d={d} />
          <path id={`b${id}`} d={d} transform="translate(0 62)" />
        </defs>
        <use href={`#b${id}`} stroke={c2} strokeWidth="40" fill="none" />
        <text fontSize="21" fill={t2} dy="7"><textPath ref={smallRef} href={`#b${id}`}>{small.repeat(14)}</textPath></text>
        <use href={`#a${id}`} stroke={c1} strokeWidth="84" fill="none" />
        <text fontSize="50" fill={t1} dy="17"><textPath ref={bigRef} href={`#a${id}`}>{big.repeat(8)}</textPath></text>
      </svg>
    </div>
  );
}
