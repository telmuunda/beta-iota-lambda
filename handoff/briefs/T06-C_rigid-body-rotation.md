# Brief T06-C — Rigid-body rotation and rolling

**Handoff ID:** `T06-C`
**Plan task:** T06
**Target file:** `content/notes/rigid-body-rotation.md`

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: T06-C → content/notes/rigid-body-rotation.md -->
---
topic: mechanics
order: 12
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Rigid-body rotation and rolling**
- Mongolian (suggested; improve if you know a better standard term): **Хатуу биеийн эргэлт ба өнхрөлт**

## 3. Goal

After reading, a student can: Compute moments of inertia, write the rotational equation of motion about the right point, and solve rolling problems.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Angular velocity and angular momentum** — Kinematics of rotation; $\vec L = \vec r\times\vec p$; derive $d\vec L/dt = \vec\tau$ for a system and when it holds about a moving point (the centre of mass, or a point at rest).
2. **Moments of inertia** — Derive by integration: rod (centre and end), ring, disc, solid and hollow sphere. Derive the parallel-axis and perpendicular-axis theorems, and use them (e.g. disc about a diameter).
3. **Torque and the equation of motion** — $I\alpha = \tau$ about a fixed axis; rotational kinetic energy and work; statics as $\sum F = 0,\ \sum\tau = 0$ with the freedom to choose the pivot (ladder against a wall).
4. **Rolling** — Rolling without slipping $v = \omega R$ as a constraint; motion as rotation about the contact point; derive acceleration down an incline $a = g\sin\theta/(1 + I/mR^2)$ two ways (forces+torques, and energy). Friction in rolling: when it is static, and minimum $\mu$ to roll.
5. **Rolling with slipping and impulsive problems** — A bowling ball thrown sliding: time until pure rolling, final speed $\tfrac57 v_0$ via angular momentum about the contact point. Angular impulse; the "sweet spot" (centre of percussion) of a bat.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Moments of inertia of rod, disc, sphere
- Parallel-axis theorem
- Acceleration of a rolling body on an incline
- Final speed of a sliding-then-rolling ball

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Ladder against a frictionless wall: minimum floor friction to stay
- Yo-yo / spool pulled by a string at angle: which way does it roll?

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Which reaches the bottom first: a hollow or a solid sphere? Does mass matter?
- Why does a car not need friction to roll at constant speed on a flat road?
- About which points may you take torques in a statics problem?

## 8. Common mistakes (`:::pitfall`)

- Taking torques about an accelerating point that is not the centre of mass

## 9. Links you may use (and no others)

- Problem: `#/problems/p05-rod-pivot`
- Note: `#/notes/momentum-and-collisions` (Momentum and collisions)
- Note: `#/notes/large-amplitude-pendulum` (The pendulum beyond small angles)

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.
