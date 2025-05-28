
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { BarChart, Edit, Settings, BarChartHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      <header className="bg-white border-b px-6 py-3 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-xl font-bold text-[#432818]">Admin Dashboard</Link>
            <nav className="hidden md:flex space-x-1">
              <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-[#432818] hover:bg-slate-100">
                <BarChart className="h-4 w-4 inline-block mr-2" />
                Dashboard
              </Link>
              <Link to="/admin/editor" className="px-3 py-2 rounded-md text-sm font-medium text-[#8F7A6A] hover:bg-slate-100">
                <Edit className="h-4 w-4 inline-block mr-2" />
                Editor Unificado
              </Link>
              <Link to="/admin/analytics" className="px-3 py-2 rounded-md text-sm font-medium text-[#8F7A6A] hover:bg-slate-100">
                <BarChart className="h-4 w-4 inline-block mr-2" />
                Analytics
              </Link>
              <Link to="/admin/ab-test" className="px-3 py-2 rounded-md text-sm font-medium text-[#8F7A6A] hover:bg-slate-100">
                <BarChartHorizontal className="h-4 w-4 inline-block mr-2" />
                Teste A/B
              </Link>
              <Link to="/admin/settings" className="px-3 py-2 rounded-md text-sm font-medium text-[#8F7A6A] hover:bg-slate-100">
                <Settings className="h-4 w-4 inline-block mr-2" />
                Configurações
              </Link>
            </nav>
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
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t p-3 text-center text-sm text-[#8F7A6A]">
        <div className="container mx-auto">
          Admin Dashboard © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
