// App.tsx (Reintroduzindo Providers)
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster'; // Adicionado Toaster que geralmente acompanha TooltipProvider

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div style={{ padding: '20px', textAlign: 'center', color: 'blue', fontSize: '20px', border: '2px solid blue', margin: '20px' }}>
    Carregando componente lazy... <br/> Pathname atual: {window.location.pathname}
  </div>
);

// Lazy loading da página do editor (já simplificada para mensagem verde)
const EnhancedResultPageEditorPage = lazy(() => import('./pages/EnhancedResultPageEditorPage'));

// Página de teste simples para a raiz
const SimpleHomePage = () => (
  <div style={{ padding: '50px', textAlign: 'center', backgroundColor: 'lightblue', fontSize: '24px' }}>
    <h1>PÁGINA INICIAL DE TESTE</h1>
    <p>Esta é a rota "/"</p>
  </div>
);

// Página de teste simples para "não encontrado"
const NotFoundTestPage = () => (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: 'lightcoral', fontSize: '24px' }}>
      <h1>404 - ROTA NÃO ENCONTRADA</h1>
      <p>Path: {window.location.pathname}</p>
    </div>
  );

const App = () => {
  console.log("App.tsx with Providers is rendering. Current window.location.pathname:", window.location.pathname);
  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <div style={{ border: '3px dashed purple', padding: '10px', margin: '10px', backgroundColor: '#f5e6ff' }}>
              <h1 style={{ textAlign: 'center', color: 'purple' }}>VISUALIZADOR DE APP COM PROVIDERS ATIVO</h1>
              <p style={{ textAlign: 'center' }}>Pathname no momento da renderização do App: {window.location.pathname}</p>
              <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
                <a href="/admin/editor" style={{marginRight: '10px', fontSize: '18px'}}>Ir para Editor</a>
                <a href="/" style={{fontSize: '18px'}}>Ir para Home</a>
              </nav>
            </div>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/admin/editor" element={<EnhancedResultPageEditorPage />} />
                <Route path="/" element={<SimpleHomePage />} />
                <Route path="*" element={<NotFoundTestPage />} />
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
