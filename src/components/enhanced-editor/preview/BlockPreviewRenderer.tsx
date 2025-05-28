
import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface BlockPreviewRendererProps {
  block: Block;
  isSelected: boolean;
  isPreviewing: boolean;
  onSelect: () => void;
  primaryStyle?: StyleResult;
}

export function BlockPreviewRenderer({
  block,
  isSelected,
  isPreviewing,
  onSelect,
  primaryStyle
}: BlockPreviewRendererProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: block.id,
    disabled: isPreviewing
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'headline':
        return (
          <div className="space-y-2">
            {block.content?.title && (
              <h2 className="text-2xl font-bold text-[#432818]">
                {block.content.title}
              </h2>
            )}
            {block.content?.subtitle && (
              <p className="text-lg text-[#8F7A6A]">
                {block.content.subtitle}
              </p>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="prose max-w-none">
            <p className="text-[#432818]">
              {block.content?.text || 'Digite seu texto aqui...'}
            </p>
          </div>
        );

      case 'image':
        return (
          <div className="text-center">
            {block.content?.imageUrl ? (
              <>
                <img
                  src={block.content.imageUrl}
                  alt={block.content.imageAlt || 'Imagem'}
                  className="max-w-full h-auto rounded-md mx-auto"
                />
                {block.content.caption && (
                  <p className="text-sm text-[#8F7A6A] mt-2">
                    {block.content.caption}
                  </p>
                )}
              </>
            ) : (
              <div className="bg-gray-100 h-48 flex items-center justify-center rounded-md">
                <p className="text-gray-500">Adicionar imagem</p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-500">Bloco tipo: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group mb-4 p-4 rounded-md border-2 transition-colors",
        isSelected && !isPreviewing
          ? "border-[#B89B7A] bg-[#B89B7A]/5"
          : "border-transparent hover:border-[#B89B7A]/30",
        isPreviewing && "border-transparent"
      )}
      onClick={!isPreviewing ? onSelect : undefined}
      {...attributes}
    >
      {!isPreviewing && (
        <div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-[#8F7A6A]" />
        </div>
      )}
      
      {renderBlockContent()}
    </div>
  );
}
