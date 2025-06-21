import React, { useState, useEffect } from "react";
import "@/styles/advanced-editor.css";

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
  maxSelections?: number; // Máximo de seleções permitidas
  minSelections?: number; // Mínimo de seleções obrigatórias
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

  // Propriedades específicas para análise de estilo
  styleImages?: { [key: string]: string[] }; // Imagens por estilo para ResultPage
  styleNames?: { [key: string]: string }; // Nomes dos estilos para ResultPage
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
 * @description Componente para exibir e simular a edição de um título.
 */
const EditableHeading: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <h1
    className="min-w-full text-3xl font-bold text-center text-gray-800 p-2 rounded-md"
    style={component.props.styles}
  >
    {component.props.text || "Título Editável"}
  </h1>
);

/**
 * @component EditableImage
 * @description Componente para exibir uma imagem.
 */
const EditableImage: React.FC<{ component: QuizComponent }> = ({
  component,
}) => (
  <div className="grid p-2 rounded-md" style={component.props.styles}>
    <div className="flex items-center justify-center">
      <img
        src={
          component.props.src ||
          "https://placehold.co/300x200/f3f4f6/6b7280?text=Imagem"
        }
        alt={component.props.alt || "Imagem"}
        className="object-cover w-full h-auto rounded-lg max-w-96"
        style={{ objectFit: component.props.objectFit || "cover" }}
      />
    </div>
  </div>
);

/**
 * @component EditableInput
 * @description Componente para exibir um campo de entrada.
 */
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
      className="flex h-10 w-full rounded-md border border-input bg-zinc-700/50 text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 p-2"
      placeholder={component.props.placeholder || "Digite aqui..."}
      value="" // Em um editor, seria um valor controlado
      readOnly // Para simular que é um editor e não um quiz ativo
    />
    {component.props.errorMessage && (
      <span className="text-xs text-red-400">
        {component.props.errorMessage}
      </span>
    )}
  </div>
);

/**
 * @component EditableButton
 * @description Componente para exibir um botão.
 */
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

/**
 * @component OptionsComponent
 * @description Componente para exibir opções de múltipla escolha.
 */
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
 * @description Componente para espaçamento.
 */
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

