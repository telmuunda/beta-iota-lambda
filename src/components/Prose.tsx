import { useMemo } from 'react';
import { renderMarkdown } from '../lib/markdown';

export function Prose({ md, className = '' }: { md: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(md), [md]);
  return <div className={'prose ' + className} dangerouslySetInnerHTML={{ __html: html }} />;
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
