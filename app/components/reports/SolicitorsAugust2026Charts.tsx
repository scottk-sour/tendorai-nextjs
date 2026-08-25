/**
 * SolicitorsAugust2026Charts — 3 fixed figures embedded in
 * "Most UK Solicitors Are Never Recommended by AI. We Measured How Many."
 * (Report TAI-R-2026-002).
 *
 * Deliberately NOT a client component and deliberately not Recharts. The
 * artwork is hand-authored inline SVG, so every figure in it — 1,003, 82.6%,
 * 2.50%, 4.78% and the rest — is present in the server-rendered HTML source
 * and can be read by an AI crawler without executing JavaScript.
 *
 * Each SVG carries its own <title> and <desc> for screen readers, and bakes
 * its own heading and subtitle into the artwork, so ChartFrame is used
 * without a figcaption.
 *
 * Colours: the source artwork was authored against #8f1f3d / #4a5568; both
 * are mapped onto TendorAI tokens below (--color-brand-primary #667eea and
 * --color-text2 #475569). Hex is inlined rather than var() to match the
 * existing convention in SolicitorsJuly2026Charts. The remaining greys are
 * the artwork's own and are unchanged.
 *
 * Bridged into the article body from the shared /resources/[slug] and
 * /blog/[slug] renderers when they encounter a `<!--CHART-AUG:N-->` marker.
 */

import ChartFrame from './ChartFrame';

// --color-brand-primary / --purple-start
const BRAND_PRIMARY = '#667eea';
// --color-text2
const NEUTRAL = '#475569';

// ─── CHART 1: 83% of firms were never named once ──────────────────
function Chart1() {
  return (
    <ChartFrame>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 420"
        role="img"
        aria-labelledby="c1title c1desc"
        className="w-full h-auto"
      >
        <title id="c1title">83% of tracked UK solicitor firms were never named once</title>
        <desc id="c1desc">Of 1,214 SRA-regulated firms tracked across 17 UK cities, 1,003 were never named in any of their 40 eligible Perplexity answers. 211 were named at least once.</desc>
        <rect width="700" height="420" fill="#ffffff" />
        <text x="0" y="24" fontSize="19" fontWeight="bold" fill="#1a1a1a">Most firms are never named at all</text>
        <text x="0" y="46" fontSize="13" fill="#555555">1,214 SRA-regulated firms, 17 UK cities, Perplexity, 40 eligible answers each.</text>
        <rect x="0" y="66" width="620" height="182" fill="#e2e5ea" stroke="#c8ccd4" strokeWidth="1" />
        <rect x="0" y="252" width="130" height="38" fill={BRAND_PRIMARY} stroke={BRAND_PRIMARY} strokeWidth="1" />
        <text x="636" y="150" fontSize="15" fontWeight="bold" fill="#1a1a1a">1,003</text>
        <text x="636" y="169" fontSize="12" fill="#555555">never named</text>
        <text x="636" y="185" fontSize="12" fill="#555555">82.6%</text>
        <text x="146" y="269" fontSize="15" fontWeight="bold" fill={BRAND_PRIMARY}>211</text>
        <text x="146" y="286" fontSize="12" fill="#555555">named at least once (17.4%)</text>
        <line x1="0" y1="318" x2="700" y2="318" stroke="#dddddd" strokeWidth="1" />
        <text x="0" y="342" fontSize="13" fill="#1a1a1a">Three firms — Taylor Walton, Wake Smith and Ware &amp; Kay — were named in</text>
        <text x="0" y="361" fontSize="13" fill="#1a1a1a">all 40 of their eligible answers.</text>
        <text x="0" y="396" fontSize="11" fill="#777777">TendorAI · Report TAI-R-2026-002 · 680 answer runs, 68 prompts, ten repeats each</text>
      </svg>
    </ChartFrame>
  );
}

// ─── CHART 2: ChatGPT vs Perplexity ───────────────────────────────
function Chart2() {
  return (
    <ChartFrame>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 400"
        role="img"
        aria-labelledby="c2title c2desc"
        className="w-full h-auto"
      >
        <title id="c2title">ChatGPT names fewer firms, less often, than Perplexity</title>
        <desc id="c2desc">ChatGPT mention rate 2.50 percent across 120 distinct firms. Perplexity mention rate 3.70 percent across 258 distinct firms. Same 68-prompt panel, same collection window.</desc>
        <rect width="700" height="400" fill="#ffffff" />
        <text x="0" y="24" fontSize="19" fontWeight="bold" fill="#1a1a1a">Two engines, two different shortlists</text>
        <text x="0" y="46" fontSize="13" fill="#555555">Same 68 prompts, same firms, same window. Wave 1, July–August 2026.</text>
        <text x="0" y="86" fontSize="13" fontWeight="bold" fill="#1a1a1a">Mention rate</text>
        <text x="0" y="104" fontSize="11" fill="#777777">share of firm-answer pairs where the firm was named</text>
        <text x="0" y="134" fontSize="12" fill="#1a1a1a">ChatGPT</text>
        <rect x="90" y="122" width="176" height="18" fill={NEUTRAL} />
        <text x="276" y="136" fontSize="13" fontWeight="bold" fill="#1a1a1a">2.50%</text>
        <text x="0" y="164" fontSize="12" fill="#1a1a1a">Perplexity</text>
        <rect x="90" y="152" width="260" height="18" fill={BRAND_PRIMARY} />
        <text x="360" y="166" fontSize="13" fontWeight="bold" fill="#1a1a1a">3.70%</text>
        <line x1="0" y1="196" x2="700" y2="196" stroke="#dddddd" strokeWidth="1" />
        <text x="0" y="224" fontSize="13" fontWeight="bold" fill="#1a1a1a">Distinct firms named</text>
        <text x="0" y="242" fontSize="11" fill="#777777">out of 1,214 tracked</text>
        <text x="0" y="272" fontSize="12" fill="#1a1a1a">ChatGPT</text>
        <rect x="90" y="260" width="121" height="18" fill={NEUTRAL} />
        <text x="221" y="274" fontSize="13" fontWeight="bold" fill="#1a1a1a">120</text>
        <text x="0" y="302" fontSize="12" fill="#1a1a1a">Perplexity</text>
        <rect x="90" y="290" width="260" height="18" fill={BRAND_PRIMARY} />
        <text x="360" y="304" fontSize="13" fontWeight="bold" fill="#1a1a1a">258</text>
        <line x1="0" y1="332" x2="700" y2="332" stroke="#dddddd" strokeWidth="1" />
        <text x="0" y="356" fontSize="12" fill="#1a1a1a">ChatGPT&rsquo;s most-cited sources were firm websites and google.com.</text>
        <text x="0" y="374" fontSize="12" fill="#1a1a1a">Perplexity&rsquo;s were directories, review platforms and Reddit.</text>
        <text x="0" y="394" fontSize="11" fill="#777777">TendorAI · Report TAI-R-2026-002</text>
      </svg>
    </ChartFrame>
  );
}

