import { NextRequest, NextResponse } from 'next/server';

const EXPECTED_TYPES = [
  'LocalBusiness',
  'LegalService',
  'AccountingService',
  'FinancialService',
  'RealEstateAgent',
  'Organization',
  'FAQPage',
  'BreadcrumbList',
];

function extractTypes(jsonLd: Record<string, unknown>): string[] {
  const types: string[] = [];
  const t = jsonLd['@type'];
  if (typeof t === 'string') types.push(t);
  else if (Array.isArray(t)) types.push(...t.map(String));

  // Check @graph
  if (Array.isArray(jsonLd['@graph'])) {
    for (const item of jsonLd['@graph']) {
      if (item && typeof item === 'object') {
        types.push(...extractTypes(item as Record<string, unknown>));
      }
    }
  }
  return types;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) targetUrl = `https://${targetUrl}`;

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'TendorAI-SchemaChecker/1.0',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch URL (${res.status})` }, { status: 422 });
    }

    const html = await res.text();

    // Extract all JSON-LD blocks
    const regex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const raw: object[] = [];
    const allTypes: string[] = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        raw.push(parsed);
        allTypes.push(...extractTypes(parsed));
      } catch {
        // skip malformed JSON-LD
      }
    }

    const uniqueTypes = [...new Set(allTypes)];
    const found = EXPECTED_TYPES.filter((t) => uniqueTypes.includes(t));
    const missing = EXPECTED_TYPES.filter((t) => !uniqueTypes.includes(t));

    return NextResponse.json({ found, missing, raw, allTypes: uniqueTypes });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
