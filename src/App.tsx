
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

// Import components directly (not lazy) for debugging
import QuizPage from './components/QuizPage';
import TestPage from './pages/TestPage';
import QuizDescubraSeuEstiloPage from './pages/quiz-descubra-seu-estilo';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditorPage from './pages/admin/EditorPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  console.log('🚀 App iniciando...');
  
  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path="/" element={<QuizPage />} />
              <Route path="/teste" element={<TestPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/editor" element={<EditorPage />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/quiz-descubra-seu-estilo" element={<QuizDescubraSeuEstiloPage />} />
              
              {/* Redirecionamentos */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/quiz" element={<Navigate to="/" replace />} />
              <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
