/**
 * Redirect helpers shared by next.config.js and
 * scripts/check-legacy-redirects.mjs.
 *
 * CommonJS (.cjs) deliberately: next.config.js is CommonJS and cannot import
 * the TypeScript content module, so the article list is parsed textually here
 * and both the build and the guard use these same functions. Keeping them in
 * their own module also keeps next.config.js free of non-Next keys — Next's
 * root config schema is a zod strictObject and warns on any it does not
 * recognise.
 */

/**
 * Single textual parse of lib/content/articles.ts, shared by every redirect
 * generator below so they cannot disagree about which articles carry an href.
 * Parsed textually because next.config.js is CommonJS and cannot import the
 * TypeScript module. First occurrence of a slug wins, as before.
 *
 * Returns [{ slug, href }] with href === null for articles homed at
 * /resources/<slug>.
 */
function parseArticles() {
  const fs = require('fs');
  const path = require('path');
  const src = fs.readFileSync(
    path.join(__dirname, '..', 'content', 'articles.ts'),
    'utf8',
  );

  const seen = new Set();
  const out = [];

  for (const block of src.split('\n  {\n').slice(1)) {
    const end = block.indexOf('\n  },\n');
    const obj = end === -1 ? block : block.slice(0, end);

    const slug = /slug: '([^']+)'/.exec(obj);
    const href = /^\s*href: '([^']+)'/m.exec(obj);
    if (!slug || seen.has(slug[1])) continue;
    seen.add(slug[1]);
    out.push({ slug: slug[1], href: href ? href[1] : null });
  }

  if (out.length === 0) {
    throw new Error(
      'articleRedirects.cjs: parsed zero articles from lib/content/articles.ts. ' +
        'The file shape changed — fix the parser rather than shipping without the redirects.',
    );
  }

  return out;
}

/** Slugs of articles with no href — the ones homed at /resources/<slug>. */
function noHrefSlugs() {
  return new Set(parseArticles().filter((a) => a.href === null).map((a) => a.slug));
}

function hrefArticleRedirects(alreadyDeclared) {
  const out = [];

  for (const article of parseArticles()) {
    if (!article.href) continue;
    const source = `/resources/${article.slug}`;
    if (alreadyDeclared.has(source)) continue;
    out.push({ source, destination: article.href, permanent: true });
  }

  if (out.length === 0) {
    throw new Error(
      'articleRedirects.cjs: parsed zero href-bearing articles from lib/content/articles.ts. ' +
        'The file shape changed — fix the parser rather than shipping without the redirects.',
    );
  }

  return out;
}

/**
 * Legacy /blog/<slug> URLs for articles that are now homed at
 * /resources/<slug>. app/blog/[slug]/page.tsx generates pages only for
 * href-bearing articles (dynamicParams = false), so these paths 404 — they
 * were live before the duplicate-page fix and are still cited by AI
 * assistants and stale indexes. 308s send them to the canonical page instead
 * of discarding the citation. The pages are NOT recreated: that is what
 * produced the duplicates in the first place.
 *
 * Generated from the article configuration, so a future no-href article gets
 * its legacy redirect automatically. scripts/check-legacy-redirects.mjs fails
 * the build if that ever stops being true.
 */
function legacyBlogRedirects(alreadyDeclared) {
  const out = [];

  for (const slug of noHrefSlugs()) {
    const source = `/blog/${slug}`;
    if (alreadyDeclared.has(source)) continue;
    out.push({ source, destination: `/resources/${slug}`, permanent: true });
  }

  if (out.length === 0) {
    throw new Error(
      'articleRedirects.cjs: parsed zero no-href articles from lib/content/articles.ts. ' +
        'The file shape changed — fix the parser rather than shipping without the redirects.',
    );
  }

  return out;
}

/**
 * Repoint any hand-written redirect whose destination is a /blog/<slug> that
 * no longer renders (the slug belongs to a no-href article). Without this the
 * entry would 308 to a 404, or — once legacyBlogRedirects lands — cost the
 * visitor a needless second hop. Destinations that are genuinely live /blog/
 * articles are left exactly as written.
 */
function repointRetiredBlogDestinations(redirects) {
  const retired = noHrefSlugs();
  return redirects.map((redirect) => {
    const match = /^\/blog\/([^/:*?]+)$/.exec(redirect.destination);
    if (!match || !retired.has(match[1])) return redirect;
    return { ...redirect, destination: `/resources/${match[1]}` };
  });
}

module.exports = {
  parseArticles,
  noHrefSlugs,
  hrefArticleRedirects,
  legacyBlogRedirects,
  repointRetiredBlogDestinations,
};
