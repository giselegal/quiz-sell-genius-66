import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lightbulb,
  Mouse,
  Move,
  Save,
  Undo,
  FolderOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position?: 'center' | 'left' | 'right';
  highlight?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao Editor Visual!',
    description: 'Este tutorial rápido vai te ensinar como criar páginas de resultado incríveis usando o sistema de arrastar e soltar.',
    icon: <Lightbulb className="h-6 w-6" />,
    position: 'center',
  },
  {
    id: 'components',
    title: 'Biblioteca de Componentes',
    description: 'Na lateral esquerda você encontra todos os componentes disponíveis. Arraste qualquer componente para a área de preview para adicioná-lo à sua página.',
    icon: <Mouse className="h-6 w-6" />,
    position: 'left',
    highlight: 'sidebar',
  },
  {
    id: 'drag-drop',
    title: 'Arrastar e Soltar',
    description: 'Clique e arraste componentes da biblioteca para a área central. Você também pode reordenar componentes já adicionados arrastando-os dentro da área de preview.',
    icon: <Move className="h-6 w-6" />,
    position: 'center',
  },
  {
    id: 'properties',
    title: 'Painel de Propriedades',
    description: 'Na lateral direita você pode editar as propriedades do componente selecionado. Clique em qualquer componente na área de preview para selecioná-lo.',
    icon: <Mouse className="h-6 w-6" />,
    position: 'right',
    highlight: 'properties',
  },
  {
    id: 'undo-redo',
    title: 'Desfazer e Refazer',
    description: 'Use os botões de desfazer (Ctrl+Z) e refazer (Ctrl+Y) na barra de ferramentas para reverter ou repetir ações. O histórico completo é mantido automaticamente.',
    icon: <Undo className="h-6 w-6" />,
    position: 'center',
    highlight: 'toolbar',
  },
  {
    id: 'save-load',
    title: 'Salvar e Carregar Projetos',
    description: 'Use o botão "Salvar" para criar um novo projeto ou salvar alterações. O botão "Carregar" permite abrir projetos salvos anteriormente. Há também auto-salvamento automático!',
    icon: <Save className="h-6 w-6" />,
    position: 'center',
    highlight: 'toolbar',
  },
  {
    id: 'project-management',
    title: 'Gerenciamento de Projetos',
    description: 'Você pode exportar, importar, duplicar e gerenciar múltiplos projetos. Todos os projetos são salvos localmente no seu navegador.',
    icon: <FolderOpen className="h-6 w-6" />,
    position: 'center',
  },
  {
    id: 'finish',
    title: 'Pronto para Começar!',
    description: 'Agora você está pronto para criar páginas de resultado incríveis! Lembre-se: você pode sempre reabrir este tutorial clicando no ícone de ajuda.',
    icon: <Lightbulb className="h-6 w-6" />,
    position: 'center',
  },
];

interface EditorTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const EditorTutorial: React.FC<EditorTutorialProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const current = tutorialSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isOpen) return;

    const timer = setTimeout(() => {
      if (isLastStep) {
        handleComplete();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStep, isAutoPlaying, isOpen, isLastStep]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-lg",
        current.position === 'left' && "mr-auto ml-4",
        current.position === 'right' && "ml-auto mr-4"
      )}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-[#D4B996]/10 rounded-lg text-[#D4B996]">
                {current.icon}
              </div>
              {current.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "bg-[#D4B996] w-8" 
                    : index < currentStep 
                      ? "bg-[#D4B996]/60 w-2" 
                      : "bg-gray-200 w-2"
                )}
              />
            ))}
          </div>

          {/* Current step info */}
          <div className="flex items-center gap-2 text-sm text-[#8F7A6A]">
            <Badge variant="outline">
              Passo {currentStep + 1} de {tutorialSteps.length}
            </Badge>
            {current.highlight && (
              <Badge variant="secondary" className="text-xs">
                Foco: {current.highlight}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-[#432818] leading-relaxed">
            {current.description}
          </p>

          {/* Auto-play toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoplay"
              checked={isAutoPlaying}
              onChange={(e) => setIsAutoPlaying(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="autoplay" className="text-sm text-[#8F7A6A]">
              Reprodução automática (5s por passo)
            </label>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-[#8F7A6A]"
              >
                Pular tutorial
              </Button>
              
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-[#D4B996] hover:bg-[#B89B7A] text-white flex items-center gap-2"
              >
                {isLastStep ? 'Finalizar' : 'Próximo'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hook for tutorial state management
export const useEditorTutorial = () => {
  const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
    try {
      return localStorage.getItem('editor-tutorial-completed') === 'true';
    } catch {
      return false;
    }
  });

  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const showTutorial = () => {
    setIsTutorialOpen(true);
  };

  const completeTutorial = () => {
    setHasSeenTutorial(true);
    setIsTutorialOpen(false);
    try {
      localStorage.setItem('editor-tutorial-completed', 'true');
    } catch {
      // Ignore localStorage errors
    }
  };

  const resetTutorial = () => {
    setHasSeenTutorial(false);
    try {
      localStorage.removeItem('editor-tutorial-completed');
    } catch {
      // Ignore localStorage errors
    }
  };

  // Show tutorial automatically for first-time users
  useEffect(() => {
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setIsTutorialOpen(true);
      }, 1000); // Show after 1 second

      return () => clearTimeout(timer);
    }
  }, [hasSeenTutorial]);

  return {
    hasSeenTutorial,
    isTutorialOpen,
    showTutorial,
    completeTutorial,
    resetTutorial,
    closeTutorial: () => setIsTutorialOpen(false),
  };
};
