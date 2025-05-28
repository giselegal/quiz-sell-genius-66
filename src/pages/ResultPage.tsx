
"use client";

import React from 'react';
import { useLocation } from 'react-router-dom';
import { ResultPage as ResultPageComponent } from '@/components/ResultPage';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as any;
  
  // Usar dados passados via navegação ou valores padrão
  const primaryStyle = state?.primaryStyle || { category: 'Elegante', percentage: 85 };
  const secondaryStyles = state?.secondaryStyles || [];

  return (
    <ResultPageComponent 
      primaryStyle={primaryStyle}
      secondaryStyles={secondaryStyles}
    />
  );
};

export default ResultPage;
