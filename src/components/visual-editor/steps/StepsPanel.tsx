
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface EditorStage {
  id: string;
  name: string;
  type: 'intro' | 'quiz' | 'strategic' | 'transition' | 'result' | 'offer';
}

interface StepsPanelProps {
  stages: EditorStage[];
  currentStage: string;
  onStageSelect: (stageId: string) => void;
}

const getStageTypeColor = (type: string) => {
  switch (type) {
    case 'intro':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'quiz':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'strategic':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'transition':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'result':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'offer':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStageTypeIcon = (type: string) => {
  switch (type) {
    case 'intro':
      return '🏠';
    case 'quiz':
      return '❓';
    case 'strategic':
      return '🎯';
    case 'transition':
      return '🔄';
    case 'result':
      return '📊';
    case 'offer':
      return '💎';
    default:
      return '📄';
  }
};

export const StepsPanel: React.FC<StepsPanelProps> = ({
  stages,
  currentStage,
  onStageSelect
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Etapas do Quiz
        </h3>
        <p className="text-sm text-gray-500">
          {stages.length} etapa{stages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 px-2">
        <div className="p-2 space-y-3">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={cn(
                'group relative transition-all duration-200 ease-in-out',
                currentStage === stage.id ? 'transform scale-[1.02]' : 'hover:transform hover:scale-[1.01]'
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  'w-full h-auto p-0 rounded-xl border-2 transition-all duration-200',
                  currentStage === stage.id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                    : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                )}
                onClick={() => onStageSelect(stage.id)}
              >
                <div className="w-full p-4">
                  {/* Stage Number & Icon */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      currentStage === stage.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    )}>
                      {index + 1}
                    </div>
                    <span className="text-lg">
                      {getStageTypeIcon(stage.type)}
                    </span>
                  </div>

                  {/* Stage Name */}
                  <div className="text-left mb-3">
                    <h4 className={cn(
                      'font-medium text-sm leading-tight',
                      currentStage === stage.id
                        ? 'text-blue-900'
                        : 'text-gray-900 group-hover:text-gray-700'
                    )}>
                      {stage.name}
                    </h4>
                  </div>

                  {/* Stage Type Badge */}
                  <div className="flex justify-end">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        getStageTypeColor(stage.type)
                      )}
                    >
                      {stage.type}
                    </Badge>
                  </div>
                </div>

                {/* Active Indicator */}
                {currentStage === stage.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                )}
              </Button>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="absolute left-8 bottom-0 w-px h-3 bg-gray-200 transform translate-y-full" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="text-xs text-gray-500 text-center">
          {currentStage ? (
            <span>
              Editando: <span className="font-medium text-gray-700">
                {stages.find(s => s.id === currentStage)?.name || 'Etapa'}
              </span>
            </span>
          ) : (
            'Selecione uma etapa para editar'
          )}
        </div>
      </div>
    </div>
  );
};
