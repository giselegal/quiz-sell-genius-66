
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

interface HeaderBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.header || {};

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      {/* Header minimalista e elegante */}
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b"
        style={{ borderColor: `${tokens.colors.primary}/10` }}
      >
        <div className="container mx-auto max-w-6xl px-4 py-4 lg:py-6">
          <div className="flex justify-center">
            <img
              src={content.logo || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"}
              alt={content.logoAlt || "Logo Gisele Galvão"}
              style={{ height: `${content.logoHeight || 50}px` }}
              className="h-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </header>
    </div>
  );
};
