/*
 * Shared by the build (vite plugin) and the content checker.
 * Turns the Markdown files in content/ into data + pre-rendered HTML, so the
 * browser never has to download KaTeX or a Markdown parser.
 */
import katex from 'katex';
import { Marked } from 'marked';

export const TOPICS = ['mechanics', 'oscillations', 'gravitation', 'electromagnetism', 'thermo', 'optics'];

/* ---------- frontmatter & language blocks ---------- */

export function splitFront(raw) {
  const m = raw.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const front = {};
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
export function splitLangs(body) {
  const out = {};
  const parts = body.split(/<!--\s*(en|mn)\s*-->/);
  for (let i = 1; i < parts.length; i += 2) out[parts[i]] = parts[i + 1].trim();
  return out;
}

export function takeTitle(md) {
  const m = md.match(/^#\s+(.+)\r?\n?/);
  return m ? { title: m[1].trim(), rest: md.slice(m[0].length).trim() } : { title: '', rest: md };
}

export const list = (s) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);
export const authorList = (s) => list(s).map((a) => a.replace(/^@/, ''));

/* ---------- special blocks ---------- */

/*
 *   :::derivation Period of a pendulum
 *   …markdown…
 *   :::
 */
export const BLOCKS = {
  derivation: { en: 'Derivation', mn: 'Гаргалгаа', tag: 'details', open: true },
  example: { en: 'Worked example', mn: 'Жишээ бодлого', tag: 'aside' },
  check: { en: 'Check yourself', mn: 'Өөрийгөө шалга', tag: 'aside' },
  answer: { en: 'Answer', mn: 'Хариу', tag: 'details', open: false },
  pitfall: { en: 'Common mistake', mn: 'Түгээмэл алдаа', tag: 'aside' },
  summary: { en: 'Key results', mn: 'Гол үр дүн', tag: 'aside' },
};

const OPEN = /^:::([a-z]+)(?:[ \t]+(.*?))?[ \t]*$/;
const CLOSE = /^:::[ \t]*$/;

/** Find `:::kind title` … `:::` regions. Returns errors instead of throwing. */
export function scanBlocks(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  const errors = [];
  let cur = null;
  lines.forEach((line, i) => {
    const o = line.match(OPEN);
    if (o && !CLOSE.test(line)) {
      if (cur) errors.push(`line ${i + 1}: ":::${o[1]}" opens inside ":::${cur.kind}" (line ${cur.line}) — blocks cannot be nested`);
      else if (!BLOCKS[o[1]]) errors.push(`line ${i + 1}: unknown block ":::${o[1]}" (use: ${Object.keys(BLOCKS).join(', ')})`);
      else cur = { kind: o[1], title: o[2] ?? '', line: i + 1, start: i };
      return;
    }
    if (CLOSE.test(line)) {
      if (!cur) errors.push(`line ${i + 1}: ":::" closes nothing`);
      else {
        out.push({ ...cur, end: i });
        cur = null;
      }
    }
  });
  if (cur) errors.push(`line ${cur.line}: ":::${cur.kind}" is never closed with ":::"`);
  return { blocks: out, lines, errors };
}

/* ---------- Markdown + TeX ---------- */

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function slug(text) {
  return (
    'h-' +
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60)
  );
}

/**
 * Render Markdown with `$…$` / `$$…$$` math and `:::` blocks.
 * Returns { html, headings, mathErrors }.
 */
export function render(md, lang = 'en', { throwOnMathError = false } = {}) {
  const headings = [];
  const mathErrors = [];

  const math = (tex, display) => {
    try {
      return katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' });
    } catch (e) {
      mathErrors.push({ tex, message: String(e.message).split('\n')[0] });
      if (throwOnMathError) throw e;
      return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore' });
    }
  };

  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth === 2) {
          let id = slug(inner);
          if (headings.some((h) => h.id === id)) id += '-' + headings.length;
          headings.push({ id, text: inner.replace(/<[^>]+>/g, '') });
          return `<h2 id="${id}">${inner}</h2>\n`;
        }
        return `<h${depth}>${inner}</h${depth}>\n`;
      },
    },
  });

  const one = (src) => {
    const store = [];
    const keep = (html) => `MATHPH${store.push(html) - 1}X`;
    let text = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => '\n\n' + keep(math(tex.trim(), true)) + '\n\n');
    text = text.replace(/(^|[^\\])\$([^$\n]+?)\$/g, (_, pre, tex) => pre + keep(math(tex, false)));
    text = text.replace(/\\\$/g, '$');
    let html = marked.parse(text, { async: false });
    html = html.replace(/<p>\s*MATHPH(\d+)X\s*<\/p>/g, (_, i) => `<div class="eq">${store[+i]}</div>`);
    return html.replace(/MATHPH(\d+)X/g, (_, i) => store[+i]);
  };

  // cut out ::: blocks, render each on its own, put them back
  const { blocks, lines } = scanBlocks(md);
  const pieces = [];
  let last = 0;
  for (const b of blocks) {
    pieces.push(one(lines.slice(last, b.start).join('\n')));
    const def = BLOCKS[b.kind];
    const label = def[lang] ?? def.en;
    const title = b.title ? one(b.title).replace(/^<p>|<\/p>\s*$/g, '') : '';
    const head = `<span class="block-label">${label}</span>${title ? `<span class="block-title">${title}</span>` : ''}`;
    const inner = one(lines.slice(b.start + 1, b.end).join('\n'));
    pieces.push(
      def.tag === 'details'
        ? `<details class="block block-${b.kind}"${def.open ? ' open' : ''}><summary>${head}</summary><div class="block-body">${inner}</div></details>`
        : `<aside class="block block-${b.kind}"><div class="block-head">${head}</div><div class="block-body">${inner}</div></aside>`,
    );
    last = b.end + 1;
  }
  pieces.push(one(lines.slice(last).join('\n')));
  return { html: pieces.join('\n'), headings, mathErrors };
}

export { esc };
