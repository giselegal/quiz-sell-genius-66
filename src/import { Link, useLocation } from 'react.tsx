import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AdminHeader } from './AdminHeader';
import { 
  PenTool, 
  BarChart3, 
  Users, 
  Settings, 
  Eye, 
  Plus,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import CompetitiveAdvantage from './CompetitiveAdvantage';

export default function AdminLayout() {
  const location = useLocation();

  const dashboardCards = [
    {
      title: 'Editor Visual',
      description: 'Crie e personalize páginas de resultado com nosso editor drag & drop',
      icon: PenTool,
      href: '/admin/editor',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: 'Páginas criadas: 12',
      action: 'Criar Nova Página'
    },
    {
      title: 'Analytics do Quiz',
      description: 'Acompanhe o desempenho e conversões do seu quiz',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: 'Conversão: 24.5%',
      action: 'Ver Relatórios'
    },
    {
      title: 'Respostas dos Usuários',
      description: 'Gerencie e analise as respostas coletadas',
      icon: Users,
      href: '/admin/responses',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: 'Total: 1,234 respostas',
      action: 'Ver Respostas'
    },
    {
      title: 'Configurações',
      description: 'Personalize comportamento e integrações do quiz',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gradient-to-br from-gray-500 to-gray-600',
      stats: 'Última atualização: hoje',
      action: 'Configurar'
    }
  ];

  const quickActions = [
    {
      title: 'Visualizar Quiz',
      description: 'Ver como os visitantes veem seu quiz',
      icon: Eye,
      href: '/',
      variant: 'outline' as const
    },
    {
      title: 'Nova Página',
      description: 'Criar nova página de resultado',
      icon: Plus,
      href: '/admin/editor',
      variant: 'default' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminHeader title="Quiz Sell Genius" showBackButton={false} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <Zap className="h-10 w-10" />
                Painel de Controle
              </h1>
              <p className="text-xl text-purple-100 mb-6">
                Gerencie seu quiz e maximize suas conversões
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Taxa de conversão: 24.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% este mês</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant={action.variant}
                  size="lg"
                  asChild
                  className={action.variant === 'outline' ? 'border-white text-white hover:bg-white hover:text-purple-600' : ''}
                >
                  <Link to={action.href} className="flex items-center gap-2">
                    <action.icon className="h-5 w-5" />
                    {action.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-2 p-1 bg-white rounded-lg shadow-sm border">
          <Button 
            variant={location.pathname === '/admin' ? 'default' : 'ghost'} 
            asChild
            className="flex-1"
          >
            <Link to="/admin">Dashboard</Link>
          </Button>
          <Button 
            variant={location.pathname.includes('/admin/editor') ? 'default' : 'ghost'} 
            asChild
            className="flex-1"
          >
            <Link to="/admin/editor">Editor Visual</Link>
          </Button>
          <Button 
            variant={location.pathname.includes('/admin/analytics') ? 'default' : 'ghost'} 
            asChild
            className="flex-1"
          >
            <Link to="/admin/analytics">Analytics</Link>
          </Button>
        </div>
        
        {location.pathname === '/admin' && (
          <>
            {/* Main Dashboard Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
              {dashboardCards.map((card) => (
                <Card key={card.title} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground font-medium">
                        {card.stats}
                      </p>
                      <Button asChild className="w-full" variant="outline">
                        <Link to={card.href}>
                          {card.action}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-muted-foreground">Visitantes Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">+847</div>
                  <p className="text-xs text-muted-foreground">+12% em relação a ontem</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-muted-foreground">Conversões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">207</div>
                  <p className="text-xs text-muted-foreground">Taxa de 24.5%</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-muted-foreground">Receita Estimada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">R$ 12.4k</div>
                  <p className="text-xs text-muted-foreground">+8% este mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Atividade Recente
                </CardTitle>
                <CardDescription>
                  Acompanhe as interações mais recentes com seu quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Nova resposta recebida', time: '2 min atrás', type: 'success' },
                    { action: 'Página de resultado editada', time: '15 min atrás', type: 'info' },
                    { action: 'Configuração atualizada', time: '1 hora atrás', type: 'warning' },
                    { action: 'Relatório mensal gerado', time: '2 horas atrás', type: 'info' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <span className="text-sm">{activity.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seção de Diferenciais Competitivos */}
            <Card className="border-0 shadow-md mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Diferenciais Competitivos
                </CardTitle>
                <CardDescription>
                  Veja por que somos a escolha #1 para conversão inteligente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">3x</div>
                    <div className="text-sm text-gray-600">Maior Conversão</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">67%</div>
                    <div className="text-sm text-gray-600">Recupera Abandonos</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">< 30min</div>
                    <div className="text-sm text-gray-600">Setup Completo</div>
                  </div>
                </div>
                
                <Button asChild className="w-full">
                  <Link to="/admin/competitive-advantage">
                    Ver Análise Completa dos Diferenciais
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions for Mobile */}
            <div className="lg:hidden mt-8 grid gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant={action.variant}
                  size="lg"
                  asChild
                  className="justify-start"
                >
                  <Link to={action.href} className="flex items-center gap-3">
                    <action.icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm opacity-70">{action.description}</div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </>
        )}

        {location.pathname === '/admin/competitive-advantage' && <CompetitiveAdvantage />}
      </div>
    </div>
  );
}
