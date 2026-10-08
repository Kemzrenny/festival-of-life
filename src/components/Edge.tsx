import type { Pair } from "@/content/site";
import { runnerTile } from "@/lib/fabric";

export function Edges({ left, right }: { left: Pair; right: Pair }) {
  return (
    <>
      <div className="edge l" aria-hidden="true" style={{ backgroundImage: runnerTile(left) }} />
      <div className="edge r" aria-hidden="true" style={{ backgroundImage: runnerTile(right) }} />
    </>
  );
}
