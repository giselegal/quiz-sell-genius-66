
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualEditorToolbar } from '@/components/visual-editor/toolbar/VisualEditorToolbar';
import { UnifiedSidebar } from '@/components/visual-editor/sidebar/UnifiedSidebar';
import { VisualEditorCanvas } from '@/components/visual-editor/canvas/VisualEditorCanvas';
import { PropertiesPanel } from '@/components/visual-editor/properties/VisualEditorProperties';
import { useVisualEditor } from '@/hooks/useVisualEditor';
import { BlockType } from '@/types/visualEditor';

const VisualEditorPage: React.FC = () => {
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
    addStage,
    setActiveStage,
    saveProject,
    canUndo,
    canRedo,
    undo,
    redo
  } = useVisualEditor();

  const handleElementAdd = useCallback((type: BlockType, position?: number) => {
    const elementId = addElement(type, activeStageId, position);
    setSelectedElementId(elementId);
  }, [addElement, activeStageId]);

  const handleElementSelect = useCallback((elementId: string) => {
    setSelectedElementId(elementId);
  }, []);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    updateElement(elementId, updates);
  }, [updateElement]);

  const handleSave = useCallback(async () => {
    await saveProject();
  }, [saveProject]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <VisualEditorToolbar
          isPreviewing={isPreviewMode}
          onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)}
          onSave={handleSave}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {!isPreviewMode && (
            <UnifiedSidebar
              stages={stages}
              activeStageId={activeStageId}
              onStageSelect={setActiveStage}
              onStageAdd={addStage}
              onComponentAdd={handleElementAdd}
              elements={elements}
            />
          )}
          
          <VisualEditorCanvas
            elements={elements}
            stages={stages}
            activeStageId={activeStageId}
            selectedElementId={selectedElementId}
            isPreviewMode={isPreviewMode}
            viewportMode={viewportMode}
            onElementSelect={handleElementSelect}
            onElementUpdate={handleElementUpdate}
            onElementDelete={deleteElement}
            onElementMove={moveElement}
            onElementAdd={handleElementAdd}
            onStageAdd={addStage}
            onStageSelect={setActiveStage}
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

export default VisualEditorPage;
