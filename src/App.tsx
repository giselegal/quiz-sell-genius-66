
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { LoadingFallback } from './components/ui/loading-fallback';

// Lazy-loaded components principais
const QuizIntro = loadable(() => import('./components/QuizIntro'), {
  fallback: <LoadingFallback message="Carregando quiz..." />
});

const QuizPage = loadable(() => import('./components/QuizPage'), {
  fallback: <LoadingFallback message="Carregando perguntas..." />
});

const ResultPage = loadable(() => import('./pages/ResultPage'), {
  fallback: <LoadingFallback message="Carregando resultado..." />
});

const QuizOfferPage = loadable(() => import('./components/QuizOfferPage'), {
  fallback: <LoadingFallback message="Carregando oferta..." />
});

// Admin Dashboard
const AdminDashboard = loadable(() => import('./pages_backup/admin/OldAdminDashboard'), {
  fallback: <LoadingFallback message="Carregando painel administrativo..." />
});

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Carregando...</div>}>
            <Routes>
              {/* ROTA PRINCIPAL - Quiz */}
              <Route path="/" element={<QuizIntro />} />
              
              {/* ROTAS DO QUIZ */}
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/:step" element={<QuizPage />} />
              
              {/* ROTA DE RESULTADO + OFERTA */}
              <Route path="/resultado" element={<ResultPage />} />
              
              {/* ROTA QUIZ OFERTA */}
              <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
              
              {/* ROTAS ADMINISTRATIVAS */}
              <Route path="/admin/*" element={<AdminDashboard />} />
              
              {/* Rota de fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
