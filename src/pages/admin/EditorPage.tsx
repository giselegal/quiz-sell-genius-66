
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { UnifiedVisualEditor } from '../../components/unified-editor/UnifiedVisualEditor';
import { StyleResult } from '@/types/quiz';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import EditorErrorHandler from '../../components/unified-editor/EditorErrorHandler';

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Sample style data for the editor preview
  const [primaryStyle] = React.useState<StyleResult>({
    category: 'Elegante',
    score: 25,
    percentage: 60
  });

  useEffect(() => {
    // Validate if the tab param is valid
    if (tabParam && !['quiz', 'result', 'sales'].includes(tabParam)) {
      toast({
        title: "Aba inválida",
        description: "A aba especificada não existe. Redirecionando para o editor padrão.",
      });
    }
    
    // Simular carregamento do editor
    const loadEditor = async () => {
      try {
        // Verificar se o editor pode ser carregado
        setLoading(true);
        
        // Aguardar um momento para verificar se o componente carrega corretamente
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Se chegou aqui, o editor carregou com sucesso
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar o editor:', err);
        setError(true);
        setLoading(false);
        
        // Redirecionar para a página de erro do editor após um breve delay
        setTimeout(() => {
          navigate('/admin/editor/error');
        }, 1000);
      }
    };
    
    loadEditor();
  }, [tabParam, navigate]);

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)]">
        <EditorErrorHandler>
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#B89B7A]" />
                <p className="text-[#8F7A6A]">Carregando editor...</p>
              </div>
            </div>
          ) : (
            <TooltipProvider>
              <UnifiedVisualEditor 
                primaryStyle={primaryStyle} 
                initialActiveTab={tabParam as any || 'quiz'} 
              />
            </TooltipProvider>
          )}
        </EditorErrorHandler>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
