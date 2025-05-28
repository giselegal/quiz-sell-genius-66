import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';

// Lazy-loaded components
const QuizIntroComponent = loadable(() => import('./components/QuizIntro'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando introdução ao quiz...</div>
});

const QuizPageComponent = loadable(() => import('./components/QuizPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando quiz...</div>
});

const ResultPageComponent = loadable(() => import('./pages/ResultPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando resultados...</div>
});

const QuizOfferPageComponent = loadable(() => import('./pages/QuizOfferPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando oferta de quiz...</div>
});

const HomePage = () => {
  const [activeComponent, setActiveComponent] = React.useState<'intro' | 'quiz'>('intro');
  
  const handleStartQuiz = () => {
    setActiveComponent('quiz');
  };
  
  return (
    <div>
      {activeComponent === 'intro' && (
        <QuizIntroComponent onStartQuiz={handleStartQuiz} />
      )}
      
      {activeComponent === 'quiz' && (
        <QuizPageComponent />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Carregando...</div>}>
          <Routes>
            {/* Rota principal para o quiz */}
            <Route path="/" element={<HomePage />} />
            
            {/* Rota para a página de resultados */}
            <Route path="/resultado" element={<ResultPageComponent />} />
            <Route path="/resultado/:id" element={<ResultPageComponent />} />

            {/* Rota para a página de oferta de quiz */}
            <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPageComponent />} />

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
