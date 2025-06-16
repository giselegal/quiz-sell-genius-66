
import React from 'react';
import type { CanvasElement } from '@/types/visualEditor';
import { Card } from '@/components/ui/card';

interface EditorCanvasProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  onElementSelect: (id: string) => void;
  onElementUpdate: (id: string, updates: any) => void;
  onElementMove: (id: string, direction: "up" | "down") => void;
  onElementDelete: (id: string) => void;
  onElementDuplicate: (id: string) => void;
  onElementAdd: (type: string, position?: number) => void;
  isPreviewMode: boolean;
  viewportMode: "desktop" | "tablet" | "mobile";
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  elements,
  selectedElementId,
  onElementSelect,
  isPreviewMode,
  viewportMode
}) => {
  const getViewportClass = () => {
    switch (viewportMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-full';
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      <div className={`mx-auto bg-white min-h-full ${getViewportClass()}`}>
        {elements.length === 0 ? (
          <div className="h-96 flex items-center justify-center text-gray-500">
            <p>Adicione componentes para começar a construir sua página</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {elements.map((element) => (
              <Card
                key={element.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedElementId === element.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => onElementSelect(element.id)}
              >
                <div className="text-sm text-gray-600 mb-2">
                  {element.type}
                </div>
                <div>
                  {element.content?.text || element.content?.html || 'Clique para editar'}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