// ─── CHART 3: cited ≠ recommended ─────────────────────────────────
function Chart3() {
  return (
    <ChartFrame>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 490"
        role="img"
        aria-labelledby="c3title c3desc"
        className="w-full h-auto"
      >
        <title id="c3title">Which source AI cites does not predict which firm it names</title>
        <desc id="c3desc">For ten directories and review platforms, the firm mention rate when the source was cited sits between 3.94 and 5.45 percent, against a 4.7 percent baseline. Half are above baseline, half below.</desc>
        <rect width="700" height="490" fill="#ffffff" />
        <text x="0" y="24" fontSize="19" fontWeight="bold" fill="#1a1a1a">Being cited is not the same as being recommended</text>
        <text x="0" y="46" fontSize="13" fill="#555555">Firm mention rate when each source was cited. Perplexity, August 2026.</text>
        <line x1="457" y1="72" x2="457" y2="420" stroke={BRAND_PRIMARY} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="463" y="84" fontSize="11" fill={BRAND_PRIMARY}>4.7% baseline</text>
        <line x1="240" y1="420" x2="620" y2="420" stroke="#cccccc" strokeWidth="1" />
        <text x="240" y="438" fontSize="10" fill="#777777">3.5%</text>
        <text x="420" y="438" fontSize="10" fill="#777777">4.5%</text>
        <text x="600" y="438" fontSize="10" fill="#777777">5.5%</text>
        <g fontSize="11.5" fill="#1a1a1a">
          <text x="0" y="106">reviewsolicitors.co.uk</text>
          <circle cx="471" cy="102" r="5" fill={NEUTRAL} />
          <text x="632" y="106" fontWeight="bold">4.78%</text>
          <text x="0" y="138">solicitors.com</text>
          <circle cx="592" cy="134" r="5" fill={NEUTRAL} />
          <text x="632" y="138" fontWeight="bold">5.45%</text>
          <text x="0" y="170">reallymoving.com</text>
          <circle cx="383" cy="166" r="5" fill={NEUTRAL} />
          <text x="632" y="170" fontWeight="bold">4.29%</text>
          <text x="0" y="202">samconveyancing.co.uk</text>
          <circle cx="374" cy="198" r="5" fill={NEUTRAL} />
          <text x="632" y="202" fontWeight="bold">4.24%</text>
          <text x="0" y="234">thesolicitordirectory.co.uk</text>
          <circle cx="390" cy="230" r="5" fill={NEUTRAL} />
          <text x="632" y="234" fontWeight="bold">4.33%</text>
          <text x="0" y="266">reddit.com</text>
          <circle cx="379" cy="262" r="5" fill={NEUTRAL} />
          <text x="632" y="266" fontWeight="bold">4.27%</text>
          <text x="0" y="298">comparemymove.com</text>
          <circle cx="388" cy="294" r="5" fill={NEUTRAL} />
          <text x="632" y="298" fontWeight="bold">4.32%</text>
          <text x="0" y="330">legal500.com</text>
          <circle cx="320" cy="326" r="5" fill={NEUTRAL} />
          <text x="632" y="330" fontWeight="bold">3.94%</text>
          <text x="0" y="362">yell.com</text>
          <circle cx="410" cy="358" r="5" fill={NEUTRAL} />
          <text x="632" y="362" fontWeight="bold">4.44%</text>
          <text x="0" y="394">vouchedfor.co.uk</text>
          <circle cx="412" cy="390" r="5" fill={NEUTRAL} />
          <text x="632" y="394" fontWeight="bold">4.45%</text>
        </g>
        <text x="0" y="462" fontSize="12" fill="#1a1a1a">reviewsolicitors.co.uk appeared in 89.6% of answers. It made no measurable</text>
        <text x="0" y="478" fontSize="12" fill="#1a1a1a">difference to which firms were named.</text>
      </svg>
    </ChartFrame>
  );
}

interface Props {
  index: 1 | 2 | 3;
}

export default function SolicitorsAugust2026Charts({ index }: Props) {
  if (index === 1) return <Chart1 />;
  if (index === 2) return <Chart2 />;
  if (index === 3) return <Chart3 />;
  return null;
}
