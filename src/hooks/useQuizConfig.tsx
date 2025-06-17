import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import {
  QuizConfig,
  QuizConfigState,
  DEFAULT_QUIZ_CONFIG,
} from "@/types/quiz-config";

// Utilitários
const deepMerge = (target: any, source: any): any => {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

const validateConfig = (config: Partial<QuizConfig>): boolean => {
  if (
    config.theme?.backgroundColor &&
    !config.theme.backgroundColor.match(/^#[0-9A-Fa-f]{6}$/)
  ) {
    return false;
  }
  return true;
};

// Storage
const STORAGE_KEY = "quiz-config-v1";
const HISTORY_KEY = "quiz-config-history-v1";

const saveToStorage = (config: QuizConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    const history = getHistoryFromStorage();
    const newHistory = [config, ...history.slice(0, 9)];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Erro ao salvar configuração:", error);
  }
};

const loadFromStorage = (): QuizConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const config = JSON.parse(stored);
      return deepMerge(DEFAULT_QUIZ_CONFIG, config);
    }
  } catch (error) {
    console.error("Erro ao carregar configuração:", error);
  }
  return DEFAULT_QUIZ_CONFIG;
};

const getHistoryFromStorage = (): QuizConfig[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    return [];
  }
};

// Context
interface QuizConfigContextType {
  state: QuizConfigState;
  updateConfig: (updates: Partial<QuizConfig>) => Promise<void>;
  resetConfig: () => void;
  loadConfig: (config: QuizConfig) => void;
  saveConfig: () => Promise<void>;
  revertToVersion: (version: QuizConfig) => void;
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
}

const QuizConfigContext = createContext<QuizConfigContextType | null>(null);

// Provider
export const QuizConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<QuizConfigState>({
    current: loadFromStorage(),
    history: getHistoryFromStorage(),
    isDirty: false,
    isLoading: false,
    error: null,
  });

  const saveConfig = useCallback(async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      saveToStorage(state.current);
      setState((prev) => ({
        ...prev,
        isDirty: false,
        isLoading: false,
        history: [state.current, ...prev.history.slice(0, 9)],
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Erro ao salvar",
        isLoading: false,
      }));
    }
  }, [state.current]);

  useEffect(() => {
    if (state.isDirty) {
      const timeoutId = setTimeout(() => {
        saveConfig();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [state.current, state.isDirty, saveConfig]);

  const updateConfig = useCallback(
    async (updates: Partial<QuizConfig>): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        if (!validateConfig(updates)) {
          throw new Error("Configuração inválida");
        }

        const newConfig: QuizConfig = {
          ...deepMerge(state.current, updates),
          lastModified: new Date().toISOString(),
          version: `${parseInt(state.current.version.split(".")[0])}.${
            parseInt(state.current.version.split(".")[1]) + 1
          }.0`,
        };

        setState((prev) => ({
          ...prev,
          current: newConfig,
          isDirty: true,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Erro desconhecido",
          isLoading: false,
        }));
      }
    },
    [state.current]
  );

  const resetConfig = useCallback(() => {
    setState((prev) => ({
      ...prev,
      current: { ...DEFAULT_QUIZ_CONFIG },
      isDirty: true,
    }));
  }, []);

  const loadConfig = useCallback((config: QuizConfig) => {
    setState((prev) => ({
      ...prev,
      current: deepMerge(DEFAULT_QUIZ_CONFIG, config),
      isDirty: true,
    }));
  }, []);

  const revertToVersion = useCallback((version: QuizConfig) => {
    setState((prev) => ({
      ...prev,
      current: { ...version },
      isDirty: true,
    }));
  }, []);

  const exportConfig = useCallback((): string => {
    return JSON.stringify(state.current, null, 2);
  }, [state.current]);

  const importConfig = useCallback(
    (configJson: string): boolean => {
      try {
        const config = JSON.parse(configJson);
        if (validateConfig(config)) {
          loadConfig(config);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao importar configuração:", error);
        return false;
      }
    },
    [loadConfig]
  );

  const contextValue: QuizConfigContextType = {
    state,
    updateConfig,
    resetConfig,
    loadConfig,
    saveConfig,
    revertToVersion,
    exportConfig,
    importConfig,
  };

  return (
    <QuizConfigContext.Provider value={contextValue}>
      {children}
    </QuizConfigContext.Provider>
  );
};

// Hook principal
export const useQuizConfig = (): QuizConfigContextType => {
  const context = useContext(QuizConfigContext);
  if (!context) {
    throw new Error(
      "useQuizConfig deve ser usado dentro de QuizConfigProvider"
    );
  }
  return context;
};

// Hooks específicos
export const useQuizTheme = () => {
  const { state, updateConfig } = useQuizConfig();

  const updateTheme = useCallback(
    (themeUpdates: Partial<QuizConfig["theme"]>) => {
      return updateConfig({ theme: themeUpdates });
    },
    [updateConfig]
  );

  return {
    theme: state.current.theme,
    updateTheme,
    isLoading: state.isLoading,
  };
};

export const useQuizBehavior = () => {
  const { state, updateConfig } = useQuizConfig();

  const updateBehavior = useCallback(
    (behaviorUpdates: Partial<QuizConfig["behavior"]>) => {
      return updateConfig({ behavior: behaviorUpdates });
    },
    [updateConfig]
  );

  return {
    behavior: state.current.behavior,
    updateBehavior,
    isLoading: state.isLoading,
  };
};

export const useQuizLayout = () => {
  const { state, updateConfig } = useQuizConfig();

  const updateLayout = useCallback(
    (layoutUpdates: Partial<QuizConfig["layout"]>) => {
      return updateConfig({ layout: layoutUpdates });
    },
    [updateConfig]
  );

  return {
    layout: state.current.layout,
    updateLayout,
    isLoading: state.isLoading,
  };
};

// Hook para CSS dinâmico
export const useQuizStyles = () => {
  const { theme, layout } = useQuizConfig().state.current;

  const cssVariables = {
    "--quiz-bg-color": theme.backgroundColor,
    "--quiz-primary-color": theme.primaryColor,
    "--quiz-secondary-color": theme.secondaryColor,
    "--quiz-accent-color": theme.accentColor,
    "--quiz-text-color": theme.textColor,
    "--quiz-text-secondary-color": theme.textSecondaryColor,
    "--quiz-font-family": theme.fontFamily,
    "--quiz-font-size-title": theme.fontSize.title,
    "--quiz-font-size-subtitle": theme.fontSize.subtitle,
    "--quiz-font-size-body": theme.fontSize.body,
    "--quiz-font-size-small": theme.fontSize.small,
    "--quiz-border-radius": layout.borderRadius,
  };

  return { cssVariables, theme, layout };
};
