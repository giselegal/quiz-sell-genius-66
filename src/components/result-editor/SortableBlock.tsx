
import React from 'react';
import { Block } from '@/types/editor';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

interface SortableBlockProps {
  block: Block;
  isSelected: boolean;
  isPreviewing: boolean;
  onSelect: () => void;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  isSelected,
  isPreviewing,
  onSelect
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-4 rounded-md transition-colors",
        isSelected && !isPreviewing ? "bg-[#FAF9F7] border border-dashed border-[#B89B7A]" : "",
        !isPreviewing && "hover:bg-[#FAF9F7]/50"
      )}
      onClick={() => !isPreviewing && onSelect()}
    >
      {!isPreviewing && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 z-10 cursor-grab w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
        >
          <GripVertical className="w-4 h-4 text-gray-500" />
        </div>
      )}

      {renderBlockContent(block)}
    </div>
  );
};

const renderBlockContent = (block: Block) => {
  const contentStyle = block.content.style as React.CSSProperties || {};
  
  switch (block.type) {
    case 'headline':
      return (
        <div className="space-y-2" style={contentStyle}>
          <h2 className="text-2xl font-bold">{block.content.title || 'Título Principal'}</h2>
          <p>{block.content.subtitle || 'Subtítulo da oferta'}</p>
        </div>
      );
      
    case 'text':
      return (
        <div className="prose" style={contentStyle}>
          {block.content.text || 'Texto do conteúdo'}
        </div>
      );
      
    case 'image':
      return (
        <div className="flex justify-center" style={contentStyle}>
          {block.content.imageUrl ? (
            <img 
              src={block.content.imageUrl} 
              alt={block.content.imageAlt || 'Imagem'} 
              className="max-w-full h-auto"
            />
          ) : (
            <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
              <p className="text-gray-500">Imagem não definida</p>
            </div>
          )}
        </div>
      );
      
    case 'pricing':
      return (
        <div className="bg-[#FAF9F7] p-4 rounded-lg border border-[#B89B7A]/20">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">{block.content.title || 'Nome do Produto'}</h3>
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl font-bold">{block.content.price || 'R$ 97,00'}</span>
              {block.content.regularPrice && (
                <span className="line-through text-gray-500">{block.content.regularPrice}</span>
              )}
            </div>
            <button className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white px-4 py-2 rounded w-full">
              {block.content.ctaText || 'Comprar Agora'}
            </button>
          </div>
        </div>
      );
      
    default:
      return <div>Tipo de bloco desconhecido: {block.type}</div>;
  }
};
