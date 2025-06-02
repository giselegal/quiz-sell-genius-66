
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
  isStrategicOption?: boolean;
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
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (optionRef.current) {
      const element = optionRef.current;
      
      if (isSelected) {
        // Adicionar classe de animação
        setIsAnimating(true);
        element.style.transform = 'scale(1.02)';
        
        if (type === 'text') {
          element.style.borderColor = '#b29670';
          // Sombra reduzida para opções de texto selecionadas
          element.style.boxShadow = isStrategicOption 
            ? '0 4px 12px rgba(178, 150, 112, 0.2), 0 0 0 2px rgba(178, 150, 112, 0.2)' 
            : '0 2px 8px rgba(178, 150, 112, 0.15), 0 0 0 1px rgba(178, 150, 112, 0.15)';
          element.style.backgroundColor = '#faf9f7';
        } else {
          element.style.borderColor = 'transparent';
          // REMOVIDA A SOMBRA para opções com imagem
          element.style.boxShadow = 'none';
        }
        
        // Efeito de pulse suave
        setTimeout(() => {
          if (element) {
            element.style.transform = 'scale(1.01)';
          }
        }, 150);
        
        // Reset animação
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
        
      } else {
        element.style.transform = 'scale(1)';
        if (type === 'text') {
          element.style.borderColor = '#E5E7EB';
          element.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.03)'; // Sombra muito sutil
          element.style.backgroundColor = '#FEFEFE';
        } else {
          element.style.borderColor = 'transparent';
          element.style.boxShadow = 'none'; // REMOVIDA A SOMBRA
        }
      }
    }
  }, [isSelected, type, isStrategicOption]);
  
  const handleClick = () => {
    if (!isDisabled) {
      if (isSelected && isStrategicOption) {
        return;
      }
      
      // Efeito de click imediato
      if (optionRef.current) {
        const element = optionRef.current;
        element.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          if (element) {
            element.style.transform = isSelected ? 'scale(1)' : 'scale(1.02)';
          }
        }, 100);
      }
      
      setTimeout(() => {
        onSelect(option.id);
      }, 50);
    }
  };
  
  return (
    <div 
      className={cn(
        "relative h-full group",
        isDisabled && isStrategicOption ? "opacity-45 cursor-not-allowed" : 
        (isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")
      )}
      onClick={handleClick}
    >
      <div 
        ref={optionRef}
        className={cn(
          "relative h-full flex flex-col rounded-xl overflow-hidden transition-all duration-300 ease-out",
          
          type === 'text' && "p-4 border-2",
          type !== 'text' && "border-0",
          
          "bg-[#FEFEFE]", // Removida a classe shadow-sm
          
          // Hover effects apenas se não estiver selecionado - SEM SOMBRAS
          !isSelected && !isDisabled && "hover:-translate-y-1",
          
          // Efeitos de animação
          isAnimating && "animate-pulse",
          
          // Estados especiais
          isStrategicOption && "strategic-option",
          isSelected && "selected-option"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <div className="relative overflow-hidden flex-grow">
            <QuizOptionImage
              imageUrl={option.imageUrl}
              altText={option.text}
              styleCategory={option.styleCategory}
              isSelected={isSelected}
              is3DQuestion={is3DQuestion}
              questionId={questionId || ''}
            />
            
            {/* Overlay gradiente para melhor legibilidade do texto */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-12 pointer-events-none" />
          </div>
        )}
        
        <p className={cn(
          type !== 'text' 
            ? cn(
                "leading-tight font-medium py-2 px-3 mt-auto text-[#432818] relative z-10", 
                isMobile ? "text-[0.8rem]" : "text-[0.75rem] sm:text-sm",
                isStrategicOption && "text-[0.9rem] sm:text-base font-semibold"
              )
            : cn(
                "leading-relaxed text-[#432818] transition-colors duration-200",
                isMobile ? "text-[0.9rem]" : "text-sm sm:text-base",
                isStrategicOption && "text-[1.1rem] sm:text-lg font-medium",
                isSelected && "text-[#2d1810]"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
        
        {/* Indicador de seleção melhorado */}
        {isSelected && (
          <div className={cn(
            "absolute z-20 flex items-center justify-center transition-all duration-300 ease-out",
            isStrategicOption 
              ? "top-2 right-2 h-8 w-8 bg-[#b29670] rounded-full" // Removida shadow-lg
              : "top-1 right-1 h-6 w-6 bg-[#b29670] rounded-full", // Removida shadow-md
            "animate-in zoom-in-50 duration-200"
          )}>
            <Check
              className={cn(
                "text-white stroke-[3]",
                isStrategicOption ? "h-5 w-5" : "h-3.5 w-3.5"
              )}
            />
          </div>
        )}
        
        {/* Efeito de brilho ao selecionar */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 animate-shimmer pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export { QuizOption };
