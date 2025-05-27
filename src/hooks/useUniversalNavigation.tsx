import { useEffect, useState } from 'react';

// Detecta se estamos no ambiente Next.js ou React Router
const isNextJsEnvironment = () => {
  return typeof window !== 'undefined' && 
         window.location?.pathname?.includes('_next') || 
         typeof (globalThis as any).__NEXT_DATA__ !== 'undefined';
};

const isReactRouterEnvironment = () => {
  return typeof window !== 'undefined' && 
         document?.querySelector('[data-reactroot]') !== null;
};

export const useUniversalNavigation = () => {
  const [navigationMethod, setNavigationMethod] = useState<'nextjs' | 'react-router' | 'fallback'>('fallback');

  useEffect(() => {
    if (isNextJsEnvironment()) {
      setNavigationMethod('nextjs');
    } else if (isReactRouterEnvironment()) {
      setNavigationMethod('react-router');
    } else {
      setNavigationMethod('fallback');
    }
  }, []);

  const universalNavigate = (path: string) => {
    switch (navigationMethod) {
      case 'nextjs':
        // Para Next.js, importamos dinamicamente
        import('next/router').then(({ default: Router }) => {
          Router.push(path);
        }).catch(() => {
          window.location.href = path;
        });
        break;
      
      case 'react-router':
        // Para React Router, tentamos usar history API
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', path);
          // Dispara evento para React Router detectar a mudança
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
          window.location.href = path;
        }
        break;
      
      default:
        // Fallback para window.location
        window.location.href = path;
        break;
    }
  };

  return { 
    navigate: universalNavigate, 
    isNextJs: navigationMethod === 'nextjs',
    isReactRouter: navigationMethod === 'react-router'
  };
};
