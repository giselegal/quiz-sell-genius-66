import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">
          Painel de Administração
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Editor Unificado"
            description="Edite quiz, páginas de resultados e vendas"
            linkTo="/admin/editor"
            buttonText="Abrir Editor"
          />

          <DashboardCard
            title="Analytics Principal"
            description="Visualize as métricas principais"
            linkTo="/admin/analytics"
            buttonText="Ver Analytics"
          />

          <DashboardCard
            title="Métricas Completas"
            description="Acesse todas as métricas detalhadas"
            linkTo="/admin/analytics" // Reutilizando a página de analytics existente
            buttonText="Ver Métricas"
          />

          <DashboardCard
            title="Analytics de Criativos"
            description="Analise a performance dos seus criativos"
            linkTo="/admin/creative-analytics"
            buttonText="Ver Analytics de Criativos"
          />

          <DashboardCard
            title="Testes A/B"
            description="Gerencie e configure seus testes A/B"
            linkTo="/admin/ab-tests"
            buttonText="Gerenciar Testes A/B"
          />

          <DashboardCard
            title="Funil de Conversão (Detalhes)"
            description="Veja os detalhes do funil de conversão"
            linkTo="/admin/analytics?tab=funnel"
            buttonText="Ver Funil"
          />
          
          <DashboardCard
            title="UTM Tracking (Campanhas)"
            description="Acompanhe suas campanhas UTM"
            linkTo="/admin/analytics?tab=utm"
            buttonText="Ver Campanhas UTM"
          />

          <DashboardCard
            title="Métricas Rápidas"
            description="Acesse métricas chave rapidamente"
            linkTo="/admin/quick-metrics"
            buttonText="Ver Métricas Rápidas"
          />

          <DashboardCard
            title="Editor Rápido"
            description="Edite rapidamente as páginas de resultado e oferta"
            linkTo="/admin/quick-editor"
            buttonText="Editor Rápido"
          />
          
          <DashboardCard
            title="Ver Resultados"
            description="Visualize os resultados do quiz"
            linkTo="/resultado"
            buttonText="Ver Resultados"
          />
          
          <DashboardCard
            title="Quiz Principal"
            description="Acesse o quiz principal"
            linkTo="/"
            buttonText="Ver Quiz"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
  isExternal?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  linkTo,
  buttonText,
  isExternal = false
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-[#B89B7A]/20">
    <h2 className="text-xl font-medium text-[#432818] mb-2">{title}</h2>
    <p className="text-[#8F7A6A] mb-4">{description}</p>
    {isExternal ? (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-[#B89B7A] text-white rounded hover:bg-[#8F7A6A] transition-colors"
      >
        {buttonText}
      </a>
    ) : (
      <Link
        to={linkTo}
        className="inline-block px-4 py-2 bg-[#B89B7A] text-white rounded hover:bg-[#8F7A6A] transition-colors"
      >
        {buttonText}
      </Link>
    )}
  </div>
);

export default AdminDashboard;
