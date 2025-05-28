
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { QuizOptionImage } from './QuizOptionImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId?: string;
  isDisabled?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-all duration-300 ease-in-out transform", 
        !type.includes('text') && !isSelected && "hover:scale-[1.02]",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !isDisabled && onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative h-full flex flex-col",
          "transition-all duration-300 ease-out cursor-pointer", 
          type === 'text' && "p-4 rounded-lg border bg-white shadow-sm",
          type !== 'text' && "border border-[#B89B7A]/20 rounded-lg overflow-hidden",
          isSelected 
            ? type === 'text' 
              ? "border-brand-gold/60 bg-white shadow-lg ring-1 ring-brand-gold/30 transform scale-[1.01] transition-shadow duration-300 ease-in-out" 
              : "border-brand-gold/60 shadow-lg ring-1 ring-brand-gold/30 transform scale-[1.01] transition-shadow duration-300 ease-in-out"
            : type === 'text' 
              ? "border-[#B89B7A]/10 hover:border-brand-gold/40 hover:bg-white hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out" 
              : "hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 ease-in-out"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory}
            isSelected={isSelected}
            is3DQuestion={is3DQuestion}
            questionId={questionId || ''}
          />
        )}
        
        <p className={cn(
          "transition-all duration-300",
          type !== 'text' 
            ? cn(
                "leading-tight font-medium bg-transparent py-0 px-2 mt-auto text-brand-coffee relative", 
                isMobile ? "text-[0.7rem]" : "text-[0.7rem] sm:text-sm",
                isSelected && "font-semibold"
              )
            : cn(
                "leading-relaxed",
                isMobile ? "text-[0.75rem]" : "text-sm sm:text-base", // Standardized text size for text-only options
                isSelected && "text-brand-coffee font-semibold"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
      
      {isSelected && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-gold rounded-full flex items-center justify-center shadow-sm z-10 animate-scale-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export { QuizOption };

