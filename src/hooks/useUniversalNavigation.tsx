import { useNavigate } from 'react-router-dom';

export const useUniversalNavigation = () => {
  const navigate = useNavigate();

  const universalNavigate = (path: string) => {
    navigate(path);
  };

  return {
    navigate: universalNavigate,
    push: universalNavigate, // Alias para compatibilidade
    replace: (path: string) => navigate(path, { replace: true })
  };
};
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
