
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

// Lazy loading das páginas
const QuizPage = lazy(() => import('./components/QuizPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const QuizOfferPage = lazy(() => import('./pages/QuizOfferPage'));
const AdminLoadingPage = lazy(() => import('./pages/admin/AdminLoadingPage'));
const CreativeAnalyticsPage = lazy(() => import('./pages/CreativeAnalyticsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  // Inicializar analytics na montagem do componente
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
                {/* ROTA PRINCIPAL - Quiz com introdução */}
                <Route path="/" element={<QuizPage />} />
                
                {/* ADMIN - Tela de carregamento de análise de código */}
                <Route path="/admin" element={<AdminLoadingPage />} />
                <Route path="/admin/*" element={<AdminLoadingPage />} />
                
                {/* ANALYTICS DE CRIATIVOS - Página específica */}
                <Route path="/admin/creative-analytics" element={<CreativeAnalyticsPage />} />
                
                {/* RESULTADO - Página de resultados do quiz */}
                <Route path="/resultado" element={<ResultPage />} />
                
                {/* OFERTA DO QUIZ - Página de oferta com quiz embutido */}
                <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
                
                {/* Redirecionamentos para manter compatibilidade */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/quiz" element={<Navigate to="/" replace />} />
                <Route path="/result" element={<Navigate to="/resultado" replace />} />
                
                {/* 404 - Página não encontrada */}
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
