import { NextRequest, NextResponse } from 'next/server';

const EXPECTED_TYPES = [
  'LocalBusiness', 'LegalService', 'AccountingService', 'FinancialService',
  'RealEstateAgent', 'Organization', 'FAQPage', 'BreadcrumbList',
];

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.match(/^https?:\/\//i)) {
      targetUrl = `https://${targetUrl}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'TendorAI Schema Checker/1.0' },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: `Could not fetch URL (HTTP ${res.status})` }, { status: 422 });
    }

    const html = await res.text();

    // Extract all JSON-LD blocks
    const jsonLdRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const raw: unknown[] = [];
    const foundTypes = new Set<string>();

    let match;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        raw.push(parsed);

        const extractTypes = (obj: unknown) => {
          if (Array.isArray(obj)) {
            obj.forEach(extractTypes);
          } else if (obj && typeof obj === 'object') {
            const o = obj as Record<string, unknown>;
            if (typeof o['@type'] === 'string') foundTypes.add(o['@type']);
            if (Array.isArray(o['@type'])) (o['@type'] as string[]).forEach(t => foundTypes.add(t));
            if (Array.isArray(o['@graph'])) (o['@graph'] as unknown[]).forEach(extractTypes);
          }
        };
        extractTypes(parsed);
      } catch {
        // Skip malformed JSON-LD
      }
    }

    const found = EXPECTED_TYPES.filter(t => foundTypes.has(t));
    const missing = EXPECTED_TYPES.filter(t => !foundTypes.has(t));

    return NextResponse.json({
      found,
      missing,
      allTypes: [...foundTypes],
      raw,
      totalBlocks: raw.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('abort')) {
      return NextResponse.json({ error: 'Request timed out (15s)' }, { status: 408 });
    }
    return NextResponse.json({ error: `Failed to check URL: ${message}` }, { status: 500 });
  }
}
