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
import { ModernConfigurationPanel } from "./panels/ModernConfigurationPanel";
import { OptionConfigurationPanel } from "./panels/OptionConfigurationPanel";
import { QuizConfigPanel } from "./panels/QuizConfigPanel";
import { EditableCanvas } from "./canvas/EditableCanvas";
import { useSupabaseQuestions } from "@/hooks/useSupabaseQuestions";
import { useQuizStyles } from "@/hooks/useQuizConfig";
import { useQuizEditor } from "@/hooks/useQuizEditor";
import { useEditorSettings } from "@/hooks/useEditorSettings";
import { ValidationModal } from "./ValidationModal";
import { runEditorTest } from "@/utils/editorTest";
import {
  Eye,
  Save,
  Monitor,
  Tablet,
  Smartphone,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { QuizQuestion } from "@/types/quiz";

interface EditorStage {
  id: string;
  name: string;
  type: "intro" | "quiz" | "transition" | "result" | "offer" | "strategic";
  questionData?: QuizQuestion;
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
  content: {
    text?: string;
    imageUrl?: string;
    style?: Record<string, string>;
    properties?: Record<string, unknown>;
  };
  order: number;
}

interface EditorSaveData {
  stages: EditorStage[];
  currentStage: string;
  canvasElements: CanvasElement[];
  settings: {
    viewportMode: "desktop" | "tablet" | "mobile";
    isPreviewMode: boolean;
  };
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: EditorSaveData) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave,
}) => {
  const { questions, strategicQuestions, loading, error } =
    useSupabaseQuestions();
  const { cssVariables } = useQuizStyles();
  const { saving, lastSaved, saveQuestion, autoSave, validateQuiz } =
    useQuizEditor();
  const [stages, setStages] = useState<EditorStage[]>([]);
  const [currentStage, setCurrentStage] = useState<string>("intro");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [showOptionConfig, setShowOptionConfig] = useState<boolean>(false);
  const [showQuizConfig, setShowQuizConfig] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] =
    useState<boolean>(false);
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
      case "strategic": {
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
      }

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

  const handleSave = useCallback(async () => {
    try {
      // Coletar todas as questões modificadas
      const allQuestions = [...questions, ...strategicQuestions];

      // Validar antes de salvar
      const validation = validateQuiz(allQuestions);
      if (!validation.isValid) {
        console.error("Validation errors:", validation.errors);
        return;
      }

      // Salvar usando o hook de editor
      const success = await autoSave(allQuestions);

      if (success) {
        // Dados para compatibilidade com callback existente
        const data = {
          stages,
          currentStage,
          canvasElements,
          settings: {
            viewportMode,
            isPreviewMode,
          },
        };

        console.log("✅ Saved successfully:", data);
        onSave?.(data);
      }
    } catch (error) {
      console.error("❌ Error saving:", error);
    }
  }, [
    stages,
    currentStage,
    canvasElements,
    viewportMode,
    isPreviewMode,
    onSave,
    questions,
    strategicQuestions,
    autoSave,
    validateQuiz,
  ]);

  // Auto-save effect - salva apenas quando há mudanças
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Debounce auto-save para evitar salvamentos excessivos
    const debouncedSave = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        if (questions.length > 0 || strategicQuestions.length > 0) {
          const allQuestions = [...questions, ...strategicQuestions];
          const validation = validateQuiz(allQuestions);

          if (validation.isValid) {
            await autoSave(allQuestions);
          }
        }
      }, 5000); // Auto-save depois de 5 segundos de inatividade
    };

    debouncedSave();

    return () => clearTimeout(timeoutId);
  }, [questions, strategicQuestions, canvasElements, autoSave, validateQuiz]);

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
      type: type as CanvasElement["type"],
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

  const handleElementUpdate = (
    id: string,
    content: CanvasElement["content"]
  ) => {
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
    <div
      className="h-screen bg-gray-50 flex flex-col overflow-hidden quiz-dynamic-theme"
      style={cssVariables}
    >
      {/* Header */}
      <div
        className="border-b border-gray-200 px-6 py-3 flex-shrink-0"
        style={{ backgroundColor: "#FEFEFE" }}
      >
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

            {/* Status de validação */}
            {(() => {
              const allQuestions = [...questions, ...strategicQuestions];
              const validation = validateQuiz(allQuestions);
              return (
                <Badge
                  variant={validation.isValid ? "default" : "destructive"}
                  className={validation.isValid ? "bg-green-500" : ""}
                >
                  {validation.isValid ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Válido
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {validation.errors.length} erro(s)
                    </>
                  )}
                </Badge>
              );
            })()}
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
            {/* Quiz Config Toggle */}
            <Button
              variant={showQuizConfig ? "default" : "outline"}
              size="sm"
              onClick={() => setShowQuizConfig(!showQuizConfig)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Config
            </Button>
            {/* Save Button */}
            <Button
              onClick={handleSave}
              size="sm"
              disabled={saving}
              variant={lastSaved ? "default" : "secondary"}
            >
              {saving ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : lastSaved ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? "Salvando..." : lastSaved ? "Salvo" : "Salvar"}
            </Button>
            {/* Last saved indicator */}
            {lastSaved && (
              <div className="text-xs text-muted-foreground">
                Salvo às {lastSaved.toLocaleTimeString()}
              </div>
            )}{" "}
          </div>
        </div>
      </div>

      {/* Main Content - Resizable 4 Columns Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Column - Steps Panel */}
          <ResizablePanel defaultSize={12} minSize={8} maxSize={20}>
            <div
              className="h-full border-r border-gray-200"
              style={{ backgroundColor: "#FEFEFE" }}
            >
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
                className={`mx-auto shadow-lg rounded-lg overflow-hidden ${
                  viewportMode === "desktop"
                    ? "max-w-4xl"
                    : viewportMode === "tablet"
                    ? "max-w-xl"
                    : "max-w-sm"
                }`}
                style={{ backgroundColor: "#FEFEFE" }}
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
          <ResizablePanel
            defaultSize={showQuizConfig ? 25 : 33}
            minSize={showQuizConfig ? 20 : 25}
            maxSize={showQuizConfig ? 35 : 45}
          >
            <div
              className="h-full border-l border-gray-200"
              style={{ backgroundColor: "#FEFEFE" }}
            >
              <div className="h-full overflow-auto">
                <ModernConfigurationPanel
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

          {/* Fifth Column - Quiz Configuration Panel (Conditional) */}
          {showQuizConfig && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <QuizConfigPanel
                  isOpen={showQuizConfig}
                  onToggle={() => setShowQuizConfig(!showQuizConfig)}
                />
              </ResizablePanel>
            </>
          )}
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
