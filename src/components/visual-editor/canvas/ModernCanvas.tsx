
import React, { useCallback } from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { ModernElementRenderer } from './ModernElementRenderer';

interface ModernCanvasProps {
  elements: EditorElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
  onAddElement: (type: string, position?: { x: number; y: number }) => void;
  isPreviewMode: boolean;
  viewport: 'desktop' | 'tablet' | 'mobile';
  showGrid?: boolean;
  className?: string;
}

export const ModernCanvas: React.FC<ModernCanvasProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
  isPreviewMode,
  viewport,
  showGrid = true,
  className = ''
}) => {
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('text/plain');
    
    if (componentType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      onAddElement(componentType, { x: Math.max(0, x - 100), y: Math.max(0, y - 50) });
    }
  }, [onAddElement]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const getCanvasStyle = () => {
    const baseStyle = {
      minHeight: '100vh',
      position: 'relative' as const,
    };

    if (showGrid && !isPreviewMode) {
      return {
        ...baseStyle,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      };
    }

    return baseStyle;
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'w-full';
    }
  };

  if (elements.length === 0 && !isPreviewMode) {
    return (
      <div 
        className="h-full flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Comece criando sua página
          </h3>
          <p className="text-gray-500 max-w-sm mb-4">
            Arraste componentes da sidebar ou clique neles para começar a construir sua página.
          </p>
          <div className="text-sm text-gray-400">
            💡 Dica: Use Ctrl+Z para desfazer e Ctrl+Y para refazer
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${getViewportWidth()} ${className}`}>
          <div
            style={getCanvasStyle()}
            onClick={handleCanvasClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative"
          >
            {/* Drop indicator */}
            <div className="absolute inset-0 pointer-events-none">
              {!isPreviewMode && (
                <div className="absolute top-4 left-4 text-xs text-gray-400 bg-white px-2 py-1 rounded shadow-sm">
                  {viewport === 'mobile' ? '📱 Mobile' : viewport === 'tablet' ? '📟 Tablet' : '🖥️ Desktop'}
                </div>
              )}
            </div>

            {elements.map((element) => (
              <ModernElementRenderer
                key={element.id}
                element={element}
                isSelected={selectedElementId === element.id}
                isPreviewMode={isPreviewMode}
                onSelect={() => onSelectElement(element.id)}
                onUpdate={(updates) => onUpdateElement(element.id, updates)}
                onDelete={() => onDeleteElement(element.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
