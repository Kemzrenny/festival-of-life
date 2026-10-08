const COLS = ["#eda60e", "#96d0c2", "#800d10", "#b4d030", "#ec6d5e"];

/** Festival bunting: flags drop onto the string one by one, then a breeze ripples across
    them while the bulbs chase. Hovering a flag gives it a flick. */
export function Bunting() {
  const n = 30;
  const items = Array.from({ length: n }, (_, i) => {
    const x = ((i + 0.5) * 1440) / n, t = x / 1440, y = 10 + 4 * t * (1 - t) * 36, w = (1440 / n) * 0.78;
    const bx = x + 720 / n, by = 10 + 4 * (bx / 1440) * (1 - bx / 1440) * 36;
    return { x, y, w, bx, by, c: COLS[i % 5], i };
  });
  return (
    <svg className="bunting" viewBox="0 0 1440 92" preserveAspectRatio="none" aria-hidden="true">
      <path className="bstring" d="M0 10 Q 720 46 1440 10" fill="none" stroke="#d9b56a" strokeWidth="2" pathLength={1} />
      {items.map((f) => (
        <g key={f.i}>
          <g className="bdrop" style={{ ["--i" as string]: f.i }}>
            <path className="bflag" style={{ ["--i" as string]: f.i }}
              d={`M${f.x - f.w / 2} ${f.y} L${f.x + f.w / 2} ${f.y} L${f.x} ${f.y + 40} Z`} fill={f.c} />
          </g>
          <circle cx={f.bx} cy={f.by} r="3" fill="#ffe7a6" className="bulb" style={{ ["--i" as string]: f.i }} />
        </g>
      ))}
    </svg>
  );
}
