import React, { useState, useEffect } from "react";

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
    className="min-w-full text-3xl font-bold text-center text-zinc-100 p-2 rounded-md bg-zinc-800/50"
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
  <div
    className="grid p-2 rounded-md bg-zinc-800/50"
    style={component.props.styles}
  >
    <div className="flex items-center justify-center">
      <img
        src={
          component.props.src ||
          "https://placehold.co/300x200/0f172a/94a3b8?text=Imagem"
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
      name: "Alerta",
      type: "alert",
      icon: (
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
          className="lucide lucide-triangle-alert h-4 w-4"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
    },
    {
      name: "Argumentos",
      type: "arguments",
      icon: (
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
          className="lucide lucide-book h-4 w-4"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      name: "Audio",
      type: "audio",
      icon: (
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
          className="lucide lucide-mic h-4 w-4"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      ),
    },
    {
      name: "Botão",
      type: "button",
      icon: (
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
          className="lucide lucide-rectangle-horizontal h-4 w-4"
        >
          <rect width="20" height="12" x="2" y="6" rx="2"></rect>
        </svg>
      ),
    },
    {
      name: "Carregando",
      type: "loading",
      icon: (
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
          className="lucide lucide-loader-circle h-4 w-4"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      ),
    },
    {
      name: "Carrosel",
      type: "carousel",
      icon: (
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
          className="lucide lucide-gallery-horizontal-end h-4 w-4"
        >
          <path d="M2 7v10"></path>
          <path d="M6 5v14"></path>
          <rect width="12" height="18" x="10" y="3" rx="2"></rect>
        </svg>
      ),
    },
    {
      name: "Cartesiano",
      type: "chart",
      icon: (
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
          className="lucide lucide-chart-area h-4 w-4"
        >
          <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
          <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"></path>
        </svg>
      ),
    },
    {
      name: "Comparar",
      type: "compare",
      icon: (
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
          className="lucide lucide-align-horizontal-distribute-end h-4 w-4"
        >
          <rect width="6" height="14" x="4" y="5" rx="2"></rect>
          <rect width="6" height="10" x="14" y="7" rx="2"></rect>
          <path d="M10 2v20"></path>
          <path d="M20 2v20"></path>
        </svg>
      ),
      isNew: true,
    },
    {
      name: "Confetti",
      type: "confetti",
      icon: (
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
          className="lucide lucide-sparkles h-4 w-4"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
          <path d="M20 3v4"></path>
          <path d="M22 5h-4"></path>
          <path d="M4 17v2"></path>
          <path d="M5 18H3"></path>
        </svg>
      ),
      isNew: true,
    },
    {
      name: "Depoimentos",
      type: "testimonials",
      icon: (
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
          className="lucide lucide-quote h-4 w-4"
        >
          <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
          <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
        </svg>
      ),
    },
    {
      name: "Entrada",
      type: "input",
      icon: (
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
          className="lucide lucide-text-cursor-input h-4 w-4"
        >
          <path d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"></path>
          <path d="M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"></path>
          <path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"></path>
          <path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"></path>
          <path d="M9 7v10"></path>
        </svg>
      ),
    },
    {
      name: "Espaçador",
      type: "spacer",
      icon: (
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
          className="lucide lucide-proportions h-4 w-4"
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="M12 9v11"></path>
          <path d="M2 9h13a2 2 0 0 1 2 2v9"></path>
        </svg>
      ),
    },
    {
      name: "FAQ",
      type: "faq",
      icon: (
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
          className="lucide lucide-message-circle-question h-4 w-4"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
      isNew: true,
    },
    {
      name: "Gráficos",
      type: "graphics",
      icon: (
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
          className="lucide lucide-chart-no-axes-column-increasing h-4 w-4"
        >
          <line x1="12" x2="12" y1="20" y2="10"></line>
          <line x1="18" x2="18" y1="20" y2="4"></line>
          <line x1="6" x2="6" y1="20" y2="16"></line>
        </svg>
      ),
    },
    {
      name: "Imagem",
      type: "image",
      icon: (
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
          className="lucide lucide-images h-4 w-4"
        >
          <path d="M18 22H4a2 2 0 0 1-2-2V6"></path>
          <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"></path>
          <circle cx="12" cy="8" r="2"></circle>
          <rect width="16" height="16" x="6" y="2" rx="2"></rect>
        </svg>
      ),
    },
    {
      name: "Lista",
      type: "list",
      icon: (
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
          className="lucide lucide-list h-4 w-4"
        >
          <line x1="8" x2="21" y1="6" y2="6"></line>
          <line x1="8" x2="21" y1="12" y2="12"></line>
          <line x1="8" x2="21" y1="18" y2="18"></line>
          <line x1="3" x2="3.01" y1="6" y2="6"></line>
          <line x1="3" x2="3.01" y1="12" y2="12"></line>
          <line x1="3" x2="3.01" y1="18" y2="18"></line>
        </svg>
      ),
      isNew: true,
    },
    {
      name: "Marquise",
      type: "marquee",
      icon: (
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
          className="lucide lucide-arrow-right-left h-4 w-4"
        >
          <path d="m16 3 4 4-4 4"></path>
          <path d="M20 7H4"></path>
          <path d="m8 21-4-4 4-4"></path>
          <path d="M4 17h16"></path>
        </svg>
      ),
      isNew: true,
    },
    {
      name: "Nível",
      type: "level",
      icon: (
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
          className="lucide lucide-sliders-horizontal h-4 w-4"
        >
          <line x1="21" x2="14" y1="4" y2="4"></line>
          <line x1="10" x2="3" y1="4" y2="4"></line>
          <line x1="21" x2="12" y1="12" y2="12"></line>
          <line x1="8" x2="3" y1="12" y2="12"></line>
          <line x1="21" x2="16" y1="20" y2="20"></line>
          <line x1="12" x2="3" y1="20" y2="20"></line>
          <line x1="14" x2="14" y1="2" y2="6"></line>
          <line x1="8" x2="8" y1="10" y2="14"></line>
          <line x1="16" x2="16" y1="18" y2="22"></line>
        </svg>
      ),
    },
    {
      name: "Opções",
      type: "options",
      icon: (
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
          className="lucide lucide-rows3 h-4 w-4"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M21 9H3"></path>
          <path d="M21 15H3"></path>
        </svg>
      ),
    },
    {
      name: "Preço",
      type: "price",
      icon: (
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
          className="lucide lucide-circle-dollar-sign h-4 w-4"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <path d="M12 18V6"></path>
        </svg>
      ),
    },
    {
      name: "Script",
      type: "customComponent",
      icon: (
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
          className="lucide lucide-code h-4 w-4"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      name: "Termos",
      type: "terms",
      icon: (
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
          className="lucide lucide-scale h-4 w-4"
        >
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
          <path d="M7 21h10"></path>
          <path d="M12 3v18"></path>
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
        </svg>
      ),
    },
    {
      name: "Texto",
      type: "text",
      icon: (
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
          className="lucide lucide-text h-4 w-4"
        >
          <path d="M17 6.1H3"></path>
          <path d="M21 12.1H3"></path>
          <path d="M15.1 18H3"></path>
        </svg>
      ),
    },
    {
      name: "Título",
      type: "heading",
      icon: (
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
          className="lucide lucide-heading1 h-4 w-4"
        >
          <path d="M4 12h8"></path>
          <path d="M4 18V6"></path>
          <path d="M12 18V6"></path>
          <path d="m17 12 3-2v8"></path>
        </svg>
      ),
    },
    {
      name: "Video",
      type: "video",
      icon: (
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
          className="lucide lucide-video h-4 w-4"
        >
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
          <rect x="2" y="6" width="14" height="12" rx="2"></rect>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full h-full pr-2 hidden md:block md:max-w-[9.5rem] bg-zinc-900 border-r border-zinc-700">
      <div className="overflow-hidden relative z-[1] flex flex-col gap-1 p-2 pb-6">
        {toolbarItems.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-950/50 relative hover:z-30 rounded border border-zinc-700 hover:border-gray-400 p-2 cursor-pointer flex items-center gap-2 transition-all hover:bg-zinc-800"
            onClick={() => onComponentAdd(item.type)}
          >
            <div className="relative w-auto text-zinc-100">{item.icon}</div>
            <div className="text-xs py-1 text-zinc-100">{item.name}</div>
            {item.isNew && (
              <span className="text-[0.6rem] text-white bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-lg rounded-full px-1 py-0.5 absolute -top-1 -right-1">
                Novo!
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="py-8"></div>
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
                          className={`min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap rounded-md transition-all
                                                    ${
                                                      selectedComponentId ===
                                                      component.id
                                                        ? "border-2 border-solid border-blue-500 bg-blue-500/5"
                                                        : "group-hover/canvas-item:border-2 border-dashed hover:border-2 hover:border-blue-400"
                                                    }`}
                        >
                          <ComponentToRender component={component} />

                          {/* Indicador de seleção */}
                          {selectedComponentId === component.id && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-lg">
                              {component.type}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={component.id}
                        className="p-3 bg-red-800 text-white rounded"
                      >
                        Componente desconhecido: {component.type}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="pt-10 md:pt-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @component ComponentPropertiesEditor
 * @description Editor de propriedades dinâmico baseado no tipo de componente.
 */
const ComponentPropertiesEditor: React.FC<{
  component: QuizComponent;
  onUpdateProps: (newProps: Partial<QuizComponentProps>) => void;
}> = ({ component, onUpdateProps }) => {
  const { type, props } = component;

  const handleChange = (key: keyof QuizComponentProps, value: unknown) => {
    onUpdateProps({ [key]: value });
  };

  // Campo comum de estilos para todos os componentes
  const StylesEditor = () => (
    <div className="grid w-full items-center gap-1.5 mt-4 p-3 bg-zinc-800/50 rounded-md">
      <label className="text-sm font-medium leading-none text-zinc-100">
        Estilos CSS (Avançado)
      </label>
      <textarea
        className="flex min-h-[60px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        value={props.styles ? JSON.stringify(props.styles, null, 2) : "{}"}
        onChange={(e) => {
          try {
            const styles = JSON.parse(e.target.value);
            handleChange("styles", styles);
          } catch (error) {
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
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              URL da Imagem
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.src || ""}
              onChange={(e) => handleChange("src", e.target.value)}
              placeholder="https://exemplo.com/imagem.png"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Texto Alternativo
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
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
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
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
    <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 min-w-max ${
              currentStepId === step.id
                ? "bg-blue-600 text-white"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }`}
            onClick={() => onStepSelect(step.id)}
          >
            <span className="text-xs font-mono">{index + 1}</span>
            {editingStepId === step.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={handleFinishEdit}
                onKeyDown={handleKeyPress}
                className="bg-transparent border-b border-white text-sm min-w-20 focus:outline-none"
                autoFocus
              />
            ) : (
              <span
                className="text-sm"
                onDoubleClick={() => handleStartEdit(step)}
                title="Duplo clique para editar"
              >
                {step.name}
              </span>
            )}
            {steps.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Deletar etapa "${step.name}"?`)) {
                    onStepDelete(step.id);
                  }
                }}
                className="ml-1 p-1 rounded text-xs hover:bg-red-600 text-red-400"
                title="Deletar etapa"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button
          onClick={onAddStep}
          className="flex items-center space-x-1 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-md transition-colors duration-200 min-w-max"
          title="Adicionar nova etapa"
        >
          <span className="text-sm">+</span>
          <span className="text-xs">Nova Etapa</span>
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
        id: "step-1",
        name: "Primeira Etapa",
        components: [
          {
            id: "welcome-heading",
            type: "heading",
            props: {
              text: "Bem-vindo ao Quiz!",
              styles: {
                textAlign: "center",
                color: "#ffffff",
                fontSize: "2rem",
              },
            },
          },
          {
            id: "welcome-text",
            type: "text",
            props: {
              text: "Descubra seu estilo pessoal respondendo algumas perguntas rápidas.",
              styles: {
                textAlign: "center",
                color: "#d1d5db",
                fontSize: "1.1rem",
              },
            },
          },
          {
            id: "start-button",
            type: "button",
            props: {
              buttonText: "Começar Quiz",
              buttonStyle: "primary",
              actionType: "goToNextStep",
              actionTargetId: "step-2",
            },
          },
        ],
        defaultNextStepId: "step-2",
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

        {/* Navegação de Etapas */}
        <div className="border-b border-zinc-700">
          <StepNavigationTabs
            steps={editorState.steps}
            currentStepId={editorState.currentStepId}
            onStepSelect={handleStepSelect}
            onStepRename={handleStepRename}
            onStepDelete={handleStepDelete}
            onAddStep={handleAddStep}
          />
        </div>

        {/* Área Principal do Editor */}
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
