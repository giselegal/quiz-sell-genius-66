import React, { useState, useEffect } from "react";

// --- Interfaces Básicas ---
interface OptionChoice {
  text: string;
  value: string;
  nextStepId?: string;
  scoreValue?: number;
}

interface QuizComponentProps {
  text?: string;
  src?: string;
  alt?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  choices?: OptionChoice[];
  [key: string]: any;
}

interface QuizComponent {
  id: string;
  type:
    | "heading"
    | "text"
    | "image"
    | "button"
    | "input"
    | "options"
    | "video"
    | "spacer";
  props: QuizComponentProps;
}

interface QuizStep {
  id: string;
  name: string;
  components: QuizComponent[];
}

interface QuizEditorState {
  steps: QuizStep[];
  currentStepId: string;
  headerConfig: any;
}

// --- Componente CanvasArea ---
interface CanvasAreaProps {
  currentStep: QuizStep | null;
  headerConfig: any;
  selectedComponent: QuizComponent | null;
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
  onComponentAdd: (type: string) => void;
  onComponentUpdate: (
    componentId: string,
    newProps: Partial<QuizComponentProps>
  ) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentMove: (componentId: string, direction: "up" | "down") => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  currentStep,
  headerConfig,
  selectedComponent,
  selectedComponentId,
  onComponentSelect,
  onComponentAdd,
  onComponentUpdate,
  onComponentDelete,
  onComponentMove,
}) => {
  if (!currentStep) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-900 text-zinc-400">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            Nenhuma etapa selecionada
          </h3>
          <p>Selecione uma etapa no painel lateral para começar a editar</p>
        </div>
      </div>
    );
  }

  const renderComponent = (component: QuizComponent) => {
    const isSelected = selectedComponentId === component.id;

    return (
      <div
        key={component.id}
        className={`relative border-2 rounded-lg p-4 mb-4 cursor-pointer transition-all ${
          isSelected
            ? "border-blue-500 bg-blue-500/10"
            : "border-transparent hover:border-zinc-600"
        }`}
        onClick={() => onComponentSelect(component.id)}
      >
        {/* Controles de componente */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentMove(component.id, "up");
              }}
              className="w-6 h-6 bg-blue-500 text-white rounded text-xs flex items-center justify-center hover:bg-blue-600"
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentMove(component.id, "down");
              }}
              className="w-6 h-6 bg-blue-500 text-white rounded text-xs flex items-center justify-center hover:bg-blue-600"
            >
              ↓
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentDelete(component.id);
              }}
              className="w-6 h-6 bg-red-500 text-white rounded text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}

        {/* Renderização do componente */}
        <div className="text-zinc-200">
          {component.type === "heading" && (
            <h2 className="text-xl font-bold">
              {component.props.text || "Título"}
            </h2>
          )}
          {component.type === "text" && (
            <p>{component.props.text || "Texto do parágrafo"}</p>
          )}
          {component.type === "image" && (
            <img
              src={component.props.src || "https://placehold.co/400x200"}
              alt={component.props.alt || "Imagem"}
              className="max-w-full h-auto rounded"
            />
          )}
          {component.type === "button" && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {component.props.buttonText || "Botão"}
            </button>
          )}
          {component.type === "input" && (
            <div>
              {component.props.label && (
                <label className="block text-sm font-medium mb-1">
                  {component.props.label}
                </label>
              )}
              <input
                type="text"
                placeholder={component.props.placeholder || "Digite aqui..."}
                className="w-full px-3 py-2 border border-zinc-600 rounded bg-zinc-800 text-white"
                disabled
              />
            </div>
          )}
          {component.type === "options" && (
            <div>
              <h3 className="font-medium mb-3">
                {component.props.text || "Pergunta"}
              </h3>
              <div className="space-y-2">
                {component.props.choices?.map(
                  (choice: OptionChoice, index: number) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 border border-zinc-600 rounded hover:border-blue-500"
                    >
                      {choice.text}
                    </button>
                  )
                ) || (
                  <button className="block w-full text-left px-4 py-2 border border-zinc-600 rounded">
                    Opção de exemplo
                  </button>
                )}
              </div>
            </div>
          )}
          {component.type === "video" && (
            <div className="aspect-video bg-zinc-800 rounded flex items-center justify-center">
              <span className="text-zinc-400">📹 Vídeo</span>
            </div>
          )}
          {component.type === "spacer" && (
            <div className="h-8 border-dashed border border-zinc-600 rounded flex items-center justify-center">
              <span className="text-zinc-500 text-sm">Espaçador</span>
            </div>
          )}
        </div>

        <div className="absolute top-1 left-1 text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
          {component.type}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex bg-zinc-900">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
          {headerConfig && (
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">
                {headerConfig.title}
              </h1>
              {headerConfig.subtitle && (
                <p className="text-gray-600 mt-1">{headerConfig.subtitle}</p>
              )}
            </div>
          )}

          {currentStep.components.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Esta etapa está vazia</p>
              <button
                onClick={() => onComponentAdd("heading")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Adicionar primeiro componente
              </button>
            </div>
          ) : (
            <div>{currentStep.components.map(renderComponent)}</div>
          )}
        </div>
      </div>

      <div className="w-64 bg-zinc-800 border-l border-zinc-700 p-4">
        <h3 className="text-white font-medium mb-4">Adicionar Componente</h3>
        <div className="space-y-2">
          {[
            {
              type: "heading",
              label: "📝 Título",
              desc: "Cabeçalho principal",
            },
            { type: "text", label: "📄 Texto", desc: "Parágrafo de texto" },
            { type: "image", label: "🖼️ Imagem", desc: "Imagem ou foto" },
            { type: "button", label: "🔘 Botão", desc: "Botão clicável" },
            { type: "input", label: "📝 Campo", desc: "Campo de entrada" },
            { type: "options", label: "☑️ Opções", desc: "Múltipla escolha" },
            { type: "video", label: "🎥 Vídeo", desc: "Vídeo incorporado" },
            { type: "spacer", label: "📏 Espaço", desc: "Espaçamento" },
          ].map((component) => (
            <button
              key={component.type}
              onClick={() => onComponentAdd(component.type)}
              className="w-full text-left p-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-colors"
            >
              <div className="font-medium text-sm">{component.label}</div>
              <div className="text-xs text-zinc-400 mt-1">{component.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Navbar Simples ---
const FunnelNavbar: React.FC<{
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
}> = ({ onSave, onPublish, isSaving, isPublishing }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">Quiz Editor</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
        <button
          onClick={onPublish}
          disabled={isPublishing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isPublishing ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
};

// --- Navegação de Etapas ---
const StepNavigationTabs: React.FC<{
  steps: QuizStep[];
  currentStepId: string;
  onStepSelect: (stepId: string) => void;
  onStepRename: (stepId: string, newName: string) => void;
  onStepDelete: (stepId: string) => void;
  onAddStep: () => void;
}> = ({
  steps,
  currentStepId,
  onStepSelect,
  onStepRename,
  onStepDelete,
  onAddStep,
}) => {
  return (
    <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-2">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepSelect(step.id)}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
              currentStepId === step.id
                ? "bg-blue-600 text-white"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }`}
          >
            {step.name}
          </button>
        ))}
        <button
          onClick={onAddStep}
          className="px-4 py-2 rounded text-sm bg-green-600 text-white hover:bg-green-700"
        >
          + Nova Etapa
        </button>
      </div>
    </div>
  );
};

// --- Componente Principal ---
const AdvancedQuizEditor: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [editorState, setEditorState] = useState<QuizEditorState>({
    steps: [
      {
        id: "step-1",
        name: "Primeira Etapa",
        components: [],
      },
    ],
    currentStepId: "step-1",
    headerConfig: { title: "Meu Quiz", subtitle: "Descrição do quiz" },
  });

  const currentStep =
    editorState.steps.find((step) => step.id === editorState.currentStepId) ||
    null;
  const selectedComponent =
    currentStep?.components.find((comp) => comp.id === selectedComponentId) ||
    null;

  const generateUniqueId = (): string =>
    `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleComponentSelect = (componentId: string | null) => {
    setSelectedComponentId(componentId);
  };

  const handleComponentAdd = (type: string) => {
    const newComponent: QuizComponent = {
      id: generateUniqueId(),
      type: type as QuizComponent["type"],
      props: {},
    };

    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === editorState.currentStepId
          ? { ...step, components: [...step.components, newComponent] }
          : step
      ),
    }));

    setSelectedComponentId(newComponent.id);
  };

  const handleComponentUpdate = (
    componentId: string,
    newProps: Partial<QuizComponentProps>
  ) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === editorState.currentStepId
          ? {
              ...step,
              components: step.components.map((comp) =>
                comp.id === componentId
                  ? { ...comp, props: { ...comp.props, ...newProps } }
                  : comp
              ),
            }
          : step
      ),
    }));
  };

  const handleComponentDelete = (componentId: string) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === editorState.currentStepId
          ? {
              ...step,
              components: step.components.filter(
                (comp) => comp.id !== componentId
              ),
            }
          : step
      ),
    }));
    setSelectedComponentId(null);
  };

  const handleComponentMove = (
    componentId: string,
    direction: "up" | "down"
  ) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => {
        if (step.id !== editorState.currentStepId) return step;

        const components = [...step.components];
        const index = components.findIndex((comp) => comp.id === componentId);

        if (index === -1) return step;

        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= components.length) return step;

        [components[index], components[newIndex]] = [
          components[newIndex],
          components[index],
        ];

        return { ...step, components };
      }),
    }));
  };

  const handleStepSelect = (stepId: string) => {
    setEditorState((prev) => ({ ...prev, currentStepId: stepId }));
    setSelectedComponentId(null);
  };

  const handleStepRename = (stepId: string, newName: string) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId ? { ...step, name: newName } : step
      ),
    }));
  };

  const handleStepDelete = (stepId: string) => {
    if (editorState.steps.length <= 1) return;

    setEditorState((prev) => {
      const newSteps = prev.steps.filter((step) => step.id !== stepId);
      const newCurrentStepId =
        prev.currentStepId === stepId ? newSteps[0]?.id : prev.currentStepId;

      return {
        ...prev,
        steps: newSteps,
        currentStepId: newCurrentStepId,
      };
    });
    setSelectedComponentId(null);
  };

  const handleAddStep = () => {
    const newStep: QuizStep = {
      id: generateUniqueId(),
      name: `Etapa ${editorState.steps.length + 1}`,
      components: [],
    };

    setEditorState((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
      currentStepId: newStep.id,
    }));
    setSelectedComponentId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Salvando quiz...", editorState);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      console.log("Publicando quiz...", editorState);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsPublishing(false);
    }
  };

  try {
    return (
      <div className="h-screen bg-zinc-950 flex flex-col">
        <FunnelNavbar
          onSave={handleSave}
          onPublish={handlePublish}
          isSaving={isSaving}
          isPublishing={isPublishing}
        />

        <StepNavigationTabs
          steps={editorState.steps}
          currentStepId={editorState.currentStepId}
          onStepSelect={handleStepSelect}
          onStepRename={handleStepRename}
          onStepDelete={handleStepDelete}
          onAddStep={handleAddStep}
        />

        <div className="flex-1 overflow-hidden">
          <CanvasArea
            currentStep={currentStep}
            headerConfig={editorState.headerConfig}
            selectedComponent={selectedComponent}
            selectedComponentId={selectedComponentId}
            onComponentSelect={handleComponentSelect}
            onComponentAdd={handleComponentAdd}
            onComponentUpdate={handleComponentUpdate}
            onComponentDelete={handleComponentDelete}
            onComponentMove={handleComponentMove}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Erro ao renderizar AdvancedQuizEditor:", error);
    return (
      <div className="h-screen bg-red-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Erro no Editor</h2>
          <p className="mb-4">O editor encontrou um erro:</p>
          <pre className="mt-4 text-sm text-red-200 bg-red-900 p-4 rounded">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
};

export { AdvancedQuizEditor };
export default AdvancedQuizEditor;
