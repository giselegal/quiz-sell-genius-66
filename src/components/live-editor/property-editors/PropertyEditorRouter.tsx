import React from 'react';
import type { Block } from '@/types/editor';
import {
  HeadlinePropertyEditor,
  TextPropertyEditor,
  ImagePropertyEditor,
  BenefitsPropertyEditor,
  PricingPropertyEditor,
  CTAPropertyEditor,
  GuaranteePropertyEditor,
  StyleResultPropertyEditor
} from './index';

interface PropertyEditorRouterProps {
  selectedBlock: Block | null;
  onUpdateBlock: (blockId: string, content: any) => void;
}

export const PropertyEditorRouter: React.FC<PropertyEditorRouterProps> = ({
  selectedBlock,
  onUpdateBlock
}) => {
  if (!selectedBlock) {
    return null;
  }

  const renderPropertyEditor = () => {
    switch (selectedBlock.type) {
      case 'headline':
        return (
          <HeadlinePropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'text':
        return (
          <TextPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'image':
        return (
          <ImagePropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'benefits':
        return (
          <BenefitsPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'pricing':
        return (
          <PricingPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'cta':
        return (
          <CTAPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'guarantee':
        return (
          <GuaranteePropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'style-result':
        return (
          <StyleResultPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-2">
              Editor não implementado
            </p>
            <p className="text-xs text-muted-foreground">
              Tipo de bloco: {selectedBlock.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderPropertyEditor()}
    </div>
  );
};
