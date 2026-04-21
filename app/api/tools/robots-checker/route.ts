import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface Bot {
  name: string;
  userAgent: string;
  purpose: string;
}

const BOTS: Bot[] = [
  { name: 'GPTBot', userAgent: 'GPTBot', purpose: 'Trains ChatGPT' },
  { name: 'OAI-SearchBot', userAgent: 'OAI-SearchBot', purpose: 'Powers ChatGPT Search' },
  { name: 'ChatGPT-User', userAgent: 'ChatGPT-User', purpose: 'Live ChatGPT fetches' },
  { name: 'ClaudeBot', userAgent: 'ClaudeBot', purpose: 'Trains Claude' },
  { name: 'Claude-SearchBot', userAgent: 'Claude-SearchBot', purpose: 'Powers Claude web search' },
  { name: 'Claude-User', userAgent: 'Claude-User', purpose: 'Live Claude fetches' },
  { name: 'PerplexityBot', userAgent: 'PerplexityBot', purpose: 'Indexes for Perplexity' },
  { name: 'Perplexity-User', userAgent: 'Perplexity-User', purpose: 'Live Perplexity fetches' },
  { name: 'Google-Extended', userAgent: 'Google-Extended', purpose: 'Trains Gemini + AI Overviews' },
  { name: 'Applebot-Extended', userAgent: 'Applebot-Extended', purpose: 'Trains Apple Intelligence' },
  { name: 'Meta-ExternalAgent', userAgent: 'Meta-ExternalAgent', purpose: 'Fetches for Meta AI' },
  { name: 'Bytespider', userAgent: 'Bytespider', purpose: 'Trains ByteDance / Doubao' },
];

interface Rule {
  type: 'allow' | 'disallow';
  pattern: string;
}

type Groups = Map<string, Rule[]>;

function parseRobotsTxt(text: string): Groups {
  const groups: Groups = new Map();
  const lines = text.split(/\r?\n/);
  let currentAgents: string[] = [];
  let prevLineWasUserAgent = false;

  for (const rawLine of lines) {
    const hashIdx = rawLine.indexOf('#');
    const line = (hashIdx >= 0 ? rawLine.slice(0, hashIdx) : rawLine).trim();
    if (!line) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const field = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();

    if (field === 'user-agent') {
      if (!prevLineWasUserAgent) currentAgents = [];
      const ua = value.toLowerCase();
      currentAgents.push(ua);
      if (!groups.has(ua)) groups.set(ua, []);
      prevLineWasUserAgent = true;
      continue;
    }

    if (field === 'allow' || field === 'disallow') {
      if (currentAgents.length === 0) {
        prevLineWasUserAgent = false;
        continue;
      }
      for (const ua of currentAgents) {
        groups.get(ua)!.push({ type: field, pattern: value });
      }
      prevLineWasUserAgent = false;
      continue;
    }

    prevLineWasUserAgent = false;
  }

  return groups;
}

function patternToRegex(pattern: string): RegExp {
  let re = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '*') {
      re += '.*';
    } else if (c === '$' && i === pattern.length - 1) {
      re += '$';
    } else if ('\\.+?()[]{}|^'.includes(c)) {
      re += '\\' + c;
    } else if (c === '$') {
      re += '\\$';
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re);
}

function matchLength(pattern: string, path: string): number {
  if (pattern === '') return -1;
  try {
    const re = patternToRegex(pattern);
    if (re.test(path)) return pattern.length;
  } catch {
    return -1;
  }
  return -1;
}

interface RobotsVerdict {
  allowed: boolean;
  matchedRule?: string;
  source: 'specific' | 'wildcard' | 'default';
}

function checkRobots(groups: Groups, botName: string, path: string): RobotsVerdict {
  const botKey = botName.toLowerCase();
  let rules = groups.get(botKey);
  let source: RobotsVerdict['source'] = 'specific';

  if (!rules || rules.length === 0) {
    rules = groups.get('*');
    source = 'wildcard';
  }
  if (!rules || rules.length === 0) {
    return { allowed: true, source: 'default' };
  }

  let best: { rule: Rule; len: number } | null = null;
  for (const rule of rules) {
    if (rule.type === 'disallow' && rule.pattern === '') continue; // "Disallow:" alone means allow all
    const len = matchLength(rule.pattern, path);
    if (len < 0) continue;
    if (
      !best ||
      len > best.len ||
      (len === best.len && rule.type === 'allow' && best.rule.type === 'disallow')
    ) {
      best = { rule, len };
    }
  }

  if (!best) return { allowed: true, source };
  return {
    allowed: best.rule.type === 'allow',
    matchedRule: `${best.rule.type === 'allow' ? 'Allow' : 'Disallow'}: ${best.rule.pattern}`,
    source,
  };
}

