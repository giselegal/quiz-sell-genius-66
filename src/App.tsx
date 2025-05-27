import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';

// Lazy-loaded components - SPA ORIGINAL
const QuizIntro = loadable(() => import('./components/QuizIntro'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando quiz...</div>
});

const QuizPage = loadable(() => import('./components/QuizPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando quiz...</div>
});

const ResultPage = loadable(() => import('./pages_backup/ResultPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando resultado...</div>
});

const QuizOfferPage = loadable(() => import('./pages_backup/QuizOfferPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando oferta...</div>
});

// Admin components
const AdminDashboard = loadable(() => import('./pages_backup/admin/OldAdminDashboard'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando painel...</div>
});

const EditorPage = loadable(() => import('./components/admin/editor/EnhancedResultPageEditorPage'), {
  fallback: <div className="flex h-screen w-full items-center justify-center">Carregando editor...</div>
});

// Componente wrapper para QuizIntro com navegação
const QuizIntroWrapper = () => {
  const navigate = useNavigate();
  
  const handleStartQuiz = (nome: string) => {
    // Salvar nome no localStorage
    localStorage.setItem('userName', nome);
    // Navegar para a página do quiz
    navigate('/quiz');
  };
  
  return <QuizIntro onStart={handleStartQuiz} />;
};

// Componente wrapper para navegação de demo
const QuizDemoWrapper = () => {
  const navigate = useNavigate();
  
  const handleStartQuiz = (nome: string) => {
    localStorage.setItem('userName', nome);
    navigate('/quiz');
  };
  
  return <QuizIntro onStart={handleStartQuiz} />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Carregando...</div>}>
            <Routes>
              {/* ROTA PRINCIPAL - Quiz com QuizIntro */}
              <Route path="/" element={<QuizIntroWrapper />} />
              
              {/* ROTAS DO QUIZ */}
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/:step" element={<QuizPage />} />
              
              {/* ROTAS DE RESULTADO + OFERTA */}
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/resultado/:id" element={<ResultPage />} />
              
              {/* PÁGINA DE OFERTA */}
              <Route path="/quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
              
              {/* ROTAS ADMINISTRATIVAS */}
              <Route path="/admin/*" element={<AdminDashboard />} />
              
              {/* EDITOR VISUAL */}
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:id" element={<EditorPage />} />
              
              {/* ROTAS DE DESENVOLVIMENTO/TESTE */}
              <Route path="/demo" element={<QuizDemoWrapper />} />
              <Route path="/preview" element={<ResultPage />} />
              <Route path="/offer" element={<QuizOfferPage />} />
              <Route path="/test" element={
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">🧪 Quiz Sell Genius - SPA</h1>
                    <p className="text-gray-600 mb-6">Versão SPA Original</p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center">
                        🎯 Quiz
                      </a>
                      <a href="/resultado" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 block text-center">
                        📊 Resultado
                      </a>
                      <a href="/quiz-descubra-seu-estilo" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 block text-center">
                        💰 Oferta
                      </a>
                      <a href="/admin" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 block text-center">
                        ⚙️ Admin
                      </a>
                    </div>
                  </div>
                </div>
              } />
              
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