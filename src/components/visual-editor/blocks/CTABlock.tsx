
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';

interface CTABlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const CTABlock: React.FC<CTABlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.cta || {};

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg p-8 mb-6">
        <div className="text-center space-y-6">
          <h2 
            className="text-3xl font-playfair font-bold"
            style={{ color: tokens.colors.text }}
          >
            {content.title || 'Transforme Seu Estilo Hoje'}
          </h2>
          
          <p 
            className="text-xl"
            style={{ color: tokens.colors.textSecondary }}
          >
            {content.subtitle || 'Guia Completo + Bônus Exclusivos'}
          </p>

          <div className="flex items-center justify-center gap-4">
            {content.regularPrice && (
              <span 
                className="text-lg line-through"
                style={{ color: tokens.colors.textMuted }}
              >
                {content.regularPrice}
              </span>
            )}
            <span 
              className="text-3xl font-bold"
              style={{ color: tokens.colors.primary }}
            >
              {content.salePrice || 'R$ 39,00'}
            </span>
          </div>

          {content.installments && (
            <p 
              className="text-sm"
              style={{ color: tokens.colors.textMuted }}
            >
              ou {content.installments}
            </p>
          )}

          <Button 
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
            style={{ 
              backgroundColor: tokens.colors.primary,
              color: 'white'
            }}
          >
            {content.ctaText || 'Quero meu Guia de Estilo Agora'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
