"use client";
import { useEffect, useRef } from "react";

const COLS = ["#eda60e", "#96d0c2", "#800d10", "#b4d030", "#ec6d5e"];
const DARK = ["#341004", "#2d6562", "#ec6d5e", "#546603", "#800d10"];

/** Pseudo-random but stable per flag, so server and client render the same thing. */
const rnd = (i: number, k: number) => {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** One frame of a cloth-like pennant: straight top edge on the string, curved sides, swinging tip. */
function shape(x: number, y: number, w: number, dx: number, b1: number, b2: number) {
  const h = 40, l = x - w / 2, r = x + w / 2, tx = x + dx, ty = y + h - Math.abs(dx) * 0.25;
  return `M${l.toFixed(1)} ${y.toFixed(1)} L${r.toFixed(1)} ${y.toFixed(1)} Q${(x + w / 4 + b1).toFixed(1)} ${(y + h * 0.5).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)} Q${(x - w / 4 + b2).toFixed(1)} ${(y + h * 0.5).toFixed(1)} ${l.toFixed(1)} ${y.toFixed(1)}Z`;
}
/** The inner chevron band that rides on the cloth. */
function band(x: number, y: number, w: number, dx: number) {
  const h = 40, t = 0.42, p = (f: number) => [x + dx * f, y + h * f] as const;
  const a = p(t), b = p(t + 0.16), half = (w / 2) * (1 - t), half2 = (w / 2) * (1 - t - 0.16);
  return `M${(a[0] - half).toFixed(1)} ${a[1].toFixed(1)} L${(b[0]).toFixed(1)} ${(b[1] + 4).toFixed(1)} L${(a[0] + half).toFixed(1)} ${a[1].toFixed(1)} L${(a[0] + half2).toFixed(1)} ${(a[1] + 3).toFixed(1)} L${b[0].toFixed(1)} ${(b[1] + 9).toFixed(1)} L${(a[0] - half2).toFixed(1)} ${(a[1] + 3).toFixed(1)}Z`;
}

export function Bunting() {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) svg.current?.pauseAnimations();
  }, []);

  const n = 30;
  const items = Array.from({ length: n }, (_, i) => {
    const x = ((i + 0.5) * 1440) / n, t = x / 1440, y = 10 + 4 * t * (1 - t) * 36, w = (1440 / n) * 0.78;
    const bx = x + 720 / n, by = 10 + 4 * (bx / 1440) * (1 - bx / 1440) * 36;
    const amp = 4 + rnd(i, 1) * 4;
    const swing = [-amp, amp * 0.7, -amp * 0.4, amp, -amp];
    const bulge = [3, -4, 2, -3, 3].map((v) => v * (0.6 + rnd(i, 2) * 0.6));
    const frames = swing.map((dx, k) => shape(x, y, w, dx, bulge[k], -bulge[(k + 2) % 5])).join(";");
    const bands = swing.map((dx) => band(x, y, w, dx)).join(";");
    const dur = (1.6 + rnd(i, 3) * 1.1).toFixed(2);
    const begin = (-rnd(i, 4) * 3).toFixed(2);
    return { x, y, w, bx, by, c: COLS[i % 5], dk: DARK[i % 5], i, frames, bands, dur, begin, first: shape(x, y, w, swing[0], bulge[0], -bulge[2]), firstBand: band(x, y, w, swing[0]) };
  });

  const spline = "0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1";
  return (
    <svg ref={svg} className="bunting" viewBox="0 0 1440 92" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="bsheen" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".45" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" values="-1 0;1 0;1 0" keyTimes="0;.6;1" dur="2.8s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <path className="bstring" d="M0 10 Q 720 46 1440 10" fill="none" stroke="#d9b56a" strokeWidth="2" pathLength={1} />
      {items.map((f) => (
        <g key={f.i}>
          <g className="bdrop" style={{ ["--i" as string]: f.i }}>
            <g className="bflag" style={{ ["--i" as string]: f.i }}>
              <path d={f.first} fill={f.c}>
                <animate attributeName="d" values={f.frames} dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" calcMode="spline" keySplines={spline} />
              </path>
              <path d={f.firstBand} fill={f.dk} opacity=".55">
                <animate attributeName="d" values={f.bands} dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" calcMode="spline" keySplines={spline} />
              </path>
              <path d={f.first} fill="url(#bsheen)">
                <animate attributeName="d" values={f.frames} dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" calcMode="spline" keySplines={spline} />
              </path>
            </g>
          </g>
          <circle cx={f.bx} cy={f.by} r="3" fill="#ffe7a6" className="bulb" style={{ ["--i" as string]: f.i }} />
        </g>
      ))}
    </svg>
  );
}
