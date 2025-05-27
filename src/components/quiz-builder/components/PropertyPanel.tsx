
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
import EnhancedImageProperties from './EnhancedImageProperties';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDelete: (id: string) => void;
}

export const PropertyPanel: React.FC<PropertiesPanelProps> = ({
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
    return (
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
            
            <div className="space-y-2">
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
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (component) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">Propriedades do Componente</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="content" className="flex-1 flex flex-col">
          <div className="border-b">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="style" className="flex-1">
                Estilo
              </TabsTrigger>
            </TabsList>
          </div>
          
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
                  
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Input 
                      value={component.data.subtitle || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, subtitle: e.target.value } 
                      })}
                      placeholder="Subtítulo opcional"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'text' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Conteúdo do Texto</Label>
                    <Textarea 
                      value={component.data.text || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, text: e.target.value } 
                      })}
                      className="min-h-[200px]"
                      placeholder="Digite seu texto aqui"
                    />
                  </div>
                </div>
              )}

              {component.type === 'image' && (
                <EnhancedImageProperties 
                  data={component.data}
                  onUpdate={(data) => onUpdate(component.id, { data })}
                />
              )}

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
                    <Input 
                      type="color"
                      value={component.style?.backgroundColor || '#ffffff'} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      })}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      type="text"
                      value={component.style?.backgroundColor || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      })}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color"
                      value={component.style?.textColor || '#000000'} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, textColor: e.target.value } 
                      })}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      type="text"
                      value={component.style?.textColor || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, textColor: e.target.value } 
                      })}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    );
  }

  return null;
};
