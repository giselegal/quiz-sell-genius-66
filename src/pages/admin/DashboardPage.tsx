import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#432818] mb-4">Dashboard Overview</h1>
        <p className="text-[#8F7A6A]">Bem-vindo ao painel de controle</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D4C4A0]">
            <h3 className="text-lg font-semibold text-[#432818] mb-2">Total de Usuários</h3>
            <p className="text-2xl font-bold text-[#B89B7A]">1,234</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D4C4A0]">
            <h3 className="text-lg font-semibold text-[#432818] mb-2">Quiz Completados</h3>
            <p className="text-2xl font-bold text-[#B89B7A]">856</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D4C4A0]">
            <h3 className="text-lg font-semibold text-[#432818] mb-2">Taxa de Conversão</h3>
            <p className="text-2xl font-bold text-[#B89B7A]">68%</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D4C4A0]">
            <h3 className="text-lg font-semibold text-[#432818] mb-2">Vendas</h3>
            <p className="text-2xl font-bold text-[#B89B7A]">42</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
