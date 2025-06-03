
export const ROUTES = {
  // Rotas públicas
  HOME: '/',
  QUIZ: '/',
  RESULTADO: '/resultado',
  QUIZ_OFERTA: '/quiz-descubra-seu-estilo',
  
  // Rotas administrativas
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',
    LEADS: '/admin/leads',
    AB_TESTING: '/admin/ab-testing',
    UTM: '/admin/utm',
    EDITOR: '/admin/editor',
    EDITOR_ID: (id: string) => `/admin/editor/${id}`,
    CREATIVE_ANALYTICS: '/admin/creative-analytics',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
    AB_TEST: '/admin/ab-test',
    OFFER_EDITOR: '/admin/offer-editor',
    PROTOTYPE: '/admin/prototype',
    INTEGRATIONS: {
      HOTMART: '/admin/integrations/hotmart'
    },
    CAPACITY: '/admin/capacity',
    COMPETITIVE_ADVANTAGE: '/admin/competitive-advantage'
  }
}

export function isValidRoute(path: string): boolean {
  const allRoutes = [
    ROUTES.HOME,
    ROUTES.QUIZ,
    ROUTES.RESULTADO,
    ROUTES.QUIZ_OFERTA,
    ROUTES.ADMIN.ROOT,
    ROUTES.ADMIN.DASHBOARD,
    ROUTES.ADMIN.LEADS,
    ROUTES.ADMIN.AB_TESTING,
    ROUTES.ADMIN.UTM,
    ROUTES.ADMIN.EDITOR,
    ROUTES.ADMIN.CREATIVE_ANALYTICS,
    ROUTES.ADMIN.ANALYTICS,
    ROUTES.ADMIN.SETTINGS,
    ROUTES.ADMIN.AB_TEST,
    ROUTES.ADMIN.OFFER_EDITOR,
    ROUTES.ADMIN.PROTOTYPE,
    ROUTES.ADMIN.INTEGRATIONS.HOTMART,
    ROUTES.ADMIN.CAPACITY,
    ROUTES.ADMIN.COMPETITIVE_ADVANTAGE
  ];
  
  // Verificar rotas exatas
  if (allRoutes.includes(path)) {
    return true;
  }
  
  // Verificar rotas com parâmetros
  if (path.startsWith('/admin/editor/') && path.length > '/admin/editor/'.length) {
    return true;
  }
  
  // Verificar rotas admin com wildcards
  if (path.startsWith('/admin/') && path.length > '/admin/'.length) {
    return true;
  }
  
  return false;
}
