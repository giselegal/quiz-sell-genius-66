"use client";
import React, { useEffect, useState } from 'react';
import { safeLocalStorage } from "@/utils/safeLocalStorage";
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { ContentContainer } from './shared/ContentContainer';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/OfferCard';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  previewMode?: boolean;
  onReset?: () => void;
}
const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles,
  previewMode = false,
  onReset
}) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  
  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
    } else {
      const storedName = safeLocalStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [user]);

  if (!primaryStyle || !secondaryStyles) {
    console.error('Missing required props:', { primaryStyle, secondaryStyles });
    return <div>Erro ao carregar os resultados. Por favor, refaça o quiz.</div>;
  }
  // Build custom title with user name
  const customTitle = `Olá, ${userName}, seu Estilo Predominante é:`;
  // Padrão visual original: apenas resultado principal, secundários e oferta
  // Para manter compatibilidade, passar um objeto vazio para config do OfferCard
  return (
    <div className="quiz-result-page min-h-screen bg-[#FAF9F7] text-[#432818]">
      <ContentContainer size="md">
        <ResultHeader userName={userName} customTitle={customTitle} />
        <div className="space-y-8">
          <PrimaryStyleCard primaryStyle={primaryStyle} />
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          <OfferCard primaryStyle={primaryStyle} config={{}} />
        </div>
      </ContentContainer>
    </div>
  );
};
export default QuizResult;
