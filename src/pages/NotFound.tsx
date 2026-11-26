import { useLang } from '../lib/i18n';
import { href } from '../lib/router';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <h1>404</h1>
      <p className="lede">{t.notFound}</p>
      <a href={href()}>{t.goHome} →</a>
    </>
  );
}
