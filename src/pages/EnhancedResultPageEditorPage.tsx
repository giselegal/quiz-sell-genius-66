import React, { useState, useEffect } from 'react';
// Remover import do componente que não existe
// import { EnhancedResultPageEditor } from '@/components/result-editor/EnhancedResultPageEditor';
import { useQuiz } from '@/hooks/useQuiz';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Palette } from 'lucide-react';

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
  
  // COMPONENTE TEMPORÁRIO enquanto o editor real não existe
  const TemporaryEditor = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center mb-4">
          <Palette className="h-6 w-6 text-blue-500 mr-3" />
          <h2 className="text-xl font-semibold">Editor Enhanced - Em Desenvolvimento</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Status do Editor</h3>
            <p className="text-blue-700 text-sm">
              O componente EnhancedResultPageEditor ainda não foi implementado.
              Este é um placeholder temporário.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Dados Carregados:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Primary Style: {primaryStyle ? '✅ Carregado' : '❌ Não carregado'}</li>
                <li>• Secondary Styles: {secondaryStyles?.length ? `✅ ${secondaryStyles.length} estilos` : '❌ Nenhum'}</li>
                <li>• Funil Salvo: {initialFunnel ? '✅ Encontrado' : '❌ Não encontrado'}</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Próximos Passos:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. Criar componente EnhancedResultPageEditor</li>
                <li>2. Implementar interface de edição</li>
                <li>3. Conectar com dados do quiz</li>
                <li>4. Salvar alterações</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/resultado')} 
              variant="outline"
            >
              Ver Página Atual
            </Button>
            <Button 
              onClick={() => handleSaveFunnel({ test: 'data' })}
              disabled={isLoading}
            >
              Testar Salvamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
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
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => handleSaveFunnel({ timestamp: Date.now() })}
          className="gap-2 bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
      
      <div className="p-4">
        <TemporaryEditor />
      </div>
    </div>
  );
};

export default EnhancedResultPageEditorPage;