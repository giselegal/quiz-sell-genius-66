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
  isStrategicOption = false // Padrão para false
}) => {
  const isMobile = useIsMobile();
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');
  // Usar ref para evitar re-renderizações desnecessárias
  const optionRef = useRef<HTMLDivElement>(null);
  
  // Usar useEffect para lidar com mudanças de isSelected sem causar flash
  useEffect(() => {
    if (optionRef.current) {
      if (isSelected) {
        // Para opções de texto - manter borda amarela
        if (type === 'text') {
          optionRef.current.style.borderColor = '#b29670';
          optionRef.current.style.boxShadow = isStrategicOption 
            ? '0 10px 20px rgba(178, 150, 112, 0.6)' // Sombra mais pronunciada para estratégicas
            : '0 4px 8px rgba(178, 150, 112, 0.25)';
          
          if (isStrategicOption) {
            // Destacar mais as opções estratégicas selecionadas
            optionRef.current.style.backgroundColor = '#faf6f1';
            optionRef.current.style.transform = 'translateY(-4px)'; // Efeito de elevação aumentado
            // Adicionar borda inferior extra para enfatizar seleção
            optionRef.current.style.borderBottom = '4px solid #b29670';
          }
        } 
        // Para opções de imagem - sem borda, apenas sombra
        else {
          optionRef.current.style.borderColor = 'transparent';
          optionRef.current.style.boxShadow = isStrategicOption 
            ? '0 18px 35px rgba(0, 0, 0, 0.30)' // Sombra mais pronunciada para estratégicas
            : '0 12px 24px rgba(0, 0, 0, 0.2)';
        }
      } else {
        if (type === 'text') {
          optionRef.current.style.borderColor = isStrategicOption ? '#B89B7A' : '#E0D5C5';
          optionRef.current.style.boxShadow = isStrategicOption 
            ? '0 4px 8px rgba(0, 0, 0, 0.1)' 
            : '0 2px 4px rgba(0, 0, 0, 0.05)';
          
          if (isStrategicOption) {
            // Resetar estilo para opções estratégicas não selecionadas
            optionRef.current.style.backgroundColor = '#FEFEFE';
            optionRef.current.style.transform = 'translateY(0)';
          }
        } else {
          optionRef.current.style.borderColor = 'transparent';
          optionRef.current.style.boxShadow = isStrategicOption 
            ? '0 6px 12px rgba(0, 0, 0, 0.15)' 
            : '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
      }
    }
  }, [isSelected, type, isStrategicOption]);
  
  // Manipulador de clique customizado com debounce
  const handleClick = () => {
    if (!isDisabled) {
      // Se já está selecionado e é uma questão estratégica, não permitimos desmarcar
      if (isSelected && isStrategicOption) {
        return; // Impede desmarcar a opção em questões estratégicas
      }
      
      // Aplicar mudança visual imediatamente para feedback instantâneo
      if (optionRef.current) {
        if (type === 'text') {
          optionRef.current.style.borderColor = isSelected ? '#B89B7A' : '#b29670';
          
          // Efeito visual adicional para opções estratégicas
          if (isStrategicOption && !isSelected) {
            optionRef.current.style.backgroundColor = '#faf6f1';
            optionRef.current.style.transform = 'translateY(-2px)';
          }
        }
        
        // Aplicar sombra correspondente ao estado
        optionRef.current.style.boxShadow = isSelected 
          ? '0 2px 4px rgba(0, 0, 0, 0.05)' 
          : (isStrategicOption 
              ? (type === 'text' ? '0 6px 12px rgba(178, 150, 112, 0.4)' : '0 15px 30px rgba(0, 0, 0, 0.25)') 
              : (type === 'text' ? '0 4px 8px rgba(178, 150, 112, 0.25)' : '0 12px 24px rgba(0, 0, 0, 0.2)'));
      }
      
      // Chamar onSelect com um pequeno atraso para evitar flash
      setTimeout(() => {
        onSelect(option.id);
      }, 10);
    }
  };
  
  return (
    <div 
      className={cn(
        "relative h-full w-full", // Largura total dentro da coluna
        isDisabled && isStrategicOption ? "opacity-40 cursor-not-allowed transition-opacity duration-300" : 
        (isDisabled ? "opacity-50 cursor-not-allowed" : "")
      )}
      onClick={handleClick}
    >
      {/* Conteúdo principal com ref para manipulação direta do DOM */}
      <div 
        ref={optionRef}
        className={cn(
          "relative h-full flex flex-col rounded-lg overflow-hidden w-full", // Largura total
          "cursor-pointer", 
          
          // Para opções estratégicas, adicionamos estilo mais elaborado
          isStrategicOption && type === 'text' && "p-5 sm:p-6 md:p-6 border-2 !px-6 sm:!px-6", // Reduzido padding para desktop
          
          // Para opções estratégicas de imagem, ajuste para melhor visualização
          isStrategicOption && type !== 'text' && "pb-3 w-full",
          
          // Para opções normais de imagem, aumentar largura
          type !== 'text' && "w-full",
          
          // Para opções de texto - manter borda e ajustar padding horizontal para desktop
          !isStrategicOption && type === 'text' && "p-4 sm:p-4 md:p-5 !px-6 sm:!px-5 border",
          
          // Para opções de imagem - SEM borda na coluna
          type !== 'text' && "border-0",
          
          // Fundo sólido sem transparência e adicionando sombra padrão
          "bg-[#FEFEFE] shadow-sm hover:shadow-md transition-all duration-300",
          
          // Adicionar uma borda extra para opções estratégicas não selecionadas
          isStrategicOption && !isSelected && "border-[#B89B7A]"
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
          type !== 'text' 
            ? cn(
                "leading-tight font-medium py-2 px-2 mt-auto text-[#432818] relative", 
                isMobile ? "text-[0.95rem]" : "text-base" // Tamanho ajustado para opções de imagem
              )
            : cn(
                "leading-relaxed text-[#432818]",
                // Ajustes para proporcionalidade em desktop
                isMobile 
                  ? (isStrategicOption ? "text-[1.25rem] font-medium !leading-tight" : "text-[1.1rem] !leading-snug") 
                  : (isStrategicOption ? "text-base sm:text-lg font-medium" : "text-sm sm:text-base")
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>            {/* Indicador de seleção - check com círculo para questões estratégicas */}
        {isSelected && (
          isStrategicOption ? (
            <div className="absolute -top-2 -right-2 h-7 w-7 sm:h-8 sm:w-8 bg-[#b29670] rounded-full flex items-center justify-center shadow-lg">
              <Check
                className="h-5 w-5 sm:h-5 sm:w-5 text-white"
                strokeWidth={3}
              />
            </div>
          ) : (
            <Check
              className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[#b29670]"
              strokeWidth={3}
            />
          )
        )}
        
        {/* Indicador visual adicional para questões estratégicas */}
        {isStrategicOption && !isSelected && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-[#f9f4ef] border-2 border-[#b29670] rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export { QuizOption };
