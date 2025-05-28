import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children?: ReactNode;
}
/**
 * Layout básico para componentes administrativos que não usam o novo AdminDashboard
 * Este componente será gradualmente descontinuado conforme migramos tudo para o novo dashboard
 */
const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const { user } = useAuth();
  const location = useLocation();
  const currentTab = location.pathname?.split('/').pop() || 'dashboard';
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      <AdminHeader title="Painel Administrativo" showBackButton={false} />
      
      <div className="p-6">
        <div className="mb-8 flex gap-4">
          <Button variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
          <Button variant={pathname?.includes('/admin/editor') ? 'default' : 'outline'} asChild>
            <Link href="/admin/editor">Editor Visual</Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Se estivermos na rota exata /admin, mostramos o conteúdo aqui */}
          {pathname === '/admin' && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Editor Visual</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Personalize a página de resultados com o editor visual de arrastar e soltar.
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/editor">Abrir Editor</Link>
              </Button>
            </div>
          )}
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Resultados</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Visualize e gerencie os resultados do quiz.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/resultado">Ver Resultados</Link>
            </Button>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Quiz</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Volte para o quiz principal.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Ir para Quiz</Link>
            </Button>
          </div>
        </div>
        
        {/* Next.js App Router renderiza automaticamente os children */}
        {/* Outlet não é necessário no Next.js */}
      </div>
    </div>
  );
};
export default AdminLayout;
