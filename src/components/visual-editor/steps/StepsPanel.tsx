
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EditorStage {
  id: string;
  name: string;
  type: 'intro' | 'quiz' | 'transition' | 'result' | 'offer';
}

interface StepsPanelProps {
  stages: EditorStage[];
  currentStage: string;
  onStageSelect: (stageId: string) => void;
}

export const StepsPanel: React.FC<StepsPanelProps> = ({
  stages,
  currentStage,
  onStageSelect
}) => {
  return (
    <div className="h-full p-4">
      <h3 className="text-lg font-semibold mb-4">Etapas</h3>
      <div className="space-y-2">
        {stages.map((stage) => (
          <Button
            key={stage.id}
            variant={currentStage === stage.id ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => onStageSelect(stage.id)}
          >
            <div className="flex items-center justify-between w-full">
              <span>{stage.name}</span>
              <Badge variant="secondary" className="text-xs">
                {stage.type}
              </Badge>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
