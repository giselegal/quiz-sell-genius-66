import React from 'react';

const ResultPageMinimal: React.FC = () => {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#fffaf7' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          🎉 Página de Resultado - Teste Mínimo
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Status da Página</h2>
          <p className="text-green-600 text-lg">✅ Página carregando corretamente!</p>
          <p className="text-gray-600 mt-2">
            Se você está vendo esta mensagem, o roteamento está funcionando.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">Diagnóstico</h3>
          <ul className="space-y-2">
            <li>✅ Componente React renderizando</li>
            <li>✅ Rota /resultado configurada</li>
            <li>✅ Estilos básicos aplicados</li>
            <li>✅ Sem erros de JavaScript</li>
          </ul>
        </div>

        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPageMinimal;
