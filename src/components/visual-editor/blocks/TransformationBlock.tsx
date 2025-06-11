
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';

interface TransformationBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const TransformationBlock: React.FC<TransformationBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { transformation } = block.content;

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: tokens.colors.backgroundCard,
        borderColor: tokens.colors.border 
      }}
    >
      <div className="text-center space-y-4">
        <h3 
          className="text-2xl font-playfair font-bold"
          style={{ color: tokens.colors.secondary }}
        >
          {transformation?.title || 'Transformações Reais'}
        </h3>
        
        <p style={{ color: tokens.colors.textSecondary }}>
          {transformation?.description || 'Veja como outras mulheres transformaram seu estilo com o mesmo guia que você está prestes a receber.'}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <span className="text-gray-400 text-sm">Antes/Depois {index}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
