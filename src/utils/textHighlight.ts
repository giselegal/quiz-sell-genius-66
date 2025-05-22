import React from 'react';

export const highlightStrategicWords = (text: string): React.ReactNode => {
  const strategicWords = [
    // Personal Growth & Transformation
    'transformar', 'evoluir', 'versão', 'autenticidade', 'experiência',
    'clareza', 'intenção', 'propósito', 'consciência', 'confiante',
    
    // Style & Image Related
    'imagem', 'estilo', 'presença', 'elegância', 'identidade',
    'combiná-las', 'looks', 'peças', 'roupas', 'guarda-roupa',
    
    // Emotional States
    'desconectada', 'dúvidas', 'segura', 'confiante', 'arrependo',
    'indecisão', 'limitada', 'impulso',
    
    // Quality & Value Words
    'autoridade', 'admirada', 'estilosa', 'exclusivo', 'estratégico',
    'prático', 'completa', 'perfeito', 'facilidade',
    
    // Key Concepts
    'investimento', 'resultado', 'experiência', 'material', 'compromisso',
    'escolhas', 'autenticidade', 'leveza',
    
    // Action Words
    'transformar', 'aplicar', 'comprar', 'vestir', 'montar',
    'criar', 'usar', 'valoriza', 'funciona'
  ];

  // Remove duplicates and sort by length (longer words first to prevent partial matches)
  const uniqueSortedWords = [...new Set(strategicWords)]
    .sort((a, b) => b.length - a.length);

  const pattern = new RegExp(`(${uniqueSortedWords.join('|')})`, 'gi');
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    if (uniqueSortedWords.some(word => part.toLowerCase() === word.toLowerCase())) {
      return React.createElement('strong', { 
        key: index, 
        className: 'text-[#432818] font-bold relative inline-block px-0.5' +  // Negrito para mais destaque
          ' after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px]' + // Linha decorativa mais grossa
          ' after:bg-[#b29670]/50 after:rounded-full' + // Cor da linha decorativa com mais opacidade
          ' text-[1.15em]' // Texto claramente maior que o resto
      }, part);
    }
    return part;
  });
};

