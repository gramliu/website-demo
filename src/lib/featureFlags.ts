export interface FeatureFlags {
  [name: string]: boolean | undefined;
}

/** Returns whether a flag is enabled, defaulting to false for unknown flags. */
export function isFeatureEnabled(flags: FeatureFlags, name: string): boolean {
  return flags[name] ?? false;
}

/** Returns the list of enabled flag names, sorted alphabetically. */
export function enabledFlags(flags: FeatureFlags): string[] {
  return Object.keys(flags)
    .filter((name) => flags[name])
    .sort();
}
