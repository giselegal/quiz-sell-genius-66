import React from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '../../components/admin/AdminLayout';
import QuizOfferPageEditor from './editors/QuizOfferPageEditor';
import ResultPageEditor from './editors/ResultPageEditor';

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  // Define 'funil2' como padrão se nenhuma aba for especificada ou se a aba for inválida
  const validTabs = ['funil1', 'funil2'];
  let tabParam = searchParams.get('tab');
  if (!tabParam || !validTabs.includes(tabParam)) {
    tabParam = 'funil2'; 
    // Opcional: Adicionar lógica para atualizar a URL se desejar que a aba padrão reflita na URL
    // Ex: window.history.replaceState(null, '', `/admin/editor?tab=${tabParam}`);
  }

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)] p-4 bg-white">
        <div className="flex flex-col h-full border rounded-lg shadow-sm">
          <div className="border-b p-4 bg-gray-50 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Editor Unificado</h1>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 opacity-50 cursor-not-allowed" title="Funcionalidade de salvar global pendente">
                Salvar (Global)
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 opacity-50 cursor-not-allowed" title="Funcionalidade de visualizar global pendente">
                Visualizar (Global)
              </button>
            </div>
          </div>
          
          <div className="p-2 border-b bg-white">
            <div className="flex space-x-1">
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
            {tabParam === 'funil1' && (
              <ResultPageEditor />
            )}

            {tabParam === 'funil2' && (
              <QuizOfferPageEditor />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;