#!/usr/bin/env node
/*
 * Checks every file in content/ before it reaches the site.
 * Run: npm run check:content   (CI runs it on every pull request)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import katex from 'katex';

const root = new URL('..', import.meta.url).pathname;
const TOPICS = ['mechanics', 'oscillations', 'gravitation', 'electromagnetism', 'thermo', 'optics'];
const SIMS = [...readFileSync(join(root, 'src/sims/index.ts'), 'utf8').matchAll(/id:\s*'([\w-]+)'/g)].map((m) => m[1]);
const GITHUB_USER = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

function splitFront(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const front = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) front[line.slice(0, i).trim()] = line.slice(i + 1).replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '');
  }
  return { front, body: m[2] };
}

function splitLangs(body) {
  const out = {};
  const parts = body.split(/<!--\s*(en|mn)\s*-->/);
  for (let i = 1; i < parts.length; i += 2) out[parts[i]] = parts[i + 1].trim();
  return out;
}

function checkMath(file, lang, md) {
  const blocks = [...md.matchAll(/\$\$([\s\S]+?)\$\$/g)].map((m) => [m[1], true]);
  const rest = md.replace(/\$\$[\s\S]+?\$\$/g, '');
  const inline = [...rest.matchAll(/(^|[^\\])\$([^$\n]+?)\$/g)].map((m) => [m[2], false]);
  for (const [tex, display] of [...blocks, ...inline]) {
    try {
      katex.renderToString(tex.trim(), { displayMode: display, throwOnError: true });
    } catch (e) {
      fail(file, `[${lang}] formula does not render: ${String(e.message).split('\n')[0]}\n    ${tex.trim().slice(0, 80)}`);
    }
  }
  const unmatched = rest.replace(/(^|[^\\])\$([^$\n]+?)\$/g, '').match(/(^|[^\\])\$/m);
  if (unmatched) fail(file, `[${lang}] a $ has no closing $ (write \\$ for a literal dollar sign)`);
}

function checkAuthor(file, front) {
  if (!front.author) return;
  for (const a of front.author.split(',').map((s) => s.trim())) {
    if (!GITHUB_USER.test(a.replace(/^@/, ''))) fail(file, `author "${a}" is not a GitHub username`);
  }
}

function checkLangs(file, body, { needTitle = true } = {}) {
  const langs = splitLangs(body);
  for (const l of ['en', 'mn']) {
    if (!langs[l]) fail(file, `missing the <!-- ${l} --> block`);
    else if (needTitle && !/^#\s+\S/.test(langs[l])) fail(file, `[${l}] must start with a "# Title" line`);
  }
  for (const [l, md] of Object.entries(langs)) checkMath(file, l, md);
  return langs;
}

// ---------- notes ----------
const noteDir = join(root, 'content/notes');
const noteIds = new Set();
for (const name of readdirSync(noteDir).filter((f) => f.endsWith('.md'))) {
  const file = `content/notes/${name}`;
  noteIds.add(basename(name, '.md'));
  const parsed = splitFront(readFileSync(join(noteDir, name), 'utf8'));
  if (!parsed) {
    fail(file, 'missing the --- frontmatter --- block at the top');
    continue;
  }
  const { front, body } = parsed;
  if (!TOPICS.includes(front.topic)) fail(file, `topic must be one of: ${TOPICS.join(', ')}`);
  if (front.order === undefined || Number.isNaN(Number(front.order))) fail(file, 'order must be a number');
  if (!front.summary_en) fail(file, 'summary_en is required');
  if (!front.summary_mn) fail(file, 'summary_mn is required');
  if (front.sim && !SIMS.includes(front.sim)) fail(file, `sim "${front.sim}" does not exist (known: ${SIMS.join(', ')})`);
  checkAuthor(file, front);
  checkLangs(file, body);
}

// ---------- problems ----------
const probDir = join(root, 'content/problems');
const numbers = new Map();
for (const name of readdirSync(probDir).filter((f) => f.endsWith('.md'))) {
  const file = `content/problems/${name}`;
  const num = name.match(/^p(\d+)-[a-z0-9-]+\.md$/);
  if (!num) fail(file, 'file name must look like p12-short-name.md');
  else if (numbers.has(+num[1])) fail(file, `problem number ${+num[1]} is already used by ${numbers.get(+num[1])}`);
  else numbers.set(+num[1], name);

  const parsed = splitFront(readFileSync(join(probDir, name), 'utf8'));
  if (!parsed) {
    fail(file, 'missing the --- frontmatter --- block at the top');
    continue;
  }
  const { front, body } = parsed;
  if (!TOPICS.includes(front.topic)) fail(file, `topic must be one of: ${TOPICS.join(', ')}`);
  if (!['1', '2', '3'].includes(front.difficulty)) fail(file, 'difficulty must be 1, 2 or 3');
  if (front.answer !== undefined && !Number.isFinite(Number(front.answer))) fail(file, `answer "${front.answer}" is not a number`);
  if (front.answer !== undefined && Number(front.answer) === 0) fail(file, 'answer 0 cannot be checked with a relative tolerance');
  if (front.tolerance !== undefined) {
    const t = Number(front.tolerance);
    if (!(t > 0 && t < 0.5)) fail(file, 'tolerance must be a fraction between 0 and 0.5, e.g. 0.01 for 1%');
  }
  if (front.sim && !SIMS.includes(front.sim)) fail(file, `sim "${front.sim}" does not exist (known: ${SIMS.join(', ')})`);
  for (const n of (front.notes ?? '').split(',').map((s) => s.trim()).filter(Boolean)) {
    if (!existsSync(join(noteDir, `${n}.md`))) fail(file, `notes: "${n}" is not a note in content/notes/`);
  }
  checkAuthor(file, front);
  const langs = checkLangs(file, body);
  for (const [l, md] of Object.entries(langs)) {
    if (!/<!--\s*hint\s*-->/.test(md)) fail(file, `[${l}] missing <!-- hint -->`);
    if (!/<!--\s*solution\s*-->/.test(md)) fail(file, `[${l}] missing <!-- solution -->`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) in content/:\n`);
  for (const e of errors) console.error('  ' + e);
  console.error('\nSee CONTRIBUTING.md for the format.');
  process.exit(1);
}
console.log(`✓ content OK — ${noteIds.size} notes, ${numbers.size} problems`);
