
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  Image, 
  Video, 
  MousePointer, 
  MessageSquare, 
  DollarSign,
  Search,
  Plus,
  Mic,
  FileText,
  BarChart3,
  AlertTriangle,
  List,
  RotateCcw,
  Code,
  Space,
  Scale
} from 'lucide-react';
import { BlockType } from '@/types/visualEditor';
import { useDraggableComponent } from '@/hooks/useDragAndDrop';

interface ComponentItem {
  type: BlockType;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const components: ComponentItem[] = [
  // Texto
  { type: 'text', name: 'Texto', icon: <Type className="w-4 h-4" />, category: 'texto', description: 'Parágrafo de texto editável' },
  { type: 'title', name: 'Título', icon: <Type className="w-4 h-4" />, category: 'texto', description: 'Título H1, H2, H3...' },
  
  // Mídia
  { type: 'image', name: 'Imagem', icon: <Image className="w-4 h-4" />, category: 'mídia', description: 'Imagem com upload' },
  { type: 'video', name: 'Vídeo', icon: <Video className="w-4 h-4" />, category: 'mídia', description: 'Vídeo YouTube/Vimeo' },
  { type: 'audio', name: 'Áudio', icon: <Mic className="w-4 h-4" />, category: 'mídia', description: 'Player de áudio' },
  
  // Interação
  { type: 'button', name: 'Botão', icon: <MousePointer className="w-4 h-4" />, category: 'interação', description: 'Botão de ação' },
  { type: 'input', name: 'Campo Texto', icon: <FileText className="w-4 h-4" />, category: 'interação', description: 'Campo de entrada' },
  { type: 'email', name: 'Campo Email', icon: <FileText className="w-4 h-4" />, category: 'interação', description: 'Campo de email' },
  { type: 'phone', name: 'Campo Telefone', icon: <FileText className="w-4 h-4" />, category: 'interação', description: 'Campo de telefone' },
  { type: 'checkbox', name: 'Checkbox', icon: <FileText className="w-4 h-4" />, category: 'interação', description: 'Caixa de seleção' },
  { type: 'radio', name: 'Radio', icon: <FileText className="w-4 h-4" />, category: 'interação', description: 'Botão de rádio' },
  { type: 'option', name: 'Opção Quiz', icon: <FileText className="w-4 h-4" />, category: 'interação', description: 'Opção de quiz' },
  
  // Vendas
  { type: 'testimonial', name: 'Depoimento', icon: <MessageSquare className="w-4 h-4" />, category: 'vendas', description: 'Bloco de depoimento' },
  { type: 'price', name: 'Preço', icon: <DollarSign className="w-4 h-4" />, category: 'vendas', description: 'Exibição de preço' },
  { type: 'arguments', name: 'Argumentos', icon: <List className="w-4 h-4" />, category: 'vendas', description: 'Lista de benefícios' },
  
  // Utilidades
  { type: 'alert', name: 'Alerta', icon: <AlertTriangle className="w-4 h-4" />, category: 'utilidades', description: 'Mensagem de alerta' },
  { type: 'carousel', name: 'Carrossel', icon: <RotateCcw className="w-4 h-4" />, category: 'utilidades', description: 'Carrossel de conteúdo' },
  { type: 'chart', name: 'Gráfico', icon: <BarChart3 className="w-4 h-4" />, category: 'utilidades', description: 'Gráfico básico' },
  { type: 'progress', name: 'Progresso', icon: <BarChart3 className="w-4 h-4" />, category: 'utilidades', description: 'Barra de progresso' },
  { type: 'script', name: 'Script', icon: <Code className="w-4 h-4" />, category: 'utilidades', description: 'Código personalizado' },
  { type: 'spacer', name: 'Espaçador', icon: <Space className="w-4 h-4" />, category: 'utilidades', description: 'Espaçamento' },
  { type: 'terms', name: 'Termos', icon: <Scale className="w-4 h-4" />, category: 'utilidades', description: 'Termos e condições' }
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'texto', name: 'Texto' },
  { id: 'mídia', name: 'Mídia' },
  { id: 'interação', name: 'Interação' },
  { id: 'vendas', name: 'Vendas' },
  { id: 'utilidades', name: 'Utilidades' }
];

interface ComponentLibraryProps {
  onComponentAdd: (type: BlockType) => void;
}

const DraggableComponent: React.FC<{ component: ComponentItem; onAdd: (type: BlockType) => void }> = ({
  component,
  onAdd
}) => {
  const { isDragging, drag } = useDraggableComponent(component.type);

  return (
    <div
      ref={drag}
      className={`group bg-white border border-gray-200 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md hover:border-blue-300 ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onAdd(component.type)}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-300">
          {component.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm">{component.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{component.description}</p>
        </div>
        <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
      </div>
    </div>
  );
};

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onComponentAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Componentes</h2>
        
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar componentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs justify-start"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {filteredComponents.map(component => (
            <DraggableComponent
              key={component.type}
              component={component}
              onAdd={onComponentAdd}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 bg-white border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {filteredComponents.length} componentes disponíveis
        </p>
      </div>
    </div>
  );
};
