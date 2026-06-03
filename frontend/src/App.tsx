import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CommandCenter from './pages/CommandCenter';
import ResumeWorkspace from './pages/ResumeWorkspace';
import IntelligenceReport from './pages/IntelligenceReport';
import ModelCenter from './pages/ModelCenter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CommandCenter />} />
        <Route path="workspace" element={<ResumeWorkspace />} />
        <Route path="report" element={<IntelligenceReport />} />
        <Route path="models" element={<ModelCenter />} />
      </Route>
    </Routes>
  );
}

export default App;
