
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  TriangleAlert,
  Book,
  Mic,
  RectangleHorizontal,
  LoaderCircle,
  GalleryHorizontalEnd,
  ChartArea,
  AlignHorizontalDistributeEnd,
  Sparkles,
  Quote,
  TextCursorInput,
  Proportions,
  MessageCircleQuestion,
  ChartNoAxesColumnIncreasing,
  Images,
  List,
  ArrowRightLeft,
  SlidersHorizontal,
  Rows3,
  CircleDollarSign,
  Code,
  Scale,
  Text,
  Heading1,
  Video,
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
  Layout
} from 'lucide-react';

interface ModernSidebarProps {
  onAddElement: (type: string) => void;
}

// Componentes no estilo Cakto com categorização
const caktoComponents = [
  // Quiz Components (Priority)
  { type: 'quiz-header', label: 'Header', icon: Layout, color: 'text-purple-400', isNew: false },
  { type: 'quiz-question', label: 'Questão', icon: ListChecks, color: 'text-blue-400', isNew: false },
  
  // Core Components
  { type: 'alert', label: 'Alerta', icon: TriangleAlert, color: 'text-yellow-400', isNew: false },
  { type: 'arguments', label: 'Argumentos', icon: Book, color: 'text-green-400', isNew: false },
  { type: 'audio', label: 'Audio', icon: Mic, color: 'text-purple-400', isNew: false },
  { type: 'button', label: 'Botão', icon: RectangleHorizontal, color: 'text-blue-400', isNew: false },
  { type: 'loading', label: 'Carregando', icon: LoaderCircle, color: 'text-indigo-400', isNew: false },
  { type: 'carousel', label: 'Carrosel', icon: GalleryHorizontalEnd, color: 'text-pink-400', isNew: false },
  { type: 'chart', label: 'Cartesiano', icon: ChartArea, color: 'text-orange-400', isNew: false },
  
  // New Components
  { type: 'compare', label: 'Comparar', icon: AlignHorizontalDistributeEnd, color: 'text-cyan-400', isNew: true },
  { type: 'confetti', label: 'Confetti', icon: Sparkles, color: 'text-yellow-400', isNew: true },
  
  // Content Components
  { type: 'testimonial', label: 'Depoimentos', icon: Quote, color: 'text-green-400', isNew: false },
  { type: 'input', label: 'Entrada', icon: TextCursorInput, color: 'text-blue-400', isNew: false },
  { type: 'spacer', label: 'Espaçador', icon: Proportions, color: 'text-gray-400', isNew: false },
  
  // FAQ and Interactive
  { type: 'faq', label: 'FAQ', icon: MessageCircleQuestion, color: 'text-indigo-400', isNew: true },
  { type: 'charts', label: 'Gráficos', icon: ChartNoAxesColumnIncreasing, color: 'text-orange-400', isNew: false },
  
  // Media
  { type: 'image', label: 'Imagem', icon: Images, color: 'text-purple-400', isNew: false },
  { type: 'list', label: 'Lista', icon: List, color: 'text-green-400', isNew: true },
  { type: 'marquee', label: 'Marquise', icon: ArrowRightLeft, color: 'text-pink-400', isNew: true },
  
  // Advanced Components
  { type: 'level', label: 'Nível', icon: SlidersHorizontal, color: 'text-cyan-400', isNew: false },
  { type: 'options', label: 'Opções', icon: Rows3, color: 'text-yellow-400', isNew: false },
  { type: 'pricing', label: 'Preço', icon: CircleDollarSign, color: 'text-green-400', isNew: false },
  { type: 'script', label: 'Script', icon: Code, color: 'text-red-400', isNew: false },
  { type: 'terms', label: 'Termos', icon: Scale, color: 'text-blue-400', isNew: false },
  
  // Basic Text
  { type: 'text', label: 'Texto', icon: Text, color: 'text-gray-300', isNew: false },
  { type: 'heading', label: 'Título', icon: Heading1, color: 'text-white', isNew: false },
  { type: 'video', label: 'Video', icon: Video, color: 'text-red-400', isNew: false },
];

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ onAddElement }) => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const NewBadge = () => (
    <span className="text-[0.6rem] text-white bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-lg rounded-full px-1 py-0.5 absolute -top-1 -right-1">
      Novo!
    </span>
  );

  return (
    <div className="h-full bg-zinc-900 border-r border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-sm font-semibold text-zinc-100 mb-1">
          Componentes
        </h2>
        <p className="text-xs text-zinc-400">
          Arraste para adicionar ao canvas
        </p>
      </div>
      
      {/* Scroll Area */}
      <div className="relative overflow-hidden h-full">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
          <div className="overflow-hidden relative z-[1] flex flex-col gap-1 p-2 pb-6">
            {caktoComponents.map((component) => {
              const IconComponent = component.icon;
              return (
                <div
                  key={component.type}
                  style={{
                    transform: 'translate3d(0px, 0px, 0) scaleX(1) scaleY(1)',
                    opacity: 1
                  }}
                  role="button"
                  tabIndex={0}
                  className="bg-zinc-950/50 relative hover:z-30 cursor-grab active:cursor-grabbing transition-all duration-200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.type)}
                  onClick={() => onAddElement(component.type)}
                >
                  <div className="text-zinc-100 cursor-move col-span-4 rounded border border-zinc-700 hover:border-zinc-500 items-center py-2 px-3 gap-2 ease relative flex hover:bg-zinc-800/30 transition-all">
                    <div className="relative w-auto">
                      <IconComponent className={`h-4 w-4 ${component.color}`} />
                    </div>
                    <div className="text-xs py-1 text-zinc-200 font-medium">
                      {component.label}
                    </div>
                    {component.isNew && <NewBadge />}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom padding */}
          <div className="py-8"></div>
        </div>
      </div>

      {/* Tip Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-zinc-900/95 border-t border-zinc-700">
        <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-800/30">
          <h4 className="text-xs font-medium text-blue-300 mb-1">
            💡 Dica
          </h4>
          <p className="text-[10px] text-blue-200/70 leading-relaxed">
            Arraste os componentes para o canvas ou clique para adicionar. Use Ctrl+Z para desfazer.
          </p>
        </div>
      </div>
    </div>
  );
};
