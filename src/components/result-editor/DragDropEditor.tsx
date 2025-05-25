import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Layout, 
  Trash2, 
  Copy, 
  Settings,
  Plus,
  Move,
  Eye,
  EyeOff
} from 'lucide-react';

interface Block {
  id: string;
  type: 'text' | 'image' | 'button' | 'card' | 'spacer';
  content: any;
  style: any;
  visible: boolean;
}

interface DragDropEditorProps {
  onSave: (blocks: Block[]) => void;
  initialBlocks?: Block[];
}

const ItemTypes = {
  COMPONENT: 'component',
  BLOCK: 'block'
};

// Componentes base que podem ser arrastados
const AVAILABLE_COMPONENTS = [
  {
    type: 'text',
    icon: Type,
    label: 'Texto',
    defaultContent: { text: 'Novo texto', tag: 'p' },
    defaultStyle: { fontSize: 16, color: '#432818', fontWeight: 'normal' }
  },
  {
    type: 'image',
    icon: ImageIcon,
    label: 'Imagem',
    defaultContent: { 
      src: 'https://via.placeholder.com/400x300', 
      alt: 'Imagem placeholder',
      caption: ''
    },
    defaultStyle: { width: 400, height: 300, borderRadius: 8 }
  },
  {
    type: 'button',
    icon: Square,
    label: 'Botão',
    defaultContent: { text: 'Clique aqui', link: '#' },
    defaultStyle: { 
      backgroundColor: '#B89B7A', 
      color: '#ffffff', 
      padding: '12px 24px',
      borderRadius: 8,
      fontSize: 16
    }
  },
  {
    type: 'card',
    icon: Layout,
    label: 'Card',
    defaultContent: { 
      title: 'Título do Card', 
      content: 'Conteúdo do card...' 
    },
    defaultStyle: { 
      backgroundColor: '#ffffff', 
      padding: 24, 
      borderRadius: 12,
      border: '1px solid #E5D5C8'
    }
  }
];

