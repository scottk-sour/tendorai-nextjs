// Postbuild IndexNow submission.
//
// Runs after `next build`. Submits every static + article + supplier-
// category sitemap URL (vendor profile URLs are excluded by design — see
// lib/sitemapUrls.ts). Production-only — preview and dev deploys skip
// submission so we don't burn rate limit on every PR build.
//
// Failures are logged but never throw — IndexNow is best-effort.

import { submitToIndexNow } from '../lib/indexnow';
import { getAllStaticUrls } from '../lib/sitemapUrls';

async function main() {
  // Vercel sets VERCEL_ENV to 'production' | 'preview' | 'development'.
  // CI deploys with VERCEL_ENV unset are skipped too — safer default.
  if (process.env.VERCEL_ENV !== 'production') {
    console.log(
      `[indexnow] Skipping submission (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'}).`,
    );
    return;
  }

  const urls = getAllStaticUrls();
  console.log(`[indexnow] Submitting ${urls.length} URLs to IndexNow…`);

  const result = await submitToIndexNow(urls);

  console.log(
    `[indexnow] ${result.urlsSubmitted}/${urls.length} URLs accepted across ${result.batchesSubmitted} batch(es).`,
  );
  if (result.errors.length > 0) {
    for (const err of result.errors) {
      console.warn(`[indexnow] ${err}`);
    }
  }
}

main().catch((err) => {
  // Never fail the deploy on IndexNow trouble.
  console.warn(
    `[indexnow] Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
  );
});
