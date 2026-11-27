import { useEffect, useState } from 'react';
import * as index from 'virtual:content';
import type { Loader, NoteBody, NoteMeta, PageBody, ProblemBody, ProblemMeta } from './content-types';

export type { Localised, NoteMeta, ProblemMeta, Heading } from './content-types';
export type Note = NoteMeta;
export type Problem = ProblemMeta;

/*
 * The index (titles, topics, answers) is small and bundled. Each note's and
 * problem's text is rendered at build time and fetched only when opened.
 * See scripts/vite-content-plugin.mjs.
 */
export const notes = index.notes as NoteMeta[];
export const problems = index.problems as ProblemMeta[];
const noteLoaders = index.noteLoaders as Record<string, Loader<NoteBody>>;
const problemLoaders = index.problemLoaders as Record<string, Loader<ProblemBody>>;
const pageLoaders = index.pageLoaders as Record<string, Loader<PageBody>>;

function useLoaded<T>(loader: Loader<T> | undefined): T | null | undefined {
  const [state, setState] = useState<{ loader?: Loader<T>; value: T | null | undefined }>({ value: undefined });
  useEffect(() => {
    let live = true;
    if (!loader) return;
    loader().then((m) => live && setState({ loader, value: m.default }));
    return () => {
      live = false;
    };
  }, [loader]);
  return state.loader === loader ? state.value : undefined;
}

/** undefined while loading, null if missing. */
export const useNoteBody = (id: string) => useLoaded<NoteBody>(noteLoaders[id]);
export const useProblemBody = (id: string) => useLoaded<ProblemBody>(problemLoaders[id]);
export const usePageBody = (id: string) => useLoaded<PageBody>(pageLoaders[id]);

/** Changes every Monday; deterministic so everyone sees the same one. */
export function problemOfTheWeek(): ProblemMeta | undefined {
  if (!problems.length) return undefined;
  const week = Math.floor((Date.now() / 86400000 + 3) / 7);
  return problems[week % problems.length];
}
