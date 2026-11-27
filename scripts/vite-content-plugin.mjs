/*
 * Vite plugin: reads content/ at build time and serves it as virtual modules.
 *
 *   virtual:content                → lightweight index (titles, topics, answers…)
 *   virtual:content/note/<id>      → one note's rendered HTML (loaded on demand)
 *   virtual:content/problem/<id>   → one problem's statement / hint / solution
 *   virtual:content/page/<id>      → a static page such as "about"
 *
 * KaTeX and Markdown run here, in Node — none of it is shipped to the browser.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { splitFront, splitLangs, takeTitle, render, list, authorList } from './content-lib.mjs';

const PREFIX = 'virtual:content';

export default function contentPlugin({ root = process.cwd() } = {}) {
  const dir = resolve(root, 'content');
  const files = (sub) => {
    const d = join(dir, sub);
    return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.md') && !f.startsWith('LICENSE')).map((f) => join(d, f)) : [];
  };
  const id = (path) => basename(path, '.md');
  const read = (ctx, path) => {
    ctx.addWatchFile(path);
    return readFileSync(path, 'utf8');
  };
  const warnMath = (ctx, path, lang, r) => {
    for (const e of r.mathErrors) ctx.warn(`${path} [${lang}] formula does not render: ${e.message}`);
  };

  function noteMeta(ctx, path) {
    const parsed = splitFront(read(ctx, path));
    const { front, body } = parsed ?? { front: {}, body: '' };
    const langs = splitLangs(body);
    const title = {};
    for (const l of ['en', 'mn']) if (langs[l]) title[l] = takeTitle(langs[l]).title;
    return {
      id: id(path),
      topic: front.topic,
      order: Number(front.order ?? 99),
      sim: front.sim,
      authors: authorList(front.author),
      title: { en: title.en ?? title.mn ?? id(path), ...(title.mn ? { mn: title.mn } : {}) },
      summary: { en: front.summary_en ?? '', ...(front.summary_mn ? { mn: front.summary_mn } : {}) },
      langs: Object.keys(langs),
    };
  }

  function problemParts(md) {
    const { title, rest } = takeTitle(md);
    const [statement, afterHint = ''] = rest.split(/<!--\s*hint\s*-->/);
    const [hint, solution = ''] = afterHint.split(/<!--\s*solution\s*-->/);
    return { title, statement: statement.trim(), hint: hint.trim(), solution: solution.trim() };
  }

  function problemMeta(ctx, path) {
    const parsed = splitFront(read(ctx, path));
    const { front, body } = parsed ?? { front: {}, body: '' };
    const langs = splitLangs(body);
    const title = {};
    for (const l of ['en', 'mn']) if (langs[l]) title[l] = problemParts(langs[l]).title;
    return {
      id: id(path),
      number: Number(id(path).match(/\d+/)?.[0] ?? 0),
      topic: front.topic,
      difficulty: Number(front.difficulty ?? 1),
      answer: front.answer !== undefined ? Number(front.answer) : undefined,
      unit: front.unit,
      tolerance: Number(front.tolerance ?? 0.01),
      source: front.source,
      sim: front.sim,
      notes: list(front.notes),
      authors: authorList(front.author),
      title: { en: title.en ?? title.mn ?? id(path), ...(title.mn ? { mn: title.mn } : {}) },
      langs: Object.keys(langs),
    };
  }

  return {
    name: 'bil-content',
    resolveId(source) {
      if (source === PREFIX || source.startsWith(PREFIX + '/')) return '\0' + source;
    },
    load(vid) {
      if (!vid.startsWith('\0' + PREFIX)) return;
      const key = vid.slice(1);

      if (key === PREFIX) {
        const notes = files('notes').map((p) => noteMeta(this, p)).sort((a, b) => a.order - b.order);
        const problems = files('problems').map((p) => problemMeta(this, p)).sort((a, b) => a.number - b.number);
        const loaders = (kind, ids) =>
          '{' + ids.map((i) => `${JSON.stringify(i)}: () => import(${JSON.stringify(`${PREFIX}/${kind}/${i}`)})`).join(',\n') + '}';
        return [
          `export const notes = ${JSON.stringify(notes)};`,
          `export const problems = ${JSON.stringify(problems)};`,
          `export const noteLoaders = ${loaders('note', notes.map((n) => n.id))};`,
          `export const problemLoaders = ${loaders('problem', problems.map((p) => p.id))};`,
          `export const pageLoaders = ${loaders('page', files('pages').map(id))};`,
        ].join('\n');
      }

      const [, kind, name] = key.match(/^virtual:content\/(note|problem|page)\/(.+)$/) ?? [];
      const path = join(dir, kind === 'page' ? 'pages' : kind + 's', name + '.md');
      if (!kind || !existsSync(path)) return 'export default null;';
      const raw = read(this, path);
      const { body } = splitFront(raw) ?? { body: raw };
      const langs = splitLangs(body);
      const out = {};
      for (const [lang, md] of Object.entries(langs)) {
        if (kind === 'problem') {
          const parts = problemParts(md);
          out[lang] = {};
          for (const part of ['statement', 'hint', 'solution']) {
            const r = render(parts[part], lang);
            warnMath(this, path, lang, r);
            out[lang][part] = r.html;
          }
        } else {
          const { title, rest } = takeTitle(md);
          const r = render(rest, lang);
          warnMath(this, path, lang, r);
          out[lang] = { title, html: r.html, headings: r.headings };
        }
      }
      return `export default ${JSON.stringify(out)};`;
    },
    configureServer(server) {
      // a new or deleted content file changes the index
      const refresh = (file) => {
        if (!file.startsWith(dir)) return;
        for (const m of server.moduleGraph.idToModuleMap.values()) {
          if (m.id?.startsWith('\0' + PREFIX)) server.moduleGraph.invalidateModule(m);
        }
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(dir);
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
      server.watcher.on('change', refresh);
    },
  };
}
