
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Eye, EyeOff, Save, RotateCcw, Settings, Palette, RefreshCw, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DragDropContainer from '@/components/result/DragDropContainer';
import BlockEditorModal from '@/components/result/BlockEditorModal';
import BlockTemplateModal from '@/components/result/BlockTemplateModal';
import BlockSystemDebugPanel from '@/components/result/BlockSystemDebugPanel';
import { useBlocks } from '@/hooks/useBlocks';
import { BlockData } from '@/types/resultPageConfig';
import { BlockTemplate } from '@/data/blockTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleEditBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      setEditingBlock(block);
      setSelectedBlockId(blockId);
    }
  };

  const handleSelectBlock = (blockId: string | null) => {
    setSelectedBlockId(blockId);
    if (blockId) {
      const block = blocks.find(b => b.id === blockId);
      if (block) {
        setEditingBlock(block);
      }
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    // Ao entrar no modo de visualização, desseleciona o bloco atual
    if (!isPreviewMode) {
      setSelectedBlockId(null);
      setEditingBlock(null);
    }
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
    // Aqui poderia ter lógica para salvar em um banco de dados ou localStorage
    localStorage.setItem('editor-blocks', JSON.stringify(blocks));
    toast({
      title: "Configuração salva",
      description: "Todas as alterações foram salvas com sucesso",
    });
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todas as configurações?')) {
      // Limpar todos os blocos
      updateBlocks([]);
      // Limpar seleção atual
      setSelectedBlockId(null);
      setEditingBlock(null);
      // Limpar storage
      localStorage.removeItem('editor-blocks');
      
      toast({
        title: "Configuração resetada",
        description: "Todas as configurações foram restauradas ao padrão",
      });
    }
  };

  // Design tokens (idênticos ao ResultPage.tsx)
  const tokens = {
    colors: {
      primary: '#B89B7A',
      primaryDark: '#A1835D',
      primaryLight: '#D4B79F',
      secondary: '#aa6b5d',
      secondaryDark: '#8F5A4D',
      secondaryLight: '#C28A7D',
      background: '#fffaf7',
      backgroundAlt: '#f9f4ef',
      text: '#432818',
      textLight: '#8F7A6A',
      textMuted: '#6B5B4E',
      success: '#4CAF50',
      successDark: '#45a049',
      border: 'rgba(184, 155, 122, 0.2)',
      borderLight: 'rgba(184, 155, 122, 0.1)',
    },
    spacing: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
    },
    shadows: {
      sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
      md: '0 4px 8px rgba(184, 155, 122, 0.12)',
      lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
      xl: '0 12px 24px rgba(184, 155, 122, 0.20)',
      cta: '0 8px 32px rgba(184, 155, 122, 0.4)',
    },
    radius: {
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
  };

  // Mock props para o sistema de blocos (com tokens corretos)
  const mockProps = {
    primaryStyle: { category: 'Natural' },
    secondaryStyles: [],
    globalStyles: { 
      backgroundColor: tokens.colors.background,
      textColor: tokens.colors.text,
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
    tokens
  };

  // Componente EditorToolbar inline
  const EditorToolbar = () => (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white/95 backdrop-blur-sm flex items-center justify-between relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5"></div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div>
          <h1 className="text-xl font-bold text-[#432818] flex items-center gap-2">
            🎨 Editor ao Vivo - Página de Resultado
            {isPreviewMode && (
              <span className="text-sm font-normal px-2 py-1 bg-[#B89B7A]/10 text-[#B89B7A] rounded-full">
                👁️ Preview
              </span>
            )}
          </h1>
          <p className="text-[#8F7A6A] text-sm">
            Editor visual estilo InLead/Typeform com sistema de blocos drag-and-drop
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        {/* Estatísticas */}
        <div className="text-sm text-[#8F7A6A] mr-4 bg-white/50 px-3 py-1 rounded-full">
          {blocks.length} blocos • {blocks.filter(b => b.visible).length} visíveis
        </div>

        {/* Controles principais */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleTogglePreview}
          className={`border-[#B89B7A] transition-all ${
            isPreviewMode 
              ? 'bg-[#B89B7A] text-white hover:bg-[#A1835D]' 
              : 'text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewMode ? 'Modo Edição' : 'Visualizar'}
        </Button>

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
          <RefreshCw className="w-4 h-4 mr-2" />
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
  );

  // Componente ComponentsSidebar inline
  const ComponentsSidebar = () => (
    <div className="h-full bg-white/95 backdrop-blur-sm border-r border-[#B89B7A]/20 p-4 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B89B7A]/5 to-transparent"></div>
      
      <div className="space-y-4 relative z-10">
        <div>
          <h3 className="font-semibold text-[#432818] mb-3 flex items-center gap-2">
            📦 Adicionar Blocos
            <span className="text-xs text-[#8F7A6A] bg-[#B89B7A]/10 px-2 py-1 rounded-full">
              Drag & Drop
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { type: 'hero' as const, icon: '🎭', label: 'Hero', desc: 'Seção principal' },
              { type: 'text' as const, icon: '📝', label: 'Texto', desc: 'Parágrafo/Lista' },
              { type: 'image' as const, icon: '🖼️', label: 'Imagem', desc: 'Foto/Ilustração' },
              { type: 'cta' as const, icon: '🎯', label: 'CTA', desc: 'Botão de ação' },
              { type: 'pricing' as const, icon: '💰', label: 'Preço', desc: 'Tabela de preços' },
              { type: 'testimonials' as const, icon: '⭐', label: 'Depoimentos', desc: 'Avaliações' },
              { type: 'benefits' as const, icon: '✅', label: 'Benefícios', desc: 'Lista de vantagens' },
              { type: 'guarantee' as const, icon: '🛡️', label: 'Garantia', desc: 'Garantia de satisfação' },
              { type: 'mentor' as const, icon: '👩‍🏫', label: 'Mentora', desc: 'Sobre a mentora' },
              { type: 'transformations' as const, icon: '✨', label: 'Transformações', desc: 'Antes/Depois' },
              { type: 'bonus' as const, icon: '🎁', label: 'Bônus', desc: 'Bônus exclusivos' },
              { type: 'motivation' as const, icon: '💪', label: 'Motivação', desc: 'Texto motivacional' }
            ].map((block) => (
              <Button
                key={block.type}
                variant="outline"
                size="sm"
                onClick={() => addBlock(block.type)}
                className="w-full justify-start text-sm hover:bg-[#B89B7A]/10 hover:border-[#B89B7A] group"
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{block.icon}</span>
                  <div className="flex flex-col items-start flex-1">
                    <span className="font-medium">{block.label}</span>
                    <span className="text-xs text-[#8F7A6A] group-hover:text-[#B89B7A]">{block.desc}</span>
                  </div>
                  <Plus className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </div>
              </Button>
            ))}
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
  );

  // Componente PropertiesPanel inline
  const PropertiesPanel = () => {
    if (!selectedBlockId) {
      return (
        <div className="h-full bg-white/95 backdrop-blur-sm border-l border-[#B89B7A]/20 p-4 relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B89B7A]/5"></div>
          
          <div className="text-center text-[#8F7A6A] mt-8 relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#B89B7A]/10 rounded-full flex items-center justify-center">
              <Settings className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="font-medium text-[#432818] mb-2">Nenhum bloco selecionado</h3>
            <p className="text-sm">Clique em um bloco para editar suas propriedades</p>
            
            <div className="mt-6 p-4 bg-[#B89B7A]/5 rounded-lg">
              <p className="text-xs text-[#8F7A6A]">
                💡 <strong>Dica:</strong> Use Ctrl+Click para seleção múltipla
              </p>
            </div>
          </div>
        </div>
      );
    }

    const selectedBlock = blocks.find(b => b.id === selectedBlockId);
    if (!selectedBlock) {
      return (
        <div className="h-full bg-white/95 backdrop-blur-sm border-l border-[#B89B7A]/20 p-4">
          <div className="text-center text-[#8F7A6A] mt-8">
            <p className="text-sm">Bloco não encontrado</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-white/95 backdrop-blur-sm border-l border-[#B89B7A]/20 p-4 relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B89B7A]/5"></div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#432818] flex items-center gap-2">
              ⚙️ Propriedades
              <span className="text-xs text-[#8F7A6A] bg-[#B89B7A]/10 px-2 py-1 rounded-full capitalize">
                {selectedBlock.type}
              </span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBlockId(null)}
              className="text-[#8F7A6A] hover:text-[#432818] hover:bg-[#B89B7A]/10"
            >
              ✕
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-[#B89B7A]/5 rounded-lg">
              <label className="text-sm font-medium text-[#432818]">ID do Bloco:</label>
              <p className="text-sm text-[#8F7A6A] font-mono mt-1">{selectedBlock.id}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#B89B7A]/5 rounded-lg">
              <div>
                <label className="text-sm font-medium text-[#432818]">Visibilidade:</label>
                <p className="text-xs text-[#8F7A6A]">Controla se o bloco aparece na página</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleVisibility(selectedBlock.id)}
                className={`transition-all ${
                  selectedBlock.visible 
                    ? 'border-green-300 text-green-600 bg-green-50 hover:bg-green-100' 
                    : 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100'
                }`}
              >
                {selectedBlock.visible ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Visível
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Oculto
                  </>
                )}
              </Button>
            </div>

            <div className="border-t border-[#B89B7A]/20 pt-4">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditBlock(selectedBlock.id)}
                  className="w-full hover:bg-[#B89B7A]/10 hover:border-[#B89B7A]"
                >
                  ✏️ Editar Conteúdo
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteBlock(selectedBlock.id)}
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  🗑️ Excluir Bloco
                </Button>
              </div>
            </div>

            {selectedBlock.content && (
              <div className="border-t border-[#B89B7A]/20 pt-4">
                <h4 className="text-sm font-medium text-[#432818] mb-2">Conteúdo:</h4>
                <div className="text-xs text-[#8F7A6A] space-y-1 max-h-32 overflow-y-auto">
                  {Object.entries(selectedBlock.content).map(([key, value]) => (
                    <div key={key} className="p-2 bg-[#B89B7A]/5 rounded">
                      <span className="font-medium capitalize">{key}:</span>{' '}
                      <span className="text-[#6B5B4E]">
                        {String(value).length > 50 
                          ? `${String(value).substring(0, 50)}...` 
                          : String(value)
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={{
      backgroundColor: tokens.colors.background,
      color: tokens.colors.text,
      fontFamily: 'Inter'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#B89B7A]/5 to-[#aa6b5d]/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(184, 155, 122, 0.1) 0%, transparent 50%), 
                            radial-gradient(circle at 80% 20%, rgba(170, 107, 93, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <EditorToolbar />
      
      <Tabs defaultValue="editor" className="flex-1">
        <TabsList className="hidden">
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="h-full">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Painel esquerdo - Componentes (oculto no modo preview) */}
            {!isPreviewMode && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                  <ComponentsSidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}

            {/* Painel central - Editor principal */}
            <ResizablePanel defaultSize={isPreviewMode ? 100 : 55}>
              <div className="h-full overflow-auto relative" style={{
                backgroundColor: tokens.colors.background,
                color: tokens.colors.text,
                fontFamily: 'Inter'
              }}>
                {/* Custom scrollbar styles */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .editor-content::-webkit-scrollbar {
                      width: 8px;
                    }
                    .editor-content::-webkit-scrollbar-track {
                      background: #f1f1f1;
                    }
                    .editor-content::-webkit-scrollbar-thumb {
                      background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
                      border-radius: 4px;
                    }
                    .editor-content::-webkit-scrollbar-thumb:hover {
                      background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
                    }
                  `
                }} />
                
                {/* Background Pattern (similar to ResultPage) */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#B89B7A]/5 to-[#aa6b5d]/10"></div>
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(184, 155, 122, 0.1) 0%, transparent 50%), 
                                      radial-gradient(circle at 80% 20%, rgba(170, 107, 93, 0.1) 0%, transparent 50%)`
                  }}></div>
                </div>

                <div className="relative z-10 editor-content h-full overflow-auto">
                  <DragDropContainer
                    blocks={blocks}
                    onUpdateBlocks={updateBlocks}
                    onEditBlock={handleEditBlock}
                    onAddBlock={() => addBlock('text')}
                    isEditMode={isEditMode && !isPreviewMode}
                    onToggleEditMode={handleToggleEditMode}
                    selectedBlockId={selectedBlockId}
                    onSelectBlock={handleSelectBlock}
                    {...mockProps}
                  />
                </div>
              </div>
            </ResizablePanel>

            {/* Painel direito - Propriedades (oculto no modo preview) */}
            {!isPreviewMode && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
                  <PropertiesPanel />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>

      {/* Modais */}
      {editingBlock && (
        <BlockEditorModal
          isOpen={!!editingBlock}
          block={editingBlock}
          onSave={(blockId, updates) => {
            updateBlock(blockId, updates);
            setEditingBlock(null);
            setSelectedBlockId(null);
          }}
          onClose={() => {
            setEditingBlock(null);
            setSelectedBlockId(null);
          }}
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
    </div>
  );
};

export default ResultPageLiveEditor;
