# Brief T08-B — The first law, processes and heat engines

**Handoff ID:** `T08-B`
**Plan task:** T08
**Target file:** `content/notes/first-law-and-heat-engines.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T08-B → content/notes/first-law-and-heat-engines.md -->
---
topic: thermo
order: 51
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **The first law, processes and heat engines**
- Mongolian (suggested; improve if you know a better standard term): **Термодинамикийн нэгдүгээр хууль, процесс ба дулааны хөдөлгүүр**

## 3. Goal

After reading, a student can: Analyse any ideal-gas process and cycle, compute efficiencies, and use entropy at olympiad level.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Work, heat and internal energy** — Work $\int p\,dV$ as area on a $pV$ diagram; sign convention stated; the first law; internal energy of an ideal gas depends only on $T$.
2. **The four standard processes** — Isochoric, isobaric, isothermal (work $nRT\ln(V_2/V_1)$ derived), adiabatic: derive $pV^\gamma = $ const from the first law. Table of $Q$, $W$, $\Delta U$ for each.
3. **Cycles and efficiency** — Efficiency of an engine; the Carnot cycle efficiency $1 - T_c/T_h$ derived; Otto cycle efficiency derived; refrigerators and COP.
4. **The second law and entropy** — Statements (Kelvin, Clausius) and why they are equivalent (sketch); entropy $dS = dQ/T$; entropy change of an ideal gas derived; free expansion; why Carnot is the maximum.
5. **Olympiad techniques** — Polytropic processes $pV^n$ = const and their heat capacity; processes given as a line on the $pV$ diagram — where heat is absorbed vs released (finding the turning point).

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Adiabatic law $pV^\gamma$
- Isothermal work
- Carnot efficiency
- Entropy change of an ideal gas

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- A cycle made of a straight line and an isotherm on a pV diagram: efficiency
- Mixing hot and cold water: total entropy change is positive

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Can heat be added to a gas without raising its temperature?
- Why can no engine beat Carnot between the same temperatures?
- Is free expansion reversible? What is $\Delta S$?

## 8. Common mistakes (`:::pitfall`)

- Using $Q = nC_V\Delta T$ for a process that is not at constant volume

## 9. Links you may use (and no others)

- Note: `#/notes/kinetic-theory-of-gases` (Kinetic theory of gases)
- Note: `#/notes/heat-transfer` (Heat transfer)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
