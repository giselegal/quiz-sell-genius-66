
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutTemplate,
  Image,
  Type,
  ListChecks,
  MessageSquare,
  DollarSign,
  Shield,
  MousePointer,
  Award,
  Layout,
  Gift
} from 'lucide-react';
import { BlockType } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: BlockType) => void;
}

export function ComponentsSidebar({ onComponentSelect }: ComponentsSidebarProps) {
  const components = [
    { type: 'header' as BlockType, label: 'Cabeçalho', icon: LayoutTemplate },
    { type: 'hero-section' as BlockType, label: 'Seção Hero', icon: Layout },
    { type: 'bonus-carousel' as BlockType, label: 'Carrossel de Bônus', icon: Gift },
    { type: 'headline' as BlockType, label: 'Título', icon: Type },
    { type: 'image' as BlockType, label: 'Imagem', icon: Image },
    { type: 'text' as BlockType, label: 'Texto', icon: Type },
    { type: 'benefits' as BlockType, label: 'Benefícios', icon: ListChecks },
    { type: 'testimonials' as BlockType, label: 'Depoimentos', icon: MessageSquare },
    { type: 'pricing' as BlockType, label: 'Preço', icon: DollarSign },
    { type: 'guarantee' as BlockType, label: 'Garantia', icon: Shield },
    { type: 'cta' as BlockType, label: 'Botão CTA', icon: MousePointer },
    { type: 'style-result' as BlockType, label: 'Resultado do Estilo', icon: Award },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-semibold text-[#432818]">Componentes</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {components.map((component) => (
            <Button
              key={component.type}
              variant="ghost"
              className="w-full justify-start text-[#8F7A6A] hover:text-[#432818] hover:bg-[#FAF9F7]"
              onClick={() => onComponentSelect(component.type)}
            >
              <component.icon className="w-4 h-4 mr-2" />
              {component.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
