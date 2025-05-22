
import React from 'react';

export const highlightStrategicWords = (text: string): React.ReactNode => {
  if (!text) return '';
  
  // Palavras que queremos destacar
  const keywordsToHighlight = [
    'estilo pessoal',
    'imagem pessoal',
    'autoconfiança',
    'estilo',
    'roupas',
    'elegante',
    'confiança',
    'autêntica',
    'autenticidade',
    'personalidade',
    'transformação'
  ];
  
  // Se não temos palavras para destacar, retornamos o texto original
  if (keywordsToHighlight.length === 0) return text;
  
  // Função para verificar se uma palavra deve ser destacada
  const shouldHighlight = (word: string): boolean => {
    return keywordsToHighlight.some(keyword => 
      word.toLowerCase().includes(keyword.toLowerCase()));
  };
  
  // Quebrar o texto em partes para destacar palavras-chave
  const parts = text.split(' ');
  
  // Criar um array de elementos React
  const highlightedText = parts.map((part, index) => {
    // Verificar se este trecho deve ser destacado
    if (shouldHighlight(part)) {
      return (
        <span key={index} className="text-[#B89B7A] font-bold">
          {part}{index < parts.length - 1 ? ' ' : ''}
        </span>
      );
    }
    
    // Caso contrário, retornar o texto normal
    return <React.Fragment key={index}>{part}{index < parts.length - 1 ? ' ' : ''}</React.Fragment>;
  });
  
  return <>{highlightedText}</>;
};
