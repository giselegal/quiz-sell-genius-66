
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StageConfigurationPanelProps {
  stageName: string;
  stageType: string;
  questionData?: any;
}

export const StageConfigurationPanel: React.FC<StageConfigurationPanelProps> = ({
  stageName,
  stageType,
  questionData
}) => {
  const getStageTypeInfo = (type: string) => {
    if (type.startsWith('question-')) return { label: 'Questão Regular', color: 'bg-blue-500' };
    if (type.startsWith('strategic-')) return { label: 'Questão Estratégica', color: 'bg-purple-500' };
    if (type === 'intro') return { label: 'Introdução', color: 'bg-green-500' };
    if (type === 'transition') return { label: 'Transição', color: 'bg-yellow-500' };
    if (type === 'result') return { label: 'Resultado', color: 'bg-orange-500' };
    if (type === 'offer') return { label: 'Oferta', color: 'bg-red-500' };
    return { label: 'Desconhecido', color: 'bg-gray-500' };
  };

  const typeInfo = getStageTypeInfo(stageType);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Configurações</h3>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`${typeInfo.color} text-white`}>
            {typeInfo.label}
          </Badge>
          <span className="text-sm text-gray-600">{stageName}</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Question Data Section */}
          {questionData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Dados da Questão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="question-title" className="text-xs">Título</Label>
                  <Textarea
                    id="question-title"
                    value={questionData.title || ''}
                    readOnly
                    className="mt-1 text-sm bg-gray-50"
                    rows={2}
                  />
                </div>

                <div>
                  <Label className="text-xs">Tipo</Label>
                  <Input
                    value={questionData.type || 'N/A'}
                    readOnly
                    className="mt-1 text-sm bg-gray-50"
                  />
                </div>

                <div>
                  <Label className="text-xs">Seleções Necessárias</Label>
                  <Input
                    value={questionData.multiSelect || 1}
                    readOnly
                    className="mt-1 text-sm bg-gray-50"
                  />
                </div>

                {/* Options */}
                {questionData.options && questionData.options.length > 0 && (
                  <div>
                    <Label className="text-xs mb-2 block">Opções ({questionData.options.length})</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {questionData.options.map((option: any, index: number) => (
                        <div key={option.id} className="p-2 bg-gray-50 rounded text-xs">
                          <div className="font-medium">
                            {String.fromCharCode(65 + index)}) {option.text}
                          </div>
                          <div className="text-gray-500 mt-1">
                            Categoria: {option.styleCategory} | Pontos: {option.points}
                          </div>
                          {option.imageUrl && (
                            <div className="mt-1">
                              <img 
                                src={option.imageUrl} 
                                alt={option.text}
                                className="w-16 h-12 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/64x48/ccc/666?text=Img';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* General Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="stage-name" className="text-xs">Nome da Etapa</Label>
                <Input
                  id="stage-name"
                  value={stageName}
                  className="mt-1 text-sm"
                  placeholder="Nome da etapa"
                />
              </div>

              <div>
                <Label htmlFor="stage-description" className="text-xs">Descrição</Label>
                <Textarea
                  id="stage-description"
                  placeholder="Descrição da etapa..."
                  className="mt-1 text-sm"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stage Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Duplicar Etapa
              </Button>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Exportar Configuração
              </Button>
              <Button variant="destructive" size="sm" className="w-full text-xs">
                Excluir Etapa
              </Button>
            </CardContent>
          </Card>

          {/* Debug Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xs text-gray-500">Debug Info</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-gray-500 overflow-auto">
                ID: {stageType}
                {questionData && (
                  <>
                    <br />Questão ID: {questionData.id}
                    <br />Opções: {questionData.options?.length || 0}
                  </>
                )}
              </pre>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};
