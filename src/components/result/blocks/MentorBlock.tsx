import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import MentorSection from '@/components/result/MentorSection';

interface MentorBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const MentorBlock: React.FC<MentorBlockProps> = ({
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
      className={`mentor-block ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:ring-opacity-50 rounded-lg' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: block.style?.backgroundColor,
        padding: block.style?.padding,
        margin: block.style?.margin,
        borderRadius: block.style?.borderRadius,
      }}
    >
      <MentorSection />
    </div>
  );
};

export default MentorBlock;
