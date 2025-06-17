
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
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Componentes</h2>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Clique para adicionar ao canvas
        </p>
      </div>

      {/* Scrollable Components List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {componentCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center',
                  category.color
                )}>
                  <category.icon className="w-3 h-3" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {category.title}
                </h3>
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {category.components.length}
                </Badge>
              </div>

              {/* Components Grid */}
              <div className="grid grid-cols-1 gap-2">
                {category.components.map((component) => (
                  <div
                    key={component.type}
                    className={cn(
                      'group relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md',
                      selectedComponent === component.type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                    )}
                    onClick={() => onComponentSelect(component.type)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={cn(
                        'w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0',
                        selectedComponent === component.type
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                      )}>
                        <component.icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn(
                            'text-sm font-medium truncate',
                            selectedComponent === component.type
                              ? 'text-blue-900'
                              : 'text-gray-900'
                          )}>
                            {component.label}
                          </h4>
                          {component.popular && (
                            <Badge 
                              variant="secondary" 
                              className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0"
                            >
                              ⭐
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {component.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className={cn(
                      'absolute right-2 top-2 w-2 h-2 rounded-full transition-opacity',
                      selectedComponent === component.type
                        ? 'bg-blue-500 opacity-100'
                        : 'bg-gray-300 opacity-0 group-hover:opacity-100'
                    )} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0 bg-gray-50">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Plus className="w-2 h-2 text-white" />
          </div>
          <span>Clique nos componentes para adicionar</span>
        </div>
      </div>
    </div>
  );
};
