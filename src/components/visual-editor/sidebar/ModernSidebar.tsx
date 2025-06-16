
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Layout, 
  Type, 
  Image, 
  MousePointer, 
  FileImage,
  Minus,
  Sparkles,
  User,
  ArrowRight,
  Star,
  Gift,
  DollarSign,
  Zap,
  BarChart3,
  CheckCircle,
  Heart
} from 'lucide-react';

interface ModernSidebarProps {
  onAddElement: (type: string) => void;
  activeStepType?: string;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({
  onAddElement,
  activeStepType
}) => {
  const brandElements = [
    { type: 'brand-header', label: 'Header da Marca', icon: Layout },
    { type: 'brand-logo', label: 'Logo', icon: FileImage },
    { type: 'brand-divider', label: 'Divisor Dourado', icon: Minus },
  ];

  const quizIntroElements = [
    { type: 'quiz-hero-title', label: 'Título Principal', icon: Type },
    { type: 'quiz-hero-image', label: 'Imagem Hero', icon: Image },
    { type: 'quiz-description', label: 'Descrição', icon: Type },
    { type: 'quiz-form', label: 'Formulário Completo', icon: Layout },
    { type: 'quiz-input', label: 'Campo de Nome', icon: User },
    { type: 'quiz-button', label: 'Botão CTA', icon: MousePointer },
  ];

  const questionElements = [
    { type: 'question-header', label: 'Cabeçalho', icon: Layout },
    { type: 'progress-bar', label: 'Barra de Progresso', icon: BarChart3 },
    { type: 'question-title', label: 'Título da Questão', icon: Type },
    { type: 'question-options-grid', label: 'Grid de Opções', icon: Layout },
    { type: 'question-option-card', label: 'Card de Opção', icon: MousePointer },
  ];

  const strategicQuestionElements = [
    { type: 'question-header', label: 'Cabeçalho', icon: Layout },
    { type: 'progress-bar', label: 'Barra de Progresso', icon: BarChart3 },
    { type: 'question-title', label: 'Título da Questão', icon: Type },
    { type: 'question-option-card', label: 'Opção de Texto', icon: MousePointer },
  ];

  const transitionElements = [
    { type: 'transition-hero', label: 'Hero de Transição', icon: Sparkles },
    { type: 'transition-continue', label: 'Botão Continuar', icon: ArrowRight },
  ];

  const resultElements = [
    { type: 'result-hero', label: 'Hero do Resultado', icon: Sparkles },
    { type: 'result-title', label: 'Título do Estilo', icon: Star },
    { type: 'result-subtitle', label: 'Descrição do Estilo', icon: Type },
    { type: 'offer-section', label: 'Seção de Oferta', icon: Gift },
  ];

  const offerElements = [
    { type: 'offer-section', label: 'Seção de Benefícios', icon: Gift },
    { type: 'price-highlight', label: 'Preço em Destaque', icon: DollarSign },
    { type: 'cta-button', label: 'Botão de Compra', icon: Zap },
  ];

  const getElementsForStep = () => {
    switch (activeStepType) {
      case 'quiz-intro':
        return [...brandElements, ...quizIntroElements];
      case 'quiz-question':
        return [...brandElements, ...questionElements];
      case 'strategic-question':
        return [...brandElements, ...strategicQuestionElements];
      case 'quiz-transition':
        return [...brandElements, ...transitionElements];
      case 'quiz-result':
        return [...brandElements, ...resultElements];
      case 'offer-page':
        return [...brandElements, ...offerElements];
      default:
        return [...brandElements, ...quizIntroElements];
    }
  };

  const renderElementGroup = (title: string, elements: Array<{ type: string; label: string; icon: any }>) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid gap-2">
        {elements.map((element) => {
          const Icon = element.icon;
          return (
            <Button
              key={element.type}
              variant="outline"
              className="justify-start h-auto p-3 text-left hover:bg-[#FAF9F7] hover:border-[#B89B7A] transition-colors group"
              onClick={() => onAddElement(element.type)}
            >
              <Icon className="h-4 w-4 mr-3 text-[#8F7A6A] group-hover:text-[#B89B7A] transition-colors" />
              <span className="text-sm">{element.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (activeStepType) {
      case 'quiz-intro':
        return 'Capa do Quiz';
      case 'quiz-question':
        return 'Questão Normal';
      case 'strategic-question':
        return 'Questão Estratégica';
      case 'quiz-transition':
        return 'Página de Transição';
      case 'quiz-result':
        return 'Página de Resultado';
      case 'offer-page':
        return 'Página de Oferta';
      default:
        return 'Componentes';
    }
  };

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-900">Componentes</h2>
        {activeStepType && (
          <p className="text-sm text-gray-600 mt-1">
            {getStepTitle()}
          </p>
        )}
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {activeStepType === 'quiz-intro' && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Quiz Intro', quizIntroElements)}
            </>
          )}
          
          {activeStepType === 'quiz-question' && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Questão', questionElements)}
            </>
          )}
          
          {activeStepType === 'strategic-question' && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Questão Estratégica', strategicQuestionElements)}
            </>
          )}
          
          {activeStepType === 'quiz-transition' && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Transição', transitionElements)}
            </>
          )}
          
          {activeStepType === 'quiz-result' && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Resultado', resultElements)}
            </>
          )}
          
          {activeStepType === 'offer-page' && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Oferta', offerElements)}
            </>
          )}
          
          {!activeStepType && (
            <>
              {renderElementGroup('Marca', brandElements)}
              <Separator />
              {renderElementGroup('Quiz Intro', quizIntroElements)}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
