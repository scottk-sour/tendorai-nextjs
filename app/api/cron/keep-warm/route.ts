import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

/**
 * Vercel cron hits this every 10 minutes to keep the Render free-tier backend
 * warm so users don't hit 30–60s cold-start latency on the AEO form.
 */
export async function GET() {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch(`${API_URL}/health`, {
      headers: { 'User-Agent': 'TendorAI-KeepWarm/1.0' },
      signal: controller.signal,
      cache: 'no-store',
    });
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      elapsedMs: Date.now() - started,
      target: `${API_URL}/health`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: message, elapsedMs: Date.now() - started, target: `${API_URL}/health` },
      { status: 200 }, // Return 200 so Vercel doesn't retry — we just want to record the ping.
    );
  } finally {
    clearTimeout(timer);
  }
}
