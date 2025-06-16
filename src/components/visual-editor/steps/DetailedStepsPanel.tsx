
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronRight, 
  Play, 
  HelpCircle, 
  Target, 
  ArrowRight, 
  Trophy, 
  ShoppingCart,
  ChevronDown
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  type: 'intro' | 'quiz' | 'strategic' | 'transition' | 'result' | 'offer';
  subStages?: Array<{ id: string; name: string; index: number }>;
}

interface DetailedStepsPanelProps {
  stages: Stage[];
  currentStage: string;
  currentSubStageIndex?: number;
  onStageSelect: (stageId: string, subStageIndex?: number) => void;
  totalQuestions: number;
  totalStrategicQuestions: number;
}

export const DetailedStepsPanel: React.FC<DetailedStepsPanelProps> = ({
  stages,
  currentStage,
  currentSubStageIndex,
  onStageSelect,
  totalQuestions,
  totalStrategicQuestions
}) => {
  const [expandedStages, setExpandedStages] = React.useState<Set<string>>(
    new Set([currentStage])
  );

  const getStageIcon = (type: string) => {
    switch (type) {
      case 'intro': return <Play className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      case 'strategic': return <Target className="w-4 h-4" />;
      case 'transition': return <ArrowRight className="w-4 h-4" />;
      case 'result': return <Trophy className="w-4 h-4" />;
      case 'offer': return <ShoppingCart className="w-4 h-4" />;
      default: return <ChevronRight className="w-4 h-4" />;
    }
  };

  const getStageProgress = (stageId: string) => {
    if (stageId === 'quiz' && currentStage === 'quiz' && currentSubStageIndex !== undefined) {
      return `${currentSubStageIndex + 1}/${totalQuestions}`;
    }
    if (stageId === 'strategic' && currentStage === 'strategic' && currentSubStageIndex !== undefined) {
      return `${currentSubStageIndex + 1}/${totalStrategicQuestions}`;
    }
    return null;
  };

  const toggleStageExpansion = (stageId: string) => {
    const newExpanded = new Set(expandedStages);
    if (newExpanded.has(stageId)) {
      newExpanded.delete(stageId);
    } else {
      newExpanded.add(stageId);
    }
    setExpandedStages(newExpanded);
  };

  const isStageActive = (stageId: string) => currentStage === stageId;
  const isSubStageActive = (stageId: string, subStageIndex: number) => 
    currentStage === stageId && currentSubStageIndex === subStageIndex;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Etapas do Quiz</h2>
        <p className="text-sm text-gray-600 mt-1">
          Navegue pelas etapas e questões
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {stages.map((stage, index) => (
            <Card key={stage.id} className={`border transition-all ${
              isStageActive(stage.id) 
                ? 'border-blue-500 shadow-sm bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="p-3">
                <Button
                  variant="ghost"
                  className={`w-full justify-between h-auto p-0 ${
                    isStageActive(stage.id) ? 'text-blue-700' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    onStageSelect(stage.id);
                    if (stage.subStages) {
                      toggleStageExpansion(stage.id);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded ${
                      isStageActive(stage.id) ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {getStageIcon(stage.type)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{stage.name}</div>
                      {getStageProgress(stage.id) && (
                        <div className="text-xs text-gray-500">
                          {getStageProgress(stage.id)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    {stage.subStages && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        expandedStages.has(stage.id) ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </Button>

                {/* Sub-stages */}
                {stage.subStages && expandedStages.has(stage.id) && (
                  <div className="mt-3 ml-4 space-y-1">
                    {stage.subStages.map((subStage) => (
                      <Button
                        key={subStage.id}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-xs h-8 ${
                          isSubStageActive(stage.id, subStage.index)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => onStageSelect(stage.id, subStage.index)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            isSubStageActive(stage.id, subStage.index)
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`} />
                          {subStage.name}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <div className="flex justify-between items-center">
            <span>Total de questões:</span>
            <Badge variant="secondary">{totalQuestions + totalStrategicQuestions}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
