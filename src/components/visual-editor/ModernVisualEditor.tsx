
import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ComponentLibrarySidebar } from "./sidebar/ComponentLibrarySidebar";
import { EditorCanvas } from "./canvas/EditorCanvas";
import { EditorToolbar } from "./toolbar/EditorToolbar";
import { ElementPropertiesPanel } from "./properties/ElementPropertiesPanel";
import { useEditorState } from "@/hooks/useEditorState";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import type { VisualEditorState, ElementUpdate, CanvasElement } from "@/types/visualEditor";

interface VisualEditorData {
  editorState: VisualEditorState;
  pageInfo: {
    title: string;
    description: string;
    slug: string;
    published: boolean;
  };
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: VisualEditorData) => void;
  onPreview?: () => void;
  initialData?: VisualEditorData;
}

export function ModernVisualEditor({
  funnelId,
  initialData,
  onSave,
  onPreview,
}: ModernVisualEditorProps) {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  // Editor state management
  const {
    editorState,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    duplicateElement,
    updateGlobalStyles,
    reorderElements,
    exportState,
    importState,
  } = useEditorState(initialData);

  // Undo/Redo functionality
  const { canUndo, canRedo, undo, redo, saveState } = useUndoRedo(editorState);

  // Handlers
  const handleElementSelect = useCallback((elementId: string) => {
    setSelectedElementId(elementId);
  }, []);

  const handleElementUpdate = useCallback(
    (elementId: string, updates: ElementUpdate) => {
      updateElement(elementId, updates);
      saveState();
    },
    [updateElement, saveState]
  );

  const handleElementAdd = useCallback(
    (componentType: string, position?: number) => {
      const newElementId = addElement(componentType, position);
      setSelectedElementId(newElementId);
      saveState();
    },
    [addElement, saveState]
  );

  const handleElementMove = useCallback(
    (elementId: string, direction: "up" | "down") => {
      moveElement(elementId, direction);
      saveState();
    },
    [moveElement, saveState]
  );

  const handleElementDelete = useCallback(
    (elementId: string) => {
      removeElement(elementId);
      setSelectedElementId(null);
      saveState();
    },
    [removeElement, saveState]
  );

  const handleElementDuplicate = useCallback(
    (elementId: string) => {
      duplicateElement(elementId);
      saveState();
    },
    [duplicateElement, saveState]
  );

  const handleSave = useCallback(() => {
    const dataToSave: VisualEditorData = {
      editorState,
      pageInfo: {
        title: `Funnel ${funnelId}`,
        description: "",
        slug: `funnel-${funnelId}-${Date.now()}`,
        published: false,
      },
    };

    if (onSave) {
      onSave(dataToSave);
    }

    // Salvar no localStorage como backup
    localStorage.setItem(`modern-editor-${funnelId}`, exportState());
  }, [editorState, onSave, exportState, funnelId]);

  const handlePreviewToggle = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
    if (onPreview) {
      onPreview();
    }
  }, [isPreviewMode, onPreview]);

  const handleUndo = useCallback(() => {
    undo();
    setSelectedElementId(null);
  }, [undo]);

  const handleRedo = useCallback(() => {
    redo();
    setSelectedElementId(null);
  }, [redo]);

  // Obter elemento selecionado
  const selectedElement = selectedElementId
    ? editorState.elements.find((el) => el.id === selectedElementId)
    : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <EditorToolbar
          isPreviewing={isPreviewMode}
          onPreviewToggle={handlePreviewToggle}
          onSave={handleSave}
          config={editorState}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
        />

        {/* Main Editor Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Component Library Sidebar */}
          {!isPreviewMode && (
            <ComponentLibrarySidebar onComponentAdd={handleElementAdd} />
          )}

          {/* Canvas */}
          <EditorCanvas
            elements={editorState.elements}
            selectedElementId={selectedElementId}
            onElementSelect={handleElementSelect}
            onElementUpdate={handleElementUpdate}
            onElementMove={handleElementMove}
            onElementDelete={handleElementDelete}
            onElementDuplicate={handleElementDuplicate}
            onElementAdd={handleElementAdd}
            isPreviewMode={isPreviewMode}
            viewportMode={viewportMode}
          />

          {/* Properties Panel */}
          {!isPreviewMode && selectedElement && (
            <ElementPropertiesPanel
              element={selectedElement}
              onUpdate={(updates) =>
                handleElementUpdate(selectedElementId!, updates)
              }
              onClose={() => setSelectedElementId(null)}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
}
