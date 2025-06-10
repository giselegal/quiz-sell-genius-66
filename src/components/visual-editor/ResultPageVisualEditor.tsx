
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualEditorToolbar } from './toolbar/VisualEditorToolbar';
import { ResultPageSidebar } from './sidebar/ResultPageSidebar';
import { ResultPageCanvas } from './canvas/ResultPageCanvas';
import { useResultPageBuilder } from '@/hooks/useResultPageBuilder';
import { ResultPageBlockType } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';

interface ResultPageVisualEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  onSave?: (config: any) => void;
  onPreview?: () => void;
}

export const ResultPageVisualEditor: React.FC<ResultPageVisualEditorProps> = ({
  primaryStyle,
  secondaryStyles,
  onSave,
  onPreview
}) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const {
    blocks,
    selectedBlockId,
    isPreviewMode: builderPreviewMode,
    setSelectedBlockId,
    setIsPreviewMode: setBuilderPreviewMode,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    saveConfiguration,
    loadConfiguration
  } = useResultPageBuilder(primaryStyle, secondaryStyles);

  const handleElementAdd = (type: ResultPageBlockType) => {
    const elementId = addBlock(type);
    setSelectedBlockId(elementId);
  };

  const handleElementSelect = (elementId: string) => {
    setSelectedBlockId(elementId);
  };

  const handleElementUpdate = (elementId: string, updates: any) => {
    updateBlock(elementId, updates);
  };

  const handleSave = async () => {
    const success = await saveConfiguration();
    if (success && onSave) {
      onSave({
        blocks,
        primaryStyle,
        secondaryStyles
      });
    }
  };

  const handlePreview = () => {
    setBuilderPreviewMode(!builderPreviewMode);
    if (onPreview) {
      onPreview();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <VisualEditorToolbar
          isPreviewing={builderPreviewMode}
          onPreviewToggle={handlePreview}
          onSave={handleSave}
          canUndo={false}
          canRedo={false}
          onUndo={() => {}}
          onRedo={() => {}}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {!builderPreviewMode && (
            <ResultPageSidebar
              onComponentAdd={handleElementAdd}
              primaryStyle={primaryStyle}
            />
          )}
          
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="mx-auto max-w-5xl">
              <div 
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
                style={{ minHeight: '600px' }}
              >
                <div className="container mx-auto px-4 sm:px-6 py-8 relative z-10">
                  <p className="text-center text-gray-500 py-20">
                    Canvas do Editor Visual - Componentes aparecerão aqui
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {!builderPreviewMode && selectedBlockId && (
            <div className="w-80 bg-white border-l border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">Propriedades</h3>
                <button
                  onClick={() => setSelectedBlockId(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Fechar
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Elemento selecionado: {selectedBlockId}
                </p>
                <button
                  onClick={() => handleElementUpdate(selectedBlockId, {})}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Atualizar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};
