
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Settings, 
  Palette,
  Eye,
  PieChart,
  TrendingUp,
  Users,
  Target,
  Edit,
  TestTube
} from 'lucide-react';

const DashboardCard = ({
  title,
  description,
  linkTo,
  buttonText,
  icon: Icon,
  status = 'Ativo'
}: {
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
  icon: any;
  status?: string;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-[#B89B7A]" />
    </CardHeader>
    <CardContent>
      <CardDescription className="mb-4">{description}</CardDescription>
      <div className="flex items-center justify-between">
        <Badge variant={status === 'Ativo' ? 'default' : 'secondary'}>
          {status}
        </Badge>
        <Link to={linkTo}>
          <Button variant="outline" size="sm" disabled={status !== 'Ativo'}>
            {buttonText}
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const cardsData = [
    { 
      title: "Editor Unificado", 
      description: "Edite quiz, páginas de resultados e vendas de forma centralizada.", 
      linkTo: "/admin/editor", 
      buttonText: "Abrir Editor",
      icon: Edit
    },
    { 
      title: "Editor Ao Vivo", 
      description: "Editor visual moderno estilo InLead/Typeform.", 
      linkTo: "/admin/live-editor", 
      buttonText: "Abrir Editor",
      icon: Palette
    },
    { 
      title: "Analytics Principal", 
      description: "Visualize as métricas chave de desempenho do seu funil.", 
      linkTo: "/admin/analytics", 
      buttonText: "Ver Analytics",
      icon: BarChart3
    },
    { 
      title: "Analytics de Criativos", 
      description: "Analise a performance dos seus anúncios e criativos.", 
      linkTo: "/admin/creative-analytics", 
      buttonText: "Analisar Criativos",
      icon: PieChart
    },
    { 
      title: "Testes A/B", 
      description: "Gerencie e configure seus testes A/B para otimizar conversões.", 
      linkTo: "/admin/ab-tests", 
      buttonText: "Gerenciar Testes",
      icon: TestTube
    },
    { 
      title: "Métricas Rápidas", 
      description: "Acesse um resumo das métricas mais importantes rapidamente.", 
      linkTo: "/admin/quick-metrics", 
      buttonText: "Ver Métricas",
      icon: TrendingUp
    },
    { 
      title: "Ver Resultados", 
      description: "Visualize os resultados dos quizzes enviados pelos usuários.", 
      linkTo: "/resultado", 
      buttonText: "Ver Resultados",
      icon: Eye
    },
    { 
      title: "Quiz Principal", 
      description: "Acesse e visualize o quiz principal como um usuário.", 
      linkTo: "/", 
      buttonText: "Ver Quiz",
      icon: Users
    },
    { 
      title: "Editor de Header", 
      description: "Personalize o cabeçalho da página de resultado do quiz.", 
      linkTo: "/admin/header-editor", 
      buttonText: "Editar Header",
      icon: Settings
    }
  ];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-bold text-[#432818] mb-8 text-center md:text-left">
          Painel de Administração
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardsData.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              description={card.description}
              linkTo={card.linkTo}
              buttonText={card.buttonText}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
