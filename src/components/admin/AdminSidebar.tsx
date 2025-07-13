
'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Palette,
  Eye,
  Target,
  Code,
  TrendingUp,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home
  },
  {
    title: 'Quiz',
    href: '/admin/quiz',
    icon: Palette
  },
  {
    title: 'Testes A/B',
    href: '/admin/ab-tests',
    icon: Target
  },
  {
    title: 'Configurações',
    href: '/admin/settings',
    icon: Settings,
    description: 'Pixel, UTM, URL, Tokens API'
  },
  {
    title: 'Criativos',
    href: '/admin/criativos',
    icon: TrendingUp
  },
  {
    title: 'Análise de Métricas',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'Editor',
    href: '/admin/editor',
    icon: Code
  }
];

export function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-64 bg-white border-r border-[#D4C4A0] h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#432818]">Admin Panel</h2>
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
                'flex flex-col gap-1 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-[#B89B7A] text-white' 
                  : 'text-[#432818] hover:bg-[#F5F2E9]'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </div>
              {item.description && (
                <span className={cn(
                  "text-xs ml-8",
                  isActive ? "text-white/70" : "text-[#8F7A6A]"
                )}>
                  {item.description}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      
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
