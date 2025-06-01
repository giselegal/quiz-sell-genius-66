import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { captureUTMParameters } from './utils/analytics';
import { loadFacebookPixel } from './utils/facebookPixel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { initializeBuilder } from './utils/builderConfig'; // Builder.io initialization
import { runBuilderTest } from './utils/builderTest'; // Builder.io testing

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
const TestPage = lazy(() => import('./pages/TestPage')); // Página de teste
const ResultPage = lazy(() => import('./pages/ResultPage')); // Versão original
const QuizOfferPage = lazy(() => import('./components/QuizOfferPage')); // Versão original
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const EditorPage = lazy(() => import('./pages/admin/EditorPage'));
const QuickVisualEditor = lazy(() => import('./components/quick-editor/QuickVisualEditor'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage')); // Nova página
const CreativeAnalyticsPage = lazy(() => import('./pages/admin/CreativeAnalyticsPage'));
const ABTestsPage = lazy(() => import('./pages/admin/ABTestsPage'));
const QuickMetricsPage = lazy(() => import('./pages/admin/QuickMetricsPage'));
const BuilderDashboard = lazy(() => import('./pages/admin/BuilderDashboard')); // Builder.io Dashboard
const BuilderPageSetup = lazy(() => import('./components/admin/BuilderPageSetup')); // Setup páginas A/B
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  useEffect(() => {
    try {
      loadFacebookPixel();
      captureUTMParameters();
      
      // Inicializar Builder.io com API key real
      setTimeout(() => {
        try {
          initializeBuilder();
          console.log('Builder.io initialized successfully with real API key');
          
          // Executar teste do Builder.io em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            runBuilderTest();
          }
        } catch (error) {
          console.warn('Builder.io não pôde ser inicializado:', error);
        }
      }, 100);
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
                
                {/* TESTE - Página de teste */}
                <Route path="/teste" element={<TestPage />} />
                
                {/* ADMIN - Rotas principais */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/editor" element={<EditorPage />} />
                <Route path="/admin/quick-editor" element={<QuickVisualEditor />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} /> {/* Nova rota */}
                <Route path="/admin/creative-analytics" element={<CreativeAnalyticsPage />} />
                <Route path="/admin/ab-tests" element={<ABTestsPage />} />
                <Route path="/admin/quick-metrics" element={<QuickMetricsPage />} />
                <Route path="/admin/builder" element={<BuilderDashboard />} /> {/* Builder.io Dashboard - versão segura */}
                <Route path="/admin/builder-setup" element={<BuilderPageSetup />} /> {/* Setup páginas A/B */}
                
                {/* RESULTADO - Página de resultados */}
                <Route path="/resultado" element={<ResultPage />} />
                
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
