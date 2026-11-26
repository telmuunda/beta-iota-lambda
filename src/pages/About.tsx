import { useLang } from '../lib/i18n';
import { REPO_URL } from '../components/Layout';
import { Prose } from '../components/Prose';

const text = {
  en: `
This site is a shared notebook for students preparing for physics olympiads — the
Mongolian national olympiad, IPhO, APhO and their regional rounds. It is written by
students who went through the same preparation, in both Mongolian and English, because
most good material exists only in one language or the other.

## What is here

- **Notes** — one idea per page, derived carefully, with the approximations stated.
- **Problems** — olympiad-style problems with a hint and a complete solution. Numeric
  answers can be checked right on the page; the site remembers which ones you solved
  (in your browser only — there are no accounts).
- **Lab** — small simulations, drawn like textbook figures, for building intuition.

## How to help

Everything is plain text. A note or a problem is one Markdown file with formulas written
in TeX, the same way you would write them in LaTeX. You do not need to know React to
contribute — see \`CONTRIBUTING.md\` in the [repository](${REPO_URL}).

We especially want:

1. problems you liked from past olympiads (with the source),
2. Mongolian translations and corrections of terminology,
3. people to check solutions — mistakes are welcome to be pointed out.
`,
  mn: `
Энэ сайт бол физикийн олимпиадад — Монголын үндэсний олимпиад, IPhO, APhO болон
тэдгээрийн шат дамжлагуудад — бэлдэж буй сурагчдад зориулсан хамтын тэмдэглэлийн дэвтэр
юм. Үүнийг ижил бэлтгэлийг туулсан сурагчид монгол, англи хоёр хэлээр бичдэг, учир нь
сайн материалын ихэнх нь зөвхөн нэг хэл дээр л байдаг.

## Энд юу байгаа вэ

- **Тэмдэглэл** — нэг хуудсанд нэг санаа, ойролцоолтуудыг тодорхой зааж, нягт гаргалгаатай.
- **Бодлого** — сануулга, бүрэн бодолттой олимпиадын маягийн бодлогууд. Тоон хариуг
  хуудсан дээрээ шалгаж болно; сайт таны бодсон бодлогуудыг санана (зөвхөн таны
  хөтөч дээр — бүртгэл байхгүй).
- **Лаборатори** — сурах бичгийн зураг шиг зурсан жижиг симуляцууд.

## Хэрхэн туслах вэ

Бүх зүйл энгийн текст. Тэмдэглэл эсвэл бодлого бүр нь томьёог TeX-ээр бичсэн нэг
Markdown файл — LaTeX-д бичдэгтэй адилхан. Хувь нэмэр оруулахад React мэдэх шаардлагагүй —
[репозиторийн](${REPO_URL}) \`CONTRIBUTING.md\` файлыг үзээрэй.

Бидэнд ялангуяа хэрэгтэй:

1. өмнөх олимпиадуудаас таалагдсан бодлогууд (эх сурвалжийн хамт),
2. монгол орчуулга, нэр томьёоны засвар,
3. бодолт шалгах хүмүүс — алдаа олж хэлбэл баяртай байна.
`,
};

export default function About() {
  const { lang, t } = useLang();
  return (
    <>
      <p className="kicker">{t.about}</p>
      <h1>{lang === 'mn' ? 'Энэ юу вэ' : 'What this is'}</h1>
      <Prose md={text[lang]} className="article" />
    </>
  );
}
