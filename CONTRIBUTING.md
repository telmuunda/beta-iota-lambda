# Contributing / Хувь нэмэр оруулах

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
---

<!-- en -->
# Title

## First section
…

<!-- mn -->
# Гарчиг
…
```

`##` headings are numbered automatically. A `>` blockquote is drawn as a margin remark.

## Style

- State your approximations ("neglect air resistance", "small angles").
- Give numbers with units and sensible significant figures.
- Prefer the short, clever argument, and show the long one too if it teaches something.
- Mongolian terminology: if you're unsure of a term, write the English one in brackets.

## Adding a simulation

Simulations are React components in `src/sims/`. Register them in `src/sims/index.ts`. Use the helpers in `src/sims/canvas.ts` (`fit`, `ink`, `useFrame`, `arrow`, `hatch`) so figures follow the site's look and dark mode.
