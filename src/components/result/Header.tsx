// src/components/result/Header.tsx

import React from 'react';
import { Crown } from 'lucide-react'; 
import { StyleResult } from '@/types/quiz'; 
import { useAuth } from '@/context/AuthContext'; 

interface HeaderProps {
  primaryStyle?: StyleResult; 
  logoHeight?: number;
  logo?: string;
  logoAlt?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  primaryStyle, 
  logoHeight = 50,
  logo,
  logoAlt = "Logo",
  userName 
}) => {
  const { user } = useAuth();
  const displayName = userName || user?.userName || 'Visitante';

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
      
      {/* MUDANÇAS AQUI: Negrito no nome e redução do tamanho da frase */}
      <h1 className="text-xl md:text-2xl font-playfair text-[#432818] leading-tight">
        Parabéns, <span className="font-bold">{displayName}</span>! {/* NOME AGORA COM 'font-bold' */}
        <br className="sm:hidden" /> 
        <span className="text-xl md:text-2xl text-[#aa6b5d]"> Seu Estilo Predominante é:</span> {/* DIMINUÍDO AQUI: text-xl md:text-2xl */}
      </h1>
      
    </header>
  );
};