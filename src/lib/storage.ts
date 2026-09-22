// Per-viewer convenience only (onboarding flag, settings, theme) — never
// relied on for anything that must persist reliably or be shared.
export function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private window / blocked storage — fine to no-op.
  }
}
