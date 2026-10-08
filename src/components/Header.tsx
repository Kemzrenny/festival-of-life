"use client";
import { useState } from "react";
import { RegisterButton } from "./RegisterButton";

const LINKS = [
  ["#ministers", "Ministers"], ["#programme", "Programme"], ["#celebrate", "Celebrate"],
  ["#visit", "Visit"], ["#live", "Watch live"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="hdr">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="Festival of Life home">
            <img src="/assets/logo.png" alt="Festival of Life" width={55} height={46} />
          </a>
          <nav className="nav" aria-label="Main">
            {LINKS.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <div className="hdr-cta">
            <RegisterButton>I&apos;m attending</RegisterButton>
            <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <nav className={`mnav${open ? " open" : ""}`} id="mnav" aria-label="Mobile">
        {LINKS.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
      </nav>
    </>
  );
}
