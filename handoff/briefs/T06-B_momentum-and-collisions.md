# Brief T06-B — Momentum, the centre of mass and collisions

**Handoff ID:** `T06-B`
**Plan task:** T06
**Target file:** `content/notes/momentum-and-collisions.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T06-B → content/notes/momentum-and-collisions.md -->
---
topic: mechanics
order: 11
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Momentum, the centre of mass and collisions**
- Mongolian (suggested; improve if you know a better standard term): **Импульс, масс төв ба мөргөлдөөн**

## 3. Goal

After reading, a student can: Use momentum conservation and the centre-of-mass frame to solve collision, explosion and variable-mass problems quickly.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Momentum and impulse** — Derive $\vec F\,dt = d\vec p$; impulse as area under $F(t)$; when momentum is conserved (no external force *along a direction*).
2. **The centre of mass** — Define $\vec R = \sum m_i\vec r_i / M$; derive $M\ddot{\vec R} = \vec F_{\text{ext}}$. Continuous bodies: centre of mass of a rod, a semicircular wire, a solid hemisphere by integration.
3. **The centre-of-mass frame** — Derive $K = \tfrac12 MV^2 + K_{\text{cm}}$ (König's theorem). Relative velocity and reduced mass $\mu = m_1m_2/(m_1+m_2)$; the kinetic energy available for deformation is $\tfrac12\mu v_{\text{rel}}^2$.
4. **Collisions in one dimension** — Elastic: derive the final velocities (show the "velocities reflect in the CM frame" shortcut). Inelastic: coefficient of restitution $e$, energy lost $\tfrac12\mu v_{\text{rel}}^2(1-e^2)$.
5. **Collisions in two dimensions** — Equal-mass elastic collision: the 90° rule, derived. Momentum diagrams. Mention of the CM-frame circle construction.
6. **Variable mass: the rocket** — Derive the rocket equation $\Delta v = u\ln(m_0/m)$ carefully from momentum, not from $F = d(mv)/dt$ (explain why that form misleads). Also a chain/conveyor-belt example.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- $M\ddot{\vec R} = \vec F_{\text{ext}}$
- König's theorem
- Final velocities in a 1-D elastic collision
- Energy loss in terms of $e$ and $\mu$
- Rocket equation

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- A ball dropped onto a heavy ball (stacked balls): how high does the top one go?
- Sand falling onto a moving conveyor belt: force needed and power, where does the "missing" half of the energy go?

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Can two bodies collide so that all kinetic energy is lost? When?
- Why does a gun recoil less if it is held firmly against the shoulder?
- Does the CM of a firework move after it explodes?

## 8. Common mistakes (`:::pitfall`)

- Using $F = d(mv)/dt = m\,dv/dt + v\,dm/dt$ blindly for variable mass

## 9. Links you may use (and no others)

- Problem: `#/problems/p03-chain`
- Note: `#/notes/newtons-laws-and-constraints` (Newton's laws and constraints)
- Note: `#/notes/rigid-body-rotation` (Rigid-body rotation)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
