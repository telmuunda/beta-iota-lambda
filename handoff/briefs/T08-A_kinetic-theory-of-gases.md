# Brief T08-A — Kinetic theory of gases

**Handoff ID:** `T08-A`
**Plan task:** T08
**Target file:** `content/notes/kinetic-theory-of-gases.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T08-A → content/notes/kinetic-theory-of-gases.md -->
---
topic: thermo
order: 50
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Kinetic theory of gases**
- Mongolian (suggested; improve if you know a better standard term): **Хийн молекул кинетик онол**

## 3. Goal

After reading, a student can: Connect pressure and temperature to molecular motion, and use equipartition to find heat capacities.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **The ideal gas** — Assumptions; the ideal-gas law $pV = nRT = NkT$ and what each symbol means; Avogadro and Boltzmann constants.
2. **Pressure from molecular collisions** — Derive $p = \tfrac13 nm\langle v^2\rangle$ step by step (wall collisions, time between collisions, averaging over directions).
3. **Temperature and energy** — Combine to get $\tfrac12 m\langle v^2\rangle = \tfrac32 kT$; rms speed, numbers for air.
4. **Equipartition and heat capacity** — Degrees of freedom; $C_V = \tfrac f2 R$ for monatomic and diatomic gases; $C_p - C_V = R$ derived; why vibrations are "frozen" at room temperature (qualitatively).
5. **The Maxwell distribution** — State the distribution, sketch, most probable / mean / rms speeds; the barometric formula $n(h) = n_0e^{-mgh/kT}$ derived from hydrostatic equilibrium.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Kinetic pressure
- $\langle E_k\rangle = \tfrac32 kT$
- $C_p - C_V = R$
- Barometric formula

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- RMS speed of nitrogen and hydrogen at 300 K; why Earth keeps one and not the other
- Pressure in a container after half the molecules are replaced by a heavier gas

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Does a gas at higher temperature exert more force on each collision, more collisions, or both?
- Why is $C_p > C_V$?
- Two gases at the same temperature: which has the larger mean kinetic energy per molecule?

## 8. Common mistakes (`:::pitfall`)

- Confusing $\langle v\rangle^2$ with $\langle v^2\rangle$

## 9. Links you may use (and no others)

- Note: `#/notes/first-law-and-heat-engines` (The first law and heat engines)
- Note: `#/notes/heat-transfer` (Heat transfer)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
