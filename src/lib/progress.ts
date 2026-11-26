import { useCallback, useEffect, useState } from 'react';

const KEY = 'bil.solved';

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Solved problems, remembered in this browser only. */
export function useSolved() {
  const [solved, setSolved] = useState<string[]>(read);
  useEffect(() => {
    const sync = () => setSolved(read());
    window.addEventListener('bil-solved', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('bil-solved', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  const markSolved = useCallback((id: string) => {
    const next = Array.from(new Set([...read(), id]));
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('bil-solved'));
  }, []);
  return { solved, markSolved };
}
