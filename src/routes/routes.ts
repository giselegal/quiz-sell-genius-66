
// Definição centralizada das rotas da aplicação
export const ROUTES = {
  // Rotas públicas
  PUBLIC: {
    HOME: '/',
    QUIZ: '/quiz',
    QUIZ_OFFER: '/quiz-descubra-seu-estilo',
    RESULT: '/resultado',
    RESULT_WITH_STYLE: '/resultado/:style',
    QUIZ_RESULTS: '/quiz-results', // temporária
  },
  
  // Rotas administrativas
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',
    EDITOR: '/admin/editor',
    LIVE_EDITOR: '/admin/live-editor',
    ANALYTICS: '/admin/analytics',
    CREATIVE_ANALYTICS: '/admin/creative-analytics',
    AB_TESTS: '/admin/ab-tests',
    QUICK_METRICS: '/admin/quick-metrics',
    HEADER_EDITOR: '/admin/header-editor',
    EDITOR_STYLE: '/admin/editor/:style',
  }
} as const;

// Helper para validar rotas
export const isValidRoute = (path: string): boolean => {
  const allRoutes = Object.values(ROUTES.PUBLIC).concat(Object.values(ROUTES.ADMIN));
  return allRoutes.includes(path as any) || 
         path.startsWith('/admin/editor/') || 
         path.startsWith('/resultado/');
};

// Helper para navegação
export const getRouteTitle = (path: string): string => {
  const routeTitles: Record<string, string> = {
    '/': 'Quiz de Estilo',
    '/quiz': 'Quiz em Andamento',
    '/quiz-descubra-seu-estilo': 'Descubra Seu Estilo',
    '/resultado': 'Resultado do Quiz',
    '/admin': 'Painel Administrativo',
    '/admin/editor': 'Editor Unificado',
    '/admin/live-editor': 'Editor Ao Vivo',
    '/admin/analytics': 'Analytics',
    '/admin/creative-analytics': 'Analytics de Criativos',
  };
  
  return routeTitles[path] || 'Quiz de Estilo';
};
