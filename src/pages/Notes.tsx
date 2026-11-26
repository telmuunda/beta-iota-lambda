import { notes, problems } from '../lib/content';
import { pick, topicNames, useLang } from '../lib/i18n';
import { href } from '../lib/router';
import { Prose } from '../components/Prose';
import { simById } from '../sims';
import NotFound from './NotFound';

export function NoteIndex() {
  const { lang, t } = useLang();
  return (
    <>
      <p className="kicker">{t.notes}</p>
      <h1>{t.notes}</h1>
      <p className="lede">{t.notesIntro}</p>
      <ul className="notes-index">
        {notes.map((n) => (
          <li key={n.id}>
            <span className="topic">{topicNames[lang][n.topic]}</span>
            <div>
              <a href={href('notes', n.id)}>{pick(n.title, lang)}</a>
              <p>{pick(n.summary, lang)}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function NotePage({ id }: { id: string }) {
  const { lang, t } = useLang();
  const note = notes.find((n) => n.id === id);
  if (!note) return <NotFound />;
  const related = problems.filter((p) => p.topic === note.topic || p.notes.includes(note.id));
  const sim = simById(note.sim);
  const missing = lang === 'mn' && !note.body.mn;

  return (
    <article className="article">
      <a className="backlink" href={href('notes')}>
        ← {t.notes}
      </a>
      <p className="kicker">{topicNames[lang][note.topic]}</p>
      <h1>{pick(note.title, lang)}</h1>
      <p className="lede">{pick(note.summary, lang)}</p>
      {missing && <p className="muted sans">Монгол орчуулга одоохондоо алга — англиар үзүүлж байна.</p>}
      <div className="article-layout">
        <Prose md={pick(note.body, lang)} />
        <aside className="margin">
          {sim && (
            <>
              <h4>{t.relatedSim}</h4>
              <ul>
                <li>
                  <a href={href('lab', sim.id)}>{sim.title[lang]} →</a>
                </li>
              </ul>
            </>
          )}
          {related.length > 0 && (
            <>
              <h4>{t.relatedProblems}</h4>
              <ul>
                {related.map((p) => (
                  <li key={p.id}>
                    <span className="mono muted">№{p.number}</span>{' '}
                    <a href={href('problems', p.id)}>{pick(p.text, lang).title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </article>
  );
}
