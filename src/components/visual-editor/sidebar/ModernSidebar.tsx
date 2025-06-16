
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Type, 
  FileText, 
  Image, 
  Play, 
  MousePointer, 
  Minus,
  Space,
  DollarSign,
  MessageSquare,
  Clock,
  HelpCircle,
  FormInput,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  ListChecks,
  Header
} from 'lucide-react';

interface ModernSidebarProps {
  onAddElement: (type: string) => void;
}

const componentCategories = [
  {
    title: 'Quiz',
    defaultOpen: true,
    items: [
      { type: 'quiz-header', label: 'Header', icon: Header, color: 'text-purple-600' },
      { type: 'quiz-question', label: 'Questão', icon: ListChecks, color: 'text-blue-600' },
    ]
  },
  {
    title: 'Básicos',
    defaultOpen: false,
    items: [
      { type: 'heading', label: 'Título', icon: Type, color: 'text-blue-600' },
      { type: 'text', label: 'Texto', icon: FileText, color: 'text-green-600' },
      { type: 'button', label: 'Botão', icon: MousePointer, color: 'text-purple-600' },
      { type: 'image', label: 'Imagem', icon: Image, color: 'text-orange-600' },
    ]
  },
  {
    title: 'Mídia',
    defaultOpen: false,
    items: [
      { type: 'video', label: 'Vídeo', icon: Play, color: 'text-red-600' },
    ]
  },
  {
    title: 'Layout',
    defaultOpen: false,
    items: [
      { type: 'spacer', label: 'Espaçador', icon: Space, color: 'text-gray-600' },
      { type: 'divider', label: 'Divisor', icon: Minus, color: 'text-gray-600' },
    ]
  },
  {
    title: 'Vendas',
    defaultOpen: false,
    items: [
      { type: 'pricing', label: 'Preço', icon: DollarSign, color: 'text-green-500' },
      { type: 'testimonial', label: 'Depoimento', icon: MessageSquare, color: 'text-blue-500' },
      { type: 'countdown', label: 'Contador', icon: Clock, color: 'text-red-500' },
    ]
  },
  {
    title: 'Interação',
    defaultOpen: false,
    items: [
      { type: 'faq', label: 'FAQ', icon: HelpCircle, color: 'text-indigo-600' },
      { type: 'input', label: 'Campo Input', icon: FormInput, color: 'text-teal-600' },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, color: 'text-pink-600' },
    ]
  }
];

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ onAddElement }) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    componentCategories.reduce((acc, category) => {
      acc[category.title] = category.defaultOpen;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleCategory = (categoryTitle: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Componentes
        </h2>
        
        <div className="space-y-3">
          {componentCategories.map((category) => (
            <Collapsible
              key={category.title}
              open={openCategories[category.title]}
              onOpenChange={() => toggleCategory(category.title)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="text-xs uppercase tracking-wide">
                    {category.title}
                  </span>
                  {openCategories[category.title] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-2 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item) => (
                    <Card
                      key={item.type}
                      className="p-3 cursor-grab hover:bg-gray-50 transition-all border-gray-200 hover:border-gray-300 hover:shadow-sm active:cursor-grabbing"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.type)}
                      onClick={() => onAddElement(item.type)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                          {item.label}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            💡 Dica
          </h4>
          <p className="text-xs text-blue-700 leading-relaxed">
            Arraste os componentes para o canvas ou clique para adicionar. Use Ctrl+Z para desfazer.
          </p>
        </div>
      </div>
    </div>
  );
};
