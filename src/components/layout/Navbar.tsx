import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAdmin, hasEditorAccess } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo e Nome do Site */}
          <div className="text-xl font-bold text-gray-800">
            <Link href="/">SeuSite</Link>
          </div>
          
          {/* Links da Navbar */}
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Início</Link>
            <Link href="/sobre" className="text-gray-600 hover:text-gray-900">Sobre</Link>
            <Link href="/contato" className="text-gray-600 hover:text-gray-900">Contato</Link>
          {/* Link direto para o admin - sem autenticação */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/admin" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Admin
            </Link>
            
              href="/admin/editor" 
              className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              Editor
        </div>
      </div>
    </nav>
  );
};
