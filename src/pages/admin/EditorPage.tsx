import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'quiz';

  // Componente de editor simplificado
  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)] p-4 bg-white">
        <div className="flex flex-col h-full border rounded-lg shadow-sm">
          <div className="border-b p-4 bg-gray-50 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Editor Unificado</h1>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Salvar
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                Visualizar
              </button>
            </div>
          </div>
          
          <div className="p-2 border-b bg-white">
            <div className="flex space-x-1">
              <button 
                className={`px-4 py-2 rounded-md ${tabParam === 'quiz' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=quiz'}
              >
                Quiz
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${tabParam === 'result' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=result'}
              >
                Resultado (Legado)
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${tabParam === 'sales' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=sales'}
              >
                Página de Vendas (Legado)
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${tabParam === 'funil1' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=funil1'}
              >
                Funil 1 (/resultado)
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${tabParam === 'funil2' ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=funil2'}
              >
                Funil 2 (/quiz-descubra-seu-estilo)
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            {tabParam === 'quiz' && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Editor de Quiz</h2>
                  <p className="text-gray-600">Este é o novo editor simplificado para o Quiz</p>
                </div>
              </div>
            )}
            
            {tabParam === 'result' && (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Editor Avançado de Resultados (Legado)</h2>
                  <p className="text-gray-600 mb-4">Use o editor avançado legado para personalizar completamente a página de resultados.</p>
                  <button 
                    onClick={() => window.location.href = '/resultado/editor'} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Abrir Editor de Resultados
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Obs: Se o editor não abrir, execute o script <code>acesso-editor-producao.js</code> no console e tente novamente.
                  </p>
                </div>
              </div>
            )}
            
            {tabParam === 'sales' && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Editor de Página de Vendas (Legado)</h2>
                  <p className="text-gray-600">Este é o editor legado para a página de Vendas.</p>
                </div>
              </div>
            )}

            {tabParam === 'funil1' && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-green-300 rounded-lg bg-green-50">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2 text-green-700">Editor Funil 1 (/resultado)</h2>
                  <p className="text-gray-600">Editor para a página de resultados (Teste A/B).</p>
                  {/* Futuramente: Componente de editor para ResultPage.tsx */}
                </div>
              </div>
            )}

            {tabParam === 'funil2' && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-purple-300 rounded-lg bg-purple-50">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2 text-purple-700">Editor Funil 2 (/quiz-descubra-seu-estilo)</h2>
                  <p className="text-gray-600">Editor para a página de oferta do quiz (Teste A/B).</p>
                  {/* Futuramente: Componente de editor para QuizOfferPage.tsx */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;