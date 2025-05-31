
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  BarChart3, 
  Users, 
  TestTube, 
  Edit,
  Eye,
  Palette,
  TrendingUp
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'Editor Visual',
      description: 'Edite páginas de resultado com interface visual',
      icon: Edit,
      path: '/admin/editor',
      color: 'bg-blue-500',
      status: 'Ativo'
    },
    {
      title: 'Editor Simples', 
      description: 'Editor simplificado para edições básicas',
      icon: Edit,
      path: '/admin/editor/simples',
      color: 'bg-green-500',
      status: 'Ativo'
    },
    {
      title: 'Visualizar Resultado',
      description: 'Veja como está a página de resultados atual',
      icon: Eye,
      path: '/resultado',
      color: 'bg-purple-500',
      status: 'Ativo'
    },
    {
      title: 'Configurações',
      description: 'Configurações gerais do sistema',
      icon: Settings,
      path: '/admin/settings',
      color: 'bg-gray-500',
      status: 'Em Desenvolvimento'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground">
          Gerencie seu quiz e páginas de resultado
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.path} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`${card.color} p-2 rounded-md`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {card.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={card.status === 'Ativo' ? 'default' : 'secondary'}
                  >
                    {card.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(card.path)}
                    disabled={card.status !== 'Ativo'}
                  >
                    Acessar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estatísticas Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Quiz Completados</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taxa de Conversão</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Leads Gerados</span>
                <span className="font-medium">--</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/admin/editor')}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar Página de Resultado
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/resultado')}
              >
                <Eye className="mr-2 h-4 w-4" />
                Visualizar Resultado
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open('/', '_blank')}
              >
                <Palette className="mr-2 h-4 w-4" />
                Ver Quiz Principal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
