
import React, { useState } from 'react';
import { useUnifiedEditor } from '@/hooks/useUnifiedEditor';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { toast } from '@/components/ui/use-toast';
import { QuizComponentType } from '@/types/quizBuilder';
interface QuizEditorPanelProps {
  isPreviewing: boolean;
}
const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing }) => {
  // Pass a default primaryStyle to useUnifiedEditor to satisfy the parameter requirement
  const unifiedEditor = useUnifiedEditor({
    category: 'default',
    score: 0,
    percentage: 0
  });
  
  // Access properties from quizBuilder instead of directly
  const { quizBuilder } = unifiedEditor;
  // For tracking active stage type (moved from root level)
  const [activeStageType, setActiveStageType] = useState<string | null>(null);
  const handleComponentSelect = (type: QuizComponentType) => {
    try {
      // Call an appropriate method from quizBuilder
      if (quizBuilder && typeof quizBuilder.addComponent === 'function') {
        quizBuilder.addComponent(type);
        toast({
          title: "Componente adicionado",
          description: `Um novo componente do tipo ${type} foi adicionado ao editor.`,
        });
      } else {
        console.error("Method addComponent not found on quizBuilder");
          title: "Funcionalidade incompleta",
          description: "A funcionalidade de adicionar componente ainda não está disponível.",
          variant: "destructive",
      }
    } catch (error) {
      console.error("Error adding component:", error);
      toast({
        title: "Erro ao adicionar componente",
        description: "Não foi possível adicionar o componente. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-r bg-white overflow-y-auto">
          <UnifiedComponentsSidebar 
            onComponentSelect={handleComponentSelect} 
            activeTab="quiz"
            activeStageType={activeStageType}
          />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55}>
        <div className="h-full bg-[#FAF9F7] p-4 overflow-y-auto">
          {/* Quiz Editor Preview/Editing Area */}
          <div className="bg-white rounded-lg shadow-sm min-h-full p-6">
            {/* Your quiz editor component goes here */}
            <p>Quiz Editor Content</p>
            {unifiedEditor.quizBuilder && unifiedEditor.quizBuilder.components && (
              <div>
                <p>Number of components: {unifiedEditor.quizBuilder.components.length}</p>
              </div>
            )}
          </div>
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full border-l bg-white overflow-y-auto p-4">
          <h3 className="font-medium mb-4">Propriedades</h3>
          {/* Properties Panel */}
    </ResizablePanelGroup>
  );
};
export default QuizEditorPanel;
