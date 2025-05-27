
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const QuizEditorPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Editor de Quiz</h1>
        <p className="text-gray-600">Configure as perguntas e opções do seu quiz</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Quiz
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Quiz de Estilo Pessoal"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Descubra qual estilo combina perfeitamente com sua personalidade"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizEditorPage;
