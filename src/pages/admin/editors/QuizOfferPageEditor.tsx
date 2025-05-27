
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const QuizOfferPageEditor = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Editor da Página de Oferta do Quiz</h2>
        <p className="text-gray-600">Configure a página que antecede o quiz principal</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Página de Oferta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Principal
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descubra Seu Estilo Único"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Faça nosso quiz personalizado e descubra qual estilo combina perfeitamente com você"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto do Botão CTA
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Começar Quiz Agora"
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
            <p className="text-gray-500">Preview da página de oferta aparecerá aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizOfferPageEditor;
