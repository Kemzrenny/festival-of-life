"use client";
import { useState } from "react";

export function CopyAddress({ text }: { text: string }) {
  const [msg, setMsg] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(text); setMsg("Address copied."); }
    catch {
      const el = document.getElementById("addr");
      if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); }
      setMsg("Address selected. Copy it from your device menu.");
    }
  }
  return (
    <>
      <button className="btn btn-teal-line btn-sm" type="button" onClick={copy}>Copy address</button>
      <p className="copied" aria-live="polite" style={{ flexBasis: "100%" }}>{msg}</p>
    </>
  );
}
