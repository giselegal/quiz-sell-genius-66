
import React from 'react';
import { ComponentItem } from '../../unified-editor/sidebar/ComponentItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Type, 
  Image, 
  MousePointer, 
  Layout,
  Video,
  Star,
  ShoppingCart,
  Users,
  Clock,
  CheckCircle,
  Gift,
  Shield,
  Quote,
  Zap,
  Plus
} from 'lucide-react';

interface ComponentsPaletteProps {
  onComponentSelect: (componentType: string) => void;
  selectedComponent: string | null;
}

export const ComponentsPalette: React.FC<ComponentsPaletteProps> = ({
  onComponentSelect,
  selectedComponent
}) => {
  const componentCategories = [
    {
      title: 'Essenciais',
      icon: Zap,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      components: [
        { type: 'headline', label: 'Título', icon: Type, description: 'Título principal', popular: true },
        { type: 'text', label: 'Texto', icon: Type, description: 'Parágrafo de texto', popular: true },
        { type: 'button', label: 'Botão', icon: MousePointer, description: 'Botão de ação', popular: true },
        { type: 'image', label: 'Imagem', icon: Image, description: 'Imagem ou foto', popular: true },
      ]
    },
    {
      title: 'Conteúdo',
      icon: Layout,
      color: 'bg-green-50 border-green-200 text-green-700',
      components: [
        { type: 'video', label: 'Vídeo', icon: Video, description: 'Player de vídeo' },
        { type: 'form', label: 'Formulário', icon: Layout, description: 'Campos de entrada' },
        { type: 'divider', label: 'Divisor', icon: Layout, description: 'Linha separadora' },
        { type: 'spacer', label: 'Espaço', icon: Layout, description: 'Espaçamento vertical' },
      ]
    },
    {
      title: 'Social Proof',
      icon: Star,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      components: [
        { type: 'testimonial', label: 'Depoimento', icon: Quote, description: 'Testemunho de cliente' },
        { type: 'rating', label: 'Avaliação', icon: Star, description: 'Estrelas de avaliação' },
        { type: 'social-proof', label: 'Prova Social', icon: Users, description: 'Números e estatísticas' },
      ]
    },
    {
      title: 'Vendas',
      icon: ShoppingCart,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      components: [
        { type: 'pricing', label: 'Preço', icon: ShoppingCart, description: 'Tabela de preços' },
        { type: 'cta', label: 'CTA', icon: ShoppingCart, description: 'Call to Action' },
        { type: 'countdown', label: 'Contador', icon: Clock, description: 'Tempo limitado' },
        { type: 'guarantee', label: 'Garantia', icon: Shield, description: 'Selo de garantia' },
        { type: 'bonus', label: 'Bônus', icon: Gift, description: 'Oferta especial' },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-slate-50/50">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex-shrink-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Componentes</h2>
            <p className="text-xs text-slate-500 font-medium">
              Clique para adicionar
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Components List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {componentCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  'w-7 h-7 rounded-xl flex items-center justify-center shadow-sm',
                  category.color
                )}>
                  <category.icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  {category.title}
                </h3>
                <Badge variant="outline" className="text-xs bg-slate-50/80 border-slate-200 shadow-sm">
                  {category.components.length}
                </Badge>
              </div>

              {/* Components Grid */}
              <div className="grid grid-cols-1 gap-2">
                {category.components.map((component) => (
                  <div
                    key={component.type}
                    className={cn(
                      'group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg backdrop-blur-sm',
                      selectedComponent === component.type
                        ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md ring-1 ring-blue-100'
                        : 'border-slate-150 bg-white/80 hover:border-slate-200 hover:bg-slate-50/90'
                    )}
                    onClick={() => onComponentSelect(component.type)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300',
                        selectedComponent === component.type
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      )}>
                        <component.icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn(
                            'text-sm font-semibold truncate transition-colors duration-200',
                            selectedComponent === component.type
                              ? 'text-slate-800'
                              : 'text-slate-700 group-hover:text-slate-800'
                          )}>
                            {component.label}
                          </h4>
                          {component.popular && (
                            <Badge 
                              variant="secondary" 
                              className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 text-xs px-2 py-0.5 shadow-sm border-0"
                            >
                              ⭐
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {component.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className={cn(
                      'absolute right-3 top-3 w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm',
                      selectedComponent === component.type
                        ? 'bg-gradient-to-r from-blue-400 to-indigo-500 opacity-100 shadow-md'
                        : 'bg-slate-300 opacity-0 group-hover:opacity-100 group-hover:bg-slate-400'
                    )} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 flex-shrink-0 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-sm">
            <Plus className="w-2 h-2 text-white" />
          </div>
          <span className="font-medium text-slate-600">Clique nos componentes para adicionar</span>
        </div>
      </div>
    </div>
  );
};
