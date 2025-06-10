
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualEditorToolbar } from './toolbar/VisualEditorToolbar';
import { ResultPageSidebar } from './sidebar/ResultPageSidebar';
import { ResultPageCanvas } from './canvas/ResultPageCanvas';
import { PropertiesPanel } from './properties/VisualEditorProperties';
import { useResultPageVisualEditor } from '@/hooks/useResultPageVisualEditor';
import { ResultPageBlockType } from '@/types/resultPageEditor';
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
    elements,
    stages,
    activeStageId,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    saveProject
  } = useResultPageVisualEditor(primaryStyle, secondaryStyles);

  const handleElementAdd = (type: ResultPageBlockType, position?: number) => {
    const elementId = addElement(type, position);
    setSelectedElementId(elementId);
  };

  const handleElementSelect = (elementId: string) => {
    setSelectedElementId(elementId);
  };

  const handleElementUpdate = (elementId: string, updates: any) => {
    updateElement(elementId, updates);
  };

  const handleSave = async () => {
    const success = await saveProject();
    if (success && onSave) {
      onSave({
        elements,
        primaryStyle,
        secondaryStyles
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <VisualEditorToolbar
          isPreviewing={isPreviewMode}
          onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)}
          onSave={handleSave}
          canUndo={false}
          canRedo={false}
          onUndo={() => {}}
          onRedo={() => {}}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {!isPreviewMode && (
            <ResultPageSidebar
              onComponentAdd={handleElementAdd}
              primaryStyle={primaryStyle}
            />
          )}
          
          <ResultPageCanvas
            elements={elements}
            primaryStyle={primaryStyle}
            selectedElementId={selectedElementId}
            isPreviewMode={isPreviewMode}
            viewportMode={viewportMode}
            onElementSelect={handleElementSelect}
            onElementUpdate={handleElementUpdate}
            onElementDelete={deleteElement}
            onElementMove={moveElement}
            onElementAdd={handleElementAdd}
          />
          
          {!isPreviewMode && selectedElementId && (
            <PropertiesPanel
              elementId={selectedElementId}
              element={elements.find(el => el.id === selectedElementId)}
              onUpdate={(updates) => handleElementUpdate(selectedElementId, updates)}
              onClose={() => setSelectedElementId(null)}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};
