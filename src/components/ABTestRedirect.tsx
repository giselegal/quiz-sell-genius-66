import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LANDING_PAGE_AB_TEST, getABTestRedirectUrl } from '../utils/abtest';
import { LoadingSpinner } from './ui/loading-spinner';

interface ABTestRedirectProps {
  children?: React.ReactNode;
}

/**
 * Componente que gerencia o redirecionamento baseado no teste A/B
 * Redireciona automaticamente entre /resultado e /quiz-descubra-seu-estilo
 */
const ABTestRedirect: React.FC<ABTestRedirectProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Só faz redirecionamento se o usuário está em uma das rotas do teste A/B
    const isTestRoute = [
      LANDING_PAGE_AB_TEST.variantA.route,
      LANDING_PAGE_AB_TEST.variantB.route
    ].includes(currentPath);

    if (isTestRoute) {
      const redirectUrl = getABTestRedirectUrl(LANDING_PAGE_AB_TEST);
      
      // Só redireciona se for para uma rota diferente da atual
      if (redirectUrl !== currentPath) {
        console.log(`🔄 A/B Test: Redirecionando de ${currentPath} para ${redirectUrl}`);
        
        // Preserva query parameters na URL
        const searchParams = location.search;
        navigate(redirectUrl + searchParams, { replace: true });
      }
    }
  }, [location, navigate]);

  // Mostra loading durante o redirecionamento
  if ([LANDING_PAGE_AB_TEST.variantA.route, LANDING_PAGE_AB_TEST.variantB.route].includes(location.pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
          <p className="mt-4 text-gray-600">Carregando sua experiência personalizada...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ABTestRedirect;
