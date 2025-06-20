import React, { useState, useEffect, useCallback } from "react";
import "@/styles/advanced-editor.css";
import "@/styles/editor.css";
import { GripVertical } from "lucide-react";

// --- Sistema de Auto-Save Funcional ---
const useAutoSave = (data: QuizEditorState | null, delay: number = 2000) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const saveToLocalStorage = useCallback(
    async (dataToSave: QuizEditorState) => {
      setIsSaving(true);
      try {
        // Salva no localStorage com versionamento
        const saveData = {
          data: dataToSave,
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        };

        localStorage.setItem("quiz-editor-state", JSON.stringify(saveData));

        // Também salva um backup rotativo
        const backupKey = `quiz-editor-backup-${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(saveData));

        // Limita a 5 backups
        const allKeys = Object.keys(localStorage).filter((key) =>
          key.startsWith("quiz-editor-backup-")
        );
        if (allKeys.length > 5) {
          allKeys
            .sort()
            .slice(0, -5)
            .forEach((key) => localStorage.removeItem(key));
        }

        // Simula salvamento no servidor
        await new Promise((resolve) => setTimeout(resolve, 300));

        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        console.log("✅ Auto-save realizado:", new Date().toLocaleTimeString());
      } catch (error) {
        console.error("❌ Erro no auto-save:", error);
        alert(
          "Erro ao salvar automaticamente. Suas alterações podem não estar sendo salvas."
        );
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!data) return;

    setHasUnsavedChanges(true);
    const timer = setTimeout(() => {
      saveToLocalStorage(data);
    }, delay);

    return () => clearTimeout(timer);
  }, [data, delay, saveToLocalStorage]);

  // Carrega dados salvos no localStorage na inicialização
  const loadFromLocalStorage = useCallback((): QuizEditorState | null => {
    try {
      const saved = localStorage.getItem("quiz-editor-state");
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log(
          "📂 Dados carregados do auto-save:",
          new Date(parsed.timestamp).toLocaleString()
        );
        return parsed.data;
      }
    } catch (error) {
      console.error("Erro ao carregar dados salvos:", error);
    }
    return null;
  }, []);

  // Função para salvar manualmente
  const saveManually = useCallback(() => {
    if (data) {
      saveToLocalStorage(data);
    }
  }, [data, saveToLocalStorage]);

  return {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    loadFromLocalStorage,
    saveManually,
  };
};

// --- Interfaces Aprimoradas para a Estrutura de Dados do Quiz ---

/**
 * @interface OptionChoice
 * @description Define uma única opção de resposta para componentes do tipo 'options'.
 * Inclui o texto da opção, seu valor (que pode ser usado para lógica de pontuação/resultado),
 * e a lógica de próxima etapa.
 */
interface OptionChoice {
  text: string; // Texto visível da opção (ex: "Clássico", "Moderno")
  value: string; // Valor interno da opção (ex: "classic", "modern")
  nextStepId?: string; // ID da próxima etapa (para fluxo linear ou ramificado)
  nextPageType?: "resultPage" | "quizOfferPage" | "transitionPage"; // Tipo da página final/especial
  scoreValue?: number; // Valor de pontuação associado a esta escolha (para quizzes com pontuação)
  image?: string; // URL da imagem associada à opção
}

/**
 * @interface QuizComponentProps
 * @description Define as propriedades de configuração para diferentes tipos de componentes do quiz.
 * Cada propriedade é configurada no editor e usada para a renderização do quiz final.
 */
interface QuizComponentProps {
  // Propriedades Comuns a Vários Componentes:
  text?: string; // Para Heading, Text, Button, Options (question text), Alert, Testimonials (quote)
  isHidden?: boolean; // Para ocultar o componente condicionalmente
  styles?: { [key: string]: string }; // Estilos CSS inline adicionais (ex: { color: '#FF0000', fontSize: '1.2rem' })

  // Propriedades Específicas de Imagem:
  src?: string; // URL da imagem
  alt?: string; // Texto alternativo da imagem
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"; // Como a imagem se ajusta ao contêiner

  // Propriedades Específicas de Entrada (Input):
  label?: string; // O texto do rótulo do campo (ex: "Seu Nome")
  placeholder?: string; // Texto de placeholder
  inputType?: "text" | "email" | "number" | "tel"; // Tipo de input HTML
  required?: boolean; // Se o campo é obrigatório (validação)
  validationRegex?: string; // Expressão regular para validação de formato
  errorMessage?: string; // Mensagem de erro para validação falha
  storeAsLeadField?: string; // Nome do campo para armazenar o valor como um lead (ex: 'nome', 'email')

  // Propriedades Específicas de Botão:
  buttonText?: string; // Texto do botão (ex: "Continuar", "Enviar")
  buttonStyle?: "primary" | "secondary" | "outline" | "ghost"; // Estilo visual predefinido
  actionType?: "goToNextStep" | "submitForm" | "redirectUrl" | "customFunction"; // Tipo de ação ao clicar
  actionTargetId?: string; // Para 'goToNextStep': ID da próxima etapa
  actionUrl?: string; // Para 'redirectUrl': URL para redirecionar
  customFunctionName?: string; // Para 'customFunction': Nome da função JS a ser executada

  // Propriedades Específicas de Opções (Múltipla Escolha/Seleção):
  questionText?: string; // O texto da pergunta
  choices?: OptionChoice[]; // Array de objetos de opções
  selectionType?: "single" | "multiple"; // Se permite uma ou múltiplas seleções
  // Lógica de ramificação condicional para o quiz (poderia ser mais complexa com regras)
  conditionalLogic?: {
    rule: "allSelected" | "anySelected" | "scoreThreshold";
    threshold?: number; // Para scoreThreshold
    targetStepId?: string; // Para onde ir se a condição for satisfeita
    fallbackStepId?: string; // Para onde ir se a condição não for satisfeita
  };

  // Propriedades Específicas de Alerta:
  alertType?: "info" | "warning" | "error" | "success"; // Tipo visual do alerta
  alertMessage?: string; // Conteúdo da mensagem de alerta

  // Propriedades Específicas de Vídeo:
  videoUrl?: string; // URL do vídeo (YouTube, Vimeo, etc.)
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean; // Mostrar controles do player

  // Propriedades Específicas de Carrosel:
  images?: { src: string; alt: string; caption?: string }[]; // Array de imagens para o carrosel
  autoSlide?: boolean; // Se as imagens devem mudar automaticamente
  slideInterval?: number; // Intervalo em ms para autoSlide

  // Propriedades Específicas de Spacer:
  height?: number; // Altura do espaçador em pixels

  // Propriedades para componentes personalizados (ResultPage.tsx, QuizOfferPage.tsx)
  // Estas seriam configurações específicas que o componente React customizado esperaria.
  resultType?: "styleAnalysis" | "personalityProfile"; // Para ResultPage: tipo de resultado
  offerHeadline?: string; // Para ResultPage/QuizOfferPage: título da oferta
  offerDescription?: string; // Para ResultPage/QuizOfferPage: descrição detalhada
  offerCtaButtonText?: string; // Para ResultPage/QuizOfferPage: texto do botão CTA
  offerCtaUrl?: string; // Para ResultPage/QuizOfferPage: URL do CTA
  // E.g., para ResultPage.tsx
  resultMapping?: {
    scoreRange: [number, number];
    resultId: string;
    offerId: string;
  }[]; // Lógica de mapeamento de pontuação para resultados e ofertas
  // E.g., para QuizOfferPage.tsx
  offerProductSku?: string; // SKU do produto em oferta
  discountCode?: string; // Código de cupom
  componentName?: string; // Nome do componente para customComponent

  // Propriedades específicas para ResultPage.tsx
  styleImages?: { [key: string]: string[] }; // Mapear estilos para arrays de URLs de imagens
  styleNames?: { [key: string]: string }; // Mapear estilos para nomes amigáveis
}

/**
 * @interface QuizComponent
 * @description Representa um componente genérico no canvas do quiz, com propriedades de configuração.
 */
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
    | "customComponent"; // 'customComponent' para ResultPage.tsx/QuizOfferPage.tsx
  props: QuizComponentProps;
}

/**
 * @interface QuizStep
 * @description Representa uma etapa do quiz.
 * A lógica de navegação entre as etapas também é uma configuração.
 */
interface QuizStep {
  id: string;
  name: string;
  components: QuizComponent[];
  defaultNextStepId?: string; // ID da próxima etapa se não houver lógica condicional nos componentes
  finalPageType?: "resultPage" | "quizOfferPage"; // Ou para páginas de resultado/oferta, um tipo de página final
}

/**
 * @interface QuizHeaderConfig
 * @description Representa as configurações globais do cabeçalho do quiz.
 */
interface QuizHeaderConfig {
  showLogo: boolean;
  showProgressBar: boolean;
  allowReturnButton: boolean;
  logoUrl?: string;
  progressColor?: string;
  title?: string;
  subtitle?: string;
}

/**
 * @interface QuizEditorState
 * @description Representa o estado completo do quiz no editor.
 * Contém todas as etapas, configurações do cabeçalho e a etapa atualmente selecionada.
 */
interface QuizEditorState {
  steps: QuizStep[]; // Array de todas as etapas do quiz
  headerConfig: QuizHeaderConfig; // Configurações do cabeçalho
  currentStepId: string; // ID da etapa atualmente visível/selecionada no editor
}

// --- Componentes Reutilizáveis (Simulações dos elementos do Canvas) ---

/**
 * @component EditableHeading
 * @description Componente para exibir e simular a edição de um título seguindo o design original.
 */
const EditableHeading: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div className="text-center mb-8">
    <h1
      className="text-white font-bold leading-tight tracking-wide"
      style={{
        fontSize: component.props.styles?.fontSize || "2rem",
        textAlign: component.props.styles?.textAlign || "center",
        color: component.props.styles?.color || "#ffffff",
        fontWeight: component.props.styles?.fontWeight || "700",
        letterSpacing: "0.025em",
        ...component.props.styles,
      }}
    >
      {component.props.text || "TÍTULO EDITÁVEL"}
    </h1>
  </div>
);

/**
 * @component EditableImage
 * @description Componente para exibir uma imagem seguindo o layout original.
 */
const EditableImage: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div className="w-full flex justify-center mb-6">
    <div className="relative">
      <img
        src={
          component.props.src ||
          "https://placehold.co/400x300/0f172a/94a3b8?text=Imagem"
        }
        alt={component.props.alt || "Imagem"}
        className="rounded-2xl shadow-2xl max-w-full h-auto"
        style={{
          width: component.props.styles?.width || "400px",
          height: component.props.styles?.height || "300px",
          objectFit: component.props.objectFit || "cover",
          ...component.props.styles,
        }}
      />
      {/* Overlay sutil para dar profundidade */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  </div>
);

/**
 * @component EditableInput
 * @description Componente para exibir um campo de entrada seguindo o design original.
 */
const EditableInput: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div className="w-full mb-6" style={component.props.styles}>
    <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-wider">
      {component.props.label || "Campo de Entrada"}{" "}
      {component.props.required && <span className="text-yellow-400">*</span>}
    </label>
    <input
      type={component.props.inputType || "text"}
      className="w-full px-4 py-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
      placeholder={component.props.placeholder || "Digite aqui..."}
      value="" // Em um editor, seria um valor controlado
      readOnly // Para simular que é um editor e não um quiz ativo
    />
    {component.props.errorMessage && (
      <span className="text-xs text-red-400 mt-2 block">
        {component.props.errorMessage}
      </span>
    )}
  </div>
);

/**
 * @component EditableButton
 * @description Componente para exibir um botão seguindo o design original.
 */
const EditableButton: React.FC<{ component: QuizComponent }> = ({
  component,
}) => {
  const getButtonClass = (style: string) => {
    switch (style) {
      case "secondary":
        return "bg-zinc-700 hover:bg-zinc-600 text-white border border-zinc-600";
      case "outline":
        return "border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent";
      case "ghost":
        return "text-yellow-500 hover:bg-yellow-500/10 bg-transparent";
      default:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg hover:shadow-xl";
    }
  };

  return (
    <div className="text-center mb-6">
      <button
        className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 min-w-[200px] transform hover:scale-105 ${getButtonClass(
          component.props.buttonStyle || "primary"
        )}`}
        style={component.props.styles}
      >
        {component.props.buttonText || "Continuar"}
      </button>
    </div>
  );
};

