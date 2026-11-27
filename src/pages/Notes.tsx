import { notes, problems, useNoteBody } from '../lib/content';
import { pick, topicNames, useLang } from '../lib/i18n';
import { href } from '../lib/router';
import { Loading, Prose } from '../components/Prose';
import { Byline } from '../components/Byline';
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
  const note = notes.find((n) => n.id === id);
  if (!note) return <NotFound />;
  return <NoteArticle id={id} />;
}

function NoteArticle({ id }: { id: string }) {
  const { lang, t } = useLang();
  const note = notes.find((n) => n.id === id)!;
  const body = useNoteBody(id);
  const text = body && (body[lang] ?? body.en ?? body.mn);
  const related = problems.filter((p) => p.topic === note.topic || p.notes.includes(note.id));
  const sim = simById(note.sim);
  const missing = lang === 'mn' && body && !body.mn;
  const jump = (hid: string) => document.getElementById(hid)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <article className="article">
      <a className="backlink" href={href('notes')}>
        ← {t.notes}
      </a>
      <p className="kicker">{topicNames[lang][note.topic]}</p>
      <h1>{pick(note.title, lang)}</h1>
      <p className="lede">{pick(note.summary, lang)}</p>
      <Byline authors={note.authors} />
      {missing && <p className="muted sans">Монгол орчуулга одоохондоо алга — англиар үзүүлж байна.</p>}
      <div className="article-layout">
        {text ? <Prose html={text.html} /> : <Loading />}
        <aside className="margin">
          {text && text.headings.length > 2 && (
            <>
              <h4>{t.inThisNote}</h4>
              <ol className="toc-mini">
                {text.headings.map((h) => (
                  <li key={h.id}>
                    <button onClick={() => jump(h.id)}>{h.text}</button>
                  </li>
                ))}
              </ol>
            </>
          )}
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
                    <a href={href('problems', p.id)}>{pick(p.title, lang)}</a>
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
