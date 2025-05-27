
'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Eye, Edit, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function QuizEditorPage() {
  const quizzes = [
    {
      id: 1,
      title: 'Quiz de Estilo Pessoal',
      status: 'ativo',
      responses: 1234,
      conversions: 58,
      rate: 4.7,
      lastModified: '2 horas atrás'
    },
    {
      id: 2,
      title: 'Quiz de Liderança',
      status: 'rascunho',
      responses: 0,
      conversions: 0,
      rate: 0,
      lastModified: '1 dia atrás'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Editor de Quiz</h1>
          <p className="text-[#B89B7A] mt-1">Crie e gerencie seus quizzes</p>
        </div>
        
        <Button className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
          <Plus className="w-4 h-4 mr-2" />
          Novo Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#432818]">{quiz.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  quiz.status === 'ativo' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {quiz.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-[#B89B7A]">
                <div className="flex justify-between">
                  <span>Respostas:</span>
                  <span>{quiz.responses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversões:</span>
                  <span>{quiz.conversions}</span>
                </div>
                {quiz.rate > 0 && (
                  <div className="flex justify-between">
                    <span>Taxa:</span>
                    <span className="text-green-600">{quiz.rate}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Modificado:</span>
                  <span>{quiz.lastModified}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
