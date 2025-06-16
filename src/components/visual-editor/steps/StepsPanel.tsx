
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StepButton } from './StepButton';
import { useToast } from '@/hooks/use-toast';

interface Step {
  id: string;
  title: string;
  type: 'quiz' | 'result' | 'offer';
  order: number;
}

interface StepsPanelProps {
  steps: Step[];
  activeStepId: string | null;
  onStepSelect: (stepId: string) => void;
  onStepAdd: () => void;
  onStepEdit: (stepId: string) => void;
  onStepDelete: (stepId: string) => void;
  onStepDuplicate: (stepId: string) => void;
  onStepReorder: (stepId: string, newOrder: number) => void;
}

export const StepsPanel: React.FC<StepsPanelProps> = ({
  steps,
  activeStepId,
  onStepSelect,
  onStepAdd,
  onStepEdit,
  onStepDelete,
  onStepDuplicate,
  onStepReorder
}) => {
  const { toast } = useToast();

  const handleStepAdd = () => {
    onStepAdd();
    toast({
      title: "Nova etapa adicionada",
      description: "Uma nova etapa foi criada no funil.",
    });
  };

  const handleStepDelete = (stepId: string) => {
    if (steps.length <= 1) {
      toast({
        title: "Não é possível excluir",
        description: "O funil deve ter pelo menos uma etapa.",
        variant: "destructive"
      });
      return;
    }
    
    onStepDelete(stepId);
    toast({
      title: "Etapa excluída",
      description: "A etapa foi removida do funil.",
    });
  };

  const handleStepDuplicate = (stepId: string) => {
    onStepDuplicate(stepId);
    toast({
      title: "Etapa duplicada",
      description: "Uma cópia da etapa foi criada.",
    });
  };

  return (
    <div className="w-full min-h-[3rem] relative border-b overflow-auto md:max-w-[13rem] border-r bg-zinc-900">
      <ScrollArea className="relative overflow-hidden flex md:grid h-full">
        <div className="flex flex-col">
          {steps
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <StepButton
                key={step.id}
                id={step.id}
                title={step.title}
                isActive={activeStepId === step.id}
                onSelect={onStepSelect}
                onEdit={onStepEdit}
                onDelete={handleStepDelete}
                onDuplicate={handleStepDuplicate}
              />
            ))}
          
          {/* Add step button */}
          <div className="grid md:p-1 relative">
            <Button
              variant="ghost"
              className="justify-start text-zinc-100 hover:bg-zinc-700 hover:text-white"
              onClick={handleStepAdd}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Etapa
            </Button>
          </div>
          
          {/* Bottom padding */}
          <div className="py-10" />
        </div>
      </ScrollArea>
    </div>
  );
};
