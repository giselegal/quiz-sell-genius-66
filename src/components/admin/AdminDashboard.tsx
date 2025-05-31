import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  BarChart, 
  Edit, 
  Settings, 
  BarChartHorizontal, 
  Layout,
  Home,
  FileText,
  TestTube,
  Palette,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Lazy load dos componentes administrativos
const EditorPage = React.lazy(() => import('./EditorPage'));
const SettingsPage = React.lazy(() => import('./SettingsPage'));
const AnalyticsPage = React.lazy(() => import('./AnalyticsPage'));
const ABTestPage = React.lazy(() => import('./ABTestPage'));
const ABTestManagerPage = React.lazy(() => import('../ABTestManagerPage'));
const ResultPagePrototype = React.lazy(() => import('../ResultPagePrototype'));
const EnhancedResultPageEditorPage = React.lazy(() => import('../EnhancedResultPageEditorPage'));
const CreativeAnalyticsPage = React.lazy(() => import('../CreativeAnalyticsPage'));
const QuizOfferPageVisualEditor = React.lazy(() => import('@/components/visual-editor/QuizOfferPageVisualEditor'));

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Determinar qual aba está ativa baseado na URL
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/editor')) setActiveTab('editor');
    else if (path.includes('/settings')) setActiveTab('settings');
    else if (path.includes('/analytics')) setActiveTab('analytics');
    else if (path.includes('/ab-test')) setActiveTab('ab-test');
    else if (path.includes('/offer-editor')) setActiveTab('offer-editor');
    else if (path.includes('/prototype')) setActiveTab('prototype');
    else setActiveTab('dashboard');
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'dashboard':
        navigate('/admin');
        break;
      case 'editor':
        navigate('/admin/editor');
        break;
      case 'settings':
        navigate('/admin/settings');
        break;
      case 'analytics':
        navigate('/admin/analytics');
        break;
      case 'ab-test':
        navigate('/admin/ab-test');
        break;
      case 'offer-editor':
        navigate('/admin/offer-editor');
        break;
      case 'prototype':
        navigate('/admin/prototype');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-xl font-bold text-[#432818]">
              Admin Dashboard
            </Link>
            <div className="text-sm text-[#8F7A6A] hidden md:block">
              Central de controle administrativo
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-sm text-[#8F7A6A]">
                Olá, <span className="font-medium">{user.userName}</span>
              </div>
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-sm font-medium text-purple-700">
                {user.userName?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            
            {/* Navigation Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="offer-editor" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Oferta
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="ab-test" className="flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                A/B Test
              </TabsTrigger>
              <TabsTrigger value="prototype" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Protótipo
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Config
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Principal */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#432818] mb-2">Painel Administrativo</h1>
                <p className="text-[#8F7A6A]">Gerencie todos os aspectos do seu quiz de estilo em um só lugar</p>
              </div>

              {/* Cards de acesso rápido */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                <DashboardCard 
                  title="Editor Unificado"
                  description="Edite quiz, páginas de resultados e vendas"
                  icon={<Edit className="w-6 h-6" />}
                  onClick={() => handleTabChange('editor')}
                  buttonText="Abrir Editor"
                />
                
                <DashboardCard 
                  title="Editor de Oferta"
                  description="Customize a página de oferta do quiz"
                  icon={<Layout className="w-6 h-6" />}
                  onClick={() => handleTabChange('offer-editor')}
                  buttonText="Editar Oferta"
                />
                
                <DashboardCard 
                  title="Analytics"
                  description="Visualize métricas e performance"
                  icon={<BarChart className="w-6 h-6" />}
                  onClick={() => handleTabChange('analytics')}
                  buttonText="Ver Analytics"
                />
                
                <DashboardCard 
                  title="Analytics de Criativos"
                  description="Analise performance de criativos"
                  icon={<TrendingUp className="w-6 h-6" />}
                  linkTo="/admin/creative-analytics"
                  buttonText="Ver Criativos"
                  isExternal
                />
                
                <DashboardCard 
                  title="Teste A/B"
                  description="Configure e monitore testes A/B"
                  icon={<TestTube className="w-6 h-6" />}
                  onClick={() => handleTabChange('ab-test')}
                  buttonText="Gerenciar Testes"
                />
                
                <DashboardCard 
                  title="Protótipo"
                  description="Visualize protótipos e testes"
                  icon={<Palette className="w-6 h-6" />}
                  onClick={() => handleTabChange('prototype')}
                  buttonText="Ver Protótipo"
                />
                
                <DashboardCard 
                  title="Configurações"
                  description="Ajustes gerais do sistema"
                  icon={<Settings className="w-6 h-6" />}
                  onClick={() => handleTabChange('settings')}
                  buttonText="Configurar"
                />
                
                <DashboardCard
                  title="Ver Resultados"
                  description="Acesse a página de resultados"
                  icon={<TrendingUp className="w-6 h-6" />}
                  linkTo="/resultado"
                  buttonText="Ver Página"
                  isExternal
                />
                
                <DashboardCard
                  title="Quiz Principal"
                  description="Acesse o quiz principal"
                  icon={<FileText className="w-6 h-6" />}
                  linkTo="/"
                  buttonText="Fazer Quiz"
                  isExternal
                />
              </div>

              {/* Estatísticas rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-[#8F7A6A]">Todos os sistemas operacionais</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Último Acesso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#8F7A6A]">Agora</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Versão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#8F7A6A]">v2.0.0</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Outras abas carregam os componentes específicos */}
            <TabsContent value="editor">
              <React.Suspense fallback={<div className="p-8 text-center">Carregando editor...</div>}>
                <EditorPage />
              </React.Suspense>
            </TabsContent>

            <TabsContent value="offer-editor">
              <React.Suspense fallback={<div className="p-8 text-center">Carregando editor de oferta...</div>}>
                <QuizOfferPageVisualEditor />
              </React.Suspense>
            </TabsContent>

            <TabsContent value="analytics">
              <React.Suspense fallback={<div className="p-8 text-center">Carregando analytics...</div>}>
                <AnalyticsPage />
              </React.Suspense>
            </TabsContent>

            <TabsContent value="ab-test">
              <React.Suspense fallback={<div className="p-8 text-center">Carregando testes A/B...</div>}>
                <ABTestPage />
              </React.Suspense>
            </TabsContent>

            <TabsContent value="prototype">
              <React.Suspense fallback={<div className="p-8 text-center">Carregando protótipo...</div>}>
                <ResultPagePrototype />
              </React.Suspense>
            </TabsContent>

            <TabsContent value="settings">
              <React.Suspense fallback={<div className="p-8 text-center">Carregando configurações...</div>}>
                <SettingsPage />
              </React.Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-3 text-center text-sm text-[#8F7A6A]">
        <div className="container mx-auto">
          Admin Dashboard © {new Date().getFullYear()} - Central de controle administrativo
        </div>
      </footer>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick?: () => void;
  linkTo?: string;
  isExternal?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon,
  buttonText,
  onClick,
  linkTo,
  isExternal = false
}) => {
  const cardContent = (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer border border-[#B89B7A]/20">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#B89B7A]/10 rounded-lg flex items-center justify-center text-[#B89B7A]">
            {icon}
          </div>
        </div>
        <CardTitle className="text-lg font-medium text-[#432818]">{title}</CardTitle>
        <CardDescription className="text-[#8F7A6A]">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onClick}
          className="w-full bg-[#B89B7A] text-white hover:bg-[#8F7A6A] transition-colors"
        >
          {buttonText}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  if (linkTo && isExternal) {
    return (
      <Link to={linkTo} target={linkTo.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default AdminDashboard;
