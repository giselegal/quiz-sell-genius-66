
import React from 'react';
import { VisualElementRenderer } from './VisualElementRenderer';
import type { VisualElement } from '@/types/visualEditor';

interface VisualEditorCanvasProps {
  elements: VisualElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onElementDelete: (elementId: string) => void;
  onElementMove: (elementId: string, direction: 'up' | 'down') => void;
}

export const VisualEditorCanvas: React.FC<VisualEditorCanvasProps> = ({
  elements,
  selectedElementId,
  isPreviewMode,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onElementMove
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Canvas Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium text-gray-900">Canvas</h2>
        <p className="text-sm text-gray-600">
          {elements.length} elemento{elements.length !== 1 ? 's' : ''} nesta etapa
        </p>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {elements.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-gray-400">📝</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum elemento nesta etapa
              </h3>
              <p className="text-gray-600">
                Adicione componentes usando o painel lateral
              </p>
            </div>
          ) : (
            elements
              .sort((a, b) => a.order - b.order)
              .map((element, index) => (
                <VisualElementRenderer
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                  isPreviewMode={isPreviewMode}
                  onSelect={() => onElementSelect(element.id)}
                  onUpdate={(updates) => onElementUpdate(element.id, updates)}
                  onDelete={() => onElementDelete(element.id)}
                  onMoveUp={() => onElementMove(element.id, 'up')}
                  onMoveDown={() => onElementMove(element.id, 'down')}
                  canMoveUp={index > 0}
                  canMoveDown={index < elements.length - 1}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};
