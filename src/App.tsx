
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

// Componente de erro genérico
const ErrorFallback = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-[#B89B7A] text-white px-4 py-2 rounded hover:bg-[#9F836A]"
      >
        Recarregar Página
      </button>
    </div>
  </div>
);

// Lazy loading das páginas principais com error boundaries melhorados
const QuizPage = lazy(() => 
  import('./components/QuizPage').catch(() => {
    console.error('Failed to load QuizPage');
    return { default: () => <ErrorFallback message="Erro ao carregar página do Quiz" /> };
  })
);

const TestPage = lazy(() => 
  import('./pages/TestPage').catch(() => {
    console.error('Failed to load TestPage');
    return { default: () => <ErrorFallback message="Erro ao carregar página de Teste" /> };
  })
);

const QuizDescubraSeuEstiloPage = lazy(() => 
  import('./pages/quiz-descubra-seu-estilo').catch(() => {
    console.error('Failed to load QuizDescubraSeuEstiloPage');
    return { default: () => <ErrorFallback message="Erro ao carregar página Quiz Descubra Seu Estilo" /> };
  })
);

const ResultPage = lazy(() => 
  import('./pages/ResultPage').catch(() => {
    console.error('Failed to load ResultPage');
    return { default: () => <ErrorFallback message="Erro ao carregar página de Resultado" /> };
  })
);

const AdminDashboard = lazy(() => 
  import('./pages/admin/AdminDashboard').catch(() => {
    console.error('Failed to load AdminDashboard');
    return { default: () => <ErrorFallback message="Erro ao carregar Dashboard Admin" /> };
  })
);

const EditorPage = lazy(() => 
  import('./pages/admin/EditorPage').catch(() => {
    console.error('Failed to load EditorPage');
    return { default: () => <ErrorFallback message="Erro ao carregar Editor" /> };
  })
);

const NotFoundPage = lazy(() => 
  import('./pages/NotFoundPage').catch(() => {
    console.error('Failed to load NotFoundPage');
    return { default: () => <ErrorFallback message="Página não encontrada" /> };
  })
);

const App = () => {
  useEffect(() => {
    try {
      console.log('Inicializando aplicação...');
      console.log('URL atual:', window.location.href);
      console.log('Pathname:', window.location.pathname);
      
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
                
                {/* RESULTADO - Página de resultados */}
                <Route path="/resultado" element={<ResultPage />} />
                
                {/* OFERTA - Página de oferta */}
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
