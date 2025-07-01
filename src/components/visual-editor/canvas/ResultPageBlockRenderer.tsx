
import React from 'react';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { HeaderBlock } from '../blocks/HeaderBlock';
import { StyleResultBlock } from '../blocks/StyleResultBlock';
import { TransformationBlock } from '../blocks/TransformationBlock';
import { MotivationBlock } from '../blocks/MotivationBlock';
import { CTABlock } from '../blocks/CTABlock';

interface ResultPageBlockRendererProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const ResultPageBlockRenderer: React.FC<ResultPageBlockRendererProps> = ({
  block,
  primaryStyle,
  secondaryStyles,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  switch (block.type) {
    case 'header':
      return (
        <HeaderBlock
          block={block}
          primaryStyle={primaryStyle}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
          onSelect={onSelect}
          onClick={onClick}
        />
      );
      
    case 'styleResult':
      return (
        <StyleResultBlock
          block={block}
          primaryStyle={primaryStyle}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
          onSelect={onSelect}
          onClick={onClick}
        />
      );
      
    case 'transformation':
      return (
        <TransformationBlock
          block={block}
          primaryStyle={primaryStyle}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
          onSelect={onSelect}
          onClick={onClick}
        />
      );
      
    case 'motivation':
      return (
        <MotivationBlock
          block={block}
          primaryStyle={primaryStyle}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
          onSelect={onSelect}
          onClick={onClick}
        />
      );
      
    case 'cta':
      return (
        <CTABlock
          block={block}
          primaryStyle={primaryStyle}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
          onSelect={onSelect}
          onClick={onClick}
        />
      );
      
    // Placeholder para outros tipos de bloco
    case 'bonus':
    case 'testimonials':
    case 'guarantee':
    case 'mentor':
    case 'footer':
      return (
        <div
          className={`
            relative p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg bg-[#FAF9F7] text-center
            ${!isPreviewMode ? 'cursor-pointer hover:border-[#B89B7A] hover:bg-[#FAF9F7]' : ''}
            ${isSelected && !isPreviewMode ? 'border-[#B89B7A] ring-2 ring-[#B89B7A]/20' : ''}
          `}
          onClick={!isPreviewMode ? onSelect : undefined}
        >
          <h3 className="text-lg font-medium text-[#432818] mb-2">
            {block.type === 'bonus' && 'Seção de Bônus'}
            {block.type === 'testimonials' && 'Seção de Depoimentos'}
            {block.type === 'guarantee' && 'Seção de Garantia'}
            {block.type === 'mentor' && 'Seção da Mentora'}
            {block.type === 'footer' && 'Rodapé'}
          </h3>
          <p className="text-[#8F7A6A]">
            Clique para editar esta seção nas propriedades
          </p>
          {!isPreviewMode && isSelected && (
            <div className="absolute top-2 right-2 bg-[#B89B7A] text-white text-xs px-2 py-1 rounded">
              Selecionado
            </div>
          )}
        </div>
      );
      
    default:
      return (
        <div className="p-4 border border-red-300 rounded bg-red-50 text-red-700">
          Tipo de bloco não implementado: {block.type}
        </div>
      );
  }
};