/**
 * @component OptionsComponent
 * @description Componente para exibir opções de múltipla escolha seguindo exatamente o design do quiz original.
 */
const OptionsComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="flex flex-col items-start justify-start gap-3"
    style={component.props.styles}
  >
    {component.props.choices?.map((choice, index) => (
      <button
        key={index}
        className="w-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 hover:border-yellow-500 hover:bg-zinc-700/90 rounded-lg p-4 transition-all duration-200 text-left group hover:scale-[1.02] hover:shadow-lg"
      >
        <div className="flex items-center gap-4">
          {choice.image && (
            <div className="flex-shrink-0 w-16 h-16">
              <img
                src={choice.image}
                alt={choice.text}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-white text-base font-medium leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: choice.text }} />
            </div>
            {choice.scoreValue && (
              <span className="text-xs text-yellow-400 mt-1 inline-block">
                +{choice.scoreValue} pts
              </span>
            )}
          </div>
          <div className="text-zinc-400 group-hover:text-yellow-400 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </button>
    ))}
    {component.props.selectionType === "multiple" && (
      <p className="text-xs text-zinc-400 mt-2 text-center w-full">
        💡 Você pode selecionar múltiplas opções
      </p>
    )}
  </div>
);

/**
 * @component AlertComponent
 * @description Componente para exibir um alerta.
 */
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

/**
 * @component CustomComponentPlaceholder
 * @description Simula um componente de script para `ResultPage.tsx` ou `QuizOfferPage.tsx`.
 */
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

/**
 * @component SpacerComponent
 * @description Componente para espaçamento seguindo o design real.
 */
const SpacerComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div
    className="min-w-full py-2 border-dashed border-yellow-500 border rounded-lg"
    style={{
      height: `${component.props.height || 20}px`,
      ...component.props.styles,
    }}
  >
    <div className="flex items-center justify-center h-full text-yellow-500 text-xs">
      Espaçador ({component.props.height || 20}px)
    </div>
  </div>
);

/**
 * @component TextComponent
 * @description Componente para exibir texto simples seguindo o design original.
 */
const TextComponent: React.FC<{ component: QuizComponent }> = ({
  component,
}) => {
  const textAlign =
    (component.props.styles?.textAlign as React.CSSProperties["textAlign"]) ||
    "center";

  return (
    <div className="text-center mb-6">
      <p
        className="text-zinc-300 leading-relaxed"
        style={{
          fontSize: component.props.styles?.fontSize || "1.1rem",
          textAlign,
          color: component.props.styles?.color || "#d1d5db",
          lineHeight: "1.6",
          ...component.props.styles,
        }}
      >
        {component.props.text || "Texto Editável"}
      </p>
    </div>
  );
};

// Mapeamento de tipos de componentes para seus respectivos React Components de VISUALIZAÇÃO
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

/**
 * @function generateUniqueId
 * @description Gera um ID único para componentes ou etapas.
 */
