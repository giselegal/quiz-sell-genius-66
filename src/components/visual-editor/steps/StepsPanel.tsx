
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepButton } from './StepButton';
import { StepType } from '@/hooks/useStepsManager';

interface Step {
  id: string;
  title: string;
  type: StepType;
  order: number;
  questionData?: any;
}

interface StepsPanelProps {
  steps: Step[];
  activeStepId: string | null;
  onStepSelect: (stepId: string) => void;
  onStepAdd: (type: StepType) => void;
  onStepEdit: (stepId: string) => void;
  onStepDelete: (stepId: string) => void;
  onStepDuplicate: (stepId: string) => void;
  onStepReorder: (stepId: string, newOrder: number) => void;
  getStepTypeInfo: (type: StepType) => any;
}

export const StepsPanel: React.FC<StepsPanelProps> = ({
  steps,
  activeStepId,
  onStepSelect,
  onStepEdit,
  onStepDelete,
  onStepDuplicate,
  getStepTypeInfo
}) => {
  const handleStepDelete = (stepId: string) => {
    if (steps.length <= 1) {
      return;
    }
    onStepDelete(stepId);
  };

  const handleStepDuplicate = (stepId: string) => {
    onStepDuplicate(stepId);
  };

  return (
    <div className="w-full min-h-[3rem] relative border-b overflow-auto md:max-w-[16rem] border-r bg-zinc-900">
      <div className="p-3 border-b border-zinc-700">
        <h2 className="text-sm font-semibold text-zinc-100">Etapas do Quiz</h2>
        <p className="text-xs text-zinc-400 mt-1">
          {steps.length} etapas • Quiz Completo
        </p>
      </div>
      
      <ScrollArea className="relative overflow-hidden flex md:grid h-full">
        <div className="flex flex-col">
          {steps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => {
              const typeInfo = getStepTypeInfo(step.type);
              const stepNumber = index + 1;
              
              return (
                <StepButton
                  key={step.id}
                  id={step.id}
                  title={`Etapa ${stepNumber}`}
                  type={step.type}
                  icon={typeInfo.icon}
                  color={typeInfo.color}
                  isActive={activeStepId === step.id}
                  onSelect={onStepSelect}
                  onEdit={onStepEdit}
                  onDelete={handleStepDelete}
                  onDuplicate={handleStepDuplicate}
                />
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
};
