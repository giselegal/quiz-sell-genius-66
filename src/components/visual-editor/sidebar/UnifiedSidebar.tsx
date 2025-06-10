
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

  // Lista simplificada de componentes como na imagem
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
    <div className="w-80 bg-gray-900 text-white flex flex-col h-full">
      {/* Seção de Etapas */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-200 text-sm">Etapas</h3>
          <Button
            onClick={onStageAdd}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-1">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`
                flex items-center gap-3 px-2 py-2 rounded cursor-pointer transition-colors text-sm
                ${activeStageId === stage.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
              onClick={() => onStageSelect(stage.id)}
            >
              <MoreHorizontal className="w-3 h-3 text-gray-500" />
              <div className="flex-1 min-w-0">
                <span className="truncate">{stage.title}</span>
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs bg-gray-700 text-gray-300 border-0"
              >
                {getElementCountForStage(stage.id)}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Componentes */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-medium text-gray-200 text-sm">Componentes</h3>
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
                  className="w-full justify-start gap-3 h-9 px-3 mb-1 text-gray-300 hover:bg-gray-700 hover:text-white"
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
