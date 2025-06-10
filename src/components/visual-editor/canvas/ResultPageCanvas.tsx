
import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultPageElementRenderer } from './ResultPageElementRenderer';
import { ResultPageBlock, ResultPageBlockType } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Edit3 } from 'lucide-react';

interface ResultPageCanvasProps {
  blocks: ResultPageBlock[];
  primaryStyle: StyleResult;
  selectedBlockId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onSelectBlock: (blockId: string) => void;
  onUpdateBlock: (blockId: string, updates: any) => void;
  onDeleteBlock: (blockId: string) => void;
  onMoveBlock: (blockId: string, direction: 'up' | 'down') => void;
  onAddBlock: (type: ResultPageBlockType, position?: number) => void;
}

export const ResultPageCanvas: React.FC<ResultPageCanvasProps> = ({
  blocks,
  primaryStyle,
  selectedBlockId,
  isPreviewMode,
  viewportMode,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
  onAddBlock
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'component',
    drop: (item: { type: ResultPageBlockType }, monitor) => {
      if (!monitor.didDrop()) {
        const position = draggedOverIndex ?? blocks.length;
        onAddBlock(item.type, position);
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

  const sortedBlocks = blocks.sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
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
          {blocks.length === 0 && !isPreviewMode && (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Página de Resultado Vazia</h3>
                <p className="text-sm">
                  Adicione componentes da sidebar para começar a construir sua página de resultado
                </p>
              </div>
            </div>
          )}

          {/* Blocks */}
          {sortedBlocks.length > 0 && (
            <AnimatePresence>
              {sortedBlocks.map((block, index) => (
                <motion.div
                  key={block.id}
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

                  <ResultPageElementRenderer
                    block={block}
                    primaryStyle={primaryStyle}
                    isSelected={selectedBlockId === block.id}
                    isPreviewMode={isPreviewMode}
                    onSelect={() => onSelectBlock(block.id)}
                    onUpdate={(updates) => onUpdateBlock(block.id, updates)}
                    onDelete={() => onDeleteBlock(block.id)}
                    onMoveUp={index > 0 ? () => onMoveBlock(block.id, 'up') : undefined}
                    onMoveDown={index < sortedBlocks.length - 1 ? () => onMoveBlock(block.id, 'down') : undefined}
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
          {!isPreviewMode && sortedBlocks.length > 0 && draggedOverIndex === sortedBlocks.length && isOver && (
            <div className="h-0.5 bg-blue-500 mx-4 mt-4" />
          )}
        </div>
      </div>
    </div>
  );
};
