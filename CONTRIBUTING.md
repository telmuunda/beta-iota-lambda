# Contributing / Хувь нэмэр оруулах

**Licence:** by opening a pull request you agree that your contribution is released under the project's licences: CC BY-SA 4.0 for anything in `content/`, MIT for code. If you adapt a problem from an olympiad or a book, rewrite it in your own words, cite the original in `source:`, and never copy an official solution word for word.

You don't need to know React. Notes and problems are single Markdown files.

## Adding a problem

Create `content/problems/pNN-short-name.md`. `NN` is the problem number shown on the site.

```markdown
---
topic: mechanics          # mechanics | oscillations | gravitation | electromagnetism | thermo | optics
difficulty: 2             # 1 warm-up · 2 regional · 3 national+
answer: 14.36             # optional: numeric answer, in SI units unless `unit` says otherwise
unit: m                   # optional: shown next to the answer box
tolerance: 0.01           # optional: relative tolerance (default 1%)
source: IPhO 2019 T1      # optional
sim: projectile           # optional: link to a Lab figure (projectile | pendulum | orbit)
notes: projectile-motion  # optional: comma-separated note ids
author: your-github-name  # optional: credit yourself (several: a, b)
---

<!-- en -->
# Title in English

Statement. Inline math $v = 10\ \text{m/s}$, display math:

$$ R = \frac{v^2}{g} $$

<!-- hint -->
A nudge, not the answer.

<!-- solution -->
The full solution.

<!-- mn -->
# Монгол гарчиг

Нөхцөл…

<!-- hint -->
Сануулга…

<!-- solution -->
Бодолт…
```

If you can only write one language, write that one and leave the other out. The site falls back to English, and someone else can translate it later.

## Adding a note

Create `content/notes/some-id.md`:

```markdown
---
topic: gravitation
order: 4                  # position in the list
sim: orbit                # optional
summary_en: One or two sentences for the index.
summary_mn: Жагсаалтад харагдах нэг хоёр өгүүлбэр.
author: your-github-name  # optional
---

<!-- en -->
# Title

## First section
…

<!-- mn -->
# Гарчиг
…
```

`##` headings are numbered automatically and listed in an "In this note" menu. A `>` blockquote is drawn as a margin remark. Number equations with `\tag{1}`.

Notes can also use blocks. Each starts with `:::kind optional title` and ends with a line containing only `:::`; blocks cannot be nested:

```markdown
:::derivation Period of a pendulum
Step-by-step working…
:::

:::example A 1 m pendulum on the Moon
Full worked solution…
:::

:::check
A question for the reader.
:::

:::answer
Its answer (shown folded).
:::
```

Other kinds: `:::pitfall` (a common mistake) and `:::summary` (key results).

Long notes are written with the help of a Claude project. See `handoff/README.md`.

## Credit

Add `author: your-github-name` to the frontmatter and the page shows "Written by @your-github-name", linked to your GitHub profile. Several people: `author: name1, name2`. If you improve someone else's file, add yourself to the list.

## Before you open a pull request

```bash
npm run check:content
```

This checks every file in `content/`: required fields, both language blocks, hint and solution markers, numeric answers, links to notes and simulations, and that every formula renders. The same check runs automatically on your pull request, and the build must pass before it can be merged.

## Style

- State your approximations ("neglect air resistance", "small angles").
- Give numbers with units and sensible significant figures.
- Prefer the short, clever argument, and show the long one too if it teaches something.
- Mongolian terminology: if you're unsure of a term, write the English one in brackets.

## Adding a simulation

Simulations are React components in `src/sims/`. Register them in `src/sims/index.ts`. Use the helpers in `src/sims/canvas.ts` (`fit`, `ink`, `useFrame`, `arrow`, `hatch`) so figures follow the site's look and dark mode.
