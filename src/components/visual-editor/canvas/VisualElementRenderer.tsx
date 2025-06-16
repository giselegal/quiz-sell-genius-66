
import React from 'react';
import { ElementRenderer } from './ElementRenderer';
import { VisualElement } from '@/types/visualEditor';

interface VisualElementRendererProps {
  element: VisualElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const VisualElementRenderer: React.FC<VisualElementRendererProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  return (
    <div
      className={`
        relative group
        ${!isPreviewMode ? 'hover:border-2 border-dashed hover:border-blue-300' : ''}
        ${isSelected && !isPreviewMode ? 'border-2 border-blue-500' : ''}
        rounded-md p-2
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <ElementRenderer 
        type={element.type} 
        content={element.content} 
      />
      
      {/* Edit Controls */}
      {!isPreviewMode && isSelected && (
        <div className="absolute top-1 right-1 flex gap-1 bg-white shadow-lg rounded border p-1">
          {canMoveUp && onMoveUp && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              className="p-1 hover:bg-gray-100 rounded text-xs"
              title="Move Up"
            >
              ↑
            </button>
          )}
          {canMoveDown && onMoveDown && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              className="p-1 hover:bg-gray-100 rounded text-xs"
              title="Move Down"
            >
              ↓
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-100 text-red-600 rounded text-xs"
            title="Delete"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
