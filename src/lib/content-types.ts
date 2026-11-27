import type { Lang, Topic } from './i18n';

export interface Localised<T> {
  en: T;
  mn?: T;
}

export interface NoteMeta {
  id: string;
  topic: Topic;
  order: number;
  sim?: string;
  authors: string[];
  title: Localised<string>;
  summary: Localised<string>;
  langs: Lang[];
}

export interface ProblemMeta {
  id: string;
  number: number;
  topic: Topic;
  difficulty: number;
  answer?: number;
  unit?: string;
  tolerance: number;
  source?: string;
  sim?: string;
  notes: string[];
  authors: string[];
  title: Localised<string>;
  langs: Lang[];
}

export interface Heading {
  id: string;
  text: string;
}

/** Pre-rendered HTML, per language. */
export type NoteBody = Partial<Record<Lang, { title: string; html: string; headings: Heading[] }>>;
export type PageBody = NoteBody;
export type ProblemBody = Partial<Record<Lang, { statement: string; hint: string; solution: string }>>;

export type Loader<T> = () => Promise<{ default: T | null }>;
