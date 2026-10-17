"use client";
import { useEffect, useRef, useState } from "react";
import { song } from "@/content/site";

/** Plays the official festival audio on tap (never autoplays). Loops until paused. */
export function SoundPlayer() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");

  useEffect(() => () => { audio.current?.pause(); }, []);

  async function toggle() {
    if (!audio.current) {
      const a = new Audio(song.src);
      a.loop = true; a.preload = "auto";
      a.addEventListener("playing", () => setState("playing"));
      a.addEventListener("pause", () => setState("paused"));
      a.addEventListener("waiting", () => setState("loading"));
      audio.current = a;
    }
    const a = audio.current;
    if (!a.paused) { a.pause(); return; }
    setState("loading");
    try { await a.play(); } catch { setState("idle"); }
  }

  const playingNow = state === "playing";
  return (
    <button type="button" className={`sound${playingNow ? "" : " paused"}`} onClick={toggle}
      aria-label={playingNow ? `Pause the ${song.title.toLowerCase()}` : `Play the ${song.title.toLowerCase()}`}>
      <span className="pb">
        {playingNow
          ? <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0h4v14H0zM8 0h4v14H8z" /></svg>
          : <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>}
      </span>
      <span className="t"><b>{song.title}</b><small>{state === "loading" ? "Loading…" : song.artist}</small></span>
      <span className="eq" aria-hidden="true"><i /><i /><i /></span>
      <span className="mt" aria-hidden="true">{playingNow ? "Playing festival sound" : state === "loading" ? "Loading…" : "Play festival sound"}</span>
    </button>
  );
}
