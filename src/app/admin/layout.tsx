'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Settings, 
  Palette,
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  ChevronDown,
  Code,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from '@/components/ui/dropdown-menu';
interface AdminLayoutProps {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin'
    },
    {
      name: 'Quizzes',
      href: '/admin/quizzes',
      icon: FileText,
      current: pathname?.startsWith('/admin/quizzes') || false
    },
    {
      name: 'Editor Visual',
      href: '/admin/editor',
      icon: Palette,
      current: pathname?.startsWith('/admin/editor') || false,
      badge: 'NOVO'
    },
    {
      name: 'Pixels & Tracking',
      href: '/admin/tracking',
      icon: Code,
      current: pathname?.startsWith('/admin/tracking') || false,
      badge: 'PRO'
    },
    {
      name: 'Conversões',
      href: '/admin/conversions',
      icon: TrendingUp,
      current: pathname?.startsWith('/admin/conversions') || false
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      current: pathname?.startsWith('/admin/analytics') || false
    },
    {
      name: 'Leads',
      href: '/admin/leads',
      icon: Users,
      current: pathname?.startsWith('/admin/leads') || false
    },
    {
      name: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
      current: pathname?.startsWith('/admin/settings') || false
    }
  ];
  return (
    <div className="min-h-screen bg-[#F5F2E9]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-20'} bg-[#432818] shadow-2xl transition-all duration-300`}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-[#5C3B2A]">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#B89B7A] to-[#D4C4A0] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-[#432818] font-bold text-lg">Q</span>
              </div>
              <div>
                <span className="font-bold text-xl text-[#F5F2E9]">Quiz</span>
                <span className="font-light text-lg text-[#B89B7A] ml-1">Admin</span>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#5C3B2A] text-[#B89B7A] hover:text-[#F5F2E9]"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                      ${item.current 
                        ? 'bg-[#B89B7A] text-[#432818] shadow-lg' 
                        : 'text-[#B89B7A] hover:bg-[#5C3B2A] hover:text-[#F5F2E9]'
                      }
                    `}
                  >
                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      item.current ? 'text-[#432818]' : 'text-[#B89B7A] group-hover:text-[#F5F2E9]'
                    }`} />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className={`ml-2 px-2 py-1 text-xs font-bold rounded-full shadow-md animate-pulse ${
                            item.badge === 'NOVO' 
                              ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#432818]' 
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Quick Actions */}
        {sidebarOpen && (
          <div className="absolute bottom-6 left-3 right-3">
            <div className="bg-gradient-to-br from-[#B89B7A] to-[#D4C4A0] rounded-xl p-4 text-[#432818] shadow-lg border border-[#D4C4A0]/30">
              <h3 className="font-bold text-sm mb-2">✨ Editor Visual</h3>
              <p className="text-xs opacity-80 mb-3 leading-relaxed">
                Crie quizzes incríveis com nosso editor drag & drop profissional!
              </p>
              <Link href="/admin/editor">
                <Button 
                  size="sm" 
                  className="w-full bg-[#432818] hover:bg-[#5C3B2A] text-[#F5F2E9] shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  🚀 Experimentar Agora
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-[#D4C4A0]/30 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B89B7A] w-4 h-4" />
              <Input
                placeholder="Buscar quizzes, resultados..."
                className="pl-10 bg-[#F5F2E9]/50 border-[#D4C4A0]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]/20 text-[#432818] placeholder:text-[#B89B7A]"
              />
            </div>
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative hover:bg-[#F5F2E9] text-[#432818]">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full shadow-md animate-pulse"></span>
              </Button>
              {/* User Info - Simplificado para desenvolvimento */}
              <div className="flex items-center gap-3 p-2">
                <Avatar className="w-8 h-8 ring-2 ring-[#B89B7A]/30">
                  <AvatarFallback className="bg-[#B89B7A] text-[#432818] font-bold">DV</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#432818]">Desenvolvedor</p>
                  <p className="text-xs text-[#B89B7A]">Acesso Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
