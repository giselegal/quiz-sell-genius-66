
import React from 'react';
import { MainTransition } from './MainTransition';
import QuizFinalTransition from '../QuizFinalTransition';
import { UserResponse } from '@/types/quiz';

interface QuizTransitionManagerProps {
  showingTransition: boolean;
  showingFinalTransition: boolean;
  handleStrategicAnswer: (response: UserResponse) => void;
  strategicAnswers: Record<string, string[]>;
  handleShowResult: () => void;
}

const QuizTransitionManager: React.FC<QuizTransitionManagerProps> = ({
  showingTransition,
  showingFinalTransition,
  handleStrategicAnswer,
  strategicAnswers,
  handleShowResult,
}) => {
  if (showingFinalTransition) {
    return <QuizFinalTransition onShowResult={handleShowResult} />;
  }

  if (showingTransition) {
    return (
      <MainTransition
        onAnswer={handleStrategicAnswer}
        strategicAnswers={strategicAnswers}
      />
    );
  }

  return null;
};

export { QuizTransitionManager };
