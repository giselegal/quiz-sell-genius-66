
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Type, 
  FileText, 
  Image, 
  Play, 
  MousePointer, 
  Minus,
  Space
} from 'lucide-react';

interface ModernSidebarProps {
  onAddElement: (type: string) => void;
}

const componentCategories = [
  {
    title: 'Básicos',
    items: [
      { type: 'heading', label: 'Título', icon: Type, color: 'text-blue-600' },
      { type: 'text', label: 'Texto', icon: FileText, color: 'text-green-600' },
      { type: 'button', label: 'Botão', icon: MousePointer, color: 'text-purple-600' },
      { type: 'image', label: 'Imagem', icon: Image, color: 'text-orange-600' },
    ]
  },
  {
    title: 'Mídia',
    items: [
      { type: 'video', label: 'Vídeo', icon: Play, color: 'text-red-600' },
    ]
  },
  {
    title: 'Layout',
    items: [
      { type: 'spacer', label: 'Espaçador', icon: Space, color: 'text-gray-600' },
      { type: 'divider', label: 'Divisor', icon: Minus, color: 'text-gray-600' },
    ]
  }
];

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ onAddElement }) => {
  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Componentes
        </h2>
        
        <div className="space-y-6">
          {componentCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item) => (
                  <Card
                    key={item.type}
                    className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border-gray-200 hover:border-gray-300"
                    onClick={() => onAddElement(item.type)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                      <span className="text-xs font-medium text-gray-700">
                        {item.label}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Dica
          </h4>
          <p className="text-xs text-blue-700">
            Arraste os componentes para o canvas ou clique para adicionar na posição padrão.
          </p>
        </div>
      </div>
    </div>
  );
};
