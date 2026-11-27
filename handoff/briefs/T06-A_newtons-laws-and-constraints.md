# Brief T06-A — Newton's laws, free-body diagrams and constraints

**Handoff ID:** `T06-A`
**Plan task:** T06
**Target file:** `content/notes/newtons-laws-and-constraints.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T06-A → content/notes/newtons-laws-and-constraints.md -->
---
topic: mechanics
order: 10
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Newton's laws, free-body diagrams and constraints**
- Mongolian (suggested; improve if you know a better standard term): **Ньютоны хуулиуд, хүчний диаграм ба холбоосууд**

## 3. Goal

After reading, a student can: Solve any system of blocks, strings, pulleys and wedges by writing Newton's second law for each body plus the constraint equations — and know when to switch to a non-inertial frame.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Inertial frames and the three laws** — What an inertial frame is and how to test for one; the laws as statements about interactions; why the third law pairs act on different bodies. Mass as inertia.
2. **Free-body diagrams done properly** — A step-by-step recipe (isolate, list contacts, draw every force, choose axes). Normal force and tension as constraint forces whose size is *unknown* until solved. Static vs kinetic friction, $f \le \mu N$ as an inequality, deciding whether something slips.
3. **Constraint equations** — Derive length-of-string constraints for pulley systems (fixed and movable pulleys, e.g. $2a_1 + a_2 = 0$) by differentiating the string length twice. Derive the wedge constraint for a block sliding on a moving wedge. Count unknowns vs equations.
4. **Non-inertial frames** — Derive the inertial (pseudo) force $-m\vec a_0$ from the transformation of accelerations. Use it for: a pendulum in an accelerating car (equilibrium angle $\tan\theta = a/g$), effective gravity. Brief mention of centrifugal force in rotating frames (Coriolis named but not developed).
5. **Olympiad techniques** — Choosing the system cleverly (internal forces cancel), virtual work / energy as a shortcut for constraint problems, checking with limiting cases ($M\to\infty$, $\mu\to 0$).

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Pulley constraint $\sum$ (string lengths) = const ⇒ relation between accelerations
- Acceleration of a block on a free frictionless wedge (both bodies move); check limits $M \to \infty$ and $M \to 0$
- Pseudo-force from $\vec a = \vec a\,' + \vec a_0$

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Atwood machine with a movable pulley: find all accelerations and the tension
- Block on a wedge resting on a frictionless floor (classic olympiad problem): accelerations of both, normal force

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Why can a horse pull a cart if the cart pulls back equally?
- In which direction does friction act on the rear wheel of an accelerating bicycle?
- A helium balloon in an accelerating car: which way does it lean?

## 8. Common mistakes (`:::pitfall`)

- Putting $ma$ on the free-body diagram as if it were a force; assuming $f = \mu N$ when the surface does not slip

## 9. Links you may use (and no others)

- Problem: `#/problems/p03-chain`
- Note: `#/notes/momentum-and-collisions` (Momentum and collisions)
- Note: `#/notes/projectile-motion` (Projectiles, the safety parabola and drag)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
