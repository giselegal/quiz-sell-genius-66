
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import QuizPage from '@/components/QuizPage';
import QuizDescubraSeuEstilo from '@/pages/quiz-descubra-seu-estilo';
import ResultPage from '@/pages/ResultPage';
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';
import QuizIntro from '@/components/QuizIntro';
import QuizOfferPageVisualEditor from '@/components/editors/QuizOfferPageVisualEditor';

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
        
        {/* 404 para rotas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
