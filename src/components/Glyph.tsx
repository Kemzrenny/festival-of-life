const thornSpikes = Array.from({ length: 12 }, (_, k) => {
  const a = (k * Math.PI) / 6 + 0.2;
  const x1 = 24 + Math.cos(a) * 13, y1 = 24 + Math.sin(a) * 13;
  const x2 = 24 + Math.cos(a + 0.35) * 20, y2 = 24 + Math.sin(a + 0.35) * 20;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}).join("");

export const PALM_PATH =
  "M24 3c3.2 3.6 3.6 8.6 0 12.6-3.6-4-3.2-9 0-12.6zM22.6 19.5c-5.8-.6-9.4-4.6-9.8-9.6 5.4.8 8.8 4.4 9.8 9.6zM25.4 19.5c5.8-.6 9.4-4.6 9.8-9.6-5.4.8-8.8 4.4-9.8 9.6zM22.6 26.5c-6.4-.4-10.6-4.8-11.4-10 6 .8 10 4.6 11.4 10zM25.4 26.5c6.4-.4 10.6-4.8 11.4-10-6 .8-10 4.6-11.4 10zM22.6 33.5c-6.4-.2-10.8-4.4-12-9.6 6.2.6 10.4 4.2 12 9.6zM25.4 33.5c6.4-.2 10.8-4.4 12-9.6-6.2.6-10.4 4.2-12 9.6zM22.3 17h3.2l-.4 28h-2.4z";

export type GlyphName =
  | "palm" | "crown" | "tree" | "fire" | "cross" | "dove"
  | "thorns" | "bible" | "hands" | "cup" | "staff";

function Inner({ name }: { name: GlyphName }) {
  switch (name) {
    case "palm": return <path d={PALM_PATH} />;
    case "crown": return <><path d="M8 34l-2-18 9 8 9-13 9 13 9-8-2 18z" /><rect x="8" y="36" width="32" height="5" rx="1" /></>;
    case "tree": return <><circle cx="24" cy="16" r="11" /><circle cx="14" cy="22" r="7" /><circle cx="34" cy="22" r="7" /><path d="M22 24h4v20h-4zM15 44h18v2H15z" /></>;
    case "fire": return <path d="M24 4c3 7 11 11 11 21a11 11 0 0 1-22 0c0-5.5 3-8.5 5.5-11.5 0 4.2 1.8 6.6 4.2 7.8-1.2-6 0-12 1.3-17.3z" />;
    case "cross": return <path d="M21 4h6v12h11v6H27v22h-6V22H10v-6h11z" />;
    case "dove": return <path d="M5 27c6-.6 10.6-5.3 14-12 2.4 4.2 2.4 8.4.6 12l13-5.4-4.2 7.8c4.2 0 8.4 1.8 10.8 4.2-8.4 2.4-17.4 2.4-25.8-.6L9 37l3-6.6C10.2 29.4 5 28.8 5 27z" />;
    case "thorns": return <><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="4" /><path d={thornSpikes} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" /></>;
    case "bible": return <><path fillRule="evenodd" d="M11 6h24a3 3 0 0 1 3 3v31H14a3 3 0 0 1-3-3zM22 12v5h-5v4h5v11h4V21h5v-4h-5v-5z" /><path d="M14 42h24v2H14z" /></>;
    case "hands": return <><path d="M23 5c-3 5-5 13-6 20l-6 8 4 9 8-6z" /><path d="M25 5c3 5 5 13 6 20l6 8-4 9-8-6z" /></>;
    case "cup": return <><path d="M8 6h16c0 8-3.5 12.5-6.5 13.5V28H22v3H10v-3h4.5v-8.5C11.5 18.5 8 14 8 6z" /><path d="M19 39c0-6 5.4-9.5 12-9.5S43 33 43 39v3H19z" /></>;
    case "staff": return <path d="M20 44V15a9 9 0 1 1 18 0v4" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />;
  }
}

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className={className}>
      <Inner name={name} />
    </svg>
  );
}
