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

  // Create a wrapper function that matches the expected signature
  const handleUpdate = (content: any) => {
    onUpdateBlock(selectedBlock.id, content);
  };

  const renderPropertyEditor = () => {
    switch (selectedBlock.type) {
      case 'headline':
        return (
          <HeadlinePropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'text':
        return (
          <TextPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'image':
        return (
          <ImagePropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'benefits':
        return (
          <BenefitsPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'pricing':
        return (
          <PricingPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'cta':
        return (
          <CTAPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'guarantee':
        return (
          <GuaranteePropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'style-result':
        return (
          <StyleResultPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'testimonial':
        return (
          <TestimonialPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'video':
        return (
          <VideoPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'faq':
        return (
          <FAQPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'countdown':
        return (
          <CountdownPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'stats':
        return (
          <StatsPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'contact':
        return (
          <ContactPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'divider':
        return (
          <DividerPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'spacer':
        return (
          <SpacerPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'social-proof':
        return (
          <SocialProofPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'newsletter':
        return (
          <NewsletterPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'checklist':
        return (
          <ChecklistPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'comparison':
        return (
          <ComparisonPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
          />
        );
      
      case 'feature-grid':
        return (
          <FeatureGridPropertyEditor
            block={selectedBlock}
            onUpdate={handleUpdate}
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
