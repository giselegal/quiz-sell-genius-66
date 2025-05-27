'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { DragDropEditor } from '@/components/result-editor/DragDropEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
export default function EditQuizPage() {
  const params = useParams();
  const quizId = params?.id as string;
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') || 'quiz';
  
  const [activeTab, setActiveTab] = useState<'quiz' | 'result' | 'offer'>(initialTab as any);
  const [savedConfigs, setSavedConfigs] = useState({
    quiz: null,
    result: null,
    offer: null
  });
  const [isLoading, setIsLoading] = useState(false);
  // Atualizar URL quando tab muda
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    window.history.replaceState({}, '', url.toString());
  }, [activeTab]);
  const handleSave = async (config: any, mode: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/quiz/${quizId}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...config, mode }),
      });
      if (response.ok) {
        console.log(`Configuração de ${mode} salva com sucesso!`);
        setSavedConfigs(prev => ({ ...prev, [mode]: config }));
        
        // Notificação de sucesso
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = `${mode.toUpperCase()} salvo com sucesso!`;
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      } else {
        throw new Error(`Erro ao salvar configuração de ${mode}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      
      // Notificação de erro
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = `Erro ao salvar ${mode}`;
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de Navegação */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-4">
              <Link href={`/dashboard/quizzes/${quizId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Painel
                </Button>
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-lg font-semibold">Editor Visual</h1>
            </div>
            {/* Tabs de Navegação */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="quiz" className="text-sm">
                  📝 Quiz
                </TabsTrigger>
                <TabsTrigger value="result" className="text-sm">
                  🎯 Resultado
                </TabsTrigger>
                <TabsTrigger value="offer" className="text-sm">
                  💰 Oferta
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {/* Status de Salvamento */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </div>
              )}
          </div>
        </div>
      </div>
      {/* Editor Content */}
      <Tabs value={activeTab} className="h-full">
        <TabsContent value="quiz" className="h-full m-0">
          <Suspense fallback={<LoadingSpinner />}>
            <DragDropEditor
              mode="quiz"
              quizId={quizId}
              onSave={(config) => handleSave(config, 'quiz')}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="result" className="h-full m-0">
          <Suspense fallback={<LoadingSpinner />}>
            <DragDropEditor
              mode="result"
              quizId={quizId}
              onSave={(config) => handleSave(config, 'result')}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="offer" className="h-full m-0">
          <Suspense fallback={<LoadingSpinner />}>
            <DragDropEditor
              mode="offer"
              quizId={quizId}
              onSave={(config) => handleSave(config, 'offer')}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${savedConfigs.quiz ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Quiz</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${savedConfigs.result ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Resultado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${savedConfigs.offer ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Oferta</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              👁️ Preview Completo
            </Button>
            <Button 
              size="sm"
              disabled={!savedConfigs.quiz || !savedConfigs.result}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              🚀 Publicar Tudo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
