import type { ReactNode } from 'react';
import { href } from '../lib/router';
import { useLang } from '../lib/i18n';

export const REPO_URL = 'https://github.com/telmuunda/beta-iota-lambda';

export function Layout({ section, children }: { section: string; children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  const links: [string, string][] = [
    ['notes', t.notes],
    ['problems', t.problems],
    ['lab', t.lab],
    ['about', t.about],
  ];
  return (
    <>
      <header className="masthead">
        <div className="wrap">
          <a className="brand" href={href()}>
            <span className="brand-mark">βιλ</span>
            <span className="brand-name">
              beta-iota-lambda
              <small>{t.siteSub}</small>
            </span>
          </a>
          <nav className="nav" aria-label="Main">
            {links.map(([id, label]) => (
              <a key={id} href={href(id)} aria-current={section === id ? 'page' : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <div className="langswitch" role="group" aria-label="Language / Хэл">
            <button aria-pressed={lang === 'mn'} onClick={() => setLang('mn')} lang="mn">
              МН
            </button>
            <button aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">
              EN
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="wrap">{children}</div>
      </main>
      <footer className="colophon">
        <div className="wrap">
          <span>
            {t.footer}{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license">
              {t.licence}
            </a>
          </span>
          <a href={REPO_URL}>{t.contribute} ↗</a>
        </div>
      </footer>
    </>
  );
}
