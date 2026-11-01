// Sends a custom event to Plausible. Does nothing if analytics is not set up.
export function track(name: string, props?: Record<string, string | number>) {
  try {
    (window as unknown as { plausible?: (n: string, o?: unknown) => void }).plausible?.(name, props ? { props } : undefined);
  } catch {}
}
