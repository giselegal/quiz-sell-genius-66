import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import QuizPage from "@/components/QuizPage";
import QuizDescubraSeuEstilo from "@/pages/quiz-descubra-seu-estilo";
import ResultPage from "@/pages/ResultPage";
import UnifiedEditorPage from "@/pages/UnifiedEditorPage";
import ModernEditorPage from "@/pages/ModernEditorPage";
import CaktoEditorPage from "@/pages/CaktoEditorPage";
import EditorTest from "@/pages/EditorTest";
import QuizIntro from "@/components/QuizIntro";
import QuizOfferPageVisualEditor from "@/components/editors/QuizOfferPageVisualEditor";
import AdvancedQuizEditor from "@/components/visual-editor/AdvancedQuizEditor";
import AdvancedQuizEditorTest from "@/components/visual-editor/AdvancedQuizEditor.test";
import SimpleDragDropEditor from "@/components/visual-editor/SimpleDragDropEditor";
import QuizPreview from "@/components/QuizPreview";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuizConfigProvider } from "@/hooks/useQuizConfig";
import { QuizConfigTest } from "@/components/test/QuizConfigTest";
import { EditingFlowDemo } from "@/components/demo/EditingFlowDemo";
import "@/styles/quiz-dynamic-theme.css";
import { NewQuizPage } from "@/pages/NewQuizPage";

// Componente de botão flutuante para acesso rápido ao editor
const QuickAccessEditorButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        onClick={() => navigate("/simple-editor")}
        className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        size="sm"
      >
        <Edit className="w-4 h-4 mr-2" />✨ Simple Editor (NOVO)
      </Button>
      <Button
        onClick={() => navigate("/cakto-editor")}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        size="sm"
      >
        <Edit className="w-4 h-4 mr-2" />
        Cakto Editor
      </Button>
      <Button
        onClick={() => navigate("/advanced-editor")}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="sm"
      >
        <Edit className="w-4 h-4 mr-2" />
        Advanced Editor
      </Button>
    </div>
  );
};

function App() {
  console.log("🚀 App component rendering - Simplified SPA routes");

  return (
    <QuizConfigProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Rota principal - Quiz Intro */}
          <Route
            path="/"
            element={
              <QuizIntro
                onStart={(nome: string, email?: string) => {
                  console.log("Quiz started:", nome, email);
                }}
              />
            }
          />

          {/* Quiz principal */}
          <Route path="/quiz" element={<QuizPage />} />

          {/* Novo Quiz baseado no editor */}
          <Route path="/new-quiz" element={<NewQuizPage />} />

          {/* Quiz específico de estilo */}
          <Route
            path="/quiz-descubra-seu-estilo"
            element={<QuizDescubraSeuEstilo />}
          />
          <Route
            path="/descubra-seu-estilo"
            element={<QuizDescubraSeuEstilo />}
          />

          {/* Página de resultados */}
          <Route path="/resultado" element={<ResultPage />} />

          {/* Editor unificado */}
          <Route path="/unified-editor" element={<UnifiedEditorPage />} />

          {/* Editor Visual Quiz Offer */}
          <Route
            path="/quiz-offer-editor"
            element={<QuizOfferPageVisualEditor />}
          />

          {/* Novo Editor Visual Moderno */}
          <Route path="/modern-editor" element={<ModernEditorPage />} />
          <Route path="/editor" element={<ModernEditorPage />} />

          {/* Novo Editor Cakto Quiz */}
          <Route path="/cakto-editor" element={<CaktoEditorPage />} />

          {/* Editor Visual Avançado - Modularizado CORRIGIDO */}
          <Route path="/advanced-editor" element={<AdvancedQuizEditor />} />

          {/* Teste do Editor Visual Avançado */}
          <Route
            path="/advanced-editor-test"
            element={<AdvancedQuizEditorTest />}
          />
          <Route
            path="/advanced-editor-test"
            element={<AdvancedQuizEditorTest />}
          />

          {/* Página de Teste */}
          <Route path="/editor-test" element={<EditorTest />} />

          {/* NOVO: Editor Visual Modular Completo - SimpleDragDropEditor */}
          <Route
            path="/simple-editor"
            element={
              <div className="min-h-screen bg-background">
                <SimpleDragDropEditor />
              </div>
            }
          />

          {/* Teste de Configuração - Apenas para desenvolvimento */}
          <Route path="/test-config" element={<QuizConfigTest />} />

          {/* Demo do Fluxo de Edição */}
          <Route path="/editing-demo" element={<EditingFlowDemo />} />

          {/* Nova Página do Quiz */}
          <Route path="/new-quiz" element={<NewQuizPage />} />

          {/* Rota de Preview do Quiz */}
          <Route path="/quiz-preview" element={<QuizPreview />} />

          {/* 404 para rotas não encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Botão de acesso rápido ao editor (apenas em desenvolvimento) */}
        <QuickAccessEditorButton />
      </div>
    </QuizConfigProvider>
  );
}

export default App;
