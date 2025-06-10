
import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Edit3 } from 'lucide-react';
import { VisualElement, VisualStage, BlockType } from '@/types/visualEditor';
import { StageTab } from './StageTab';
import { ElementRenderer } from './ElementRenderer';
import { ITEM_TYPES } from '@/hooks/useDragAndDrop';

interface VisualEditorCanvasProps {
  elements: VisualElement[];
  stages: VisualStage[];
  activeStageId: string | null;
  selectedElementId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onElementSelect: (id: string) => void;
  onElementUpdate: (id: string, updates: Partial<VisualElement>) => void;
  onElementDelete: (id: string) => void;
  onElementMove: (id: string, direction: 'up' | 'down') => void;
  onElementAdd: (type: BlockType, position?: number) => void;
  onStageAdd: () => void;
  onStageSelect: (stageId: string) => void;
}

export const VisualEditorCanvas: React.FC<VisualEditorCanvasProps> = ({
  elements,
  stages,
  activeStageId,
  selectedElementId,
  isPreviewMode,
  viewportMode,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onElementMove,
  onElementAdd,
  onStageAdd,
  onStageSelect
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const currentStageElements = elements
    .filter(el => el.stageId === activeStageId)
    .sort((a, b) => a.order - b.order);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPES.COMPONENT,
    drop: (item: { type: BlockType }, monitor) => {
      if (!monitor.didDrop()) {
        const position = draggedOverIndex ?? currentStageElements.length;
        onElementAdd(item.type, position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(canvasRef);

  const getViewportStyles = () => {
    switch (viewportMode) {
      case 'mobile':
        return { width: '375px', minHeight: '667px' };
      case 'tablet':
        return { width: '768px', minHeight: '1024px' };
      default:
        return { width: '100%', minHeight: '100vh' };
    }
  };

  return (
    <div className="flex-1 bg-gray-100 flex flex-col">
      {/* Stage Tabs */}
      {!isPreviewMode && (
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {stages.map(stage => (
            <StageTab
              key={stage.id}
              stage={stage}
              isActive={stage.id === activeStageId}
              onClick={() => onStageSelect(stage.id)}
            />
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onStageAdd}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Nova Etapa
          </Button>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="mx-auto" style={getViewportStyles()}>
          <div
            ref={canvasRef}
            className={`bg-white shadow-lg rounded-lg overflow-hidden relative min-h-[600px] ${
              !isPreviewMode && isOver && canDrop ? 'ring-2 ring-blue-300' : ''
            }`}
          >
            {/* Empty State */}
            {currentStageElements.length === 0 && !isPreviewMode && (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
                  <p className="text-sm mb-4">
                    Arraste componentes da biblioteca ou clique para adicionar
                  </p>
                  <Button onClick={() => onElementAdd('text')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Texto
                  </Button>
                </div>
              </div>
            )}

            {/* Elements */}
            <AnimatePresence>
              {currentStageElements.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => !isPreviewMode && setDraggedOverIndex(index)}
                  onMouseLeave={() => !isPreviewMode && setDraggedOverIndex(null)}
                >
                  {/* Drop Zone Indicator */}
                  {!isPreviewMode && draggedOverIndex === index && isOver && (
                    <div className="h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded mx-4 mb-2" />
                  )}

                  <ElementRenderer
                    element={element}
                    isSelected={selectedElementId === element.id}
                    isPreviewMode={isPreviewMode}
                    onSelect={() => onElementSelect(element.id)}
                    onUpdate={(updates) => onElementUpdate(element.id, updates)}
                    onDelete={() => onElementDelete(element.id)}
                    onMoveUp={() => onElementMove(element.id, 'up')}
                    onMoveDown={() => onElementMove(element.id, 'down')}
                    canMoveUp={index > 0}
                    canMoveDown={index < currentStageElements.length - 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Final Drop Zone */}
            {!isPreviewMode && currentStageElements.length > 0 && draggedOverIndex === currentStageElements.length && isOver && (
              <div className="h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded mx-4 mt-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
