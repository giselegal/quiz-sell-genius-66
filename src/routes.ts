// Configuração centralizada de rotas da aplicação

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
    INTEGRATIONS: {
      HOTMART: '/admin/integrations/hotmart'
    },
    CAPACITY: '/admin/capacity',
    COMPETITIVE_ADVANTAGE: '/admin/competitive-advantage'
  }
} as const;

// Validador de rotas para garantir consistência
export function isValidRoute(path: string): boolean {
  const allRoutes = [
    ROUTES.HOME,
    ROUTES.QUIZ,
    ROUTES.RESULTADO,
    ROUTES.ADMIN.ROOT,
    ROUTES.ADMIN.LEADS,
    ROUTES.ADMIN.AB_TESTING,
    ROUTES.ADMIN.UTM,
    ROUTES.ADMIN.INTEGRATIONS.HOTMART,
    ROUTES.ADMIN.CAPACITY,
    ROUTES.ADMIN.COMPETITIVE_ADVANTAGE
  ];
  
  return allRoutes.includes(path) || path.startsWith('/admin/');
}

// Breadcrumbs para navegação
export function getBreadcrumbs(currentPath: string) {
  const breadcrumbs = [
    { label: 'Home', path: ROUTES.ADMIN.ROOT }
  ];

  if (currentPath.startsWith('/admin/')) {
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    switch (pathSegments[1]) {
      case 'leads':
        breadcrumbs.push({ label: 'Leads', path: ROUTES.ADMIN.LEADS });
        break;
      case 'ab-testing':
        breadcrumbs.push({ label: 'Testes A/B', path: ROUTES.ADMIN.AB_TESTING });
        break;
      case 'utm':
        breadcrumbs.push({ label: 'UTM', path: ROUTES.ADMIN.UTM });
        break;
      case 'integrations':
        breadcrumbs.push({ label: 'Integrações', path: '/admin/integrations' });
        if (pathSegments[2] === 'hotmart') {
          breadcrumbs.push({ label: 'Hotmart', path: ROUTES.ADMIN.INTEGRATIONS.HOTMART });
        }
        break;
      case 'capacity':
        breadcrumbs.push({ label: 'Capacidade', path: ROUTES.ADMIN.CAPACITY });
        break;
      case 'competitive-advantage':
        breadcrumbs.push({ label: 'Diferenciais', path: ROUTES.ADMIN.COMPETITIVE_ADVANTAGE });
        break;
    }
  }

  return breadcrumbs;
}
