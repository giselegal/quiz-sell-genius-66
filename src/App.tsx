
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { captureUTMParameters } from './utils/analytics';
import { loadFacebookPixel } from './utils/facebookPixel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { initializeBuilder } from './utils/builderConfig';

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Lazy loading das páginas principais com error boundaries
const QuizPage = lazy(() => import('./components/QuizPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar página do Quiz</div>
})));

const TestPage = lazy(() => import('./pages/TestPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar página de Teste</div>
})));

// Usar a página consolidada do quiz-descubra-seu-estilo
const QuizDescubraSeuEstiloPage = lazy(() => import('./pages/quiz-descubra-seu-estilo').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar página Quiz Descubra Seu Estilo</div>
})));

const ResultPage = lazy(() => import('./pages/ResultPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar página de Resultado</div>
})));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Dashboard Admin</div>
})));

const EditorPage = lazy(() => import('./pages/admin/EditorPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Editor</div>
})));

const QuickVisualEditor = lazy(() => import('./components/quick-editor/QuickVisualEditor').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Editor Visual</div>
})));

const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Analytics</div>
})));

const CreativeAnalyticsPage = lazy(() => import('./pages/admin/CreativeAnalyticsPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Creative Analytics</div>
})));

const ABTestsPage = lazy(() => import('./pages/admin/ABTestsPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar AB Tests</div>
})));

const QuickMetricsPage = lazy(() => import('./pages/admin/QuickMetricsPage').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Quick Metrics</div>
})));

const BuilderDashboard = lazy(() => import('./pages/admin/BuilderDashboard').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Builder Dashboard</div>
})));

const BuilderPageSetup = lazy(() => import('./components/admin/BuilderPageSetup').catch(() => ({
  default: () => <div className="p-8 text-center">Erro ao carregar Builder Setup</div>
})));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage').catch(() => ({
  default: () => <div className="p-8 text-center">Página não encontrada</div>
})));

const App = () => {
  useEffect(() => {
    try {
      loadFacebookPixel();
      captureUTMParameters();
      
      // Inicializar Builder.io com delay menor
      setTimeout(() => {
        try {
          initializeBuilder();
          console.log('Builder.io initialized successfully');
        } catch (error) {
          console.warn('Builder.io não pôde ser inicializado:', error);
        }
      }, 50);
      
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
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
                <Route path="/admin/creative-analytics" element={<CreativeAnalyticsPage />} />
                <Route path="/admin/ab-tests" element={<ABTestsPage />} />
                <Route path="/admin/quick-metrics" element={<QuickMetricsPage />} />
                <Route path="/admin/builder" element={<BuilderDashboard />} />
                <Route path="/admin/builder-setup" element={<BuilderPageSetup />} />
                
                {/* RESULTADO - Página de resultados */}
                <Route path="/resultado" element={<ResultPage />} />
                
                {/* OFERTA - Página de oferta (rota corrigida) */}
                <Route path="/quiz-descubra-seu-estilo" element={<QuizDescubraSeuEstiloPage />} />
                
                {/* Redirecionamentos */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/quiz" element={<Navigate to="/" replace />} />
                <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
                
                {/* 404 - Deve ser a última rota */}
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
