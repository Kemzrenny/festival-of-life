import { PAIRS, type Pair } from "@/content/site";

const enc = (s: string) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;

/** Vertical woven runner tile used for section edges. */
export function runnerTile(k: Pair) {
  const [bg, fg] = PAIRS[k];
  return enc(
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='48' viewBox='0 0 24 48'><rect width='24' height='48' fill='${bg}'/><path d='M0 0 L4 6 L0 12 L4 18 L0 24 L4 30 L0 36 L4 42 L0 48' fill='none' stroke='${fg}' stroke-width='2'/><path d='M24 0 L20 6 L24 12 L20 18 L24 24 L20 30 L24 36 L20 42 L24 48' fill='none' stroke='${fg}' stroke-width='2'/><path d='M12 12 L18 24 L12 36 L6 24 Z' fill='${fg}'/><path d='M12 18 L15 24 L12 30 L9 24 Z' fill='${bg}'/><circle cx='12' cy='3' r='1.6' fill='${fg}'/><circle cx='12' cy='45' r='1.6' fill='${fg}'/></svg>`,
  );
}

/** Horizontal zigzag strip used under minister photos. */
export function zigTile(k: Pair) {
  const [bg, fg] = PAIRS[k];
  return enc(
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='14' viewBox='0 0 32 14'><rect width='32' height='14' fill='${bg}'/><path d='M0 11 L8 3 L16 11 L24 3 L32 11' fill='none' stroke='${fg}' stroke-width='2.5'/></svg>`,
  );
}
