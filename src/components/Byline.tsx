import { useLang } from '../lib/i18n';

/** "Written by @a, @b" — each name links to the contributor's GitHub profile. */
export function Byline({ authors }: { authors: string[] }) {
  const { t } = useLang();
  if (!authors.length) return null;
  return (
    <p className="byline">
      {t.writtenBy}{' '}
      {authors.map((a, i) => (
        <span key={a}>
          {i > 0 && ', '}
          <a href={`https://github.com/${encodeURIComponent(a)}`} rel="author">
            @{a}
          </a>
        </span>
      ))}
    </p>
  );
}
