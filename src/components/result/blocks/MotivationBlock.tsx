import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import MotivationSection from '@/components/result/MotivationSection';

interface MotivationBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const MotivationBlock: React.FC<MotivationBlockProps> = ({
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
      className={`motivation-block ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:ring-opacity-50 rounded-lg' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: block.style?.backgroundColor,
        padding: block.style?.padding,
        margin: block.style?.margin,
        borderRadius: block.style?.borderRadius,
      }}
    >
      <MotivationSection />
    </div>
  );
};

export default MotivationBlock;
