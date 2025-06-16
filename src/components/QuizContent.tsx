
import React from 'react';
import { QuizQuestion } from './QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { QuizHeader } from './quiz/QuizHeader';

interface QuizContentProps {
  user: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
  currentQuestion: any;
  currentAnswers: string[];
  handleAnswerSubmit: (response: UserResponse) => void;
  handleNextClick?: () => void;
  handlePrevious?: () => void;
  showHeader?: boolean;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  user,
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions,
  currentStrategicQuestionIndex,
  currentQuestion,
  currentAnswers,
  handleAnswerSubmit,
  handleNextClick,
  handlePrevious,
  showHeader = true,
}) => {
  // Get user name from localStorage if not provided in props
  const userName = user?.userName || localStorage.getItem('userName') || 'Usuário de Teste';
  
  // Determine the required selections based on question type
  const requiredSelections = showingStrategicQuestions ? 1 : (currentQuestion?.multiSelect || 3);
  
  // Check if we have enough selections to proceed
  const canProceed = currentAnswers?.length === requiredSelections;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p className="text-[#432818]">Carregando questão...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {showHeader && (
        <QuizHeader 
          userName={userName}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          showingStrategicQuestions={showingStrategicQuestions}
          currentStrategicQuestionIndex={currentStrategicQuestionIndex}
        />
      )}

      <div className="container mx-auto px-4 py-8 w-full max-w-5xl">
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
          currentAnswers={currentAnswers || []}
          showQuestionImage={true}
          autoAdvance={false}
          onNext={handleNextClick}
          onPrevious={handlePrevious}
          canProceed={canProceed}
          showNavigationButtons={true}
        />
      </div>
    </div>
  );
};
