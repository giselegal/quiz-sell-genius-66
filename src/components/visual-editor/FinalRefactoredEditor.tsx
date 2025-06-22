import React from "react";
import "@/styles/advanced-editor.css";

// Importações condicionais com fallbacks
let useQuizEditor: any;
let ComponentPalette: any;
let StepTree: any;
let Canvas: any;
let PropertiesPanel: any;
let EditorToolbar: any;

try {
  useQuizEditor = require("../../hooks/useQuizEditorState").useQuizEditor;
  ComponentPalette = require("./components/ComponentPalette").default;
  StepTree = require("./components/StepTree").default;
  Canvas = require("./components/Canvas").default;
  PropertiesPanel = require("./components/PropertiesPanel").default;
  EditorToolbar = require("./components/EditorToolbar").default;
} catch (error) {
  console.error("Erro ao importar componentes:", error);
}

const FinalRefactoredEditor: React.FC = () => {
  // Fallback se não conseguir carregar o hook
  let state, currentStep, selectedComponent, actions;
  
  try {
    if (useQuizEditor) {
      const editorState = useQuizEditor();
      state = editorState.state;
      currentStep = editorState.currentStep;
      selectedComponent = editorState.selectedComponent;
      actions = editorState.actions;
    }
  } catch (error) {
    console.error("Erro ao usar hook:", error);
  }

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
      if (componentType && actions?.addComponent) {
        actions.addComponent(componentType);
      }
    },
    [actions]
  );

  const handleDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // Se não conseguiu carregar os componentes, renderiza versão simples
  if (!ComponentPalette || !StepTree || !Canvas || !PropertiesPanel || !EditorToolbar) {
    return (
      <div className="advanced-quiz-editor">
        <div className="editor-layout">
          <div className="editor-column palette-column">
            <div className="component-palette">
              <h2 className="palette-title">Componentes</h2>
              <div className="components-grid">
                <div className="draggable-component">
                  <span className="component-icon">📝</span>
                  <span className="component-label">Título</span>
                </div>
                <div className="draggable-component">
                  <span className="component-icon">📄</span>
                  <span className="component-label">Texto</span>
                </div>
              </div>
            </div>
          </div>

          <div className="editor-column tree-column">
            <div className="step-tree">
              <div className="tree-header">
                <h2 className="tree-title">Etapas</h2>
              </div>
              <div className="steps-list">
                <div className="step-item active">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <span className="step-name">Primeira Etapa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="editor-column canvas-column">
            <div className="canvas-container">
              <div className="canvas-header">
                <h2 className="canvas-title">Canvas</h2>
              </div>
              <div className="canvas-area">
                <div className="canvas-empty">
                  <p>Editor Carregado com Fallback - Componentes modulares com erro</p>
                </div>
              </div>
            </div>
          </div>

          <div className="editor-column properties-column">
            <div className="properties-panel">
              <h2 className="panel-title">Propriedades</h2>
              <div className="no-selection">
                <p>Modo de fallback ativo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

      if (componentType) {
        actions.addComponent(componentType);
      }
    },
    [actions]
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

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
