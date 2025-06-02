import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Eye, EyeOff, GripVertical, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlockData } from '@/types/resultPageConfig';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockRenderer from './BlockRenderer';

interface EditableBlockProps {
  block: BlockData;
  onEdit: (blockId: string) => void;
  onToggleVisibility: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  isEditMode: boolean;
  isDragging?: boolean;
  // Props necessárias para o BlockRenderer
  primaryStyle?: any;
  secondaryStyles?: any[];
  globalStyles?: any;
  user?: any;
  resultPageConfig?: any;
  onCTAClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isButtonHovered?: boolean;
  setIsButtonHovered?: (hovered: boolean) => void;
  timer?: { hours: number; minutes: number; seconds: number };
  imagesLoaded?: { style: boolean; guide: boolean };
  setImagesLoaded?: (state: { style: boolean; guide: boolean }) => void;
  isLowPerformance?: boolean;
  tokens?: any;
}

const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  onEdit,
  onToggleVisibility,
  onDelete,
  isEditMode,
  isDragging = false,
  primaryStyle,
  secondaryStyles,
  globalStyles,
  user,
  resultPageConfig,
  onCTAClick,
  isButtonHovered,
  setIsButtonHovered,
  timer,
  imagesLoaded,
  setImagesLoaded,
  isLowPerformance,
  tokens
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const renderBlockContent = () => {
    // Se estiver no modo edição e for um tipo de bloco complexo, usa um preview simples
    if (isEditMode && ['transformations', 'motivation', 'bonuses', 'testimonials', 'guarantee', 'mentor'].includes(block.type)) {
      return (
        <div className="text-center p-8 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg border border-[#B89B7A]/20">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#B89B7A] text-white">
              {block.type}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[#432818] mb-2">
            {block.content.title || `Seção ${block.type}`}
          </h3>
          <p className="text-[#8F7A6A] text-sm">
            Componente complexo - clique em editar para configurar
          </p>
        </div>
      );
    }

    // Para outros tipos ou modo visualização, usa o BlockRenderer completo
    return (
      <BlockRenderer
        block={block}
        primaryStyle={primaryStyle}
        secondaryStyles={secondaryStyles}
        globalStyles={globalStyles}
        user={user}
        resultPageConfig={resultPageConfig}
        onCTAClick={onCTAClick}
        isButtonHovered={isButtonHovered}
        setIsButtonHovered={setIsButtonHovered}
        timer={timer}
        imagesLoaded={imagesLoaded}
        setImagesLoaded={setImagesLoaded}
        isLowPerformance={isLowPerformance}
        tokens={tokens}
      />
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${!block.visible ? 'opacity-50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`relative overflow-hidden transition-all duration-200 ${
          isEditMode ? 'border-2 border-dashed border-[#B89B7A]/50' : 'border border-[#B89B7A]/20'
        } ${isHovered && isEditMode ? 'border-[#B89B7A] shadow-lg' : ''}`}
        style={{
          backgroundColor: block.style.backgroundColor || 'white',
          padding: block.style.padding || '1.5rem',
          fontSize: block.style.fontSize,
          fontWeight: block.style.fontWeight,
          color: block.style.color,
          margin: block.style.margin,
          width: block.style.width,
          borderRadius: block.style.borderRadius,
          textAlign: (block.style.textAlign as 'left' | 'center' | 'right') || 'left',
          fontFamily: block.style.fontFamily,
        }}
      >
        {/* Controles de edição - só aparecem no modo edição */}
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
            className="absolute top-2 right-2 z-10 flex gap-1"
          >
            {/* Drag handle */}
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto bg-white/90 hover:bg-white border border-[#B89B7A]/30"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-4 h-4 text-[#B89B7A]" />
            </Button>

            {/* Toggle visibility */}
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto bg-white/90 hover:bg-white border border-[#B89B7A]/30"
              onClick={() => onToggleVisibility(block.id)}
            >
              {block.visible ? (
                <Eye className="w-4 h-4 text-[#B89B7A]" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
            </Button>

            {/* Edit button */}
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto bg-white/90 hover:bg-white border border-[#B89B7A]/30"
              onClick={() => onEdit(block.id)}
            >
              <Edit3 className="w-4 h-4 text-[#B89B7A]" />
            </Button>

            {/* Delete button */}
            {block.editable && (
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto bg-white/90 hover:bg-white border border-red-300"
                onClick={() => onDelete(block.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </motion.div>
        )}

        {/* Indicator de tipo de bloco */}
        {isEditMode && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#B89B7A] text-white text-xs px-2 py-1 rounded-full font-medium">
              {block.type}
            </span>
          </div>
        )}

        {/* Conteúdo do bloco */}
        <div className={isEditMode ? 'mt-8' : ''}>
          {renderBlockContent()}
        </div>

        {/* Overlay quando não visível */}
        {!block.visible && isEditMode && (
          <div className="absolute inset-0 bg-gray-500/20 flex items-center justify-center">
            <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium">
              Oculto
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditableBlock;
