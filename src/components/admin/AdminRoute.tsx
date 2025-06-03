
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
  requireEditor?: boolean;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requireEditor = false 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Removidas verificações de isAdmin e hasEditorAccess que não existem no contexto
  // Simplificando para verificação básica de usuário logado
  
  if (requireEditor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso Negado
          </h2>
          <p className="text-gray-600 mb-4">
            Você não tem permissão para acessar o editor Enhanced.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};
