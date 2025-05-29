
'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  Palette,
  Eye,
  Target,
  Code,
  ChevronDown,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: BarChart3
  },
  {
    title: 'Quiz Editor',
    href: '/admin/quiz-editor',
    icon: Palette
  },
  {
    title: 'Páginas',
    href: '/admin/pages',
    icon: FileText
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    submenu: [
      {
        title: 'Visão Geral',
        href: '/admin/analytics',
        icon: BarChart3
      },
      {
        title: 'Análise de Criativos',
        href: '/admin/analytics/criativos',
        icon: TrendingUp
      }
    ]
  },
  {
    title: 'Leads',
    href: '/admin/leads',
    icon: Users
  },
  {
    title: 'Pixels & Tracking',
    href: '/admin/tracking',
    icon: Code
  },
  {
    title: 'Testes A/B',
    href: '/admin/ab-tests',
    icon: Target
  },
  {
    title: 'Configurações',
    href: '/admin/settings',
    icon: Settings
  }
];

export function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);

  // Auto-expandir menu se uma subrota estiver ativa
  React.useEffect(() => {
    sidebarItems.forEach(item => {
      if (item.submenu && item.submenu.some(sub => pathname === sub.href)) {
        if (!expandedMenus.includes(item.href)) {
          setExpandedMenus(prev => [...prev, item.href]);
        }
      }
    });
  }, [pathname, expandedMenus]);

  const toggleMenu = (href: string) => {
    setExpandedMenus(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  return (
    <div className="w-64 bg-white border-r border-[#D4C4A0] h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#432818]">Admin Panel</h2>
      </div>
      
      <nav className="px-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isExpanded = expandedMenus.includes(item.href);
          const hasActiveSubmenu = hasSubmenu && item.submenu.some(sub => pathname === sub.href);
          
          return (
            <div key={item.href}>
              {hasSubmenu ? (
                <button
                  onClick={() => toggleMenu(item.href)}
                  className={cn(
                    'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors',
                    (isActive || hasActiveSubmenu) 
                      ? 'bg-[#B89B7A] text-white' 
                      : 'text-[#432818] hover:bg-[#F5F2E9]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-[#B89B7A] text-white' 
                      : 'text-[#432818] hover:bg-[#F5F2E9]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              )}
              
              {hasSubmenu && isExpanded && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = pathname === subItem.href;
                    
                    return (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm',
                          isSubActive 
                            ? 'bg-[#D4C4A0] text-[#432818] font-medium' 
                            : 'text-[#8F7A6A] hover:bg-[#F5F2E9] hover:text-[#432818]'
                        )}
                      >
                        <SubIcon className="w-4 h-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
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
