import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import GuaranteeSection from '@/components/result/GuaranteeSection';

interface GuaranteeBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const GuaranteeBlock: React.FC<GuaranteeBlockProps> = ({
  block,
  isEditMode = false,
  onClick
}) => {
  const handleClick = () => {
    if (isEditMode && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`guarantee-block ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:ring-opacity-50 rounded-lg' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: block.style?.backgroundColor,
        padding: block.style?.padding,
        margin: block.style?.margin,
        borderRadius: block.style?.borderRadius,
      }}
    >
      <GuaranteeSection />
    </div>
  );
};

export default GuaranteeBlock;
