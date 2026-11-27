#!/usr/bin/env node
/*
 * Moves finished notes from handoff/inbox/ into content/.
 *
 *   npm run handoff:import            # every .md file in handoff/inbox/
 *   npm run handoff:import -- file.md # specific files
 *
 * Each file must start with the header from its brief:
 *   <!-- handoff: T06-A → content/notes/newtons-laws-and-constraints.md -->
 * The header must match a brief in handoff/briefs/. The file is checked with
 * the content checker; if it fails, nothing is changed and the errors are shown.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const inbox = join(root, 'handoff/inbox');
const briefDir = join(root, 'handoff/briefs');
const HEADER = /^\s*<!--\s*handoff:\s*([A-Z0-9-]+)\s*(?:→|->)\s*(\S+)\s*-->\s*\r?\n/;

const args = process.argv.slice(2);
const files = args.length
  ? args
  : readdirSync(inbox)
      .filter((f) => f.endsWith('.md'))
      .map((f) => join(inbox, f));
if (!files.length) {
  console.log('Nothing to import: handoff/inbox/ is empty.');
  process.exit(0);
}

function briefTarget(id) {
  const name = readdirSync(briefDir).find((f) => f.startsWith(id + '_'));
  if (!name) return null;
  const m = readFileSync(join(briefDir, name), 'utf8').match(/\*\*Target file:\*\*\s*`([^`]+)`/);
  return m?.[1] ?? null;
}

let failed = 0;
for (const file of files) {
  const rel = relative(root, file);
  let text = readFileSync(file, 'utf8').replace(/^﻿/, '').trim() + '\n';
  // tolerate a reply wrapped in a code fence
  const fenced = text.match(/^(`{3,})[a-z]*\r?\n([\s\S]*?)\r?\n\1\s*$/);
  if (fenced) text = fenced[2] + '\n';

  const h = text.match(HEADER);
  if (!h) {
    console.error(`✗ ${rel}: first line must be the handoff header, e.g. <!-- handoff: T06-A → content/notes/….md -->`);
    failed++;
    continue;
  }
  const [, id, target] = h;
  const expected = briefTarget(id);
  if (!expected) {
    console.error(`✗ ${rel}: no brief named ${id}_*.md in handoff/briefs/`);
    failed++;
    continue;
  }
  if (expected !== target) {
    console.error(`✗ ${rel}: header says ${target}, but brief ${id} targets ${expected}`);
    failed++;
    continue;
  }

  const dest = join(root, target);
  const before = existsSync(dest) ? readFileSync(dest, 'utf8') : null;
  writeFileSync(dest, text.slice(h[0].length));

  const check = spawnSync(process.execPath, [join(root, 'scripts/check-content.mjs')], { encoding: 'utf8' });
  const mine = (check.stderr || '').split('\n').filter((l) => l.includes(target) || l.startsWith('    '));
  if (check.status !== 0 && mine.some((l) => l.includes(target))) {
    // roll back
    if (before === null) unlinkSync(dest);
    else writeFileSync(dest, before);
    console.error(`✗ ${id}: ${target} has problems — nothing was changed:\n` + mine.map((l) => '  ' + l).join('\n'));
    failed++;
    continue;
  }
  if (!args.length) unlinkSync(file);
  console.log(`✓ ${id} → ${target}${before === null ? ' (new)' : ' (replaced)'}`);
}
process.exit(failed ? 1 : 0);
