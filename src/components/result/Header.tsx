
import React from 'react';
import { useSecureAuth } from '@/context/SecureAuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import AdminButton from '@/components/auth/AdminButton';
import { StyleResult } from '@/types/quiz';

interface HeaderProps {
  primaryStyle: StyleResult;
  logoHeight?: number;
  logo?: string;
  logoAlt?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  primaryStyle,
  logoHeight = 60,
  logo,
  logoAlt = "Logo",
  userName
}) => {
  const { user, signOut } = useSecureAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-[#B89B7A]/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {logo && (
            <img 
              src={logo} 
              alt={logoAlt} 
              style={{ height: `${logoHeight}px` }}
              className="h-auto"
            />
          )}
          <div>
            <h1 className="text-xl font-playfair text-[#432818]">
              Seu Estilo é <span className="text-[#B89B7A] font-semibold">{primaryStyle.category}</span>
            </h1>
            {user && (
              <p className="text-sm text-[#8F7A6A]">
                Olá, {user.user_metadata?.first_name || user.email}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <AdminButton to="/admin">
            Painel Admin
          </AdminButton>
          
          <AdminButton to="/resultado/editor">
            Editar Página
          </AdminButton>
          
          {user && (
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
