import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerticalCanvasHeader } from "./VerticalCanvasHeader";
import { VerticalCanvasItem } from "./VerticalCanvasItem";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";

interface CanvasElement {
  id: string;
  type:
    | "headline"
    | "text"
    | "image"
    | "form"
    | "button"
    | "question-title"
    | "question-options";
  content: any;
  order: number;
}

interface EditableCanvasProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  onElementSelect: (id: string) => void;
  onElementUpdate: (id: string, content: any) => void;
  onElementAdd: (type: string, position?: number) => void;
  onElementReorder: (draggedId: string, targetId: string) => void;
  onElementDelete: (id: string) => void;
}

const CanvasContent: React.FC<EditableCanvasProps> = ({
  elements,
  selectedElementId,
  isPreviewMode,
  onElementSelect,
  onElementUpdate,
  onElementAdd,
  onElementReorder,
  onElementDelete,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "component",
    drop: (item: { type: string }, monitor) => {
      if (!monitor.didDrop()) {
        onElementAdd(item.type, elements.length);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onElementReorder(active.id as string, over.id as string);
    }
  };

  const sortedElements = [...elements].sort((a, b) => a.order - b.order);

  return (
    <div
      ref={drop}
      className={`relative w-full overflow-auto z-10 ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <ScrollArea className="h-full w-full">
        <div className="group relative main-content w-full min-h-full mx-auto">
          <div className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 md:p-5 pb-10">
            {/* Header fixo */}
            <div className="grid gap-4 opacity-100">
              <VerticalCanvasHeader />
            </div>

            {/* Conteúdo editável */}
            <div className="main-content w-full relative mx-auto h-full">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sortedElements.map((el) => el.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-4 pb-10">
                    {sortedElements.length === 0 && !isPreviewMode ? (
                      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 mb-2">Canvas vazio</p>
                        <p className="text-sm text-gray-400">
                          Arraste componentes da paleta para começar
                        </p>
                      </div>
                    ) : (
                      sortedElements.map((element) => (
                        <VerticalCanvasItem
                          key={element.id}
                          element={element}
                          isSelected={selectedElementId === element.id}
                          isPreviewMode={isPreviewMode}
                          onSelect={() => onElementSelect(element.id)}
                          onUpdate={(content) =>
                            onElementUpdate(element.id, content)
                          }
                          onDelete={() => onElementDelete(element.id)}
                        />
                      ))
                    )}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            <div className="pt-10 md:pt-24"></div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export const EditableCanvas: React.FC<EditableCanvasProps> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <CanvasContent {...props} />
    </DndProvider>
  );
};
