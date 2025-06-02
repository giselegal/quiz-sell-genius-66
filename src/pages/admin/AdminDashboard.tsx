
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total de Participantes",
      value: "1,234",
      description: "+12% desde o último mês",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Taxa de Conversão",
      value: "23.5%",
      description: "+3.2% desde a semana passada",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Vendas Totais",
      value: "R$ 45.2k",
      description: "+18% desde o último mês",
      icon: ShoppingCart,
      color: "text-purple-600"
    },
    {
      title: "Quiz Completados",
      value: "892",
      description: "+7% desde ontem",
      icon: BarChart3,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao painel de controle do Quiz de Estilo
            </p>
          </div>
          <Badge variant="outline" className="text-green-700 border-green-700">
            Sistema Online
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-600">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Gerenciar componentes principais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/')} 
                className="w-full justify-start"
                variant="outline"
              >
                Ver Quiz Principal
              </Button>
              <Button 
                onClick={() => navigate('/resultado')} 
                className="w-full justify-start"
                variant="outline"
              >
                Página de Resultados
              </Button>
              <Button 
                onClick={() => navigate('/quiz-descubra-seu-estilo')} 
                className="w-full justify-start"
                variant="outline"
              >
                Quiz de Oferta
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
              <CardDescription>
                Monitoramento em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Quiz Principal</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Página de Resultados</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Analytics</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Integrações</span>
                <Badge className="bg-green-100 text-green-800">Conectado</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
