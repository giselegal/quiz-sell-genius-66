import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { QuizStage } from "@/types/quizBuilder";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface StageListProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageAdd: (type: QuizStage["type"]) => string;
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
    <div className="h-full flex flex-col space-y-4">
      {/* Lista de etapas com barra de rolagem */}
      <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="stages">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {sortedStages.map((stage, index) => (
                  <Draggable
                    key={stage.id}
                    draggableId={stage.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                          stage.id === activeStageId
                            ? "border-[#B89B7A] bg-[#FAF9F7] shadow-sm scale-[1.02]"
                            : "hover:border-[#B89B7A]/50"
                        } ${
                          snapshot.isDragging
                            ? "shadow-lg scale-105 rotate-1"
                            : ""
                        }`}
                        onClick={() => onStageSelect(stage.id)}
                      >
                        <div className="flex items-center justify-between">
                          <Input
                            value={stage.title}
                            onChange={(e) =>
                              handleTitleChange(stage.id, e.target.value)
                            }
                            className="flex-1 mr-2 text-sm border-none bg-transparent focus:border-[#B89B7A] transition-all duration-200"
                            style={{ focus: { backgroundColor: "#FEFEFE" } }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-full transition-all duration-200"
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
      </div>

      {/* Botões de adicionar etapas */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
          onClick={() => onStageAdd("question")}
        >
          <Plus className="h-4 w-4 mr-2" /> Pergunta
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
          onClick={() => onStageAdd("result")}
        >
          <Plus className="h-4 w-4 mr-2" /> Resultado
        </Button>
      </div>
    </div>
  );
};
