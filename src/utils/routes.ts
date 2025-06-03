
export const ROUTES = {
  // Rotas públicas principais
  HOME: '/',
  RESULTADO: '/resultado',
  QUIZ_OFERTA: '/quiz-descubra-seu-estilo',
  
  // Rotas administrativas principais
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',
    EDITOR: '/admin/editor'
  }
}

export function isValidRoute(path: string): boolean {
  const allRoutes = [
    ROUTES.HOME,
    ROUTES.RESULTADO,
    ROUTES.QUIZ_OFERTA,
    ROUTES.ADMIN.ROOT,
    ROUTES.ADMIN.DASHBOARD,
    ROUTES.ADMIN.EDITOR
  ];
  
  // Verificar rotas exatas
  if (allRoutes.includes(path)) {
    return true;
  }
  
  // Verificar rotas admin com parâmetros
  if (path.startsWith('/admin/editor') && path.length > '/admin/editor'.length) {
    return true;
  }
  
  return false;
}
