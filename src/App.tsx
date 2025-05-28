import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditorPage from './pages/admin/EditorPage';
import SettingsPage from './pages/admin/SettingsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import EditorNotFoundPage from './pages/EditorNotFoundPage';
import EnhancedResultPageEditor from './pages/EnhancedResultPageEditorPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initFacebookPixel, captureUTMParameters } from './utils/analytics';
import { Toaster } from '@/components/ui/toaster';
import ABTestPage from './pages/admin/ABTestPage';
import ABTestManagerPage from './pages/ABTestManagerPage';

// Avalia se o dispositivo tem performance limitada
const isLowPerformanceDevice = () => {
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  // Se o dispositivo tem menos de 4GB de RAM ou não tem informação disponível, verificar CPU cores
  const cpuCores = navigator.hardwareConcurrency;
  if (cpuCores && cpuCores < 4) return true;
  
  return false;
};

const App = () => {
  const lowPerformance = isLowPerformanceDevice();

  // Inicializar analytics na montagem do componente
  React.useEffect(() => {
    // Inicializar Facebook Pixel
    initFacebookPixel();
    
    // Capturar UTM parameters para analytics de marketing
    captureUTMParameters();
    
    console.log(`App initialized with performance optimization${lowPerformance ? ' (low-performance mode)' : ''}`);
  }, [lowPerformance]);

  // Reinicializar Facebook Pixel em mudanças de rota
  React.useEffect(() => {    
    // Função para lidar com mudanças de rota
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
        console.log('PageView tracked on route change');
      }
    };
    
    // Adicionar listener para mudanças de rota
    window.addEventListener('popstate', handleRouteChange);
    
    // Limpar o listener
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/resultado" element={<ResultPage />} />
              {/* Editor visual aprimorado para página de resultados */}
              <Route path="/resultado/editor" element={<EnhancedResultPageEditor />} />
              {/* Redirecionar página de edição de resultados para o editor unificado com a aba de resultados ativa */}
              <Route path="/resultado/editar" element={<Navigate to="/admin/editor?tab=result" replace />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Manter apenas uma rota principal para o editor unificado */}
              <Route path="/admin/editor" element={<EditorPage />} />
              <Route path="/admin/editor/error" element={<EditorNotFoundPage />} />
              {/* Redirecionar o antigo quiz-builder para o editor unificado com a aba de quiz ativa */}
              <Route path="/admin/quiz-builder" element={<Navigate to="/admin/editor?tab=quiz" replace />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route path="/admin/ab-test" element={<ABTestPage />} />
              <Route path="/admin/ab-test-manager" element={<ABTestManagerPage />} />
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
