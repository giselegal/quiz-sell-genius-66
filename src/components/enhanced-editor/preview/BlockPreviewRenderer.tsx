
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import InlineTextEditor from './editors/InlineTextEditor';
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
  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1
  } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isPreviewing ? {} : listeners)}
      onClick={isPreviewing ? undefined : onSelect}
      className={cn(
        "relative mb-4 transition-all duration-200",
        !isPreviewing && "hover:outline-dashed hover:outline-2 hover:outline-[#B89B7A]/40",
        isSelected && !isPreviewing && "outline-dashed outline-2 outline-[#B89B7A]",
        isDragging && "opacity-50"
      )}
    >
      {!isPreviewing && isSelected && (
        <div className="absolute -top-3 left-2 bg-[#B89B7A] text-white text-xs px-2 py-1 rounded-sm z-10">
          {block.type}
        </div>
      {renderBlockContent(block, isPreviewing, primaryStyle)}
    </div>
  );
function renderBlockContent(block: Block, isPreviewing: boolean, primaryStyle?: StyleResult) {
  const defaultStyle = {
    padding: block.content?.style?.padding || '1rem',
    backgroundColor: block.content?.style?.backgroundColor || 'transparent',
    color: block.content?.style?.color || 'inherit',
    textAlign: block.content?.style?.textAlign as any || 'left',
    borderRadius: block.content?.style?.borderRadius || '0.375rem'
  };
  switch (block.type) {
    case 'headline':
      return (
        <div className="space-y-2" style={defaultStyle}>
          {!isPreviewing ? (
            <>
              <InlineTextEditor
                value={block.content?.title || 'Título Principal'}
                placeholder="Digite o título principal..."
                className="text-2xl font-playfair text-[#432818] w-full outline-none border-b border-transparent focus:border-[#B89B7A]/30 transition-all"
              />
                value={block.content?.subtitle || 'Subtítulo ou descrição'}
                placeholder="Digite o subtítulo..."
                className="text-lg text-[#8F7A6A] w-full outline-none border-b border-transparent focus:border-[#B89B7A]/30 transition-all"
            </>
          ) : (
              <h2 className="text-2xl font-playfair text-[#432818]">
                {block.content?.title || 'Título Principal'}
              </h2>
              <p className="text-[#8F7A6A]">
                {block.content?.subtitle || 'Subtítulo ou descrição'}
              </p>
          )}
      );
    
    case 'text':
        <div style={defaultStyle}>
            <InlineTextEditor
              value={block.content?.text || 'Digite seu texto aqui...'}
              placeholder="Digite seu texto aqui..."
              className="text-[#432818] w-full outline-none border-b border-transparent focus:border-[#B89B7A]/30 transition-all"
              multiline
            />
            <p className="text-[#432818]">
              {block.content?.text || 'Digite seu texto aqui...'}
            </p>
    case 'image':
        <div 
          className="flex flex-col items-center text-center"
          style={defaultStyle}
        >
          {block.content?.imageUrl ? (
            <img
              src={block.content.imageUrl}
              alt={block.content.imageAlt || 'Imagem'}
              className="max-w-full rounded-md"
            <div className="w-full h-48 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md flex flex-col items-center justify-center">
              <span className="text-[#8F7A6A]">Selecione uma imagem</span>
              {!isPreviewing && (
                <button className="mt-2 px-3 py-1.5 bg-[#B89B7A] text-white text-sm rounded">
                  Carregar Imagem
                </button>
              )}
            </div>
              value={block.content?.caption || ''}
              placeholder="Legenda da imagem..."
              className="mt-2 text-sm text-[#8F7A6A] w-full outline-none border-b border-transparent focus:border-[#B89B7A]/30 transition-all text-center"
            block.content?.caption && (
              <p className="mt-2 text-sm text-[#8F7A6A]">{block.content.caption}</p>
            )
    // Add more block types here...
    default:
        <div className="p-4 border border-[#B89B7A]/20 rounded-md bg-[#FAF9F7]">
          <p className="text-[#8F7A6A]">Tipo de bloco não implementado: {block.type}</p>
  }
