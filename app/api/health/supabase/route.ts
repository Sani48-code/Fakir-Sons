import { NextResponse } from "next/server";

// Connection check: GET /api/health/supabase
// Pings the Supabase Auth health endpoint with the publishable key.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { ok: false, error: "Missing Supabase env vars" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: key },
      cache: "no-store",
    });
    return NextResponse.json({ ok: res.ok, status: res.status }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unreachable" }, { status: 502 });
  }
}
