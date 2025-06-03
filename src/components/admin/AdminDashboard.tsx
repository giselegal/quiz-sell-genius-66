
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Settings, Users, BarChart, Eye, Palette } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mb-6">
            Escolha uma das opções abaixo para gerenciar seu sistema.
          </p>
          
          {/* Botão de acesso ao Dashboard Antigo */}
          <div className="mb-8">
            <Link href="/admin/old">
              <button className="px-4 py-2 border border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors rounded-md font-medium">
                🔙 Dashboard Antigo
              </button>
            </Link>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Acesso Rápido (caso o redirecionamento não funcione)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card do Editor Enhanced */}
            <Link 
              href="/admin/editor"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
            >
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-blue-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Editor Ao Vivo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Editor visual com preview em tempo real
                  </p>
                </div>
              </div>
            </Link>

            {/* Card para visualizar página atual */}
            <Link
              href="/resultado"
              target="_blank"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
            >
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Visualizar Página
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ver página de resultados atual
                  </p>
                </div>
              </div>
            </Link>

            {/* Card para Estilos Globais */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <Palette className="h-8 w-8 text-purple-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Design System
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Cores e tokens unificados
                  </p>
                </div>
              </div>
            </div>

            {/* Card de Usuários */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Usuários
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Gerenciar usuários
                  </p>
                </div>
              </div>
            </div>

            {/* Card de Analytics */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-red-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Analytics
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Relatórios e métricas
                  </p>
                </div>
              </div>
            </div>

            {/* Card de Configurações */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-gray-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Configurações
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Configurações gerais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