type LiveFetchResult =
  | { ok: true; status: number }
  | { ok: false; error: string };

async function liveFetch(url: string, userAgent: string, timeoutMs: number): Promise<LiveFetchResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    });
    return { ok: true, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, error: message };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRobotsTxt(origin: string): Promise<{ text: string; status: number; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${origin}/robots.txt`, {
      headers: { 'User-Agent': 'TendorAI-RobotsChecker/1.0 (+https://www.tendorai.com)' },
      signal: controller.signal,
      redirect: 'follow',
    });
    if (res.ok) {
      const text = await res.text();
      return { text, status: res.status };
    }
    if (res.status === 404) {
      return { text: '', status: 404 };
    }
    return { text: '', status: res.status, error: `robots.txt returned HTTP ${res.status}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { text: '', status: 0, error: `Could not fetch robots.txt: ${message}` };
  } finally {
    clearTimeout(timer);
  }
}

interface BotResult {
  name: string;
  userAgent: string;
  purpose: string;
  status: 'allowed' | 'blocked' | 'error';
  reason?: 'robots.txt' | 'edge' | 'network';
  httpStatus?: number;
  detail: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawUrl: unknown = body?.url;

    if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
      return NextResponse.json({ error: 'A URL is required' }, { status: 400 });
    }

    let input = rawUrl.trim();
    if (!/^https?:\/\//i.test(input)) input = `https://${input}`;

    let parsed: URL;
    try {
      parsed = new URL(input);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'URL must use http or https' }, { status: 400 });
    }

    const origin = `${parsed.protocol}//${parsed.host}`;
    const path = (parsed.pathname || '/') + parsed.search;

    const robots = await fetchRobotsTxt(origin);
    const groups = parseRobotsTxt(robots.text);

    const results: BotResult[] = await Promise.all(
      BOTS.map(async (bot): Promise<BotResult> => {
        const verdict = checkRobots(groups, bot.name, path);
        if (!verdict.allowed) {
          const scope =
            verdict.source === 'specific'
              ? 'explicit rule for this bot'
              : 'wildcard rule (User-agent: *)';
          return {
            name: bot.name,
            userAgent: bot.userAgent,
            purpose: bot.purpose,
            status: 'blocked',
            reason: 'robots.txt',
            detail: `Disallowed by robots.txt (${scope}): ${verdict.matchedRule ?? ''}`,
          };
        }

        const live = await liveFetch(input, bot.userAgent, 8000);
        if (!live.ok) {
          return {
            name: bot.name,
            userAgent: bot.userAgent,
            purpose: bot.purpose,
            status: 'error',
            reason: 'network',
            detail: `Live fetch failed: ${live.error}`,
          };
        }
        if (live.status === 401 || live.status === 403 || live.status === 429) {
          return {
            name: bot.name,
            userAgent: bot.userAgent,
            purpose: bot.purpose,
            status: 'blocked',
            reason: 'edge',
            httpStatus: live.status,
            detail: `Edge-level block detected (HTTP ${live.status}) — likely a Cloudflare, WAF or firewall rule`,
          };
        }

        const robotsNote =
          verdict.source === 'default'
            ? 'No robots.txt restrictions'
            : verdict.source === 'specific'
              ? 'Allowed by an explicit robots.txt rule for this bot'
              : 'Allowed by robots.txt wildcard rule (User-agent: *)';

        return {
          name: bot.name,
          userAgent: bot.userAgent,
          purpose: bot.purpose,
          status: 'allowed',
          httpStatus: live.status,
          detail: `${robotsNote}. Live fetch returned HTTP ${live.status}.`,
        };
      }),
    );

    const summary = {
      total: results.length,
      allowed: results.filter((r) => r.status === 'allowed').length,
      blocked: results.filter((r) => r.status === 'blocked').length,
      errors: results.filter((r) => r.status === 'error').length,
    };

    return NextResponse.json({
      url: input,
      origin,
      path,
      robots: {
        fetched: robots.text.length > 0,
        status: robots.status,
        error: robots.error,
      },
      results,
      summary,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to check URL: ${message}` }, { status: 500 });
  }
}
