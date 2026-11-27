# Brief T07-A — Electrostatics and Gauss's law

**Handoff ID:** `T07-A`
**Plan task:** T07
**Target file:** `content/notes/electrostatics-and-gauss.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T07-A → content/notes/electrostatics-and-gauss.md -->
---
topic: electromagnetism
order: 40
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Electrostatics and Gauss's law**
- Mongolian (suggested; improve if you know a better standard term): **Электростатик ба Гауссын теорем**

## 3. Goal

After reading, a student can: Find fields and potentials of symmetric charge distributions with Gauss's law, and reason about conductors and capacitors.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Charge, Coulomb's law and the field** — Superposition; field of a ring on its axis and of a finite line by integration.
2. **Flux and Gauss's law** — Define flux; derive Gauss's law for a point charge (solid angle argument) and extend by superposition. When it is useful: only with symmetry. Fields of a sphere (inside/outside, shell and uniform ball), infinite line, infinite plane.
3. **Potential and energy** — $V = -\int \vec E\cdot d\vec l$; potentials of the cases above; equipotentials; energy of a system of charges and of a charged sphere ($\tfrac35 kQ^2/R$); energy density $\tfrac12\varepsilon_0E^2$ derived from a capacitor.
4. **Conductors** — Field inside is zero — why; charge on the surface; field just outside $\sigma/\varepsilon_0$; method of images for a point charge near a grounded plane (force derived).
5. **Capacitors** — Parallel-plate capacitance derived; series/parallel; energy; force between plates (and why it is $\tfrac12QE$, not $QE$); dielectric briefly.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Gauss's law from Coulomb
- Field of a uniformly charged ball inside and outside
- Self-energy of a charged sphere
- Force between capacitor plates

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Field and potential of a spherical shell with a point charge at its centre
- Point charge above a grounded plate: force and induced surface charge

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Is the field zero inside a charged hollow conductor of any shape? Inside a charged non-conducting shell?
- Why is the force between capacitor plates half of $QE$?
- Where is $V=0$ and $E=0$ for two equal opposite charges?

## 8. Common mistakes (`:::pitfall`)

- Applying Gauss's law to a cube or finite rod and "pulling $E$ out of the integral"

## 9. Links you may use (and no others)

- Note: `#/notes/dc-and-rc-circuits` (DC and RC circuits)
- Note: `#/notes/electromagnetic-induction` (Electromagnetic induction)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
