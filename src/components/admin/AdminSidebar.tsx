
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  Palette,
  Eye,
  Target,
  Code
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
    icon: BarChart3
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
  const pathname = usePathname();

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
              href={item.href}
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
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 px-4 w-64">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-[#B89B7A] hover:bg-[#F5F2E9] rounded-lg transition-colors"
        >
          <Eye className="w-5 h-5" />
          <span className="font-medium">Ver Site</span>
        </Link>
      </div>
    </div>
  );
}
