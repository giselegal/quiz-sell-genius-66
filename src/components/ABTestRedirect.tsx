import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LANDING_PAGE_AB_TEST, getABTestRedirectUrl } from '../utils/abtest';

interface ABTestRedirectProps {
  children?: React.ReactNode;
}

/**
 * Componente que gerencia o redirecionamento baseado no teste A/B
 * Redireciona automaticamente apenas da rota raiz
 */
const ABTestRedirect: React.FC<ABTestRedirectProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Só faz redirecionamento da rota raiz para evitar loops
    if (currentPath === '/') {
      const redirectUrl = getABTestRedirectUrl(LANDING_PAGE_AB_TEST);
      
      console.log(`🔄 A/B Test: Redirecionando de ${currentPath} para ${redirectUrl}`);
      
      // Preserva query parameters na URL
      const searchParams = location.search;
      navigate(redirectUrl + searchParams, { replace: true });
    }
  }, [location, navigate]);

  return <>{children}</>;
};

export default ABTestRedirect;
