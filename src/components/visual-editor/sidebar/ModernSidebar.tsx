
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  Video, 
  MousePointer, 
  Layout,
  Minus,
  MessageSquare,
  Star,
  Target,
  ShoppingBag,
  CreditCard,
  Shield,
  BarChart3
} from 'lucide-react';
import { StepType } from '@/hooks/useStepsManager';

interface ModernSidebarProps {
  onAddElement: (type: string) => void;
  activeStepType?: StepType;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ 
  onAddElement,
  activeStepType 
}) => {
  const getComponentsForStepType = (stepType?: StepType) => {
    const commonComponents = [
      { type: 'heading', label: 'Título', icon: Type },
      { type: 'text', label: 'Texto', icon: Type },
      { type: 'image', label: 'Imagem', icon: Image },
      { type: 'video', label: 'Vídeo', icon: Video },
      { type: 'button', label: 'Botão', icon: MousePointer },
      { type: 'spacer', label: 'Espaçador', icon: Minus },
    ];

    switch (stepType) {
      case 'quiz':
        return [
          { type: 'header', label: 'Cabeçalho', icon: Layout },
          { type: 'quiz-header', label: 'Título do Quiz', icon: Type },
          { type: 'quiz-question', label: 'Pergunta', icon: MessageSquare },
          { type: 'terms', label: 'Termos', icon: Type },
          ...commonComponents
        ];
        
      case 'result':
        return [
          { type: 'header', label: 'Cabeçalho', icon: Layout },
          { type: 'result-display', label: 'Resultado', icon: Target },
          { type: 'marquee', label: 'Depoimentos', icon: Star },
          ...commonComponents
        ];
        
      case 'offer':
        return [
          { type: 'header', label: 'Cabeçalho', icon: Layout },
          { type: 'offer-hero', label: 'Oferta Principal', icon: ShoppingBag },
          { type: 'pricing', label: 'Preços', icon: CreditCard },
          { type: 'guarantee', label: 'Garantia', icon: Shield },
          { type: 'testimonials', label: 'Depoimentos', icon: Star },
          ...commonComponents
        ];
        
      default:
        return [
          { type: 'header', label: 'Cabeçalho', icon: Layout },
          { type: 'terms', label: 'Termos', icon: Type },
          { type: 'marquee', label: 'Marquee', icon: BarChart3 },
          ...commonComponents
        ];
    }
  };

  const components = getComponentsForStepType(activeStepType);

  const getStepTypeLabel = (stepType?: StepType) => {
    switch (stepType) {
      case 'quiz': return 'Quiz';
      case 'result': return 'Resultado';
      case 'offer': return 'Oferta';
      default: return 'Geral';
    }
  };

  return (
    <div className="h-full border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Componentes</h2>
        {activeStepType && (
          <p className="text-sm text-gray-600 mt-1">
            {getStepTypeLabel(activeStepType)}
          </p>
        )}
      </div>
      
      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="p-4 space-y-2">
          {components.map((component) => {
            const Icon = component.icon;
            return (
              <Button
                key={component.type}
                variant="outline"
                className="w-full justify-start h-12 text-left"
                onClick={() => onAddElement(component.type)}
              >
                <Icon className="mr-3 h-4 w-4 text-gray-500" />
                <span className="text-sm">{component.label}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
