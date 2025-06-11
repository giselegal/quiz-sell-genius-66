
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Monitor, Smartphone } from 'lucide-react';
import { VisualElement, VisualStage } from '@/types/visualEditor';
import { ElementRenderer } from './ElementRenderer';
import { cn } from '@/lib/utils';

interface VisualEditorCanvasProps {
  elements: VisualElement[];
  stages: VisualStage[];
  activeStageId: string | null;
  selectedElementId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: Partial<VisualElement>) => void;
  onElementDelete: (elementId: string) => void;
  onElementMove: (elementId: string, direction: 'up' | 'down') => void;
  onElementAdd: (type: any, position?: number) => void;
  onStageAdd: () => void;
  onStageSelect: (stageId: string) => void;
}

export const VisualEditorCanvas: React.FC<VisualEditorCanvasProps> = ({
  elements,
  stages,
  activeStageId,
  selectedElementId,
  isPreviewMode,
  viewportMode,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onElementMove,
  onElementAdd,
  onStageAdd,
  onStageSelect
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const activeStageElements = elements.filter(el => el.stageId === activeStageId);
  const sortedElements = activeStageElements.sort((a, b) => a.order - b.order);

  const handleMoveElement = useCallback((elementId: string, direction: 'up' | 'down') => {
    onElementMove(elementId, direction);
  }, [onElementMove]);

  const getViewportStyles = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-6xl mx-auto';
    }
  };

  const quickAddElements = [
    { type: 'title', label: 'Título', icon: '📝' },
    { type: 'text', label: 'Texto', icon: '📄' },
    { type: 'button', label: 'Botão', icon: '🔘' },
    { type: 'image', label: 'Imagem', icon: '🖼️' },
    { type: 'spacer', label: 'Espaçador', icon: '📏' }
  ];

  return (
    <div className="flex-1 bg-[#FAF9F7] relative overflow-auto">
      {/* Canvas Header */}
      {!isPreviewMode && (
        <div className="sticky top-0 bg-white border-b border-[#B89B7A]/20 p-4 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-medium text-[#432818]">
                Canvas - {stages.find(s => s.id === activeStageId)?.title || 'Página'}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className="text-[#432818] border-[#B89B7A]/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8F7A6A]">
                {viewportMode === 'desktop' && <Monitor className="w-4 h-4" />}
                {viewportMode === 'tablet' && <Monitor className="w-4 h-4" />}
                {viewportMode === 'mobile' && <Smartphone className="w-4 h-4" />}
              </span>
            </div>
          </div>

          {/* Quick Add Menu */}
          {showAddMenu && (
            <div className="absolute top-full left-4 mt-2 bg-white border border-[#B89B7A]/20 rounded-lg shadow-lg p-2 z-50">
              <div className="grid grid-cols-2 gap-2">
                {quickAddElements.map((element) => (
                  <Button
                    key={element.type}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onElementAdd(element.type);
                      setShowAddMenu(false);
                    }}
                    className="flex items-center gap-2 text-left justify-start"
                  >
                    <span>{element.icon}</span>
                    <span>{element.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Canvas Content */}
      <div className={cn("p-8", getViewportStyles())}>
        <div className="bg-white min-h-[600px] rounded-lg shadow-lg overflow-hidden">
          {sortedElements.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-medium text-[#432818] mb-2">
                Canvas Vazio
              </h3>
              <p className="text-[#8F7A6A] mb-6">
                Adicione elementos para começar a criar sua página
              </p>
              {!isPreviewMode && (
                <Button
                  onClick={() => onElementAdd('title')}
                  className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Elemento
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4 p-6">
              {sortedElements.map((element, index) => (
                <ElementRenderer
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                  isPreviewMode={isPreviewMode}
                  onSelect={() => onElementSelect(element.id)}
                  onUpdate={(updates) => onElementUpdate(element.id, updates)}
                  onDelete={() => onElementDelete(element.id)}
                  onMoveUp={() => handleMoveElement(element.id, 'up')}
                  onMoveDown={() => handleMoveElement(element.id, 'down')}
                  canMoveUp={index > 0}
                  canMoveDown={index < sortedElements.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
