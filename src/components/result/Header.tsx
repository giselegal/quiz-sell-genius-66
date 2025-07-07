// src/components/result/Header.tsx

import React from 'react';
import { Crown } from 'lucide-react'; // Embora não seja usada neste snippet, mantive por estar no seu arquivo original
import { StyleResult } from '@/types/quiz'; // Ainda é necessário se `primaryStyle` for passado como prop para outros componentes do Header, mas se não for usado aqui, podemos remover.

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
  userName = "Querida"
}) => {
  // ... o restante do seu código Header.tsx (por exemplo, uso do useAuth para userName)

  // Se você usa o `userName` do contexto AuthContext no Header:
  // const { user } = useAuth();
  // const displayName = userName || user?.userName || 'Visitante';

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
      <h1 className="text-3xl md:text-4xl font-playfair text-[#aa6b5d] leading-tight">
        Descobrimos seu <span className="font-bold">Estilo de Ser!</span> {/* Texto genérico */}
      </h1>
      {userName && ( // Ou `displayName` se estiver usando o contexto
        <p className="text-xl md:text-2xl text-[#432818] mt-2">Olá, {userName}!</p>
      )}
      {/* REMOVIDO: A exibição de primaryStyle.category e o h2 completo que o continha */}
      {/*
      {primaryStyle && (
        <h2 className="font-bold text-[#B89B7A] mt-2 text-2xl">
          {primaryStyle.category}
        </h2>
      )}
      */}
    </header>
  );
};