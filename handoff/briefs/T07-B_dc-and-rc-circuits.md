# Brief T07-B — DC and RC circuits

**Handoff ID:** `T07-B`
**Plan task:** T07
**Target file:** `content/notes/dc-and-rc-circuits.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T07-B → content/notes/dc-and-rc-circuits.md -->
---
topic: electromagnetism
order: 41
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **DC and RC circuits**
- Mongolian (suggested; improve if you know a better standard term): **Тогтмол гүйдэл ба RC хэлхээ**

## 3. Goal

After reading, a student can: Solve any resistor network (including infinite and symmetric ones) and the time behaviour of RC circuits.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Current, resistance and Ohm's law** — Drift model of current; derive $R = \rho L/A$; power $I^2R$; EMF and internal resistance; maximum power transfer derived.
2. **Kirchhoff's rules** — Both rules from charge and energy conservation; a systematic method (loop currents or node potentials); series and parallel derived.
3. **Tricks for networks** — Symmetry and equipotential points (the cube of resistors between opposite corners, derived), the infinite ladder (self-similarity), the infinite grid (superposition argument for adjacent nodes, $R/2$), star–delta briefly.
4. **Charging and discharging a capacitor** — Set up and solve $RC\,dQ/dt + Q = C\mathcal E$; time constant; energy: show half the battery's energy is dissipated, independent of $R$.
5. **Measuring instruments** — Ideal and real ammeters/voltmeters, potentiometer and Wheatstone bridge with balance condition derived.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Maximum power transfer
- Resistance of a cube between opposite corners
- Infinite ladder resistance
- Capacitor charging $Q(t)$ and the energy balance

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Infinite square grid: resistance between neighbouring nodes
- Two capacitors connected after charging: where does energy go?

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Why does a capacitor block DC but not the initial current?
- Does a bulb in series with a capacitor ever light up on DC?
- What happens to the cube answer if one resistor is removed?

## 8. Common mistakes (`:::pitfall`)

- Combining resistors "in parallel" that do not share both ends

## 9. Links you may use (and no others)

- Note: `#/notes/electrostatics-and-gauss` (Electrostatics and Gauss's law)
- Note: `#/notes/electromagnetic-induction` (Electromagnetic induction)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
