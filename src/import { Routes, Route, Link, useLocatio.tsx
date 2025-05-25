import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminHeader } from './AdminHeader';
import { ROUTES } from '../../config/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Zap, 
  ShoppingCart,
  MessageCircle,
  Target,
  TrendingUp,
  Database,
  Globe,
  Link as LinkIcon
} from 'lucide-react';

// Lazy loading dos componentes admin
const Dashboard = lazy(() => import('./Dashboard'));
const LeadsDashboard = lazy(() => import('./leads/LeadsDashboard'));
const ABTestDashboard = lazy(() => import('./testing/ABTestDashboard'));
const UTMDashboard = lazy(() => import('./utm/UTMDashboard'));
const HotmartDashboard = lazy(() => import('./integrations/HotmartDashboard'));
const CapacityDashboard = lazy(() => import('./CapacityDashboard'));
const CompetitiveAdvantage = lazy(() => import('./CompetitiveAdvantage'));

// Loading component para routes
function RouteLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
        <p className="text-sm text-gray-600">Carregando módulo...</p>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === ROUTES.ADMIN.ROOT) return 'Quiz Sell Genius';
    if (path === ROUTES.ADMIN.LEADS) return 'Painel de Leads';
    if (path === ROUTES.ADMIN.AB_TESTING) return 'Testes A/B';
    if (path === ROUTES.ADMIN.UTM) return 'Campanhas UTM';
    if (path === ROUTES.ADMIN.INTEGRATIONS.HOTMART) return 'Integração Hotmart';
    if (path === ROUTES.ADMIN.CAPACITY) return 'Capacidade do Sistema';
    if (path === ROUTES.ADMIN.COMPETITIVE_ADVANTAGE) return 'Diferenciais Competitivos';
    return 'Admin';
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: ROUTES.ADMIN.ROOT,
      icon: BarChart3,
      description: 'Visão geral do sistema'
    },
    {
      title: 'Leads',
      path: ROUTES.ADMIN.LEADS,
      icon: Users,
      description: 'Gerenciar leads e funil'
    },
    {
      title: 'Testes A/B',
      path: ROUTES.ADMIN.AB_TESTING,
      icon: Target,
      description: 'Otimizar conversões'
    },
    {
      title: 'Campanhas UTM',
      path: ROUTES.ADMIN.UTM,
      icon: LinkIcon,
      description: 'Rastrear fontes de tráfego'
    },
    {
      title: 'Hotmart',
      path: ROUTES.ADMIN.INTEGRATIONS.HOTMART,
      icon: ShoppingCart,
      description: 'Integração com Hotmart'
    },
    {
      title: 'Capacidade',
      path: ROUTES.ADMIN.CAPACITY,
      icon: Database,
      description: 'Monitor de recursos'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        title={getPageTitle()} 
        showBackButton={location.pathname !== ROUTES.ADMIN.ROOT} 
      />
      
      <div className="container mx-auto px-6 py-8">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            {/* Usar constantes de rota */}
            <Route path="/" element={
              <div className="space-y-8">
                {/* Header do Dashboard */}
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Quiz Sell Genius
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Transforme visitantes em clientes com quizzes inteligentes e automação completa
                  </p>
                </div>

                {/* Estatísticas Rápidas */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
                      <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,247</div>
                      <p className="text-xs text-muted-foreground">+12% este mês</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24.8%</div>
                      <p className="text-xs text-muted-foreground">+3.2% vs anterior</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">R$ 89.2K</div>
                      <p className="text-xs text-muted-foreground">+18% este mês</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Mensagens WhatsApp</CardTitle>
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">856</div>
                      <p className="text-xs text-muted-foreground">67% conversão</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Menu de Navegação */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {menuItems.map((item) => (
                    <Card key={item.path} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3">
                          <item.icon className="h-6 w-6 text-purple-600" />
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full">
                          <Link to={item.path}>
                            Acessar {item.title}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Seção de Diferenciais */}
                <Card className="border-0 shadow-md">
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
              </div>
            } />

            {/* Rotas dos módulos */}
            <Route path="/leads" element={<LeadsDashboard />} />
            <Route path="/ab-testing" element={<ABTestDashboard />} />
            <Route path="/utm" element={<UTMDashboard />} />
            <Route path="/integrations/hotmart" element={<HotmartDashboard />} />
            <Route path="/capacity" element={<CapacityDashboard />} />
            <Route path="/competitive-advantage" element={<CompetitiveAdvantage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
