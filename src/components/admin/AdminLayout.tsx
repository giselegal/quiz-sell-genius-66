import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { AdminHeader } from './AdminHeader';
import { ROUTES } from '../../utils/routes';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout básico para componentes administrativos que não usam o novo AdminDashboard
 * Este componente será gradualmente descontinuado conforme migramos tudo para o novo dashboard
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || 'dashboard';

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: null,
      description: 'Visão geral do sistema'
    },
    {
      name: 'Editor',
      href: ROUTES.ADMIN.EDITOR,
      icon: null,
      description: 'Editor de quizzes e páginas'
    },
    {
      name: 'Resultados',
      href: '/resultado',
      icon: null,
      description: 'Visualizar resultados do quiz'
    },
    {
      name: 'Sair',
      href: '/logout',
      icon: null,
      description: 'Sair da sua conta'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      <AdminHeader title="Painel Administrativo" showBackButton={false} />
      
      <div className="p-6">
        <div className="mb-8 flex gap-4">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant={location.pathname === item.href ? 'default' : 'outline'}
              asChild
            >
              <Link to={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Se estivermos na rota exata /admin, mostramos o conteúdo aqui */}
          {location.pathname === '/admin' && (
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
          
          {location.pathname === '/admin' && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Resultados</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Visualize e gerencie os resultados do quiz.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/resultado">Ver Resultados</Link>
              </Button>
            </div>
          )}

          {location.pathname === '/admin' && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Quiz</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Volte para o quiz principal.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/">Ir para Quiz</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Se não, o React Router renderiza o componente da rota correspondente */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
