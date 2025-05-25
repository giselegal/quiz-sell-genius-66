import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
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
