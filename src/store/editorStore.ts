import React from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// --- Interfaces ---
interface OptionChoice {
  text: string;
  value: string;
  nextStepId?: string;
  scoreValue?: number;
  imageSrc?: string;
}

interface QuizComponentProps {
  text?: string;
  src?: string;
  alt?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  choices?: OptionChoice[];
  question?: string;
  answer?: string;
  author?: string;
  currency?: string;
  amount?: number;
  description?: string;
  item1?: string;
  item2?: string;
  item3?: string;
  value?: number;
  required?: boolean;

  // Propriedades de estilo
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontSize?: number;
  padding?: number;
  margin?: number;
  shadow?: number;
  alignment?: string;

  // Propriedades para opções
  gridLayout?: string;
  optionsLayout?: string;
  imageRatio?: string;
  imagePosition?: string;
  textPosition?: string;
  textAlignment?: string;
  imageHeight?: number;
  imageBorderRadius?: number;
  optionSpacing?: number;
  optionPadding?: number;
  optionsGap?: number;
  buttonSize?: string;
  textStyle?: string;
  desktopColumns?: string;
  tabletColumns?: string;
  mobileColumns?: string;

  // Propriedades de comportamento
  multipleChoice?: boolean;
  autoAdvance?: boolean;
  direction?: string;
  layout?: string;

  // Propriedades avançadas
  customCSS?: string;
  customId?: string;
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
  type: "intro" | "question" | "result" | "offer" | "transition";
  components: QuizComponent[];
  nextStepId?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  customCSS?: string;
}

interface HeaderConfig {
  showLogo?: boolean;
  logoSrc?: string;
  showProgress?: boolean;
  allowReturn?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

interface QuizEditorState {
  steps: QuizStep[];
  selectedStepId: string | null;
  selectedComponentId: string | null;
  headerConfig: HeaderConfig;
  globalCSS: string;
  isPreviewMode: boolean;
  saveStatus: "idle" | "saving" | "saved";
}

// --- Store Actions ---
interface EditorActions {
  // Step actions
  setSteps: (steps: QuizStep[]) => void;
  addStep: (step: QuizStep) => void;
  updateStep: (stepId: string, updates: Partial<QuizStep>) => void;
  removeStep: (stepId: string) => void;
  setSelectedStepId: (stepId: string | null) => void;

  // Component actions
  addComponent: (stepId: string, component: QuizComponent) => void;
  updateComponent: (
    componentId: string,
    updates: Partial<QuizComponentProps>
  ) => void;
  removeComponent: (componentId: string) => void;
  setSelectedComponentId: (componentId: string | null) => void;

  // Header actions
  updateHeaderConfig: (updates: Partial<HeaderConfig>) => void;

  // Global actions
  setGlobalCSS: (css: string) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setSaveStatus: (status: "idle" | "saving" | "saved") => void;

  // Persistence actions
  saveState: () => void;
  loadState: () => void;
  resetState: () => void;
}

// --- Store Implementation ---
type EditorStore = QuizEditorState & EditorActions;

const initialState: QuizEditorState = {
  steps: [
    {
      id: "intro",
      name: "Introdução",
      type: "intro",
      components: [
        {
          id: "heading-1",
          type: "heading",
          props: {
            text: "Bem-vindo ao Quiz!",
            fontSize: 24,
            textColor: "#ffffff",
            alignment: "center",
          },
        },
        {
          id: "button-1",
          type: "button",
          props: {
            buttonText: "Começar Quiz",
            backgroundColor: "#3b82f6",
            textColor: "#ffffff",
            borderRadius: 8,
            padding: 16,
          },
        },
      ],
      backgroundColor: "#1f2937",
    },
  ],
  selectedStepId: "intro",
  selectedComponentId: null,
  headerConfig: {
    showLogo: true,
    logoSrc: "",
    showProgress: true,
    allowReturn: true,
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
  },
  globalCSS: "",
  isPreviewMode: false,
  saveStatus: "idle",
};

export type {
  OptionChoice,
  QuizComponentProps,
  QuizComponent,
  QuizStep,
  HeaderConfig,
  QuizEditorState,
};

export const useEditorStore = create<EditorStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Step actions
        setSteps: (steps) => set({ steps }),

        addStep: (step) =>
          set((state) => ({
            steps: [...state.steps, step],
          })),

        updateStep: (stepId, updates) =>
          set((state) => ({
            steps: state.steps.map((step) =>
              step.id === stepId ? { ...step, ...updates } : step
            ),
          })),

        removeStep: (stepId) =>
          set((state) => ({
            steps: state.steps.filter((step) => step.id !== stepId),
            selectedStepId:
              state.selectedStepId === stepId ? null : state.selectedStepId,
          })),

