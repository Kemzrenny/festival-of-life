"use client";
import { useEffect, useRef } from "react";
import { looks, PAIRS } from "@/content/site";

export function Belt() {
  const belt = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = belt.current!; const cards = [...el.children] as HTMLElement[];
    const bend = () => {
      const r = el.getBoundingClientRect(), cx = r.left + r.width / 2;
      cards.forEach((c) => {
        const b = c.getBoundingClientRect();
        let d = (b.left + b.width / 2 - cx) / (r.width / 2); d = Math.max(-1.2, Math.min(1.2, d));
        c.style.transform = `rotateY(${(-d * 22).toFixed(2)}deg) translateZ(${(-Math.abs(d) * 30).toFixed(1)}px) translateY(${(Math.abs(d) * -12).toFixed(1)}px)`;
      });
    };
    const onScroll = () => requestAnimationFrame(bend);
    el.addEventListener("scroll", onScroll, { passive: true });
    const m = cards[4]; el.scrollLeft = m.offsetLeft - el.clientWidth / 2 + m.offsetWidth / 2; bend();
    let down = false, sx = 0, sl = 0;
    const pd = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = el.scrollLeft; el.classList.add("dragging"); el.setPointerCapture(e.pointerId); };
    const pm = (e: PointerEvent) => { if (down) el.scrollLeft = sl - (e.clientX - sx); };
    const pu = () => { down = false; el.classList.remove("dragging"); };
    const kd = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { el.scrollBy({ left: 260, behavior: "smooth" }); e.preventDefault(); }
      if (e.key === "ArrowLeft") { el.scrollBy({ left: -260, behavior: "smooth" }); e.preventDefault(); }
    };
    el.addEventListener("pointerdown", pd); el.addEventListener("pointermove", pm);
    el.addEventListener("pointerup", pu); el.addEventListener("pointercancel", pu); el.addEventListener("keydown", kd);
    addEventListener("resize", bend);
    return () => { el.removeEventListener("scroll", onScroll); removeEventListener("resize", bend); };
  }, []);
  return (
    <div className="belt" ref={belt} tabIndex={0} aria-label="Festival looks, scroll sideways">
      {looks.map((l, i) => {
        const [bg, t] = PAIRS[l.pair];
        return (
          <figure className="look" key={i} style={{ margin: 0, ["--strip" as string]: bg, ["--stript" as string]: t }}>
            <div className="bd"><img src={`/assets/look-${i + 1}.webp`} alt={`Festival look: ${l.name}`} loading="lazy" draggable={false} /></div>
            <figcaption className="tag"><small>Look {String(i + 1).padStart(2, "0")}</small>{l.name}</figcaption>
            <div className="strip"><span>Festival of Life · Hosanna · Festival of Life · Hosanna · Festival of Life · Hosanna · </span></div>
          </figure>
        );
      })}
    </div>
  );
}
