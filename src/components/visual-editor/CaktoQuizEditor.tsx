import React, { useState, useEffect } from "react";
import { QuizQuestion } from "../../types/quiz";
import { clothingQuestions } from "../../data/questions/clothingQuestions";
import { strategicQuestions } from "../../data/strategicQuestions";
import { selfPerceptionQuestions } from "../../data/questions/selfPerceptionQuestions";

// --- Interfaces para a Estrutura de Dados do Quiz ---

interface OptionChoice {
  text: string;
  value: string;
  nextStepId?: string;
  nextPageType?: "resultPage" | "quizOfferPage" | "transitionPage";
  scoreValue?: number;
}

interface QuizComponentProps {
  // Propriedades Comuns
  text?: string;
  isHidden?: boolean;
  styles?: { [key: string]: string };

  // Propriedades Específicas de Imagem
  src?: string;
  alt?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  // Propriedades Específicas de Entrada
  label?: string;
  placeholder?: string;
  inputType?: "text" | "email" | "number" | "tel";
  required?: boolean;
  validationRegex?: string;
  errorMessage?: string;
  storeAsLeadField?: string;

  // Propriedades Específicas de Botão
  buttonText?: string;
  buttonStyle?: "primary" | "secondary" | "outline" | "ghost";
  actionType?: "goToNextStep" | "submitForm" | "redirectUrl" | "customFunction";
  actionTargetId?: string;
  actionUrl?: string;
  customFunctionName?: string;

  // Propriedades Específicas de Opções
  questionText?: string;
  choices?: OptionChoice[];
  selectionType?: "single" | "multiple";
  conditionalLogic?: {
    rule: "allSelected" | "anySelected" | "scoreThreshold";
    threshold?: number;
    targetStepId?: string;
    fallbackStepId?: string;
  };

  // Propriedades Específicas de Alerta
  alertType?: "info" | "warning" | "error" | "success";
  alertMessage?: string;

  // Propriedades Específicas de Vídeo
  videoUrl?: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;

  // Propriedades Específicas de Carrosel
  images?: { src: string; alt: string; caption?: string }[];
  autoSlide?: boolean;
  slideInterval?: number;

  // Propriedades para componentes personalizados
  resultType?: "styleAnalysis" | "personalityProfile";
  offerHeadline?: string;
  offerDescription?: string;
  offerCtaButtonText?: string;
  offerCtaUrl?: string;
  resultMapping?: {
    scoreRange: [number, number];
    resultId: string;
    offerId: string;
  }[];
  offerProductSku?: string;
  discountCode?: string;
  componentName?: string;
}

interface QuizComponent {
  id: string;
  type:
    | "heading"
    | "image"
    | "input"
    | "button"
    | "alert"
    | "options"
    | "video"
    | "carousel"
    | "text"
    | "spacer"
    | "customComponent";
  props: QuizComponentProps;
}

interface QuizStep {
  id: string;
  name: string;
  components: QuizComponent[];
  defaultNextStepId?: string;
  finalPageType?: "resultPage" | "quizOfferPage";
}

interface QuizHeaderConfig {
  showLogo: boolean;
  showProgressBar: boolean;
  allowReturnButton: boolean;
  logoUrl?: string;
  progressColor?: string;
}

interface QuizEditorState {
  steps: QuizStep[];
  headerConfig: QuizHeaderConfig;
  currentStepId: string;
  selectedComponentId?: string;
}

// --- Componentes Reutilizáveis ---

const EditableHeading: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <h1
    className="min-w-full text-3xl font-bold text-center text-zinc-100 p-2 rounded-md bg-zinc-800/50"
    style={component.props.styles}
  >
    {component.props.text || "Título Editável"}
  </h1>
);

const EditableImage: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="grid p-2 rounded-md bg-zinc-800/50"
    style={component.props.styles}
  >
    <div className="flex items-center justify-center">
      <img
        src={
          component.props.src ||
          "https://placehold.co/300x200/374151/f3f4f6?text=Imagem"
        }
        alt={component.props.alt || "Imagem"}
        className="object-cover w-full h-auto rounded-lg max-w-96"
        style={{ objectFit: component.props.objectFit || "cover" }}
      />
    </div>
  </div>
);

