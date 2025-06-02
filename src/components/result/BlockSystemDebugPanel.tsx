import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlockData } from '@/types/resultPageConfig';
import { Eye, EyeOff, Edit, Trash2, Copy, Download, Upload } from 'lucide-react';

interface BlockSystemDebugPanelProps {
  blocks: BlockData[];
  onUpdateBlocks: (blocks: BlockData[]) => void;
  onEditBlock: (blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
  onToggleVisibility: (blockId: string) => void;
  isEditMode: boolean;
}

const BlockSystemDebugPanel: React.FC<BlockSystemDebugPanelProps> = ({
  blocks,
  onUpdateBlocks,
  onEditBlock,
  onDeleteBlock,
  onToggleVisibility,
  isEditMode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const exportBlocks = () => {
    const dataStr = JSON.stringify(blocks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `blocks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importBlocks = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedBlocks = JSON.parse(e.target?.result as string);
            onUpdateBlocks(importedBlocks);
          } catch (error) {
            console.error('Erro ao importar blocos:', error);
            alert('Erro ao importar blocos. Verifique o formato do arquivo.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const duplicateBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      const newBlock = {
        ...block,
        id: `${block.id}-copy-${Date.now()}`,
        title: `${block.title} (Cópia)`,
        order: blocks.length,
        editable: true
      };
      onUpdateBlocks([...blocks, newBlock]);
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(b => b.id === blockId);
    if (currentIndex === -1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < blocks.length) {
      [newBlocks[currentIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[currentIndex]];
      
      // Atualizar order
      newBlocks.forEach((block, index) => {
        block.order = index;
      });
      
      onUpdateBlocks(newBlocks);
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          size="sm"
        >
          🐛 Debug Panel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 max-h-96 overflow-hidden">
      <Card className="p-4 bg-white shadow-xl border-2 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-purple-800">🐛 Block System Debug</h3>
          <Button
            onClick={() => setIsExpanded(false)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {/* Estatísticas gerais */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50 p-2 rounded">
              <div className="font-semibold text-blue-800">Total</div>
              <div className="text-lg font-bold text-blue-600">{blocks.length}</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="font-semibold text-green-800">Visíveis</div>
              <div className="text-lg font-bold text-green-600">{blocks.filter(b => b.visible).length}</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <div className="font-semibold text-yellow-800">Editáveis</div>
              <div className="text-lg font-bold text-yellow-600">{blocks.filter(b => b.editable).length}</div>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <div className="font-semibold text-purple-800">Modo</div>
              <div className="text-xs font-bold text-purple-600">{isEditMode ? 'EDIT' : 'VIEW'}</div>
            </div>
          </div>

          {/* Controles gerais */}
          <div className="flex gap-1">
            <Button onClick={exportBlocks} size="sm" variant="outline" className="text-xs">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button onClick={importBlocks} size="sm" variant="outline" className="text-xs">
              <Upload className="w-3 h-3 mr-1" />
              Import
            </Button>
          </div>

          {/* Lista de blocos */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs text-gray-700">Blocos:</h4>
            {blocks
              .sort((a, b) => a.order - b.order)
              .map((block, index) => (
                <div
                  key={block.id}
                  className={`p-2 rounded border text-xs ${
                    block.visible ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs text-gray-500">#{index}</span>
                      <Badge variant={block.editable ? "default" : "secondary"} className="text-xs">
                        {block.type}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onToggleVisibility(block.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {block.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </button>
                      {block.editable && (
                        <>
                          <button
                            onClick={() => onEditBlock(block.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => duplicateBlock(block.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteBlock(block.id)}
                            className="p-1 hover:bg-red-200 rounded text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {block.content.title || block.title}
                  </div>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => moveBlock(block.id, 'up')}
                      disabled={index === 0}
                      className="text-xs px-1 py-0.5 bg-blue-100 hover:bg-blue-200 rounded disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveBlock(block.id, 'down')}
                      disabled={index === blocks.length - 1}
                      className="text-xs px-1 py-0.5 bg-blue-100 hover:bg-blue-200 rounded disabled:opacity-50"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlockSystemDebugPanel;
