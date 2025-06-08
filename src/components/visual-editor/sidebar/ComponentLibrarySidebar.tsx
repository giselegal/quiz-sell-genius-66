import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  Image, 
  Layout, 
  MousePointer,
  Square,
  Circle,
  Star,
  Heart,
  Users,
  MessageSquare,
  Calendar,
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Play,
  BarChart3,
  Search,
  Plus,
  Zap
} from 'lucide-react';

interface ComponentItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  premium?: boolean;
}

const componentLibrary: ComponentItem[] = [
  // Básicos
  { id: 'heading', name: 'Título', icon: <Type className="w-4 h-4" />, category: 'básicos', description: 'Adicione títulos e subtítulos' },
  { id: 'text', name: 'Texto', icon: <Type className="w-4 h-4" />, category: 'básicos', description: 'Parágrafos e blocos de texto' },
  { id: 'image', name: 'Imagem', icon: <Image className="w-4 h-4" />, category: 'básicos', description: 'Imagens e fotos' },
  { id: 'button', name: 'Botão', icon: <MousePointer className="w-4 h-4" />, category: 'básicos', description: 'Botões de ação' },
  
  // Layout
  { id: 'container', name: 'Container', icon: <Square className="w-4 h-4" />, category: 'layout', description: 'Container flexível' },
  { id: 'columns', name: 'Colunas', icon: <Layout className="w-4 h-4" />, category: 'layout', description: 'Layout em colunas' },
  { id: 'spacer', name: 'Espaçador', icon: <Circle className="w-4 h-4" />, category: 'layout', description: 'Espaçamento entre elementos' },
  
  // Quiz Específicos
  { id: 'quiz-question', name: 'Pergunta Quiz', icon: <MessageSquare className="w-4 h-4" />, category: 'quiz', description: 'Pergunta do quiz' },
  { id: 'quiz-options', name: 'Opções Quiz', icon: <Square className="w-4 h-4" />, category: 'quiz', description: 'Opções de resposta' },
  { id: 'quiz-result', name: 'Resultado', icon: <Star className="w-4 h-4" />, category: 'quiz', description: 'Exibir resultado do quiz' },
  { id: 'progress-bar', name: 'Barra Progresso', icon: <BarChart3 className="w-4 h-4" />, category: 'quiz', description: 'Progresso do quiz' },
  
  // Vendas
  { id: 'offer-card', name: 'Card Oferta', icon: <ShoppingCart className="w-4 h-4" />, category: 'vendas', description: 'Card de produto/oferta', premium: true },
  { id: 'testimonial', name: 'Depoimento', icon: <Users className="w-4 h-4" />, category: 'vendas', description: 'Depoimentos de clientes' },
  { id: 'countdown', name: 'Countdown', icon: <Calendar className="w-4 h-4" />, category: 'vendas', description: 'Timer de urgência', premium: true },
  { id: 'guarantee', name: 'Garantia', icon: <Heart className="w-4 h-4" />, category: 'vendas', description: 'Selo de garantia' },
  
  // Mídia
  { id: 'video', name: 'Vídeo', icon: <Play className="w-4 h-4" />, category: 'mídia', description: 'Player de vídeo' },
  { id: 'gallery', name: 'Galeria', icon: <Image className="w-4 h-4" />, category: 'mídia', description: 'Galeria de imagens' },
  
  // Formulários
  { id: 'form', name: 'Formulário', icon: <Mail className="w-4 h-4" />, category: 'formulários', description: 'Formulário de contato' },
  { id: 'email-input', name: 'Campo Email', icon: <Mail className="w-4 h-4" />, category: 'formulários', description: 'Campo de email' },
  { id: 'phone-input', name: 'Campo Telefone', icon: <Phone className="w-4 h-4" />, category: 'formulários', description: 'Campo de telefone' },
];

const categories = [
  { id: 'all', name: 'Todos', icon: <Layout className="w-4 h-4" /> },
  { id: 'básicos', name: 'Básicos', icon: <Type className="w-4 h-4" /> },
  { id: 'layout', name: 'Layout', icon: <Layout className="w-4 h-4" /> },
  { id: 'quiz', name: 'Quiz', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'vendas', name: 'Vendas', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'mídia', name: 'Mídia', icon: <Play className="w-4 h-4" /> },
  { id: 'formulários', name: 'Formulários', icon: <Mail className="w-4 h-4" /> },
];

interface ComponentLibrarySidebarProps {
  onComponentAdd: (componentId: string) => void;
}

export const ComponentLibrarySidebar: React.FC<ComponentLibrarySidebarProps> = ({
  onComponentAdd
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = componentLibrary.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Componentes</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar componentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="justify-start"
            >
              {category.icon}
              <span className="ml-2 text-xs">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Components List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => onComponentAdd(component.id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {component.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 text-sm">{component.name}</h3>
                    {component.premium && (
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{component.description}</p>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            {filteredComponents.length} componentes disponíveis
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Criar Componente Customizado
          </Button>
        </div>
      </div>
    </div>
  );
};
