
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'funil1';

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
                className={`px-4 py-2 rounded-md ${tab === 'funil1' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=funil1'}
              >
                Funil 1 (/resultado)
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${tab === 'funil2' ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
                onClick={() => window.location.href = '/admin/editor?tab=funil2'}
              >
                Funil 2 (/quiz-descubra-seu-estilo)
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <div className="text-center py-8">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Editor {tab === 'funil1' ? 'de Resultado' : 'de Oferta'}
              </h2>
              <p className="text-gray-600">
                {tab === 'funil1' 
                  ? 'Configure a página de resultados do quiz'
                  : 'Configure a página de oferta com quiz'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
