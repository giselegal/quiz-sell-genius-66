import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import BonusSection from '@/components/result/BonusSection';

interface BonusBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const BonusBlock: React.FC<BonusBlockProps> = ({
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
      className={`bonus-block ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:ring-opacity-50 rounded-lg' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: block.style?.backgroundColor,
        padding: block.style?.padding,
        margin: block.style?.margin,
        borderRadius: block.style?.borderRadius,
      }}
    >
      <BonusSection />
    </div>
  );
};

export default BonusBlock;
