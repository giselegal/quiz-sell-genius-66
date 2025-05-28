
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
      </div>
      
      <div className="p-6">
        <div className="mb-8 flex gap-4">
          <Button variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
            <Link to="/admin">Dashboard</Link>
          </Button>
          <Button variant={pathname?.includes('/admin/editor') ? 'default' : 'outline'} asChild>
            <Link to="/admin/editor">Editor Visual</Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pathname === '/admin' && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Editor Visual</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Personalize a página de resultados com o editor visual de arrastar e soltar.
              </p>
              <Button asChild className="w-full">
                <Link to="/admin/editor">Abrir Editor</Link>
              </Button>
            </div>
          )}
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Resultados</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Visualize e gerencie os resultados do quiz.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/resultado">Ver Resultados</Link>
            </Button>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Quiz</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Volte para o quiz principal.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/">Ir para Quiz</Link>
            </Button>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
