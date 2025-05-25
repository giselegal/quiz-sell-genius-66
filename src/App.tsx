// App.tsx (AuthProvider completamente removido/comentado)
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';

// Lazy-loaded components
const QuizFlow = loadable(() => import('./components/QuizFlow'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando quiz...</div>
});

const AdminLayout = loadable(() => import('./components/admin/AdminLayout'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando painel...</div>
});

const EditorPage = loadable(() => import('./components/admin/editor/EnhancedResultPageEditorPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando editor...</div>
});

const ResultPage = loadable(() => import('./components/ResultPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando resultados...</div>
});

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

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div style={{ border: '3px dashed green', padding: '10px', margin: '10px', backgroundColor: '#e6ffe6' }}>
          <h1 style={{ textAlign: 'center', color: 'green' }}>VISUALIZADOR DE APP SEM AUTHPROVIDER (QUIZPROVIDER TAMBÉM COMENTADO)</h1>
          <p style={{ textAlign: 'center' }}>Pathname no momento da renderização do App: {window.location.pathname}</p>
          <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Link to="/admin/editor" style={{marginRight: '10px', fontSize: '18px', cursor: 'pointer'}}>Ir para Editor</Link>
            <Link to="/" style={{fontSize: '18px', cursor: 'pointer'}}>Ir para Home</Link>
          </nav>
        </div>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Carregando...</div>}>
          <Routes>
            {/* Rota principal para o quiz */}
            <Route path="/" element={<QuizFlow />} />
            
            {/* Rota para a página de resultados */}
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/resultado/:id" element={<ResultPage />} />
            
            {/* Rotas administrativas */}
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/admin/editor" element={<EditorPage />} />
            <Route path="/admin/editor/:id" element={<EditorPage />} />
            
            {/* Rota de fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
