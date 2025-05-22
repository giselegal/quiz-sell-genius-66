import React from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { Check } from 'lucide-react';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  type: string;
  questionId: string;
  isDisabled?: boolean;
  forStrategic?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  forStrategic = false
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  const isImageOption = type !== 'text' && option.imageUrl;

  // Usar React.useEffect para aplicar a animação diretamente nos elementos estratégicos
  React.useEffect(() => {
    // Só aplicar para questões estratégicas selecionadas
    if (isSelected && forStrategic) {
      // Selecionar os elementos por atributos data-* para maior precisão
      const elements = document.querySelectorAll(`[data-strategic="${questionId}-${option.id}"]`);
      elements.forEach(el => {
        // Adicionar classes de animação manualmente
        el.classList.add('pulse-element');
      });
    }
  }, [isSelected, forStrategic, questionId, option.id]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        // Efeitos para opções com imagem
        isImageOption && isSelected && !forStrategic && "shadow-2xl", 
        isImageOption && isSelected && forStrategic && "shadow-2xl strategic-element",
        isImageOption && !isSelected && !isDisabled && "hover:shadow-lg",

        // Efeitos para opções apenas de texto
        !isImageOption && isSelected && !forStrategic && "shadow-xl transform scale-[1.01] border border-[#B89B7A]/40",
        !isImageOption && isSelected && forStrategic && "shadow-2xl shadow-[#FFD700]/30 strategic-element transform scale-[1.01] border border-[#B89B7A]/40",
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40 hover:shadow-md",

        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
      data-strategic={forStrategic ? `${questionId}-${option.id}` : ""}
    >
      {type !== 'text' && option.imageUrl && (
        <div className="w-full flex-1 flex items-stretch min-h-[220px] p-0 relative gap-2">
          <img
            src={option.imageUrl}
            alt={option.text}
            className={cn(
              "w-full h-[260px] object-cover rounded-t-lg transition-all duration-200",
              // Aumentar z-index e escala quando selecionado para sobressair ao texto
              isSelected && "scale-[1.04] shadow-2xl z-[60]",
              !isSelected && "hover:scale-[1.02] hover:shadow-lg z-10"
            )}
            style={{ maxHeight: '260px', minHeight: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
          <div className={cn(
            "absolute bottom-0 left-0 w-full bg-white/80 px-2 py-1 rounded-b-lg flex items-center justify-center transition-all duration-200 z-[50]",
            // Diminuir opacidade quando selecionado para destacar a imagem
            isSelected && "opacity-85"
          )}>
            <span className="text-[10px] text-[#432818] text-center font-medium leading-tight">
              {option.text}
            </span>
          </div>
        </div>
      )}

      {(!option.imageUrl || type === 'text') && (
        <div className="flex-1 p-3 text-[#432818] relative bg-white transition-shadow duration-200">
          <span className="block w-full text-base sm:text-lg font-semibold text-[#432818] text-center break-words leading-tight">
            {option.text}
          </span>
        </div>
      )}

      {/* Check posicionado NO FIM do componente para garantir que está acima de tudo */}
      {isSelected && (
        <div 
          className={cn(
            "absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white",
            forStrategic ? "bg-[#FFD700]" : "bg-[#B89B7A]"
          )}
          style={{ 
            zIndex: 9999,
            pointerEvents: "none",
            // Aplicar animação diretamente via inline style para questões estratégicas
            ...(forStrategic ? {
              animation: "2s infinite alternate both running strategic-pulse, 1.5s infinite alternate both running strategic-glow",
              boxShadow: "0 0 8px 2px rgba(255, 215, 0, 0.6)"
            } : {})
          }}
          data-strategic={forStrategic ? `${questionId}-${option.id}` : ""}
        >
          <Check className="w-3 h-3 stroke-2" />
        </div>
      )}

      {/* Definir animações em style global para garantir que sejam carregadas */}
      <style jsx global>{`
        /* Animação de pulsação mais intensa e visível */
        @keyframes strategic-pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.3); }
        }
        
        /* Animação de brilho dourado intensificada */
        @keyframes strategic-glow {
          0% { box-shadow: 0 0 4px 2px rgba(255, 215, 0, 0.6); }
          100% { box-shadow: 0 0 16px 4px rgba(255, 215, 0, 0.8); }
        }
        
        /* Estilos para o container principal quando for estratégico */
        div[data-strategic]:not([data-strategic=""]) {
          box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.3) !important;
          animation: container-pulse 3s infinite alternate ease-in-out !important;
        }
        
        /* Animação suave para o container */
        @keyframes container-pulse {
          0% { box-shadow: 0 0 15px 2px rgba(255, 215, 0, 0.2); }
          100% { box-shadow: 0 0 25px 8px rgba(255, 215, 0, 0.4); }
        }
      `}</style>
      
      {/* Adicionar um script para forçar reflow e garantir que as animações funcionem */}
      {forStrategic && isSelected && (
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Forçar repaint para garantir que as animações sejam aplicadas
              setTimeout(() => {
                const strategicElements = document.querySelectorAll('[data-strategic="${questionId}-${option.id}"]');
                strategicElements.forEach(el => {
                  el.style.animationName = 'none';
                  void el.offsetWidth; // Trigger reflow
                  el.style.animationName = '';
                });
              }, 50);
            })();
          `
        }} />
      )}
    </div>
  );
};

export default QuizOption;
