
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './components/admin/AdminDashboard';
import VisualEditorPage from './pages/VisualEditorPage';
import ResultVisualEditorPage from './pages/ResultVisualEditorPage';
import ResultPageVisualEditorPage from './pages/ResultPageVisualEditorPage';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ResultPage />} />
          <Route path="/descubra-seu-estilo" element={<ResultPage />} />
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/visual-editor/:id" element={<VisualEditorPage />} />
          <Route path="/result-visual-editor/:id" element={<ResultVisualEditorPage />} />
          <Route path="/result-page-editor" element={<ResultPageVisualEditorPage />} />
        </Routes>
        <Toaster />
      </Router>
    </TooltipProvider>
  );
}

export default App;
