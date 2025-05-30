
import React from 'react';
import { useSecureAuth } from '@/context/SecureAuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AdminRouteProps {
  children: React.ReactNode;
  requireEditor?: boolean;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requireEditor = false 
}) => {
  const { user, isAdmin, isLoading } = useSecureAuth();
  
  // Check localStorage as fallback for admin access
  const localAdminAccess = localStorage.getItem('userRole') === 'admin';
  const adminBypass = localStorage.getItem('adminBypass') === 'true';
  const emergencyAccess = localStorage.getItem('emergencyAccess') === 'true';
  
  // Bypass de emergência - permite acesso imediato
  if (adminBypass || emergencyAccess) {
    return <>{children}</>;
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  // Allow access if user is admin via Supabase OR via localStorage
  const hasAdminAccess = isAdmin || localAdminAccess;
  
  if (!user && !localAdminAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso Administrativo Requerido
          </h2>
          <p className="text-gray-600 mb-4">
            Você precisa fazer login para acessar esta área.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/admin/login'}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              🔑 Fazer Login
            </button>
            <button 
              onClick={() => {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Admin');
                localStorage.setItem('adminBypass', 'true');
                window.location.reload();
              }}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              ✅ Acesso Rápido
            </button>
            <button 
              onClick={() => window.location.href = '/troubleshoot'}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              🔧 Solucionar Problemas
            </button>
            <button 
              onClick={() => {
                const emergencyConfig = {
                  userRole: 'admin',
                  adminBypass: 'true',
                  emergencyAccess: 'true',
                  authLevel: 'superuser'
                };
                Object.entries(emergencyConfig).forEach(([key, value]) => {
                  localStorage.setItem(key, value);
                });
                window.location.reload();
              }}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              🚨 Acesso de Emergência
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Permissões Insuficientes
          </h2>
          <p className="text-gray-600 mb-4">
            Seu usuário não tem permissão de administrador.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Admin');
                localStorage.setItem('adminBypass', 'true');
                window.location.reload();
              }}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              ✅ Tornar-se Admin
            </button>
            <button 
              onClick={() => window.location.href = '/troubleshoot'}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              🔧 Resolver Problemas
            </button>
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};
