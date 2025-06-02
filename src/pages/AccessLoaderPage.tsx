
import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const AccessLoaderPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Carregando acesso...
        </h2>
        <p className="text-gray-500">
          Aguarde enquanto verificamos suas permissões
        </p>
      </div>
    </div>
  );
};

export default AccessLoaderPage;
