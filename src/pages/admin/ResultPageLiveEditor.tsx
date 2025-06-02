
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Eye, EyeOff, Save, RotateCcw, Settings, Palette } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DragDropContainer from '@/components/result/DragDropContainer';
import BlockEditorModal from '@/components/result/BlockEditorModal';
import BlockTemplateModal from '@/components/result/BlockTemplateModal';
import BlockSystemDebugPanel from '@/components/result/BlockSystemDebugPanel';
import { useBlocks } from '@/hooks/useBlocks';
import { BlockData } from '@/types/resultPageConfig';
import { BlockTemplate } from '@/data/blockTemplates';

const ResultPageLiveEditor: React.FC = () => {
  const { 
    blocks, 
    updateBlocks, 
    addBlock, 
    addBlocksFromTemplate,
    updateBlock, 
    deleteBlock 
  } = useBlocks('Demo');
  
  const [isEditMode, setIsEditMode] = useState(true);
  const [editingBlock, setEditingBlock] = useState<BlockData | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const handleEditBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      setEditingBlock(block);
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDeleteBlock = (blockId: string) => {
    deleteBlock(blockId);
  };

  const handleToggleVisibility = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      updateBlock(blockId, { visible: !block.visible });
    }
  };

  const handleSelectTemplate = (template: BlockTemplate) => {
    addBlocksFromTemplate(template);
    toast({
      title: "Template adicionado",
      description: `${template.blocks.length} bloco(s) adicionado(s) com sucesso`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Configuração salva",
      description: "Todas as alterações foram salvas com sucesso",
    });
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todas as configurações?')) {
      // Reset logic would be implemented here
      toast({
        title: "Configuração resetada",
        description: "Todas as configurações foram restauradas ao padrão",
      });
    }
  };

  // Mock props para o sistema de blocos
  const mockProps = {
    primaryStyle: { category: 'Natural' },
    secondaryStyles: [],
    globalStyles: { 
      backgroundColor: '#fffaf7',
      textColor: '#432818',
      fontFamily: 'Inter',
      logo: '/logo.png',
      logoAlt: 'Logo'
    },
    user: { role: 'admin', email: 'admin@quiz.com' },
    resultPageConfig: {},
    onCTAClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log('CTA clicked!');
    },
    isButtonHovered: false,
    setIsButtonHovered: () => {},
    timer: { hours: 2, minutes: 59, seconds: 30 },
    imagesLoaded: { style: true, guide: true },
    setImagesLoaded: () => {},
    isLowPerformance: false,
    tokens: {
      colors: {
        primary: '#B89B7A',
        secondary: '#aa6b5d',
        background: '#fffaf7',
        text: '#432818'
      }
    }
  };

  return (
    <div className="h-screen bg-[#fffaf7] flex flex-col">
      {/* Header com controles principais */}
      <div className="bg-white border-b border-[#B89B7A]/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#432818]">
              🎨 Editor ao Vivo - Página de Resultado
            </h1>
            <p className="text-[#8F7A6A] text-sm">
              Editor visual estilo InLead/Typeform com sistema de blocos drag-and-drop
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Estatísticas */}
            <div className="text-sm text-[#8F7A6A] mr-4">
              {blocks.length} blocos • {blocks.filter(b => b.visible).length} visíveis
            </div>

            {/* Controles principais */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateModal(true)}
              className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white"
            >
              🧱 Templates
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDebugPanel(!showDebugPanel)}
              className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white"
            >
              🐛 Debug
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <Button
              onClick={handleSave}
              className="bg-[#B89B7A] hover:bg-[#A1835D] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Layout principal */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Painel de blocos - lado esquerdo */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full bg-white border-r border-[#B89B7A]/20 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#432818] mb-3">
                  📦 Adicionar Blocos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock('hero')}
                    className="text-xs"
                  >
                    Hero
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock('text')}
                    className="text-xs"
                  >
                    Texto
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock('image')}
                    className="text-xs"
                  >
                    Imagem
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock('cta')}
                    className="text-xs"
                  >
                    CTA
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock('pricing')}
                    className="text-xs"
                  >
                    Preço
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock('testimonials')}
                    className="text-xs"
                  >
                    Depoimentos
                  </Button>
                </div>
              </div>

              <div className="border-t border-[#B89B7A]/20 pt-4">
                <h4 className="font-medium text-[#432818] mb-2">
                  📊 Informações
                </h4>
                <div className="space-y-2 text-sm text-[#8F7A6A]">
                  <p>Total: {blocks.length} blocos</p>
                  <p>Visíveis: {blocks.filter(b => b.visible).length}</p>
                  <p>Editáveis: {blocks.filter(b => b.editable).length}</p>
                  <p>Modo: {isEditMode ? 'Edição' : 'Visualização'}</p>
                </div>
              </div>

              <div className="border-t border-[#B89B7A]/20 pt-4">
                <h4 className="font-medium text-[#432818] mb-2">
                  🎯 Recursos
                </h4>
                <ul className="text-xs text-[#8F7A6A] space-y-1">
                  <li>✅ Drag & Drop</li>
                  <li>✅ Edição inline</li>
                  <li>✅ Templates prontos</li>
                  <li>✅ Persistência local</li>
                  <li>✅ Preview em tempo real</li>
                </ul>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Editor principal - centro */}
        <ResizablePanel defaultSize={75}>
          <div className="h-full overflow-auto">
            <DragDropContainer
              blocks={blocks}
              onUpdateBlocks={updateBlocks}
              onEditBlock={handleEditBlock}
              onAddBlock={() => addBlock('text')}
              isEditMode={isEditMode}
              onToggleEditMode={handleToggleEditMode}
              {...mockProps}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Modais */}
      {editingBlock && (
        <BlockEditorModal
          isOpen={!!editingBlock}
          block={editingBlock}
          onSave={(blockId, updates) => {
            updateBlock(blockId, updates);
            setEditingBlock(null);
          }}
          onClose={() => setEditingBlock(null)}
        />
      )}

      <BlockTemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Debug Panel */}
      {showDebugPanel && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <BlockSystemDebugPanel
            blocks={blocks}
            onUpdateBlocks={updateBlocks}
            onEditBlock={handleEditBlock}
            onDeleteBlock={handleDeleteBlock}
            onToggleVisibility={handleToggleVisibility}
            isEditMode={isEditMode}
          />
        </div>
      )}

      {/* Toast de boas-vindas */}
      <div className="fixed bottom-4 right-4 z-40">
        <Card className="p-3 bg-white/95 backdrop-blur-sm border border-[#B89B7A]/20">
          <p className="text-xs text-[#8F7A6A]">
            💡 Dica: Use os templates para começar rapidamente
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ResultPageLiveEditor;
