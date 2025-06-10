
import React from 'react';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { HeaderBlock } from '../blocks/HeaderBlock';
import { StyleResultBlock } from '../blocks/StyleResultBlock';
import { CTABlock } from '../blocks/CTABlock';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3 } from 'lucide-react';

interface ResultPageBuilderCanvasProps {
  blocks: ResultPageBlock[];
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  selectedBlockId: string | null;
  isPreviewMode: boolean;
  onSelectBlock: (blockId: string | null) => void;
  onUpdateBlock: (blockId: string, updates: Partial<ResultPageBlock>) => void;
  onDeleteBlock: (blockId: string) => void;
  onMoveBlock: (blockId: string, direction: 'up' | 'down') => void;
}

export const ResultPageBuilderCanvas: React.FC<ResultPageBuilderCanvasProps> = ({
  blocks,
  primaryStyle,
  secondaryStyles,
  selectedBlockId,
  isPreviewMode,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock
}) => {
  const sortedBlocks = blocks.filter(block => block.visible).sort((a, b) => a.order - b.order);

  const renderBlock = (block: ResultPageBlock) => {
    const isSelected = selectedBlockId === block.id;
    const commonProps = {
      block,
      isSelected,
      isPreviewMode,
      onSelect: () => onSelectBlock(block.id),
      primaryStyle,
      secondaryStyles
    };

    switch (block.type) {
      case 'header':
        return <HeaderBlock {...commonProps} />;
      case 'styleResult':
        return <StyleResultBlock {...commonProps} />;
      case 'cta':
        return <CTABlock {...commonProps} />;
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-center">
              Componente {block.type} não implementado ainda
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      <div className="mx-auto max-w-5xl">
        <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden relative"
          style={{ minHeight: '600px' }}
        >
          {/* Empty State */}
          {sortedBlocks.length === 0 && !isPreviewMode && (
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
            <div className="container mx-auto px-4 sm:px-6 py-8 relative z-10">
              <AnimatePresence>
                {sortedBlocks.map((block) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    {/* Block Controls */}
                    {!isPreviewMode && selectedBlockId === block.id && (
                      <div className="absolute -top-2 -right-2 flex gap-1 z-20 bg-white rounded-lg shadow-lg p-1">
                        <button
                          onClick={() => onMoveBlock(block.id, 'up')}
                          className="p-1 text-gray-600 hover:text-blue-600 text-xs"
                          disabled={block.order === 0}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => onMoveBlock(block.id, 'down')}
                          className="p-1 text-gray-600 hover:text-blue-600 text-xs"
                          disabled={block.order === sortedBlocks.length - 1}
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => onDeleteBlock(block.id)}
                          className="p-1 text-gray-600 hover:text-red-600 text-xs"
                        >
                          🗑
                        </button>
                      </div>
                    )}

                    {renderBlock(block)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
