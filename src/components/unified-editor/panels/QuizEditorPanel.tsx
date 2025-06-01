
import React, { useState } from 'react';
import { useUnifiedEditor } from '@/hooks/useUnifiedEditor';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { toast } from '@/components/ui/use-toast';
import { QuizComponentType } from '@/types/quizBuilder';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/utils/idGenerator';

interface QuizEditorPanelProps {
  isPreviewing: boolean;
  onSave?: (questions: QuizQuestion[]) => void;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing, onSave }) => {
  // Pass a valid primary style to useUnifiedEditor
  const unifiedEditor = useUnifiedEditor({
    category: 'Natural',
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
        toast({
          title: "Funcionalidade incompleta",
          description: "A funcionalidade de adicionar componente ainda não está disponível.",
          variant: "destructive",
        });
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
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full border-l bg-white overflow-y-auto p-4">
          <h3 className="font-medium mb-4">Propriedades</h3>
          {/* Properties Panel */}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default QuizEditorPanel;
