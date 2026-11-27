import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Loading } from './components/Prose';
import { useRoute } from './lib/router';
import Home from './pages/Home';

// Each section is its own chunk; the home page loads only what it needs.
const Notes = lazy(() => import('./pages/Notes').then((m) => ({ default: m.NoteIndex })));
const Note = lazy(() => import('./pages/Notes').then((m) => ({ default: m.NotePage })));
const Problems = lazy(() => import('./pages/Problems').then((m) => ({ default: m.ProblemIndex })));
const Problem = lazy(() => import('./pages/Problems').then((m) => ({ default: m.ProblemPage })));
const Lab = lazy(() => import('./pages/Lab').then((m) => ({ default: m.LabIndex })));
const LabSim = lazy(() => import('./pages/Lab').then((m) => ({ default: m.LabPage })));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const [section = '', id] = useRoute();
  let page;
  switch (section) {
    case '':
      page = <Home />;
      break;
    case 'notes':
      page = id ? <Note id={id} /> : <Notes />;
      break;
    case 'problems':
      page = id ? <Problem id={id} /> : <Problems />;
      break;
    case 'lab':
      page = id ? <LabSim id={id} /> : <Lab />;
      break;
    case 'about':
      page = <About />;
      break;
    default:
      page = <NotFound />;
  }
  return (
    <Layout section={section}>
      <Suspense fallback={<Loading />}>{page}</Suspense>
    </Layout>
  );
}
