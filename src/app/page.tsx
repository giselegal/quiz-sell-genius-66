'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Removido o redirecionamento automático para permitir acesso manual
    // Os usuários podem acessar as diferentes seções através do painel
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#F5F2E9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#B89B7A] to-[#D4C4A0] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-[#432818] font-bold text-2xl">Q</span>
        </div>
        <h1 className="text-2xl font-bold text-[#432818] mb-2">Quiz Sell Genius</h1>
        <p className="text-[#B89B7A]">
          Sistema de criação de quizzes e páginas de vendas
        </p>
        
        {/* Links de navegação */}
        <div className="mt-6 space-y-3">
          <a 
            href="/admin" 
            className="block px-6 py-3 bg-[#B89B7A] text-white rounded-lg hover:bg-[#9F836A] transition-colors font-medium"
          >
            🎛️ Acessar Dashboard Administrativo
          </a>
          <a 
            href="/resultado" 
            className="block px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            👁️ Visualizar Página de Resultados
          </a>
        </div>
        
        {/* Debug info */}
        <div className="mt-6 text-xs text-[#B89B7A] opacity-70">
          <p>👤 Status: {user ? `Logado como ${user.userName}` : 'Usuário automático'}</p>
        </div>
      </div>
    </div>
  );
}
