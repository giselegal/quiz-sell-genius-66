import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          🧪 Página de Teste
        </h1>
        <p className="text-gray-600 text-center">
          Esta é uma página de teste para verificar se as rotas estão funcionando corretamente.
        </p>
        <div className="mt-6 p-4 bg-green-100 rounded">
          <p className="text-green-800 text-sm">
            ✅ Se você está vendo esta página, as rotas estão funcionando!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