const generateUniqueId = (): string =>
  `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- Componente CanvasArea ---
interface CanvasAreaProps {
  currentStep: QuizStep | null;
  headerConfig: QuizHeaderConfig;
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
  viewportMode?: "desktop" | "mobile";
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
  viewportMode = "desktop",
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

  // Função para renderizar cada componente com visualização funcional
  const ComponentToRender: React.FC<{ component: QuizComponent }> = ({
    component,
  }) => {
    const ViewComponent = componentViewMap[component.type];

    if (!ViewComponent) {
      return (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
          Componente "{component.type}" não implementado
        </div>
      );
    }

    return <ViewComponent component={component} />;
  };

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
      {/* Layout exato do quiz original */}
      <div className="min-h-screen flex flex-col">
        {/* Header fixo com logo e barra de progresso */}
        <div className="w-full bg-black/30 backdrop-blur-sm">
          <div className="max-w-md mx-auto px-4 py-6">
            {/* Logo centralizado */}
            {headerConfig.showLogo && (
              <div className="text-center mb-6">
                <img
                  src={
                    headerConfig.logoUrl ||
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                  }
                  alt="Logo"
                  className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg"
                />
              </div>
            )}

            {/* Barra de Progresso */}
            {headerConfig.showProgressBar && (
              <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-600"
                  style={{
                    width: "30%", // Simulado baseado na etapa atual
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div
            className={`w-full transition-all duration-300 ${
              viewportMode === "mobile" ? "max-w-sm" : "max-w-md"
            }`}
          >
            {/* Container dos Componentes */}
            <div className="space-y-8">
              {currentStep.components.length === 0 ? (
                <div className="text-center py-16 text-zinc-400 border-2 border-dashed border-zinc-600 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <svg
                      className="w-12 h-12 mx-auto text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">
                    Esta etapa está vazia
                  </p>
                  <p className="text-sm mb-6">
                    Adicione componentes usando a barra lateral à esquerda
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => onComponentAdd("heading")}
                      className="px-3 py-1 bg-yellow-500 text-black rounded text-sm hover:bg-yellow-600 font-medium"
                    >
                      + Título
                    </button>
                    <button
                      onClick={() => onComponentAdd("text")}
                      className="px-3 py-1 bg-yellow-500 text-black rounded text-sm hover:bg-yellow-600 font-medium"
                    >
                      + Texto
                    </button>
                    <button
                      onClick={() => onComponentAdd("image")}
                      className="px-3 py-1 bg-yellow-500 text-black rounded text-sm hover:bg-yellow-600 font-medium"
                    >
                      + Imagem
                    </button>
                    <button
                      onClick={() => onComponentAdd("button")}
                      className="px-3 py-1 bg-yellow-500 text-black rounded text-sm hover:bg-yellow-600 font-medium"
                    >
                      + Botão
                    </button>
                  </div>
                </div>
              ) : (
                currentStep.components.map((component) => {
                  return component ? (
                    <div
                      key={component.id}
                      className={`group/canvas-item w-full canvas-item min-h-[1.25rem] relative cursor-pointer transition-all duration-200`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onComponentSelect(component.id);
                      }}
                    >
                      {/* Container com bordas que indicam seleção */}
                      <div
                        id={component.id}
                        className={`min-h-[1.25rem] w-full relative rounded-lg transition-all duration-200 ${
                          selectedComponentId === component.id
                            ? "ring-2 ring-yellow-500 ring-offset-2 ring-offset-transparent bg-yellow-500/5"
                            : "hover:ring-1 hover:ring-zinc-500 hover:ring-offset-1 hover:ring-offset-transparent"
                        }`}
                      >
                        {/* Controles do componente - aparecem quando selecionado */}
                        {selectedComponentId === component.id && (
                          <div className="absolute -top-10 right-0 flex gap-1 z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onComponentMove(component.id, "up");
                              }}
                              className="w-8 h-8 bg-yellow-500 text-black rounded-full text-xs flex items-center justify-center hover:bg-yellow-600 transition-colors font-bold"
                              title="Mover para cima"
                              disabled={
                                currentStep.components.indexOf(component) === 0
                              }
                            >
                              ↑
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onComponentMove(component.id, "down");
                              }}
                              className="w-8 h-8 bg-yellow-500 text-black rounded-full text-xs flex items-center justify-center hover:bg-yellow-600 transition-colors font-bold"
                              title="Mover para baixo"
                              disabled={
                                currentStep.components.indexOf(component) ===
                                currentStep.components.length - 1
                              }
                            >
                              ↓
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onComponentDelete(component.id);
                              }}
                              className="w-8 h-8 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors font-bold"
                              title="Excluir componente"
                            >
                              ×
                            </button>
                          </div>
                        )}

                        {/* Label do tipo de componente */}
                        {selectedComponentId === component.id && (
                          <div className="absolute -top-10 left-0 text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded z-20">
                            {component.type}
                          </div>
                        )}

                        {/* Renderização do componente */}
                        <ComponentToRender component={component} />
                      </div>
                    </div>
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Componentes Principais do Editor (UI Layout) ---

/**
 * @component FunnelNavbar
 * @description Simula a barra de navegação superior do editor.
 * Contém botões de ação e navegação que aparecem no topo do editor.
 * Agora recebe callbacks para Salvar e Publicar.
 * @param {object} props - Propriedades do componente.
 * @param {() => Promise<void>} props.onSave - Callback para salvar o quiz.
 * @param {() => Promise<void>} props.onPublish - Callback para publicar o quiz.
 * @param {boolean} props.isSaving - Estado de salvamento.
 * @param {boolean} props.isPublishing - Estado de publicação.
 */
export const FunnelNavbar: React.FC<{
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
  autoSaveStatus?: {
    isAutoSaving: boolean;
    lastSaved: Date | null;
  };
  viewportMode?: "desktop" | "mobile";
  onToggleViewport?: () => void;
}> = ({
  onSave,
  onPublish,
  isSaving,
  isPublishing,
  autoSaveStatus,
  viewportMode,
  onToggleViewport,
}) => {
  return (
    <div className="h-fit border-b border-gray-200 relative z-[20] bg-white shadow-sm">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between">
        <div className="order-0 md:order-0 flex w-full max-w-[5.75rem] lg:max-w-[18rem]">
          <div className="border-r border-gray-200">
            {/* Botão de Fechar/Voltar para o Dashboard */}
            <button className="inline-block relative font-bold px-4 py-[1rem] text-gray-800 border border-transparent hover:text-primary rounded-none h-full md:px-5">
              <span className="h-full flex items-center w-full justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex p-3 gap-1 md:gap-2">
              {/* Botão Desfazer */}
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-undo h-4 w-4"
                >
                  <path d="M3 7v6h6"></path>
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
                </svg>
              </button>
              {/* Botão Refazer (desabilitado) */}
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 w-10"
                disabled
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-redo h-4 w-4"
                >
                  <path d="M21 7v6h-6"></path>
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
                </svg>
              </button>
              {/* Botão Copiar */}
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clipboard h-4 w-4"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Navegação principal do editor (Construtor, Fluxo, Design, Leads, Configurações) */}
        <div className="border-t border-gray-200 md:border-t-0 md:order-1 w-full">
          <div className="md:mx-auto md:max-w-[32rem] flex h-full items-center justify-center p-1 md:p-0 gap-1 md:gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white h-10 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil-ruler md:mr-2 md:mx-0 mx-4 h-4 w-4"
              >
                <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"></path>
                <path d="m8 6 2-2"></path>
                <path d="m18 16 2-2"></path>
                <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"></path>
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              <span className="hidden md:inline">Construtor</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost text-gray-800 hover:bg-gray-100 h-10 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-workflow md:mr-2 md:mx-0 mx-4 h-4 w-4"
              >
                <rect width="8" height="8" x="3" y="3" rx="2"></rect>
                <path d="M7 11v4a2 2 0 0 0 2 2h4"></path>
                <rect width="8" height="8" x="13" y="13" rx="2"></rect>
              </svg>
              <span className="hidden md:inline">Fluxo</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost text-gray-800 hover:bg-gray-100 h-10 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-palette md:mr-2 md:mx-0 mx-4 h-4 w-4"
              >
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
              </svg>
              <span className="hidden md:inline">Design</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost text-gray-800 hover:bg-gray-100 h-10 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-round-search md:mr-2 md:mx-0 mx-4 h-4 w-4"
              >
                <circle cx="10" cy="8" r="5"></circle>
                <path d="M2 21a8 8 0 0 1 10.434-7.62"></path>
                <circle cx="18" cy="18" r="3"></circle>
                <path d="m22 22-1.9-1.9"></path>
              </svg>
              <span className="hidden md:inline">Leads</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost text-gray-800 hover:bg-gray-100 h-10 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cog md:mr-2 md:mx-0 mx-4 h-4 w-4"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                <path d="M12 2v2"></path>
                <path d="M12 22v-2"></path>
                <path d="m17 20.66-1-1.73"></path>
                <path d="M11 10.27 7 3.34"></path>
                <path d="m20.66 17-1.73-1"></path>
                <path d="m3.34 7 1.73 1"></path>
                <path d="M14 12h8"></path>
                <path d="M2 12h2"></path>
                <path d="m20.66 7-1.73 1"></path>
                <path d="m3.34 17 1.73-1"></path>
                <path d="m17 3.34-1 1.73"></path>
                <path d="m11 13.73-4 6.93"></path>
              </svg>
              <span className="hidden md:inline">Configurações</span>
            </button>
          </div>
        </div>
        {/* Botões de visualização (mobile/desktop) e ações (Salvar, Publicar) */}
        <div className="md:flex hidden order-1 md:order-3 w-fit gap-1 md:gap-2 p-3">
          {/* Indicador de Auto-Save */}
          {autoSaveStatus && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
              {autoSaveStatus.isAutoSaving ? (
                <>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Salvando...</span>
                </>
              ) : autoSaveStatus.lastSaved ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">
                    Salvo {autoSaveStatus.lastSaved.toLocaleTimeString()}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Não salvo</span>
                </>
              )}
            </div>
          )}

          <button className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 w-10 md:flex hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-monitor-smartphone h-4 w-4"
            >
              <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"></path>
              <path d="M10 19v-3.96 3.15"></path>
              <path d="M7 19h5"></path>
              <rect width="6" height="10" x="16" y="12" rx="2"></rect>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-waypoints h-4 w-4"
            >
              <circle cx="12" cy="4.5" r="2.5"></circle>
              <path d="m10.2 6.3-3.9 3.9"></path>
              <circle cx="4.5" cy="12" r="2.5"></circle>
              <path d="M7 12h10"></path>
              <circle cx="19.5" cy="12" r="2.5"></circle>
              <path d="m13.8 17.7 3.9-3.9"></path>
              <circle cx="12" cy="19.5" r="2.5"></circle>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play h-4 w-4"
            >
              <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
          </button>
          {/* Botão Salvar - Agora com estado de carregamento */}
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 h-10 px-4 py-2"
            onClick={onSave}
            disabled={isSaving || isPublishing}
          >
            <span className="md:inline hidden">
              {isSaving ? "Salvando..." : "Salvar"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-save w-4 h-4 md:hidden block ${
                isSaving ? "animate-spin" : ""
              }`}
            >
              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
              <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
            </svg>
          </button>
          {/* Botão Publicar - Agora com estado de carregamento */}
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white h-10 px-4 py-2"
            onClick={onPublish}
            disabled={isSaving || isPublishing}
          >
            <span className="md:inline hidden">
              {isPublishing ? "Publicando..." : "Publicar"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-cloud w-4 h-4 md:hidden block ${
                isPublishing ? "animate-spin" : ""
              }`}
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * @component FunnelStepSidebar
 * @description Simula a barra lateral esquerda para listar as etapas do quiz.
 * Permite a seleção de etapas para visualização/edição no canvas.
 */
export const FunnelStepSidebar: React.FC<{
  steps: QuizStep[];
  currentStepId: string;
  onStepSelect: (stepId: string) => void;
  onAddStep: () => void;
}> = ({ steps, currentStepId, onStepSelect, onAddStep }) => {
  return (
    <div className="w-full min-h-[3rem] relative border-b border-gray-200 overflow-auto none-scrollbar md:max-w-[13rem] md:border-r bg-white">
      <div className="h-full w-full rounded-[inherit] overflow-hidden scroll">
        <div className="flex flex-col">
          {/* Mapeia sobre cada etapa para criar um botão na sidebar */}
          {steps.map((step) => (
            <div
              key={step.id}
              className={`group border-b md:border-y md:border-r-0 min-w-[10rem] -mt-[1px] flex pl-2 relative items-center cursor-pointer 
                            ${
                              step.id === currentStepId
                                ? "bg-primary-light border-l-4 border-primary"
                                : "hover:bg-gray-50"
                            }`}
              onClick={() => onStepSelect(step.id)} // Define a etapa clicada como a etapa atual
            >
              {/* Ícone de "grip" para indicar que a etapa é arrastável */}
              <span className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grip w-4 h-4 text-gray-600"
                >
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="19" cy="5" r="1"></circle>
                  <circle cx="5" cy="5" r="1"></circle>
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                  <circle cx="19" cy="19" r="1"></circle>
                  <circle cx="5" cy="19" r="1"></circle>
                </svg>
              </span>
              <div className="w-full relative z-[5]">
                {/* Nome da etapa */}
                <span className="block h-[3rem] w-full p-3 text-gray-800">
                  {step.name}
                </span>
              </div>
              {/* Ícone de opções da etapa (elipsis vertical) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ellipsis-vertical mr-2 w-4 h-4 cursor-pointer text-gray-600"
                type="button"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </div>
          ))}
          {/* Botão para adicionar nova etapa */}
          <div className="grid md:p-1 relative">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-gray-100 text-gray-800 h-10 px-4 py-2"
              onClick={onAddStep}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus mr-2 h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>{" "}
              Adicionar Etapa
            </button>
          </div>
          <div className="py-10"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * @component FunnelToolbarSidebar
 * @description Sidebar com paleta completa de componentes para arrastar e criar.
 */
const FunnelToolbarSidebar: React.FC<{
  onComponentAdd: (type: string) => void;
}> = ({ onComponentAdd }) => {
  const toolbarItems = [
    {
      name: "Título",
      type: "heading",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M4 12h8"></path>
          <path d="M4 18V6"></path>
          <path d="M12 18V6"></path>
          <path d="m17 12 3-2v8"></path>
        </svg>
      ),
    },
    {
      name: "Texto",
      type: "text",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M17 6.1H3"></path>
          <path d="M21 12.1H3"></path>
          <path d="M15.1 18H3"></path>
        </svg>
      ),
    },
    {
      name: "Imagem",
      type: "image",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      ),
    },
    {
      name: "Botão",
      type: "button",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <rect width="20" height="12" x="2" y="6" rx="2"></rect>
        </svg>
      ),
    },
    {
      name: "Campo",
      type: "input",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"></path>
          <path d="M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"></path>
          <path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"></path>
        </svg>
      ),
    },
    {
      name: "Opções",
      type: "options",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="9,11 12,14 22,4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
    },
    {
      name: "Vídeo",
      type: "video",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
          <rect x="2" y="6" width="14" height="12" rx="2"></rect>
        </svg>
      ),
    },
    {
      name: "Espaço",
      type: "spacer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"></path>
          <path d="M22 7v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1V7"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-zinc-900 border-r border-zinc-700">
      {/* Cabeçalho da Biblioteca */}
      <div className="p-3 border-b border-zinc-700">
        <h3 className="text-sm font-semibold text-white mb-1">
          Adicionar Componentes
        </h3>
        <p className="text-xs text-zinc-400">Clique para adicionar ao canvas</p>
      </div>

      {/* Lista de Componentes */}
      <div className="overflow-y-auto flex-1 p-2 space-y-1">
        {toolbarItems.map((item, index) => (
          <button
            key={index}
            className="w-full bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 hover:border-zinc-600 p-3 cursor-pointer transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              onComponentAdd(item.type);
              console.log(
                `✅ Adicionando componente: ${item.name} (${item.type})`
              );
            }}
            title={`Adicionar ${item.name}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-zinc-300 group-hover:text-white transition-colors flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-zinc-400 group-hover:text-zinc-300">
                  Clique para adicionar
                </div>
              </div>
              <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
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
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Rodapé */}
      <div className="p-3 border-t border-zinc-700">
        <div className="text-xs text-zinc-400 text-center">
          💡 Depois de adicionar, clique no componente para configurá-lo
        </div>
      </div>
    </div>
  );
};

/**
 * @component StepEditorCanvas
 * @description Canvas principal onde os componentes são exibidos e editados.
 */
