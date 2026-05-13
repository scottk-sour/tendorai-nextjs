// IndexNow submission helper.
//
// IndexNow is the protocol used by Bing (and therefore ChatGPT search and
// Copilot) plus Yandex to receive immediate notice of new or updated URLs.
// Submitting is fire-and-forget; failures are logged but never thrown so a
// flaky API can't break the deploy pipeline.
//
// Key generation: see scripts/submit-indexnow.ts — the key is hardcoded
// here AND served as a plaintext file at /<key>.txt so the protocol can
// verify domain ownership.

export const INDEXNOW_KEY = '4468ad1915a974f2e1025446817db73f';
export const INDEXNOW_HOST = 'www.tendorai.com';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

// Protocol caps a single submission at 10,000 URLs. Stay one short to give
// any future query-string variants room without flipping over.
const BATCH_SIZE = 9999;

export interface IndexNowResult {
  batchesSubmitted: number;
  urlsSubmitted: number;
  errors: string[];
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

/**
 * Submit a list of absolute URLs to IndexNow. URLs must be on the same
 * host as `INDEXNOW_HOST`; off-host URLs are silently dropped to comply
 * with the protocol (the endpoint would 422 the whole batch otherwise).
 *
 * Returns a summary — never throws. Use console output to diagnose.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const result: IndexNowResult = {
    batchesSubmitted: 0,
    urlsSubmitted: 0,
    errors: [],
  };

  const onHostUrls = urls.filter((u) => {
    try {
      const parsed = new URL(u);
      return parsed.host === INDEXNOW_HOST;
    } catch {
      return false;
    }
  });

  if (onHostUrls.length === 0) {
    return result;
  }

  for (const batch of chunk(onHostUrls, BATCH_SIZE)) {
    const body = {
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    };

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // IndexNow returns 200 / 202 on success. Anything else logs but
      // doesn't stop the run — Bing's 422 for "URL not on the host" should
      // already be unreachable thanks to the filter above, but defensive.
      if (res.status === 200 || res.status === 202) {
        result.batchesSubmitted += 1;
        result.urlsSubmitted += batch.length;
      } else {
        const text = await res.text().catch(() => '');
        result.errors.push(
          `IndexNow returned ${res.status} for batch of ${batch.length}: ${text.slice(0, 200)}`,
        );
      }
    } catch (err) {
      result.errors.push(
        `IndexNow fetch failed for batch of ${batch.length}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  }

  return result;
}
