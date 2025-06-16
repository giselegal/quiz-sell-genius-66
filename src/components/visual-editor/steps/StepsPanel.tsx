
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepButton } from './StepButton';
import { StepType } from '@/hooks/useStepsManager';
import { Separator } from '@/components/ui/separator';

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

  // Organizar etapas por grupos
  const introSteps = steps.filter(step => step.type === 'quiz-intro');
  const questionSteps = steps.filter(step => step.type === 'quiz-question');
  const transition1Steps = steps.filter(step => step.type === 'quiz-transition' && step.id === 'step-transition-1');
  const strategicSteps = steps.filter(step => step.type === 'strategic-question');
  const transition2Steps = steps.filter(step => step.type === 'quiz-transition' && step.id === 'step-transition-2');
  const resultSteps = steps.filter(step => step.type === 'quiz-result');
  const offerSteps = steps.filter(step => step.type === 'offer-page');

  const renderStepGroup = (title: string, groupSteps: Step[], showSeparator = true) => {
    if (groupSteps.length === 0) return null;
    
    return (
      <div>
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {title}
          </h3>
        </div>
        
        <div className="space-y-1">
          {groupSteps
            .sort((a, b) => a.order - b.order)
            .map((step) => {
              const typeInfo = getStepTypeInfo(step.type);
              return (
                <StepButton
                  key={step.id}
                  id={step.id}
                  title={step.title}
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
        
        {showSeparator && <Separator className="my-3 bg-zinc-700" />}
      </div>
    );
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
        <div className="flex flex-col pb-20">
          {renderStepGroup('📋 Capa', introSteps)}
          {renderStepGroup('🎯 Questões (1-10)', questionSteps)}
          {renderStepGroup('⚡ Transição', transition1Steps)}
          {renderStepGroup('💭 Questões Estratégicas (1-7)', strategicSteps)}
          {renderStepGroup('⚡ Finalização', transition2Steps)}
          {renderStepGroup('🎉 Resultado', resultSteps)}
          {renderStepGroup('💰 Oferta', offerSteps, false)}
        </div>
      </ScrollArea>
    </div>
  );
};
