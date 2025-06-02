import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Eye, EyeOff } from 'lucide-react';
import EditableBlock from './EditableBlock';
import { BlockData } from '@/types/resultPageConfig';

interface DragDropContainerProps {
  blocks: BlockData[];
  onUpdateBlocks: (blocks: BlockData[]) => void;
  onEditBlock: (blockId: string) => void;
  onAddBlock: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  // Props adicionais para o BlockRenderer
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

const DragDropContainer: React.FC<DragDropContainerProps> = ({
  blocks,
  onUpdateBlocks,
  onEditBlock,
  onAddBlock,
  isEditMode,
  onToggleEditMode,
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
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setDraggedId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedId(null);

    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);

      const newBlocks = arrayMove(blocks, oldIndex, newIndex).map((block, index) => ({
        ...block,
        order: index
      }));

      onUpdateBlocks(newBlocks);
    }
  };

  const handleToggleVisibility = (blockId: string) => {
    const newBlocks = blocks.map(block =>
      block.id === blockId
        ? { ...block, visible: !block.visible }
        : block
    );
    onUpdateBlocks(newBlocks);
  };

  const handleDeleteBlock = (blockId: string) => {
    const newBlocks = blocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));
    onUpdateBlocks(newBlocks);
  };

  // Filtrar apenas blocos visíveis quando não estiver no modo de edição
  const displayBlocks = isEditMode ? blocks : blocks.filter(block => block.visible);

  return (
    <div className="w-full">
      {/* Barra de controles superior */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-[#B89B7A]/20 p-4 mb-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <h3 className="font-medium text-[#432818]">
              {isEditMode ? 'Modo Edição' : 'Visualização'}
            </h3>
            <span className="text-sm text-[#8F7A6A]">
              {blocks.length} blocos
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Toggle Edit Mode */}
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={onToggleEditMode}
              className={`${
                isEditMode 
                  ? 'bg-[#B89B7A] text-white hover:bg-[#A1835D]' 
                  : 'border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white'
              }`}
            >
              {isEditMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isEditMode ? 'Sair da Edição' : 'Editar Página'}
            </Button>

            {/* Add Block */}
            {isEditMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAddBlock}
                className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Bloco
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Container de blocos */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={displayBlocks.map(block => block.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {displayBlocks.map((block) => (
              <EditableBlock
                key={block.id}
                block={block}
                onEdit={onEditBlock}
                onToggleVisibility={handleToggleVisibility}
                onDelete={handleDeleteBlock}
                isEditMode={isEditMode}
                isDragging={draggedId === block.id}
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
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Mensagem quando não há blocos visíveis */}
      {!isEditMode && displayBlocks.length === 0 && (
        <div className="text-center py-12 text-[#8F7A6A]">
          <p>Nenhum bloco visível nesta página.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white"
            onClick={onToggleEditMode}
          >
            Entrar no Modo Edição
          </Button>
        </div>
      )}

      {/* Help text para modo edição */}
      {isEditMode && (
        <div className="mt-12 p-6 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg border border-[#B89B7A]/20">
          <h4 className="font-medium text-[#432818] mb-2">💡 Dicas de Edição:</h4>
          <ul className="text-sm text-[#6B5B4E] space-y-1">
            <li>• Arraste os blocos pela alça para reordenar</li>
            <li>• Use o ícone de olho para mostrar/ocultar blocos</li>
            <li>• Clique no lápis para editar o conteúdo</li>
            <li>• Clique na lixeira para excluir blocos editáveis</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragDropContainer;
