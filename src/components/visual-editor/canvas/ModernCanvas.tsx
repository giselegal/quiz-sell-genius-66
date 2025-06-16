
import React from 'react';
import { ModernElementRenderer } from './ModernElementRenderer';
import { EditorElement } from '@/hooks/useModernEditor';

interface ModernCanvasProps {
  elements: EditorElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
  onAddElement: (type: string) => void;
  isPreviewMode: boolean;
  viewport: 'desktop' | 'tablet' | 'mobile';
}

export const ModernCanvas: React.FC<ModernCanvasProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  isPreviewMode,
  viewport
}) => {
  // Sort elements by order
  const sortedElements = [...elements].sort((a, b) => a.order - b.order);

  const getCanvasStyle = () => {
    switch (viewport) {
      case 'mobile':
        return { maxWidth: '375px', margin: '0 auto' };
      case 'tablet':
        return { maxWidth: '768px', margin: '0 auto' };
      default:
        return { width: '100%' };
    }
  };

  const handleMoveUp = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (!element || element.order <= 1) return;
    
    onUpdateElement(elementId, { order: element.order - 1 });
  };

  const handleMoveDown = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    const maxOrder = Math.max(...elements.map(el => el.order));
    if (!element || element.order >= maxOrder) return;
    
    onUpdateElement(elementId, { order: element.order + 1 });
  };

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      <div className="min-h-full" style={getCanvasStyle()}>
        {sortedElements.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <div className="text-gray-400 text-lg mb-4">
                Canvas vazio
              </div>
              <p className="text-gray-500 text-sm">
                Selecione uma etapa e adicione componentes da barra lateral
              </p>
            </div>
          </div>
        ) : (
          <div className={`${isPreviewMode ? '' : 'min-h-screen'}`}>
            {sortedElements.map((element, index) => {
              const canMoveUp = index > 0;
              const canMoveDown = index < sortedElements.length - 1;
              
              return (
                <ModernElementRenderer
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                  isPreviewMode={isPreviewMode}
                  onSelect={() => onSelectElement(element.id)}
                  onUpdate={(updates) => onUpdateElement(element.id, updates)}
                  onDelete={() => onDeleteElement(element.id)}
                  onMoveUp={() => handleMoveUp(element.id)}
                  onMoveDown={() => handleMoveDown(element.id)}
                  canMoveUp={canMoveUp}
                  canMoveDown={canMoveDown}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
