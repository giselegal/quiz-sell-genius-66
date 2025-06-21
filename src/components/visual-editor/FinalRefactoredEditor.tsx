import React from "react";
import { useQuizEditor } from "../../hooks/useQuizEditorState";
import ComponentPalette from "./components/ComponentPalette";
import StepTree from "./components/StepTree";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import EditorToolbar from "./components/EditorToolbar";
import "@/styles/refactored-editor.css";

const FinalRefactoredEditor: React.FC = () => {
  const { state, currentStep, selectedComponent, actions } = useQuizEditor();

  // Handlers para drag & drop
  const handleDragStart = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>, componentType: string) => {
      event.dataTransfer.setData("component-type", componentType);
    },
    []
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const componentType = event.dataTransfer.getData("component-type");
      
      if (componentType) {
        actions.addComponent(componentType);
      }
    },
    [actions]
  );

  const handleDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // Handlers para toolbar
  const handleSave = React.useCallback(() => {
    // Simular salvamento
    setTimeout(() => {
      actions.markSaved();
    }, 1000);
  }, [actions]);

  const handlePreview = React.useCallback(() => {
    console.log("Preview do quiz:", state.steps);
    // Aqui você implementaria a lógica de preview
  }, [state.steps]);

  const handleExport = React.useCallback(() => {
    console.log("Exportar quiz:", state.steps);
    // Aqui você implementaria a lógica de exportação
  }, [state.steps]);

  const handleSettings = React.useCallback(() => {
    console.log("Abrir configurações");
    // Aqui você implementaria a modal de configurações
  }, []);

  return (
    <div className="advanced-quiz-editor">
      {/* Toolbar */}
      <EditorToolbar
        isDirty={state.isDirty}
        isSaving={false} // Você pode adicionar estado de loading aqui
        lastSaved={state.lastSaved}
        onSave={handleSave}
        onPreview={handlePreview}
        onExport={handleExport}
        onSettings={handleSettings}
      />

      {/* Layout principal */}
      <div className="editor-layout">
        {/* Coluna 1: Paleta de Componentes */}
        <div className="editor-column palette-column">
          <ComponentPalette onDragStart={handleDragStart} />
        </div>

        {/* Coluna 2: Árvore de Etapas */}
        <div className="editor-column tree-column">
          <StepTree
            steps={state.steps}
            currentStepId={state.currentStepId}
            onStepSelect={actions.selectStep}
            onStepAdd={actions.addStep}
            onStepDuplicate={actions.duplicateStep}
            onStepDelete={actions.deleteStep}
          />
        </div>

        {/* Coluna 3: Canvas */}
        <div className="editor-column canvas-column">
          <Canvas
            components={currentStep?.components || []}
            selectedComponentId={state.selectedComponentId}
            onComponentSelect={actions.selectComponent}
            onComponentUpdate={actions.updateComponent}
            onComponentDelete={actions.deleteComponent}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        </div>

        {/* Coluna 4: Painel de Propriedades */}
        <div className="editor-column properties-column">
          <PropertiesPanel
            selectedComponent={selectedComponent}
            onPropsUpdate={(newProps) => {
              if (state.selectedComponentId) {
                actions.updateComponent(state.selectedComponentId, newProps);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalRefactoredEditor;