        setSelectedStepId: (stepId) => set({ selectedStepId: stepId }),

        // Component actions
        addComponent: (stepId, component) =>
          set((state) => ({
            steps: state.steps.map((step) =>
              step.id === stepId
                ? { ...step, components: [...step.components, component] }
                : step
            ),
          })),

        updateComponent: (componentId, updates) =>
          set((state) => ({
            steps: state.steps.map((step) => ({
              ...step,
              components: step.components.map((component) =>
                component.id === componentId
                  ? { ...component, props: { ...component.props, ...updates } }
                  : component
              ),
            })),
          })),

        removeComponent: (componentId) =>
          set((state) => ({
            steps: state.steps.map((step) => ({
              ...step,
              components: step.components.filter(
                (component) => component.id !== componentId
              ),
            })),
            selectedComponentId:
              state.selectedComponentId === componentId
                ? null
                : state.selectedComponentId,
          })),

        setSelectedComponentId: (componentId) =>
          set({ selectedComponentId: componentId }),

        // Header actions
        updateHeaderConfig: (updates) =>
          set((state) => ({
            headerConfig: { ...state.headerConfig, ...updates },
          })),

        // Global actions
        setGlobalCSS: (css) => set({ globalCSS: css }),
        setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),
        setSaveStatus: (status) => set({ saveStatus: status }),

        // Persistence actions
        saveState: () => {
          const state = get();
          try {
            localStorage.setItem(
              "quiz-editor-state",
              JSON.stringify({
                steps: state.steps,
                headerConfig: state.headerConfig,
                globalCSS: state.globalCSS,
              })
            );
            set({ saveStatus: "saved" });

            // Reset save status after 2 seconds
            setTimeout(() => {
              set({ saveStatus: "idle" });
            }, 2000);
          } catch (error) {
            console.error("Erro ao salvar estado:", error);
          }
        },

        loadState: () => {
          try {
            const saved = localStorage.getItem("quiz-editor-state");
            if (saved) {
              const parsedState = JSON.parse(saved);
              set({
                steps: parsedState.steps || initialState.steps,
                headerConfig:
                  parsedState.headerConfig || initialState.headerConfig,
                globalCSS: parsedState.globalCSS || initialState.globalCSS,
              });
              console.log("✅ Estado carregado do localStorage");
            }
          } catch (error) {
            console.error("Erro ao carregar estado:", error);
          }
        },

        resetState: () => {
          localStorage.removeItem("quiz-editor-state");
          set({ ...initialState });
        },
      }),
      {
        name: "quiz-editor-storage",
        partialize: (state) => ({
          steps: state.steps,
          headerConfig: state.headerConfig,
          globalCSS: state.globalCSS,
        }),
      }
    ),
    {
      name: "quiz-editor-store",
    }
  )
);

// --- Hooks Customizados ---

// Hook para gerenciar o estado do editor
export const useEditorState = () => {
  const store = useEditorStore();
  return {
    steps: store.steps,
    selectedStepId: store.selectedStepId,
    selectedComponentId: store.selectedComponentId,
    headerConfig: store.headerConfig,
    globalCSS: store.globalCSS,
    isPreviewMode: store.isPreviewMode,
    saveStatus: store.saveStatus,
  };
};

// Hook para ações do editor
export const useEditorActions = () => {
  const store = useEditorStore();
  return {
    setSteps: store.setSteps,
    addStep: store.addStep,
    updateStep: store.updateStep,
    removeStep: store.removeStep,
    setSelectedStepId: store.setSelectedStepId,
    addComponent: store.addComponent,
    updateComponent: store.updateComponent,
    removeComponent: store.removeComponent,
    setSelectedComponentId: store.setSelectedComponentId,
    updateHeaderConfig: store.updateHeaderConfig,
    setGlobalCSS: store.setGlobalCSS,
    setPreviewMode: store.setPreviewMode,
    setSaveStatus: store.setSaveStatus,
    saveState: store.saveState,
    loadState: store.loadState,
    resetState: store.resetState,
  };
};

// Hook para auto-save
export const useAutoSave = (interval = 5000) => {
  const { saveState } = useEditorActions();

  React.useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveState();
    }, interval);

    return () => clearInterval(autoSaveInterval);
  }, [saveState, interval]);
};

// Hook para obter step atual
export const useCurrentStep = () => {
  const { steps, selectedStepId } = useEditorState();
  return steps.find((step) => step.id === selectedStepId) || steps[0];
};

// Hook para obter componente atual
export const useCurrentComponent = () => {
  const { steps, selectedComponentId } = useEditorState();

  for (const step of steps) {
    const component = step.components.find(
      (comp) => comp.id === selectedComponentId
    );
    if (component) return component;
  }

  return null;
};

export default useEditorStore;
