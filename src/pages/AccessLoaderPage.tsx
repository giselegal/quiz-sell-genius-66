import React, { useEffect, useState } from 'react';
import { FileLoadingScreen } from '@/components/loaders/FileLoadingScreen';
import { useNavigate } from 'react-router-dom';

interface AccessLoaderPageProps {
  redirectTarget?: 'editor' | 'admin' | 'unified' | 'result-editor';
}

const AccessLoaderPage: React.FC<AccessLoaderPageProps> = ({ 
  redirectTarget = 'unified' 
}) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // Determine a URL de redirecionamento com base no alvo selecionado
  const getRedirectUrl = () => {
    switch (redirectTarget) {
      case 'editor':
        return '/admin/editor';
      case 'admin':
        return '/admin';
      case 'result-editor':
        return '/resultado/editor';
      case 'unified':
      default:
        return '/admin/unified-editor';
    }
  };

  // Simulação de verificação de acesso
  useEffect(() => {
    const checkAccess = () => {
      // Aqui você poderia adicionar lógica real para verificar permissões
      // ou estado de autenticação, se necessário
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    };
    
    checkAccess();
  }, []);

  // Função chamada quando o carregamento estiver completo
  const handleLoadingComplete = () => {
    navigate(getRedirectUrl());
  };

  // Título e subtítulo variam com base no alvo de redirecionamento
  const getTitle = () => {
    switch (redirectTarget) {
      case 'editor':
        return 'Editor Visual';
      case 'admin':
        return 'Painel Administrativo';
      case 'result-editor':
        return 'Editor de Resultados';
      case 'unified':
      default:
        return 'Editor Unificado';
    }
  };

  const getSubtitle = () => {
    switch (redirectTarget) {
      case 'editor':
        return 'Carregando editor visual';
      case 'admin':
        return 'Acessando painel administrativo';
      case 'result-editor':
        return 'Preparando editor de resultados';
      case 'unified':
      default:
        return 'Carregando editor unificado';
    }
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF9F7]">
        <div className="animate-pulse text-[#432818]">
          Verificando acesso...
        </div>
      </div>
    );
  }

  return (
    <FileLoadingScreen 
      totalFiles={3700} 
      initialFilesLoaded={2000}
      loadingSpeed={40}
      onLoadingComplete={handleLoadingComplete}
      title={`Lovable ${getTitle()}`}
      subtitle={getSubtitle()}
    />
  );
};

export default AccessLoaderPage;
