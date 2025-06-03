
// Configuração atualizada do Lovable para versão 2.1.0
export default {
  projectId: "quiz-sell-genius-66",
  projectName: "Quiz Sell Genius",
  version: "2.1.0",
  
  // Configurações do editor aprimoradas
  editor: {
    enableLiveMode: true,
    autoSave: true,
    componentHighlighting: true,
    enhancedPreview: true,
    inlineEditing: true,
    realTimeSync: true
  },
  
  // Componentes marcados para edição
  components: {
    QuizCover: './src/components/quiz/QuizCover.tsx',
    QuizQuestion: './src/components/quiz/QuizQuestion.tsx', 
    QuizLogic: './src/components/quiz/QuizLogic.tsx',
    ResultPageEditor: './src/components/quiz/ResultPageEditor.tsx',
    EnchantedEffects: './src/components/effects/EnchantedEffects.tsx',
    ComponentRenderers: './src/components/result-editor/ComponentRenderers.tsx',
    UnifiedEditor: './src/lovables/UnifiedEditor.tsx'
  },
  
  // Configurações de sincronização aprimoradas
  sync: {
    github: {
      enabled: true,
      autoSync: true,
      branch: "main",
      realTime: true
    }
  },
  
  // Configurações de build
  build: {
    target: "es2020",
    outDir: "dist",
    minify: true,
    sourcemap: false
  },
  
  // Features experimentais habilitadas
  experimental: {
    enhancedComponentSystem: true,
    advancedTemplating: true,
    realTimeCollaboration: true,
    aiAssistance: true,
    smartSuggestions: true
  },

  // Configurações de performance
  performance: {
    lazyLoading: true,
    codesplitting: true,
    preloadCritical: true
  }
};
