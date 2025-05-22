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
  isStrategicQuestion?: boolean; // Nova prop
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = false,
  hideTitle = false,
  showQuestionImage = false,
  isStrategicQuestion = false
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
        return "grid-cols-1 gap-4 px-0 sm:px-2"; // Aumentado o gap para melhor espaçamento
      }
      return isMobile ? "grid-cols-1 gap-4 px-0 sm:px-2" : "grid-cols-1 gap-4 px-2 sm:px-3";
    }
    // Para opções com imagens, utilizamos gaps menores em desktop para melhor proporcionalidade
    return isMobile
      ? "grid-cols-2 gap-2 px-0" // Reduzido gap entre colunas em mobile para acomodar melhor as opções
      : "grid-cols-2 gap-4 px-0 sm:px-1 md:px-2"; // Reduzido gap entre colunas em desktop
  };
  
  return (
    <div className={cn("w-full max-w-[99%] md:max-w-3xl lg:max-w-4xl mx-auto pb-4 relative", // Reduzido padding bottom para melhor proporção
      isMobile && "px-0.5", // Padding mínimo para não tocar nas bordas da tela
      isStrategicQuestion && "max-w-[97%] md:max-w-2xl lg:max-w-2xl py-4 bg-gradient-to-b from-[#fffbf7] to-[#fff] border border-[#B89B7A]/20 rounded-xl shadow-sm" // Container mais leve para questões estratégicas em mobile
    )} id={`question-${question.id}`}>
      {!hideTitle && (
        <>
          {isStrategicQuestion && (
            <div className="text-center mb-2">
              <span className="inline-block px-3 py-1 bg-[#B89B7A] text-white text-xs font-medium rounded-full shadow-sm">
                ⭐ Questão Especial
              </span>
            </div>
          )}
          <h2 className={cn(
            "font-playfair text-center mb-5 px-1 sm:px-3 pt-3 text-brand-coffee font-semibold tracking-normal", 
            // Ajustados para melhor proporcionalidade em desktop e mais leves
            isStrategicQuestion 
              ? (isMobile ? "text-[1.2rem] leading-tight" : "text-xl sm:text-2xl md:text-2xl")
              : (isMobile ? "text-[1rem] leading-snug" : "text-lg sm:text-xl md:text-xl"),
            isStrategicQuestion && "text-[#432818] mb-6 font-medium whitespace-pre-line bg-[#f9f4ef] py-3 px-2 sm:px-3 rounded-lg shadow-sm border border-[#B89B7A]/20" // Visual mais leve
          )}>
            {highlightStrategicWords(question.title)}
          </h2>
          
          {isStrategicQuestion && question.imageUrl && !imageError && showQuestionImage && (
            <div className="w-full mb-6">
              <img 
                src={question.imageUrl} 
                alt="Question visual" 
                className="w-full max-w-[95%] md:max-w-sm mx-auto rounded-lg shadow-md border border-[#B89B7A]/20" // Reduzido para max-w-sm em desktop
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
        isStrategicQuestion && "gap-3 md:gap-5" // Reduzido gap em mobile para caber mais conteúdo
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

