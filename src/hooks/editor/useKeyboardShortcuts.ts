import { useEffect, useCallback } from 'react';

interface KeyboardShortcutsProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onSelectAll?: () => void;
  onEscape?: () => void;
  isEnabled?: boolean;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onSave,
  onDelete,
  onDuplicate,
  onSelectAll,
  onEscape,
  isEnabled = true,
}: KeyboardShortcutsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isEnabled) return;

    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    const isCtrlOrCmd = ctrlKey || metaKey;

    // Ignore shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      return;
    }

    // Undo: Ctrl/Cmd + Z
    if (isCtrlOrCmd && !shiftKey && key.toLowerCase() === 'z') {
      event.preventDefault();
      onUndo();
      return;
    }

    // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
    if ((isCtrlOrCmd && shiftKey && key.toLowerCase() === 'z') || 
        (isCtrlOrCmd && key.toLowerCase() === 'y')) {
      event.preventDefault();
      onRedo();
      return;
    }

    // Save: Ctrl/Cmd + S
    if (isCtrlOrCmd && key.toLowerCase() === 's') {
      event.preventDefault();
      onSave();
      return;
    }

    // Delete: Delete or Backspace
    if (key === 'Delete' || key === 'Backspace') {
      event.preventDefault();
      onDelete();
      return;
    }

    // Duplicate: Ctrl/Cmd + D
    if (isCtrlOrCmd && key.toLowerCase() === 'd' && onDuplicate) {
      event.preventDefault();
      onDuplicate();
      return;
    }

    // Select All: Ctrl/Cmd + A
    if (isCtrlOrCmd && key.toLowerCase() === 'a' && onSelectAll) {
      event.preventDefault();
      onSelectAll();
      return;
    }

    // Escape: Clear selection
    if (key === 'Escape' && onEscape) {
      event.preventDefault();
      onEscape();
      return;
    }
  }, [isEnabled, onUndo, onRedo, onSave, onDelete, onDuplicate, onSelectAll, onEscape]);

  useEffect(() => {
    if (!isEnabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isEnabled]);

  // Return list of available shortcuts for display
  const shortcuts = [
    { keys: ['Ctrl', 'Z'], description: 'Desfazer', mac: ['⌘', 'Z'] },
    { keys: ['Ctrl', 'Shift', 'Z'], description: 'Refazer', mac: ['⌘', '⇧', 'Z'] },
    { keys: ['Ctrl', 'Y'], description: 'Refazer (alternativo)', mac: ['⌘', 'Y'] },
    { keys: ['Ctrl', 'S'], description: 'Salvar', mac: ['⌘', 'S'] },
    { keys: ['Delete'], description: 'Deletar selecionado', mac: ['Delete'] },
    { keys: ['Backspace'], description: 'Deletar selecionado', mac: ['⌫'] },
    { keys: ['Ctrl', 'D'], description: 'Duplicar', mac: ['⌘', 'D'] },
    { keys: ['Ctrl', 'A'], description: 'Selecionar tudo', mac: ['⌘', 'A'] },
    { keys: ['Esc'], description: 'Limpar seleção', mac: ['Esc'] },
  ];

  return { shortcuts };
};
