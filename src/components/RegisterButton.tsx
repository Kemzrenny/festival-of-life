"use client";
export function RegisterButton({ children, className = "btn btn-yellow" }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("fol:register"))}>
      {children}
    </button>
  );
}
