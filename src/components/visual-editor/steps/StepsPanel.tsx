
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  HelpCircle, 
  RotateCcw, 
  Target, 
  ShoppingBag,
  ChevronRight 
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  component: React.FC;
}

interface StepsPanelProps {
  stages: Stage[];
  currentStage: string;
  onStageSelect: (stageId: string) => void;
}

export const StepsPanel: React.FC<StepsPanelProps> = ({
  stages,
  currentStage,
  onStageSelect
}) => {
  const getStageIcon = (stageId: string) => {
    switch (stageId) {
      case 'intro':
        return Play;
      case 'quiz':
        return HelpCircle;
      case 'transition':
        return RotateCcw;
      case 'result':
        return Target;
      case 'offer':
        return ShoppingBag;
      default:
        return Play;
    }
  };

  const getStageStatus = (stageId: string) => {
    const currentIndex = stages.findIndex(s => s.id === currentStage);
    const stageIndex = stages.findIndex(s => s.id === stageId);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-2">Etapas do Funil</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {stages.length} etapas
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Quiz Completo
          </Badge>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-1">
          {stages.map((stage, index) => {
            const Icon = getStageIcon(stage.id);
            const status = getStageStatus(stage.id);
            const isActive = currentStage === stage.id;
            
            return (
              <Button
                key={stage.id}
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start h-auto p-3 ${
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
                      : status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {index + 1}. {stage.name}
                      </span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                    
                    <div className="text-xs opacity-70 mt-0.5">
                      {status === 'completed' && 'Concluída'}
                      {status === 'active' && 'Em edição'}
                      {status === 'pending' && 'Pendente'}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="outline" className="w-full text-sm" size="sm">
          + Adicionar Etapa
        </Button>
        <div className="text-xs text-gray-500 text-center">
          Personalize o fluxo do seu quiz
        </div>
      </div>
    </div>
  );
};
