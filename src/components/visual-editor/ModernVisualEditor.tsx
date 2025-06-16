import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { StepsPanel } from "./steps/StepsPanel";
import { ComponentsPalette } from "./sidebar/ComponentsPalette";
import { StageConfigurationPanel } from "./panels/StageConfigurationPanel";
import { OptionConfigurationPanel } from "./panels/OptionConfigurationPanel";
import { EditableCanvas } from "./canvas/EditableCanvas";
import { useSupabaseQuestions } from "@/hooks/useSupabaseQuestions";
import { Eye, Save, Monitor, Tablet, Smartphone } from "lucide-react";

interface EditorStage {
  id: string;
  name: string;
  type: "intro" | "quiz" | "transition" | "result" | "offer" | "strategic";
  questionData?: any;
  order?: number;
}

interface CanvasElement {
  id: string;
  type:
    | "headline"
    | "text"
    | "image"
    | "form"
    | "button"
    | "question-title"
    | "question-options";
  content: any;
  order: number;
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave,
}) => {
  const { questions, strategicQuestions, loading, error } =
    useSupabaseQuestions();
  const [stages, setStages] = useState<EditorStage[]>([]);
  const [currentStage, setCurrentStage] = useState<string>("intro");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [showOptionConfig, setShowOptionConfig] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  // Canvas elements state
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  // Generate stages from Supabase data
  useEffect(() => {
    if (!loading && (questions.length > 0 || strategicQuestions.length > 0)) {
      const newStages: EditorStage[] = [];

      // 1. Intro stage
      newStages.push({
        id: "intro",
        name: "Introdução",
        type: "intro",
        order: 0,
      });

      // 2. Regular questions (1-10)
      questions.forEach((question, index) => {
        newStages.push({
          id: `question-${question.id}`,
          name: `Questão ${index + 1}`,
          type: "quiz",
          questionData: question,
          order: index + 1,
        });
      });

      // 3. Transition to strategic questions
      if (strategicQuestions.length > 0) {
        newStages.push({
          id: "transition-strategic",
          name: "Transição Estratégica",
          type: "transition",
          order: questions.length + 1,
        });

        // 4. Strategic questions
        strategicQuestions.forEach((question, index) => {
          newStages.push({
            id: `strategic-${question.id}`,
            name: `Estratégica ${index + 1}`,
            type: "strategic",
            questionData: question,
            order: questions.length + 2 + index,
          });
        });
      }

      // 5. Final stages
      const finalOrder = questions.length + strategicQuestions.length + 2;
      newStages.push(
        {
          id: "transition-result",
          name: "Transição Resultado",
          type: "transition",
          order: finalOrder,
        },
        {
          id: "result",
          name: "Resultado",
          type: "result",
          order: finalOrder + 1,
        },
        {
          id: "offer",
          name: "Oferta",
          type: "offer",
          order: finalOrder + 2,
        }
      );

      setStages(newStages);
      console.log("✅ Generated stages from Supabase:", newStages.length);
    }
  }, [questions, strategicQuestions, loading]);

  // Generate canvas elements based on current stage
  useEffect(() => {
    const currentStageData = stages.find((s) => s.id === currentStage);
    if (!currentStageData) return;

    let elements: CanvasElement[] = [];

    switch (currentStageData.type) {
      case "intro":
        elements = [
          {
            id: "intro-headline",
            type: "headline",
            content: { text: "Descubra Seu Estilo Pessoal", level: 1 },
            order: 0,
          },
          {
            id: "intro-image",
            type: "image",
            content: {
              src: "https://cakto-quiz-br01.b-cdn.net/uploads/ecbe689b-1c0a-4071-98d3-4d391b6dd98f.png",
              alt: "Quiz de estilo",
              width: 640,
              height: 480,
            },
            order: 1,
          },
          {
            id: "intro-form",
            type: "form",
            content: {
              label: "SEU NOME",
              placeholder: "Digite seu nome aqui...",
              required: true,
              type: "text",
            },
            order: 2,
          },
          {
            id: "intro-button",
            type: "button",
            content: { text: "Começar Quiz" },
            order: 3,
          },
        ];
        break;

      case "quiz":
      case "strategic":
        const questionData = currentStageData.questionData;
        if (questionData) {
          elements = [
            {
              id: "question-title",
              type: "question-title",
              content: { text: questionData.title || "Título da questão" },
              order: 0,
            },
            {
              id: "question-options",
              type: "question-options",
              content: {
                options: questionData.options || [],
                multiSelect: questionData.multiSelect || false,
              },
              order: 1,
            },
          ];
        }
        break;

      case "transition":
        elements = [
          {
            id: "transition-headline",
            type: "headline",
            content: { text: "Você está indo muito bem!", level: 2 },
            order: 0,
          },
          {
            id: "transition-text",
            type: "text",
            content: { text: "Vamos continuar..." },
            order: 1,
          },
          {
            id: "transition-button",
            type: "button",
            content: { text: "Continuar" },
            order: 2,
          },
        ];
        break;

      case "result":
        elements = [
          {
            id: "result-headline",
            type: "headline",
            content: { text: "Seu Resultado Está Pronto!", level: 1 },
            order: 0,
          },
          {
            id: "result-text",
            type: "text",
            content: {
              text: "Descobrimos seu estilo predominante baseado nas suas respostas.",
            },
            order: 1,
          },
          {
            id: "result-button",
            type: "button",
            content: { text: "Ver Oferta Especial" },
            order: 2,
          },
        ];
        break;

      case "offer":
        elements = [
          {
            id: "offer-headline",
            type: "headline",
            content: { text: "Oferta Especial Para Você!", level: 1 },
            order: 0,
          },
          {
            id: "offer-text",
            type: "text",
            content: {
              text: "Baseado no seu estilo, temos uma consultoria exclusiva com desconto especial.",
            },
            order: 1,
          },
          {
            id: "offer-button",
            type: "button",
            content: { text: "Quero Aproveitar" },
            order: 2,
          },
        ];
        break;
    }

    setCanvasElements(elements);
    setSelectedElementId(null);
  }, [currentStage, stages]);

  const handleSave = useCallback(() => {
    const data = {
      stages,
      currentStage,
      canvasElements,
      settings: {
        viewportMode,
        isPreviewMode,
      },
    };
    console.log("Saving:", data);
    onSave?.(data);
  }, [
    stages,
    currentStage,
    canvasElements,
    viewportMode,
    isPreviewMode,
    onSave,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSave();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleSave]);

  const handleStageSelect = (stageId: string) => {
    setCurrentStage(stageId);
    setSelectedElementId(null);
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
    handleElementAdd(componentType);
  };

  const handleElementAdd = (type: string, position?: number) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: type as any,
      content: getDefaultContent(type),
      order: position ?? canvasElements.length,
    };

    setCanvasElements((prev) => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case "headline":
        return { text: "Novo Título", level: 1 };
      case "text":
        return { text: "Novo texto", size: "base", align: "left" };
      case "image":
        return {
          src: "https://via.placeholder.com/400x200",
          alt: "Nova imagem",
          width: 400,
          height: 200,
        };
      case "form":
        return {
          label: "Novo Campo",
          placeholder: "Digite aqui...",
          required: false,
          type: "text",
        };
      case "button":
        return { text: "Novo Botão" };
      case "question-title":
        return { text: "Nova Questão" };
      case "question-options":
        return { options: [], multiSelect: false };
      default:
        return {};
    }
  };

  const handleElementUpdate = (id: string, content: any) => {
    setCanvasElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content } : el))
    );
  };

  const handleElementDelete = (id: string) => {
    setCanvasElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  const handleElementReorder = (draggedId: string, targetId: string) => {
    const draggedIndex = canvasElements.findIndex((el) => el.id === draggedId);
    const targetIndex = canvasElements.findIndex((el) => el.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newElements = [...canvasElements];
    const [draggedElement] = newElements.splice(draggedIndex, 1);
    newElements.splice(targetIndex, 0, draggedElement);

    const updatedElements = newElements.map((el, index) => ({
      ...el,
      order: index,
    }));

    setCanvasElements(updatedElements);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando questões do Supabase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Erro ao carregar questões: {error}
          </p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">
              Editor Visual - Quiz Supabase
            </h1>
            <Badge variant="outline" className="border-blue-500 text-blue-700">
              {funnelId}
            </Badge>
            <Badge variant="secondary">
              {questions.length} questões • {strategicQuestions.length}{" "}
              estratégicas
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport Controls */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewportMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewportMode("desktop")}
                className="rounded-r-none"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewportMode("tablet")}
                className="rounded-none border-x"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewportMode("mobile")}
                className="rounded-l-none"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Toggle */}
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? "Edição" : "Preview"}
            </Button>

            {/* Save Button */}
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Resizable 4 Columns Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Column - Steps Panel */}
          <ResizablePanel defaultSize={12} minSize={8} maxSize={20}>
            <div className="h-full bg-white border-r border-gray-200">
              <StepsPanel
                stages={stages}
                currentStage={currentStage}
                onStageSelect={handleStageSelect}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Second Column - Components Palette */}
          <ResizablePanel defaultSize={15} minSize={12} maxSize={25}>
            <div className="h-full bg-gray-50 border-r border-gray-200">
              <ComponentsPalette
                onComponentSelect={handleComponentSelect}
                selectedComponent={selectedComponent}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Third Column - Editor Canvas (Preview Only) */}
          <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
            <div className="h-full overflow-auto bg-gray-100 p-6">
              <div
                className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${
                  viewportMode === "desktop"
                    ? "max-w-4xl"
                    : viewportMode === "tablet"
                    ? "max-w-xl"
                    : "max-w-sm"
                }`}
              >
                <EditableCanvas
                  elements={canvasElements}
                  selectedElementId={selectedElementId}
                  isPreviewMode={isPreviewMode}
                  onElementSelect={setSelectedElementId}
                  onElementUpdate={handleElementUpdate}
                  onElementAdd={handleElementAdd}
                  onElementReorder={handleElementReorder}
                  onElementDelete={handleElementDelete}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Fourth Column - Configuration Panel (Expanded) */}
          <ResizablePanel defaultSize={33} minSize={25} maxSize={45}>
            <div className="h-full bg-white border-l border-gray-200">
              <div className="h-full overflow-auto">
                <StageConfigurationPanel
                  stageName={
                    stages.find((s) => s.id === currentStage)?.name || ""
                  }
                  stageType={currentStage}
                  questionData={
                    stages.find((s) => s.id === currentStage)?.questionData
                  }
                  onUpdate={(updatedData) => {
                    // Update the stage data
                    setStages((prev) =>
                      prev.map((stage) =>
                        stage.id === currentStage
                          ? { ...stage, questionData: updatedData }
                          : stage
                      )
                    );

                    // Update canvas elements if it's a question
                    if (
                      currentStage.startsWith("question-") ||
                      currentStage.startsWith("strategic-")
                    ) {
                      const updatedElements = canvasElements.map((el) => {
                        if (el.type === "question-title") {
                          return {
                            ...el,
                            content: { text: updatedData.title },
                          };
                        }
                        if (el.type === "question-options") {
                          return {
                            ...el,
                            content: {
                              options: updatedData.options || [],
                              multiSelect: updatedData.multiSelect || false,
                            },
                          };
                        }
                        return el;
                      });
                      setCanvasElements(updatedElements);
                    }
                  }}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Option Configuration Modal */}
      {showOptionConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <OptionConfigurationPanel
            isOpen={showOptionConfig}
            onClose={() => setShowOptionConfig(false)}
            optionId={selectedOptionId || ""}
            onConfigUpdate={(config) => {
              console.log("Configuração atualizada:", config);
            }}
          />
        </div>
      )}
    </div>
  );
};
