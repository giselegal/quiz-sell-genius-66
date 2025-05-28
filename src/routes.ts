
export interface Route {
  path: string;
  name: string;
  component: string;
}

export const routes: Route[] = [
  {
    path: '/',
    name: 'Home',
    component: 'HomePage'
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: 'QuizPage'
  },
  {
    path: '/resultado',
    name: 'Resultado',
    component: 'ResultPage'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: 'AdminPage'
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    component: 'AnalyticsPage'
  },
  {
    path: '/admin/editor',
    name: 'Editor',
    component: 'EditorPage'
  },
  {
    path: '/admin/settings',
    name: 'Settings',
    component: 'SettingsPage'
  },
  {
    path: '/admin/quiz-editor',
    name: 'Quiz Editor',
    component: 'QuizEditorPage'
  }
];

export const getRouteByPath = (path: string): Route | undefined => {
  return routes.find(route => route.path === path);
};
