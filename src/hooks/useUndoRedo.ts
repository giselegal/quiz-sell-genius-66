
import { useState, useCallback } from 'react';
import type { VisualEditorState } from '@/types/visualEditor';

export const useUndoRedo = (currentState: VisualEditorState) => {
  const [history, setHistory] = useState<VisualEditorState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const saveState = useCallback(() => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(currentState)));
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [currentState, historyIndex]);

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(prev => prev - 1);
      return history[historyIndex - 1];
    }
    return null;
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(prev => prev + 1);
      return history[historyIndex + 1];
    }
    return null;
  }, [canRedo, history, historyIndex]);

  return {
    canUndo,
    canRedo,
    saveState,
    undo,
    redo,
    history,
    historyIndex
  };
};
