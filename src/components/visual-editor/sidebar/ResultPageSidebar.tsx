
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Trophy,
  DollarSign,
  MessageSquare,
  Shield,
  Star,
  Gift,
  User,
  Type,
  Image,
  FileText
} from 'lucide-react';
import { ResultPageBlockType } from '@/types/resultPageEditor';
import { StyleResult } from '@/types/quiz';

interface ResultPageSidebarProps {
  onComponentAdd: (type: ResultPageBlockType) => void;
  primaryStyle: StyleResult;
}

export const ResultPageSidebar: React.FC<ResultPageSidebarProps> = ({
  onComponentAdd,
  primaryStyle
}) => {
  const resultComponents = [
    { type: 'styleResult', icon: Trophy, label: 'Resultado do Estilo', color: 'text-yellow-600' },
    { type: 'hero', icon: Star, label: 'Seção Hero', color: 'text-blue-600' },
    { type: 'pricing', icon: DollarSign, label: 'Preços & Oferta', color: 'text-green-600' },
    { type: 'testimonials', icon: MessageSquare, label: 'Depoimentos', color: 'text-purple-600' },
    { type: 'guarantee', icon: Shield, label: 'Garantia', color: 'text-emerald-600' },
    { type: 'benefits', icon: Gift, label: 'Benefícios', color: 'text-orange-600' },
    { type: 'mentor', icon: User, label: 'Sobre o Mentor', color: 'text-indigo-600' }
  ];

  const basicComponents = [
    { type: 'title', icon: Type, label: 'Título', color: 'text-gray-600' },
    { type: 'text', icon: FileText, label: 'Texto', color: 'text-gray-600' },
    { type: 'image', icon: Image, label: 'Imagem', color: 'text-gray-600' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-2">Editor da Página de Resultado</h2>
        <p className="text-sm text-gray-600">Estilo: {primaryStyle.category}</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Componentes Específicos da Página de Resultado */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Componentes de Resultado</h3>
            <div className="space-y-1">
              {resultComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <Button
                    key={component.type}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 h-10 px-3 text-gray-700 hover:bg-gray-100"
                    onClick={() => onComponentAdd(component.type as ResultPageBlockType)}
                  >
                    <Icon className={`w-4 h-4 ${component.color}`} />
                    <span className="text-sm">{component.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Componentes Básicos */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Componentes Básicos</h3>
            <div className="space-y-1">
              {basicComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <Button
                    key={component.type}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 h-10 px-3 text-gray-700 hover:bg-gray-100"
                    onClick={() => onComponentAdd(component.type as ResultPageBlockType)}
                  >
                    <Icon className={`w-4 h-4 ${component.color}`} />
                    <span className="text-sm">{component.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
