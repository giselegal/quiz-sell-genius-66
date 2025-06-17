import React from "react";
import { QuizQuestion as QuizQuestionType, UserResponse } from "@/types/quiz";
// Import modular stage layouts
import {
  StageLayoutIntro,
  StageLayoutQuestion,
  StageLayoutTransition,
  StageLayoutStrategic,
  StageLayoutResult,
  StageLayoutOffer
} from "../layouts";

interface EditorQuizPreviewProps {
  currentStage: {
    id: string;
    name: string;
    type: "intro" | "quiz" | "transition" | "result" | "offer" | "strategic";
    questionData?: QuizQuestionType;
    order?: number;
  };
  questions: QuizQuestionType[];
  strategicQuestions: QuizQuestionType[];
  currentAnswers: string[];
  onAnswer: (response: UserResponse) => void;
  onNext: () => void;
  onPrevious?: () => void;
  viewportMode: "desktop" | "tablet" | "mobile";
}

export const EditorQuizPreview: React.FC<EditorQuizPreviewProps> = ({
  currentStage,
  questions,
  strategicQuestions,
  currentAnswers,
  onAnswer,
  onNext,
  onPrevious,
  viewportMode,
}) => {
  // Function to render appropriate stage layout
  const renderStageLayout = () => {
    switch (currentStage.type) {
      case "intro":
        return (
          <StageLayoutIntro
            stage={{
              id: currentStage.id,
              type: currentStage.type,
              title: "Descubra Seu Estilo Único",
              subtitle: "Um quiz personalizado para descobrir qual estilo combina mais com você",
              buttonText: "Começar Quiz"
            }}
            onNext={onNext}
          />
        );
      
      case "quiz":
        if (currentStage.questionData) {
          return (
            <StageLayoutQuestion
              stage={{
                id: currentStage.id,
                title: currentStage.questionData.question,
                subtitle: currentStage.questionData.subtitle,
                type: currentStage.questionData.type,
                options: currentStage.questionData.options,
              }}
              selectedOptions={currentAnswers}
              onAnswer={(optionId) => onAnswer({ questionId: currentStage.questionData!.id, selectedOptions: [optionId] })}
              onNext={onNext}
              onPrevious={onPrevious}
              showPrevious={!!onPrevious}
              showNext={true}
            />
          );
        }
        break;
      
      case "strategic":
        return (
          <StageLayoutStrategic
            stage={{
              id: currentStage.id,
              type: currentStage.type,
              title: "Questões Estratégicas",
              subtitle: "Algumas perguntas adicionais para personalizar melhor sua experiência"
            }}
            onNext={onNext}
            onPrevious={onPrevious}
            showPrevious={!!onPrevious}
          />
        );
      
      case "transition":
        return (
          <StageLayoutTransition
            stage={{
              id: currentStage.id,
              type: currentStage.type,
              title: "Analisando suas respostas...",
              subtitle: "Estamos preparando seu resultado personalizado"
            }}
            onNext={onNext}
          />
        );
      
      case "result":
        return (
          <StageLayoutResult
            stage={{
              id: currentStage.id,
              type: currentStage.type,
              title: "Seu Resultado",
              subtitle: "Descubra qual estilo combina mais com você"
            }}
          />
        );
      
      case "offer":
        return (
          <StageLayoutOffer
            stage={{
              id: currentStage.id,
              type: currentStage.type,
              title: "Oferta Especial",
              subtitle: "Baseado no seu resultado, temos uma oferta personalizada!"
            }}
          />
        );
      
      default:
        return (
          <div className="text-center p-8">
            <p className="text-gray-500">Preview não disponível para este tipo de etapa</p>
            <p className="text-sm text-gray-400 mt-2">Tipo: {currentStage.type}</p>
          </div>
        );
    }
  };

  // Main render with viewport wrapper
  return (
    <div 
      className={`quiz-preview-container ${viewportMode}-viewport`}
      style={{
        maxWidth: 
          viewportMode === "desktop" ? "1024px" : 
          viewportMode === "tablet" ? "768px" : "420px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Render the appropriate stage layout */}
      {renderStageLayout()}

      {/* Viewport indicator */}
      <div className="mt-4 text-center">
        <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          Preview {viewportMode} - {currentStage.name || currentStage.type}
        </span>
      </div>
    </div>
  );
};
