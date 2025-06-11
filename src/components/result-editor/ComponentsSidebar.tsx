
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ResultPageBlockType } from '@/types/resultPageBlocks';
import { 
  FileText, 
  Image, 
  Star, 
  MessageSquare, 
  Shield, 
  User, 
  Target, 
  Gift,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  Zap
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: ResultPageBlockType) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({
  onComponentSelect
}) => {
  const componentGroups = [
    {
      title: 'Estrutura Principal',
      components: [
        {
          type: 'result-header' as ResultPageBlockType,
          name: 'Cabeçalho de Resultado',
          icon: Sparkles,
          description: 'Header personalizado com resultado do quiz'
        },
        {
          type: 'styleResult' as ResultPageBlockType,
          name: 'Resultado do Estilo',
          icon: Star,
          description: 'Mostra o estilo predominante do usuário'
        }
      ]
    },
    {
      title: 'Conteúdo Persuasivo',
      components: [
        {
          type: 'transformation' as ResultPageBlockType,
          name: 'Transformações',
          icon: Zap,
          description: 'Antes e depois de clientes'
        },
        {
          type: 'motivation' as ResultPageBlockType,
          name: 'Motivação',
          icon: Target,
          description: 'Seção motivacional sobre estilo'
        },
        {
          type: 'bonus' as ResultPageBlockType,
          name: 'Bônus',
          icon: Gift,
          description: 'Lista de bônus inclusos'
        },
        {
          type: 'testimonials' as ResultPageBlockType,
          name: 'Depoimentos',
          icon: MessageSquare,
          description: 'Testimoniais de clientes'
        },
        {
          type: 'guarantee' as ResultPageBlockType,
          name: 'Garantia',
          icon: Shield,
          description: 'Garantia de satisfação'
        },
        {
          type: 'mentor' as ResultPageBlockType,
          name: 'Mentora',
          icon: User,
          description: 'Apresentação da especialista'
        }
      ]
    },
    {
      title: 'Conversão',
      components: [
        {
          type: 'transition' as ResultPageBlockType,
          name: 'Transição',
          icon: ArrowRight,
          description: 'Seção de transição motivacional'
        },
        {
          type: 'final-cta' as ResultPageBlockType,
          name: 'CTA Final',
          icon: ShoppingCart,
          description: 'Call-to-action com produtos e timer'
        }
      ]
    },
    {
      title: 'Básicos',
      components: [
        {
          type: 'header' as ResultPageBlockType,
          name: 'Cabeçalho',
          icon: FileText,
          description: 'Cabeçalho simples'
        },
        {
          type: 'cta' as ResultPageBlockType,
          name: 'CTA Simples',
          icon: Target,
          description: 'Botão de call-to-action básico'
        }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-[#432818]">Componentes</h2>
        <p className="text-xs text-[#8F7A6A] mt-1">Arraste para o canvas</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {componentGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium mb-3 text-[#8F7A6A] uppercase tracking-wide">
                {group.title}
              </h3>
              <div className="grid gap-2">
                {group.components.map((component) => {
                  const Icon = component.icon;
                  return (
                    <Button
                      key={component.type}
                      variant="outline"
                      className="flex flex-col h-auto py-3 px-3 items-start text-left hover:bg-[#B89B7A]/10 hover:border-[#B89B7A] transition-all"
                      onClick={() => onComponentSelect(component.type)}
                    >
                      <div className="flex items-center gap-2 mb-1 w-full">
                        <Icon className="w-4 h-4 text-[#B89B7A] flex-shrink-0" />
                        <span className="text-sm font-medium text-[#432818]">
                          {component.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#8F7A6A] leading-tight">
                        {component.description}
                      </p>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
