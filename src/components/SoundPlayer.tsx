"use client";
import { useEffect, useRef, useState } from "react";
import { song } from "@/content/site";

type YTPlayer = { playVideo(): void; pauseVideo(): void };
declare global {
  interface Window { YT?: { Player: new (el: HTMLElement, o: unknown) => YTPlayer }; onYouTubeIframeAPIReady?: () => void }
}

function loadApi(): Promise<void> {
  return new Promise((res) => {
    if (window.YT?.Player) return res();
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); res(); };
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script"); s.id = "yt-api"; s.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(s);
    }
  });
}

/** Plays "Hosanna" on tap through YouTube's player, kept hidden; never autoplays. */
export function SoundPlayer() {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");

  useEffect(() => () => { player.current = null; }, []);

  async function toggle() {
    if (state === "playing") { player.current?.pauseVideo(); setState("paused"); return; }
    if (player.current) { player.current.playVideo(); setState("playing"); return; }
    setState("loading");
    try {
      await loadApi();
      player.current = new window.YT!.Player(host.current!, {
        videoId: song.youtubeId, height: "1", width: "1",
        playerVars: { autoplay: 1, playsinline: 1, controls: 0, loop: 1, playlist: song.youtubeId },
        events: {
          onReady: (e: { target: YTPlayer }) => { e.target.playVideo(); },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) setState("playing");
            else if (e.data === 2) setState("paused");
          },
          onError: () => { window.open(song.externalUrl, "_blank", "noopener"); setState("idle"); },
        },
      });
    } catch { window.open(song.externalUrl, "_blank", "noopener"); setState("idle"); }
  }

  const playingNow = state === "playing";
  return (
    <>
      <div className="yt-host" aria-hidden="true"><div ref={host} /></div>
      <button type="button" className={`sound${playingNow ? "" : " paused"}`} onClick={toggle}
        aria-label={playingNow ? `Pause ${song.title}` : `Play ${song.title} by ${song.artist}`}>
        <span className="pb">
          {playingNow
            ? <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0h4v14H0zM8 0h4v14H8z" /></svg>
            : <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>}
        </span>
        <span className="t"><b>{song.title}</b><small>{state === "loading" ? "Loading…" : `${song.artist} · festival sound`}</small></span>
        <span className="eq" aria-hidden="true"><i /><i /><i /></span>
      </button>
    </>
  );
}