const EditableInput: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="grid w-full items-center gap-1.5 p-2 rounded-md bg-zinc-800/50"
    style={component.props.styles}
  >
    <label className="text-sm font-medium leading-none text-zinc-100">
      {component.props.label || "Campo de Entrada"}{" "}
      {component.props.required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={component.props.inputType || "text"}
      className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700/50 text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 p-2"
      placeholder={component.props.placeholder || "Digite aqui..."}
      value=""
      readOnly
    />
    {component.props.errorMessage && (
      <span className="text-xs text-red-400">
        {component.props.errorMessage}
      </span>
    )}
  </div>
);

const EditableButton: React.FC<{ component: QuizComponent }> = ({
  component,
}) => {
  const getButtonClass = (style: string) => {
    switch (style) {
      case "secondary":
        return "bg-gray-600 text-white hover:bg-gray-700";
      case "outline":
        return "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white";
      case "ghost":
        return "text-blue-600 hover:bg-blue-600/10";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 min-w-full h-14 rounded-md ${getButtonClass(
        component.props.buttonStyle || "primary"
      )}`}
      style={component.props.styles}
    >
      {component.props.buttonText || "Botão"}
    </button>
  );
};

const OptionsComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="grid gap-2 p-2 rounded-md bg-zinc-800/50"
    style={component.props.styles}
  >
    <p className="text-zinc-100 font-semibold">
      {component.props.questionText || "Selecione uma opção:"}
    </p>
    <div className="flex flex-col gap-2">
      {component.props.choices?.map((choice, index) => (
        <button
          key={index}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors bg-zinc-700 text-zinc-100 hover:bg-zinc-600 p-3 rounded-md text-left"
        >
          {choice.text}
          {choice.scoreValue && (
            <span className="ml-auto text-xs text-zinc-400">
              +{choice.scoreValue}
            </span>
          )}
        </button>
      ))}
    </div>
    {component.props.selectionType === "multiple" && (
      <p className="text-xs text-zinc-400 mt-1">
        Você pode selecionar múltiplas opções
      </p>
    )}
  </div>
);

const AlertComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => {
  const getAlertClass = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-600/30 text-yellow-300 border-yellow-500";
      case "error":
        return "bg-red-600/30 text-red-300 border-red-500";
      case "success":
        return "bg-green-600/30 text-green-300 border-green-500";
      default:
        return "bg-blue-600/30 text-blue-300 border-blue-500";
    }
  };

  return (
    <div
      className={`p-3 rounded-md border ${getAlertClass(
        component.props.alertType || "info"
      )}`}
      style={component.props.styles}
    >
      <p>{component.props.alertMessage || "Mensagem de Alerta"}</p>
    </div>
  );
};

const TextComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <p
    className="min-w-full text-zinc-100 text-center p-2 rounded-md bg-zinc-800/50"
    style={component.props.styles}
  >
    {component.props.text || "Texto Editável"}
  </p>
);

const SpacerComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="h-4 w-full border-b border-dashed border-zinc-600 my-2 flex items-center justify-center text-zinc-500 text-xs"
    style={component.props.styles}
  >
    Espaçador
  </div>
);

const CustomComponentPlaceholder: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="p-3 bg-purple-600/30 text-purple-300 rounded-md border border-purple-500"
    style={component.props.styles}
  >
    <p className="font-bold">
      Componente Personalizado: {component.props.componentName}
    </p>
    {component.props.offerHeadline && (
      <p>Título: {component.props.offerHeadline}</p>
    )}
    {component.props.offerDescription && (
      <p>Descrição: {component.props.offerDescription}</p>
    )}
    {component.props.discountCode && (
      <p>Código: {component.props.discountCode}</p>
    )}
    <p className="text-xs mt-1">
      Este é um placeholder para a lógica do componente React real.
    </p>
  </div>
);

// Mapeamento de tipos de componentes para seus respectivos React Components
const componentViewMap: {
  [key: string]: React.FC<{ component: QuizComponent }>;
} = {
  heading: EditableHeading,
  image: EditableImage,
  input: EditableInput,
  button: EditableButton,
  options: OptionsComponent,
  alert: AlertComponent,
  customComponent: CustomComponentPlaceholder,
  spacer: SpacerComponent,
  text: TextComponent,
};

// --- Funções Auxiliares ---

const generateUniqueId = (): string =>
  `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- Componentes Principais do Editor ---

const EditorNavbar: React.FC<{
  onSave: () => void;
  onPublish: () => void;
  onPreview: () => void;
  onLoadRealQuestions: () => void;
  onStartFromScratch: () => void;
}> = ({
  onSave,
  onPublish,
  onPreview,
  onLoadRealQuestions,
  onStartFromScratch,
}) => {
  return (
    <div className="h-16 border-b border-zinc-700 bg-zinc-950/95 backdrop-blur-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors">
          <svg
            className="w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-zinc-100">
          Editor Visual de Quiz
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onLoadRealQuestions}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          title="Carregar questões reais do quiz"
        >
          📊 Questões Reais
        </button>
        <button
          onClick={onStartFromScratch}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          title="Começar do zero"
        >
          🗂️ Limpar Tudo
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-md hover:bg-zinc-600 transition-colors"
        >
          Salvar
        </button>
        <button
          onClick={onPreview}
          className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-md hover:bg-zinc-600 transition-colors"
        >
          Visualizar
        </button>
        <button
          onClick={onPublish}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

const StepsSidebar: React.FC<{
  steps: QuizStep[];
  currentStepId: string;
  onStepSelect: (stepId: string) => void;
  onAddStep: () => void;
  onDeleteStep: (stepId: string) => void;
}> = ({ steps, currentStepId, onStepSelect, onAddStep, onDeleteStep }) => {
  return (
    <div className="w-64 border-r border-zinc-700 bg-zinc-900/50 flex flex-col">
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-100 mb-2">
          Etapas do Quiz
        </h2>
        <button
          onClick={onAddStep}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nova Etapa
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-3 border-b border-zinc-700 cursor-pointer transition-colors group ${
              step.id === currentStepId
                ? "bg-blue-600/20 border-l-4 border-l-blue-600"
                : "hover:bg-zinc-800"
            }`}
            onClick={() => onStepSelect(step.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-zinc-100 font-medium">{step.name}</h3>
                <p className="text-zinc-400 text-sm">
                  {step.components.length} componente
                  {step.components.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (steps.length > 1) {
                    onDeleteStep(step.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded transition-all"
                disabled={steps.length <= 1}
              >
                <svg
                  className="w-4 h-4 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComponentsToolbar: React.FC<{
  onAddComponent: (type: string) => void;
}> = ({ onAddComponent }) => {
  const toolbarItems = [
    { name: "Título", type: "heading", icon: "🔤" },
    { name: "Texto", type: "text", icon: "📝" },
    { name: "Imagem", type: "image", icon: "🖼️" },
    { name: "Botão", type: "button", icon: "🔘" },
    { name: "Opções", type: "options", icon: "☑️" },
    { name: "Entrada", type: "input", icon: "📝" },
    { name: "Alerta", type: "alert", icon: "⚠️" },
    { name: "Espaçador", type: "spacer", icon: "📏" },
    { name: "Script", type: "customComponent", icon: "⚙️" },
  ];

  return (
    <div className="w-64 border-r border-zinc-700 bg-zinc-900/50">
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-100">Componentes</h2>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-2 gap-2">
          {toolbarItems.map((item) => (
            <button
              key={item.type}
              onClick={() => onAddComponent(item.type)}
              className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors flex flex-col items-center gap-2 text-zinc-100"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepEditor: React.FC<{
  step: QuizStep;
  selectedComponentId?: string;
  onComponentSelect: (componentId: string) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentUpdate: (componentId: string, props: QuizComponentProps) => void;
}> = ({
  step,
  selectedComponentId,
  onComponentSelect,
  onComponentDelete,
  onComponentUpdate,
}) => {
  return (
    <div className="flex-1 p-6 bg-zinc-800/20">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg min-h-96">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{step.name}</h2>

          <div className="space-y-4">
            {step.components.map((component) => {
              const ComponentView = componentViewMap[component.type];
              if (!ComponentView) return null;

              return (
                <div
                  key={component.id}
                  className={`relative group ${
                    selectedComponentId === component.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => onComponentSelect(component.id)}
                >
                  <ComponentView component={component} />

                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onComponentDelete(component.id);
                      }}
                      className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}

            {step.components.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>Nenhum componente adicionado ainda.</p>
                <p className="text-sm">
                  Use a barra lateral para adicionar componentes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertiesPanel: React.FC<{
  selectedComponent?: QuizComponent;
  onComponentUpdate: (props: QuizComponentProps) => void;
}> = ({ selectedComponent, onComponentUpdate }) => {
  if (!selectedComponent) {
    return (
      <div className="w-80 border-l border-zinc-700 bg-zinc-900/50 p-4">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">
          Propriedades
        </h2>
        <p className="text-zinc-400">
          Selecione um componente para editar suas propriedades.
        </p>
      </div>
    );
  }

  const handleChange = (key: string, value: unknown) => {
    onComponentUpdate({
      ...selectedComponent.props,
      [key]: value,
    });
  };

  return (
    <div className="w-80 border-l border-zinc-700 bg-zinc-900/50 p-4">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Propriedades</h2>

      <div className="space-y-4">
        {/* Propriedades comuns */}
        {(selectedComponent.type === "heading" ||
          selectedComponent.type === "text") && (
          <div>
            <label className="block text-sm font-medium text-zinc-100 mb-2">
              Texto
            </label>
            <textarea
              className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={selectedComponent.props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Digite o texto..."
              rows={3}
            />
          </div>
        )}

        {selectedComponent.type === "image" && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                URL da Imagem
              </label>
              <input
                type="text"
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.src || ""}
                onChange={(e) => handleChange("src", e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Texto Alternativo
              </label>
              <input
                type="text"
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.alt || ""}
                onChange={(e) => handleChange("alt", e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>
          </>
        )}

        {selectedComponent.type === "button" && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Texto do Botão
              </label>
              <input
                type="text"
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.buttonText || ""}
                onChange={(e) => handleChange("buttonText", e.target.value)}
                placeholder="Clique aqui"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Estilo
              </label>
              <select
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.buttonStyle || "primary"}
                onChange={(e) => handleChange("buttonStyle", e.target.value)}
              >
                <option value="primary">Primário</option>
                <option value="secondary">Secundário</option>
                <option value="outline">Contorno</option>
                <option value="ghost">Fantasma</option>
              </select>
            </div>
          </>
        )}

        {selectedComponent.type === "options" && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Pergunta
              </label>
              <textarea
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.questionText || ""}
                onChange={(e) => handleChange("questionText", e.target.value)}
                placeholder="Qual é a sua pergunta?"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Opções
              </label>
              <div className="space-y-2">
                {selectedComponent.props.choices?.map((choice, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={choice.text}
                      onChange={(e) => {
                        const newChoices = [
                          ...(selectedComponent.props.choices || []),
                        ];
                        newChoices[index].text = e.target.value;
                        newChoices[index].value = e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "_");
                        handleChange("choices", newChoices);
                      }}
                      placeholder={`Opção ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newChoices = (
                          selectedComponent.props.choices || []
                        ).filter((_, i) => i !== index);
                        handleChange("choices", newChoices);
                      }}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newChoices = [
                    ...(selectedComponent.props.choices || []),
                  ];
                  const optionNumber = newChoices.length + 1;
                  newChoices.push({
                    text: `Opção ${optionNumber}`,
                    value: `option${optionNumber}`,
                    scoreValue: 0,
                  });
                  handleChange("choices", newChoices);
                }}
                className="mt-2 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Adicionar Opção
              </button>
            </div>
          </>
        )}

        {selectedComponent.type === "input" && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Rótulo
              </label>
              <input
                type="text"
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="Nome do campo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Placeholder
              </label>
              <input
                type="text"
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                placeholder="Digite aqui..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Tipo
              </label>
              <select
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.inputType || "text"}
                onChange={(e) => handleChange("inputType", e.target.value)}
              >
                <option value="text">Texto</option>
                <option value="email">Email</option>
                <option value="number">Número</option>
                <option value="tel">Telefone</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="required"
                className="w-4 h-4 text-blue-600 bg-zinc-700 border-zinc-600 rounded focus:ring-blue-500"
                checked={selectedComponent.props.required || false}
                onChange={(e) => handleChange("required", e.target.checked)}
              />
              <label htmlFor="required" className="text-sm text-zinc-100">
                Campo obrigatório
              </label>
            </div>
          </>
        )}

        {selectedComponent.type === "alert" && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Mensagem
              </label>
              <textarea
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.alertMessage || ""}
                onChange={(e) => handleChange("alertMessage", e.target.value)}
                placeholder="Mensagem do alerta..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-100 mb-2">
                Tipo
              </label>
              <select
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={selectedComponent.props.alertType || "info"}
                onChange={(e) => handleChange("alertType", e.target.value)}
              >
                <option value="info">Informação</option>
                <option value="warning">Aviso</option>
                <option value="error">Erro</option>
                <option value="success">Sucesso</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- Funções de Conversão de Dados ---

const generateUniqueId = (): string => {
  return `id_${Math.random().toString(36).substr(2, 9)}`;
};

const convertQuestionsToSteps = (questions: QuizQuestion[]): QuizStep[] => {
  return questions.map((question, index) => {
    // Criar componente de título/pergunta
    const titleComponent: QuizComponent = {
      id: generateUniqueId(),
      type: "heading",
      props: {
        text: question.title,
        styles: {
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "1.875rem",
          fontWeight: "bold",
          color: "#f3f4f6",
          lineHeight: "1.2",
        },
      },
    };

    // Criar componente de imagem se a questão tiver uma
    const imageComponent: QuizComponent | null = question.imageUrl
      ? {
          id: generateUniqueId(),
          type: "image",
          props: {
            src: question.imageUrl,
            alt: `Imagem da questão ${index + 1}`,
            styles: {
              marginBottom: "24px",
              textAlign: "center",
              maxWidth: "400px",
              margin: "0 auto 24px auto",
            },
          },
        }
      : null;

    // Converter opções para choices com melhor tratamento de imagens
    const choices: OptionChoice[] = question.options.map((option) => ({
      text: option.text,
      value: option.id,
      scoreValue: option.points || 1,
      // Lógica para próxima etapa (vai para a próxima questão ou resultado)
      nextStepId:
        index < questions.length - 1 ? `step-${index + 2}` : undefined,
      nextPageType: index === questions.length - 1 ? "resultPage" : undefined,
    }));

    // Verificar se alguma opção tem imagem para determinar o layout
    const hasOptionImages = question.options.some((opt) => opt.imageUrl);

    // Criar componente de opções com layout adaptado
    const optionsComponent: QuizComponent = {
      id: generateUniqueId(),
      type: "options",
      props: {
        questionText: question.title,
        choices: choices,
        selectionType: question.multiSelect > 1 ? "multiple" : "single",
        styles: {
          display: "grid",
          gap: "16px",
          gridTemplateColumns: hasOptionImages
            ? "repeat(auto-fit, minmax(250px, 1fr))"
            : "1fr",
          maxWidth: hasOptionImages ? "100%" : "600px",
          margin: "0 auto",
        },
      },
    };

    // Se as opções têm imagens, criar componentes de imagem para cada opção
    const optionImageComponents: QuizComponent[] = [];
    if (hasOptionImages) {
      question.options.forEach((option, optIndex) => {
        if (option.imageUrl) {
          optionImageComponents.push({
            id: generateUniqueId(),
            type: "image",
            props: {
              src: option.imageUrl,
              alt: option.text,
              styles: {
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "8px",
              },
            },
          });
        }
      });
    }

    // Montar componentes da etapa
    const components: QuizComponent[] = [titleComponent];

    // Adicionar imagem da questão se existir
    if (imageComponent) {
      components.push(imageComponent);
    }

    // Adicionar imagens das opções se existirem
    if (optionImageComponents.length > 0) {
      components.push(...optionImageComponents);
    }

    // Adicionar componente de opções
    components.push(optionsComponent);

    // Se for questão com múltipla seleção, adicionar botão de continuar
    if (question.multiSelect > 1) {
      const continueButton: QuizComponent = {
        id: generateUniqueId(),
        type: "button",
        props: {
          buttonText: `Continuar (selecione ${question.multiSelect} opções)`,
          buttonStyle: "primary",
          actionType: "goToNextStep",
          actionTargetId:
            index < questions.length - 1 ? `step-${index + 2}` : undefined,
          styles: {
            marginTop: "24px",
            padding: "12px 32px",
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            width: "100%",
            maxWidth: "300px",
            margin: "24px auto 0 auto",
          },
        },
      };
      components.push(continueButton);
    }

    return {
      id: `step-${index + 1}`,
      name: `Questão ${index + 1}: ${question.title.substring(0, 30)}...`,
      components: components,
      defaultNextStepId:
        index < questions.length - 1 ? `step-${index + 2}` : undefined,
      finalPageType: index === questions.length - 1 ? "resultPage" : undefined,
    };
  });
};

const getDefaultPropsForType = (type: string): QuizComponentProps => {
  switch (type) {
    case "heading":
      return { text: "Novo Título" };
    case "image":
      return {
        src: "https://placehold.co/300x200/374151/f3f4f6?text=Imagem",
        alt: "Nova Imagem",
      };
    case "input":
      return {
        label: "Nova Entrada",
        placeholder: "Digite aqui...",
        inputType: "text",
      };
    case "button":
      return {
        buttonText: "Novo Botão",
        buttonStyle: "primary",
        actionType: "goToNextStep",
      };
    case "options":
      return {
        questionText: "Nova Pergunta",
        choices: [
          { text: "Opção 1", value: "opt1" },
          { text: "Opção 2", value: "opt2" },
        ],
        selectionType: "single",
      };
    case "alert":
      return {
        alertMessage: "Nova Mensagem",
        alertType: "info",
      };
    case "text":
      return { text: "Novo Texto" };
    case "spacer":
      return { styles: { height: "20px" } };
    default:
      return {};
  }
};

// --- Componente Principal ---

export const CaktoQuizEditor: React.FC = () => {
  // Combinar todas as questões reais
  const allQuestions = [
    ...clothingQuestions,
    ...strategicQuestions,
    ...selfPerceptionQuestions,
  ];

  // Converter questões reais para etapas do editor
  const realSteps = convertQuestionsToSteps(allQuestions);

  const [editorState, setEditorState] = useState<QuizEditorState>({
    steps:
      realSteps.length > 0
        ? realSteps
        : [
            {
              id: "step-1",
              name: "Primeira Etapa",
              components: [],
            },
          ],
    headerConfig: {
      showLogo: true,
      showProgressBar: true,
      allowReturnButton: true,
    },
    currentStepId: realSteps.length > 0 ? realSteps[0].id : "step-1",
  });

  // Adicionar função para recarregar questões reais
  const loadRealQuestions = () => {
    const realSteps = convertQuestionsToSteps(allQuestions);
    setEditorState((prev) => ({
      ...prev,
      steps: realSteps,
      currentStepId: realSteps.length > 0 ? realSteps[0].id : "step-1",
      selectedComponentId: undefined,
    }));
  };

  // Adicionar função para limpar e começar do zero
  const startFromScratch = () => {
    setEditorState({
      steps: [
        {
          id: "step-1",
          name: "Primeira Etapa",
          components: [],
        },
      ],
      headerConfig: {
        showLogo: true,
        showProgressBar: true,
        allowReturnButton: true,
      },
      currentStepId: "step-1",
    });
  };

  const currentStep = editorState.steps.find(
    (step) => step.id === editorState.currentStepId
  );
  const selectedComponent = currentStep?.components.find(
    (comp) => comp.id === editorState.selectedComponentId
  );

  const handleStepSelect = (stepId: string) => {
    setEditorState((prev) => ({
      ...prev,
      currentStepId: stepId,
      selectedComponentId: undefined,
    }));
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
      selectedComponentId: undefined,
    }));
  };

  const handleDeleteStep = (stepId: string) => {
    if (editorState.steps.length <= 1) return;

    const newSteps = editorState.steps.filter((step) => step.id !== stepId);
    const newCurrentStepId =
      stepId === editorState.currentStepId
        ? newSteps[0].id
        : editorState.currentStepId;

    setEditorState((prev) => ({
      ...prev,
      steps: newSteps,
      currentStepId: newCurrentStepId,
      selectedComponentId: undefined,
    }));
  };

  const handleAddComponent = (type: string) => {
    if (!currentStep) return;

    const newComponent: QuizComponent = {
      id: generateUniqueId(),
      type: type as QuizComponent["type"],
      props: getDefaultPropsForType(type),
    };

    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === prev.currentStepId
          ? { ...step, components: [...step.components, newComponent] }
          : step
      ),
      selectedComponentId: newComponent.id,
    }));
  };

  const handleComponentSelect = (componentId: string) => {
    setEditorState((prev) => ({
      ...prev,
      selectedComponentId: componentId,
    }));
  };

  const handleComponentDelete = (componentId: string) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === prev.currentStepId
          ? {
              ...step,
              components: step.components.filter(
                (comp) => comp.id !== componentId
              ),
            }
          : step
      ),
      selectedComponentId:
        prev.selectedComponentId === componentId
          ? undefined
          : prev.selectedComponentId,
    }));
  };

  const handleComponentUpdate = (
    componentId: string,
    props: QuizComponentProps
  ) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === prev.currentStepId
          ? {
              ...step,
              components: step.components.map((comp) =>
                comp.id === componentId ? { ...comp, props } : comp
              ),
            }
          : step
      ),
    }));
  };

  const handleSelectedComponentUpdate = (props: QuizComponentProps) => {
    if (editorState.selectedComponentId) {
      handleComponentUpdate(editorState.selectedComponentId, props);
    }
  };

  const handleSave = () => {
    console.log("Salvando quiz...", editorState);
    // Aqui você implementaria a lógica de salvamento
  };

  const handlePublish = () => {
    console.log("Publicando quiz...", editorState);
    // Aqui você implementaria a lógica de publicação
  };

  const handlePreview = () => {
    console.log("Visualizando quiz...", editorState);
    // Aqui você implementaria a lógica de preview
  };

  return (
    <div className="h-screen bg-zinc-900 flex flex-col">
      <EditorNavbar
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={handlePreview}
        onLoadRealQuestions={loadRealQuestions}
        onStartFromScratch={startFromScratch}
      />

      <div className="flex-1 flex overflow-hidden">
        <StepsSidebar
          steps={editorState.steps}
          currentStepId={editorState.currentStepId}
          onStepSelect={handleStepSelect}
          onAddStep={handleAddStep}
          onDeleteStep={handleDeleteStep}
        />

        <ComponentsToolbar onAddComponent={handleAddComponent} />

        {currentStep && (
          <StepEditor
            step={currentStep}
            selectedComponentId={editorState.selectedComponentId}
            onComponentSelect={handleComponentSelect}
            onComponentDelete={handleComponentDelete}
            onComponentUpdate={handleComponentUpdate}
          />
        )}

        <PropertiesPanel
          selectedComponent={selectedComponent}
          onComponentUpdate={handleSelectedComponentUpdate}
        />
      </div>
    </div>
  );
};

// Função auxiliar para obter propriedades padrão por tipo de componente
function getDefaultPropsForType(type: string): QuizComponentProps {
  switch (type) {
    case "heading":
      return { text: "Novo Título" };
    case "text":
      return { text: "Novo texto" };
    case "image":
      return { src: "", alt: "Imagem" };
    case "button":
      return { buttonText: "Clique aqui", buttonStyle: "primary" };
    case "options":
      return {
        questionText: "Nova pergunta?",
        choices: [
          { text: "Opção 1", value: "option1", scoreValue: 0 },
          { text: "Opção 2", value: "option2", scoreValue: 0 },
        ],
      };
    case "input":
      return {
        label: "Campo de entrada",
        placeholder: "Digite aqui...",
        inputType: "text",
      };
    case "alert":
      return { alertMessage: "Mensagem de alerta", alertType: "info" };
    case "customComponent":
      return {
        componentName: "ResultPage.tsx",
        offerHeadline: "Oferta especial",
      };
    default:
      return {};
  }
}

export default CaktoQuizEditor;
