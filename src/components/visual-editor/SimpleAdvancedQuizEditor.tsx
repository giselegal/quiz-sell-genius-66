import React from "react";

// Componente simplificado para teste
const SimpleAdvancedQuizEditor: React.FC = () => {
  console.log("SimpleAdvancedQuizEditor está renderizando!");
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Advanced Quiz Editor</h1>
        <p className="text-lg text-zinc-300 mb-4">
          Editor está carregando corretamente!
        </p>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Status do Sistema:</h2>
          <ul className="space-y-2 text-zinc-300">
            <li>✅ React component carregado</li>
            <li>✅ Styling aplicado</li>
            <li>✅ Rota funcionando</li>
          </ul>
        </div>
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
          <p className="text-blue-300">
            Se você está vendo esta mensagem, o sistema de roteamento está funcionando corretamente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdvancedQuizEditor;
