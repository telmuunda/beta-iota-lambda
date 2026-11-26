import katex from 'katex';
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/**
 * Markdown with TeX. `$$…$$` is display math, `$…$` inline math.
 * Math is cut out before Markdown runs so that `_` and `*` inside
 * formulas are never mistaken for emphasis.
 */
export function renderMarkdown(src: string): string {
  const store: string[] = [];
  const keep = (html: string) => `MATHPH${store.push(html) - 1}X`;

  let text = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) =>
    '\n\n' + keep(katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false })) + '\n\n',
  );
  text = text.replace(/(^|[^\\])\$([^$\n]+?)\$/g, (_, pre: string, tex: string) =>
    pre + keep(katex.renderToString(tex, { throwOnError: false })),
  );
  text = text.replace(/\\\$/g, '$');

  let html = marked.parse(text, { async: false }) as string;
  html = html.replace(/<p>\s*MATHPH(\d+)X\s*<\/p>/g, (_, i) => `<div class="eq">${store[+i]}</div>`);
  html = html.replace(/MATHPH(\d+)X/g, (_, i) => store[+i]);
  return html;
}
