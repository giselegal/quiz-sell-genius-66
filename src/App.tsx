
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
import LovableRoutes from './lovable-routes';
import { fixMainRoutes } from './utils/fixMainRoutes';

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
const ResultPage = lazy(() => import('./pages/ResultPage'));
const QuizOfferPage = lazy(() => import('./pages/QuizOfferPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Avalia se o dispositivo tem performance limitada
const isLowPerformanceDevice = () => {
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  const cpuCores = navigator.hardwareConcurrency;
  if (cpuCores && cpuCores < 4) return true;
  
  return false;
};

// Detecta se o aplicativo está rodando dentro do ambiente Lovable.dev
const isRunningInLovable = () => {
  return typeof window !== 'undefined' && (
    window.location.hostname.includes('lovableproject.com') || 
    window.location.hostname.includes('lovable.dev') ||
    window.location.search.includes('lovable=true')
  );
};

const App = () => {
  const lowPerformance = isLowPerformanceDevice();
  const isLovableEnv = isRunningInLovable();

  // Inicializar analytics e corrigir rotas na montagem do componente
  useEffect(() => {
    try {
      loadFacebookPixel();
      captureUTMParameters();
      fixMainRoutes();
      
      console.log(`App initialized with performance optimization${lowPerformance ? ' (low-performance mode)' : ''}`);
      console.log('✅ Main routes activated');
    } catch (error) {
      console.error('Erro ao inicializar aplicativo:', error);
    }
  }, [lowPerformance]);

  // Reinicializar Facebook Pixel e correção de rotas em mudanças de rota
  useEffect(() => {    
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        fixMainRoutes();
        
        if (window.fbq) {
          window.fbq('track', 'PageView');
          console.log('PageView tracked on route change');
        }
      }
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <CriticalCSSLoader cssContent={initialCriticalCSS} id="initial-critical" removeOnLoad={true} />
            <CriticalCSSLoader cssContent={heroCriticalCSS} id="hero-critical" removeOnLoad={true} />
            
            {isLovableEnv ? (
              <LovableRoutes />
            ) : (
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* ROTA PRINCIPAL - Quiz com introdução */}
                  <Route path="/" element={<QuizPage />} />
                  
                  {/* ADMIN - Dashboard centralizado com todas as funcionalidades administrativas */}
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  
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
            )}
          </Router>
          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
