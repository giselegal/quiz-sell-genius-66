
"use client";

import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, EyeOff, Save, Settings, Trash2 } from 'lucide-react';
import { Block } from '@/types/editor';
import { SortableBlock } from './SortableBlock';
import EditableComponent from './EditableComponent';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/editorDefaults';

interface VisualEditorProps {
  initialBlocks?: Block[];
  onSave?: (blocks: Block[]) => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  initialBlocks = [],
  onSave
}) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const addBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };
    
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, [blocks.length]);

  const updateBlock = useCallback((id: string, content: any) => {
    setBlocks(prev => prev.map(block =>
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
    setSelectedBlockId(null);
  }, []);

  const duplicateBlock = useCallback((id: string) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    if (blockToDuplicate) {
      const newBlock: Block = {
        ...blockToDuplicate,
        id: generateId(),
        order: blocks.length
      };
      setBlocks(prev => [...prev, newBlock]);
    }
  }, [blocks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      setBlocks(prev => arrayMove(prev, oldIndex, newIndex));
    }
  }, [blocks]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(blocks);
    }
  }, [blocks, onSave]);

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Editor Visual</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isPreviewMode ? 'Editar' : 'Visualizar'}
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full border-r">
              <div className="p-4">
                <h3 className="font-medium mb-4">Componentes</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addBlock('heading')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Título
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addBlock('paragraph')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Parágrafo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addBlock('image')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Imagem
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addBlock('button')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Botão
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={55}>
            <div className="h-full p-4 overflow-y-auto">
              {blocks.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <p className="mb-2">Nenhum componente adicionado</p>
                    <p className="text-sm">Use o painel à esquerda para adicionar componentes</p>
                  </div>
                </div>
              ) : (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={blocks.map(block => block.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {blocks.map((block) => (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          isSelected={selectedBlockId === block.id}
                          isPreviewing={isPreviewMode}
                          onSelect={() => setSelectedBlockId(block.id)}
                          onDuplicate={() => duplicateBlock(block.id)}
                          onDelete={() => deleteBlock(block.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="h-full border-l">
              {selectedBlock ? (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Propriedades</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBlockId(null)}
                    >
                      ×
                    </Button>
                  </div>
                  <EditableComponent
                    block={selectedBlock}
                    onUpdate={(content) => updateBlock(selectedBlock.id, content)}
                  />
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Selecione um componente para editar suas propriedades</p>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default VisualEditor;
