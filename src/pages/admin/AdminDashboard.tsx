
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">Painel de Administração</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Editor Unificado"
            description="Edite quiz, páginas de resultados e vendas em um único lugar"
            linkTo="/admin/editor/unified"
            buttonText="Abrir Editor"
          />
          
          <DashboardCard 
            title="Configurações"
            description="Gerencie configurações do sistema"
            linkTo="/admin/settings"
            buttonText="Configurações"
          />
          
          <DashboardCard 
            title="Resultados"
            description="Visualize os resultados do quiz"
            linkTo="/resultado"
            buttonText="Ver Resultados"
            isExternal
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
}) => {
  return (
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
};

export default AdminDashboard;
