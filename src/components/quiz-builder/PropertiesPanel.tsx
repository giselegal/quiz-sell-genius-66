
import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { XCircle, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import EnhancedImageProperties from './components/EnhancedImageProperties';
interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDelete: (id: string) => void;
}
export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  stage,
  onClose,
  onUpdate,
  onUpdateStage,
  onDelete
}) => {
  if (!component && !stage) {
    return (
      <div className="h-full flex flex-col text-gray-400 p-6 items-center justify-center text-center">
        <Settings className="h-12 w-12 mb-4 text-gray-500" />
        <h3 className="text-lg font-medium mb-2">Nenhum item selecionado</h3>
        <p className="text-gray-400">
          Selecione um componente ou uma etapa para editar suas propriedades
        </p>
      </div>
    );
  }
  if (stage && !component) {
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">Propriedades da Etapa</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título da Etapa</Label>
              <Input 
                value={stage.title || ''} 
                onChange={(e) => onUpdateStage(stage.id, { title: e.target.value })}
                placeholder="Título da etapa"
              />
            </div>
            
              <Label>Tipo</Label>
              <Select 
                value={stage.type} 
                onValueChange={(value) => onUpdateStage(stage.id, { type: value as QuizStage['type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Capa</SelectItem>
                  <SelectItem value="question">Questão</SelectItem>
                  <SelectItem value="result">Resultado</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </ScrollArea>
  if (component) {
          <h2 className="font-medium">Propriedades do Componente</h2>
        <Tabs defaultValue="content" className="flex-1 flex flex-col">
          <div className="border-b">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="style" className="flex-1">
                Estilo
            </TabsList>
          
          <ScrollArea className="flex-1">
            <TabsContent value="content" className="mt-0 p-4">
              {component.type === 'header' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Título Principal</Label>
                    <Input 
                      value={component.data.title || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, title: e.target.value } 
                      })}
                      placeholder="Título principal"
                    />
                  </div>
                  
                    <Label>Subtítulo</Label>
                      value={component.data.subtitle || ''} 
                        data: { ...component.data, subtitle: e.target.value } 
                      placeholder="Subtítulo opcional"
                </div>
              )}
              
              {component.type === 'headline' && (
                    <Label>Texto do Título</Label>
                      placeholder="Título da seção"
              {component.type === 'text' && (
                    <Label>Conteúdo do Texto</Label>
                    <Textarea 
                      value={component.data.text || ''} 
                        data: { ...component.data, text: e.target.value } 
                      className="min-h-[200px]"
                      placeholder="Digite seu texto aqui"
              {component.type === 'image' && (
                <EnhancedImageProperties 
                  data={component.data}
                  onUpdate={(data) => onUpdate(component.id, { data })}
                />
              {(component.type === 'multipleChoice' || component.type === 'singleChoice') && (
                    <Label>Pergunta</Label>
                      value={component.data.question || ''} 
                        data: { ...component.data, question: e.target.value } 
                      placeholder="Digite a pergunta"
                    <Label>Opções</Label>
                    {component.data.options && component.data.options.map((option, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input 
                          value={option} 
                          onChange={(e) => {
                            const newOptions = [...(component.data.options || [])];
                            newOptions[index] = e.target.value;
                            onUpdate(component.id, { 
                              data: { ...component.data, options: newOptions } 
                            });
                          }}
                          placeholder={`Opção ${index + 1}`}
                        />
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => {
                            newOptions.splice(index, 1);
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        const newOptions = [...(component.data.options || []), ''];
                        onUpdate(component.id, { 
                          data: { ...component.data, options: newOptions } 
                        });
                      }}
                      className="w-full mt-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
                    >
                      Adicionar Opção
                    </Button>
              <div className="mt-6 pt-4 border-t">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => onDelete(component.id)}
                >
                  Excluir Componente
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="style" className="mt-0 p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Cor de Fundo</Label>
                  <div className="flex gap-2">
                      type="color"
                      value={component.style?.backgroundColor || '#ffffff'} 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      className="w-12 h-10 p-1"
                      type="text"
                      value={component.style?.backgroundColor || ''} 
                      className="flex-1"
                      placeholder="#ffffff"
                
                  <Label>Cor do Texto</Label>
                      value={component.style?.textColor || '#000000'} 
                        style: { ...component.style, textColor: e.target.value } 
                      value={component.style?.textColor || ''} 
                      placeholder="#000000"
                  <Label>Arredondamento de Bordas</Label>
                  <Select 
                    value={component.style?.borderRadius || 'none'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, borderRadius: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem Arredondamento</SelectItem>
                      <SelectItem value="sm">Pequeno</SelectItem>
                      <SelectItem value="md">Médio</SelectItem>
                      <SelectItem value="lg">Grande</SelectItem>
                      <SelectItem value="full">Completo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label>Padding Vertical</Label>
                    value={component.style?.paddingY || '4'} 
                      style: { ...component.style, paddingY: value } 
                      <SelectItem value="0">Nenhum</SelectItem>
                      <SelectItem value="2">Extra Pequeno (0.5rem)</SelectItem>
                      <SelectItem value="4">Pequeno (1rem)</SelectItem>
                      <SelectItem value="6">Médio (1.5rem)</SelectItem>
                      <SelectItem value="8">Grande (2rem)</SelectItem>
                      <SelectItem value="12">Extra Grande (3rem)</SelectItem>
                  <Label>Padding Horizontal</Label>
                    value={component.style?.paddingX || '4'} 
                      style: { ...component.style, paddingX: value } 
          </ScrollArea>
        </Tabs>
  return null;
};