/**
 * @component TextComponent
 * @description Componente para exibir texto simples.
 */
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
              title="Mover para cima"
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentMove(component.id, "down");
              }}
              className="w-6 h-6 bg-blue-500 text-white rounded text-xs flex items-center justify-center hover:bg-blue-600"
              title="Mover para baixo"
            >
              ↓
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentDelete(component.id);
              }}
              className="w-6 h-6 bg-red-500 text-white rounded text-xs flex items-center justify-center hover:bg-red-600"
              title="Excluir"
            >
              ×
            </button>
          </div>
        )}

        {/* Renderização do componente baseado no tipo */}
        <div className="text-zinc-200">
          {component.type === "heading" && (
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {component.props.text || "Título"}
            </h2>
          )}
          {component.type === "text" && (
            <p className="text-gray-700 leading-relaxed">
              {component.props.text || "Texto do parágrafo"}
            </p>
          )}
          {component.type === "image" && (
            <img
              src={
                component.props.src ||
                "https://placehold.co/400x200/f3f4f6/6b7280?text=Imagem"
              }
              alt={component.props.alt || "Imagem"}
              className="max-w-full h-auto rounded-lg"
            />
          )}
          {component.type === "button" && (
            <button className="bg-[#B89B7A] hover:bg-[#A67B5B] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              {component.props.buttonText || "Continuar"}
            </button>
          )}
          {component.type === "input" && (
            <div>
              {component.props.label && (
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  {component.props.label}
                </label>
              )}
              <input
                type={component.props.inputType || "text"}
                placeholder={component.props.placeholder || "Digite aqui..."}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#B89B7A] focus:ring-2 focus:ring-[#B89B7A]/20 outline-none"
                disabled
              />
            </div>
          )}
          {component.type === "options" && (
            <div>
              <h3 className="font-semibold mb-4 text-gray-800 text-lg">
                {component.props.questionText ||
                  component.props.text ||
                  "Pergunta"}
              </h3>

              {/* Grid responsivo baseado na presença de imagens */}
              <div
                className={`gap-3 ${
                  component.props.choices?.some(
                    (choice: OptionChoice) => choice.image
                  )
                    ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                    : "grid grid-cols-1 max-w-lg mx-auto"
                }`}
              >
                {component.props.choices?.map(
                  (choice: OptionChoice, index: number) => (
                    <button
                      key={index}
                      className={`group relative overflow-hidden rounded-lg border-2 border-gray-300 hover:border-[#B89B7A] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                        choice.image
                          ? "p-0 h-auto min-h-[180px] md:min-h-[200px]"
                          : "p-4 text-left bg-white hover:bg-gray-50"
                      }`}
                    >
                      {choice.image ? (
                        <div className="flex flex-col h-full">
                          <div className="flex-1 relative overflow-hidden">
                            <img
                              src={choice.image}
                              alt={choice.text}
                              className="w-full h-[120px] md:h-[140px] object-cover"
                            />
                          </div>
                          <div className="p-3 bg-white border-t border-gray-200">
                            <p className="text-sm md:text-base font-medium text-gray-800 leading-tight">
                              {choice.text}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-800">
                          <span className="font-medium">{choice.text}</span>
                        </div>
                      )}
                    </button>
                  )
                ) || (
                  <button className="block w-full text-left px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-800">
                    Opção de exemplo
                  </button>
                )}
              </div>

              {/* Informação sobre seleção múltipla */}
              {component.props.selectionType === "multiple" &&
                component.props.maxSelections && (
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Selecione até {component.props.maxSelections} opções
                  </p>
                )}
            </div>
          )}
          {component.type === "video" && (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
              <span className="text-gray-500">📹 Vídeo</span>
            </div>
          )}
          {component.type === "spacer" && (
            <div className="h-8 border-dashed border border-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Espaçador</span>
            </div>
          )}
        </div>

        {/* Label do tipo de componente */}
        <div className="absolute top-1 left-1 text-xs bg-gray-700 text-white px-2 py-1 rounded">
          {component.type}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-zinc-900 overflow-y-auto">
      {/* Área de Canvas Principal */}
      <div className="p-2 sm:p-4 lg:p-6 min-h-full">
        {/* Container responsivo do canvas */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:p-6 min-h-[500px] sm:min-h-[600px]">
          {/* Header da página */}
          {headerConfig && (
            <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {headerConfig.title}
              </h1>
              {headerConfig.subtitle && (
                <p className="text-sm sm:text-base text-gray-600 mt-1">{headerConfig.subtitle}</p>
              )}
            </div>
          )}

          {/* Componentes da etapa atual */}
          {currentStep.components.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <p className="mb-4 text-sm sm:text-base">Esta etapa está vazia</p>
              <button
                onClick={() => onComponentAdd("heading")}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-700"
              >
                Adicionar primeiro componente
              </button>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-4">{currentStep.components.map(renderComponent)}</div>
          )}
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
}> = ({ onSave, onPublish, isSaving, isPublishing }) => {
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
          <div
            key={index}
            className="bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 hover:border-zinc-600 p-2 cursor-pointer transition-all duration-200 group"
            onClick={() => onComponentAdd(item.type)}
            title={`Adicionar ${item.name}`}
          >
            <div className="flex items-center gap-2">
              <div className="text-zinc-300 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        ))}
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

          {/* Seção: Estilo */}
          <div className="rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-100 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <p className="text-sm text-zinc-400">Estilo</p>
            </div>
            <div className="p-6 pt-0 gap-4 flex flex-col">
              <div className="flex flex-col-reverse items-start gap-2">
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
                  <option value="100%">Total</option>
                  <option value="80%">Grande</option>
                  <option value="60%">Médio</option>
                  <option value="40%">Pequeno</option>
                  <option value="20%">Micro</option>
                </select>
                <label className="text-sm font-medium leading-none text-zinc-100">
                  Largura
                </label>
              </div>
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

          {/* Seção: Personalização */}
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

          <StylesEditor />
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
          <StylesEditor />
        </div>
      );

    case "spacer":
      return (
        <div className="space-y-4">
          <div className="text-zinc-400 text-sm text-center p-4 bg-zinc-800/50 rounded-md">
            Espaçador não possui propriedades editáveis específicas.
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

  // Estados principais do editor
  const [editorState, setEditorState] = useState<QuizEditorState>({
    steps: [
      {
        id: "quiz-intro",
        name: "🏠 Introdução",
        components: [
          {
            id: "intro-logo",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
              alt: "Logo Gisele",
              styles: {
                width: "96px",
                height: "96px",
                textAlign: "center",
                objectFit: "cover",
              },
            },
          },
          {
            id: "intro-heading",
            type: "heading",
            props: {
              text: "Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "intro-subtitle",
            type: "text",
            props: {
              text: "Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
              },
            },
          },
          {
            id: "intro-image",
            type: "image",
            props: {
              src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp",
              alt: "Imagem principal",
              styles: {
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                textAlign: "center",
                objectFit: "cover",
                borderRadius: "lg",
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
            },
          },
          {
            id: "continue-button",
            type: "button",
            props: {
              buttonText: "Quero Descobrir meu Estilo Agora!",
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
        name: "Q1 👗 Roupa Favorita",
        components: [
          {
            id: "q1-heading",
            type: "heading",
            props: {
              text: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Conforto, leveza e praticidade no vestir",
                  value: "natural",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Discrição, caimento clássico e sobriedade",
                  value: "classico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Praticidade com um toque de estilo atual",
                  value: "contemporaneo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Elegância refinada, moderna e sem exageros",
                  value: "elegante",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Delicadeza em tecidos suaves e fluidos",
                  value: "romantico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Sensualidade com destaque para o corpo",
                  value: "sexy",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Impacto visual com peças estruturadas e assimétricas",
                  value: "dramatico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
                {
                  text: "Mix criativo com formas ousadas e originais",
                  value: "criativo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp",
                  nextStepId: "question-2",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-2",
      },
      {
        id: "question-2",
        name: "Q2 🧠 Personalidade",
        components: [
          {
            id: "q2-heading",
            type: "heading",
            props: {
              text: "RESUMA A SUA PERSONALIDADE:",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "RESUMA A SUA PERSONALIDADE:",
              selectionType: "multiple",
              choices: [
                {
                  text: "Informal, espontânea, alegre, essencialista",
                  value: "natural",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Conservadora, séria, organizada",
                  value: "classico",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Informada, ativa, prática",
                  value: "contemporaneo",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Exigente, sofisticada, seletiva",
                  value: "elegante",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Feminina, meiga, delicada, sensível",
                  value: "romantico",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Glamorosa, vaidosa, sensual",
                  value: "sexy",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Cosmopolita, moderna e audaciosa",
                  value: "dramatico",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
                {
                  text: "Exótica, aventureira, livre",
                  value: "criativo",
                  nextStepId: "question-3",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-3",
      },
      {
        id: "question-3",
        name: "Q3 👀 Visual",
        components: [
          {
            id: "q3-heading",
            type: "heading",
            props: {
              text: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Visual leve, despojado e natural",
                  value: "natural",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual clássico e tradicional",
                  value: "classico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual casual com toque atual",
                  value: "contemporaneo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual refinado e imponente",
                  value: "elegante",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual romântico, feminino e delicado",
                  value: "romantico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual sensual, com saia justa e decote",
                  value: "sexy",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual marcante e urbano (jeans + jaqueta)",
                  value: "dramatico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
                {
                  text: "Visual criativo, colorido e ousado",
                  value: "criativo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp",
                  nextStepId: "question-4",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-4",
      },
      {
        id: "question-4",
        name: "Q4 ✨ Detalhes",
        components: [
          {
            id: "q4-heading",
            type: "heading",
            props: {
              text: "QUAIS DETALHES VOCÊ GOSTA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAIS DETALHES VOCÊ GOSTA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Poucos detalhes, básico e prático",
                  value: "natural",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Bem discretos e sutis, clean e clássico",
                  value: "classico",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Básico, mas com um toque de estilo",
                  value: "contemporaneo",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Detalhes refinados, chic e que deem status",
                  value: "elegante",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Detalhes delicados, laços, babados",
                  value: "romantico",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Roupas que valorizem meu corpo: couro, zíper, fendas",
                  value: "sexy",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Detalhes marcantes, firmeza e peso",
                  value: "dramatico",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
                {
                  text: "Detalhes diferentes do convencional, produções ousadas",
                  value: "criativo",
                  nextStepId: "question-5",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-5",
      },
      {
        id: "question-5",
        name: "Q5 🎨 Estampas",
        components: [
          {
            id: "q5-heading",
            type: "heading",
            props: {
              text: "QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Estampas clean, com poucas informações",
                  value: "natural",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/20_oh44vh.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Estampas clássicas e atemporais",
                  value: "classico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735368/21_o7wkte.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Atemporais, mas que tenham uma pegada de atual e moderna",
                  value: "contemporaneo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735369/22_siebw2.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Estampas clássicas e atemporais, mas sofisticadas",
                  value: "elegante",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/23_bdfxrh.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Estampas florais e/ou delicadas como bolinhas, borboletas e corações",
                  value: "romantico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/24_nptszu.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Estampas de animal print, como onça, zebra e cobra",
                  value: "sexy",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/25_motk6b.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Estampas geométricas, abstratas e exageradas como grandes poás",
                  value: "dramatico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/26_dptanw.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
                {
                  text: "Estampas diferentes do usual, como africanas, xadrez grandes",
                  value: "criativo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/27_wxmklx.webp",
                  nextStepId: "question-6",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-6",
      },
      {
        id: "question-6",
        name: "Q6 🧥 Casacos",
        components: [
          {
            id: "q6-heading",
            type: "heading",
            props: {
              text: "QUAL CASACO É SEU FAVORITO?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAL CASACO É SEU FAVORITO?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Cardigã bege confortável e casual",
                  value: "natural",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/29_sdogoy.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Blazer verde estruturado",
                  value: "classico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/30_nfth8k.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Trench coat bege tradicional",
                  value: "contemporaneo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/31_tcmhcl.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Blazer branco refinado",
                  value: "elegante",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/32_h78pd8.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Casaco pink vibrante e moderno",
                  value: "romantico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/33_u8pldd.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Jaqueta vinho de couro estilosa",
                  value: "sexy",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/34_peadir.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Jaqueta preta estilo rocker",
                  value: "dramatico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735379/35_pulzso.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
                {
                  text: "Casaco estampado criativo e colorido",
                  value: "criativo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/36_cympaq.webp",
                  nextStepId: "question-7",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-7",
      },
      {
        id: "question-7",
        name: "Q7 👖 Calças",
        components: [
          {
            id: "q7-heading",
            type: "heading",
            props: {
              text: "QUAL SUA CALÇA FAVORITA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAL SUA CALÇA FAVORITA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Calça fluida acetinada bege",
                  value: "natural",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/38_iilv0l.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Calça de alfaiataria cinza",
                  value: "classico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735417/39_arsswu.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Jeans reto e básico",
                  value: "contemporaneo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/40_beq52x.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Calça reta bege de tecido",
                  value: "elegante",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/41_hconq4.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Calça ampla rosa alfaiatada",
                  value: "romantico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735420/42_q8xws1.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Legging preta de couro",
                  value: "sexy",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/43_ljy7sh.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Calça reta preta de couro",
                  value: "dramatico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/44_nqgvoq.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
                {
                  text: "Calça estampada floral leve e ampla",
                  value: "criativo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735425/45_lp64m8.webp",
                  nextStepId: "question-8",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-8",
      },
      {
        id: "question-8",
        name: "Q8 👠 Sapatos",
        components: [
          {
            id: "q8-heading",
            type: "heading",
            props: {
              text: "QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Tênis nude casual e confortável",
                  value: "natural",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735426/47_bi6vgf.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Scarpin nude de salto baixo",
                  value: "classico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/48_ymo1ur.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Sandália dourada com salto bloco",
                  value: "contemporaneo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/49_apcrwa.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Scarpin nude salto alto e fino",
                  value: "elegante",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/50_qexxxo.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Sandália anabela off white",
                  value: "romantico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/51_xbgntp.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Sandália rosa de tiras finas",
                  value: "sexy",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/52_edlp0e.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Scarpin preto moderno com vinil transparente",
                  value: "dramatico",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/53_bfdp6f.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
                {
                  text: "Scarpin colorido estampado",
                  value: "criativo",
                  image:
                    "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735430/54_xnilkc.webp",
                  nextStepId: "question-9",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-9",
      },
      {
        id: "question-9",
        name: "Q9 💍 Acessórios",
        components: [
          {
            id: "q9-heading",
            type: "heading",
            props: {
              text: "QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText: "QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?",
              selectionType: "multiple",
              choices: [
                {
                  text: "Pequenos e discretos, às vezes nem uso",
                  value: "natural",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Brincos pequenos e discretos. Corrente fininha",
                  value: "classico",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Acessórios que elevem meu look com um toque moderno",
                  value: "contemporaneo",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Acessórios sofisticados, joias ou semijoias",
                  value: "elegante",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Peças delicadas e com um toque feminino",
                  value: "romantico",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Brincos longos, colares que valorizem minha beleza",
                  value: "sexy",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Acessórios pesados, que causem um impacto",
                  value: "dramatico",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
                {
                  text: "Acessórios diferentes, grandes e marcantes",
                  value: "criativo",
                  nextStepId: "question-10",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
            },
          },
        ],
        defaultNextStepId: "question-10",
      },
      {
        id: "question-10",
        name: "Q10 🧵 Tecidos",
        components: [
          {
            id: "q10-heading",
            type: "heading",
            props: {
              text: "VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
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
              questionText:
                "VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...",
              selectionType: "multiple",
              choices: [
                {
                  text: "São fáceis de cuidar",
                  value: "natural",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São de excelente qualidade",
                  value: "classico",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São fáceis de cuidar e modernos",
                  value: "contemporaneo",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São sofisticados",
                  value: "elegante",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São delicados",
                  value: "romantico",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São perfeitos ao meu corpo",
                  value: "sexy",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São diferentes, e trazem um efeito para minha roupa",
                  value: "dramatico",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
                {
                  text: "São exclusivos, criam identidade no look",
                  value: "criativo",
                  nextStepId: "quiz-transition",
                  scoreValue: 1,
                },
              ],
              styles: { gap: "12px" },
              maxSelections: 3,
              minSelections: 3,
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
              text: "🕐 Enquanto calculamos o seu resultado...",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
                fontWeight: "bold",
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
                marginBottom: "1rem",
              },
            },
          },
          {
            id: "transition-description",
            type: "text",
            props: {
              text: "A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1rem",
                marginBottom: "1rem",
              },
            },
          },
          {
            id: "transition-motivation",
            type: "text",
            props: {
              text: "💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.",
              styles: {
                textAlign: "center",
                color: "#10b981",
                fontSize: "1rem",
                fontStyle: "italic",
                fontWeight: "bold",
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
      {
        id: "strategic-1",
        name: "S1 💭 Como você se vê hoje?",
        components: [
          {
            id: "s1-heading",
            type: "heading",
            props: {
              text: "Como você se vê hoje?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "s1-subtitle",
            type: "text",
            props: {
              text: "Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "s1-options",
            type: "options",
            props: {
              questionText: "Como você se vê hoje?",
              selectionType: "single",
              choices: [
                {
                  text: "Me sinto desconectada da mulher que sou hoje",
                  value: "desconectada",
                  nextStepId: "strategic-2",
                },
                {
                  text: "Tenho dúvidas sobre o que realmente me valoriza",
                  value: "duvidas",
                  nextStepId: "strategic-2",
                },
                {
                  text: "Às vezes acerto, às vezes erro",
                  value: "inconsistente",
                  nextStepId: "strategic-2",
                },
                {
                  text: "Me sinto segura, mas sei que posso evoluir",
                  value: "segura_evoluir",
                  nextStepId: "strategic-2",
                },
              ],
              styles: { gap: "16px" },
              maxSelections: 1,
              minSelections: 1,
            },
          },
        ],
        defaultNextStepId: "strategic-2",
      },
      {
        id: "strategic-2",
        name: "S2 🎯 Desafios ao se vestir",
        components: [
          {
            id: "s2-heading",
            type: "heading",
            props: {
              text: "O que mais te desafia na hora de se vestir?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.8rem",
                fontWeight: "bold",
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
              questionText: "O que mais te desafia na hora de se vestir?",
              selectionType: "single",
              choices: [
                {
                  text: "Tenho peças, mas não sei como combiná-las",
                  value: "combinacao",
                  nextStepId: "strategic-3",
                },
                {
                  text: "Compro por impulso e me arrependo depois",
                  value: "impulso",
                  nextStepId: "strategic-3",
                },
                {
                  text: "Minha imagem não reflete quem eu sou",
                  value: "nao_reflete",
                  nextStepId: "strategic-3",
                },
                {
                  text: "Perco tempo e acabo usando sempre os mesmos looks",
                  value: "mesmos_looks",
                  nextStepId: "strategic-3",
                },
              ],
              styles: { gap: "16px" },
              maxSelections: 1,
              minSelections: 1,
            },
          },
        ],
        defaultNextStepId: "strategic-3",
      },
      {
        id: "strategic-3",
        name: "S3 🤔 Frequência de indecisão",
        components: [
          {
            id: "s3-heading",
            type: "heading",
            props: {
              text: "Com que frequência você se pega pensando:",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "s3-subtitle",
            type: "text",
            props: {
              text: '"Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
              styles: {
                textAlign: "center",
                color: "#10b981",
                fontSize: "1.3rem",
                fontStyle: "italic",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "s3-options",
            type: "options",
            props: {
              questionText:
                'Com que frequência você se pega pensando: "Com que roupa eu vou?"',
              selectionType: "single",
              choices: [
                {
                  text: "Quase todos os dias — é sempre uma indecisão",
                  value: "todos_dias",
                  nextStepId: "strategic-4",
                },
                {
                  text: "Sempre que tenho um compromisso importante",
                  value: "compromissos",
                  nextStepId: "strategic-4",
                },
                {
                  text: "Às vezes, mas me sinto limitada nas escolhas",
                  value: "limitada",
                  nextStepId: "strategic-4",
                },
                {
                  text: "Raramente — já me sinto segura ao me vestir",
                  value: "segura",
                  nextStepId: "strategic-4",
                },
              ],
              styles: { gap: "16px" },
              maxSelections: 1,
              minSelections: 1,
            },
          },
        ],
        defaultNextStepId: "strategic-4",
      },
      {
        id: "strategic-4",
        name: "S4 💡 Material estratégico",
        components: [
          {
            id: "s4-heading",
            type: "heading",
            props: {
              text: "Pense no quanto você já gastou com roupas que não usa...",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "s4-subtitle",
            type: "text",
            props: {
              text: "Você acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "s4-options",
            type: "options",
            props: {
              questionText:
                "Você acredita que ter acesso a um material estratégico faria diferença?",
              selectionType: "single",
              choices: [
                {
                  text: "Sim! Se existisse algo assim, eu quero",
                  value: "sim_quero",
                  nextStepId: "strategic-5",
                },
                {
                  text: "Sim, mas teria que ser no momento certo",
                  value: "sim_momento_certo",
                  nextStepId: "strategic-5",
                },
                {
                  text: "Tenho dúvidas se funcionaria pra mim",
                  value: "duvidas",
                  nextStepId: "strategic-5",
                },
                {
                  text: "Não, prefiro continuar como estou",
                  value: "nao",
                  nextStepId: "strategic-5",
                },
              ],
              styles: { gap: "16px" },
              maxSelections: 1,
              minSelections: 1,
            },
          },
        ],
        defaultNextStepId: "strategic-5",
      },
      {
        id: "strategic-5",
        name: "S5 💰 Investimento",
        components: [
          {
            id: "s5-heading",
            type: "heading",
            props: {
              text: "Se esse conteúdo completo custasse R$ 97,00",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "s5-subtitle",
            type: "text",
            props: {
              text: "— incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "s5-options",
            type: "options",
            props: {
              questionText: "Você consideraria R$ 97,00 um bom investimento?",
              selectionType: "single",
              choices: [
                {
                  text: "Sim! Por esse resultado, vale muito",
                  value: "vale_muito",
                  nextStepId: "strategic-6",
                },
                {
                  text: "Sim, mas só se eu tiver certeza de que funciona pra mim",
                  value: "se_funcionar",
                  nextStepId: "strategic-6",
                },
                {
                  text: "Talvez — depende do que está incluso",
                  value: "talvez",
                  nextStepId: "strategic-6",
                },
                {
                  text: "Não, ainda não estou pronta para investir",
                  value: "nao_pronta",
                  nextStepId: "strategic-6",
                },
              ],
              styles: { gap: "16px" },
              maxSelections: 1,
              minSelections: 1,
            },
          },
        ],
        defaultNextStepId: "strategic-6",
      },
      {
        id: "strategic-6",
        name: "S6 🎯 Resultados desejados",
        components: [
          {
            id: "s6-heading",
            type: "heading",
            props: {
              text: "Qual desses resultados você mais gostaria de alcançar?",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "1.6rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "s6-subtitle",
            type: "text",
            props: {
              text: "Com os Guias de Estilo e Imagem:",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "s6-options",
            type: "options",
            props: {
              questionText: "Qual resultado você mais gostaria de alcançar?",
              selectionType: "single",
              choices: [
                {
                  text: "Montar looks com mais facilidade e confiança",
                  value: "facilidade_confianca",
                  nextStepId: "transition-2",
                },
                {
                  text: "Usar o que já tenho e me sentir estilosa",
                  value: "usar_que_tenho",
                  nextStepId: "transition-2",
                },
                {
                  text: "Comprar com mais consciência e sem culpa",
                  value: "comprar_consciencia",
                  nextStepId: "transition-2",
                },
                {
                  text: "Ser admirada pela imagem que transmito",
                  value: "ser_admirada",
                  nextStepId: "transition-2",
                },
                {
                  text: "Resgatar peças esquecidas e criar novos looks com estilo",
                  value: "resgatar_pecas",
                  nextStepId: "transition-2",
                },
              ],
              styles: { gap: "16px" },
              maxSelections: 1,
              minSelections: 1,
            },
          },
        ],
        defaultNextStepId: "transition-2",
      },
      {
        id: "transition-2",
        name: "🙏 Transição Final",
        components: [
          {
            id: "transition2-heading",
            type: "heading",
            props: {
              text: "Obrigada por compartilhar.",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "2rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "transition2-subtitle",
            type: "text",
            props: {
              text: "Agora vamos calcular seu resultado personalizado...",
              styles: {
                textAlign: "center",
                color: "#10b981",
                fontSize: "1.2rem",
                fontStyle: "italic",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "transition2-button",
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
      {
        id: "result-page",
        name: "📊 Resultado",
        components: [
          {
            id: "result-heading",
            type: "heading",
            props: {
              text: "Seu Estilo Pessoal",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "2rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "result-description",
            type: "text",
            props: {
              text: "Baseado nas suas respostas, identificamos elementos únicos do seu estilo pessoal e criamos uma análise personalizada para você.",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "result-custom",
            type: "customComponent",
            props: {
              componentName: "ResultPage.tsx",
              resultType: "styleAnalysis",
              styleImages: {
                natural: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp",
                ],
                classico: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp",
                ],
                contemporaneo: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp",
                ],
                elegante: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp",
                ],
                romantico: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp",
                ],
                sexy: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp",
                ],
                dramatico: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp",
                ],
                criativo: [
                  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp",
                ],
              },
              styleNames: {
                natural: "Estilo Natural",
                classico: "Estilo Clássico",
                contemporaneo: "Estilo Contemporâneo",
                elegante: "Estilo Elegante",
                romantico: "Estilo Romântico",
                sexy: "Estilo Sexy",
                dramatico: "Estilo Dramático",
                criativo: "Estilo Criativo",
              },
            },
          },
          {
            id: "result-button",
            type: "button",
            props: {
              buttonText: "Ver Minha Análise Completa",
              buttonStyle: "primary",
              actionType: "goToNextStep",
              actionTargetId: "offer-page",
            },
          },
        ],
        defaultNextStepId: "offer-page",
      },
      {
        id: "offer-page",
        name: "💰 Oferta",
        components: [
          {
            id: "offer-heading",
            type: "heading",
            props: {
              text: "Transforme Seu Estilo com Confiança",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "2rem",
                fontWeight: "bold",
              },
            },
          },
          {
            id: "offer-subtitle",
            type: "text",
            props: {
              text: "Guia Completo de Estilo Personalizado + Bônus Especiais",
              styles: {
                textAlign: "center",
                color: "#10b981",
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "offer-custom",
            type: "customComponent",
            props: {
              componentName: "QuizOfferPage.tsx",
              offerHeadline:
                "Descubra como valorizar sua imagem usando seu estilo natural",
              offerDescription:
                "Aprenda a criar looks autênticos e poderosos que refletem sua essência única",
              offerCtaButtonText: "Quero Meu Guia Completo Agora!",
              offerCtaUrl:
                "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
              offerProductSku: "GUIA-ESTILO-COMPLETO",
              discountCode: "QUIZ39",
            },
          },
          {
            id: "price-original",
            type: "text",
            props: {
              text: "De R$ 175,00",
              styles: {
                textAlign: "center",
                color: "#666",
                fontSize: "1.2rem",
                textDecoration: "line-through",
              },
            },
          },
          {
            id: "price-promo",
            type: "text",
            props: {
              text: "Por apenas R$ 39,00",
              styles: {
                textAlign: "center",
                color: "#10b981",
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              },
            },
          },
          {
            id: "benefits-list",
            type: "text",
            props: {
              text: "✅ Descubra como valorizar sua imagem usando seu estilo natural\n✅ Aprenda a criar looks autênticos e poderosos\n✅ Entenda as cores e modelagens que mais combinam com você\n✅ Maximize seu guarda-roupa com peças versáteis\n✅ Guia de Visagismo Facial\n✅ Cartela de Cores Digital\n✅ Planilha de Guarda-Roupa Cápsula\n✅ Acesso ao Grupo VIP no Telegram",
              styles: {
                textAlign: "left",
                color: "#d1d5db",
                fontSize: "1rem",
                lineHeight: "1.6",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "guarantee",
            type: "text",
            props: {
              text: "🛡️ 7 dias de garantia incondicional\nTeste o guia completo e todos os bônus. Se não ficar satisfeita por qualquer motivo, devolvemos 100% do seu investimento. Sem perguntas.",
              styles: {
                textAlign: "center",
                color: "#fbbf24",
                fontSize: "0.9rem",
                fontStyle: "italic",
                marginBottom: "2rem",
              },
            },
          },
          {
            id: "final-cta",
            type: "button",
            props: {
              buttonText: "🚀 GARANTIR MEU ACESSO AGORA",
              buttonStyle: "primary",
              actionType: "redirectUrl",
              actionUrl:
                "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
            },
          },
        ],
        defaultNextStepId: null,
      },
    ],
    headerConfig: {
      showLogo: true,
      showProgressBar: true,
      allowReturnButton: true,
      logoUrl: "https://placehold.co/120x40/0f172a/94a3b8?text=LOGO",
      progressColor: "#3b82f6",
    },
    currentStepId: "step-1",
  });

  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

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
      // Simula salvamento (aqui você integraria com uma API real)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Quiz salvo:", editorState);
      alert("Quiz salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar o quiz. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Simula publicação (aqui você integraria com uma API real)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Quiz publicado:", editorState);
      alert("Quiz publicado com sucesso!");
    } catch (error) {
      console.error("Erro ao publicar:", error);
      alert("Erro ao publicar o quiz. Tente novamente.");
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
          isSaving={isSaving}
          isPublishing={isPublishing}
        />

        {/* Layout Principal com Quatro Colunas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna 1: Navegação de Etapas (Esquerda) - Oculta em mobile */}
          <div className="hidden lg:block w-64 xl:w-72 min-w-[250px] max-w-[320px] border-r border-zinc-700 bg-zinc-900 overflow-y-auto advanced-editor-scrollbar advanced-editor-column">
            <div className="h-full">
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

          {/* Coluna 2: Biblioteca de Componentes - Oculta em mobile e tablet */}
          <div className="hidden xl:block w-72 2xl:w-80 min-w-[280px] max-w-[360px] border-r border-zinc-700 bg-zinc-900 overflow-y-auto advanced-editor-scrollbar advanced-editor-column">
            <div className="h-full">
              <FunnelToolbarSidebar onComponentAdd={handleComponentAdd} />
            </div>
          </div>

          {/* Coluna 3: Canvas do Editor - Sempre visível */}
          <div className="flex-1 min-w-0 overflow-hidden advanced-editor-column">
            <div className="h-full overflow-y-auto canvas-area-scrollbar">
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

          {/* Coluna 4: Painel de Propriedades/Editor (Direita) - Oculta em mobile */}
          <div className="hidden md:block w-80 lg:w-96 min-w-[300px] max-w-[420px] border-l border-zinc-700 bg-zinc-900 overflow-y-auto advanced-editor-scrollbar advanced-editor-column">
            <div className="p-4 h-full">
              {selectedComponent ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Editar Componente
                    </h3>
                    <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                      {selectedComponent.type}
                    </span>
                  </div>
                  <ComponentPropertyEditor
                    type={selectedComponent.type}
                    props={selectedComponent.props}
                    onPropsChange={(newProps) =>
                      handleComponentUpdate(selectedComponent.id, newProps)
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
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
                      <rect width="3" height="8" x="13" y="2" rx="1.5"></rect>
                      <path d="M19 8.5V10h1.5A1.5 1.5 0 0 1 22 11.5v1A1.5 1.5 0 0 1 20.5 14H19v1.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V14h-1.5A1.5 1.5 0 0 1 12 12.5v-1A1.5 1.5 0 0 1 13.5 10H15V8.5a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 19 8.5Z"></path>
                      <rect width="8" height="3" x="2" y="13" rx="1.5"></rect>
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
              )}
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
