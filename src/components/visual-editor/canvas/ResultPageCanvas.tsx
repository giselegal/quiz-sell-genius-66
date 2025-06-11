
import React from 'react';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { ResultPageBlockRenderer } from './ResultPageBlockRenderer';

interface ResultPageCanvasProps {
  blocks: ResultPageBlock[];
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  selectedBlockId: string | null;
  isPreviewMode: boolean;
  onBlockSelect: (blockId: string) => void;
  onBlockUpdate: (blockId: string, updates: Partial<ResultPageBlock>) => void;
  onBlockDelete: (blockId: string) => void;
}

export const ResultPageCanvas: React.FC<ResultPageCanvasProps> = ({
  blocks,
  primaryStyle,
  secondaryStyles,
  selectedBlockId,
  isPreviewMode,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete
}) => {
  // Ordenar blocos por ordem
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  if (sortedBlocks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-white m-4 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
          <p className="max-w-md">
            Arraste componentes da sidebar para começar a construir sua página de resultado
          </p>
          <div className="mt-4 text-sm text-gray-400">
            💡 Comece com o cabeçalho e depois adicione o resultado do estilo
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full">
      {sortedBlocks.map((block) => (
        <div key={block.id} className="relative">
          <ResultPageBlockRenderer
            block={block}
            primaryStyle={primaryStyle}
            secondaryStyles={secondaryStyles}
            isSelected={selectedBlockId === block.id}
            isPreviewMode={isPreviewMode}
            onSelect={() => onBlockSelect(block.id)}
            onClick={() => onBlockSelect(block.id)}
          />
        </div>
      ))}
    </div>
  );
};
