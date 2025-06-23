
/**
 * Configuração de sincronização do Lovable
 * Atualizada para o novo repositório
 */

module.exports = {
  projectId: 'quiz-sell-genius-66',
  repository: 'ggsl87/quiz-sell-genius-66',
  syncMethod: 'webhook-alternative',
  
  // Configurações de componentes
  components: {
    scanPaths: ['src/components', 'src/pages'],
    extensions: ['.tsx', '.jsx'],
    exclude: ['node_modules', '.git', 'dist', 'build']
  },
  
  // Configurações de build
  build: {
    enabled: true,
    outputDir: 'dist',
    command: 'npm run build'
  },
  
  // Webhooks alternativos
  webhooks: {
    enabled: true,
    endpoints: [
      'https://api.lovable.dev/webhook/sync',
      'https://lovable.dev/api/projects/sync'
    ]
  },
  
  // Logs e debug
  logging: {
    enabled: true,
    level: 'info'
  }
};
