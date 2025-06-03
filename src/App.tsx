import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { captureUTMParameters } from './utils/analytics';
import { loadFacebookPixel } from './utils/facebookPixel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CriticalCSSLoader from './components/CriticalCSSLoader';
import { initialCriticalCSS, heroCriticalCSS } from './utils/critical-css';
import ABTestRedirect from './components/ABTestRedirect';

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Lazy loading das páginas essenciais
const QuizPage = lazy(() => import('./components/QuizPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const QuizDescubraSeuEstilo = lazy(() => import('./pages/quiz-descubra-seu-estilo'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Avalia se o dispositivo tem performance limitada
const isLowPerformanceDevice = () => {
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  const cpuCores = navigator.hardwareConcurrency;
  if (cpuCores && cpuCores < 4) return true;
  
  return false;
};

// Função para prefetch de componentes
const prefetchComponent = (componentLoader: () => Promise<any>) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      componentLoader();
    });
  } else {
    setTimeout(() => {
      componentLoader();
    }, 2000);
  }
};

const App = () => {
  const lowPerformance = isLowPerformanceDevice();

  // Inicializar analytics na montagem do componente
  useEffect(() => {
    try {
      loadFacebookPixel();
      captureUTMParameters();
      
      // Prefetch da página de resultado
      if (!lowPerformance) {
        prefetchComponent(() => import('./pages/ResultPage'));
      }
      
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
              <ABTestRedirect>
                <Routes>
                  {/* Rotas principais em SPA */}
                  <Route path="/" element={<QuizPage />} />
                  <Route path="/resultado" element={<ResultPage />} />
                  <Route path="/descubra-seu-estilo" element={<QuizDescubraSeuEstilo />} />
                  <Route path="/admin/*" element={<DashboardPage />} />
                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ABTestRedirect>
            </Suspense>
          </Router>
          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
