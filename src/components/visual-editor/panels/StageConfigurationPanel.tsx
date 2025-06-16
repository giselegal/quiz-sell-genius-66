
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { VisualStage, VisualElement } from '@/types/visualEditor';

interface StageConfigurationPanelProps {
  stage?: VisualStage;
  selectedElement?: VisualElement;
  onStageUpdate: (updates: Partial<VisualStage>) => void;
  onElementUpdate: (updates: Partial<VisualElement>) => void;
}

export const StageConfigurationPanel: React.FC<StageConfigurationPanelProps> = ({
  stage,
  selectedElement,
  onStageUpdate,
  onElementUpdate
}) => {
  if (!stage && !selectedElement) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Selecione uma etapa ou elemento para editar suas propriedades</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Propriedades</h3>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue={selectedElement ? 'element' : 'stage'} className="h-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="stage" disabled={!stage}>Etapa</TabsTrigger>
            <TabsTrigger value="element" disabled={!selectedElement}>Elemento</TabsTrigger>
          </TabsList>

          <TabsContent value="stage" className="p-4 space-y-4">
            {stage && (
              <>
                <Card className="p-4 space-y-4">
                  <h4 className="font-medium">Configurações da Etapa</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stage-title">Título</Label>
                    <Input
                      id="stage-title"
                      value={stage.title}
                      onChange={(e) => onStageUpdate({ title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stage-type">Tipo</Label>
                    <Select
                      value={stage.type}
                      onValueChange={(value) => onStageUpdate({ type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intro">Introdução</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="strategic">Estratégica</SelectItem>
                        <SelectItem value="transition">Transição</SelectItem>
                        <SelectItem value="result">Resultado</SelectItem>
                        <SelectItem value="offer">Oferta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Cor de Fundo</Label>
                    <Input
                      id="bg-color"
                      type="color"
                      value={stage.settings.backgroundColor || '#ffffff'}
                      onChange={(e) => onStageUpdate({
                        settings: {
                          ...stage.settings,
                          backgroundColor: e.target.value
                        }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-header">Mostrar Cabeçalho</Label>
                    <Switch
                      id="show-header"
                      checked={stage.settings.showHeader}
                      onCheckedChange={(checked) => onStageUpdate({
                        settings: {
                          ...stage.settings,
                          showHeader: checked
                        }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-progress">Mostrar Progresso</Label>
                    <Switch
                      id="show-progress"
                      checked={stage.settings.showProgress}
                      onCheckedChange={(checked) => onStageUpdate({
                        settings: {
                          ...stage.settings,
                          showProgress: checked
                        }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-back">Permitir Voltar</Label>
                    <Switch
                      id="allow-back"
                      checked={stage.settings.allowBack}
                      onCheckedChange={(checked) => onStageUpdate({
                        settings: {
                          ...stage.settings,
                          allowBack: checked
                        }
                      })}
                    />
                  </div>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="element" className="p-4 space-y-4">
            {selectedElement && (
              <>
                <Card className="p-4 space-y-4">
                  <h4 className="font-medium">Propriedades do Elemento</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="element-type">Tipo</Label>
                    <Input
                      id="element-type"
                      value={selectedElement.type}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  {selectedElement.content.text !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-text">Texto</Label>
                      <Textarea
                        id="element-text"
                        value={selectedElement.content.text || ''}
                        onChange={(e) => onElementUpdate({
                          content: {
                            ...selectedElement.content,
                            text: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}

                  {selectedElement.content.src !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-src">URL da Imagem</Label>
                      <Input
                        id="element-src"
                        value={selectedElement.content.src || ''}
                        onChange={(e) => onElementUpdate({
                          content: {
                            ...selectedElement.content,
                            src: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}

                  {selectedElement.content.alt !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-alt">Texto Alternativo</Label>
                      <Input
                        id="element-alt"
                        value={selectedElement.content.alt || ''}
                        onChange={(e) => onElementUpdate({
                          content: {
                            ...selectedElement.content,
                            alt: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="element-visible">Visível</Label>
                    <Switch
                      id="element-visible"
                      checked={selectedElement.visible}
                      onCheckedChange={(checked) => onElementUpdate({ visible: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="element-locked">Bloqueado</Label>
                    <Switch
                      id="element-locked"
                      checked={selectedElement.locked}
                      onCheckedChange={(checked) => onElementUpdate({ locked: checked })}
                    />
                  </div>
                </Card>

                <Card className="p-4 space-y-4">
                  <h4 className="font-medium">Estilos</h4>
                  
                  {selectedElement.style.color !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-color">Cor do Texto</Label>
                      <Input
                        id="element-color"
                        type="color"
                        value={selectedElement.style.color || '#000000'}
                        onChange={(e) => onElementUpdate({
                          style: {
                            ...selectedElement.style,
                            color: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}

                  {selectedElement.style.backgroundColor !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-bg-color">Cor de Fundo</Label>
                      <Input
                        id="element-bg-color"
                        type="color"
                        value={selectedElement.style.backgroundColor || '#ffffff'}
                        onChange={(e) => onElementUpdate({
                          style: {
                            ...selectedElement.style,
                            backgroundColor: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}

                  {selectedElement.style.fontSize !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-font-size">Tamanho da Fonte</Label>
                      <Input
                        id="element-font-size"
                        value={selectedElement.style.fontSize || ''}
                        onChange={(e) => onElementUpdate({
                          style: {
                            ...selectedElement.style,
                            fontSize: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}

                  {selectedElement.style.textAlign !== undefined && (
                    <div className="space-y-2">
                      <Label htmlFor="element-text-align">Alinhamento</Label>
                      <Select
                        value={selectedElement.style.textAlign || 'left'}
                        onValueChange={(value) => onElementUpdate({
                          style: {
                            ...selectedElement.style,
                            textAlign: value as 'left' | 'center' | 'right'
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Esquerda</SelectItem>
                          <SelectItem value="center">Centro</SelectItem>
                          <SelectItem value="right">Direita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
