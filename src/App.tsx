
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/context/AuthContext';
import ResultPage from './pages/ResultPage';
import VisualEditorPage from './pages/VisualEditorPage';
import ResultVisualEditorPage from './pages/ResultVisualEditorPage';
import ResultPageVisualEditorPage from './pages/ResultPageVisualEditorPage';
import NotFound from './pages/NotFound';

// Simple admin component using Link for proper navigation
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Visual Editor</h2>
            <p className="text-gray-600 mb-4">Create and edit visual quiz pages</p>
            <Link 
              to="/visual-editor/default"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Open Editor
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Result Page Editor</h2>
            <p className="text-gray-600 mb-4">Edit result pages visually</p>
            <Link 
              to="/result-visual-editor/default"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Open Result Editor
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600 mb-4">View quiz performance metrics</p>
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
              Coming Soon
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Voltar para Página Principal
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
