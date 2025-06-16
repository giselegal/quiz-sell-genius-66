
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useQuestionData } from '@/utils/supabaseQuestionMapper';
import { 
  Play, 
  HelpCircle, 
  RotateCcw, 
  Target, 
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  Plus,
  Settings
} from 'lucide-react';

interface DetailedStage {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'transition' | 'result' | 'offer';
  component: React.FC;
  order: number;
  subStages?: DetailedStage[];
}

interface DetailedStepsPanelProps {
  currentStage: string;
  onStageSelect: (stageId: string) => void;
  onAddQuestion?: () => void;
}

export const DetailedStepsPanel: React.FC<DetailedStepsPanelProps> = ({
  currentStage,
  onStageSelect,
  onAddQuestion
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['questions', 'strategic']));
  const { questions, strategicQuestions, loading } = useQuestionData();

  // Gerar stages dinamicamente baseado nos dados das questões
  const generateDetailedStages = (): DetailedStage[] => {
    const stages: DetailedStage[] = [
      {
        id: 'intro',
        name: 'Introdução',
        type: 'intro',
        component: () => <div>Intro</div>,
        order: 0
      }
    ];

    // Adicionar questões regulares
    if (questions.length > 0) {
      const questionSubStages = questions.map((question, index) => ({
        id: `q${question.id}`,
        name: question.title.length > 50 ? `${question.title.substring(0, 50)}...` : question.title,
        type: 'question' as const,
        component: () => <div>Q{question.id}</div>,
        order: index + 1
      }));

      stages.push({
        id: 'questions',
        name: 'Questões do Quiz',
        type: 'question',
        component: () => <div>Questions</div>,
        order: 1,
        subStages: questionSubStages
      });
    }

    // Adicionar questões estratégicas
    if (strategicQuestions.length > 0) {
      const strategicSubStages = strategicQuestions.map((question, index) => ({
        id: `strategic${index + 1}`,
        name: question.title.length > 50 ? `${question.title.substring(0, 50)}...` : question.title,
        type: 'question' as const,
        component: () => <div>S{index + 1}</div>,
        order: index + 1
      }));

      stages.push({
        id: 'strategic',
        name: 'Questões Estratégicas',
        type: 'question',
        component: () => <div>Strategic</div>,
        order: 2,
        subStages: strategicSubStages
      });
    }

    // Adicionar etapas finais
    stages.push(
      {
        id: 'transition',
        name: 'Transição',
        type: 'transition',
        component: () => <div>Transition</div>,
        order: 3
      },
      {
        id: 'result',
        name: 'Resultado',
        type: 'result',
        component: () => <div>Result</div>,
        order: 4
      },
      {
        id: 'offer',
        name: 'Página de Oferta',
        type: 'offer',
        component: () => <div>Offer</div>,
        order: 5
      }
    );

    return stages;
  };

  const detailedStages = generateDetailedStages();

  const getStageIcon = (type: string) => {
    switch (type) {
      case 'intro': return Play;
      case 'question': return HelpCircle;
      case 'transition': return RotateCcw;
      case 'result': return Target;
      case 'offer': return ShoppingBag;
      default: return Play;
    }
  };

  const getStageColor = (type: string) => {
    switch (type) {
      case 'intro': return 'bg-blue-500';
      case 'question': return 'bg-purple-500';
      case 'transition': return 'bg-yellow-500';
      case 'result': return 'bg-green-500';
      case 'offer': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const renderStageButton = (stage: DetailedStage, isSubStage = false) => {
    const Icon = getStageIcon(stage.type);
    const isActive = currentStage === stage.id;
    
    return (
      <Button
        key={stage.id}
        variant={isActive ? 'default' : 'ghost'}
        className={`w-full justify-start h-auto p-3 ${isSubStage ? 'ml-4' : ''} ${
          isActive 
            ? 'bg-[#B89B7A] hover:bg-[#8B7355] text-white' 
            : 'hover:bg-gray-100'
        }`}
        onClick={() => onStageSelect(stage.id)}
      >
        <div className="flex items-center gap-3 w-full">
          <div className={`p-1.5 rounded ${
            isActive 
              ? 'bg-white/20' 
              : `${getStageColor(stage.type)} text-white`
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">
                {isSubStage ? `${stage.order}. ` : ''}{stage.name}
              </span>
              {isActive && (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
            
            {!isSubStage && stage.subStages && (
              <div className="text-xs opacity-70 mt-0.5">
                {stage.subStages.length} questões
              </div>
            )}
          </div>
        </div>
      </Button>
    );
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-2">Etapas do Quiz</h2>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-2">Etapas do Quiz</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {detailedStages.reduce((acc, stage) => 
              acc + (stage.subStages ? stage.subStages.length : 1), 0
            )} etapas
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Quiz Completo
          </Badge>
        </div>
      </div>

      {/* Steps List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {detailedStages.map((stage) => {
            if (stage.subStages) {
              return (
                <Collapsible
                  key={stage.id}
                  open={expandedSections.has(stage.id)}
                  onOpenChange={() => toggleSection(stage.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center gap-2">
                          {expandedSections.has(stage.id) ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                          <div className={`p-1.5 rounded ${getStageColor(stage.type)} text-white`}>
                            <HelpCircle className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <div className="flex-1 text-left">
                          <span className="font-medium text-sm">{stage.name}</span>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {stage.subStages.length} questões
                          </div>
                        </div>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-1">
                    {stage.subStages.map((subStage) => renderStageButton(subStage, true))}
                    
                    {stage.id === 'questions' && (
                      <Button
                        variant="outline"
                        className="w-full ml-4 mt-2 justify-start h-auto p-2 text-sm border-dashed"
                        onClick={onAddQuestion}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Questão
                      </Button>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            
            return renderStageButton(stage);
          })}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="outline" className="w-full text-sm" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </Button>
        <div className="text-xs text-gray-500 text-center">
          Personalize cada etapa do seu quiz
        </div>
      </div>
    </div>
  );
};
