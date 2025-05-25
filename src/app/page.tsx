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
    // Verificar se há um quiz público para mostrar
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    const adminParam = urlParams.get('admin');
    
    // Redirecionar automaticamente para o novo editor
    const redirectToEditor = () => {
      setRedirecting(true);
      router.push('/admin/editor');
    };

    // Aguardar um momento para mostrar o loading
    const timer = setTimeout(redirectToEditor, 800);

    return () => clearTimeout(timer);
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#F5F2E9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#B89B7A] to-[#D4C4A0] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-[#432818] font-bold text-2xl">Q</span>
        </div>
        <h1 className="text-2xl font-bold text-[#432818] mb-2">Quiz Sell Genius</h1>
        <p className="text-[#B89B7A]">
          {redirecting ? 'Redirecionando para o Editor Visual...' : 'Carregando editor visual...'}
        </p>
        
        {/* Debug info */}
        <div className="mt-4 text-xs text-[#B89B7A] opacity-70">
          <p>🎯 Destino: /admin/editor (Editor Visual)</p>
          <p>👤 Status: {user ? `Logado como ${user.userName}` : 'Usuário automático'}</p>
          {redirecting && <p>⏳ Redirecionando...</p>}
        </div>
      </div>
    </div>
  );
}
