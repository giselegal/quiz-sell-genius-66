"use client";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from 'react';
import { EnhancedResultPageEditor } from '@/components/result-editor/EnhancedResultPageEditor';
import { StyleResult } from '@/types/quiz';
import { QuizFunnel } from '@/types/quizResult';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResultEditorPage() {
  const { toast } = useToast();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizFunnel | undefined>(undefined);

  const mockResults: StyleResult[] = [
    { 
      category: 'Iniciante', 
      percentage: 40,
      score: 0,
      title: 'Você está começando!',
      description: 'Continue praticando para melhorar.',
      backgroundColor: '#f3f4f6',
      textColor: '#374151'
    },
    { 
      category: 'Intermediário', 
      percentage: 70,
      score: 50,
      title: 'Bom trabalho!',
      description: 'Você tem um conhecimento sólido.',
      backgroundColor: '#dbeafe',
      textColor: '#1e40af'
    },
    { 
      category: 'Avançado', 
      percentage: 90,
      score: 80,
      title: 'Excelente!',
      description: 'Você domina o assunto.',
      backgroundColor: '#dcfce7',
      textColor: '#166534'
    }
  ];

  useEffect(() => {
    const mockQuiz: QuizFunnel = {
      id: 'sample-quiz',
      name: 'Quiz de Exemplo',
      quizQuestions: [],
      resultPage: {
        title: 'Resultados do Quiz',
        results: mockResults
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setSelectedQuiz(mockQuiz);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">
                Editor de Página de Resultado
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedQuiz ? (
          <EnhancedResultPageEditor
            quiz={selectedQuiz}
            onSave={(updatedQuiz) => {
              setSelectedQuiz(updatedQuiz);
              toast({
                title: "Sucesso",
                description: "Página de resultado salva com sucesso!",
              });
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando editor...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
