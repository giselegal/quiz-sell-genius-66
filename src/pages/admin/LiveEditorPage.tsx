
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LiveQuizEditor from '@/components/live-editor/LiveQuizEditor';
import { useLiveEditor } from '@/hooks/useLiveEditor';

const LiveEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadEditor, stages, addStage } = useLiveEditor();

  useEffect(() => {
    // Carregar editor salvo
    loadEditor();
    
    // Se não houver etapas, criar uma introdução padrão
    if (stages.length === 0) {
      addStage({
        id: 'intro-1',
        name: 'Introdução do Quiz',
        type: 'intro',
        order: 0,
        components: [],
        settings: {}
      });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header com navegação */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
              className="text-[#432818] hover:text-[#B89B7A]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Admin
            </Button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <h1 className="text-xl font-bold text-[#432818]">
              Editor Visual ao Vivo
            </h1>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <LiveQuizEditor />
      </div>
    </div>
  );
};

export default LiveEditorPage;
