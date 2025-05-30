
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  Edit3, 
  TestTube,
  Target,
  Palette
} from 'lucide-react';

const AdminPage = () => {
  const adminCards = [
    {
      title: 'Dashboard Principal',
      description: 'Visão geral e métricas do sistema',
      icon: BarChart3,
      href: '/admin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Analytics',
      description: 'Análise de performance e métricas',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Editor de Quiz',
      description: 'Construir e editar questionários',
      icon: Edit3,
      href: '/admin/quiz-builder',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Editor de Resultados',
      description: 'Personalizar páginas de resultado',
      icon: Palette,
      href: '/admin/quiz-editor',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Testes A/B',
      description: 'Gerenciar experimentos e variações',
      icon: TestTube,
      href: '/admin/ab-test',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Usuários',
      description: 'Gerenciar usuários e permissões',
      icon: Users,
      href: '/admin/users',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Ofertas',
      description: 'Configurar ofertas e produtos',
      icon: Target,
      href: '/admin/offers',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Configurações',
      description: 'Configurações gerais do sistema',
      icon: Settings,
      href: '/admin/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#432818] mb-2">
            Painel Administrativo
          </h1>
          <p className="text-lg text-[#8F7A6A]">
            Gerencie todos os aspectos do Quiz Sell Genius
          </p>
        </div>

        {/* Quick Access Banner */}
        <Card className="mb-8 border-[#B89B7A] bg-gradient-to-r from-[#432818] to-[#5A3A2A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Acesso Rápido</h2>
                <p className="text-gray-200">
                  Se encontrar problemas de acesso, clique no botão ao lado para reconfigurar as permissões
                </p>
              </div>
              <Button 
                onClick={() => {
                  localStorage.setItem('userRole', 'admin');
                  localStorage.setItem('userName', 'Admin');
                  window.location.reload();
                }}
                variant="outline"
                className="bg-white text-[#432818] border-white hover:bg-gray-100"
              >
                Reconfigurar Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link key={index} to={card.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 border-[#E6D5C7] hover:border-[#B89B7A]">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-3`}>
                      <Icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <CardTitle className="text-lg text-[#432818]">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-[#8F7A6A]">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Status Section */}
        <Card className="mt-8 border-[#E6D5C7]">
          <CardHeader>
            <CardTitle className="text-[#432818]">Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">✓</div>
                <div className="text-sm text-green-700">Sistema Online</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{new Date().toLocaleDateString()}</div>
                <div className="text-sm text-blue-700">Última Atualização</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">Admin</div>
                <div className="text-sm text-purple-700">Nível de Acesso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
