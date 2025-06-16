
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import { StepButton } from './StepButton';
import { useToast } from '@/hooks/use-toast';
import { StepType } from '@/hooks/useStepsManager';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Step {
  id: string;
  title: string;
  type: StepType;
  order: number;
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
  onStepAdd,
  onStepEdit,
  onStepDelete,
  onStepDuplicate,
  onStepReorder,
  getStepTypeInfo
}) => {
  const { toast } = useToast();

  const handleStepAdd = (type: StepType) => {
    onStepAdd(type);
    const typeInfo = getStepTypeInfo(type);
    toast({
      title: `Nova etapa de ${typeInfo.label} adicionada`,
      description: `Uma nova etapa de ${typeInfo.label.toLowerCase()} foi criada no funil.`,
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

  const stepTypes = [
    { type: 'quiz' as StepType, label: 'Quiz', icon: '❓' },
    { type: 'result' as StepType, label: 'Resultado', icon: '🎯' },
    { type: 'offer' as StepType, label: 'Oferta', icon: '💰' },
  ];

  return (
    <div className="w-full min-h-[3rem] relative border-b overflow-auto md:max-w-[13rem] border-r bg-zinc-900">
      <ScrollArea className="relative overflow-hidden flex md:grid h-full">
        <div className="flex flex-col">
          {steps
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
          
          {/* Add step dropdown button */}
          <div className="grid md:p-1 relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-zinc-100 hover:bg-zinc-700 hover:text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Etapa
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700">
                {stepTypes.map((stepType) => (
                  <DropdownMenuItem
                    key={stepType.type}
                    onClick={() => handleStepAdd(stepType.type)}
                    className="text-zinc-100 hover:bg-zinc-700 cursor-pointer"
                  >
                    <span className="mr-2">{stepType.icon}</span>
                    {stepType.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Bottom padding */}
          <div className="py-10" />
        </div>
      </ScrollArea>
    </div>
  );
};
