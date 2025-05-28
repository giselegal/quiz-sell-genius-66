
"use client";

import { useState, useCallback } from 'react';
import { EditorConfig, EditorBlock, EditableContent } from '@/types/editor';
import { getDefaultContentForType } from '@/utils/editorDefaults';
import { generateId } from '@/utils/idGenerator';
import { useToast } from '@/components/ui/use-toast';

const defaultConfig: EditorConfig = {
  blocks: []
};

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>(defaultConfig);
  const { toast } = useToast();

  const addBlock = useCallback((type: EditorBlock['type']) => {
    const newBlock: EditorBlock = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: config.blocks.length
    };

    setConfig(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));

    return newBlock.id;
  }, [config.blocks.length]);

  const updateBlock = useCallback((id: string, content: Partial<EditableContent>) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === id
          ? { ...block, content: { ...block.content, ...content } }
          : block
      )
    }));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }))
    }));
  }, []);

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    setConfig(prev => {
      const newBlocks = Array.from(prev.blocks);
      const [removed] = newBlocks.splice(startIndex, 1);
      newBlocks.splice(endIndex, 0, removed);

      return {
        ...prev,
        blocks: newBlocks.map((block, index) => ({ ...block, order: index }))
      };
    });
  }, []);

  const saveConfig = useCallback(() => {
    toast({
      title: "Configuração salva",
      description: "As alterações foram salvas com sucesso."
    });
  }, [toast]);

  return {
    config,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    saveConfig
  };
};
