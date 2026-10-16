"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { registration } from "@/content/site";
import { RegisterButton } from "./RegisterButton";

/* Canvas can't read CSS variables, so resolve the loaded headline font family at draw time. */
const headFont = () => {
  const v = typeof document !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue("--font-outfit").trim() : "";
  return `"GT Walsheim", ${v || "sans-serif"}, sans-serif`;
};

function load(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}

export function CardMaker() {
  const dlg = useRef<HTMLDialogElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [cardName, setCardName] = useState("");
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [saveMsg, setSaveMsg] = useState("");
  const [pngUrl, setPngUrl] = useState("");
  const imgs = useRef<{ bg?: HTMLImageElement; logo?: HTMLImageElement }>({});

  useEffect(() => {
    const open = async () => {
      setSaveMsg(""); setPngUrl(""); dlg.current?.showModal();
      if (!imgs.current.bg) {
        const [bg, logo] = await Promise.all([load("/assets/tapestry-frame.webp").catch(() => undefined), load("/assets/logo.webp").catch(() => undefined)]);
        imgs.current = { bg, logo };
        await document.fonts.load(`700 64px ${headFont()}`).catch(() => undefined);
      }
      setReady(true);
    };
    window.addEventListener("fol:card", open);
    return () => window.removeEventListener("fol:card", open);
  }, []);

  const draw = useCallback(() => {
    const c = cv.current; if (!c) return; const ctx = c.getContext("2d")!;
    const W = 1080, H = 1350, bx = 250, bw = 580;
    const cover = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
      const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s;
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); ctx.restore();
    };
    const fit = (t: string, max: number, size: number) => {
      ctx.font = `700 ${size}px ${headFont()}`;
      while (ctx.measureText(t).width > max && size > 28) { size -= 2; ctx.font = `700 ${size}px ${headFont()}`; }
    };
    ctx.fillStyle = "#800d10"; ctx.fillRect(0, 0, W, H);
    if (imgs.current.bg) cover(imgs.current.bg, 0, 0, W, H);
    ctx.fillStyle = "#000"; ctx.fillRect(bx, 250, bw, 112); ctx.fillRect(bx, 374, bw, 600); ctx.fillRect(bx, 986, bw, 112);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    if (photo) cover(photo, bx, 374, bw, 600);
    else { ctx.fillStyle = "#8a7a6c"; ctx.font = `500 34px ${headFont()}`; ctx.fillText("Your photo here", W / 2, 674); }
    ctx.fillStyle = "#fff";
    fit("I’m Attending", bw - 60, 64); ctx.fillText("I’m Attending", W / 2, 308);
    const nm = (cardName || "Your name").trim(); fit(nm, bw - 60, 62); ctx.fillText(nm, W / 2, 1044);
    const logo = imgs.current.logo;
    if (logo) { const lw = 170, lh = (lw * logo.height) / logo.width; ctx.drawImage(logo, (bx - lw) / 2, 674 - lh / 2, lw, lh); ctx.drawImage(logo, bx + bw + (W - bx - bw - lw) / 2, 674 - lh / 2, lw, lh); }
  }, [photo, cardName]);

  useEffect(() => { if (ready) draw(); }, [ready, draw]);

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    load(URL.createObjectURL(file)).then(setPhoto).catch(() => setSaveMsg("That file could not be opened. Try a JPG or PNG photo."));
  }

  function saveCard() {
    cv.current?.toBlob((blob) => {
      if (!blob) return setSaveMsg("Could not make the image. Try again.");
      const url = URL.createObjectURL(blob); setPngUrl(url);
      const a = document.createElement("a"); a.href = url; a.download = "im-attending-festival-of-life.png";
      document.body.appendChild(a); a.click(); a.remove();
      setSaveMsg("Card saved. Now go and post it everywhere.");
    }, "image/png");
  }

  const close = () => dlg.current?.close();
  return (
    <dialog ref={dlg} aria-labelledby="regH" onClick={(e) => { if (e.target === dlg.current) close(); }}>
      <div className="dhead"><h2 id="regH">I&apos;m attending<br />Festival of Life</h2><button className="x" type="button" onClick={close} aria-label="Close">×</button></div>
        <div className="card-step">
          <canvas ref={cv} width={1080} height={1350} aria-label="Your I'm Attending card preview" />
          <div className="card-ctrl">
            <h3>Make your card. Outfit on standby.</h3>
            <p>Add your photo and name, then save your I&apos;m Attending card and share it everywhere.</p>
            <label className="upload" htmlFor="photoIn">Add your photo<input type="file" id="photoIn" accept="image/*" onChange={onPhoto} /></label>
            <div className="field"><label htmlFor="cardName">Name on your card</label><input type="text" id="cardName" maxLength={28} placeholder="Type your name" value={cardName} onChange={(e) => setCardName(e.target.value)} /></div>
            <button className="btn btn-yellow" type="button" onClick={saveCard}>Save my card</button>
            <p className="save-out" aria-live="polite">
              {saveMsg} {pngUrl && <a className="save-link" href={pngUrl} target="_blank" rel="noopener">Open the image</a>}
            </p>
            {registration.url && <p className="reg-nudge">Not registered yet? <RegisterButton className="save-link">Register here</RegisterButton></p>}
            <button className="btn btn-dark btn-sm" type="button" onClick={close} style={{ justifySelf: "start" }}>Done</button>
          </div>
        </div>
    </dialog>
  );
}
