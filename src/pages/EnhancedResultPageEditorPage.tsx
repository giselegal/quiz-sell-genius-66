import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { VisualEditor } from '@/components/result-editor/VisualEditor';

const EnhancedResultPageEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { primaryStyle, secondaryStyles } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);
  
  // Carregar o funil do localStorage se existir
  const [initialFunnel, setInitialFunnel] = useState<any>(null);
  
  useEffect(() => {
    try {
      const savedFunnel = localStorage.getItem('currentQuizFunnel');
      if (savedFunnel) {
        setInitialFunnel(JSON.parse(savedFunnel));
      }
    } catch (error) {
      console.error('Erro ao carregar o funil:', error);
    }
  }, []);
  
  // Função para salvar o funil
  const handleSaveFunnel = (funnel: any) => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('currentQuizFunnel', JSON.stringify(funnel));
      
      toast({
        title: "Configurações salvas",
        description: "As configurações da página de resultado foram salvas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar o funil:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // SUBSTITUIR TemporaryEditor por VisualEditor
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="border-b bg-white p-4 flex items-center justify-between shadow-sm">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/admin')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Button>
        <h1 className="text-xl font-semibold text-[#432818]">Editor da Página de Resultado</h1>
        <div className="text-sm text-gray-500">
          Editor Visual Completo
        </div>
      </div>
      
      <VisualEditor
        onSave={handleSaveFunnel}
        initialFunnel={initialFunnel}
      />
    </div>
  );
};

export default EnhancedResultPageEditorPage;