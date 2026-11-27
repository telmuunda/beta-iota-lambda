import { useState } from 'react';
import { problems, notes, useProblemBody, type Problem } from '../lib/content';
import { TOPICS, pick, topicNames, useLang, type Topic } from '../lib/i18n';
import { href } from '../lib/router';
import { useSolved } from '../lib/progress';
import { Difficulty, Loading, Prose } from '../components/Prose';
import { Byline } from '../components/Byline';
import { simById } from '../sims';
import NotFound from './NotFound';

export function ProblemIndex() {
  const { lang, t } = useLang();
  const { solved } = useSolved();
  const [topic, setTopic] = useState<Topic | 'all'>('all');
  const used = TOPICS.filter((tp) => problems.some((p) => p.topic === tp));
  const shown = problems.filter((p) => topic === 'all' || p.topic === topic);

  return (
    <>
      <p className="kicker">{t.problems}</p>
      <h1>{t.problems}</h1>
      <p className="lede">{t.problemsIntro}</p>
      <div className="filters" role="group" aria-label={t.topic}>
        <button aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
          {t.all} <span className="muted">{problems.length}</span>
        </button>
        {used.map((tp) => (
          <button key={tp} aria-pressed={topic === tp} onClick={() => setTopic(tp)}>
            {topicNames[lang][tp]} <span className="muted">{problems.filter((p) => p.topic === tp).length}</span>
          </button>
        ))}
      </div>
      <table className="ptable">
        <thead>
          <tr>
            <th>№</th>
            <th></th>
            <th className="ptopic">{t.topic}</th>
            <th>{t.difficulty}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shown.map((p) => (
            <tr key={p.id}>
              <td className="num">{p.number}</td>
              <td className="ptitle">
                <a href={href('problems', p.id)}>{pick(p.title, lang)}</a>
              </td>
              <td className="ptopic">{topicNames[lang][p.topic]}</td>
              <td>
                <Difficulty level={p.difficulty} label={t.level[p.difficulty]} />
              </td>
              <td className="done">{solved.includes(p.id) ? '✓ ' + t.solved : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function parseNumber(raw: string): number | null {
  const s = raw
    .trim()
    .replace(/\s+/g, '')
    .replace(',', '.')
    .replace(/[×x·*]10\^?(-?\d+)/i, 'e$1');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return null;
  return Number(s);
}

function AnswerBox({ p }: { p: Problem }) {
  const { t } = useLang();
  const { solved, markSolved } = useSolved();
  const [value, setValue] = useState('');
  const [verdict, setVerdict] = useState<'ok' | 'near' | 'no' | 'nan' | null>(solved.includes(p.id) ? 'ok' : null);
  if (p.answer === undefined) return null;

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseNumber(value);
    if (x === null) return setVerdict('nan');
    const err = Math.abs(x - p.answer!) / Math.abs(p.answer!);
    if (err <= p.tolerance) {
      setVerdict('ok');
      markSolved(p.id);
    } else setVerdict(err <= p.tolerance * 4 ? 'near' : 'no');
  };
  const msg = { ok: t.correct, near: t.close, no: t.wrong, nan: t.notNumber };

  return (
    <form className="answer-box" onSubmit={check}>
      <label htmlFor="ans">
        {t.yourAnswer}
        {p.unit && (
          <>
            {' '}
            ({t.expected} <span className="mono">{p.unit}</span>)
          </>
        )}
      </label>
      <div className="answer-row">
        <input id="ans" inputMode="decimal" autoComplete="off" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0.00" />
        {p.unit && <span className="unit">{p.unit}</span>}
        <button className="btn" type="submit">
          {t.check}
        </button>
      </div>
      {verdict && (
        <p className={'verdict ' + (verdict === 'nan' ? 'no' : verdict)} role="status">
          {msg[verdict]}
        </p>
      )}
    </form>
  );
}

export function ProblemPage({ id }: { id: string }) {
  const { lang, t } = useLang();
  const idx = problems.findIndex((x) => x.id === id);
  const p = problems[idx];
  const body = useProblemBody(id);
  if (!p) return <NotFound />;
  const text = body && (body[lang] ?? body.en ?? body.mn);
  const sim = simById(p.sim);
  const linked = notes.filter((n) => p.notes.includes(n.id));
  const prev = problems[idx - 1],
    next = problems[idx + 1];

  return (
    <article>
      <a className="backlink" href={href('problems')}>
        ← {t.problems}
      </a>
      <p className="kicker">
        {t.problem} №{p.number}
      </p>
      <h1>{pick(p.title, lang)}</h1>
      <div className="problem-head">
        <span>{topicNames[lang][p.topic]}</span>
        <span>
          {t.difficulty} <Difficulty level={p.difficulty} /> <span className="muted">{t.level[p.difficulty]}</span>
        </span>
        {p.source && (
          <span>
            {t.source}: {p.source}
          </span>
        )}
        {p.authors.length > 0 && <Byline authors={p.authors} />}
      </div>
      <div className="statement">{text ? <Prose html={text.statement} /> : <Loading />}</div>
      <AnswerBox key={p.id} p={p} />
      {text?.hint && (
        <details className="fold">
          <summary>{t.showHint}</summary>
          <Prose html={text.hint} />
        </details>
      )}
      {text?.solution && (
        <details className="fold">
          <summary>{t.showSolution}</summary>
          <Prose html={text.solution} />
        </details>
      )}
      {(sim || linked.length > 0) && (
        <p className="sans" style={{ marginTop: '2rem', fontSize: '0.92rem' }}>
          {t.seeAlso}:{' '}
          {linked.map((n) => (
            <a key={n.id} href={href('notes', n.id)} style={{ marginRight: '1rem' }}>
              {pick(n.title, lang)}
            </a>
          ))}
          {sim && <a href={href('lab', sim.id)}>{sim.title[lang]}</a>}
        </p>
      )}
      <hr className="rule" />
      <nav className="sans" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
        {prev ? <a href={href('problems', prev.id)}>← №{prev.number}</a> : <span />}
        {next ? <a href={href('problems', next.id)}>№{next.number} →</a> : <span />}
      </nav>
    </article>
  );
}
