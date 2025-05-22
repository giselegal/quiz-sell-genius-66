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
  hideCounter?: boolean;           // <-- nova prop
}

const QuizTransitionManager: React.FC<QuizTransitionManagerProps> = ({
  showingTransition,
  showingFinalTransition,
  handleStrategicAnswer,
  strategicAnswers,
  handleShowResult,
  hideCounter = false,            // <-- valor default
}) => {
  if (showingFinalTransition) {
    return <QuizFinalTransition onShowResult={handleShowResult} />;
  }

  if (showingTransition) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <MainTransition
          onAnswer={handleStrategicAnswer}
          strategicAnswers={strategicAnswers}
        />

        {/* Remover/ocultar contador numérico */}
        {!hideCounter && (
          <div /* id="transition-counter" ou classe que existia */>
            {/* ...existing counter logic / JSX... */}
          </div>
        )}

        {/* Spinner ou mensagem continuam aparecendo normalmente */}
        <Spinner /> {/* ou componente existente */}
      </div>
    );
  }

  return null;
};

export { QuizTransitionManager };
