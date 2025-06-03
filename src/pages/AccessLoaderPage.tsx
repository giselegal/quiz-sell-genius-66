
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const AccessLoaderPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading and redirect to dashboard
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Carregando acesso...</h2>
        <p className="text-gray-500 mt-2">Redirecionando para o dashboard</p>
      </div>
    </div>
  );
};

export default AccessLoaderPage;
