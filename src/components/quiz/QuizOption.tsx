
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
        // Adicionar classe de animação com efeito mais suave
        setIsAnimating(true);
        element.style.transform = 'scale(1.01)';
        
        if (type === 'text') {
          element.style.borderColor = '#b29670';
          // Removido boxShadow das imagens - apenas bordas para texto
          element.style.boxShadow = isStrategicOption 
            ? '0 4px 12px rgba(178, 150, 112, 0.2), 0 0 0 2px rgba(178, 150, 112, 0.15)' 
            : '0 2px 8px rgba(178, 150, 112, 0.15), 0 0 0 1px rgba(178, 150, 112, 0.1)';
          element.style.backgroundColor = '#faf9f7';
        } else {
          element.style.borderColor = 'transparent';
          // Removido boxShadow para imagens
          element.style.boxShadow = 'none';
        }
        
        // Efeito de pulse mais suave
        setTimeout(() => {
          if (element) {
            element.style.transform = 'scale(1.005)';
          }
        }, 200);
        
        // Reset animação
        setTimeout(() => {
          setIsAnimating(false);
        }, 400);
        
      } else {
        element.style.transform = 'scale(1)';
        if (type === 'text') {
          element.style.borderColor = '#E5E7EB';
          element.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';
          element.style.backgroundColor = '#FEFEFE';
        } else {
          element.style.borderColor = 'transparent';
          // Removido boxShadow para imagens
          element.style.boxShadow = 'none';
        }
      }
    }
  }, [isSelected, type, isStrategicOption]);
  
  const handleClick = () => {
    if (!isDisabled) {
      if (isSelected && isStrategicOption) {
        return;
      }
      
      // Efeito de click mais suave
      if (optionRef.current) {
        const element = optionRef.current;
        element.style.transform = 'scale(0.995)';
        
        setTimeout(() => {
          if (element) {
            element.style.transform = isSelected ? 'scale(1)' : 'scale(1.005)';
          }
        }, 150);
      }
      
      setTimeout(() => {
        onSelect(option.id);
      }, 75);
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
          "relative h-full flex flex-col rounded-xl overflow-hidden transition-all duration-500 ease-out",
          
          type === 'text' && "p-4 border-2",
          type !== 'text' && "border-0",
          
          "bg-[#FEFEFE]",
          
          // Hover effects mais suaves - apenas se não estiver selecionado
          !isSelected && !isDisabled && "hover:-translate-y-0.5",
          
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
            
            {/* Overlay gradiente mais sutil para melhor legibilidade do texto */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/15 to-transparent h-10 pointer-events-none" />
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
                "leading-relaxed text-[#432818] transition-colors duration-300",
                isMobile ? "text-[0.9rem]" : "text-sm sm:text-base",
                isStrategicOption && "text-[1.1rem] sm:text-lg font-medium",
                isSelected && "text-[#2d1810]"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
        
        {/* Indicador de seleção melhorado com transição mais suave */}
        {isSelected && (
          <div className={cn(
            "absolute z-20 flex items-center justify-center transition-all duration-400 ease-out",
            isStrategicOption 
              ? "top-2 right-2 h-8 w-8 bg-[#b29670] rounded-full" 
              : "top-1 right-1 h-6 w-6 bg-[#b29670] rounded-full",
            "animate-in zoom-in-50 duration-300"
          )}>
            <Check
              className={cn(
                "text-white stroke-[3]",
                isStrategicOption ? "h-5 w-5" : "h-3.5 w-3.5"
              )}
            />
          </div>
        )}
        
        {/* Efeito de brilho mais suave ao selecionar */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 animate-shimmer pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export { QuizOption };
