# Brief T08-C — Heat transfer: conduction, convection and radiation

**Handoff ID:** `T08-C`
**Plan task:** T08
**Target file:** `content/notes/heat-transfer.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T08-C → content/notes/heat-transfer.md -->
---
topic: thermo
order: 52
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Heat transfer: conduction, convection and radiation**
- Mongolian (suggested; improve if you know a better standard term): **Дулаан дамжуулалт: дулаан дамжуулал, конвекц ба цацрал**

## 3. Goal

After reading, a student can: Compute heat flows through walls and rods, cooling rates, and radiative equilibrium temperatures.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Conduction** — Fourier's law; derive the steady flow through a slab; thermal resistance and series/parallel combination (analogy with circuits, table); temperature profile in a composite wall.
2. **Conduction in other shapes** — Radial flow through a cylindrical pipe and a spherical shell, derived ($\ln$ and $1/r$ results). Time to freeze a pond (ice thickness $\propto\sqrt t$), derived.
3. **Newton's law of cooling** — Derive exponential cooling; when it is valid; numbers for a cup of tea.
4. **Radiation** — Black body; Stefan–Boltzmann law; Wien's law; emissivity; net radiation between a body and surroundings; linearisation $4\sigma T^3\Delta T$ for small differences.
5. **Radiative equilibrium** — Temperature of a planet from solar luminosity derived ($T = T_\odot\sqrt{R_\odot/2d}$ for a fast-rotating black body); greenhouse layer model briefly.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Heat flow through a slab and thermal resistance
- Radial conduction in a pipe
- Growth of ice thickness $\propto \sqrt t$
- Equilibrium temperature of a planet

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Double glazing vs single glass: heat loss ratio
- Earth's equilibrium temperature with and without albedo

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Why does metal feel colder than wood at the same temperature?
- Does a thicker layer of insulation on a thin pipe always reduce heat loss? (critical radius)
- Why does a black car get hotter in the sun?

## 8. Common mistakes (`:::pitfall`)

- Adding temperatures in Kelvin vs Celsius in radiation formulas

## 9. Links you may use (and no others)

- Note: `#/notes/kinetic-theory-of-gases` (Kinetic theory of gases)
- Note: `#/notes/first-law-and-heat-engines` (The first law and heat engines)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
