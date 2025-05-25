import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronLeft, Zap, Home, Eye, Server, Users, AlertTriangle } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  showBackButton?: boolean;
  backTo?: string;
}

export function AdminHeader({ 
  title, 
  showBackButton = true, 
  backTo = '/admin' 
}: AdminHeaderProps) {
  // Dados simulados para demonstração
  const capacity = { maxUsers: 1000 };
  const usage = { activeUsers: Math.floor(Math.random() * 800) + 100 }; // Simular variação
  const isNearLimit = usage.activeUsers / capacity.maxUsers > 0.75;

  return (
    <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button variant="ghost" size="icon" asChild>
                <Link to={backTo}>
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Voltar</span>
                </Link>
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Quiz Sell Genius
                </span>
              </div>
              
              {title !== "Quiz Sell Genius" && (
                <>
                  <div className="h-4 w-px bg-gray-300" />
                  <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Indicador de Capacidade */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
              <Server className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-600">
                {usage.activeUsers.toLocaleString()} / {capacity.maxUsers.toLocaleString()}
              </span>
              {isNearLimit && (
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {Math.round((usage.activeUsers / capacity.maxUsers) * 100)}%
                </Badge>
              )}
            </div>

            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Painel</span>
              </Link>
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Ver Quiz</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
