
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ResultPageEditor = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Editor da Página de Resultado</h2>
        <p className="text-gray-600">Configure a página que exibe os resultados do quiz</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Resultado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Resultado
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descobrimos Seu Estilo Predominante"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Resultado
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Agora você tem clareza total sobre quem você é e como expressar sua personalidade"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto da Oferta
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Descubra seu guia completo de estilo personalizado"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Preview da página de resultado aparecerá aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPageEditor;
