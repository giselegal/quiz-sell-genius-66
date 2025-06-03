import { useState, useCallback, useRef, useEffect } from 'react';
import { Block } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

export interface UndoRedoState {
  blocks: Block[];
  action: string;
  timestamp: number;
}

const MAX_HISTORY_SIZE = 50;

export const useUndoRedo = (initialBlocks: Block[] = []) => {
  const [history, setHistory] = useState<UndoRedoState[]>([
    {
      blocks: initialBlocks,
      action: 'Initial state',
      timestamp: Date.now(),
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPerformingUndoRedo = useRef(false);
  const { toast } = useToast();

  // Adicionar novo estado ao histórico
  const pushState = useCallback((blocks: Block[], action: string) => {
    if (isPerformingUndoRedo.current) {
      return;
    }

    setHistory(prev => {
      // Remove estados futuros se estivermos no meio do histórico
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Adiciona novo estado
      const newState: UndoRedoState = {
        blocks: JSON.parse(JSON.stringify(blocks)), // deep clone
        action,
        timestamp: Date.now(),
      };
      
      newHistory.push(newState);
      
      // Mantém apenas os últimos MAX_HISTORY_SIZE estados
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift();
        setCurrentIndex(prev => Math.max(0, prev));
        return newHistory;
      }
      
      setCurrentIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [currentIndex]);

  // Desfazer (undo)
  const undo = useCallback((): Block[] | null => {
    if (currentIndex > 0) {
      isPerformingUndoRedo.current = true;
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      
      const prevState = history[newIndex];
      
      setTimeout(() => {
        isPerformingUndoRedo.current = false;
      }, 100);

      toast({
        title: "Desfeito",
        description: `Ação desfeita: ${prevState.action}`,
        duration: 2000,
      });
      
      return prevState.blocks;
    }
    
    return null;
  }, [currentIndex, history, toast]);

  // Refazer (redo)
  const redo = useCallback((): Block[] | null => {
    if (currentIndex < history.length - 1) {
      isPerformingUndoRedo.current = true;
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      
      const nextState = history[newIndex];
      
      setTimeout(() => {
        isPerformingUndoRedo.current = false;
      }, 100);

      toast({
        title: "Refeito",
        description: `Ação refeita: ${nextState.action}`,
        duration: 2000,
      });
      
      return nextState.blocks;
    }
    
    return null;
  }, [currentIndex, history, toast]);

  // Verificar se pode desfazer
  const canUndo = currentIndex > 0;

  // Verificar se pode refazer
  const canRedo = currentIndex < history.length - 1;

  // Limpar histórico
  const clearHistory = useCallback((newInitialBlocks: Block[] = []) => {
    setHistory([
      {
        blocks: JSON.parse(JSON.stringify(newInitialBlocks)),
        action: 'History cleared',
        timestamp: Date.now(),
      }
    ]);
    setCurrentIndex(0);
  }, []);

  // Obter estado atual
  const getCurrentState = useCallback((): UndoRedoState | null => {
    return history[currentIndex] || null;
  }, [history, currentIndex]);

  // Obter informações do histórico
  const getHistoryInfo = useCallback(() => {
    return {
      total: history.length,
      current: currentIndex + 1,
      canUndo,
      canRedo,
      undoAction: currentIndex > 0 ? history[currentIndex - 1].action : null,
      redoAction: currentIndex < history.length - 1 ? history[currentIndex + 1].action : null,
    };
  }, [history, currentIndex, canUndo, canRedo]);

  // Atualizar blocos iniciais
  const updateInitialBlocks = useCallback((blocks: Block[]) => {
    setHistory([
      {
        blocks: JSON.parse(JSON.stringify(blocks)),
        action: 'Loaded from save',
        timestamp: Date.now(),
      }
    ]);
    setCurrentIndex(0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') || 
                 ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return {
    // Estados
    canUndo,
    canRedo,
    
    // Ações
    pushState,
    undo,
    redo,
    clearHistory,
    updateInitialBlocks,
    
    // Utils
    getCurrentState,
    getHistoryInfo,
  };
};
