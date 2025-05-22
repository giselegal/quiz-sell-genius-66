import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption } from './quiz/QuizOption';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useQuestionScroll } from '@/hooks/useQuestionScroll';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  autoAdvance?: boolean;
  hideTitle?: boolean;
  showQuestionImage?: boolean;
  isStrategicQuestion?: boolean;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = false,
  hideTitle = false,
  showQuestionImage = false,
  isStrategicQuestion = false,
  onNextClick,
  onPreviousClick
}) => {
  const isMobile = useIsMobile();
  const hasImageOptions = question.type !== 'text';
  const [imageError, setImageError] = useState(false);
  const { scrollToQuestion } = useQuestionScroll();

  useEffect(() => {
    scrollToQuestion(question.id);
  }, [question.id, scrollToQuestion]);

  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];

    // Se for questão estratégica, só permite uma seleção e não permite desmarcar
    if (isStrategicQuestion) {
      if (currentAnswers.includes(optionId)) {
        // Não permite desmarcar (mantém a seleção)
        newSelectedOptions = currentAnswers;
      } else {
        // Sempre só uma opção
        newSelectedOptions = [optionId];
      }
    } else {
      if (currentAnswers.includes(optionId)) {
        newSelectedOptions = currentAnswers.filter(id => id !== optionId);
      } else {
        if (question.multiSelect && currentAnswers.length >= question.multiSelect) {
          newSelectedOptions = [...currentAnswers.slice(1), optionId];
        } else {
          newSelectedOptions = [...currentAnswers, optionId];
        }
      }
    }

    onAnswer({ 
      questionId: question.id,
      selectedOptions: newSelectedOptions
    });
  };
  
  const getGridColumns = () => {
    if (question.type === 'text') {
      // Reduzido px-2 para px-1 no mobile para opções de texto
      return isMobile ? "grid-cols-1 gap-3 px-1" : "grid-cols-1 gap-4 px-4";
    }
    // Removido px-0.5 no mobile para opções de imagem
    return isMobile ? "grid-cols-2 gap-1" : "grid-cols-2 gap-3 px-2";
  };
  
  return (
    <div className={cn("w-full pb-4 relative", 
      isMobile && "px-2" 
    )} id={`question-${question.id}`}>
      {!hideTitle && (
        <>
          <h2 className={cn(
            "font-playfair text-center mb-6 px-3 pt-3 text-brand-coffee font-semibold tracking-normal",
            isMobile ? "text-lg" : "text-xl sm:text-2xl"
          )}>
            {highlightStrategicWords(question.title)}
          </h2>
          
          {question.imageUrl && !imageError && showQuestionImage && (
            <div className="w-full mb-6">
              <img 
                src={question.imageUrl} 
                alt="Question visual" 
                className="w-full max-w-md mx-auto rounded-lg shadow-sm object-cover h-48 sm:h-64" 
                onError={() => {
                  console.error(`Failed to load image: ${question.imageUrl}`);
                  setImageError(true);
                }}
              />
            </div>
          )}
        </>
      )}
      
      <div className={cn(
        "grid h-full",
        getGridColumns(),
        hasImageOptions && "mb-4 relative"
      )}>
        {question.options.map(option => (
          <QuizOption 
            key={option.id} 
            option={option} 
            isSelected={currentAnswers.includes(option.id)} 
            onSelect={handleOptionSelect}
            type={question.type}
            questionId={question.id}
            isDisabled={
              !currentAnswers.includes(option.id) && 
              currentAnswers.length >= question.multiSelect
            }
          />
        ))}
      </div>
    </div>
  );
};

export { QuizQuestion };
