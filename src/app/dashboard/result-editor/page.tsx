"use client";

import { useEffect, useState } from 'react';
import { EnhancedResultPageEditor } from '@/components/result-editor/EnhancedResultPageEditor';
import { StyleResult } from '@/types/quiz';
import { QuizFunnel } from '@/types/quizResult';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResultEditorPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [funnel, setFunnel] = useState<QuizFunnel | undefined>();
  
  // Exemplo de estilos para demonstração
  // Em um caso real, você carregaria esses dados de uma API
  const primaryStyle: StyleResult = {
    category: 'Clássico',
    percentage: 65
  };
  
  const secondaryStyles: StyleResult[] = [
    { category: 'Elegante', percentage: 25 },
    { category: 'Criativo', percentage: 10 }
  ];
  
  useEffect(() => {
    // Aqui você carregaria os dados reais do funil
    // Exemplo: fetchFunnelData(funnelId)
    
    // Simulando carregamento
    const timer = setTimeout(() => {
      // Dados de exemplo
      setFunnel({
        id: 'funnel-exemplo',
        name: 'Funil de Quiz de Estilo',
        quizQuestions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        // Se houver uma página de resultados existente, seria carregada aqui
      });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSaveFunnel = async (updatedFunnel: QuizFunnel) => {
    try {
      // Aqui você enviaria os dados para a API
      // Exemplo: await api.post('/funnels', updatedFunnel);
      console.log('Salvando dados do funil:', updatedFunnel);
      
      toast({
        title: "Página de resultados salva",
        description: "As alterações foram salvas com sucesso.",
      });
      
      // Atualizar o estado local
      setFunnel(updatedFunnel);
    } catch (error) {
      console.error('Erro ao salvar funil:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações. Tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Carregando editor...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Editor de Página de Resultados</h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-[calc(100vh-140px)]">
          <EnhancedResultPageEditor
            primaryStyle={primaryStyle}
            secondaryStyles={secondaryStyles}
            initialFunnel={funnel}
            onSave={handleSaveFunnel}
          />
        </div>
      </div>
    </div>
  );
}
