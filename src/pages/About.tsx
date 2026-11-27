import { usePageBody } from '../lib/content';
import { useLang } from '../lib/i18n';
import { Loading, Prose } from '../components/Prose';

/** Text lives in content/pages/about.md. */
export default function About() {
  const { lang, t } = useLang();
  const body = usePageBody('about');
  const text = body && (body[lang] ?? body.en);
  return (
    <>
      <p className="kicker">{t.about}</p>
      {text ? (
        <>
          <h1>{text.title}</h1>
          <Prose html={text.html} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
