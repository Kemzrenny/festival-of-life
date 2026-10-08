"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { days } from "@/content/site";
import { saveRegistration } from "@/lib/registration";

/* Canvas can't read CSS variables, so resolve the loaded headline font family at draw time. */
const headFont = () => {
  const v = typeof document !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue("--font-outfit").trim() : "";
  return `"GT Walsheim", ${v || "sans-serif"}, sans-serif`;
};
type Sessions = "Mornings" | "Evenings" | "Mornings and evenings";

function load(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}

export function Register() {
  const dlg = useRef<HTMLDialogElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState<"form" | "card">("form");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [first, setFirst] = useState("");
  const [cardName, setCardName] = useState("");
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [saveMsg, setSaveMsg] = useState("");
  const [pngUrl, setPngUrl] = useState("");
  const imgs = useRef<{ bg?: HTMLImageElement; logo?: HTMLImageElement }>({});

  useEffect(() => {
    const open = () => { setStep("form"); setErr(""); setSaveMsg(""); setPngUrl(""); dlg.current?.showModal(); };
    window.addEventListener("fol:register", open);
    return () => window.removeEventListener("fol:register", open);
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

  useEffect(() => { if (step === "card") draw(); }, [step, draw]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), phone = String(f.get("phone") || "").trim();
    const chosen = f.getAll("day").map(String);
    if (!name) return setErr("Add your full name so we can put it on your card.");
    if (phone.replace(/\D/g, "").length < 10) return setErr("Add a phone number with at least 10 digits.");
    if (!chosen.length) return setErr("Pick at least one day to celebrate with us.");
    setBusy(true); setErr("");
    const res = await saveRegistration({
      name, phone, email: String(f.get("email") || "") || undefined, days: chosen,
      sessions: String(f.get("sess")) as Sessions, group: String(f.get("group")), firstTime: String(f.get("first")),
      submittedAt: new Date().toISOString(),
    });
    setBusy(false);
    if (!res.ok) return setErr("We couldn't save your registration just now. Check your connection and try again.");
    const [bg, logo] = await Promise.all([load("/assets/tapestry-frame.webp").catch(() => undefined), load("/assets/logo.png").catch(() => undefined)]);
    imgs.current = { bg, logo };
    await document.fonts.load(`700 64px ${headFont()}`).catch(() => undefined);
    setFirst(name.split(" ")[0]); setCardName(name.split(" ").slice(0, 3).join(" ")); setPhoto(null); setStep("card");
  }

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
      {step === "form" ? (
        <form className="reg" onSubmit={submit} noValidate>
          <div className="row2">
            <div className="field"><label htmlFor="f-name">Full name</label><input type="text" id="f-name" name="name" autoComplete="name" required /></div>
            <div className="field"><label htmlFor="f-phone">Phone (WhatsApp)</label><input type="tel" id="f-phone" name="phone" autoComplete="tel" placeholder="080..." required /></div>
          </div>
          <div className="field"><label htmlFor="f-email">Email (optional)</label><input type="email" id="f-email" name="email" autoComplete="email" /></div>
          <fieldset className="field"><legend>Which days are you celebrating with us?</legend>
            <div className="chips">{days.map((d, i) => (
              <label key={d.short}><input type="checkbox" name="day" value={`${d.short} ${d.date}`} id={`day-${i}`} defaultChecked /><span>{d.short} {d.date.split(" ")[0]}</span></label>
            ))}</div>
          </fieldset>
          <fieldset className="field"><legend>Sessions</legend>
            <div className="chips">
              <label><input type="radio" name="sess" value="Mornings" /><span>Mornings 9AM</span></label>
              <label><input type="radio" name="sess" value="Evenings" /><span>Evenings 5PM</span></label>
              <label><input type="radio" name="sess" value="Mornings and evenings" defaultChecked /><span>Both</span></label>
            </div>
          </fieldset>
          <div className="row2">
            <div className="field"><label htmlFor="f-group">Coming with</label><select id="f-group" name="group"><option>Just me</option><option>2–4 people</option><option>5–10 people</option><option>A church group</option></select></div>
            <div className="field"><label htmlFor="f-first">First Festival of Life?</label><select id="f-first" name="first"><option>Yes, my first time</option><option>No, I came to School of Destiny</option></select></div>
          </div>
          <p className="err" aria-live="polite">{err}</p>
          <button className="btn btn-yellow" type="submit" style={{ justifySelf: "start" }} disabled={busy}>{busy ? "Saving…" : "Register and make my card"}</button>
        </form>
      ) : (
        <div className="card-step">
          <canvas ref={cv} width={1080} height={1350} aria-label="Your I'm Attending card preview" />
          <div className="card-ctrl">
            <h3>You&apos;re in, {first}. Agbada on standby.</h3>
            <p>Add a photo to your I&apos;m Attending card, then save it and share it everywhere.</p>
            <label className="upload" htmlFor="photoIn">Add your photo<input type="file" id="photoIn" accept="image/*" onChange={onPhoto} /></label>
            <div className="field"><label htmlFor="cardName">Name on your card</label><input type="text" id="cardName" maxLength={28} value={cardName} onChange={(e) => setCardName(e.target.value)} /></div>
            <button className="btn btn-yellow" type="button" onClick={saveCard}>Save my card</button>
            <p className="save-out" aria-live="polite">
              {saveMsg} {pngUrl && <a className="save-link" href={pngUrl} target="_blank" rel="noopener">Open the image</a>}
            </p>
            <button className="btn btn-dark btn-sm" type="button" onClick={close} style={{ justifySelf: "start" }}>Done</button>
          </div>
        </div>
      )}
    </dialog>
  );
}
