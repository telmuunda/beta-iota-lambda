# beta-iota-lambda

Platform for learning and advancing physics knowledge for Olympiad preparation, made by students, for students. In both Mongolian and English, students can interact with simulations, read quality notes and access problem sets.

Олимпиадад бэлдэх физикийн мэдлэгээ ахиулах платформ — сурагчдаас сурагчдад. Монгол, англи хоёр хэлээр симуляц ажиллуулж, тэмдэглэл уншиж, бодлого бодно.

## What's inside

| Section | What it is | Where it lives |
|---|---|---|
| **Notes / Тэмдэглэл** | One idea per page, with derivations | `content/notes/*.md` |
| **Problems / Бодлого** | Olympiad-style problems with a hint, a full solution and an answer checker | `content/problems/*.md` |
| **Lab / Лаборатори** | Interactive simulations drawn like textbook figures | `src/sims/*.tsx` |

Notes and problems are plain Markdown with TeX math (`$…$`, `$$…$$`), so you can contribute without touching any code. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Running it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ — host it anywhere (e.g. GitHub Pages)
```

## Stack

React + TypeScript + Vite, KaTeX for formulas, `marked` for Markdown, and a hand-written stylesheet (`src/styles.css`). No backend and no accounts: the language choice and the problems you've solved are remembered in your browser only.

## Licence

- **Code** (everything outside `content/`): [MIT](LICENSE).
- **Notes and problems** (`content/`): [CC BY-SA 4.0](content/LICENSE.md). Share and adapt freely, credit beta-iota-lambda, and keep adaptations under the same licence.
