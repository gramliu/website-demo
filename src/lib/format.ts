/** Truncates a string to `max` characters, appending an ellipsis if cut. */
export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 1))}…`;
}

/** Formats a date as YYYY-MM-DD (UTC). */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
