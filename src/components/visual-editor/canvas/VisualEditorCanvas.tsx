
import React, { useRef, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { ElementRenderer } from './ElementRenderer';
import { VisualElement, VisualStage, BlockType } from '@/types/visualEditor';
import { Edit3 } from 'lucide-react';

interface VisualEditorCanvasProps {
  elements: VisualElement[];
  stages: VisualStage[];
  activeStageId: string | null;
  selectedElementId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onElementDelete: (elementId: string) => void;
  onElementMove: (elementId: string, direction: 'up' | 'down') => void;
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

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'component',
    drop: (item: { type: BlockType }, monitor) => {
      if (!monitor.didDrop()) {
        const position = draggedOverIndex ?? stageElements.length;
        onElementAdd(item.type, position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(canvasRef);

  // Filter elements for the active stage
  const stageElements = elements.filter(el => el.stageId === activeStageId);
  const activeStage = stages.find(stage => stage.id === activeStageId);

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
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      {/* Stage Header */}
      {activeStage && !isPreviewMode && (
        <div className="mb-4 bg-white rounded-lg p-3 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900">{activeStage.title}</h2>
          <p className="text-sm text-gray-500">
            {stageElements.length} componente{stageElements.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="mx-auto" style={getViewportStyles()}>
        <div
          ref={canvasRef}
          className={`
            bg-white shadow-lg rounded-lg overflow-hidden relative
            ${!isPreviewMode && isOver && canDrop ? 'ring-2 ring-blue-300' : ''}
          `}
          style={{ minHeight: '600px' }}
        >
          {/* Empty State */}
          {stageElements.length === 0 && !isPreviewMode && (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
                <p className="text-sm">
                  {activeStage ? 
                    `Adicione componentes à etapa "${activeStage.title}"` : 
                    'Selecione uma etapa para começar a editar'
                  }
                </p>
              </div>
            </div>
          )}

          {/* No Stage Selected */}
          {!activeStageId && !isPreviewMode && (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhuma Etapa Selecionada</h3>
                <p className="text-sm">
                  Selecione uma etapa na barra lateral para começar a editar
                </p>
              </div>
            </div>
          )}

          {/* Elements */}
          {stageElements.length > 0 && (
            <AnimatePresence>
              {stageElements
                .sort((a, b) => a.order - b.order)
                .map((element, index) => (
                  <motion.div
                    key={element.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setDraggedOverIndex(index)}
                    onMouseLeave={() => setDraggedOverIndex(null)}
                  >
                    {/* Drop Zone Indicator */}
                    {!isPreviewMode && draggedOverIndex === index && isOver && (
                      <div className="h-0.5 bg-blue-500 mx-4 mb-2" />
                    )}

                    <ElementRenderer
                      element={element}
                      isSelected={selectedElementId === element.id}
                      isPreviewMode={isPreviewMode}
                      onSelect={() => onElementSelect(element.id)}
                      onUpdate={(updates) => onElementUpdate(element.id, updates)}
                      onDelete={() => onElementDelete(element.id)}
                      onMoveUp={index > 0 ? () => onElementMove(element.id, 'up') : undefined}
                      onMoveDown={index < stageElements.length - 1 ? () => onElementMove(element.id, 'down') : undefined}
                      canMoveUp={index > 0}
                      canMoveDown={index < stageElements.length - 1}
                    />

                    {/* Bottom Drop Zone */}
                    {!isPreviewMode && draggedOverIndex === index + 1 && isOver && (
                      <div className="h-0.5 bg-blue-500 mx-4 mt-2" />
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          )}

          {/* Final Drop Zone */}
          {!isPreviewMode && stageElements.length > 0 && draggedOverIndex === stageElements.length && isOver && (
            <div className="h-0.5 bg-blue-500 mx-4 mt-4" />
          )}
        </div>
      </div>
    </div>
  );
};
