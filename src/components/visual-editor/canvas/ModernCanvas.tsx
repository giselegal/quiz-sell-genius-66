
import React from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { ModernElementRenderer } from './ModernElementRenderer';

interface ModernCanvasProps {
  elements: EditorElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
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

  const getCanvasStyle = () => {
    const baseStyle = {
      minHeight: '100vh',
      position: 'relative' as const,
    };

    if (showGrid && !isPreviewMode) {
      return {
        ...baseStyle,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      };
    }

    return baseStyle;
  };

  if (elements.length === 0 && !isPreviewMode) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Comece criando sua página
          </h3>
          <p className="text-gray-500 max-w-sm">
            Adicione componentes da sidebar para começar a construir sua página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
          <div
            style={getCanvasStyle()}
            onClick={handleCanvasClick}
            className="relative"
          >
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
