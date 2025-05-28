
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { QuizStage } from '@/types/quizBuilder';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface StageListProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageAdd: (type: QuizStage['type']) => string;
  onStageSelect: (id: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
  onStageMove: (sourceId: string, targetId: string) => void;
}

export const StageList: React.FC<StageListProps> = ({
  stages,
  activeStageId,
  onStageAdd,
  onStageSelect,
  onStageUpdate,
  onStageDelete,
  onStageMove,
}) => {
  const handleTitleChange = (id: string, title: string) => {
    onStageUpdate(id, { title });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceId = stages[result.source.index].id;
    const destinationId = stages[result.destination.index].id;
    
    if (sourceId !== destinationId) {
      onStageMove(sourceId, destinationId);
    }
  };

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stages">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {sortedStages.map((stage, index) => (
                <Draggable key={stage.id} draggableId={stage.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 ${stage.id === activeStageId ? 'border-[#B89B7A] bg-[#FAF9F7]' : ''} ${
                        snapshot.isDragging ? 'shadow-md' : ''
                      }`}
                      onClick={() => onStageSelect(stage.id)}
                    >
                      <div className="flex items-center justify-between">
                        <Input
                          value={stage.title}
                          onChange={(e) => handleTitleChange(stage.id, e.target.value)}
                          className="flex-1 mr-2"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onStageDelete(stage.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onStageAdd('question')}
        >
          <Plus className="h-4 w-4 mr-2" /> Pergunta
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onStageAdd('result')}
        >
          <Plus className="h-4 w-4 mr-2" /> Resultado
        </Button>
      </div>
    </div>
  );
};
