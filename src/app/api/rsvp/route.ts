import { NextResponse } from "next/server";
import { getWedding } from "@/config";
import { validateRsvp } from "@/lib/rsvp";

// Best-effort per-instance throttle. Use a real rate limiter (e.g. Upstash) in production.
const hits = new Map<string, number[]>();
function throttled(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 5;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const wedding = typeof body.slug === "string" ? getWedding(body.slug) : undefined;
  if (!wedding) return NextResponse.json({ ok: false, error: "Unknown wedding." }, { status: 404 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(`${wedding.slug}:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Please wait a minute." }, { status: 429 });
  }

  const result = validateRsvp(body, wedding.rsvp.maxGuestsPerRsvp, wedding.rsvp.allowMessage);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // No backend configured: do NOT claim anything was stored.
  if (!url || !key) {
    return NextResponse.json({ ok: true, saved: false, demo: true });
  }

  const { name, attendance, guests, message } = result.value;
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rsvps`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ wedding_slug: wedding.slug, name, attendance, guests, message: message || null }),
  });

  if (!res.ok) {
    console.error("RSVP persistence failed with status", res.status);
    return NextResponse.json({ ok: false, error: "We couldn’t save your RSVP. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, saved: true, demo: false });
}
