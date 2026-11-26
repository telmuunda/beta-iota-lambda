import { Suspense } from 'react';
import { notes } from '../lib/content';
import { pick, topicNames, useLang } from '../lib/i18n';
import { href } from '../lib/router';
import { sims, simById } from '../sims';
import NotFound from './NotFound';

export function LabIndex() {
  const { lang, t } = useLang();
  return (
    <>
      <p className="kicker">{t.lab}</p>
      <h1>{t.lab}</h1>
      <p className="lede">{t.labIntro}</p>
      <ul className="notes-index">
        {sims.map((s, i) => (
          <li key={s.id}>
            <span className="topic">
              {t.fig} {i + 1} · {topicNames[lang][s.topic]}
            </span>
            <div>
              <a href={href('lab', s.id)}>{s.title[lang]}</a>
              <p>{s.blurb[lang]}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function LabPage({ id }: { id: string }) {
  const { lang, t } = useLang();
  const idx = sims.findIndex((s) => s.id === id);
  const sim = simById(id);
  if (!sim) return <NotFound />;
  const note = notes.find((n) => n.sim === id);
  const { Component } = sim;
  return (
    <>
      <a className="backlink" href={href('lab')}>
        ← {t.lab}
      </a>
      <p className="kicker">
        {t.fig} {idx + 1} · {topicNames[lang][sim.topic]}
      </p>
      <h1>{sim.title[lang]}</h1>
      <p className="lede">{sim.blurb[lang]}</p>
      <Suspense fallback={<p className="muted">…</p>}>
        <Component />
      </Suspense>
      {note && (
        <p className="sans" style={{ fontSize: '0.92rem' }}>
          {t.seeAlso}: <a href={href('notes', note.id)}>{pick(note.title, lang)}</a>
        </p>
      )}
    </>
  );
}
