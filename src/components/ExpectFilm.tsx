"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { event, expect } from "@/content/site";
import { RegisterButton } from "./RegisterButton";

const DUR = [...expect.map((e) => e.ms), 5000];
const NAMES = [...expect.map((e) => e.label), "The celebration"];

export function ExpectFilm() {
  const film = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLElement | null)[]>([]);
  const [cur, setCur] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const st = useRef({ cur: 0, t0: 0, elapsed: 0, raf: 0, playing: false });

  const show = useCallback((i: number) => {
    st.current.cur = i; st.current.elapsed = 0; st.current.t0 = performance.now();
    setCur(i); setNonce((n) => n + 1);
    fills.current.forEach((f, k) => { if (f) f.style.width = k < i ? "100%" : "0%"; });
  }, []);

  const frame = useCallback((now: number) => {
    const s = st.current; if (!s.playing) return;
    const e = s.elapsed + (now - s.t0);
    const f = fills.current[s.cur]; if (f) f.style.width = Math.min(100, (e / DUR[s.cur]) * 100) + "%";
    if (e >= DUR[s.cur]) {
      if (s.cur < DUR.length - 1) show(s.cur + 1);
      else { s.playing = false; s.elapsed = DUR[s.cur]; setPlaying(false); return; }
    }
    s.raf = requestAnimationFrame(frame);
  }, [show]);

  const play = useCallback(() => {
    const s = st.current;
    if (s.cur === DUR.length - 1 && s.elapsed >= DUR[s.cur] - 50) show(0);
    s.playing = true; s.t0 = performance.now(); setPlaying(true); setStarted(true);
    s.raf = requestAnimationFrame(frame);
  }, [frame, show]);

  const pause = useCallback(() => {
    const s = st.current; if (!s.playing) return;
    s.elapsed += performance.now() - s.t0; s.playing = false; cancelAnimationFrame(s.raf); setPlaying(false);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let auto = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && e.intersectionRatio > 0.5) { if (!auto) { auto = true; play(); } }
      else pause();
    }, { threshold: [0, 0.5, 0.8] });
    io.observe(film.current!);
    const state = st.current;
    return () => { io.disconnect(); cancelAnimationFrame(state.raf); };
  }, [play, pause]);

  const cls = `film${started ? " playing" : ""}${started && !playing ? " paused" : ""}`;
  return (
    <div className={cls} ref={film} style={{ ["--dur" as string]: DUR[cur] + "ms" }} aria-roledescription="walk-through film">
      {expect.map((s, i) => (
        <div key={i === cur ? `${i}-${nonce}` : i} className={`scene${i === cur ? " on" : ""}`} data-k={s.kind} aria-hidden={i !== cur}>
          <img src={s.image} alt={s.alt} loading="lazy" />
          <div className="cap"><span className="n">{s.label}</span><h3>{s.title}</h3><p>{s.text}</p></div>
        </div>
      ))}
      <div key={cur === 3 ? `e-${nonce}` : "e"} className={`scene end${cur === 3 ? " on" : ""}`} aria-hidden={cur !== 3}>
        <div className="endcard">
          <img src="/assets/logo.png" alt="Festival of Life" />
          <h3>Then the celebration begins.</h3>
          <p>Mornings 9AM · Evenings 5PM · {event.dates}</p>
          <RegisterButton>I&apos;m attending</RegisterButton>
        </div>
      </div>
      <div className="film-ui">
        <div className="bars">
          {NAMES.map((n, i) => (
            <button key={n} type="button" aria-label={`Scene ${i + 1}: ${n}`} onClick={() => { show(i); if (!st.current.playing) { setStarted(true); } }}>
              <span><i ref={(el) => { fills.current[i] = el; }} /></span>
            </button>
          ))}
        </div>
        <button className="fplay" type="button" onClick={() => (playing ? pause() : play())} aria-label={playing ? "Pause walk-through" : "Play walk-through"}>
          {playing
            ? <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0h4v14H0zM8 0h4v14H8z" /></svg>
            : <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>}
        </button>
      </div>
    </div>
  );
}
