
import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ComponentLibrarySidebar } from "./sidebar/ComponentLibrarySidebar";
import { EditorCanvas } from "./canvas/EditorCanvas";
import { EditorToolbar } from "./toolbar/EditorToolbar";
import { ElementPropertiesPanel } from "./properties/ElementPropertiesPanel";
import { useEditorState } from "@/hooks/useEditorState";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import type { VisualEditorState, ElementUpdate } from "@/types/visualEditor";
import { EditableQuizIntro } from './intro/EditableQuizIntro';

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
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave,
  onPreview
}) => {
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
  } = useEditorState();

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
        title: "Página sem título",
        description: "",
        slug: `page-${Date.now()}`,
        published: false,
      },
    };

    if (onSave) {
      onSave(dataToSave);
    }

    // Salvar no localStorage como backup
    localStorage.setItem("quiz-editor-backup", exportState());
  }, [editorState, onSave, exportState]);

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

    const activeStage = editorState.stages.find(stage => stage.id === editorState.activeStageId);

  const renderStageContent = () => {
    if (!activeStage) return null;

    switch (activeStage.id) {
      case 'intro':
        return (
          <EditableQuizIntro 
            isPreviewMode={isPreviewMode}
            onStart={(name) => console.log('Quiz started with name:', name)}
          />
        );

      case 'questions':
        return (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Questões do Quiz</h3>
              <p className="text-sm">Adicione e configure as questões aqui.</p>
            </div>
          </div>
        );

      case 'strategic':
        return (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Questões Estratégicas</h3>
              <p className="text-sm">Defina as questões estratégicas aqui.</p>
            </div>
          </div>
        );

      case 'transition':
        return (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Página de Transição</h3>
              <p className="text-sm">Configure a transição para a próxima etapa.</p>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Página de Resultado</h3>
              <p className="text-sm">Ajuste a página de resultado aqui.</p>
            </div>
          </div>
        );

      case 'offer':
        return (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Página de Oferta</h3>
              <p className="text-sm">Configure a página de oferta final.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Etapa não implementada</h3>
              <p className="text-sm">Tipo: {activeStage.id}</p>
            </div>
          </div>
        );
    }
  };

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

          {/* Canvas - Renderiza conteúdo baseado na stage ativa */}
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: "100%", minHeight: "600px" }}>
              {renderStageContent()}
            </div>
          </div>

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
