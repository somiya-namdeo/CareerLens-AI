import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import ResumeWorkspace from './pages/ResumeWorkspace';
import IntelligenceReport from './pages/IntelligenceReport';
import ModelCenter from './pages/ModelCenter';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="analyzer" element={<ResumeWorkspace />} />
          <Route path="results" element={<IntelligenceReport />} />
          <Route path="insights" element={<ModelCenter />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
