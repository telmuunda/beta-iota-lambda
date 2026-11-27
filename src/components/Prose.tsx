/** Pre-rendered HTML from content/ (built by scripts/vite-content-plugin.mjs). */
export function Prose({ html, className = '' }: { html: string; className?: string }) {
  return <div className={'prose ' + className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Loading() {
  return <p className="loading muted sans">…</p>;
}

export function Difficulty({ level, label }: { level: number; label?: string }) {
  return (
    <span className="diff" title={label} aria-label={label ?? `${level}/3`}>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= level ? 'on' : ''} />
      ))}
    </span>
  );
}
