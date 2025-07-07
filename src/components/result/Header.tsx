// src/components/result/Header.tsx

import React from 'react';
import { Crown } from 'lucide-react'; // Embora não seja usada neste snippet, mantive por estar no seu arquivo original
import { StyleResult } from '@/types/quiz'; // Ainda é necessário se `primaryStyle` for passado como prop para outros componentes do Header, mas se não for usado aqui, podemos remover.
import { useAuth } from '@/context/AuthContext'; // Certifique-se de que este import está correto

interface HeaderProps {
  primaryStyle?: StyleResult; // Mantém como opcional caso outros componentes ainda usem
  logoHeight?: number;
  logo?: string;
  logoAlt?: string;
  userName?: string;
  // Outras props que você possa ter adicionado ou que já existiam
}

export const Header: React.FC<HeaderProps> = ({
  primaryStyle, // Mantemos primaryStyle aqui caso ele seja útil para outras lógicas ou passe para outros componentes internos do Header
  logoHeight = 50,
  logo,
  logoAlt = "Logo",
  userName // Usaremos este se fornecido, senão o do contexto
}) => {
  // Obter userName do contexto AuthContext se não fornecido como prop
  const { user } = useAuth();
  const displayName = userName || user?.userName || 'Visitante'; // 'Visitante' como fallback

  return (
    <header className="py-6 px-4 md:px-8 text-center relative z-20">
      {logo && (
        <img
          src={logo}
          alt={logoAlt}
          className="mx-auto mb-4"
          style={{ height: `${logoHeight}px` }}
        />
      )}
      
      {/* MUDANÇA PRINCIPAL AQUI: Reorganizando o texto e elementos */}
      <h1 className="text-xl md:text-2xl font-playfair text-[#432818] leading-tight">
        Parabéns, <span className="font-medium">{displayName}</span>!
        <br className="sm:hidden" /> {/* Quebra de linha no mobile para "descobrimos..." */}
        <span className="text-3xl md:text-4xl text-[#aa6b5d]"> Seu Estilo Predomiante é:!</span>
      </h1>
      
      {/* Opcional: Se primaryStyle for importante para o contexto, mas não exibido diretamente */}
      {/* REMOVIDO: A exibição de primaryStyle.category e o h2 completo que o continha */}
    </header>
  );
};