export const ROUTES = {
  // Rotas públicas
  HOME: '/',
  QUIZ: '/quiz',
  RESULTADO: '/resultado',
  
  // Rotas administrativas
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',
    LEADS: '/admin/leads',
    AB_TESTING: '/admin/ab-testing',
    UTM: '/admin/utm',
    EDITOR: '/admin/editor',
    EDITOR_ID: (id: string) => `/admin/editor/${id}`,
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
    ROUTES.ADMIN.ROOT,
    ROUTES.ADMIN.DASHBOARD,
    ROUTES.ADMIN.LEADS,
    ROUTES.ADMIN.AB_TESTING,
    ROUTES.ADMIN.UTM,
    ROUTES.ADMIN.EDITOR,
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
  
  return false;
}