
import React from 'react';
import { EditableContent } from '@/types/editor';

interface HeadlineBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const HeadlineBlock: React.FC<HeadlineBlockProps> = ({ content, onClick }) => {
  return (
    <div 
      className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" 
      onClick={onClick}
    >
      <div className="space-y-2">
        {content.title && (
          <h2 className="text-2xl font-playfair text-[#432818]">{content.title}</h2>
        )}
        {content.subtitle && (
          <p className="text-lg text-[#8F7A6A]">{content.subtitle}</p>
        )}
      </div>
    </div>
  );
};
