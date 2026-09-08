import { Layout } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Service from './pages/Service.jsx';
import Approach from './pages/Approach.jsx';
import Contact from './pages/Contact.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';
export default function App({ route, year }) {
  let page;
  switch (route.type) {
    case 'home':
      page = <Home />;
      break;
    case 'service':
      page = <Service service={route.service} />;
      break;
    case 'approach':
      page = <Approach />;
      break;
    case 'contact':
      page = <Contact />;
      break;
    case 'privacy':
    case 'terms':
      page = <Legal type={route.type} />;
      break;
    default:
      page = <NotFound />;
  }
  return (
    <Layout path={route.path} year={year}>
      {page}
    </Layout>
  );
}
