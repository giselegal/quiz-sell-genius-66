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
            forStrategic ? "bg-[#B89B7A]" : "bg-[#B89B7A]" // Cor dourada da identidade visual
          )}
          style={{ 
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <Check className="w-3 h-3 stroke-2" />
        </div>
      )}

      {/* Overlay para "botão" em opções estratégicas */}
      {forStrategic && (
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            "border-2 rounded-lg transition-all duration-300",
            isSelected 
              ? "border-[#B89B7A] shadow-[0_0_15px_rgba(184,155,122,0.5)]" 
              : "border-[#B89B7A]/40 hover:border-[#B89B7A]/60"
          )}
          style={{ zIndex: 50 }}
        />
      )}

      {/* Efeito de seleção pulsante para questões estratégicas */}
      {forStrategic && isSelected && (
        <div 
          className="absolute inset-0 pointer-events-none z-[45] strategic-pulse-effect rounded-lg"
          style={{ 
            background: 'radial-gradient(circle, rgba(184,155,122,0.1) 0%, rgba(255,255,255,0) 70%)'
          }}
        />
      )}

      {/* Definir animações em style global para garantir que sejam carregadas */}
      <style jsx global>{`
        /* Efeito pulsante para as questões estratégicas */
        @keyframes strategic-pulse-animation {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .strategic-pulse-effect {
          animation: strategic-pulse-animation 2s infinite ease-in-out;
        }
        
        /* Efeito de borda para questões estratégicas selecionadas */
        div[data-strategic]:not([data-strategic=""]):where(.border-[#B89B7A]) {
          box-shadow: 0 0 0 2px #B89B7A, 0 0 20px 5px rgba(184, 155, 122, 0.3) !important;
          transition: all 0.3s ease-in-out !important;
        }
        
        /* Estilo de "botão" para opções estratégicas */
        div[data-strategic]:not([data-strategic=""]):hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(184, 155, 122, 0.2);
        }
        
        /* Destaque adicional quando selecionado */
        div[data-strategic]:not([data-strategic=""]):where(:has(> div[class*="bg-[#B89B7A]"])) {
          background-color: rgba(184, 155, 122, 0.05);
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
