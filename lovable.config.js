
// Configuração atualizada do Lovable
export default {
  projectId: "quiz-sell-genius-66",
  projectName: "Quiz Sell Genius",
  
  // Configurações do editor
  editor: {
    enableLiveMode: true,
    autoSave: true,
    componentHighlighting: true,
    enhancedPreview: true
  },
  
  // Componentes marcados para edição
  components: {
    QuizCover: './src/components/quiz/QuizCover.tsx',
    QuizQuestion: './src/components/quiz/QuizQuestion.tsx', 
    QuizLogic: './src/components/quiz/QuizLogic.tsx',
    ResultPageEditor: './src/components/quiz/ResultPageEditor.tsx',
    EnchantedEffects: './src/components/effects/EnchantedEffects.tsx',
    ComponentRenderers: './src/components/result-editor/ComponentRenderers.tsx'
  },
  
  // Configurações de sincronização
  sync: {
    github: {
      enabled: true,
      autoSync: true,
      branch: "main"
    }
  },
  
  // Configurações de build
  build: {
    target: "es2015",
    outDir: "dist"
  },
  
  // Features experimentais
  experimental: {
    enhancedComponentSystem: true,
    advancedTemplating: true,
    realTimeCollaboration: false
  }
};
