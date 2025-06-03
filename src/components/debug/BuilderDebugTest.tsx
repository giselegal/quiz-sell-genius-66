// Test component para verificar se o Builder.io está carregando
import React from 'react';
import { useBuilderContent } from '@/hooks/useBuilderContent';

const BuilderDebugTest: React.FC = () => {
  const { 
    content, 
    loading, 
    error, 
    isBuilderVersion 
  } = useBuilderContent({
    model: 'resultado-page',
    enableAbTesting: true,
    fallbackToOriginal: true
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px' }}>
      <h3>Debug Builder.io Hook</h3>
      <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
      <p><strong>Error:</strong> {error || 'null'}</p>
      <p><strong>Content:</strong> {content ? 'exists' : 'null'}</p>
      <p><strong>Is Builder Version:</strong> {isBuilderVersion ? 'true' : 'false'}</p>
      
      {loading && <p>🔄 Carregando conteúdo Builder.io...</p>}
      {error && <p style={{color: 'red'}}>❌ Erro: {error}</p>}
      {!loading && !content && !error && <p>✅ Fallback deve ser usado</p>}
      {content && <p>✅ Conteúdo Builder.io carregado</p>}
    </div>
  );
};

export default BuilderDebugTest;
