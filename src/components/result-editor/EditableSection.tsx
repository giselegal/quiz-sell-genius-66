
import React from 'react';
import { PricingSection } from '@/components/quiz-result/sales/PricingSection';

interface EditableSectionProps {
  children?: React.ReactNode;
  className?: string;
}

const EditableSection: React.FC<EditableSectionProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children || <PricingSection />}
    </div>
  );
};

export default EditableSection;
