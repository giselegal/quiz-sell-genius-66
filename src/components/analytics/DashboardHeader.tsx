
"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Download, 
  RefreshCw, 
  Calendar,
  Filter,
  Bell,
  HelpCircle
} from 'lucide-react';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
  onRefresh?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Analytics Dashboard",
  subtitle = "Insights em tempo real do seu quiz",
  lastUpdated = "há 2 minutos",
  onRefresh,
  onExport,
  isLoading = false
}) => {
  const dateRangeOptions = [
    { label: 'Últimas 24 horas', value: '24h' },
    { label: 'Últimos 7 dias', value: '7d' },
    { label: 'Últimos 30 dias', value: '30d' },
    { label: 'Últimos 90 dias', value: '90d' },
    { label: 'Período personalizado', value: 'custom' }
  ];

  const exportOptions = [
    { label: 'Exportar PDF', format: 'pdf' },
    { label: 'Exportar Excel', format: 'excel' },
    { label: 'Exportar CSV', format: 'csv' },
    { label: 'Compartilhar Dashboard', format: 'share' }
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Live
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{subtitle}</span>
          <span>•</span>
          <span>Atualizado {lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Últimos 30 dias
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {dateRangeOptions.map((option) => (
              <DropdownMenuItem key={option.value}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Todos os dispositivos</DropdownMenuItem>
            <DropdownMenuItem>Apenas Mobile</DropdownMenuItem>
            <DropdownMenuItem>Apenas Desktop</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Brasil</DropdownMenuItem>
            <DropdownMenuItem>Internacional</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {exportOptions.map((option) => (
              <DropdownMenuItem key={option.format} onClick={() => onExport?.(option.format)}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Alertas
        </Button>

        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Config
        </Button>

        <Button variant="outline" size="sm">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
