# Handoff: writing notes in your Claude project

The long-form notes are written in a separate **Claude project** that holds your
physics books, then brought back here and published. Each note has a **brief**
with a handoff ID and a fixed target file, so the result drops straight into
the right place on the site.

## The briefs

| ID | Note | Target file | Plan task |
| --- | --- | --- | --- |
| T06-A | Newton's laws, free-body diagrams and constraints | `content/notes/newtons-laws-and-constraints.md` | T06 |
| T06-B | Momentum, the centre of mass and collisions | `content/notes/momentum-and-collisions.md` | T06 |
| T06-C | Rigid-body rotation and rolling | `content/notes/rigid-body-rotation.md` | T06 |
| T07-A | Electrostatics and Gauss's law | `content/notes/electrostatics-and-gauss.md` | T07 |
| T07-B | DC and RC circuits | `content/notes/dc-and-rc-circuits.md` | T07 |
| T07-C | Magnetic forces and electromagnetic induction | `content/notes/electromagnetic-induction.md` | T07 |
| T08-A | Kinetic theory of gases | `content/notes/kinetic-theory-of-gases.md` | T08 |
| T08-B | The first law, processes and heat engines | `content/notes/first-law-and-heat-engines.md` | T08 |
| T08-C | Heat transfer | `content/notes/heat-transfer.md` | T08 |
| T09-A | Geometric optics: mirrors, lenses and instruments | `content/notes/geometric-optics.md` | T09 |
| T09-B | Interference and diffraction | `content/notes/interference-and-diffraction.md` | T09 |
| R-1 | Projectiles (expands the current note) | `content/notes/projectile-motion.md` | — |
| R-2 | Oscillations and the pendulum (expands the current note) | `content/notes/large-amplitude-pendulum.md` | — |
| R-3 | Gravitation and the Kepler problem (expands the current note) | `content/notes/kepler-problem.md` | — |

## Steps

**Once:**

1. Create a Claude project (claude.ai → Projects → New project), e.g. "βιλ notes".
2. Add your physics books and sources to the project's knowledge.
3. Open [`00-PROJECT-INSTRUCTIONS.md`](00-PROJECT-INSTRUCTIONS.md) and paste everything
   below its line into the project's instructions.

**For each note:**

1. Start a new chat in the project.
2. Paste the whole brief file from [`briefs/`](briefs/), e.g. `briefs/T06-A_newtons-laws-and-constraints.md`.
3. Claude replies with one Markdown file that starts with
   `<!-- handoff: T06-A → content/notes/newtons-laws-and-constraints.md -->`.
   Read it, ask for fixes in the same chat if needed, and check the Mongolian.
4. Bring it back, either way works:
   - **Paste it to Claude Code** (this repository's session) and say
     "import this handoff". It is saved to `handoff/inbox/` and imported.
   - Or save it yourself as `handoff/inbox/T06-A.md` (any name) and run
     `npm run handoff:import`.

The importer reads the header, checks that it matches the brief, writes the
note to its target file and runs the content checker. If anything is wrong
(an unclosed formula, a missing language, a broken block) nothing is changed
and you get the exact errors to send back to the project chat.

## What the notes can use

Besides ordinary Markdown and `$…$` / `$$…$$` formulas, notes can use these
blocks (see `00-PROJECT-INSTRUCTIONS.md`):

```
:::derivation Title        a step-by-step derivation (foldable)
:::example Title           a worked example
:::check                   a question for the reader…
:::answer                  …and its answer, folded
:::pitfall                 a common mistake
:::summary                 key results
```

Each block ends with a line containing only `:::`.
