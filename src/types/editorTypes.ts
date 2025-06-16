
// Editor Types Compatibility Layer
// This file ensures type compatibility across different editor components

import { CanvasElement as VisualEditorCanvasElement, BlockType } from './visualEditor';

// Re-export the main types to ensure consistency
export type { VisualEditorCanvasElement as CanvasElement };
export type { BlockType };

// Legacy compatibility - if needed
export interface LegacyCanvasElement {
  id: string;
  type: 'button' | 'form' | 'image' | 'text' | 'headline';
  stageId: string;
  order: number;
  content: any;
  style: any;
  visible: boolean;
  locked: boolean;
}

// Type converter function for legacy support
export function convertToModernCanvasElement(legacy: LegacyCanvasElement): VisualEditorCanvasElement {
  return {
    ...legacy,
    type: legacy.type as BlockType, // Type assertion since we know it's compatible
    content: legacy.content || {},
    style: legacy.style || {}
  };
}

// Modern editor props interface
export interface EditorProps {
  selectedStyle: {
    category: string;
    score: number;
    percentage: number;
  };
  onShowTemplates?: () => void;
  initialConfig?: any;
}
