import { notes, problems, problemOfTheWeek, useProblemBody } from '../lib/content';
import { TOPICS, pick, topicNames, useLang } from '../lib/i18n';
import { href } from '../lib/router';
import { Difficulty, Loading, Prose } from '../components/Prose';
import { sims } from '../sims';

export default function Home() {
  const { lang, t } = useLang();
  const weekly = problemOfTheWeek();
  const weeklyBody = useProblemBody(weekly?.id ?? '');
  const weeklyText = weeklyBody && (weeklyBody[lang] ?? weeklyBody.en);
  const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

  return (
    <div className="home">
      <section>
        <p className="kicker">{t.preface}</p>
        <div className="preface">
          <p>{t.prefaceText}</p>
        </div>

        <p className="kicker">{t.contents}</p>
        <ol className="toc">
          {TOPICS.map((topic) => {
            const ns = notes.filter((n) => n.topic === topic);
            const ps = problems.filter((p) => p.topic === topic);
            const ss = sims.filter((s) => s.topic === topic);
            const empty = !ns.length && !ps.length && !ss.length;
            return (
              <li key={topic}>
                <div className="toc-line">
                  <span className="toc-title">{topicNames[lang][topic]}</span>
                  <span className="toc-dots" />
                  <span className="toc-count">
                    {empty ? '' : `${count(ns.length, t.note, t.notesPl)} · ${count(ps.length, t.problem, t.problemsPl)}`}
                  </span>
                </div>
                <ul className="toc-sub">
                  {ns.map((n) => (
                    <li key={n.id}>
                      <span className="tag">{t.notes}</span>
                      <a href={href('notes', n.id)}>{pick(n.title, lang)}</a>
                    </li>
                  ))}
                  {ss.map((s) => (
                    <li key={s.id}>
                      <span className="tag">{t.lab}</span>
                      <a href={href('lab', s.id)}>{s.title[lang]}</a>
                    </li>
                  ))}
                  {empty && <li className="toc-empty">{t.nothingYet}</li>}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <aside>
        {weekly && (
          <div className="boxed">
            <span className="boxed-label">{t.weekly}</span>
            <h3>
              <span className="mono muted">№{weekly.number}</span> {pick(weekly.title, lang)}
            </h3>
            {weeklyText ? <Prose html={weeklyText.statement} /> : <Loading />}
            <div className="boxed-foot">
              <Difficulty level={weekly.difficulty} label={t.level[weekly.difficulty]} />
              <a href={href('problems', weekly.id)}>{t.openProblem} →</a>
            </div>
          </div>
        )}

        <h2 className="aside-heading">{t.inTheLab}</h2>
        <ul className="figlist">
          {sims.map((s, i) => (
            <li key={s.id}>
              <span className="fignum">
                {t.fig} {i + 1}
              </span>
              <div>
                <a href={href('lab', s.id)}>{s.title[lang]}</a>
                <p>{s.blurb[lang]}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