const StepEditorCanvas: React.FC<{
  currentStep: QuizStep;
  headerConfig: QuizHeaderConfig;
  onComponentSelect: (componentId: string | null) => void;
  selectedComponentId: string | null;
}> = ({
  currentStep,
  headerConfig,
  onComponentSelect,
  selectedComponentId,
}) => {
  const totalSteps = 15; // Simula o total de etapas para a barra de progresso
  const currentStepIndex = 1; // Simplificado para este exemplo

  return (
    <div
      className="w-full h-full overflow-auto z-10 bg-zinc-950"
      onClick={() => onComponentSelect(null)}
    >
      <div className="h-full w-full rounded-[inherit] overflow-hidden scroll">
        <div className="group relative main-content w-full min-h-full mx-auto">
          <div className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 group-[.screen-mobile]:p-3 md:p-5 pb-10">
            {/* Header do Canvas (Logo, Progresso, Botão Voltar) */}
            {headerConfig.showLogo ||
            headerConfig.showProgressBar ||
            headerConfig.allowReturnButton ? (
              <div className="grid gap-4 opacity-100">
                <div className="flex flex-row w-full h-auto justify-center relative bg-zinc-800/50 p-4 rounded-md">
                  {/* Botão de Voltar */}
                  {headerConfig.allowReturnButton && (
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-zinc-700 hover:text-foreground h-10 w-10 absolute left-2 top-1/2 -translate-y-1/2 text-zinc-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-left h-4 w-4"
                      >
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                      </svg>
                    </button>
                  )}
                  <div className="flex flex-col w-full customizable-width justify-start items-center gap-4">
                    {/* Logo  */}
                    {headerConfig.showLogo && (
                      <img
                        width="96"
                        height="96"
                        className="max-w-24 object-cover rounded-full"
                        alt="Logo"
                        src={
                          headerConfig.logoUrl ||
                          "https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png"
                        }
                      />
                    )}
                    {/* Barra de Progresso  */}
                    {headerConfig.showProgressBar && (
                      <div
                        role="progressbar"
                        className="relative w-full overflow-hidden rounded-full bg-zinc-600 h-2"
                      >
                        <div
                          className="progress h-full flex-1 transition-all"
                          style={{
                            width: `${(currentStepIndex / totalSteps) * 100}%`,
                            backgroundColor:
                              headerConfig.progressColor || "#DEB57D",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Conteúdo principal da etapa */}
            <div className="main-content w-full relative mx-auto customizable-width h-full bg-zinc-800/50 p-4 rounded-md">
              <div className="flex flex-col gap-4 pb-10">
                {/* Mapeia os componentes da etapa atual e renderiza o componente React apropriado */}
                {currentStep.components.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus-circle text-zinc-500 mb-4"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12h8"></path>
                      <path d="M12 8v8"></path>
                    </svg>
                    <p className="text-zinc-500 mb-2">Canvas vazio</p>
                    <p className="text-sm text-zinc-400">
                      Arraste componentes da barra lateral ou clique em um
                      componente para adicioná-lo aqui
                    </p>
                  </div>
                ) : (
                  currentStep.components.map((component) => {
                    const ComponentToRender = componentViewMap[component.type];
                    return ComponentToRender ? (
                      <div
                        key={component.id}
                        className={`group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto flex-basis-100 cursor-pointer`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onComponentSelect(component.id);
                        }}
                      >
                        {/* Container com bordas que indicam seleção */}
                        <div
                          id={component.id}
                          className={`min-h-[1.25rem] min-w-full relative self-auto box-border rounded-md transition-all ${
                            selectedComponentId === component.id
                              ? "ring-2 ring-blue-500 bg-blue-500/10"
                              : "hover:ring-1 hover:ring-zinc-500"
                          }`}
                        >
                          <ComponentToRender component={component} />
                        </div>
                      </div>
                    ) : null;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE EDIÇÃO DE PROPRIEDADES ---

/**
 * @component ComponentPropertyEditor
 * @description Editor avançado de propriedades para componentes baseado no HTML fornecido
 */
const ComponentPropertyEditor: React.FC<{
  type: string;
  props: QuizComponentProps;
  onPropsChange: (newProps: Partial<QuizComponentProps>) => void;
}> = ({ type, props, onPropsChange }) => {
  const handleChange = (key: string, value: unknown) => {
    onPropsChange({ [key]: value });
  };

  // Editor de estilos JSON
  const StylesEditor = () => (
    <div className="space-y-3">
      <label className="text-sm font-medium leading-none text-zinc-100">
        Estilos (JSON)
      </label>
      <textarea
        className="flex min-h-[80px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        value={JSON.stringify(props.styles || {}, null, 2)}
        onChange={(e) => {
          try {
            const styles = JSON.parse(e.target.value);
            handleChange("styles", styles);
          } catch {
            // Ignora erros de parse durante a digitação
          }
        }}
        placeholder='{"color": "#FF0000", "fontSize": "1.2rem"}'
      />
    </div>
  );

  // Renderiza campos específicos para cada tipo de componente
  switch (type) {
    case "heading":
    case "text":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Texto
            </label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              value={props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Digite o texto aqui..."
            />
          </div>

          {/* Controles de Tamanho de Fonte */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 p-4">
            <h4 className="text-sm font-medium text-zinc-100 mb-3">
              Tamanho da Fonte
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">
                  Tamanho (rem)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                  value={parseFloat(
                    props.styles?.fontSize?.replace("rem", "") || "1"
                  )}
                  onChange={(e) => {
                    const newStyles = { ...props.styles };
                    newStyles.fontSize = `${e.target.value}rem`;
                    handleChange("styles", newStyles);
                  }}
                />
                <span className="text-xs text-zinc-400">
                  {props.styles?.fontSize || "1rem"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`px-3 py-1 rounded text-xs ${
                    props.styles?.fontWeight === "normal"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                  onClick={() => {
                    const newStyles = { ...props.styles };
                    newStyles.fontWeight = "normal";
                    handleChange("styles", newStyles);
                  }}
                >
                  Normal
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs ${
                    props.styles?.fontWeight === "bold"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                  onClick={() => {
                    const newStyles = { ...props.styles };
                    newStyles.fontWeight = "bold";
                    handleChange("styles", newStyles);
                  }}
                >
                  Negrito
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    className={`px-2 py-1 rounded text-xs ${
                      props.styles?.textAlign === align
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                    }`}
                    onClick={() => {
                      const newStyles = { ...props.styles };
                      newStyles.textAlign = align;
                      handleChange("styles", newStyles);
                    }}
                  >
                    {align === "left" ? "⬅️" : align === "center" ? "↔️" : "➡️"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <StylesEditor />
        </div>
      );

    case "image":
      return (
        <div className="space-y-4">
          {/* Seção: Origem */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Origem</p>
            </div>
            <div className="p-6 pt-0 gap-4 flex flex-col">
              <div className="flex flex-col-reverse items-start gap-2">
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value="url"
                  disabled
                >
                  <option value="url">URL</option>
                </select>
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Entrada
                </label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={props.src || ""}
                  onChange={(e) => handleChange("src", e.target.value)}
                  placeholder="Digite aqui..."
                />
              </div>
            </div>
          </div>

          {/* Seção: Tamanho e Dimensões */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Tamanho e Dimensões</p>
            </div>
            <div className="p-6 pt-0 gap-4 flex flex-col">
              {/* Largura */}
              <div>
                <label className="text-sm font-medium leading-none text-zinc-100 mb-2 block">
                  Largura
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={props.styles?.width || "auto"}
                    onChange={(e) => {
                      const newStyles = { ...props.styles };
                      newStyles.width = e.target.value;
                      handleChange("styles", newStyles);
                    }}
                  >
                    <option value="auto">Auto</option>
                    <option value="100%">100%</option>
                    <option value="80%">80%</option>
                    <option value="60%">60%</option>
                    <option value="40%">40%</option>
                    <option value="20%">20%</option>
                    <option value="custom">Personalizado</option>
                  </select>
                  {props.styles?.width === "custom" && (
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                      placeholder="200px"
                      onChange={(e) => {
                        const newStyles = { ...props.styles };
                        newStyles.width = e.target.value;
                        handleChange("styles", newStyles);
                      }}
                    />
                  )}
                </div>

                {/* Slider para largura percentual */}
                {props.styles?.width && props.styles.width.includes("%") && (
                  <div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                      value={parseInt(props.styles.width.replace("%", ""))}
                      onChange={(e) => {
                        const newStyles = { ...props.styles };
                        newStyles.width = `${e.target.value}%`;
                        handleChange("styles", newStyles);
                      }}
                    />
                    <span className="text-xs text-zinc-400">
                      {props.styles.width}
                    </span>
                  </div>
                )}
              </div>

              {/* Altura */}
              <div>
                <label className="text-sm font-medium leading-none text-zinc-100 mb-2 block">
                  Altura
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={props.styles?.height || "auto"}
                    onChange={(e) => {
                      const newStyles = { ...props.styles };
                      newStyles.height = e.target.value;
                      handleChange("styles", newStyles);
                    }}
                  >
                    <option value="auto">Auto</option>
                    <option value="200px">Pequena (200px)</option>
                    <option value="300px">Média (300px)</option>
                    <option value="400px">Grande (400px)</option>
                    <option value="500px">Muito Grande (500px)</option>
                    <option value="custom">Personalizada</option>
                  </select>
                  {props.styles?.height === "custom" && (
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                      placeholder="300px"
                      onChange={(e) => {
                        const newStyles = { ...props.styles };
                        newStyles.height = e.target.value;
                        handleChange("styles", newStyles);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Estilo */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Estilo</p>
            </div>
            <div className="p-6 pt-0 gap-4 flex flex-col">
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Texto Alternativo
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={props.alt || ""}
                  onChange={(e) => handleChange("alt", e.target.value)}
                  placeholder="Descrição da imagem"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Ajuste da Imagem
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={props.objectFit || "cover"}
                  onChange={(e) =>
                    handleChange(
                      "objectFit",
                      e.target.value as QuizComponentProps["objectFit"]
                    )
                  }
                >
                  <option value="cover">Cobrir</option>
                  <option value="contain">Conter</option>
                  <option value="fill">Preencher</option>
                  <option value="none">Nenhum</option>
                  <option value="scale-down">Reduzir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Secao: Personalizacao */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Personalização</p>
            </div>
            <div className="p-6 pt-0">
              <div className="grid grid-cols-3 w-full items-center gap-1.5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-none text-zinc-100">
                    Cor
                  </label>
                  <div className="relative">
                    <input
                      type="color"
                      className="flex w-full h-10 border-none text-sm cursor-pointer bg-zinc-700 focus:ring-2 focus:ring-blue-500 rounded-md"
                      value={props.styles?.backgroundColor || "#000000"}
                      onChange={(e) => {
                        const newStyles = { ...props.styles };
                        newStyles.backgroundColor = e.target.value;
                        handleChange("styles", newStyles);
                      }}
                    />
                    <button
                      className="text-xs bg-red-500/80 backdrop-blur-md text-white rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0 cursor-pointer hover:bg-red-700 transition-colors duration-200"
                      onClick={() => {
                        const newStyles = { ...props.styles };
                        delete newStyles.backgroundColor;
                        handleChange("styles", newStyles);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-none text-zinc-100">
                    Texto
                  </label>
                  <div className="relative">
                    <input
                      type="color"
                      className="flex w-full h-10 border-none text-sm cursor-pointer bg-zinc-700 focus:ring-2 focus:ring-blue-500 rounded-md"
                      value={props.styles?.color || "#000000"}
                      onChange={(e) => {
                        const newStyles = { ...props.styles };
                        newStyles.color = e.target.value;
                        handleChange("styles", newStyles);
                      }}
                    />
                    <button
                      className="text-xs bg-red-500/80 backdrop-blur-md text-white rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0 cursor-pointer hover:bg-red-700 transition-colors duration-200"
                      onClick={() => {
                        const newStyles = { ...props.styles };
                        delete newStyles.color;
                        handleChange("styles", newStyles);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-none text-zinc-100">
                    Borda
                  </label>
                  <div className="relative">
                    <input
                      type="color"
                      className="flex w-full h-10 border-none text-sm cursor-pointer bg-zinc-700 focus:ring-2 focus:ring-blue-500 rounded-md"
                      value={props.styles?.borderColor || "#000000"}
                      onChange={(e) => {
                        const newStyles = { ...props.styles };
                        newStyles.borderColor = e.target.value;
                        newStyles.border = `1px solid ${e.target.value}`;
                        handleChange("styles", newStyles);
                      }}
                    />
                    <button
                      className="text-xs bg-red-500/80 backdrop-blur-md text-white rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0 cursor-pointer hover:bg-red-700 transition-colors duration-200"
                      onClick={() => {
                        const newStyles = { ...props.styles };
                        delete newStyles.borderColor;
                        delete newStyles.border;
                        handleChange("styles", newStyles);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Avançado */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Avançado</p>
            </div>
            <div className="p-6 pt-0">
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Nome do Componente
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={props.componentName || ""}
                    onChange={(e) =>
                      handleChange("componentName", e.target.value)
                    }
                    placeholder="Digite aqui..."
                  />
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Geral */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Geral</p>
            </div>
            <div className="p-6 pt-0 gap-4 flex flex-col">
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Tamanho Máximo
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
                  value={parseInt(
                    props.styles?.maxWidth?.toString().replace("%", "") || "100"
                  )}
                  onChange={(e) => {
                    const newStyles = { ...props.styles };
                    newStyles.maxWidth = `${e.target.value}%`;
                    handleChange("styles", newStyles);
                  }}
                />
                <span className="text-xs text-zinc-400">
                  {props.styles?.maxWidth || "100%"}
                </span>
              </div>
              <div className="flex flex-col-reverse items-start gap-2">
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={props.styles?.textAlign || "center"}
                  onChange={(e) => {
                    const newStyles = { ...props.styles };
                    newStyles.textAlign = e.target.value;
                    handleChange("styles", newStyles);
                  }}
                >
                  <option value="left">Esquerda</option>
                  <option value="center">Centro</option>
                  <option value="right">Direita</option>
                </select>
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Alinhamento
                </label>
              </div>
            </div>
          </div>
        </div>
      );

    case "input":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Rótulo do Campo
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.label || ""}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="Ex: Seu Nome"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Placeholder
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
              placeholder="Ex: Digite seu nome aqui..."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Tipo de Campo
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.inputType || "text"}
              onChange={(e) =>
                handleChange(
                  "inputType",
                  e.target.value as QuizComponentProps["inputType"]
                )
              }
            >
              <option value="text">Texto</option>
              <option value="email">Email</option>
              <option value="number">Número</option>
              <option value="tel">Telefone</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              checked={props.required || false}
              onChange={(e) => handleChange("required", e.target.checked)}
            />
            <label className="text-sm font-medium text-zinc-100">
              Campo Obrigatório
            </label>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Mensagem de Erro
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.errorMessage || ""}
              onChange={(e) => handleChange("errorMessage", e.target.value)}
              placeholder="Ex: Este campo é obrigatório"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Salvar como Lead (campo)
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.storeAsLeadField || ""}
              onChange={(e) => handleChange("storeAsLeadField", e.target.value)}
              placeholder="Ex: nome, email, telefone"
            />
          </div>
          <StylesEditor />
        </div>
      );

    case "button":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Texto do Botão
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.buttonText || ""}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              placeholder="Ex: Continuar"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Estilo do Botão
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.buttonStyle || "primary"}
              onChange={(e) =>
                handleChange(
                  "buttonStyle",
                  e.target.value as QuizComponentProps["buttonStyle"]
                )
              }
            >
              <option value="primary">Primário</option>
              <option value="secondary">Secundário</option>
              <option value="outline">Contorno</option>
              <option value="ghost">Fantasma</option>
            </select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Tipo de Ação
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.actionType || "goToNextStep"}
              onChange={(e) =>
                handleChange(
                  "actionType",
                  e.target.value as QuizComponentProps["actionType"]
                )
              }
            >
              <option value="goToNextStep">Próxima Etapa</option>
              <option value="submitForm">Enviar Formulário</option>
              <option value="redirectUrl">Redirecionar URL</option>
              <option value="customFunction">Função Custom</option>
            </select>
          </div>
          {props.actionType === "redirectUrl" && (
            <div className="grid w-full items-center gap-1.5">
              <label className="text-sm font-medium leading-none text-zinc-100">
                URL de Redirecionamento
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                value={props.actionUrl || ""}
                onChange={(e) => handleChange("actionUrl", e.target.value)}
                placeholder="https://seusite.com/oferta"
              />
            </div>
          )}
          <StylesEditor />
        </div>
      );

    case "options":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Texto da Pergunta
            </label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              value={props.questionText || ""}
              onChange={(e) => handleChange("questionText", e.target.value)}
              placeholder="Qual a sua cor favorita?"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Tipo de Seleção
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.selectionType || "single"}
              onChange={(e) =>
                handleChange(
                  "selectionType",
                  e.target.value as QuizComponentProps["selectionType"]
                )
              }
            >
              <option value="single">Seleção Única</option>
              <option value="multiple">Seleção Múltipla</option>
            </select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Opções
            </label>
            <div className="space-y-2">
              {props.choices?.map((choice, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                    value={choice.text}
                    onChange={(e) => {
                      const newChoices = [...(props.choices || [])];
                      newChoices[index].text = e.target.value;
                      newChoices[index].value = e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "_");
                      handleChange("choices", newChoices);
                    }}
                    placeholder={`Opção ${index + 1}`}
                  />
                  <input
                    type="number"
                    className="w-20 h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                    value={choice.scoreValue || 0}
                    onChange={(e) => {
                      const newChoices = [...(props.choices || [])];
                      newChoices[index].scoreValue =
                        parseInt(e.target.value) || 0;
                      handleChange("choices", newChoices);
                    }}
                    placeholder="Pontos"
                  />
                  <button
                    className="text-red-500 hover:text-red-700 p-1"
                    onClick={() => {
                      const newChoices = (props.choices || []).filter(
                        (_, i) => i !== index
                      );
                      handleChange("choices", newChoices);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-zinc-700 text-zinc-100 hover:bg-zinc-600 py-2 px-4"
              onClick={() => {
                const newChoices = [...(props.choices || [])];
                const optionNumber = newChoices.length + 1;
                newChoices.push({
                  text: `Nova Opção ${optionNumber}`,
                  value: `option${optionNumber}`,
                  scoreValue: 0,
                });
                handleChange("choices", newChoices);
              }}
            >
              Adicionar Opção
            </button>
          </div>
          <StylesEditor />
        </div>
      );

    case "alert":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Mensagem
            </label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              value={props.alertMessage || ""}
              onChange={(e) => handleChange("alertMessage", e.target.value)}
              placeholder="Digite a mensagem de alerta..."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Tipo de Alerta
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.alertType || "info"}
              onChange={(e) =>
                handleChange(
                  "alertType",
                  e.target.value as QuizComponentProps["alertType"]
                )
              }
            >
              <option value="info">Informação</option>
              <option value="warning">Aviso</option>
              <option value="error">Erro</option>
              <option value="success">Sucesso</option>
            </select>
          </div>
          <StylesEditor />
        </div>
      );

    case "customComponent":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Nome do Componente
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.componentName || ""}
              onChange={(e) => handleChange("componentName", e.target.value)}
            >
              <option value="">Selecione um componente</option>
              <option value="ResultPage.tsx">ResultPage.tsx</option>
              <option value="QuizOfferPage.tsx">QuizOfferPage.tsx</option>
            </select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Título da Oferta
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.offerHeadline || ""}
              onChange={(e) => handleChange("offerHeadline", e.target.value)}
              placeholder="Ex: Seu Perfil de Estilo Único!"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Descrição
            </label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              value={props.offerDescription || ""}
              onChange={(e) => handleChange("offerDescription", e.target.value)}
              placeholder="Ex: Receba um e-book exclusivo..."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Botão CTA
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.offerCtaButtonText || ""}
              onChange={(e) =>
                handleChange("offerCtaButtonText", e.target.value)
              }
              placeholder="Ex: Resgatar Agora!"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              URL do CTA
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.offerCtaUrl || ""}
              onChange={(e) => handleChange("offerCtaUrl", e.target.value)}
              placeholder="https://sua-oferta.com"
            />
          </div>
          {props.componentName === "QuizOfferPage.tsx" && (
            <div className="grid w-full items-center gap-1.5">
              <label className="text-sm font-medium leading-none text-zinc-100">
                Código de Desconto
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                value={props.discountCode || ""}
                onChange={(e) => handleChange("discountCode", e.target.value)}
                placeholder="EX: QUIZ20"
              />
            </div>
          )}
          {props.componentName === "ResultPage.tsx" && (
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Mapear Imagens dos Estilos (JSON)
                </label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  value={JSON.stringify(
                    props.styleImages || {
                      natural: ["url1", "url2"],
                      classico: ["url1", "url2"],
                      contemporaneo: ["url1", "url2"],
                      elegante: ["url1", "url2"],
                      romantico: ["url1", "url2"],
                      sexy: ["url1", "url2"],
                      dramatico: ["url1", "url2"],
                      criativo: ["url1", "url2"],
                    },
                    null,
                    2
                  )}
                  onChange={(e) => {
                    try {
                      const styleImages = JSON.parse(e.target.value);
                      handleChange("styleImages", styleImages);
                    } catch {
                      // Ignora erros de parse durante a digitação
                    }
                  }}
                  placeholder='{"natural": ["url1", "url2"], "classico": ["url1", "url2"]}'
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Nomes dos Estilos (JSON)
                </label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  value={JSON.stringify(
                    props.styleNames || {
                      natural: "Estilo Natural",
                      classico: "Estilo Clássico",
                      contemporaneo: "Estilo Contemporâneo",
                      elegante: "Estilo Elegante",
                      romantico: "Estilo Romântico",
                      sexy: "Estilo Sexy",
                      dramatico: "Estilo Dramático",
                      criativo: "Estilo Criativo",
                    },
                    null,
                    2
                  )}
                  onChange={(e) => {
                    try {
                      const styleNames = JSON.parse(e.target.value);
                      handleChange("styleNames", styleNames);
                    } catch {
                      // Ignora erros de parse durante a digitação
                    }
                  }}
                  placeholder='{"natural": "Estilo Natural", "classico": "Estilo Clássico"}'
                />
              </div>
            </div>
          )}
          <StylesEditor />
        </div>
      );

    case "spacer":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Altura do Espaçador (px)
            </label>
            <input
              type="number"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.height || 20}
              onChange={(e) =>
                handleChange("height", parseInt(e.target.value) || 20)
              }
              min="5"
              max="200"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Altura (slider)
            </label>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
              value={props.height || 20}
              onChange={(e) => handleChange("height", parseInt(e.target.value))}
            />
            <span className="text-xs text-zinc-400">
              {props.height || 20}px
            </span>
          </div>
          <StylesEditor />
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <div className="text-zinc-400 text-sm text-center p-4 bg-zinc-800/50 rounded-md">
            Editor de propriedades para '{type}' ainda não implementado.
            <br />
            <span className="text-xs">
              Selecione um componente suportado para editar suas propriedades.
            </span>
          </div>
          <StylesEditor />
        </div>
      );
  }
};

// --- FIM DA PARTE 2 ---

// --- COMPONENTE DE NAVEGAÇÃO DE ETAPAS ---

/**
 * @component StepNavigationTabs
 * @description Componente para navegação entre etapas com abas horizontais.
 */
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
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleStartEdit = (step: QuizStep) => {
    setEditingStepId(step.id);
    setEditingName(step.name);
  };

  const handleFinishEdit = () => {
    if (editingStepId && editingName.trim()) {
      onStepRename(editingStepId, editingName.trim());
    }
    setEditingStepId(null);
    setEditingName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFinishEdit();
    } else if (e.key === "Escape") {
      setEditingStepId(null);
      setEditingName("");
    }
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col">
      {/* Cabeçalho da Seção */}
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-lg font-semibold text-white mb-2">
          Etapas do Quiz
        </h2>
        <p className="text-sm text-zinc-400">
          Clique para navegar entre etapas
        </p>
      </div>

      {/* Lista de Etapas - Layout Vertical */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              currentStepId === step.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
            onClick={() => onStepSelect(step.id)}
          >
            {/* Número da Etapa */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStepId === step.id
                  ? "bg-white text-blue-600"
                  : "bg-zinc-600 text-zinc-300"
              }`}
            >
              {index + 1}
            </div>

            {/* Nome da Etapa */}
            <div className="flex-1 min-w-0">
              {editingStepId === step.id ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleFinishEdit}
                  onKeyDown={handleKeyPress}
                  className="bg-transparent border-b border-white text-sm w-full focus:outline-none"
                  autoFocus
                />
              ) : (
                <div>
                  <div
                    className="text-sm font-medium truncate cursor-pointer"
                    onDoubleClick={() => handleStartEdit(step)}
                    title="Duplo clique para editar"
                  >
                    {step.name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {step.components.length} componente
                    {step.components.length !== 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </div>

            {/* Botão de Deletar */}
            {steps.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Deletar etapa "${step.name}"?`)) {
                    onStepDelete(step.id);
                  }
                }}
                className="p-1 rounded text-xs hover:bg-red-600 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Deletar etapa"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Botão Adicionar Nova Etapa */}
      <div className="p-2 border-t border-zinc-700">
        <button
          onClick={onAddStep}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors duration-200"
          title="Adicionar nova etapa"
        >
          <span className="text-sm font-bold">+</span>
          <span className="text-sm">Nova Etapa</span>
        </button>
      </div>
    </div>
  );
};

// --- PARTE 3: COMPONENTE PRINCIPAL E LÓGICA DE ESTADO ---

/**
 * @component AdvancedQuizEditor
 * @description Componente principal do editor visual de quiz com todas as funcionalidades integradas.
 * Este é o componente exportado que deve ser usado no App.tsx ou em outros lugares.
 */
const AdvancedQuizEditor: React.FC = () => {
  console.log("🚀 AdvancedQuizEditor está renderizando!");

  // Estados de interface e visualização
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">(
    "desktop"
  );

  // Estados principais do editor
  const [editorState, setEditorState] = useState<QuizEditorState>({
    steps: [
      {
        id: "quiz-intro",
        name: "🏠 Introdução",
        components: [
          {
            id: "intro-heading",
            type: "heading",
            props: {
              text: "Teste de Estilo Pessoal",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "intro-image",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp",
              alt: "Imagem principal do quiz",
              styles: {
                width: "400px",
                height: "300px",
                textAlign: "center",
                objectFit: "cover",
                borderRadius: "lg",
              },
            },
          },
          {
            id: "intro-text",
            type: "text",
            props: {
              text: "Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
              },
            },
          },
          {
            id: "name-input",
            type: "input",
            props: {
              label: "NOME *",
              placeholder: "Digite seu nome aqui...",
              inputType: "text",
              required: true,
              storeAsLeadField: "nome",
            },
          },
          {
            id: "continue-button",
            type: "button",
            props: {
              buttonText: "Continuar",
              buttonStyle: "primary",
              actionType: "goToNextStep",
              actionTargetId: "question-1",
            },
          },
        ],
        defaultNextStepId: "question-1",
      },
      {
        id: "question-1",
        name: "👗 Roupa Favorita",
        components: [
          {
            id: "q1-heading",
            type: "heading",
            props: {
              text: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q1-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q1-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Conforto, leveza e praticidade no vestir",
                  value: "natural",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Discrição, caimento clássico e sobriedade",
                  value: "classico",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Praticidade com um toque de estilo atual",
                  value: "contemporaneo",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Elegância refinada, moderna e sem exageros",
                  value: "elegante",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Delicadeza em tecidos suaves e fluidos",
                  value: "romantico",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Sensualidade com destaque para o corpo",
                  value: "sexy",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Impacto visual com peças estruturadas e assimétricas",
                  value: "dramatico",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp",
                  nextStepId: "question-2",
                },
                {
                  text: "Mix criativo com formas ousadas e originais",
                  value: "criativo",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp",
                  nextStepId: "question-2",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-2",
      },
      {
        id: "question-2",
        name: "🧠 Personalidade",
        components: [
          {
            id: "q2-heading",
            type: "heading",
            props: {
              text: "RESUMA A SUA PERSONALIDADE:",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q2-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q2-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "A) <strong>Sou espontânea e descontraída</strong>, adoro coisas simples.",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "B) <strong>Gosto de organização</strong>, sou uma pessoa séria e conservadora.",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "C) Sou <strong>prática e objetiva</strong>, valorizo a funcionalidade.",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "D) <strong>Sou exigente e sofisticada</strong>, cuidadosa nas minhas escolhas.",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "E) <strong>Tenho um lado delicado e sensível</strong> que transparece em tudo.",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "F) <strong>Sou confiante e sensual</strong> e adoro me cuidar.",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "G) <strong>Sou moderna e audaciosa</strong>, tenho presença.",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
                {
                  text: "H) <strong>Sou exótica e aventureira</strong>, gosto da liberdade.",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-3",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-3",
      },
      {
        id: "question-3",
        name: "👀 Visual",
        components: [
          {
            id: "q3-heading",
            type: "heading",
            props: {
              text: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q3-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q3-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Visual leve, despojado e natural",
                  value: "natural",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual clássico e tradicional",
                  value: "classico",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual casual com toque atual",
                  value: "contemporaneo",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual refinado e imponente",
                  value: "elegante",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual romântico, feminino e delicado",
                  value: "romantico",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual sensual, com saia justa e decote",
                  value: "sexy",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual marcante e urbano (jeans + jaqueta)",
                  value: "dramatico",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp",
                  nextStepId: "question-4",
                },
                {
                  text: "Visual criativo, colorido e ousado",
                  value: "criativo",
                  scoreValue: 1,
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp",
                  nextStepId: "question-4",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-4",
      },
      {
        id: "question-4",
        name: "🎨 Estampas",
        components: [
          {
            id: "q4-heading",
            type: "heading",
            props: {
              text: "QUAL ESTAMPA VOCÊ MAIS SE IDENTIFICA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q4-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q4-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Estampas naturais e orgânicas",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas clássicas e tradicionais",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas geométricas e modernas",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas sofisticadas e refinadas",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas florais e delicadas",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas sensuais e marcantes",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas dramáticas e impactantes",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
                {
                  text: "Estampas criativas e ousadas",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-5",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-5",
      },
      {
        id: "question-5",
        name: "🧥 Casacos",
        components: [
          {
            id: "q5-heading",
            type: "heading",
            props: {
              text: "QUAL TIPO DE CASACO VOCÊ PREFERE?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q5-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q5-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Casacos confortáveis e práticos",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos clássicos e atemporais",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos modernos e funcionais",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos elegantes e sofisticados",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos femininos e delicados",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos sensuais e ajustados",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos marcantes e estruturados",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
                {
                  text: "Casacos criativos e únicos",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-6",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-6",
      },
      {
        id: "question-6",
        name: "👖 Calças",
        components: [
          {
            id: "q6-heading",
            type: "heading",
            props: {
              text: "QUAL ESTILO DE CALÇA VOCÊ MAIS USA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q6-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q6-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Calças confortáveis e soltas",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças clássicas e bem cortadas",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças modernas e versáteis",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças elegantes e alfaiataria",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças femininas e fluidas",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças justas e sensuais",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças marcantes e estruturadas",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
                {
                  text: "Calças criativas e diferenciadas",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-7",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-7",
      },
      {
        id: "question-7",
        name: "👠 Sapatos",
        components: [
          {
            id: "q7-heading",
            type: "heading",
            props: {
              text: "QUAL TIPO DE SAPATO VOCÊ PREFERE?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q7-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q7-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Sapatos confortáveis e práticos",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos clássicos e atemporais",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos modernos e versáteis",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos elegantes e sofisticados",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos delicados e femininos",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos sensuais e marcantes",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos dramáticos e impactantes",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
                {
                  text: "Sapatos criativos e únicos",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-8",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-8",
      },
      {
        id: "question-8",
        name: "💎 Acessórios",
        components: [
          {
            id: "q8-heading",
            type: "heading",
            props: {
              text: "QUAIS ACESSÓRIOS VOCÊ MAIS USA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q8-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q8-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Acessórios simples e naturais",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios clássicos e discretos",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios modernos e funcionais",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios elegantes e refinados",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios delicados e femininos",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios sensuais e chamativos",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios dramáticos e marcantes",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
                {
                  text: "Acessórios criativos e únicos",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-9",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-9",
      },
      {
        id: "question-9",
        name: "🧵 Tecidos",
        components: [
          {
            id: "q9-heading",
            type: "heading",
            props: {
              text: "QUAIS TECIDOS VOCÊ PREFERE?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q9-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q9-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Tecidos naturais e respiráveis",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos clássicos e estruturados",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos modernos e tecnológicos",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos nobres e luxuosos",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos fluidos e delicados",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos sensuais e ajustados",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos marcantes e texturizados",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
                {
                  text: "Tecidos criativos e inusitados",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "question-10",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "question-10",
      },
      {
        id: "question-10",
        name: "✨ Finalização",
        components: [
          {
            id: "q10-heading",
            type: "heading",
            props: {
              text: "COMO VOCÊ GOSTA DE FINALIZAR SEU LOOK?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "3xl",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "q10-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "q10-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "De forma simples e despojada",
                  value: "natural",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com elegância clássica e discreta",
                  value: "classico",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com praticidade e modernidade",
                  value: "contemporaneo",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com sofisticação e refinamento",
                  value: "elegante",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com delicadeza e feminilidade",
                  value: "romantico",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com sensualidade e charme",
                  value: "sexy",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com impacto e presença",
                  value: "dramatico",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
                {
                  text: "Com criatividade e originalidade",
                  value: "criativo",
                  scoreValue: 1,
                  nextStepId: "quiz-transition",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "quiz-transition",
      },
      {
        id: "quiz-transition",
        name: "🔄 Transição",
        components: [
          {
            id: "transition-heading",
            type: "heading",
            props: {
              text: "Enquanto calculamos o seu resultado...",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
              },
            },
          },
          {
            id: "transition-subtitle",
            type: "text",
            props: {
              text: "Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
              },
            },
          },
          {
            id: "transition-motivation",
            type: "text",
            props: {
              text: "Responda com sinceridade. Isso é só entre você e a sua nova versão.",
              styles: {
                textAlign: "center",
                color: "#10b981",
                fontSize: "1rem",
                fontStyle: "italic",
              },
            },
          },
          {
            id: "transition-button",
            type: "button",
            props: {
              buttonText: "Continuar para Questões Estratégicas",
              buttonStyle: "primary",
              actionType: "goToNextStep",
              actionTargetId: "strategic-1",
            },
          },
        ],
        defaultNextStepId: "strategic-1",
      },
      // --- Questões Estratégicas ---
      {
        id: "strategic-1",
        name: "💭 Autopercepção",
        components: [
          {
            id: "s1-image",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp",
              alt: "Autopercepção do estilo",
              styles: {
                width: "400px",
                height: "300px",
                textAlign: "center",
                objectFit: "cover",
                borderRadius: "lg",
              },
            },
          },
          {
            id: "s1-heading",
            type: "heading",
            props: {
              text: "Como você se vê atualmente?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
              },
            },
          },
          {
            id: "s1-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "s1-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Confiante com meu estilo atual",
                  value: "confiante",
                  scoreValue: 0,
                  nextStepId: "strategic-2",
                },
                {
                  text: "Insegura sobre minhas escolhas",
                  value: "insegura",
                  scoreValue: 0,
                  nextStepId: "strategic-2",
                },
                {
                  text: "Em transição, buscando mudanças",
                  value: "transicao",
                  scoreValue: 0,
                  nextStepId: "strategic-2",
                },
                {
                  text: "Perdida, não sei por onde começar",
                  value: "perdida",
                  scoreValue: 0,
                  nextStepId: "strategic-2",
                },
              ],
              selectionType: "single",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "strategic-2",
      },
      {
        id: "strategic-2",
        name: "🎯 Desafios",
        components: [
          {
            id: "s2-image",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp",
              alt: "Desafios ao se vestir",
              styles: {
                width: "400px",
                height: "300px",
                textAlign: "center",
                objectFit: "cover",
                borderRadius: "lg",
              },
            },
          },
          {
            id: "s2-heading",
            type: "heading",
            props: {
              text: "Qual seu maior desafio ao se vestir?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
              },
            },
          },
          {
            id: "s2-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "s2-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Não sei combinar peças",
                  value: "combinar",
                  scoreValue: 0,
                  nextStepId: "strategic-3",
                },
                {
                  text: "Guarda-roupa desorganizado",
                  value: "organizacao",
                  scoreValue: 0,
                  nextStepId: "strategic-3",
                },
                {
                  text: "Falta de tempo para escolher",
                  value: "tempo",
                  scoreValue: 0,
                  nextStepId: "strategic-3",
                },
                {
                  text: "Não encontro meu estilo",
                  value: "estilo",
                  scoreValue: 0,
                  nextStepId: "strategic-3",
                },
                {
                  text: "Questões com o corpo",
                  value: "corpo",
                  scoreValue: 0,
                  nextStepId: "strategic-3",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "strategic-3",
      },
      {
        id: "strategic-3",
        name: "💰 Investimento",
        components: [
          {
            id: "s3-image",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp",
              alt: "Investimento em consultoria",
              styles: {
                width: "400px",
                height: "300px",
                textAlign: "center",
                objectFit: "cover",
                borderRadius: "lg",
              },
            },
          },
          {
            id: "s3-heading",
            type: "heading",
            props: {
              text: "Quanto você investiria em uma consultoria de estilo?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
              },
            },
          },
          {
            id: "s3-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "s3-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Até R$ 200",
                  value: "baixo",
                  scoreValue: 0,
                  nextStepId: "strategic-4",
                },
                {
                  text: "R$ 200 - R$ 500",
                  value: "medio",
                  scoreValue: 0,
                  nextStepId: "strategic-4",
                },
                {
                  text: "R$ 500 - R$ 1000",
                  value: "alto",
                  scoreValue: 0,
                  nextStepId: "strategic-4",
                },
                {
                  text: "Acima de R$ 1000",
                  value: "premium",
                  scoreValue: 0,
                  nextStepId: "strategic-4",
                },
              ],
              selectionType: "single",
              styles: { gap: "12px" },
            },
          },
        ],
        defaultNextStepId: "strategic-4",
      },
      {
        id: "strategic-4",
        name: "🎯 Resultados",
        components: [
          {
            id: "s4-image",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745459978/20250423_1704_Transforma%C3%A7%C3%A3o_no_Closet_Moderno_simple_compose_01jsj3xvy6fpfb6pyd5shg5eak_1_appany.webp",
              alt: "Resultados desejados",
              styles: {
                width: "400px",
                height: "300px",
                textAlign: "center",
                objectFit: "cover",
                borderRadius: "lg",
              },
            },
          },
          {
            id: "s4-heading",
            type: "heading",
            props: {
              text: "Que resultados você deseja alcançar?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
              },
            },
          },
          {
            id: "s4-spacer",
            type: "spacer",
            props: {
              height: 20,
            },
          },
          {
            id: "s4-options",
            type: "options",
            props: {
              choices: [
                {
                  text: "Mais confiança e autoestima",
                  value: "confianca",
                  scoreValue: 0,
                  nextStepId: "result-page",
                },
                {
                  text: "Guarda-roupa organizado",
                  value: "organizacao",
                  scoreValue: 0,
                  nextStepId: "result-page",
                },
                {
                  text: "Economia de tempo",
                  value: "tempo",
                  scoreValue: 0,
                  nextStepId: "result-page",
                },
                {
                  text: "Looks mais adequados",
                  value: "adequacao",
                  scoreValue: 0,
                  nextStepId: "result-page",
                },
                {
                  text: "Descobrir meu estilo único",
                  value: "descoberta",
                  scoreValue: 0,
                  nextStepId: "result-page",
                },
                {
                  text: "Renovação completa",
                  value: "renovacao",
                  scoreValue: 0,
                  nextStepId: "result-page",
                },
              ],
              selectionType: "multiple",
              styles: { gap: "12px" },
            },
          },
          {
            id: "s4-button",
            type: "button",
            props: {
              buttonText: "Ver Meu Resultado",
              buttonStyle: "primary",
              actionType: "goToNextStep",
              actionTargetId: "result-page",
            },
          },
        ],
        defaultNextStepId: "result-page",
      },
      // --- Páginas Finais ---
      {
        id: "result-page",
        name: "📊 Resultado",
        components: [
          {
            id: "result-component",
            type: "customComponent",
            props: {
              componentName: "ResultPage.tsx",
              resultType: "styleAnalysis",
              offerHeadline: "Seu Perfil de Estilo Único!",
              offerDescription: "Descubra seu estilo predominante e complementares com base nas suas respostas.",
              styleImages: {
                natural: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
                classico: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
                contemporaneo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp",
                elegante: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp",
                romantico: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp",
                sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp",
                dramatico: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp",
                criativo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp",
              },
              styleNames: {
                natural: "Natural",
                classico: "Clássico",
                contemporaneo: "Contemporâneo",
                elegante: "Elegante",
                romantico: "Romântico",
                sexy: "Sexy",
                dramatico: "Dramático",
                criativo: "Criativo",
              },
            },
          },
        ],
        defaultNextStepId: "quiz-offer",
      },
      {
        id: "quiz-offer",
        name: "💰 Oferta",
        components: [
          {
            id: "offer-component",
            type: "customComponent",
            props: {
              componentName: "QuizOfferPage.tsx",
              offerHeadline: "Transforme Seu Estilo Agora!",
              offerDescription: "Consultoria personalizada de estilo com base no seu perfil único. Descubra como criar looks incríveis que combinam com você!",
              offerCtaButtonText: "Quero Minha Consultoria",
              offerCtaUrl: "https://checkout.gisele.com.br/consultoria-estilo",
              discountCode: "ESTILO40OFF",
              offerProductSku: "CONSULTORIA-ESTILO-2025",
            },
          },
        ],
        finalPageType: "quizOfferPage",
      },
    ],
    headerConfig: {
      showLogo: true,
      showProgressBar: true,
      allowReturnButton: true,
      logoUrl:
        "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
      progressColor: "#3b82f6",
    },
    currentStepId: "quiz-intro",
  });

  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Sistema de Auto-Save
  const {
    isSaving: isAutoSaving,
    lastSaved,
    hasUnsavedChanges,
    loadFromLocalStorage,
    saveManually,
  } = useAutoSave(editorState, 2000); // Auto-save a cada 2 segundos

  // Carrega dados salvos na inicialização
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setEditorState(savedData);
      console.log(
        "📂 Dados carregados do auto-save:",
        new Date().toLocaleTimeString()
      );
    }
  }, [loadFromLocalStorage]);

  // Computed values
  const currentStep =
    editorState.steps.find((step) => step.id === editorState.currentStepId) ||
    editorState.steps[0];
  const selectedComponent =
    currentStep.components.find((comp) => comp.id === selectedComponentId) ||
    null;

  // --- Handlers para gerenciar etapas ---

  const handleStepSelect = (stepId: string) => {
    setEditorState((prev) => ({
      ...prev,
      currentStepId: stepId,
    }));
    setSelectedComponentId(null); // Limpa seleção de componente ao trocar de etapa
  };

  const handleAddStep = () => {
    const newStepId = generateUniqueId();
    const newStep: QuizStep = {
      id: newStepId,
      name: `Etapa ${editorState.steps.length + 1}`,
      components: [
        {
          id: generateUniqueId(),
          type: "heading",
          props: {
            text: `Etapa ${editorState.steps.length + 1}`,
            styles: { textAlign: "center", color: "#ffffff" },
          },
        },
      ],
    };

    setEditorState((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
      currentStepId: newStepId,
    }));
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
    if (editorState.steps.length <= 1) {
      alert("Não é possível deletar a única etapa do quiz.");
      return;
    }

    const stepIndex = editorState.steps.findIndex((step) => step.id === stepId);
    const newSteps = editorState.steps.filter((step) => step.id !== stepId);

    // Se deletamos a etapa atual, seleciona uma próxima
    let newCurrentStepId = editorState.currentStepId;
    if (stepId === editorState.currentStepId) {
      if (stepIndex > 0) {
        newCurrentStepId = newSteps[stepIndex - 1].id;
      } else {
        newCurrentStepId = newSteps[0].id;
      }
    }

    setEditorState((prev) => ({
      ...prev,
      steps: newSteps,
      currentStepId: newCurrentStepId,
    }));
    setSelectedComponentId(null);
  };

  // --- Toggle entre modos de visualização ---
  const toggleViewportMode = () => {
    setViewportMode((prev) => (prev === "desktop" ? "mobile" : "desktop"));
  };

  // --- Handlers para gerenciar componentes ---

  const handleComponentSelect = (componentId: string | null) => {
    setSelectedComponentId(componentId);
  };

  const handleComponentAdd = (type: string) => {
    const newComponent: QuizComponent = {
      id: generateUniqueId(),
      type: type as QuizComponent["type"],
      props: getDefaultPropsForType(type),
    };

    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === editorState.currentStepId
          ? { ...step, components: [...step.components, newComponent] }
          : step
      ),
    }));

    // Seleciona o novo componente automaticamente
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

    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
  };

  const handleComponentMove = (
    componentId: string,
    direction: "up" | "down"
  ) => {
    setEditorState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => {
        if (step.id !== editorState.currentStepId) return step;

        const componentIndex = step.components.findIndex(
          (comp) => comp.id === componentId
        );
        if (componentIndex === -1) return step;

        const newComponents = [...step.components];
        const targetIndex =
          direction === "up" ? componentIndex - 1 : componentIndex + 1;

        if (targetIndex < 0 || targetIndex >= newComponents.length) return step;

        // Troca os componentes de posição
        [newComponents[componentIndex], newComponents[targetIndex]] = [
          newComponents[targetIndex],
          newComponents[componentIndex],
        ];

        return { ...step, components: newComponents };
      }),
    }));
  };

  // --- Handlers para configurações do cabeçalho ---

  const handleHeaderConfigUpdate = (newConfig: Partial<QuizHeaderConfig>) => {
    setEditorState((prev) => ({
      ...prev,
      headerConfig: { ...prev.headerConfig, ...newConfig },
    }));
  };

  // --- Handlers para salvar e publicar ---

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Usa o sistema de auto-save para salvar manualmente
      saveManually();

      // Simula salvamento no servidor
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Quiz salvo manualmente:", editorState);

      // Mostra uma notificação de sucesso mais discreta
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Quiz salvo com sucesso!";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);

      // Mostra notificação de erro
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Erro ao salvar. Tente novamente.";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Salva antes de publicar
      saveManually();

      // Simula publicação
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("🚀 Quiz publicado:", editorState);

      // Mostra notificação de sucesso
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Quiz publicado com sucesso!";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    } catch (error) {
      console.error("❌ Erro ao publicar:", error);

      // Mostra notificação de erro
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Erro ao publicar. Tente novamente.";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 5000);
    } finally {
      setIsPublishing(false);
    }
  };

  // --- Funções auxiliares ---

  /**
   * @function getDefaultPropsForType
   * @description Retorna as propriedades padrão para um tipo de componente.
   */
  const getDefaultPropsForType = (type: string): QuizComponentProps => {
    switch (type) {
      case "heading":
        return {
          text: "Novo Título",
          styles: { textAlign: "center", color: "#ffffff", fontSize: "1.8rem" },
        };
      case "text":
        return {
          text: "Texto descritivo aqui...",
          styles: { color: "#d1d5db", fontSize: "1rem" },
        };
      case "image":
        return {
          src: "https://placehold.co/400x300/0f172a/94a3b8?text=Imagem",
          alt: "Nova imagem",
          objectFit: "cover",
        };
      case "input":
        return {
          label: "Seu nome",
          placeholder: "Digite aqui...",
          inputType: "text",
          required: false,
        };
      case "button":
        return {
          buttonText: "Clique aqui",
          buttonStyle: "primary",
          actionType: "goToNextStep",
        };
      case "options":
        return {
          questionText: "Qual é a sua preferência?",
          selectionType: "single",
          choices: [
            { text: "Opção 1", value: "option1" },
            { text: "Opção 2", value: "option2" },
          ],
        };
      case "alert":
        return {
          alertType: "info",
          alertMessage: "Esta é uma mensagem informativa.",
        };
      case "video":
        return {
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          controls: true,
          autoplay: false,
        };
      case "carousel":
        return {
          images: [
            {
              src: "https://placehold.co/400x300/0f172a/94a3b8?text=Slide+1",
              alt: "Slide 1",
            },
            {
              src: "https://placehold.co/400x300/1e293b/cbd5e1?text=Slide+2",
              alt: "Slide 2",
            },
          ],
          autoSlide: false,
        };
      case "customComponent":
        return {
          componentName: "ResultPage.tsx",
          resultType: "styleAnalysis",
        };
      case "spacer":
        return {};
      default:
        return {};
    }
  };

  // --- Render principal ---

  try {
    console.log("🎯 Tentando renderizar AdvancedQuizEditor...");

    return (
      <div className="h-screen bg-zinc-950 flex flex-col">
        {/* Navbar Superior */}
        <FunnelNavbar
          onSave={handleSave}
          onPublish={handlePublish}
          isSaving={isSaving || isAutoSaving}
          isPublishing={isPublishing}
          autoSaveStatus={{
            isAutoSaving,
            lastSaved,
          }}
          viewportMode={viewportMode}
          onToggleViewport={toggleViewportMode}
        />

        {/* Layout Principal com 4 colunas fixas responsivas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna 1: Navegação de Etapas - Mais Estreita */}
          <div className="w-48 border-r border-zinc-700 bg-zinc-900 flex-shrink-0 overflow-hidden">
            <div className="h-full overflow-y-auto custom-scrollbar">
              <StepNavigationTabs
                steps={editorState.steps}
                currentStepId={editorState.currentStepId}
                onStepSelect={handleStepSelect}
                onStepRename={handleStepRename}
                onStepDelete={handleStepDelete}
                onAddStep={handleAddStep}
              />
            </div>
          </div>
          {/* Coluna 2: Biblioteca de Componentes - Separada */}
          <div className="w-56 border-r border-zinc-700 bg-zinc-900 flex-shrink-0 overflow-hidden">
            <div className="h-full overflow-y-auto custom-scrollbar">
              <FunnelToolbarSidebar onComponentAdd={handleComponentAdd} />
            </div>
          </div>
          {/* Coluna 3: Canvas do Editor - Flexível e Centralizado */}
          <div className="flex-1 min-w-0 overflow-hidden bg-zinc-900 relative">
            {/* Controles de Viewport */}
            <div className="absolute top-2 right-2 z-10 bg-zinc-800 rounded p-1 shadow-lg">
              <button
                className={`p-1 rounded ${
                  viewportMode === "desktop"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setViewportMode("desktop")}
                title="Visualização Desktop"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-monitor"
                >
                  <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                  <line x1="8" x2="16" y1="21" y2="21"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                </svg>
              </button>
              <button
                className={`p-1 rounded ${
                  viewportMode === "mobile"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setViewportMode("mobile")}
                title="Visualização Mobile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-smartphone"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
              </button>
            </div>

            <CanvasArea
              currentStep={currentStep}
              headerConfig={{
                ...editorState.headerConfig,
                showLogo: true, // Garantir que o logotipo seja exibido centralmente
              }}
              selectedComponent={selectedComponent}
              selectedComponentId={selectedComponentId}
              onComponentSelect={handleComponentSelect}
              onComponentAdd={handleComponentAdd}
              onComponentUpdate={handleComponentUpdate}
              onComponentDelete={handleComponentDelete}
              onComponentMove={handleComponentMove}
              viewportMode={viewportMode}
            />
          </div>{" "}
          {/* Coluna 4: Painel de Propriedades (Direita) */}
          <div className="w-80 border-l border-zinc-700 bg-zinc-900 flex-shrink-0 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {/* Configurações da Etapa */}
              <div className="grid gap-4 px-4 pb-4 pt-2 my-4">
                {/* Título da Etapa */}
                <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <p className="text-sm text-zinc-400">Título da Etapa</p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-zinc-100"
                        htmlFor="stepName"
                      >
                        Nome da Etapa
                      </label>
                      <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        id="stepName"
                        placeholder="Digite aqui..."
                        value={currentStep?.name || ""}
                        onChange={(e) =>
                          handleStepRename(
                            currentStep?.id || "",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Configurações do Header */}
                <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <p className="text-sm text-zinc-400">Header</p>
                  </div>
                  <div className="p-6 pt-0 grid gap-2">
                    {/* Mostrar Logo */}
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={editorState.headerConfig.showLogo}
                        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                          editorState.headerConfig.showLogo
                            ? "bg-blue-600"
                            : "bg-zinc-600"
                        }`}
                        id="show-logo"
                        onClick={() =>
                          handleHeaderConfigUpdate({
                            showLogo: !editorState.headerConfig.showLogo,
                          })
                        }
                      >
                        <span
                          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                            editorState.headerConfig.showLogo
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <label
                        className="text-sm font-medium leading-none text-zinc-100"
                        htmlFor="show-logo"
                      >
                        Mostrar Logo
                      </label>
                    </div>

                    {/* Mostrar Progresso */}
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={editorState.headerConfig.showProgressBar}
                        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                          editorState.headerConfig.showProgressBar
                            ? "bg-blue-600"
                            : "bg-zinc-600"
                        }`}
                        id="show-progress"
                        onClick={() =>
                          handleHeaderConfigUpdate({
                            showProgressBar:
                              !editorState.headerConfig.showProgressBar,
                          })
                        }
                      >
                        <span
                          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                            editorState.headerConfig.showProgressBar
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <label
                        className="text-sm font-medium leading-none text-zinc-100"
                        htmlFor="show-progress"
                      >
                        Mostrar Progresso
                      </label>
                    </div>

                    {/* Permitir Voltar */}
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={
                          editorState.headerConfig.allowReturnButton
                        }
                        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                          editorState.headerConfig.allowReturnButton
                            ? "bg-blue-600"
                            : "bg-zinc-600"
                        }`}
                        id="allow-return"
                        onClick={() =>
                          handleHeaderConfigUpdate({
                            allowReturnButton:
                              !editorState.headerConfig.allowReturnButton,
                          })
                        }
                      >
                        <span
                          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                            editorState.headerConfig.allowReturnButton
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <label
                        className="text-sm font-medium leading-none text-zinc-100"
                        htmlFor="allow-return"
                      >
                        Permitir Voltar
                      </label>
                    </div>
                  </div>
                </div>

                {/* Editor de Componentes */}
                {selectedComponent ? (
                  <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-400">
                          Editar Componente
                        </p>
                        <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                          {selectedComponent.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <ComponentPropertyEditor
                        type={selectedComponent.type}
                        props={selectedComponent.props}
                        onPropsChange={(newProps) =>
                          handleComponentUpdate(selectedComponent.id, newProps)
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
                    <div className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="text-zinc-500 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto mb-2"
                        >
                          <rect
                            width="3"
                            height="8"
                            x="13"
                            y="2"
                            rx="1.5"
                          ></rect>
                          <path d="M19 8.5V10h1.5A1.5 1.5 0 0 1 22 11.5v1A1.5 1.5 0 0 1 20.5 14H19v1.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V14h-1.5A1.5 1.5 0 0 1 12 12.5v-1A1.5 1.5 0 0 1 13.5 10H15V8.5a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 19 8.5Z"></path>
                          <rect
                            width="8"
                            height="3"
                            x="2"
                            y="13"
                            rx="1.5"
                          ></rect>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-zinc-300 mb-2">
                        Nenhum componente selecionado
                      </h3>
                      <p className="text-sm text-zinc-500">
                        Clique em um componente no canvas para editar suas
                        propriedades
                      </p>
                    </div>
                  </div>
                )}

                <div className="py-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Erro ao renderizar AdvancedQuizEditor:", error);
    return (
      <div className="h-screen bg-red-950 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Erro no Editor</h1>
          <p className="text-red-300">Verifique o console para mais detalhes</p>
          <pre className="mt-4 text-sm text-red-200 bg-red-900 p-4 rounded">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
};

// --- EXPORTAÇÃO PRINCIPAL ---

export { AdvancedQuizEditor };
export default AdvancedQuizEditor;

// --- FIM DA PARTE 3 ---
