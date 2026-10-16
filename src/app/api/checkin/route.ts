import { NextResponse } from "next/server";
import { checkIn, warmUp, type Session } from "@/lib/checkin";

export const dynamic = "force-dynamic";

export async function GET() {
  await warmUp();
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { name?: string; session?: Session };
  const result = await checkIn(String(body.name ?? ""), body.session as Session);
  const status = result.ok ? 200 : result.reason === "duplicate" ? 409 : result.reason === "invalid" ? 400 : result.reason === "not-configured" ? 503 : 500;
  return NextResponse.json(result, { status, headers: { "Cache-Control": "no-store" } });
}
