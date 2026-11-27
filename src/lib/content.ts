import type { Lang, Topic } from './i18n';

/*
 * Notes and problems are plain Markdown files in /content.
 * See CONTRIBUTING.md for the format. Everything is bundled at build
 * time, so the site stays a static folder that can be hosted anywhere.
 */

const noteFiles = import.meta.glob('/content/notes/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const problemFiles = import.meta.glob('/content/problems/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

type Front = Record<string, string>;

function splitFront(raw: string): { front: Front; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { front: {}, body: raw };
  const front: Front = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0)
      front[line.slice(0, i).trim()] = line
        .slice(i + 1)
        .replace(/\s+#.*$/, '') // allow `key: value   # comment`
        .trim()
        .replace(/^["']|["']$/g, '');
  }
  return { front, body: m[2] };
}

/** Split a body on `<!-- en -->` / `<!-- mn -->` markers. */
function splitLangs(body: string): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  const parts = body.split(/<!--\s*(en|mn)\s*-->/);
  for (let i = 1; i < parts.length; i += 2) out[parts[i] as Lang] = parts[i + 1].trim();
  if (!out.en && !out.mn) out.en = body.trim();
  return out;
}

function takeTitle(md: string): { title: string; rest: string } {
  const m = md.match(/^#\s+(.+)\r?\n?/);
  return m ? { title: m[1].trim(), rest: md.slice(m[0].length).trim() } : { title: '', rest: md };
}

const idOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');
/** GitHub usernames, written `author: name` or `author: a, b`. */
const authorList = (s?: string) => list(s).map((a) => a.replace(/^@/, ''));
const list = (s?: string) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);

export interface Localised<T> {
  en: T;
  mn?: T;
}

export interface Note {
  id: string;
  authors: string[];
  topic: Topic;
  order: number;
  sim?: string;
  title: Localised<string>;
  summary: Localised<string>;
  body: Localised<string>;
}

export interface ProblemText {
  title: string;
  statement: string;
  hint: string;
  solution: string;
}

export interface Problem {
  id: string;
  authors: string[];
  number: number;
  topic: Topic;
  difficulty: number;
  answer?: number;
  unit?: string;
  tolerance: number;
  source?: string;
  sim?: string;
  notes: string[];
  text: Localised<ProblemText>;
}

function localise<T>(parts: Partial<Record<Lang, string>>, f: (md: string) => T): Localised<T> {
  const en = f(parts.en ?? parts.mn ?? '');
  return parts.mn ? { en, mn: f(parts.mn) } : { en };
}

export const notes: Note[] = Object.entries(noteFiles)
  .map(([path, raw]) => {
    const { front, body } = splitFront(raw);
    const langs = splitLangs(body);
    return {
      id: idOf(path),
      authors: authorList(front.author),
      topic: front.topic as Topic,
      order: Number(front.order ?? 99),
      sim: front.sim,
      title: localise(langs, (md) => takeTitle(md).title),
      summary: { en: front.summary_en ?? '', mn: front.summary_mn },
      body: localise(langs, (md) => takeTitle(md).rest),
    };
  })
  .sort((a, b) => a.order - b.order);

function parseProblem(md: string): ProblemText {
  const { title, rest } = takeTitle(md);
  const [statement, afterHint = ''] = rest.split(/<!--\s*hint\s*-->/);
  const [hint, solution = ''] = afterHint.includes('<!--') ? afterHint.split(/<!--\s*solution\s*-->/) : [afterHint, ''];
  return { title, statement: statement.trim(), hint: hint.trim(), solution: solution.trim() };
}

export const problems: Problem[] = Object.entries(problemFiles)
  .map(([path, raw]) => {
    const { front, body } = splitFront(raw);
    const id = idOf(path);
    return {
      id,
      authors: authorList(front.author),
      number: Number(id.match(/\d+/)?.[0] ?? 0),
      topic: front.topic as Topic,
      difficulty: Number(front.difficulty ?? 1),
      answer: front.answer ? Number(front.answer) : undefined,
      unit: front.unit,
      tolerance: Number(front.tolerance ?? 0.01),
      source: front.source,
      sim: front.sim,
      notes: list(front.notes),
      text: localise(splitLangs(body), parseProblem),
    };
  })
  .sort((a, b) => a.number - b.number);

/** Changes every Monday; deterministic so everyone sees the same one. */
export function problemOfTheWeek(): Problem | undefined {
  if (!problems.length) return undefined;
  const week = Math.floor((Date.now() / 86400000 + 3) / 7);
  return problems[week % problems.length];
}
