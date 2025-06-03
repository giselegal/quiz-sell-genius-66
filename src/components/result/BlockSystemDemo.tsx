import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DragDropContainer from './DragDropContainer';
import BlockEditorModal from './BlockEditorModal';
import BlockSystemDebugPanel from './BlockSystemDebugPanel';
import BlockTemplateModal from './BlockTemplateModal';
import { useBlocks } from '@/hooks/useBlocks';
import { BlockData } from '@/types/resultPageConfig';
import { BlockTemplate } from '@/data/blockTemplates';

const BlockSystemDemo: React.FC = () => {
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

  const handleEditBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      setEditingBlock(block);
    }
  };

  const handleAddNewBlock = () => {
    addBlock('text');
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
  };

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
    <div className="min-h-screen bg-[#fffaf7] p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 mb-8">
          <h1 className="text-3xl font-bold text-[#432818] mb-4">
            🧱 Sistema de Blocos - Demo
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Demonstração completa do sistema drag-and-drop de blocos editáveis
          </p>
          
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={handleToggleEditMode}
              className={`${
                isEditMode 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isEditMode ? 'Sair da Edição' : 'Entrar na Edição'}
            </Button>
            
            <Button 
              onClick={handleAddNewBlock}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Adicionar Bloco de Teste
            </Button>
            
            <Button 
              onClick={() => addBlock('hero')}
              variant="outline"
            >
              + Hero
            </Button>
            
            <Button 
              onClick={() => addBlock('cta')}
              variant="outline"
            >
              + CTA
            </Button>
            
            <Button 
              onClick={() => addBlock('pricing')}
              variant="outline"
            >
              + Pricing
            </Button>

            <Button 
              onClick={() => setShowTemplateModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              🧱 Templates
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">📊 Estatísticas</h3>
              <p className="text-sm text-gray-600">Total de blocos: {blocks.length}</p>
              <p className="text-sm text-gray-600">Blocos visíveis: {blocks.filter(b => b.visible).length}</p>
              <p className="text-sm text-gray-600">Blocos editáveis: {blocks.filter(b => b.editable).length}</p>
              <p className="text-sm text-gray-600">Modo: {isEditMode ? 'Edição' : 'Visualização'}</p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">🎯 Funcionalidades</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Drag & Drop reordenação</li>
                <li>✅ Toggle visibilidade</li>
                <li>✅ Edição inline</li>
                <li>✅ Exclusão de blocos</li>
                <li>✅ Persistência localStorage</li>
                <li>✅ BlockRenderer integrado</li>
              </ul>
            </Card>
          </div>
        </Card>

        <DragDropContainer
          blocks={blocks}
          onUpdateBlocks={updateBlocks}
          onEditBlock={handleEditBlock}
          onAddBlock={handleAddNewBlock}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          {...mockProps}
        />

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

        {/* Debug Panel */}
        <BlockSystemDebugPanel
          blocks={blocks}
          onUpdateBlocks={updateBlocks}
          onEditBlock={handleEditBlock}
          onDeleteBlock={handleDeleteBlock}
          onToggleVisibility={handleToggleVisibility}
          isEditMode={isEditMode}
        />

        {/* Template Modal */}
        <BlockTemplateModal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          onSelectTemplate={handleSelectTemplate}
        />
      </div>
    </div>
  );
};

export default BlockSystemDemo;
