import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';

interface StyleResultBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const StyleResultBlock: React.FC<StyleResultBlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.styleResult || {};

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <Card className="bg-white shadow-sm p-6 mb-6">
        <div className="text-center space-y-6">
          <div 
            className="inline-block px-6 py-3 rounded-full text-xl font-semibold"
            style={{ 
              backgroundColor: tokens.colors.primary,
              color: 'white'
            }}
          >
            {primaryStyle.category}
          </div>
          
          <p className="text-lg" style={{ color: tokens.colors.textSecondary }}>
            {content.description || `Você tem ${primaryStyle.percentage}% de compatibilidade com o estilo ${primaryStyle.category}.`}
          </p>

          {content.showSecondaryStyles && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4" style={{ color: tokens.colors.text }}>
                Seus estilos secundários
              </h3>
              <div className="space-y-2">
                {/* Placeholder for secondary styles */}
                <div className="text-sm text-gray-600">
                  Os estilos secundários serão exibidos aqui
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
