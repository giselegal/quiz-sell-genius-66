
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy loading dos componentes principais para o Lovable
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const QuizPage = lazy(() => import('./components/QuizPage'));
const QuizOfferPage = lazy(() => import('./pages/QuizOfferPage'));

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="h-12 w-12 border-4 border-t-[#B89B7A] rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

/**
 * Rotas específicas para o ambiente Lovable.dev
 * Mantém a mesma estrutura simplificada do App principal
 */
export const LovableRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* ROTA PRINCIPAL - Quiz com introdução */}
        <Route path="/" element={<QuizPage />} />
        
        {/* ADMIN - Dashboard centralizado */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* RESULTADO - Página de resultados */}
        <Route path="/resultado" element={<ResultPage />} />
        
        {/* OFERTA DO QUIZ - Página de oferta */}
        <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
      </Routes>
    </Suspense>
  );
};

export default LovableRoutes;
