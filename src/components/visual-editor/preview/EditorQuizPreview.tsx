import React from "react";
import { QuizQuestion } from "@/components/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import { StrategicQuestions } from "@/components/quiz/StrategicQuestions";
import { QuizQuestion as QuizQuestionType, UserResponse } from "@/types/quiz";

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
  const isStrategicQuestion = currentStage.type === "strategic";
  const isQuizQuestion = currentStage.type === "quiz" || isStrategicQuestion;

  if (!isQuizQuestion || !currentStage.questionData) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">Preview da Etapa</p>
          <p className="text-sm mt-1">{currentStage.name}</p>
          <p className="text-xs mt-2 text-gray-400">
            Tipo: {currentStage.type}
          </p>
        </div>
      </div>
    );
  }

  // Determinar as seleções necessárias baseado no tipo da questão
  const requiredSelections = isStrategicQuestion ? 1 : 3;
  const canProceed = currentAnswers?.length >= requiredSelections;

  // Determinar tipo da questão para navegação
  const currentQuestionType: "normal" | "strategic" = isStrategicQuestion
    ? "strategic"
    : "normal";

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
      {/* Render da questão usando o componente real */}
      {isStrategicQuestion ? (
        <StrategicQuestions
          currentQuestionIndex={0} // Mock index para preview
          answers={{ [currentStage.questionData.id]: currentAnswers }}
          onAnswer={onAnswer}
        />
      ) : (
        <QuizQuestion
          question={currentStage.questionData}
          onAnswer={onAnswer}
          currentAnswers={currentAnswers || []}
          showQuestionImage={true}
          isStrategicQuestion={false}
        />
      )}

      {/* Navegação usando o componente real */}
      <QuizNavigation
        canProceed={canProceed}
        onNext={onNext}
        onPrevious={onPrevious}
        currentQuestionType={currentQuestionType}
        selectedOptionsCount={currentAnswers?.length || 0}
        isLastQuestion={false} // Mock para preview
      />

      {/* Indicador do viewport */}
      <div className="mt-4 text-center">
        <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          Preview {viewportMode} - Questão {currentQuestionType}
        </span>
      </div>
    </div>
  );
};
