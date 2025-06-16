
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import QuizPage from '@/components/QuizPage';
import QuizDescubraSeuEstilo from '@/pages/quiz-descubra-seu-estilo';
import ResultPage from '@/pages/ResultPage';
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';
import ModernEditorPage from '@/pages/ModernEditorPage';
import ModernEditorResultadoPage from '@/pages/ModernEditorResultadoPage';
import ModernEditorQuizPage from '@/pages/ModernEditorQuizPage';
import QuizIntro from '@/components/QuizIntro';
import QuizOfferPageVisualEditor from '@/components/editors/QuizOfferPageVisualEditor';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Componente de botão flutuante para acesso rápido ao editor
const QuickAccessEditorButton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => navigate('/quiz-offer-editor')}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editor Visual
        </Button>
        <Button
          onClick={() => navigate('/modern-editor/resultado')}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editor Resultado
        </Button>
        <Button
          onClick={() => navigate('/modern-editor/quiz')}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editor Quiz
        </Button>
      </div>
    </div>
  );
};

function App() {
  console.log('🚀 App component rendering - Simplified SPA routes');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Rota principal - Quiz Intro */}
        <Route path="/" element={<QuizIntro onStart={(nome: string, email?: string) => {
          console.log('Quiz started:', nome, email);
        }} />} />
        
        {/* Quiz principal */}
        <Route path="/quiz" element={<QuizPage />} />
        
        {/* Quiz específico de estilo */}
        <Route path="/quiz-descubra-seu-estilo" element={<QuizDescubraSeuEstilo />} />
        <Route path="/descubra-seu-estilo" element={<QuizDescubraSeuEstilo />} />
        
        {/* Página de resultados */}
        <Route path="/resultado" element={<ResultPage />} />
        
        {/* Editor unificado */}
        <Route path="/unified-editor" element={<UnifiedEditorPage />} />
        
        {/* Editor Visual Quiz Offer */}
        <Route path="/quiz-offer-editor" element={<QuizOfferPageVisualEditor />} />
        
        {/* Novo Editor Visual Moderno */}
        <Route path="/modern-editor" element={<ModernEditorPage />} />
        
        {/* Novos Editores para páginas específicas */}
        <Route path="/modern-editor/resultado" element={<ModernEditorResultadoPage />} />
        <Route path="/modern-editor/quiz" element={<ModernEditorQuizPage />} />
        
        {/* 404 para rotas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {/* Botão de acesso rápido ao editor (apenas em desenvolvimento) */}
      <QuickAccessEditorButton />
    </div>
  );
}

export default App;
