import React, { useState, useCallback, useMemo } from "react";
import ComponentPalette from "./components/ComponentPalette";
import StepTree from "./components/StepTree";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import { QuizComponent, QuizComponentProps, Step, OptionChoice } from "./types";
import "@/styles/advanced-editor.css";

const RefactoredAdvancedQuizEditor: React.FC = () => {
  // Estado principal do editor
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "step-1",
      name: "Boas-vindas",
      components: [
        {
          id: "comp-1",
          type: "heading",
          props: { text: "Bem-vindo ao Quiz!" },
        },
      ],
    },
  ]);

  const [currentStepId, setCurrentStepId] = useState<string>("step-1");
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );

  // Seletores memoizados para performance
  const currentStep = useMemo(
    () => steps.find((step) => step.id === currentStepId) || steps[0],
    [steps, currentStepId]
  );

  const selectedComponent = useMemo(
    () =>
      currentStep?.components.find((comp) => comp.id === selectedComponentId) ||
      null,
    [currentStep, selectedComponentId]
  );

  // Handlers memoizados para evitar re-renders desnecessários
  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, componentType: string) => {
      event.dataTransfer.setData("component-type", componentType);
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const componentType = event.dataTransfer.getData("component-type");

      if (componentType) {
        const newComponent: QuizComponent = {
          id: `comp-${Date.now()}`,
          type: componentType,
          props: getDefaultProps(componentType),
        };

        setSteps((prevSteps) =>
          prevSteps.map((step) =>
            step.id === currentStepId
              ? { ...step, components: [...step.components, newComponent] }
              : step
          )
        );
      }
    },
    [currentStepId]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleComponentSelect = useCallback((componentId: string) => {
    setSelectedComponentId(componentId);
  }, []);

  const handleComponentUpdate = useCallback(
    (componentId: string, newProps: QuizComponentProps) => {
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === currentStepId
            ? {
                ...step,
                components: step.components.map((comp) =>
                  comp.id === componentId
                    ? { ...comp, props: { ...comp.props, ...newProps } }
                    : comp
                ),
              }
            : step
        )
      );
    },
    [currentStepId]
  );

  const handleComponentDelete = useCallback(
    (componentId: string) => {
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === currentStepId
            ? {
                ...step,
                components: step.components.filter(
                  (comp) => comp.id !== componentId
                ),
              }
            : step
        )
      );

      if (selectedComponentId === componentId) {
        setSelectedComponentId(null);
      }
    },
    [currentStepId, selectedComponentId]
  );

  const handleStepAdd = useCallback(() => {
    const newStep: Step = {
      id: `step-${Date.now()}`,
      name: `Etapa ${steps.length + 1}`,
      components: [],
    };

    setSteps((prevSteps) => [...prevSteps, newStep]);
    setCurrentStepId(newStep.id);
    setSelectedComponentId(null);
  }, [steps.length]);

  const handleStepSelect = useCallback((stepId: string) => {
    setCurrentStepId(stepId);
    setSelectedComponentId(null);
  }, []);

  const handleStepDuplicate = useCallback(
    (stepId: string) => {
      const stepToDuplicate = steps.find((step) => step.id === stepId);
      if (stepToDuplicate) {
        const duplicatedStep: Step = {
          id: `step-${Date.now()}`,
          name: `${stepToDuplicate.name} (Cópia)`,
          components: stepToDuplicate.components.map((comp) => ({
            ...comp,
            id: `comp-${Date.now()}-${Math.random()}`,
          })),
        };

        setSteps((prevSteps) => [...prevSteps, duplicatedStep]);
      }
    },
    [steps]
  );

  const handleStepDelete = useCallback(
    (stepId: string) => {
      if (steps.length > 1) {
        setSteps((prevSteps) => prevSteps.filter((step) => step.id !== stepId));

        if (currentStepId === stepId) {
          const remainingSteps = steps.filter((step) => step.id !== stepId);
          setCurrentStepId(remainingSteps[0]?.id || "");
          setSelectedComponentId(null);
        }
      }
    },
    [steps, currentStepId]
  );

  const handlePropsUpdate = useCallback(
    (newProps: QuizComponentProps) => {
      if (selectedComponentId) {
        handleComponentUpdate(selectedComponentId, newProps);
      }
    },
    [selectedComponentId, handleComponentUpdate]
  );

  // Função utilitária para propriedades padrão
  function getDefaultProps(componentType: string): QuizComponentProps {
    switch (componentType) {
      case "heading":
        return { text: "Novo Título" };
      case "text":
        return { text: "Texto de exemplo" };
      case "image":
        return { src: "", alt: "Imagem" };
      case "button":
        return { buttonText: "Clique aqui", buttonStyle: "primary" };
      case "input":
        return {
          label: "Campo",
          placeholder: "Digite aqui...",
          inputType: "text",
        };
      case "options":
        return {
          questionText: "Escolha uma opção:",
          selectionType: "single",
          choices: [
            { text: "Opção 1", value: "option1" },
            { text: "Opção 2", value: "option2" },
          ],
        };
      case "alert":
        return { alertType: "info", alertMessage: "Mensagem de alerta" };
      case "video":
        return { videoUrl: "", controls: true };
      case "spacer":
        return { height: 20 };
      default:
        return {};
    }
  }

  return (
    <div className="advanced-quiz-editor">
      <div className="editor-layout">
        {/* Coluna 1: Paleta de Componentes */}
        <div className="editor-column palette-column">
          <ComponentPalette onDragStart={handleDragStart} />
        </div>

        {/* Coluna 2: Árvore de Etapas */}
        <div className="editor-column tree-column">
          <StepTree
            steps={steps}
            currentStepId={currentStepId}
            onStepSelect={handleStepSelect}
            onStepAdd={handleStepAdd}
            onStepDuplicate={handleStepDuplicate}
            onStepDelete={handleStepDelete}
          />
        </div>

        {/* Coluna 3: Canvas */}
        <div className="editor-column canvas-column">
          <Canvas
            components={currentStep?.components || []}
            selectedComponentId={selectedComponentId}
            onComponentSelect={handleComponentSelect}
            onComponentUpdate={handleComponentUpdate}
            onComponentDelete={handleComponentDelete}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        </div>

        {/* Coluna 4: Painel de Propriedades */}
        <div className="editor-column properties-column">
          <PropertiesPanel
            selectedComponent={selectedComponent}
            onPropsUpdate={handlePropsUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default RefactoredAdvancedQuizEditor;
