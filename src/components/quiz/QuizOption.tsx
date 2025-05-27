"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { QuizOptionImage } from './QuizOptionImage';
import { useIsMobile } from '@/hooks/use-mobile';
import { Check } from 'lucide-react';
interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId?: string;
  isDisabled?: boolean;
  isStrategicOption?: boolean; // Nova prop
}
const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  isStrategicOption = false
}) => {
  const isMobile = useIsMobile();
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (optionRef.current) {
      // Adicionar classe de transição
      optionRef.current.style.transition = 'all 300ms ease-in-out';
      
      if (isSelected) {
        if (type === 'text') {
          optionRef.current.style.borderColor = '#b29670';
          optionRef.current.style.boxShadow = isStrategicOption 
            ? '0 6px 12px rgba(178, 150, 112, 0.4)'
            : '0 4px 8px rgba(178, 150, 112, 0.25)';
          if (isStrategicOption) {
            optionRef.current.style.backgroundColor = '#faf6f1';
            optionRef.current.style.transform = 'translateY(-2px)';
          }
        } else {
          optionRef.current.style.borderColor = 'transparent';
          optionRef.current.style.boxShadow = isStrategicOption
            ? '0 15px 30px rgba(0, 0, 0, 0.25)'
            : '0 12px 24px rgba(0, 0, 0, 0.2)';
        }
      } else {
        optionRef.current.style.borderColor = '#B89B7A';
        optionRef.current.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        if (isStrategicOption) {
          optionRef.current.style.backgroundColor = '#FEFEFE';
          optionRef.current.style.transform = 'translateY(0)';
        }
      }
    }
  }, [isSelected, type, isStrategicOption]);

  const handleClick = () => {
    if (!isDisabled) {
      if (isSelected && isStrategicOption) {
        return;
      }
      onSelect(option.id);
    }
  };

  return (
    <div
      className={cn(
        "relative h-full",
        isDisabled && isStrategicOption ? "opacity-45 cursor-not-allowed transition-opacity duration-300" :
        (isDisabled ? "opacity-50 cursor-not-allowed" : "")
      )}
      onClick={handleClick}
    >
      <div
        ref={optionRef}
        className={cn(
          "relative h-full flex flex-col rounded-lg overflow-hidden quiz-option",
          "cursor-pointer",
          type === 'text' && "p-4 border",
          type !== 'text' && "border-0",
          "bg-[#FEFEFE] shadow-sm hover:shadow-md transition-all duration-300",
          isSelected && "selected"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory || ''}
            isSelected={isSelected}
            is3DQuestion={!!is3DQuestion}
            questionId={questionId || ''}
          />
        )}
        <p className={cn(
          type !== 'text'
            ? cn(
                "leading-tight font-medium py-1 px-2 mt-auto text-[#432818] relative",
                isMobile ? "text-[0.8rem]" : "text-[0.7rem] sm:text-sm",
                isStrategicOption && "text-[0.95rem] sm:text-base"
              )
            : cn(
                "leading-relaxed text-[#432818]",
                isMobile ? "text-[0.9rem]" : "text-sm sm:text-base",
                isStrategicOption && "text-[1.1rem] sm:text-lg",
                !isStrategicOption && ".text-only-question & " && "text-[1rem] sm:text-lg"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
        {isSelected && (
          isStrategicOption ? (
            <div className="absolute -top-1 -right-1 h-7 w-7 bg-[#b29670] rounded-full flex items-center justify-center shadow-lg">
              <Check className="h-5 w-5 text-white" strokeWidth={3} />
            </div>
          ) : (
            <Check className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[#b29670]" strokeWidth={3} />
          )
        )}
      </div>
    </div>
  );
};

export { QuizOption };
