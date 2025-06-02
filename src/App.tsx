import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { captureUTMParameters } from './utils/analytics';
import { loadFacebookPixel } from './utils/facebookPixel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Lazy loading das páginas principais
const QuizPage = lazy(() => import('./components/QuizPage'));
const ResultPage = lazy(() => import('./pages/ResultPage')); // Página original de resultado
const QuizOfferPage = lazy(() => import('./pages/QuizOfferPage')); // Página original de oferta
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const EditorPage = lazy(() => import('./pages/admin/EditorPage'));
const QuickVisualEditor = lazy(() => import('./components/quick-editor/QuickVisualEditor'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage')); // Nova página
const CreativeAnalyticsPage = lazy(() => import('./pages/admin/CreativeAnalyticsPage'));
const ABTestsPage = lazy(() => import('./pages/admin/ABTestsPage'));
const QuickMetricsPage = lazy(() => import('./pages/admin/QuickMetricsPage'));
const HeaderEditorPage = lazy(() => import('./pages/admin/HeaderEditorPage')); // Editor do Header
const ResultPageEditorPage = lazy(() => import('./pages/admin/ResultPageEditorPage')); // Editor da ResultPage
const ResultPageLiveEditor = lazy(() => import('./pages/admin/ResultPageLiveEditor')); // Editor ao vivo estilo InLead/Typeform
const BlockSystemDemo = lazy(() => import('./components/result/BlockSystemDemo')); // Demo do sistema de blocos
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  useEffect(() => {
    try {
      loadFacebookPixel();
      captureUTMParameters();
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Erro ao inicializar aplicativo:', error);
    }
  }, []);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* ROTA PRINCIPAL - Quiz */}
                <Route path="/" element={<QuizPage />} />
                
                {/* ADMIN - Rotas principais */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/editor" element={<EditorPage />} />
                <Route path="/admin/quick-editor" element={<QuickVisualEditor />} />
                <Route path="/admin/live-editor" element={<ResultPageLiveEditor />} /> {/* Editor ao vivo estilo InLead/Typeform */}
                <Route path="/admin/analytics" element={<AnalyticsPage />} /> {/* Nova rota */}
                <Route path="/admin/creative-analytics" element={<CreativeAnalyticsPage />} />
                <Route path="/admin/ab-tests" element={<ABTestsPage />} />
                <Route path="/admin/quick-metrics" element={<QuickMetricsPage />} />
                <Route path="/admin/header-editor" element={<HeaderEditorPage />} /> {/* Editor do Header */}
                <Route path="/admin/resultpage-editor" element={<ResultPageEditorPage />} /> {/* Editor da ResultPage */}
                
                {/* RESULTADO - Página de resultados */}
                <Route path="/resultado" element={<ResultPage />} />
                
                {/* DEMO - Sistema de blocos */}
                <Route path="/demo-blocks" element={<BlockSystemDemo />} />
                
                {/* OFERTA - Página de oferta */}
                <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
                
                {/* Redirecionamentos */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/quiz" element={<Navigate to="/" replace />} />
                <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
                
                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Router>
          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
