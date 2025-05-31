
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { captureUTMParameters } from './utils/analytics';
import { loadFacebookPixel } from './utils/facebookPixel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CriticalCSSLoader from './components/CriticalCSSLoader';
import { initialCriticalCSS, heroCriticalCSS } from './utils/critical-css';

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Lazy loading das páginas usando a pasta pages/
const QuizPage = lazy(() => import('./components/QuizPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const QuizOfferPage = lazy(() => import('./pages/QuizOfferPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const EditorPage = lazy(() => import('./pages/admin/EditorPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const ABTestPage = lazy(() => import('./pages/admin/ABTestPage'));
const QuickEditorPage = lazy(() => import('./pages/admin/QuickEditorPage'));
const CreativeAnalyticsPage = lazy(() => import('./pages/CreativeAnalyticsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Avalia se o dispositivo tem performance limitada
const isLowPerformanceDevice = () => {
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  const cpuCores = navigator.hardwareConcurrency;
  if (cpuCores && cpuCores < 4) return true;
  
  return false;
};

const App = () => {
  const lowPerformance = isLowPerformanceDevice();

  // Inicializar analytics na montagem do componente
  useEffect(() => {
    try {
      loadFacebookPixel();
      captureUTMParameters();
      
      console.log(`App initialized with performance optimization${lowPerformance ? ' (low-performance mode)' : ''}`);
    } catch (error) {
      console.error('Erro ao inicializar aplicativo:', error);
    }
  }, [lowPerformance]);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <CriticalCSSLoader cssContent={initialCriticalCSS} id="initial-critical" removeOnLoad={true} />
            <CriticalCSSLoader cssContent={heroCriticalCSS} id="hero-critical" removeOnLoad={true} />
            
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* ROTA PRINCIPAL - Quiz com introdução */}
                <Route path="/" element={<QuizPage />} />
                
                {/* ADMIN - Dashboard centralizado usando páginas da pasta pages/admin/ */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/editor" element={<EditorPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
                <Route path="/admin/ab-test" element={<ABTestPage />} />
                <Route path="/admin/offer-editor" element={<AdminDashboard />} />
                <Route path="/admin/quick-editor" element={<QuickEditorPage />} />
                <Route path="/admin/prototype" element={<AdminDashboard />} />
                
                {/* ANALYTICS DE CRIATIVOS - Página específica */}
                <Route path="/admin/creative-analytics" element={<CreativeAnalyticsPage />} />
                
                {/* RESULTADO - Página de resultados do quiz */}
                <Route path="/resultado" element={<ResultPage />} />
                
                {/* OFERTA DO QUIZ - Página de oferta com quiz embutido */}
                <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
                
                {/* Redirecionamentos para manter compatibilidade */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/quiz" element={<Navigate to="/" replace />} />
                
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
