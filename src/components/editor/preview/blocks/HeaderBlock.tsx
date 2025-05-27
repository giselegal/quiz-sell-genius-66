
import React from 'react';
import { EditableContent } from '@/types/editor';

interface HeaderBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ content, onClick }) => {
  return (
    <div 
      className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" 
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {content.logo ? (
          <img 
            src={content.logo} 
            alt={content.logoAlt || 'Logo'} 
            className="h-14 object-contain"
          />
        ) : (
          <div className="text-[#8F7A6A]">Logo</div>
        )}
      </div>
    </div>
  );
};
