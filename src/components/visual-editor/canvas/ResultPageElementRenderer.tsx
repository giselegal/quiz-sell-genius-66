
import React from 'react';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Trash2, MoveUp, MoveDown, Edit } from 'lucide-react';

// Import all block components
import { HeaderBlock } from '../blocks/HeaderBlock';
import { StyleResultBlock } from '../blocks/StyleResultBlock';
import { TransformationBlock } from '../blocks/TransformationBlock';
import { MotivationBlock } from '../blocks/MotivationBlock';
import { BonusBlock } from '../blocks/BonusBlock';
import { TestimonialsBlock } from '../blocks/TestimonialsBlock';
import { GuaranteeBlock } from '../blocks/GuaranteeBlock';
import { MentorBlock } from '../blocks/MentorBlock';
import { CTABlock } from '../blocks/CTABlock';
import { FooterBlock } from '../blocks/FooterBlock';

interface ResultPageElementRendererProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const ResultPageElementRenderer: React.FC<ResultPageElementRendererProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  const renderBlockContent = () => {
    const commonProps = {
      block,
      primaryStyle,
      isSelected,
      isPreviewMode,
      onSelect,
      onClick: !isPreviewMode ? onSelect : undefined
    };

    switch (block.type) {
      case 'header':
        return <HeaderBlock {...commonProps} />;
      
      case 'styleResult':
        return <StyleResultBlock {...commonProps} />;
      
      case 'transformation':
        return <TransformationBlock {...commonProps} />;
      
      case 'motivation':
        return <MotivationBlock {...commonProps} />;
      
      case 'bonus':
        return <BonusBlock {...commonProps} />;
      
      case 'testimonials':
        return <TestimonialsBlock {...commonProps} />;
      
      case 'guarantee':
        return <GuaranteeBlock {...commonProps} />;
      
      case 'mentor':
        return <MentorBlock {...commonProps} />;
      
      case 'cta':
        return <CTABlock {...commonProps} />;
      
      case 'footer':
        return <FooterBlock {...commonProps} />;

      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">Componente: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`
        relative group transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
        ${!isPreviewMode ? 'cursor-pointer' : ''}
      `}
      style={{ margin: '8px' }}
    >
      {/* Block Controls */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-2 -right-2 flex gap-1 z-10">
          {onMoveUp && (
            <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={onMoveUp}>
              <MoveUp className="w-3 h-3" />
            </Button>
          )}
          {onMoveDown && (
            <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={onMoveDown}>
              <MoveDown className="w-3 h-3" />
            </Button>
          )}
          <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={onSelect}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={onDelete}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Block Content */}
      <div className="w-full">
        {renderBlockContent()}
      </div>
    </div>
  );
};
