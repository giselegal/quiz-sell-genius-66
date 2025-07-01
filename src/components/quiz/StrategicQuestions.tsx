
import React, { useState, useEffect } from 'react';
import { strategicQuestions } from '@/data/strategicQuestions';
import { UserResponse } from '@/types/quiz';
import { QuizOption } from './QuizOption';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer,
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  
  const currentQuestion = strategicQuestions[currentQuestionIndex];
  const currentAnswers = currentQuestion ? (answers[currentQuestion.id] || []) : [];
  
  useEffect(() => {
    setImageError(false);
  }, [currentQuestion?.id]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-8">
        <p className="text-[#432818]">Questão não encontrada.</p>
      </div>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    console.log('[DEBUG] Strategic option selected:', optionId, 'for question:', currentQuestion.id);
    
    // Para questões estratégicas, sempre substituir a seleção (máximo 1)
    onAnswer({ 
      questionId: currentQuestion.id,
      selectedOptions: [optionId] // Sempre um array com apenas uma opção
    });
  };

  return (
    <div className={cn(
      "w-full max-w-4xl mx-auto pb-5 relative strategic-question",
      isMobile && "px-2"
    )}>
      {/* Título da questão estratégica */}
      <h2 className={cn(
        "font-playfair text-center mb-6 px-3 pt-3 text-[#432818] font-bold whitespace-pre-line tracking-normal",
        isMobile ? "text-xl" : "text-2xl md:text-3xl"
      )}>
        {currentQuestion.title}
      </h2>
      
      {/* Imagem da questão se existir */}
      {currentQuestion.imageUrl && !imageError && (
        <div className="w-full mb-6 flex justify-center">
          <img 
            src={currentQuestion.imageUrl} 
            alt="Imagem da questão" 
            className="max-w-md w-full rounded-lg shadow-sm" 
            onError={() => {
              console.error(`Failed to load image: ${currentQuestion.imageUrl}`);
              setImageError(true);
            }}
          />
        </div>
      )}
      
      {/* Opções da questão estratégica */}
      <div className={cn(
        "grid gap-4 px-2",
        "grid-cols-1", // Questões estratégicas sempre em uma coluna
        "strategic-options"
      )}>
        {currentQuestion.options.map((option) => (
          <QuizOption 
            key={option.id} 
            option={option} 
            isSelected={currentAnswers.includes(option.id)} 
            onSelect={handleOptionSelect}
            type="text" // Questões estratégicas são sempre texto
            questionId={currentQuestion.id}
            isDisabled={false} // Nunca desabilitar opções em questões estratégicas
            isStrategicOption={true} // Marcar como opção estratégica
          />
        ))}
      </div>

      {/* Indicador de progresso para questões estratégicas */}
      <div className="mt-6 text-center">
        <div className="text-sm text-[#8F7A6A] mb-2">
          Questão estratégica {currentQuestionIndex + 1} de {strategicQuestions.length}
        </div>
        <div className="w-full max-w-md mx-auto h-2 bg-[#B89B7A]/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#B89B7A] transition-all duration-300" 
            style={{ 
              width: `${((currentQuestionIndex + 1) / strategicQuestions.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
