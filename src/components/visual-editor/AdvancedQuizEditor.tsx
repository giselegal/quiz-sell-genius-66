import React, { useState, useEffect } from "react";
import "@/styles/advanced-editor.css";
import AdvancedConfigSidebar from "./panels/AdvancedConfigSidebar";
import {
  X,
  Undo,
  Redo,
  Clipboard,
  MonitorSmartphone,
  Waypoints,
  Play,
  Save,
  Cloud,
  Plus,
  Grip,
  EllipsisVertical,
  TriangleAlert,
  Book,
  Mic,
  RectangleHorizontal,
  LoaderCircle,
  GalleryHorizontalEnd,
  ChartArea,
  AlignHorizontalDistributeEnd,
  Sparkles,
  Quote,
  TextCursorInput,
  Proportions,
  MessageCircleQuestion,
  ChartNoAxesColumnIncreasing,
  Images,
  List,
  ArrowRightLeft,
  SlidersHorizontal,
  Rows3,
  CircleDollarSign,
  Code,
  Scale,
  Text,
  Heading1,
  Video,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  PencilRuler,
  Palette,
  UserRoundSearch,
  Cog,
} from "lucide-react";

// --- Interfaces Básicas ---
interface OptionChoice {
  text: string;
  value: string;
  nextStepId?: string;
  scoreValue?: number;
  imageSrc?: string; // Adicionado: URL da imagem para a opção
}

interface QuizComponentProps {
  text?: string;
  src?: string;
  alt?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  choices?: OptionChoice[];
  question?: string; // Para o componente FAQ
  answer?: string; // Para o componente FAQ
  author?: string; // Para o componente Testimonials
  currency?: string; // Para o componente Price
  amount?: number; // Para o componente Price
  description?: string; // Para o componente Price
  item1?: string; // Para o componente List
  item2?: string; // Para o componente List
  item3?: string; // Para o componente List
  value?: number; // Para o componente Level
  required?: boolean; // Para o componente Input
  [key: string]: unknown;
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
    | "spacer"
    | "alert"
    | "arguments"
    | "audio"
    | "loading"
    | "carousel"
    | "cartesian"
    | "compare"
    | "confetti"
    | "testimonials"
    | "faq"
    | "charts"
    | "list"
    | "marquee"
    | "level"
    | "price"
    | "script"
    | "terms";
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
  headerConfig: {
    title: string;
    subtitle: string;
    showLogo?: boolean;
    showProgress?: boolean;
    allowReturn?: boolean;
    logoSrc?: string;
  };
}

