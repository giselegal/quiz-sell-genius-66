
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MoreHorizontal,
  Type,
  Image,
  MousePointer,
  Layout,
  FileText,
  Mail,
  Phone,
  CheckSquare,
  Radio,
  List,
  MessageSquare,
  DollarSign,
  AlertTriangle,
  BarChart3,
  Images,
  TrendingUp,
  Code,
  Minus,
  FileCheck,
  Loader,
  Star,
  Calendar
} from 'lucide-react';
import { VisualStage, BlockType } from '@/types/visualEditor';

interface UnifiedSidebarProps {
  stages: VisualStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onStageAdd: () => void;
  onComponentAdd: (type: BlockType, position?: number) => void;
  elements: any[];
}

export const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  stages,
  activeStageId,
  onStageSelect,
  onStageAdd,
  onComponentAdd,
  elements
}) => {
  const getElementCountForStage = (stageId: string) => {
    return elements.filter(el => el.stageId === stageId).length;
  };

  const components = [
    { type: 'title', icon: Type, label: 'Título' },
    { type: 'text', icon: FileText, label: 'Texto' },
    { type: 'image', icon: Image, label: 'Imagem' },
    { type: 'video', icon: Layout, label: 'Vídeo' },
    { type: 'button', icon: MousePointer, label: 'Botão' },
    { type: 'input', icon: Type, label: 'Campo Texto' },
    { type: 'email', icon: Mail, label: 'Campo Email' },
    { type: 'phone', icon: Phone, label: 'Campo Telefone' },
    { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
    { type: 'radio', icon: Radio, label: 'Radio' },
    { type: 'option', icon: List, label: 'Opções' },
    { type: 'testimonial', icon: MessageSquare, label: 'Depoimento' },
    { type: 'price', icon: DollarSign, label: 'Preço' },
    { type: 'carousel', icon: Images, label: 'Carrossel' },
    { type: 'chart', icon: BarChart3, label: 'Gráfico' },
    { type: 'progress', icon: TrendingUp, label: 'Progresso' },
    { type: 'spacer', icon: Minus, label: 'Espaçador' },
    { type: 'loading', icon: Loader, label: 'Carregando' },
    { type: 'level', icon: Star, label: 'Nível' },
    { type: 'calendar', icon: Calendar, label: 'Calendário' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex h-full">
      {/* Coluna de Etapas */}
      <div className="w-40 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900 text-sm">Etapas</h3>
            <Button
              onClick={onStageAdd}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`
                  flex items-center gap-2 px-2 py-2 rounded cursor-pointer transition-colors text-sm
                  ${activeStageId === stage.id 
                    ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => onStageSelect(stage.id)}
              >
                <MoreHorizontal className="w-3 h-3 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <span className="truncate text-xs">{stage.title}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-gray-200 text-gray-600 border-0 px-1"
                >
                  {getElementCountForStage(stage.id)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coluna de Componentes */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 text-sm">Componentes</h3>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {components.map((component) => {
              const Icon = component.icon;
              return (
                <Button
                  key={component.type}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-3 h-9 px-3 mb-1 text-gray-700 hover:bg-gray-100"
                  onClick={() => onComponentAdd(component.type as BlockType)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{component.label}</span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
