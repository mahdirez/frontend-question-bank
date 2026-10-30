import { useMemo, useSyncExternalStore } from "react";

export type Status = "known" | "unknown";
export type Progress = Record<string, Status>;

const STORAGE_KEY = "feqb:progress:v1";
const listeners = new Set<() => void>();

function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): Progress {
  if (!raw) return {};
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return {};

    const result: Progress = {};
    for (const [id, value] of Object.entries(data)) {
      if (value === "known" || value === "unknown") result[id] = value;
    }
    return result;
  } catch {
    return {};
  }
}

function write(progress: Progress | null) {
  try {
    if (progress === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage may be unavailable (private mode, quota). Ignore.
  }
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Fires when another tab changes the progress.
  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY || e.key === null) listener();
  }
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Returns saved progress. It is empty on the server and on the first client render. */
export function useProgress(): Progress {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  return useMemo(() => parse(raw), [raw]);
}

export function setStatus(id: string, status: Status) {
  write({ ...parse(readRaw()), [id]: status });
}

export function resetProgress() {
  write(null);
}
