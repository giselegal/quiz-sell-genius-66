
'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Palette,
  Eye,
  PieChart,
  TrendingUp,
  Users,
  Target,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: BarChart3
  },
  {
    title: 'Editor',
    href: '/admin/editor',
    icon: Palette
  },
  {
    title: 'Editor Ao Vivo',
    href: '/admin/live-editor',
    icon: Eye,
    description: 'Editor visual moderno'
  },
  {
    title: 'Analytics Principal',
    href: '/admin/analytics',
    icon: TrendingUp,
    description: 'Métricas completas'
  },
  {
    title: 'Analytics de Criativos',
    href: '/admin/creative-analytics',
    icon: PieChart,
    description: 'Performance por criativo'
  },
  {
    title: 'Testes A/B',
    href: '/admin/ab-tests',
    icon: Target,
    description: 'Gerenciador de testes'
  },
  {
    title: 'Métricas Rápidas',
    href: '/admin/quick-metrics',
    icon: Users,
    description: 'Dashboard resumido'
  },
  {
    title: 'Editor de Header',
    href: '/admin/header-editor',
    icon: Settings,
    description: 'Personalizar cabeçalho'
  }
];

export function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-64 bg-white border-r border-[#D4C4A0] h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#432818]">Admin Panel</h2>
        <p className="text-sm text-[#8F7A6A] mt-1">Dashboard de Métricas</p>
      </div>
      
      <nav className="px-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col gap-1 px-4 py-3 rounded-lg transition-colors group',
                isActive 
                  ? 'bg-[#B89B7A] text-white' 
                  : 'text-[#432818] hover:bg-[#F5F2E9]'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
                {item.href.includes('analytics') && (
                  <ExternalLink className="w-3 h-3 opacity-60" />
                )}
              </div>
              {item.description && (
                <span className={cn(
                  "text-xs ml-8 opacity-70",
                  isActive ? "text-white" : "text-[#8F7A6A]"
                )}>
                  {item.description}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Seção de Analytics em Destaque */}
      <div className="mx-4 mt-6 p-3 bg-[#F9F4EF] border border-[#D4C4A0] rounded-lg">
        <h3 className="text-sm font-semibold text-[#432818] mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Métricas Rápidas
        </h3>
        <div className="space-y-2 text-xs text-[#8F7A6A]">
          <div className="flex justify-between">
            <span>Funil Conversão:</span>
            <Link 
              to="/admin/analytics" 
              className="text-[#B89B7A] hover:underline"
            >
              Ver detalhes
            </Link>
          </div>
          <div className="flex justify-between">
            <span>UTM Tracking:</span>
            <Link 
              to="/admin/analytics" 
              className="text-[#B89B7A] hover:underline"
            >
              Campanhas
            </Link>
          </div>
          <div className="flex justify-between">
            <span>Performance:</span>
            <Link 
              to="/admin/creative-analytics" 
              className="text-[#B89B7A] hover:underline"
            >
              Criativos
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 px-4 w-64">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-[#B89B7A] hover:bg-[#F5F2E9] rounded-lg transition-colors"
        >
          <Eye className="w-5 h-5" />
          <span className="font-medium">Ver Site</span>
        </Link>
      </div>
    </div>
  );
}