// Componente arrastável da sidebar
const DraggableComponent: React.FC<{ component: any }> = ({ component }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { componentType: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const Icon = component.icon;

  return (
    <div
      ref={drag}
      className={`p-3 border rounded-lg cursor-grab flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="w-6 h-6 text-gray-600" />
      <span className="text-sm font-medium">{component.label}</span>
    </div>
  );
};

// Bloco editável no canvas
const EditableBlock: React.FC<{
  block: Block;
  index: number;
  onUpdate: (index: number, block: Block) => void;
  onDelete: (index: number) => void;
  onDuplicate: (index: number) => void;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ block, index, onUpdate, onDelete, onDuplicate, isSelected, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        // Reorder logic would go here
      }
    }
  }));

  const updateContent = (newContent: any) => {
    onUpdate(index, { ...block, content: { ...block.content, ...newContent } });
  };

  const updateStyle = (newStyle: any) => {
    onUpdate(index, { ...block, style: { ...block.style, ...newStyle } });
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'text':
        const TextTag = block.content.tag || 'p';
        return (
          <TextTag
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateContent({ text: e.currentTarget.textContent })}
            style={block.style}
            className="outline-none"
          >
            {block.content.text}
          </TextTag>
        );

      case 'image':
        return (
          <div className="relative">
            <img
              src={block.content.src}
              alt={block.content.alt}
              style={{
                width: `${block.style.width}px`,
                height: `${block.style.height}px`,
                borderRadius: `${block.style.borderRadius}px`,
                objectFit: 'cover'
              }}
              className="block"
            />
            {block.content.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                {block.content.caption}
              </p>
            )}
          </div>
        );

      case 'button':
        return (
          <button
            style={block.style}
            className="transition-opacity hover:opacity-80"
          >
            {block.content.text}
          </button>
        );

      case 'card':
        return (
          <div style={block.style} className="shadow-sm">
            <h3 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent({ title: e.currentTarget.textContent })}
              className="font-semibold mb-2 outline-none"
            >
              {block.content.title}
            </h3>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent({ content: e.currentTarget.textContent })}
              className="outline-none"
            >
              {block.content.content}
            </div>
          </div>
        );

      default:
        return <div>Componente desconhecido</div>;
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all ${
        isDragging ? 'opacity-50' : ''
      } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''} ${
        !block.visible ? 'opacity-50' : ''
      }`}
    >
      {renderBlock()}
      
      {/* Controles de bloco */}
      <div className={`absolute -top-2 -right-2 flex gap-1 ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      } transition-opacity`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(index, { ...block, visible: !block.visible });
          }}
          className="w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-800"
          title={block.visible ? 'Ocultar' : 'Mostrar'}
        >
          {block.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(index);
          }}
          className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600"
          title="Duplicar"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
          title="Excluir"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      
      {/* Indicador de arraste */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-blue-500 ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      } transition-opacity`}>
        <Move className="w-4 h-4 text-blue-500 absolute -top-1 left-1/2 transform -translate-x-1/2" />
      </div>
    </div>
  );
};

// Área de drop do canvas
const DropCanvas: React.FC<{
  blocks: Block[];
  onAddBlock: (componentType: string) => void;
  children: React.ReactNode;
}> = ({ blocks, onAddBlock, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: { componentType: string }) => {
      onAddBlock(item.componentType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      className={`min-h-96 p-6 border-2 border-dashed rounded-lg transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {blocks.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <Layout className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">Canvas vazio</p>
          <p className="text-sm">Arraste componentes da sidebar para começar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Painel de propriedades
const PropertiesPanel: React.FC<{
  selectedBlock: Block | null;
  onUpdate: (block: Block) => void;
}> = ({ selectedBlock, onUpdate }) => {
  if (!selectedBlock) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Settings className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p>Selecione um bloco para editar</p>
      </div>
    );
  }

  const updateStyle = (newStyle: any) => {
    onUpdate({ ...selectedBlock, style: { ...selectedBlock.style, ...newStyle } });
  };

  const updateContent = (newContent: any) => {
    onUpdate({ ...selectedBlock, content: { ...selectedBlock.content, ...newContent } });
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold">Propriedades</h3>
      
      {selectedBlock.type === 'text' && (
        <>
          <div>
            <label className="text-sm font-medium">Tamanho da Fonte</label>
            <Slider
              value={[selectedBlock.style.fontSize || 16]}
              onValueChange={([value]) => updateStyle({ fontSize: value })}
              min={12}
              max={72}
              step={1}
              className="mt-2"
            />
            <span className="text-xs text-gray-500">{selectedBlock.style.fontSize || 16}px</span>
          </div>
          
          <div>
            <label className="text-sm font-medium">Cor</label>
            <input
              type="color"
              value={selectedBlock.style.color || '#432818'}
              onChange={(e) => updateStyle({ color: e.target.value })}
              className="w-full h-10 border rounded mt-2"
            />
          </div>
        </>
      )}
      
      {selectedBlock.type === 'image' && (
        <>
          <div>
            <label className="text-sm font-medium">URL da Imagem</label>
            <input
              type="text"
              value={selectedBlock.content.src || ''}
              onChange={(e) => updateContent({ src: e.target.value })}
              className="w-full p-2 border rounded mt-2"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Largura</label>
            <Slider
              value={[selectedBlock.style.width || 400]}
              onValueChange={([value]) => updateStyle({ width: value })}
              min={100}
              max={800}
              step={10}
              className="mt-2"
            />
            <span className="text-xs text-gray-500">{selectedBlock.style.width || 400}px</span>
          </div>
          
          <div>
            <label className="text-sm font-medium">Altura</label>
            <Slider
              value={[selectedBlock.style.height || 300]}
              onValueChange={([value]) => updateStyle({ height: value })}
              min={100}
              max={600}
              step={10}
              className="mt-2"
            />
            <span className="text-xs text-gray-500">{selectedBlock.style.height || 300}px</span>
          </div>
          
          <div>
            <label className="text-sm font-medium">Legenda</label>
            <input
              type="text"
              value={selectedBlock.content.caption || ''}
              onChange={(e) => updateContent({ caption: e.target.value })}
              className="w-full p-2 border rounded mt-2"
              placeholder="Legenda da imagem"
            />
          </div>
        </>
      )}
      
      {selectedBlock.type === 'button' && (
        <>
          <div>
            <label className="text-sm font-medium">Texto do Botão</label>
            <input
              type="text"
              value={selectedBlock.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Cor de Fundo</label>
            <input
              type="color"
              value={selectedBlock.style.backgroundColor || '#B89B7A'}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
              className="w-full h-10 border rounded mt-2"
            />
          </div>
        </>
      )}
    </div>
  );
};

export const DragDropEditor: React.FC<DragDropEditorProps> = ({ onSave, initialBlocks = [] }) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);

  const addBlock = useCallback((componentType: string) => {
    const component = AVAILABLE_COMPONENTS.find(c => c.type === componentType);
    if (!component) return;

    const newBlock: Block = {
      id: Date.now().toString(),
      type: componentType as any,
      content: component.defaultContent,
      style: component.defaultStyle,
      visible: true
    };

    setBlocks(prev => [...prev, newBlock]);
  }, []);

  const updateBlock = useCallback((index: number, updatedBlock: Block) => {
    setBlocks(prev => prev.map((block, i) => i === index ? updatedBlock : block));
  }, []);

  const deleteBlock = useCallback((index: number) => {
    setBlocks(prev => prev.filter((_, i) => i !== index));
    setSelectedBlockIndex(null);
  }, []);

  const duplicateBlock = useCallback((index: number) => {
    const blockToDuplicate = blocks[index];
    const duplicatedBlock: Block = {
      ...blockToDuplicate,
      id: Date.now().toString()
    };
    setBlocks(prev => [...prev.slice(0, index + 1), duplicatedBlock, ...prev.slice(index + 1)]);
  }, [blocks]);

  const handleSave = () => {
    onSave(blocks);
  };

  const selectedBlock = selectedBlockIndex !== null ? blocks[selectedBlockIndex] : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Componentes */}
        <div className="w-64 bg-white border-r p-4">
          <h3 className="font-semibold mb-4">Componentes</h3>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {AVAILABLE_COMPONENTS.map((component) => (
              <DraggableComponent key={component.type} component={component} />
            ))}
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Salvar Layout
          </Button>
        </div>

        {/* Canvas central */}
        <div className="flex-1 p-4">
          <DropCanvas blocks={blocks} onAddBlock={addBlock}>
            {blocks.map((block, index) => (
              <EditableBlock
                key={block.id}
                block={block}
                index={index}
                onUpdate={updateBlock}
                onDelete={deleteBlock}
                onDuplicate={duplicateBlock}
                isSelected={selectedBlockIndex === index}
                onSelect={() => setSelectedBlockIndex(index)}
              />
            ))}
          </DropCanvas>
        </div>

        {/* Sidebar - Propriedades */}
        <div className="w-80 bg-white border-l">
          <PropertiesPanel 
            selectedBlock={selectedBlock}
            onUpdate={(updatedBlock) => {
              if (selectedBlockIndex !== null) {
                updateBlock(selectedBlockIndex, updatedBlock);
              }
            }}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default DragDropEditor;
