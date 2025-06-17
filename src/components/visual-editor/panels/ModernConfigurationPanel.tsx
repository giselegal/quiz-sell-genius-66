import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Type, Settings, Image } from 'lucide-react';

interface QuestionOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory: string;
  points: number;
}

interface QuestionData {
  id: string;
  title: string;
  options: QuestionOption[];
  multiSelect?: boolean;
}

interface ModernConfigurationPanelProps {
  stageName: string;
  stageType: string;
  questionData?: QuestionData;
  onUpdate?: (data: unknown) => void;
}

export const ModernConfigurationPanel: React.FC<ModernConfigurationPanelProps> = ({
  stageName,
  stageType,
  questionData,
  onUpdate
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
    <div className="overflow-hidden canvas-editor hidden md:block w-full max-w-[24rem] relative overflow-auto-container sm-scrollbar border-l z-[50]">
      <ScrollArea className="h-full w-full">
        <div className="p-4 space-y-4">
          
          {/* Modern Header */}
          <div className="pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={`${typeInfo.color} text-white text-xs px-3 py-1`}>
                {typeInfo.label}
              </Badge>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{stageName}</h2>
            <p className="text-sm text-gray-500 mt-1">Configure as opções da questão</p>
          </div>

          {/* Question Title */}
          {(stageType.startsWith('question-') || stageType.startsWith('strategic-')) && (
            <Card className="border-0 shadow-sm bg-gray-50/50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-gray-600" />
                    <Label className="text-sm font-medium text-gray-700">Título da Questão</Label>
                  </div>
                  <Input
                    value={questionData?.title || ""}
                    onChange={(e) => onUpdate?.({ ...questionData, title: e.target.value })}
                    placeholder="Digite o título da questão..."
                    className="bg-white border-gray-200 focus:border-blue-400 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Options Management - MODERN & INTUITIVE */}
          {(stageType.startsWith('question-') || stageType.startsWith('strategic-')) && (
            <>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Plus className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">Opções de Resposta</h3>
                        <p className="text-xs text-gray-500">{questionData?.options?.length || 0} opções</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        const newOption = {
                          id: `option-${Date.now()}`,
                          text: "Nova opção",
                          styleCategory: "Padrão",
                          points: 10,
                          imageUrl: ""
                        };
                        const updatedOptions = [...(questionData?.options || []), newOption];
                        onUpdate?.({ ...questionData, options: updatedOptions });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-80 overflow-y-auto pt-0">
                  {questionData?.options?.map((option, index) => (
                    <div key={option.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
                      
                      {/* Option Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {option.imageUrl && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                              <img 
                                src={option.imageUrl} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-700">{index + 1}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Opção {index + 1}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const updatedOptions = questionData?.options?.filter(opt => opt.id !== option.id) || [];
                            onUpdate?.({ ...questionData, options: updatedOptions });
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0 rounded-lg"
                          title="Remover opção"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Option Text */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Texto da Opção</Label>
                        <Input
                          value={option.text}
                          onChange={(e) => {
                            const updatedOptions = questionData?.options?.map(opt =>
                              opt.id === option.id ? { ...opt, text: e.target.value } : opt
                            ) || [];
                            onUpdate?.({ ...questionData, options: updatedOptions });
                          }}
                          placeholder="Digite o texto da opção..."
                          className="bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400 text-sm h-9"
                        />
                      </div>
                      
                      {/* Image Upload */}
                      <div className="space-y-3">
                        <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Imagem (Opcional)</Label>
                        <div className="space-y-2">
                          <Input
                            value={option.imageUrl || ""}
                            onChange={(e) => {
                              const updatedOptions = questionData?.options?.map(opt =>
                                opt.id === option.id ? { ...opt, imageUrl: e.target.value } : opt
                              ) || [];
                              onUpdate?.({ ...questionData, options: updatedOptions });
                            }}
                            placeholder="Cole a URL da imagem..."
                            className="bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400 text-sm h-9"
                          />
                          {option.imageUrl && (
                            <div className="relative">
                              <img 
                                src={option.imageUrl} 
                                alt="Preview" 
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const updatedOptions = questionData?.options?.map(opt =>
                                    opt.id === option.id ? { ...opt, imageUrl: "" } : opt
                                  ) || [];
                                  onUpdate?.({ ...questionData, options: updatedOptions });
                                }}
                                className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/80 hover:bg-white border border-gray-200 rounded"
                              >
                                <Trash2 className="w-3 h-3 text-gray-600" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Nenhuma opção criada</p>
                          <p className="text-xs text-gray-400 mt-1">Clique em "Adicionar" para criar a primeira opção</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Question Settings */}
              <Card className="border-0 shadow-sm bg-gray-50/50">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-4 h-4 text-gray-600" />
                      <Label className="text-sm font-medium text-gray-700">Configurações da Questão</Label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Seleção múltipla</Label>
                        <p className="text-xs text-gray-500 mt-1">Permite selecionar várias opções</p>
                      </div>
                      <Switch
                        checked={questionData?.multiSelect || false}
                        onCheckedChange={(checked) => onUpdate?.({ ...questionData, multiSelect: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="pb-4"></div>
        </div>
      </ScrollArea>
    </div>
  );
};
