
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Image, 
  MousePointer, 
  FileText, 
  Heading,
  HelpCircle
} from 'lucide-react';

interface ComponentLibrarySidebarProps {
  onComponentAdd: (type: string, position?: number) => void;
}

const componentTypes = [
  { type: 'text', label: 'Texto', icon: Type },
  { type: 'headline', label: 'Título', icon: Heading },
  { type: 'image', label: 'Imagem', icon: Image },
  { type: 'button', label: 'Botão', icon: MousePointer },
  { type: 'form', label: 'Formulário', icon: FileText },
  { type: 'question-title', label: 'Título da Pergunta', icon: HelpCircle },
  { type: 'question-options', label: 'Opções da Pergunta', icon: HelpCircle },
];

export const ComponentLibrarySidebar: React.FC<ComponentLibrarySidebarProps> = ({
  onComponentAdd
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Componentes</h3>
      
      <div className="space-y-2">
        {componentTypes.map(({ type, label, icon: Icon }) => (
          <Card key={type} className="p-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => onComponentAdd(type)}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
