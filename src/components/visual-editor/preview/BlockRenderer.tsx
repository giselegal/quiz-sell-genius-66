
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BlockRendererProps {
  block: EditorBlock;
  isSelected: boolean;
  onSelect: () => void;
  isPreview: boolean;
}

export function BlockRenderer({
  block,
  isSelected,
  onSelect,
  isPreview
}: BlockRendererProps) {
  return (
    <div
      onClick={() => !isPreview && onSelect()}
      className={cn(
        "group relative p-4 mb-4 rounded-lg transition-all duration-200",
        !isPreview && "cursor-pointer hover:bg-[#FAF9F7]",
        !isPreview && isSelected && "ring-2 ring-[#B89B7A] bg-[#FAF9F7]",
        !isPreview && "border-2 border-dashed border-[#B89B7A]/40"
      )}
    >
      {/* Block Content */}
      {renderBlockContent(block)}

      {/* Edit Controls */}
      {!isPreview && isSelected && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="text-[#8F7A6A]">
            Editar
          </Button>
        </div>
      )}
    </div>
  );
}

function renderBlockContent(block: EditorBlock) {
  switch (block.type) {
    case 'headline':
      return (
        <div className="space-y-2">
          {block.content.title && (
            <h2 className="text-2xl font-playfair text-[#432818]">
              {block.content.title}
            </h2>
          )}
          {block.content.subtitle && (
            <p className="text-[#8F7A6A]">{block.content.subtitle}</p>
          )}
        </div>
      );
    case 'text':
      return <p className="text-[#432818]">{block.content.text}</p>;
    default:
      return (
        <p className="text-[#8F7A6A]">Bloco tipo: {block.type}</p>
      );
  }
}
