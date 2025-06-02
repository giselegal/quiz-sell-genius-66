
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Palette,
  Eye,
  PieChart,
  TrendingUp,
  Users,
  Target,
  ExternalLink
} from 'lucide-react';

const DashboardCard = ({ title, description, linkTo, buttonText, isExternal = false }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-[#B89B7A]/30 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-semibold text-[#432818] mb-2">{title}</h2>
      <p className="text-[#6B4F4F] mb-4 text-sm">{description}</p>
    </div>
    {isExternal ? (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A08466] transition-colors font-medium text-center"
      >
        {buttonText}
      </a>
    ) : (
      <Link
        to={linkTo}
        className="mt-auto inline-block px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A08466] transition-colors font-medium text-center"
      >
        {buttonText}
      </Link>
    )}
  </div>
);

const AdminDashboard: React.FC = () => {
  const cardsData = [
    { 
      title: "Editor Unificado", 
      description: "Editor moderno para Quiz, Resultado e Vendas de forma integrada.", 
      linkTo: "/admin/editor", 
      buttonText: "Abrir Editor" 
    },
    { 
      title: "Editor Ao Vivo", 
      description: "Editor visual avançado com preview em tempo real.", 
      linkTo: "/admin/live-editor", 
      buttonText: "Editor Visual" 
    },
    { 
      title: "Analytics Principal", 
      description: "Visualize as métricas chave de desempenho do seu funil.", 
      linkTo: "/admin/analytics", 
      buttonText: "Ver Analytics" 
    },
    { 
      title: "Analytics de Criativos", 
      description: "Analise a performance dos seus anúncios e criativos.", 
      linkTo: "/admin/creative-analytics", 
      buttonText: "Analisar Criativos" 
    },
    { 
      title: "Testes A/B", 
      description: "Gerencie e configure seus testes A/B para otimizar conversões.", 
      linkTo: "/admin/ab-tests", 
      buttonText: "Gerenciar Testes" 
    },
    { 
      title: "Métricas Rápidas", 
      description: "Acesse um resumo das métricas mais importantes rapidamente.", 
      linkTo: "/admin/quick-metrics", 
      buttonText: "Ver Métricas" 
    },
    { 
      title: "Editor de Header", 
      description: "Personalize o cabeçalho da página de resultado do quiz.", 
      linkTo: "/admin/header-editor", 
      buttonText: "Editar Header" 
    },
    { 
      title: "Ver Resultados", 
      description: "Visualize os resultados dos quizzes enviados pelos usuários.", 
      linkTo: "/resultado", 
      buttonText: "Ver Resultados" 
    }
  ];

  return (
    <div className="p-6 bg-[#FAF9F7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#432818] mb-8">
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
              isExternal={card.isExternal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
