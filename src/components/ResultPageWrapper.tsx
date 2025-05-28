import React from 'react';
import { useParams } from 'react-router-dom';
import ResultPage from './ResultPage';

/**
 * Wrapper para a página de resultados que conecta com a rota do Next.js.
 * Este componente extrai o ID da URL e o passa para o componente ResultPage,
 * permitindo que funcione tanto no roteamento React Router quanto Next.js.
 */
const ResultPageWrapper: React.FC = () => {
  // Extrair o ID da URL se estiver presente
  const { id } = useParams<{ id?: string }>();
  
  // Log para debug
  console.log(`Renderizando ResultPageWrapper com ID: ${id || 'undefined'}`);
  
  return (
    <div data-lovable-component="ResultPageWrapper" data-lovable-editable="true">
      <ResultPage resultId={id} />
    </div>
  );
};

export default ResultPageWrapper;