// --- Componente CanvasArea ---
interface CanvasAreaProps {
  currentStep: QuizStep | null;
  headerConfig: QuizEditorState["headerConfig"];
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
  onComponentAdd: (type: string) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentMove: (componentId: string, direction: "up" | "down") => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  currentStep,
  headerConfig,
  selectedComponentId,
  onComponentSelect,
  onComponentAdd,
  onComponentDelete,
  onComponentMove,
}) => {
  if (!currentStep) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            Nenhuma etapa selecionada
          </h3>
          <p>Selecione uma etapa no painel lateral para começar a editar</p>
        </div>
      </div>
    );
  }

  const generateUniqueId = (): string =>
    `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const renderComponent = (component: QuizComponent) => {
    const isSelected = selectedComponentId === component.id;

    return (
      <div
        key={component.id}
        className={`group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mx-auto w-full 
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-transparent hover:border-zinc-600"
                    }
                    rounded-md p-2 mb-4 cursor-pointer transition-all`}
        onClick={() => onComponentSelect(component.id)}
      >
        {/* Controles de componente */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 flex gap-1 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentMove(component.id, "up");
              }}
              className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-blue-700 shadow-md"
              title="Mover para cima"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentMove(component.id, "down");
              }}
              className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-blue-700 shadow-md"
              title="Mover para baixo"
            >
              <ArrowDown size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComponentDelete(component.id);
              }}
              className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow-md"
              title="Excluir"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Renderização do componente */}
        <div className="min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap">
          {component.type === "heading" && (
            <h1
              className="min-w-full font-bold text-center"
              style={{
                fontSize: `${component.props.fontSize || 32}px`,
                color: component.props.textColor || "#f9fafb",
                textAlign:
                  (component.props.alignment as "left" | "center" | "right") ||
                  "center",
                backgroundColor:
                  component.props.backgroundColor || "transparent",
                padding: `${component.props.padding || 0}px`,
                margin: `${component.props.margin || 0}px`,
                borderRadius: `${component.props.borderRadius || 0}px`,
              }}
            >
              {component.props.text || "Título"}
            </h1>
          )}
          {component.type === "text" && (
            <p
              className="text-center"
              style={{
                fontSize: `${component.props.fontSize || 16}px`,
                color: component.props.textColor || "#f9fafb",
                textAlign:
                  (component.props.alignment as "left" | "center" | "right") ||
                  "center",
                backgroundColor:
                  component.props.backgroundColor || "transparent",
                padding: `${component.props.padding || 0}px`,
                margin: `${component.props.margin || 0}px`,
                borderRadius: `${component.props.borderRadius || 0}px`,
                lineHeight: "1.6",
              }}
            >
              {component.props.text || "Texto do parágrafo"}
            </p>
          )}
          {component.type === "image" && (
            <div className="grid">
              <div className="text-lg flex items-center justify-center">
                <img
                  src={
                    component.props.src ||
                    "https://placehold.co/640x480/333/FFF?text=Imagem"
                  }
                  alt={component.props.alt || "Imagem"}
                  className="object-cover w-full h-auto rounded-lg max-w-96"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/640x480/333/FFF?text=Erro+ao+carregar+imagem";
                  }}
                />
              </div>
            </div>
          )}
          {component.type === "button" && (
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-full h-14"
              style={{
                backgroundColor: component.props.backgroundColor || "#3b82f6",
                color: component.props.textColor || "#ffffff",
                fontSize: `${component.props.fontSize || 16}px`,
                padding: `${component.props.padding || 16}px`,
                margin: `${component.props.margin || 0}px`,
                borderRadius: `${component.props.borderRadius || 8}px`,
                boxShadow: component.props.shadow
                  ? `0 ${component.props.shadow * 2}px ${
                      component.props.shadow * 4
                    }px rgba(0,0,0,0.3)`
                  : undefined,
                border: "none",
                cursor: "pointer",
              }}
            >
              {component.props.buttonText || "Botão"}
            </button>
          )}
          {component.type === "input" && (
            <div className="grid w-full items-center gap-1.5">
              {component.props.label && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-100">
                  {component.props.label}
                  {component.props.required && (
                    <span className="text-red-500"> *</span>
                  )}
                </label>
              )}
              <input
                type="text"
                placeholder={component.props.placeholder || "Digite aqui..."}
                className="flex h-10 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-inherit placeholder:opacity-50 text-base text-left p-4 bg-zinc-800 text-white border-zinc-600"
                disabled
              />
            </div>
          )}
          {component.type === "options" && (
            <div className="quiz-options-container">
              <h3 className="font-medium mb-3 text-zinc-100">
                {component.props.text || "Pergunta"}
              </h3>
              <div
                className={`quiz-options-grid ${(() => {
                  const layout = component.props.gridLayout || "grid-2";
                  const mobileColumns = component.props.mobileColumns || "1";
                  const tabletColumns = component.props.tabletColumns || "2";
                  const desktopColumns = component.props.desktopColumns || "2";

                  return `quiz-options-${layout} quiz-options-grid-${mobileColumns}-mobile quiz-options-grid-${tabletColumns}-tablet quiz-options-grid-${desktopColumns}-desktop`;
                })()}`}
                style={{
                  gap: `${component.props.optionSpacing || 8}px`,
                }}
              >
                {component.props.choices?.map(
                  (choice: OptionChoice, index: number) => (
                    <button
                      key={index}
                      className="quiz-option-card relative rounded-lg border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 overflow-hidden group option-button"
                      style={{
                        padding: `${component.props.optionPadding || 12}px`,
                        borderRadius: `${component.props.borderRadius || 8}px`,
                        backgroundColor: component.props.backgroundColor,
                        color: component.props.textColor,
                        boxShadow: component.props.shadow
                          ? `0 ${component.props.shadow * 2}px ${
                              component.props.shadow * 4
                            }px rgba(0,0,0,0.3)`
                          : undefined,
                      }}
                    >
                      {choice.imageSrc && (
                        <div
                          className={`quiz-option-image-container ${(() => {
                            const ratio =
                              component.props.imageRatio || "square";
                            return `image-ratio-${ratio}`;
                          })()}`}
                          style={{
                            height: `${component.props.imageHeight || 160}px`,
                            borderRadius: `${
                              component.props.imageBorderRadius || 8
                            }px`,
                            overflow: "hidden",
                            marginBottom:
                              component.props.imagePosition === "top"
                                ? "8px"
                                : "0",
                            marginTop:
                              component.props.imagePosition === "bottom"
                                ? "8px"
                                : "0",
                          }}
                        >
                          <img
                            src={choice.imageSrc}
                            alt={choice.text}
                            className="w-full h-full object-cover"
                            style={{
                              borderRadius: `${
                                component.props.imageBorderRadius || 8
                              }px`,
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/256x256/555/FFF?text=IMG";
                            }}
                          />
                        </div>
                      )}
                      <div className="quiz-option-content">
                        <div
                          className={`quiz-option-text text-sm leading-tight ${(() => {
                            const alignment =
                              component.props.textAlignment || "center";
                            return `text-align-${alignment}`;
                          })()}`}
                          style={{
                            fontSize: `${component.props.fontSize || 14}px`,
                            color: component.props.textColor || "#f9fafb",
                          }}
                        >
                          <div
                            className="custom-quill quill ql-editor quill-option"
                            dangerouslySetInnerHTML={{ __html: choice.text }}
                          />
                        </div>
                      </div>
                    </button>
                  )
                ) || (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="quiz-option-card relative rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-200 p-3 min-h-[100px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm opacity-60">Opção 1</div>
                      </div>
                    </button>
                    <button className="quiz-option-card relative rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-200 p-3 min-h-[100px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm opacity-60">Opção 2</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {component.type === "video" && (
            <div className="aspect-video bg-zinc-800 rounded flex items-center justify-center text-zinc-400">
              📹 Vídeo
            </div>
          )}
          {component.type === "spacer" && (
            <div className="h-8 border-dashed border border-zinc-600 rounded flex items-center justify-center text-zinc-500 text-sm">
              Espaçador
            </div>
          )}
          {component.type === "alert" && (
            <div
              className="flex items-center p-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <TriangleAlert
                size={20}
                className="flex-shrink-0 inline w-4 h-4 me-3"
              />
              <span className="sr-only">Informação</span>
              <div>
                <span className="font-medium">
                  {component.props.text || "Alerta!"}
                </span>
              </div>
            </div>
          )}
          {component.type === "arguments" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <Book size={16} className="mr-2" /> Argumentos
              </h4>
              <p>
                {component.props.text ||
                  "Este é um bloco para argumentos ou pontos chave."}
              </p>
            </div>
          )}
          {component.type === "audio" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
              <Mic size={24} className="mr-2" />
              <span>Leitor de Áudio (Pré-visualização)</span>
            </div>
          )}
          {component.type === "loading" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-400">
              <LoaderCircle size={32} className="animate-spin" />
              <span className="mt-2">Carregando...</span>
            </div>
          )}
          {component.type === "carousel" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 aspect-video">
              <GalleryHorizontalEnd size={24} className="mr-2" />
              <span>Carrossel (Pré-visualização)</span>
            </div>
          )}
          {component.type === "cartesian" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 aspect-video">
              <ChartArea size={24} className="mr-2" />
              <span>Gráfico Cartesiano (Pré-visualização)</span>
            </div>
          )}
          {component.type === "compare" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
              <AlignHorizontalDistributeEnd size={24} className="mr-2" />
              <span>Componente de Comparação (Pré-visualização)</span>
            </div>
          )}
          {component.type === "confetti" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
              <Sparkles size={24} className="mr-2" />
              <span>Confetes (Pré-visualização)</span>
            </div>
          )}
          {component.type === "testimonials" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200 border-l-4 border-blue-500">
              <Quote size={20} className="mb-2 text-blue-500" />
              <p className="italic">
                {component.props.text || "Esta é uma citação de depoimento."}
              </p>
              {component.props.author && (
                <p className="mt-2 text-right text-sm font-semibold">
                  - {component.props.author}
                </p>
              )}
            </div>
          )}
          {component.type === "faq" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <MessageCircleQuestion size={16} className="mr-2" /> FAQ
              </h4>
              <p className="font-bold">
                {component.props.question || "Pergunta Frequente?"}
              </p>
              <p className="text-sm mt-1">
                {component.props.answer ||
                  "Resposta para a pergunta frequente."}
              </p>
            </div>
          )}
          {component.type === "charts" && (
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 aspect-video">
              <ChartNoAxesColumnIncreasing size={24} className="mr-2" />
              <span>Gráficos (Pré-visualização)</span>
            </div>
          )}
          {component.type === "list" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <List size={16} className="mr-2" /> Lista
              </h4>
              <ul className="list-disc pl-5">
                <li>{component.props.item1 || "Item da lista 1"}</li>
                <li>{component.props.item2 || "Item da lista 2"}</li>
                <li>{component.props.item3 || "Item da lista 3"}</li>
              </ul>
            </div>
          )}
          {component.type === "marquee" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200 overflow-hidden relative h-10 flex items-center">
              <ArrowRightLeft size={20} className="mr-2" />
              <span className="whitespace-nowrap animate-marquee">
                {component.props.text ||
                  "Este é um texto de letreiro em movimento. "}
              </span>
              <style>
                {`
                    @keyframes marquee {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }
                    .animate-marquee {
                        animation: marquee 15s linear infinite;
                    }
                    `}
              </style>
            </div>
          )}
          {component.type === "level" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200 flex items-center">
              <SlidersHorizontal size={20} className="mr-2" />
              <span>Nível: {component.props.value || "1"}</span>
            </div>
          )}
          {component.type === "price" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200 text-center">
              <CircleDollarSign
                size={32}
                className="mx-auto mb-2 text-green-500"
              />
              <p className="text-xl font-bold">
                {component.props.currency || "R$"}
                {component.props.amount || "0.00"}
              </p>
              <p className="text-sm">
                {component.props.description || "Descrição do preço"}
              </p>
            </div>
          )}
          {component.type === "script" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-400 font-mono text-sm">
              <Code size={16} className="inline mr-2" />
              <span>{"<script> (Código JavaScript) </script>"}</span>
            </div>
          )}
          {component.type === "terms" && (
            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-200 max-h-40 overflow-y-auto">
              <h4 className="font-semibold mb-2 flex items-center">
                <Scale size={16} className="mr-2" /> Termos e Condições
              </h4>
              <p className="text-sm">
                {component.props.text ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-1 left-1 text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded-md">
          {component.type}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-3 md:p-5 overflow-y-auto">
      <div className="main-content w-full relative mx-auto max-w-[38rem] h-full flex flex-col gap-4 md:gap-6 pb-10">
        {headerConfig && (
          <div className="flex flex-row w-full h-auto justify-center relative">
            {headerConfig.allowReturn && (
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 w-10 absolute left-0 text-zinc-100">
                <ArrowLeft size={16} />
              </button>
            )}
            <div className="flex flex-col w-full customizable-width justify-start items-center gap-4">
              {headerConfig.showLogo && headerConfig.logoSrc && (
                <img
                  width="96"
                  height="96"
                  className="max-w-24 object-cover"
                  alt="Logo"
                  src={headerConfig.logoSrc}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/96x96/555/FFF?text=Logo";
                  }}
                />
              )}
              {headerConfig.showProgress && (
                <div
                  aria-valuemax="100"
                  aria-valuemin="0"
                  role="progressbar"
                  data-state="indeterminate"
                  data-max="100"
                  className="relative w-full overflow-hidden rounded-full bg-zinc-700 h-2"
                >
                  <div
                    data-state="indeterminate"
                    data-max="100"
                    className="progress h-full w-full flex-1 bg-blue-600 transition-all"
                    style={{ transform: "translateX(-92.8571%)" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep.components.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 bg-zinc-800 rounded-lg p-6">
            <p className="mb-4">Esta etapa está vazia</p>
            <button
              onClick={() => onComponentAdd("heading")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Adicionar primeiro componente
            </button>
          </div>
        ) : (
          <div className="grid gap-4 opacity-100">
            {currentStep.components.map(renderComponent)}
          </div>
        )}
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
    <div className="h-fit border-b relative z-[20] bg-zinc-950/50 backdrop-blur-lg">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between">
        <div className="order-0 md:order-0 flex w-full max-w-[5.75rem] lg:max-w-[18rem]">
          <div className="border-r border-zinc-700">
            <a
              target="_self"
              className="inline-block relative font-bold px-4 py-[1rem] text-zinc-100 border border-transparent rounded-none h-full md:px-5"
              href="/dashboard"
            >
              <span className="h-full flex items-center w-full justify-center gap-2">
                <X className="lucide lucide-x" size={24} />
              </span>
            </a>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex p-3 gap-1 md:gap-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10 text-zinc-100 border-zinc-700 hover:bg-zinc-700">
                <Undo size={16} />
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10 text-zinc-100 border-zinc-700 hover:bg-zinc-700"
                disabled
              >
                <Redo size={16} />
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10 text-zinc-100 border-zinc-700 hover:bg-zinc-700">
                <Clipboard size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="border-t md:border-t-0 md:order-1 w-full flex items-center justify-center md:mx-auto md:max-w-[32rem]">
          <div className="flex h-full items-center justify-center p-1 md:p-0 gap-1 md:gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-zinc-700">
              <PencilRuler size={16} className="md:mr-2 md:mx-0 mx-4" />
              <span className="hidden md:inline">Construtor</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2 text-zinc-100">
              <Waypoints size={16} className="md:mr-2 md:mx-0 mx-4" />
              <span className="hidden md:inline">Fluxo</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2 text-zinc-100">
              <Palette size={16} className="md:mr-2 md:mx-0 mx-4" />
              <span className="hidden md:inline">Design</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2 text-zinc-100">
              <UserRoundSearch size={16} className="md:mr-2 md:mx-0 mx-4" />
              <span className="hidden md:inline">Leads</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2 text-zinc-100">
              <Cog size={16} className="md:mr-2 md:mx-0 mx-4" />
              <span className="hidden md:inline">Configurações</span>
            </button>
          </div>
        </div>
        <div className="md:flex hidden order-1 md:order-3 w-fit gap-1 md:gap-2 p-3">
          <button className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10 text-zinc-100 border-zinc-700 hover:bg-zinc-700">
            <MonitorSmartphone size={16} />
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 w-10 text-zinc-100 border-zinc-700 hover:bg-zinc-700">
            <Play size={16} />
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 outlined border border-input bg-background hover:bg-primary hover:text-foreground h-10 px-4 py-2 text-zinc-100 border-zinc-700 hover:bg-zinc-700"
          >
            <span className="md:inline hidden">
              {isSaving ? "Salvando..." : "Salvar"}
            </span>
            <Save size={16} className="md:hidden block" />
          </button>
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <span className="md:inline hidden">
              {isPublishing ? "Publicando..." : "Publicar"}
            </span>
            <Cloud size={16} className="md:hidden block" />
          </button>
        </div>
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
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [newStepName, setNewStepName] = useState<string>("");

  const handleRenameClick = (step: QuizStep) => {
    setEditingStepId(step.id);
    setNewStepName(step.name);
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStepName(e.target.value);
  };

  const handleRenameBlur = (stepId: string) => {
    onStepRename(stepId, newStepName);
    setEditingStepId(null);
  };

  const handleRenameKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    stepId: string
  ) => {
    if (e.key === "Enter") {
      handleRenameBlur(stepId);
    }
  };

  return (
    <div className="w-full min-h-[3rem] relative border-b border-zinc-700 overflow-auto none-scrollbar md:max-w-[13rem] md:border-r bg-zinc-900">
      <div className="relative overflow-hidden flex md:grid h-full">
        <div
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: "hidden scroll" }}
        >
          <div className="flex md:flex-col min-w-max md:min-w-0">
            {steps.map((step) => (
              <div
                key={step.id}
                role="button"
                tabIndex={0}
                aria-disabled="false"
                aria-roledescription="sortable"
                className={`group border-r md:border-y md:border-r-0 min-w-[10rem] -mt-[1px] flex pl-2 relative items-center cursor-pointer
                            ${
                              currentStepId === step.id
                                ? "border-blue-600 bg-zinc-800"
                                : "border-transparent text-zinc-300 hover:bg-zinc-700"
                            }`}
                onClick={() => onStepSelect(step.id)}
              >
                <div
                  className={`absolute bottom-0 z-[5] left-0 w-full md:w-0 md:h-full border md:border-2 
                                ${
                                  currentStepId === step.id
                                    ? "border-blue-600"
                                    : "border-transparent"
                                }`}
                ></div>
                <span>
                  <Grip size={16} className="w-4 h-4 text-zinc-400" />
                </span>
                <div className="w-full relative z-[5]">
                  {editingStepId === step.id ? (
                    <input
                      type="text"
                      value={newStepName}
                      onChange={handleRenameChange}
                      onBlur={() => handleRenameBlur(step.id)}
                      onKeyDown={(e) => handleRenameKeyDown(e, step.id)}
                      className="block h-[3rem] w-full bg-transparent p-3 text-zinc-100 focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="block h-[3rem] w-full p-3 text-zinc-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenameClick(step);
                      }}
                    >
                      {step.name}
                    </span>
                  )}
                </div>
                {steps.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepDelete(step.id);
                    }}
                    className="mr-2 w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                    title="Excluir Etapa"
                  >
                    <X size={16} />
                  </button>
                )}
                <EllipsisVertical
                  size={16}
                  className="mr-2 w-4 h-4 cursor-pointer text-zinc-400"
                />
              </div>
            ))}
            <div className="grid md:p-1 relative min-w-[10rem] md:w-full">
              <button
                onClick={onAddStep}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 px-4 py-2 bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              >
                <Plus size={16} className="mr-2 h-4 w-4" /> Adicionar Etapa
              </button>
            </div>
            <div className="py-10 md:hidden"></div>{" "}
            {/* Espaçador para rolagem horizontal */}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Componente ComponentAddSidebar ---
const ComponentAddSidebar: React.FC<{
  onComponentAdd: (type: string) => void;
}> = ({ onComponentAdd }) => {
  return (
    <div className="w-full md:max-w-[13rem] bg-zinc-950/50 backdrop-blur-lg border-b md:border-l md:border-b-0 border-zinc-700 p-4 overflow-y-auto">
      <h3 className="text-zinc-100 font-medium mb-4">Adicionar Componente</h3>
      <div className="space-y-2">
        {[
          {
            type: "heading",
            label: "Título",
            icon: Heading1,
            desc: "Cabeçalho principal",
          },
          {
            type: "text",
            label: "Texto",
            icon: Text,
            desc: "Parágrafo de texto",
          },
          {
            type: "image",
            label: "Imagem",
            icon: Images,
            desc: "Imagem ou foto",
          },
          {
            type: "button",
            label: "Botão",
            icon: RectangleHorizontal,
            desc: "Botão clicável",
          },
          {
            type: "input",
            label: "Entrada",
            icon: TextCursorInput,
            desc: "Campo de entrada",
          },
          {
            type: "options",
            label: "Opções",
            icon: Rows3,
            desc: "Múltipla escolha",
          },
          {
            type: "video",
            label: "Vídeo",
            icon: Video,
            desc: "Vídeo incorporado",
          },
          {
            type: "spacer",
            label: "Espaçador",
            icon: Proportions,
            desc: "Espaçamento",
          },
          {
            type: "alert",
            label: "Alerta",
            icon: TriangleAlert,
            desc: "Mensagem de alerta",
            new: true,
          },
          {
            type: "arguments",
            label: "Argumentos",
            icon: Book,
            desc: "Seção de argumentos",
          },
          { type: "audio", label: "Áudio", icon: Mic, desc: "Player de áudio" },
          {
            type: "loading",
            label: "Carregando",
            icon: LoaderCircle,
            desc: "Indicador de carregamento",
          },
          {
            type: "carousel",
            label: "Carrossel",
            icon: GalleryHorizontalEnd,
            desc: "Galeria de imagens",
          },
          {
            type: "cartesian",
            label: "Cartesiano",
            icon: ChartArea,
            desc: "Gráfico cartesiano",
          },
          {
            type: "compare",
            label: "Comparar",
            icon: AlignHorizontalDistributeEnd,
            desc: "Comparador de itens",
            new: true,
          },
          {
            type: "confetti",
            label: "Confetes",
            icon: Sparkles,
            desc: "Efeito de celebração",
            new: true,
          },
          {
            type: "testimonials",
            label: "Depoimentos",
            icon: Quote,
            desc: "Citações de clientes",
          },
          {
            type: "faq",
            label: "FAQ",
            icon: MessageCircleQuestion,
            desc: "Perguntas frequentes",
            new: true,
          },
          {
            type: "charts",
            label: "Gráficos",
            icon: ChartNoAxesColumnIncreasing,
            desc: "Gráficos de dados",
          },
          {
            type: "list",
            label: "Lista",
            icon: List,
            desc: "Lista de itens",
            new: true,
          },
          {
            type: "marquee",
            label: "Letreiro",
            icon: ArrowRightLeft,
            desc: "Texto deslizante",
            new: true,
          },
          {
            type: "level",
            label: "Nível",
            icon: SlidersHorizontal,
            desc: "Slider de nível",
          },
          {
            type: "price",
            label: "Preço",
            icon: CircleDollarSign,
            desc: "Exibição de preço",
          },
          {
            type: "script",
            label: "Script",
            icon: Code,
            desc: "Inserir código",
          },
          {
            type: "terms",
            label: "Termos",
            icon: Scale,
            desc: "Termos e condições",
          },
        ].map((component) => (
          <button
            key={component.type}
            onClick={() => onComponentAdd(component.type)}
            className="w-full text-left p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors relative"
          >
            <div className="font-medium text-sm flex items-center">
              <component.icon size={16} className="mr-2" />
              {component.label}
              {component.new && (
                <span className="text-[0.6rem] text-white bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-lg rounded-full px-1 py-0.5 absolute -top-1 -right-1">
                  Novo!
                </span>
              )}
            </div>
            <div className="text-xs text-zinc-400 mt-1">{component.desc}</div>
          </button>
        ))}
      </div>
      <div className="py-8"></div>
    </div>
  );
};

// --- Componente ComponentConfigSidebar ---
// --- Componente Principal ---
const AdvancedQuizEditor: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [editorState, setEditorState] = useState<QuizEditorState>(() => {
    // Tentar carregar do localStorage primeiro
    const savedState = loadFromLocalStorage();
    if (savedState) {
      console.log("🔄 Carregando estado salvo do localStorage");
      return savedState;
    }

    // Se não há estado salvo, usar o padrão
    console.log("🆕 Usando estado padrão inicial");
    return {
      steps: [
        {
          id: "step-1",
          name: "PÁGINA INICIAL",
          components: [
            {
              id: "comp-1-1",
              type: "image",
              props: {
                src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.jpg",
                alt: "Imagem Principal",
              },
            },
            {
              id: "comp-1-2",
              type: "heading",
              props: {
                text: "Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.",
              },
            },
            {
              id: "comp-1-3",
              type: "text",
              props: {
                text: "Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.",
              },
            },
            {
              id: "comp-1-4",
              type: "spacer",
              props: {},
            },
            {
              id: "comp-1-5",
              type: "input",
              props: {
                label: "Nome",
                placeholder: "Digite seu nome aqui..,",
                required: true,
              },
            },
            {
              id: "comp-1-6",
              type: "button",
              props: {
                buttonText: "Quero Descobrir meu Estilo Agora!",
              },
            },
            {
              id: "comp-1-7",
              type: "script",
              props: {
                text: "// Script para capturar dados do usuário e iniciar quiz\nconsole.log('Iniciando quiz de estilo');\n// Aqui pode ser adicionada lógica adicional",
              },
            },
          ],
        },
        {
          id: "step-2",
          name: "QUESTÃO 1",
          components: [
            {
              id: "comp-2-1",
              type: "heading",
              props: { text: "QUAL O SEU TIPO DE ROUPA FAVORITA?" },
            },
            {
              id: "comp-2-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Conforto, leveza e praticidade no vestir"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
                  },
                  {
                    text: 'Clássico: "Discrição, caimento clássico e sobriedade"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
                  },
                  {
                    text: 'Contemporâneo: "Praticidade com um toque de estilo atual"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp",
                  },
                  {
                    text: 'Elegante: "Elegância refinada, moderna e sem exageros"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp",
                  },
                  {
                    text: 'Romântico: "Delicadeza em tecidos suaves e fluidos"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp",
                  },
                  {
                    text: 'Sexy: "Sensualidade com destaque para o corpo"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp",
                  },
                  {
                    text: 'Dramático: "Impacto visual com peças estruturadas e assimétricas"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp",
                  },
                  {
                    text: 'Criativo: "Mix criativo com formas ousadas e originais"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-3",
          name: "QUESTÃO 2",
          components: [
            {
              id: "comp-3-1",
              type: "heading",
              props: { text: "RESUMA A SUA PERSONALIDADE:" },
            },
            {
              id: "comp-3-2",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Informal, espontânea, alegre, essencialista"',
                    value: "natural",
                    scoreValue: 1,
                  },
                  {
                    text: 'Clássico: "Conservadora, séria, organizada"',
                    value: "classico",
                    scoreValue: 1,
                  },
                  {
                    text: 'Contemporâneo: "Informada, ativa, prática"',
                    value: "contemporaneo",
                    scoreValue: 1,
                  },
                  {
                    text: 'Elegante: "Exigente, sofisticada, seletiva"',
                    value: "elegante",
                    scoreValue: 1,
                  },
                  {
                    text: 'Romântico: "Feminina, meiga, delicada, sensível"',
                    value: "romantico",
                    scoreValue: 1,
                  },
                  {
                    text: 'Sexy: "Glamorosa, vaidosa, sensual"',
                    value: "sexy",
                    scoreValue: 1,
                  },
                  {
                    text: 'Dramático: "Cosmopolita, moderna e audaciosa"',
                    value: "dramatico",
                    scoreValue: 1,
                  },
                  {
                    text: 'Criativo: "Exótica, aventureira, livre"',
                    value: "criativo",
                    scoreValue: 1,
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-4",
          name: "QUESTÃO 3",
          components: [
            {
              id: "comp-4-1",
              type: "heading",
              props: { text: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?" },
            },
            {
              id: "comp-4-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Visual leve, despojado e natural"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp",
                  },
                  {
                    text: 'Clássico: "Visual clássico e tradicional"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp",
                  },
                  {
                    text: 'Contemporâneo: "Visual casual com toque atual"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp",
                  },
                  {
                    text: 'Elegante: "Visual refinado e imponente"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp",
                  },
                  {
                    text: 'Romântico: "Visual romântico, feminino e delicado"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp",
                  },
                  {
                    text: 'Sexy: "Visual sensual, com saia justa e decote"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp",
                  },
                  {
                    text: 'Dramático: "Visual marcante e urbano (jeans + jaqueta)"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp",
                  },
                  {
                    text: 'Criativo: "Visual criativo, colorido e ousado"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-5",
          name: "QUESTÃO 4",
          components: [
            {
              id: "comp-5-1",
              type: "heading",
              props: { text: "QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?" },
            },
            {
              id: "comp-5-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Estampas clean, com poucas informações"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/20_oh44vh.webp",
                  },
                  {
                    text: 'Clássico: "Estampas clássicas e atemporais"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735368/21_o7wkte.webp",
                  },
                  {
                    text: 'Contemporâneo: "Atemporal, mas que tenha uma pegada de atual e moderna"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735369/22_siebw2.webp",
                  },
                  {
                    text: 'Elegante: "Estampas clássicas e atemporais, mas sofisticadas"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/23_bdfxrh.webp",
                  },
                  {
                    text: 'Romântico: "Estampas florais e/ou delicadas como bolinhas, borboletas e corações"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/24_nptszu.webp",
                  },
                  {
                    text: 'Sexy: "Estampas de animal print, como onça, zebra e cobra"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/25_motk6b.webp",
                  },
                  {
                    text: 'Dramático: "Estampas geométricas, abstratas e exageradas como grandes poás"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/26_dptanw.webp",
                  },
                  {
                    text: 'Criativo: "Estampas diferentes do usual, como africanas, xadrez grandes"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/27_wxmklx.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-6",
          name: "QUESTÃO 5",
          components: [
            {
              id: "comp-6-1",
              type: "heading",
              props: { text: "QUAL CASACO É SEU FAVORITO?" },
            },
            {
              id: "comp-6-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Cardigã bege confortável e casual"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/29_sdogoy.webp",
                  },
                  {
                    text: 'Clássico: "Blazer verde estruturado"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/30_nfth8k.webp",
                  },
                  {
                    text: 'Contemporâneo: "Trench coat bege tradicional"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/31_tcmhcl.webp",
                  },
                  {
                    text: 'Elegante: "Blazer branco refinado"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/32_h78pd8.webp",
                  },
                  {
                    text: 'Romântico: "Casaco pink vibrante e moderno"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/33_u8pldd.webp",
                  },
                  {
                    text: 'Sexy: "Jaqueta vinho de couro estilosa"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/34_peadir.webp",
                  },
                  {
                    text: 'Dramático: "Jaqueta preta estilo rocker"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735379/35_pulzso.webp",
                  },
                  {
                    text: 'Criativo: "Casaco estampado criativo e colorido"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/36_cympaq.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-7",
          name: "QUESTÃO 6",
          components: [
            {
              id: "comp-7-1",
              type: "heading",
              props: { text: "QUAL SUA CALÇA FAVORITA?" },
            },
            {
              id: "comp-7-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Calça fluida acetinada bege"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/38_iilv0l.webp",
                  },
                  {
                    text: 'Clássico: "Calça de alfaiataria cinza"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735417/39_arsswu.webp",
                  },
                  {
                    text: 'Contemporâneo: "Jeans reto e básico"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/40_beq52x.webp",
                  },
                  {
                    text: 'Elegante: "Calça reta bege de tecido"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/41_hconq4.webp",
                  },
                  {
                    text: 'Romântico: "Calça ampla rosa alfaiatada"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735420/42_q8xws1.webp",
                  },
                  {
                    text: 'Sexy: "Legging preta de couro"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/43_ljy7sh.webp",
                  },
                  {
                    text: 'Dramático: "Calça reta preta de couro"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/44_nqgvoq.webp",
                  },
                  {
                    text: 'Criativo: "Calça estampada floral leve e ampla"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735425/45_lp64m8.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-8",
          name: "QUESTÃO 7",
          components: [
            {
              id: "comp-8-1",
              type: "heading",
              props: { text: "QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?" },
            },
            {
              id: "comp-8-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Tênis nude casual e confortável"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735426/47_bi6vgf.webp",
                  },
                  {
                    text: 'Clássico: "Scarpin nude de salto baixo"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/48_ymo1ur.webp",
                  },
                  {
                    text: 'Contemporâneo: "Sandália dourada com salto bloco"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/49_apcrwa.webp",
                  },
                  {
                    text: 'Elegante: "Scarpin nude salto alto e fino"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/50_qexxxo.webp",
                  },
                  {
                    text: 'Romântico: "Sandália anabela off white"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/51_xbgntp.webp",
                  },
                  {
                    text: 'Sexy: "Sandália rosa de tiras finas"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/52_edlp0e.webp",
                  },
                  {
                    text: 'Dramático: "Scarpin preto moderno com vinil transparente"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/53_bfdp6f.webp",
                  },
                  {
                    text: 'Criativo: "Scarpin colorido estampado"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735430/54_xnilkc.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-9",
          name: "QUESTÃO 8",
          components: [
            {
              id: "comp-9-1",
              type: "heading",
              props: { text: "QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?" },
            },
            {
              id: "comp-9-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "Pequenos e discretos, às vezes nem uso"',
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/56_htzoxy.webp",
                  },
                  {
                    text: 'Clássico: "Brincos pequenos e discretos. Corrente fininha"',
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp",
                  },
                  {
                    text: 'Contemporâneo: "Acessórios que elevem meu look com um toque moderno"',
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735482/61_joafud.webp",
                  },
                  {
                    text: 'Elegante: "Acessórios sofisticados, joias ou semijoias"',
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735482/60_vzsnps.webp",
                  },
                  {
                    text: 'Romântico: "Peças delicadas e com um toque feminino"',
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735482/59_dwaqrx.webp",
                  },
                  {
                    text: 'Sexy: "Brincos longos, colares que valorizem minha beleza"',
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735487/63_lwgokn.webp",
                  },
                  {
                    text: 'Dramático: "Acessórios pesados, que causem um impacto"',
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735485/62_mno8wg.webp",
                  },
                  {
                    text: 'Criativo: "Acessórios diferentes, grandes e marcantes"',
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735480/58_njdjoh.webp",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-10",
          name: "QUESTÃO 9",
          components: [
            {
              id: "comp-10-1",
              type: "heading",
              props: {
                text: "VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...",
              },
            },
            {
              id: "comp-10-2",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: 'Natural: "São fáceis de cuidar"',
                    value: "natural",
                    scoreValue: 1,
                  },
                  {
                    text: 'Clássico: "São de excelente qualidade"',
                    value: "classico",
                    scoreValue: 1,
                  },
                  {
                    text: 'Contemporâneo: "São fáceis de cuidar e modernos"',
                    value: "contemporaneo",
                    scoreValue: 1,
                  },
                  {
                    text: 'Elegante: "São sofisticados"',
                    value: "elegante",
                    scoreValue: 1,
                  },
                  {
                    text: 'Romântico: "São delicados"',
                    value: "romantico",
                    scoreValue: 1,
                  },
                  {
                    text: 'Sexy: "São perfeitos ao meu corpo"',
                    value: "sexy",
                    scoreValue: 1,
                  },
                  {
                    text: 'Dramático: "São diferentes, e trazem um efeito para minha roupa"',
                    value: "dramatico",
                    scoreValue: 1,
                  },
                  {
                    text: 'Criativo: "São exclusivos, criam identidade no look"',
                    value: "criativo",
                    scoreValue: 1,
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-11",
          name: "QUESTÃO 10",
          components: [
            {
              id: "comp-11-1",
              type: "heading",
              props: {
                text: "QUAL O QUE MAIS CHAMA SUA ATENÇÃO NOS DETALHES DAS ROUPAS?",
              },
            },
            {
              id: "comp-11-2",
              type: "options",
              props: {
                text: "Tipo: Visual + Texto | Seleção: Múltipla (3 opções)",
                choices: [
                  {
                    text: "A) <strong>Poucos detalhes</strong>, básico e prático.",
                    value: "natural",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/36e5a642-0988-479b-908d-e8507e0068e0.png",
                  },
                  {
                    text: "B) <strong>Bem discretos e sutis,</strong> clean e clássico.",
                    value: "classico",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/24ae72b9-e8a6-4292-af76-c3f8de4f12fc.png",
                  },
                  {
                    text: "C) <strong>Básico</strong>, mas <strong>com um toque de estilo.</strong>",
                    value: "contemporaneo",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/bc764766-f9c4-4c66-945a-60e7de7c196f.png",
                  },
                  {
                    text: "D) <strong>Detalhes refinados</strong>, elegantes e que deem status.",
                    value: "elegante",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/7d4ab0ef-7b82-48f0-aa6a-a964c99bed7b.png",
                  },
                  {
                    text: "E) <strong>Detalhes delicados</strong>, como laços ou babados.",
                    value: "romantico",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/c1f924db-b6ca-47c4-8781-c5cf3c7433f8.png",
                  },
                  {
                    text: "F) <strong>Detalhes que valorizem o corpo</strong>, como couro, zíper e fendas.",
                    value: "sexy",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/f2537fb2-3014-407b-b866-0d86aa3b628d.png",
                  },
                  {
                    text: "G) <strong>Detalhes marcantes, </strong>com firmeza e peso.",
                    value: "dramatico",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/c2729a10-f8d1-4124-8fb8-63ea834a1272.png",
                  },
                  {
                    text: "H) <strong>Detalhes diferentes</strong> do convencional, produções ousadas.",
                    value: "criativo",
                    scoreValue: 1,
                    imageSrc:
                      "https://cakto-quiz-br01.b-cdn.net/uploads/37bdd83d-a0f5-4f23-8c26-3d4d7563043d.png",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-12",
          name: "PÁGINA DE TRANSIÇÃO",
          components: [
            {
              id: "comp-12-1",
              type: "heading",
              props: { text: "Enquanto calculamos o seu resultado..." },
            },
            {
              id: "comp-12-2",
              type: "text",
              props: {
                text: "Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.",
              },
            },
            {
              id: "comp-12-3",
              type: "text",
              props: {
                text: "A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.",
              },
            },
            {
              id: "comp-12-4",
              type: "text",
              props: {
                text: "Responda com sinceridade. Isso é só entre você e a sua nova versão.",
              },
            },
            { id: "comp-12-5", type: "loading", props: {} },
          ],
        },
        {
          id: "step-13",
          name: "STRATEGIC-1",
          components: [
            {
              id: "comp-13-1",
              type: "heading",
              props: {
                text: "Como você se sente em relação ao seu estilo pessoal hoje?",
              },
            },
            {
              id: "comp-13-2",
              type: "image",
              props: {
                src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp",
                alt: "Imagem ilustrativa",
              },
            },
            {
              id: "comp-13-3",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  {
                    text: "Completamente perdida, não sei o que combina comigo",
                    value: "perdida",
                  },
                  {
                    text: "Tenho algumas ideias, mas não sei como aplicá-las",
                    value: "ideias_nao_aplicadas",
                  },
                  {
                    text: "Conheço meu estilo, mas quero refiná-lo",
                    value: "refinar_estilo",
                  },
                  {
                    text: "Estou satisfeita, só buscando inspiração",
                    value: "buscando_inspiracao",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-14",
          name: "STRATEGIC-2",
          components: [
            {
              id: "comp-14-1",
              type: "heading",
              props: {
                text: "Qual é o maior desafio que você enfrenta ao se vestir?",
              },
            },
            {
              id: "comp-14-2",
              type: "image",
              props: {
                src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp",
                alt: "Imagem ilustrativa",
              },
            },
            {
              id: "comp-14-3",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  {
                    text: "Nunca sei o que combina com o quê",
                    value: "nao_combina",
                  },
                  {
                    text: "Tenho muitas roupas, mas sempre sinto que não tenho nada para vestir",
                    value: "muitas_roupas_nada_vestir",
                  },
                  {
                    text: "Não consigo criar looks diferentes com as peças que tenho",
                    value: "nao_crio_looks",
                  },
                  {
                    text: "Compro peças por impulso que depois não uso",
                    value: "compras_impulso",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-15",
          name: "STRATEGIC-3",
          components: [
            {
              id: "comp-15-1",
              type: "heading",
              props: { text: "Como você aprende melhor sobre estilo e moda?" },
            },
            {
              id: "comp-15-2",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  {
                    text: "Vendo exemplos visuais e imagens de referência",
                    value: "visual_exemplos",
                  },
                  {
                    text: "Lendo guias detalhados com explicações passo-a-passo",
                    value: "guias_detalhados",
                  },
                  {
                    text: "Com exemplos práticos que posso aplicar no meu dia a dia",
                    value: "exemplos_praticos",
                  },
                  {
                    text: "Com orientação personalizada para o meu caso específico",
                    value: "orientacao_personalizada",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-16",
          name: "STRATEGIC-4",
          components: [
            {
              id: "comp-16-1",
              type: "heading",
              props: { text: "O que você mais valoriza em um guia de estilo?" },
            },
            {
              id: "comp-16-2",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  {
                    text: "Praticidade e facilidade de aplicação",
                    value: "praticidade",
                  },
                  {
                    text: "Exemplos de looks montados para diferentes ocasiões",
                    value: "looks_montados",
                  },
                  {
                    text: "Explicações detalhadas sobre o porquê das recomendações",
                    value: "explicacoes_detalhadas",
                  },
                  {
                    text: "Dicas para economizar e aproveitar melhor o que já tenho",
                    value: "economizar_aproveitar",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "step-17",
          name: "STRATEGIC-5",
          components: [
            {
              id: "comp-17-1",
              type: "heading",
              props: {
                text: "Você já considerou investir em algum guia ou consultoria de estilo no passado?",
              },
            },
            {
              id: "comp-17-2",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  {
                    text: "Sim, já pesquisei mas não cheguei a comprar",
                    value: "pesquisei_nao_comprei",
                  },
                  {
                    text: "Sim, já investi em algum curso/guia/consultoria",
                    value: "ja_investi",
                  },
                  {
                    text: "Não, esta é a primeira vez que considero isso",
                    value: "primeira_vez",
                  },
                  { text: "Prefiro não responder", value: "nao_responder" },
                ],
              },
            },
          ],
        },
        {
          id: "step-18",
          name: "STRATEGIC-6",
          components: [
            {
              id: "comp-18-1",
              type: "heading",
              props: {
                text: "Quanto você estaria disposta a investir em um guia completo de estilo personalizado?",
              },
            },
            {
              id: "comp-18-2",
              type: "image",
              props: {
                src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp",
                alt: "Imagem de valores monetários",
              },
            },
            {
              id: "comp-18-3",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  { text: "Menos de R$100", value: "menos_100" },
                  { text: "Entre R$100 e R$300", value: "100_300" },
                  { text: "Entre R$300 e R$500", value: "300_500" },
                  { text: "Mais de R$500", value: "mais_500" },
                ],
              },
            },
          ],
        },
        {
          id: "step-19",
          name: "STRATEGIC-7",
          components: [
            {
              id: "comp-19-1",
              type: "heading",
              props: {
                text: "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
              },
            },
            {
              id: "comp-19-2",
              type: "image",
              props: {
                src: "https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745459978/20250423_1704_Transforma%C3%A7%C3%A3o_no_Closet_Moderno_simple_compose_01jsj3xvy6fpfb6pyd5shg5eak_1_appany.webp",
                alt: "Imagem Antes e Depois",
              },
            },
            {
              id: "comp-19-3",
              type: "options",
              props: {
                text: "Tipo: Apenas texto | Seleção: Única (1 opção)",
                choices: [
                  {
                    text: "Montar looks com mais facilidade e confiança",
                    value: "facilidade_confianca",
                  },
                  {
                    text: "Usar o que já tenho e me sentir estilosa",
                    value: "usar_estilosa",
                  },
                  {
                    text: "Comprar com mais consciência e sem culpa",
                    value: "comprar_consciencia",
                  },
                  {
                    text: "Ser admirada pela imagem que transmito",
                    value: "ser_admirada",
                  },
                  {
                    text: "Resgatar peças esquecidas e criar novos looks com estilo",
                    value: "resgatar_pecas",
                  },
                ],
              },
            },
          ],
        },
      ],
      currentStepId: "step-1",
      headerConfig: {
        title: "Meu Quiz Interativo",
        subtitle: "Descubra seu perfil e muito mais!",
        showLogo: true,
        showProgress: true,
        allowReturn: true,
        logoSrc:
          "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2",
      },
    }; // <- Retorno da função useState
  });

  // Carregar estado do localStorage ao iniciar
  useEffect(() => {
    const loadedState = loadFromLocalStorage();
    if (loadedState) {
      console.log("🔄 Carregando estado do localStorage");
      setEditorState(loadedState);
    }
  }, []);

  // Salvar no localStorage sempre que o estado mudar
  useEffect(() => {
    saveToLocalStorage(editorState);
  }, [editorState]);

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
    targetId: string,
    newProps:
      | Partial<QuizComponentProps>
      | Partial<QuizEditorState["headerConfig"]>
  ) => {
    console.log("🔧 handleComponentUpdate called:", { targetId, newProps });

    if (targetId === "headerConfig") {
      setEditorState((prev) => ({
        ...prev,
        headerConfig: {
          ...prev.headerConfig,
          ...(newProps as Partial<QuizEditorState["headerConfig"]>),
        },
      }));
      console.log("✅ Header config updated");
    } else {
      setEditorState((prev) => {
        const newState = {
          ...prev,
          steps: prev.steps.map((step) =>
            step.id === editorState.currentStepId
              ? {
                  ...step,
                  components: step.components.map((comp) =>
                    comp.id === targetId
                      ? {
                          ...comp,
                          props: {
                            ...comp.props,
                            ...(newProps as Partial<QuizComponentProps>),
                          },
                        }
                      : comp
                  ),
                }
              : step
          ),
        };
        console.log("✅ Component updated:", newState);
        return newState;
      });
    }
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
      saveToLocalStorage(editorState); // Salvar no localStorage após um segundo
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

  // --- Funções de Persistência ---
  const STORAGE_KEY = "quiz-editor-state";

  const saveToLocalStorage = (state: QuizEditorState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log("✅ Estado salvo no localStorage");
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
    }
  };

  const loadFromLocalStorage = (): QuizEditorState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch (error) {
      console.error("❌ Erro ao carregar:", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      {/* Navbar */}
      <FunnelNavbar
        onSave={handleSave}
        onPublish={handlePublish}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Painel de Etapas */}
        <div className="hidden md:block w-[13rem] border-r border-zinc-700 bg-zinc-950/50 backdrop-blur-lg p-4">
          <StepNavigationTabs
            steps={editorState.steps}
            currentStepId={editorState.currentStepId}
            onStepSelect={handleStepSelect}
            onStepRename={handleStepRename}
            onStepDelete={handleStepDelete}
            onAddStep={handleAddStep}
          />
        </div>

        {/* Área de Trabalho */}
        <div className="flex-1 flex flex-col">
          {/* Header da Etapa */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-800">
            <h2 className="text-xl font-bold text-zinc-100">
              {currentStep?.name}
            </h2>
            <button
              onClick={() => onComponentAdd("spacer")}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Espaçador
            </button>
          </div>

          {/* Área do Canvas */}
          <div className="flex-1 p-3 md:p-5 overflow-y-auto">
            <CanvasArea
              currentStep={currentStep}
              headerConfig={editorState.headerConfig}
              selectedComponentId={selectedComponentId}
              onComponentSelect={handleComponentSelect}
              onComponentAdd={handleComponentAdd}
              onComponentDelete={handleComponentDelete}
              onComponentMove={handleComponentMove}
            />
          </div>
        </div>

        {/* Painel de Componentes (Mobile) */}
        <div className="md:hidden w-full border-t border-zinc-700 bg-zinc-950/50 backdrop-blur-lg p-4">
          <ComponentAddSidebar onComponentAdd={handleComponentAdd} />
        </div>
      </div>
    </div>
  );
};

export default AdvancedQuizEditor;
