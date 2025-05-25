import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Edit, Settings, Users, BarChart } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { hasEditorAccess } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Painel Administrativo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card do Editor Enhanced */}
          {hasEditorAccess && (
            <Link 
              to="/admin/editor"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-blue-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Editor Enhanced
                  </h3>
                  <p className="text-gray-600">
                    Editar página de resultados
                  </p>
                </div>
              </div>
            </Link>
          )}
          
          {/* Outros cards admin */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Usuários
                </h3>
                <p className="text-gray-600">
                  Gerenciar usuários
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Analytics
                </h3>
                <p className="text-gray-600">
                  Relatórios e métricas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
