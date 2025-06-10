import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  GripVertical, 
  Settings, 
  Trash2,
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
  FileCheck
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
  const getStageIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '🎯';
      case 'result': return '📊';
      case 'sales': return '💰';
      default: return '📄';
    }
  };

  const getElementCountForStage = (stageId: string) => {
    return elements.filter(el => el.stageId === stageId).length;
  };

  const componentCategories = [
    {
      title: 'Estrutura',
      components: [
        { type: 'title', icon: Type, label: 'Título' },
        { type: 'text', icon: FileText, label: 'Texto' },
        { type: 'spacer', icon: Minus, label: 'Espaçador' }
      ]
    },
    {
      title: 'Mídia',
      components: [
        { type: 'image', icon: Image, label: 'Imagem' },
        { type: 'video', icon: Layout, label: 'Vídeo' },
        { type: 'audio', icon: Layout, label: 'Áudio' }
      ]
    },
    {
      title: 'Interação',
      components: [
        { type: 'button', icon: MousePointer, label: 'Botão' },
        { type: 'input', icon: Type, label: 'Campo Texto' },
        { type: 'email', icon: Mail, label: 'Campo Email' },
        { type: 'phone', icon: Phone, label: 'Campo Telefone' }
      ]
    },
    {
      title: 'Seleção',
      components: [
        { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
        { type: 'radio', icon: Radio, label: 'Radio' },
        { type: 'option', icon: List, label: 'Opções' }
      ]
    },
    {
      title: 'Vendas',
      components: [
        { type: 'testimonial', icon: MessageSquare, label: 'Depoimento' },
        { type: 'price', icon: DollarSign, label: 'Preço' },
        { type: 'alert', icon: AlertTriangle, label: 'Alerta' },
        { type: 'arguments', icon: List, label: 'Argumentos' }
      ]
    },
    {
      title: 'Avançado',
      components: [
        { type: 'carousel', icon: Images, label: 'Carrossel' },
        { type: 'chart', icon: BarChart3, label: 'Gráfico' },
        { type: 'progress', icon: TrendingUp, label: 'Progresso' },
        { type: 'script', icon: Code, label: 'Script' },
        { type: 'terms', icon: FileCheck, label: 'Termos' }
      ]
    }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Seção de Etapas */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Etapas</h3>
          <Button
            onClick={onStageAdd}
            size="sm"
            className="h-7 px-2 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Nova
          </Button>
        </div>
        
        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`
                p-3 rounded-lg cursor-pointer transition-all border
                ${activeStageId === stage.id 
                  ? 'bg-blue-50 border-blue-200 text-blue-900' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }
              `}
              onClick={() => onStageSelect(stage.id)}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="w-3 h-3 text-gray-400" />
                <span className="text-sm">{getStageIcon(stage.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{stage.title}</p>
                  <p className="text-xs text-gray-500">Etapa {index + 1}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getElementCountForStage(stage.id)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Componentes */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Componentes</h3>
          <p className="text-xs text-gray-500 mt-1">
            Clique para adicionar à etapa ativa
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {componentCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  {category.title}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {category.components.map((component) => {
                    const Icon = component.icon;
                    return (
                      <Button
                        key={component.type}
                        variant="outline"
                        size="sm"
                        className="h-auto py-2 px-2 justify-start gap-2 text-xs hover:bg-blue-50 hover:border-blue-200"
                        onClick={() => onComponentAdd(component.type as BlockType)}
                      >
                        <Icon className="w-3 h-3 text-gray-600" />
                        <span className="truncate">{component.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
