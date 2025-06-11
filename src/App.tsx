
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import ResultPage from './pages/ResultPage';
import VisualEditorPage from './pages/VisualEditorPage';
import ResultVisualEditorPage from './pages/ResultVisualEditorPage';
import ResultPageVisualEditorPage from './pages/ResultPageVisualEditorPage';

// Simple admin component for now
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Visual Editor</h2>
            <p className="text-gray-600 mb-4">Create and edit visual quiz pages</p>
            <a 
              href="/visual-editor/default"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Open Editor
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Result Page Editor</h2>
            <p className="text-gray-600 mb-4">Edit result pages visually</p>
            <a 
              href="/result-visual-editor/default"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Open Result Editor
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600 mb-4">View quiz performance metrics</p>
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
