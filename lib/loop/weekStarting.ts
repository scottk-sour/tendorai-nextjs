/**
 * Week-starting helpers for the Pro Loop. All weeks start Monday 00:00 UTC,
 * matching the backend AgentRun.weekStarting normalisation.
 */

export function normaliseWeekStarting(date: Date): Date {
  const result = new Date(date);
  const day = result.getUTCDay();
  // JS getUTCDay: 0=Sun .. 6=Sat. Convert to Monday-based: Sunday is the previous Monday + 6 days.
  const diffToMonday = day === 0 ? -6 : 1 - day;
  result.setUTCDate(result.getUTCDate() + diffToMonday);
  result.setUTCHours(0, 0, 0, 0);
  return result;
}

export function formatWeekLabel(date: Date): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return `Week of ${d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })}`;
}

export function nextMondayLabel(now: Date = new Date()): string {
  const monday = normaliseWeekStarting(now);
  // Next Monday is always the Monday after the current week's Monday
  monday.setUTCDate(monday.getUTCDate() + 7);
  return monday.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

/**
 * Returns "today", "yesterday", or a weekday name for any datetime within the
 * last 7 days, otherwise a localised date.
 */
export function relativeDayLabel(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return '—';
  const startOfNow = new Date(now);
  startOfNow.setHours(0, 0, 0, 0);
  const startOfThen = new Date(then);
  startOfThen.setHours(0, 0, 0, 0);
  const diffDays = Math.round((startOfNow.getTime() - startOfThen.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays > 1 && diffDays < 7) return then.toLocaleDateString('en-GB', { weekday: 'long' });
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function timeOfDayLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}
