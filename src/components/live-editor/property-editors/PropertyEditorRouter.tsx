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
  StyleResultPropertyEditor,
  TestimonialPropertyEditor,
  VideoPropertyEditor,
  FAQPropertyEditor,
  CountdownPropertyEditor,
  StatsPropertyEditor,
  ContactPropertyEditor,
  DividerPropertyEditor,
  SpacerPropertyEditor,
  SocialProofPropertyEditor,
  NewsletterPropertyEditor,
  ChecklistPropertyEditor,
  ComparisonPropertyEditor,
  FeatureGridPropertyEditor
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
      
      case 'testimonial':
        return (
          <TestimonialPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'video':
        return (
          <VideoPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'faq':
        return (
          <FAQPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'countdown':
        return (
          <CountdownPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'stats':
        return (
          <StatsPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'contact':
        return (
          <ContactPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'divider':
        return (
          <DividerPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'spacer':
        return (
          <SpacerPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'social-proof':
        return (
          <SocialProofPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'newsletter':
        return (
          <NewsletterPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'checklist':
        return (
          <ChecklistPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'comparison':
        return (
          <ComparisonPropertyEditor
            block={selectedBlock}
            onUpdate={onUpdateBlock}
          />
        );
      
      case 'feature-grid':
        return (
          <FeatureGridPropertyEditor
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
