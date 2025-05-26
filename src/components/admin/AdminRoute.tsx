import React from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
  requireEditor?: boolean;
}
export const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requireEditor = false 
}) => {
  const { user, isAdmin, hasEditorAccess } = useAuth();
  if (!user) {
    redirect('/login');
    return null;
  }
  if (!isAdmin) {
    redirect('/');
  if (requireEditor && !hasEditorAccess) {
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
  return <>{children}</>;
};
