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
  componentName?: string; // Nome do componente personalizado
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
  <h1 className="min-w-full text-3xl font-bold text-center text-zinc-100 p-2 rounded-md bg-zinc-800/50">
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
  <div className="grid p-2 rounded-md bg-zinc-800/50">
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
  <div className="grid w-full items-center gap-1.5 p-2 rounded-md bg-zinc-800/50">
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
  const getButtonStyle = (style: string = "primary") => {
    switch (style) {
      case "secondary":
        return "bg-gray-600 text-white hover:bg-gray-700";
      case "outline":
        return "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent";
      case "ghost":
        return "text-blue-600 hover:bg-blue-100 bg-transparent";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 min-w-full h-14 ${getButtonStyle(
        component.props.buttonStyle
      )}`}
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
  <div className="grid gap-2 p-2 rounded-md bg-zinc-800/50">
    <p className="text-zinc-100 font-semibold">
      {component.props.questionText || "Selecione uma opção:"}
    </p>
    <div className="flex flex-col gap-2">
      {component.props.choices?.map((choice, index) => (
        <button
          key={index}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-zinc-700 text-zinc-100 hover:bg-zinc-600 p-3 text-left"
        >
          {choice.text}
          {choice.scoreValue && (
            <span className="ml-auto text-xs text-zinc-400">
              +{choice.scoreValue} pts
            </span>
          )}
        </button>
      ))}
    </div>
    {component.props.selectionType === "multiple" && (
      <p className="text-xs text-zinc-400">
        * Você pode selecionar múltiplas opções
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
  const getAlertStyle = (type: string = "info") => {
    switch (type) {
      case "error":
        return "bg-red-600/30 text-red-300 border-red-500";
      case "warning":
        return "bg-yellow-600/30 text-yellow-300 border-yellow-500";
      case "success":
        return "bg-green-600/30 text-green-300 border-green-500";
      default:
        return "bg-blue-600/30 text-blue-300 border-blue-500";
    }
  };

  return (
    <div
      className={`p-3 rounded-md border ${getAlertStyle(
        component.props.alertType
      )}`}
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
  <div className="p-3 bg-purple-600/30 text-purple-300 rounded-md border border-purple-500">
    <p className="font-bold">
      Componente Personalizado: {component.props.componentName}
    </p>
    {component.props.offerHeadline && (
      <p className="mt-2 font-semibold">{component.props.offerHeadline}</p>
    )}
    {component.props.offerDescription && (
      <p className="mt-1 text-sm">{component.props.offerDescription}</p>
    )}
    {component.props.discountCode && (
      <div className="mt-2 p-2 bg-purple-500/20 rounded">
        <span className="text-xs">Código: {component.props.discountCode}</span>
      </div>
    )}
    <p className="text-xs mt-1 opacity-75">
      Este é um placeholder para a lógica do componente React real.
    </p>
  </div>
);

/**
 * @component SpacerComponent
 * @description Componente para espaçamento.
 */
const SpacerComponent: React.FC = () => (
  <div className="h-4 w-full border-b border-dashed border-zinc-600 my-2 flex items-center justify-center text-zinc-500 text-xs">
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
  <p className="min-w-full text-zinc-100 text-center p-2 rounded-md bg-zinc-800/50">
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
  customComponent: CustomComponentPlaceholder, // Para ResultPage.tsx e QuizOfferPage.tsx
  spacer: SpacerComponent,
  text: TextComponent,
  // Outros componentes da toolbar não implementados visualmente aqui:
  // arguments, audio, carousel, chart, compare, confetti, testimonials, faq, graphics, list, marquee, level, price, script, terms, title, video, loading
};

// --- Funções Auxiliares ---

/**
 * @function generateUniqueId
 * @description Gera um ID único para componentes ou etapas.
 */
const generateUniqueId = (): string =>
  `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- Componentes Principais do Editor (UI Layout) ---

const FunnelNavbar: React.FC = () => {
  return (
    <div className="h-fit border-b relative z-[20] bg-zinc-950/50 backdrop-blur-lg">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between">
        <div className="order-0 md:order-0 flex w-full max-w-[5.75rem] lg:max-w-[18rem]">
          <div className="border-r border-zinc-700">
            {/* Botão de Fechar/Voltar para o Dashboard */}
            <button className="inline-block relative font-bold px-4 py-[1rem] text-zinc-100 border border-transparent hover:text-zinc-400 rounded-none h-full md:px-5">
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
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10">
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
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10"
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
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10">
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
        <div className="border-t border-zinc-700 md:border-t-0 md:order-1 w-full">
          <div className="md:mx-auto md:max-w-[32rem] flex h-full items-center justify-center p-1 md:p-0 gap-1 md:gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost bg-primary text-foreground h-10 px-4 py-2">
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
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2">
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
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2">
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
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2">
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
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2">
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
          <button className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10 md:flex hidden">
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
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10">
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
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10">
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
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 px-4 py-2">
            <span className="md:inline hidden">Salvar</span>
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
              className="lucide lucide-save w-4 h-4 md:hidden block"
            >
              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
              <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <span className="md:inline hidden">Publicar</span>
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
              className="lucide lucide-cloud w-4 h-4 md:hidden block"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const FunnelStepSidebar: React.FC<{
  steps: QuizStep[];
  currentStepId: string;
  onStepSelect: (stepId: string) => void;
  onAddStep: () => void;
}> = ({ steps, currentStepId, onStepSelect, onAddStep }) => {
  return (
    <div className="w-full min-h-[3rem] relative border-b overflow-auto none-scrollbar md:max-w-[13rem] border-r border-zinc-700 bg-zinc-900">
      <div className="h-full w-full rounded-[inherit] overflow-hidden scroll">
        <div className="flex flex-col">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`group border-r md:border-y md:border-r-0 min-w-[10rem] -mt-[1px] flex pl-2 relative items-center cursor-pointer 
                            ${
                              step.id === currentStepId
                                ? "bg-zinc-800 border-l-4 border-blue-600"
                                : "hover:bg-zinc-800"
                            }`}
              onClick={() => onStepSelect(step.id)}
            >
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
                  className="lucide lucide-grip w-4 h-4 text-zinc-400"
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
                <span className="block h-[3rem] w-full p-3 text-zinc-100">
                  {step.name}
                </span>
              </div>
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
                className="lucide lucide-ellipsis-vertical mr-2 w-4 h-4 cursor-pointer text-zinc-400"
                type="button"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </div>
          ))}
          <div className="grid md:p-1 relative">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-zinc-700 hover:text-foreground h-10 px-4 py-2 text-zinc-100"
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
      name: "Personalizado",
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
  ];

  return (
    <div className="w-full h-full pr-2 hidden md:block md:max-w-[9.5rem] bg-zinc-900 border-r border-zinc-700">
      <div className="overflow-hidden relative z-[1] flex flex-col gap-1 p-2 pb-6">
        {toolbarItems.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-950/50 relative hover:z-30 rounded border border-zinc-700 hover:border-gray-400 p-2 cursor-pointer flex items-center gap-2"
            onClick={() => onComponentAdd(item.type)}
          >
            <div className="relative w-auto text-zinc-100">{item.icon}</div>
            <div className="text-xs py-1 text-zinc-100">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="py-8"></div>
    </div>
  );
};

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
  const totalSteps = 15;
  const currentStepIndex = 1;

  return (
    <div
      className="w-full h-full overflow-auto z-10 bg-zinc-950"
      onClick={() => onComponentSelect(null)}
    >
      <div className="h-full w-full rounded-[inherit] overflow-hidden scroll">
        <div className="group relative main-content w-full min-h-full mx-auto">
          <div className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 group-[.screen-mobile]:p-3 md:p-5 pb-10">
            {/* Header do Canvas */}
            {headerConfig.showLogo ||
            headerConfig.showProgressBar ||
            headerConfig.allowReturnButton ? (
              <div className="grid gap-4 opacity-100">
                <div className="flex flex-row w-full h-auto justify-center relative bg-zinc-800/50 p-4 rounded-md">
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
                {currentStep.components.map((component) => {
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
                      <div
                        id={component.id}
                        className={`min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap rounded-md
                                                ${
                                                  selectedComponentId ===
                                                  component.id
                                                    ? "border-2 border-solid border-blue-500"
                                                    : "group-hover/canvas-item:border-2 border-dashed hover:border-2 hover:border-blue-500"
                                                }`}
                      >
                        <ComponentToRender component={component} />
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
                })}
                {currentStep.components.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-600 rounded-lg">
                    <p className="text-zinc-400 mb-2">Canvas vazio</p>
                    <p className="text-sm text-zinc-500">
                      Arraste componentes da barra lateral para começar
                    </p>
                  </div>
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

export default FunnelNavbar;
