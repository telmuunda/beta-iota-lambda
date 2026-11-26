import { Layout } from './components/Layout';
import { useRoute } from './lib/router';
import Home from './pages/Home';
import { NoteIndex, NotePage } from './pages/Notes';
import { ProblemIndex, ProblemPage } from './pages/Problems';
import { LabIndex, LabPage } from './pages/Lab';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  const [section = '', id] = useRoute();
  let page;
  switch (section) {
    case '':
      page = <Home />;
      break;
    case 'notes':
      page = id ? <NotePage id={id} /> : <NoteIndex />;
      break;
    case 'problems':
      page = id ? <ProblemPage id={id} /> : <ProblemIndex />;
      break;
    case 'lab':
      page = id ? <LabPage id={id} /> : <LabIndex />;
      break;
    case 'about':
      page = <About />;
      break;
    default:
      page = <NotFound />;
  }
  return <Layout section={section}>{page}</Layout>;
}
