
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizContentProps {
  user: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
  currentQuestion: any;
  currentAnswers: string[];
  handleAnswerSubmit: (response: any) => void;
  handleNextClick: () => void;
  handlePrevious: () => void;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  currentQuestionIndex,
  totalQuestions,
  currentQuestion,
  handleNextClick,
  handlePrevious
}) => {
  console.log('🎯 QuizContent carregando...');

  return (
    <div className="quiz-content">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Pergunta {currentQuestionIndex + 1} de {totalQuestions}
          </h2>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {currentQuestion && (
        <div className="question-container">
          <h3 className="text-xl font-medium mb-6">{currentQuestion.title}</h3>
          
          <div className="options-container space-y-3 mb-8">
            {currentQuestion.options?.map((option: any, index: number) => (
              <button
                key={option.id}
                className="w-full p-4 text-left border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                onClick={() => console.log('Opção selecionada:', option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button 
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </Button>
        
        <Button onClick={handleNextClick}>
          {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
};
