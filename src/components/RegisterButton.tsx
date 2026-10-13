"use client";
import { registration } from "@/content/site";

/** Opens the external registration form (set in site.ts). Falls back to the I'm Attending section. */
export function RegisterButton({ children = "Register", className = "btn btn-yellow" }: { children?: React.ReactNode; className?: string }) {
  if (registration.url)
    return <a className={className} href={registration.url} target="_blank" rel="noopener">{children}</a>;
  return <a className={className} href="#attending">{children}</a>;
}

/** Opens the I'm Attending card maker. No registration needed. */
export function CardButton({ children = "Make my card", className = "btn btn-yellow" }: { children?: React.ReactNode; className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("fol:card"))}>{children}</button>;
}
