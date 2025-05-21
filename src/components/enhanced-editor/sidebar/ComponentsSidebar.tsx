
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type, 
  Image, 
  ListChecks, 
  MessageSquare, 
  DollarSign, 
  Shield, 
  MousePointer,
  Layout,
  Award,
  Gift,
  LayoutTemplate,
  Quote,
  ImagePlus
} from 'lucide-react';
import { Block } from '@/types/editor';
import { ComponentItem } from './ComponentItem';

interface ComponentsSidebarProps {
  onComponentSelect: (type: Block['type']) => void;
}

export function ComponentsSidebar({ onComponentSelect }: ComponentsSidebarProps) {
  // Group components by category
  const basicComponents = [
    { type: 'headline', label: 'Título', icon: Type, description: 'Título e subtítulo' },
    { type: 'text', label: 'Texto', icon: Type, description: 'Bloco de texto simples' },
    { type: 'image', label: 'Imagem', icon: Image, description: 'Imagem com legenda opcional' },
  ];
  
  const layoutComponents = [
    { type: 'header', label: 'Cabeçalho', icon: LayoutTemplate, description: 'Seção de cabeçalho' },
    { type: 'hero-section', label: 'Seção Hero', icon: Layout, description: 'Seção principal destacada' },
    { type: 'columns', label: 'Colunas', icon: Layout, description: 'Layout em colunas' },
  ];
  
  const contentComponents = [
    { type: 'benefits', label: 'Benefícios', icon: ListChecks, description: 'Lista de benefícios' },
    { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare, description: 'Depoimentos de clientes' },
    { type: 'guarantee', label: 'Garantia', icon: Shield, description: 'Seção de garantia' },
    { type: 'cta', label: 'Botão CTA', icon: MousePointer, description: 'Chamada para ação' },
  ];
  
  const quizComponents = [
    { type: 'style-result', label: 'Resultado do Estilo', icon: Award, description: 'Exibe o resultado do estilo' },
    { type: 'secondary-styles', label: 'Estilos Secundários', icon: Layout, description: 'Exibe estilos secundários' },
    { type: 'bonus', label: 'Bônus', icon: Gift, description: 'Seção de bônus' },
    { type: 'bonus-carousel', label: 'Carrossel de Bônus', icon: ImagePlus, description: 'Exibe bônus em carrossel' },
  ];
  
  return (
    <div className="h-full bg-white flex flex-col border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-medium text-[#432818]">Componentes</h2>
      </div>
      
      <Tabs defaultValue="basic" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <TabsContent value="basic" className="m-0 space-y-2">
            {basicComponents.map((component) => (
              <ComponentItem
                key={component.type}
                type={component.type as Block['type']}
                label={component.label}
                icon={component.icon}
                description={component.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="layout" className="m-0 space-y-2">
            {layoutComponents.map((component) => (
              <ComponentItem
                key={component.type}
                type={component.type as Block['type']}
                label={component.label}
                icon={component.icon}
                description={component.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="content" className="m-0 space-y-2">
            {contentComponents.map((component) => (
              <ComponentItem
                key={component.type}
                type={component.type as Block['type']}
                label={component.label}
                icon={component.icon}
                description={component.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="quiz" className="m-0 space-y-2">
            {quizComponents.map((component) => (
              <ComponentItem
                key={component.type}
                type={component.type as Block['type']}
                label={component.label}
                icon={component.icon}
                description={component.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
