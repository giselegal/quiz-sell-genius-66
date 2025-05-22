
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
    
    if (currentAnswers.includes(optionId)) {
      // Para questões estratégicas, não permitimos desmarcar a única opção selecionada
      if (isStrategicQuestion) {
        return; // Não permite desmarcar a opção em questões estratégicas
      }
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (isStrategicQuestion) {
        // Para questões estratégicas, substituímos qualquer seleção anterior
        newSelectedOptions = [optionId];
      } else if (question.multiSelect && currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({ 
      questionId: question.id,
      selectedOptions: newSelectedOptions
    });
  };
  
  const getGridColumns = () => {
    if (question.type === 'text') {
      if (isStrategicQuestion) {
        return "grid-cols-1 gap-4 px-2";
      }
      return isMobile ? "grid-cols-1 gap-3 px-2" : "grid-cols-1 gap-4 px-4";
    }
    return isMobile ? "grid-cols-2 gap-1 px-0.5" : "grid-cols-2 gap-3 px-2";
  };
  
  return (
    <div className={cn("w-full pb-4 relative", 
      isMobile && "px-2", 
      isStrategicQuestion && "strategic-question",
      question.type === 'text' && !isStrategicQuestion && "text-only-question"
    )} id={`question-${question.id}`}>
      {!hideTitle && (
        <>
          <h2 className={cn(
            "font-playfair text-center mb-6 px-3 pt-3 text-brand-coffee font-semibold tracking-normal",
            isMobile ? "text-lg" : "text-xl sm:text-2xl",
            isStrategicQuestion && "text-[#432818] mb-6 font-bold",
            isStrategicQuestion && isMobile && "text-[1.25rem] sm:text-2xl"
          )}>
            {highlightStrategicWords(question.title)}
          </h2>
          
          {isStrategicQuestion && question.imageUrl && !imageError && showQuestionImage && (
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
        hasImageOptions && "mb-4 relative",
        isStrategicQuestion && "gap-4"
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
              (isStrategicQuestion && currentAnswers.length > 0 && !currentAnswers.includes(option.id)) || 
              (!isStrategicQuestion && !currentAnswers.includes(option.id) && 
                currentAnswers.length >= question.multiSelect)
            }
            isStrategicOption={isStrategicQuestion}
          />
        ))}
      </div>
    </div>
  );
};

export { QuizQuestion };
