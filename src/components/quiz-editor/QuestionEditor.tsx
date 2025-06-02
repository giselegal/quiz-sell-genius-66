
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { QuestionEditorProps } from './QuestionEditorProps';
import { generateId } from '@/utils/idGenerator';

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onSave,
  onCancel,
  onDelete
}) => {
  const [localQuestion, setLocalQuestion] = useState<QuizQuestion>(question);

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  const handleSave = () => {
    onSave(localQuestion);
  };

  const updateQuestion = (updates: Partial<QuizQuestion>) => {
    setLocalQuestion(prev => ({ ...prev, ...updates }));
  };

  const addOption = () => {
    const newOption: QuizOption = {
      id: generateId(),
      text: 'Nova opção',
      styleCategory: 'Natural',
      points: 1
    };

    updateQuestion({
      options: [...localQuestion.options, newOption]
    });
  };

  const updateOption = (optionId: string, updates: Partial<QuizOption>) => {
    const updatedOptions = localQuestion.options.map(option =>
      option.id === optionId ? { ...option, ...updates } : option
    );
    updateQuestion({ options: updatedOptions });
  };

  const deleteOption = (optionId: string) => {
    const updatedOptions = localQuestion.options.filter(option => option.id !== optionId);
    updateQuestion({ options: updatedOptions });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Editar Pergunta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={localQuestion.title}
            onChange={(e) => updateQuestion({ title: e.target.value })}
            placeholder="Digite o título da pergunta"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={localQuestion.subtitle || ''}
            onChange={(e) => updateQuestion({ subtitle: e.target.value })}
            placeholder="Digite o subtítulo (opcional)"
          />
        </div>

        <div>
          <Label>Tipo de Pergunta</Label>
          <Select
            value={localQuestion.type}
            onValueChange={(value: QuizQuestion['type']) => updateQuestion({ type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Escolha única</SelectItem>
              <SelectItem value="multiple">Múltipla escolha</SelectItem>
              <SelectItem value="text">Texto livre</SelectItem>
              <SelectItem value="both">Mista</SelectItem>
              <SelectItem value="image">Apenas imagem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {localQuestion.type === 'multiple' && (
          <div>
            <Label htmlFor="multiSelect">Número máximo de seleções</Label>
            <Input
              id="multiSelect"
              type="number"
              min="2"
              max={localQuestion.options.length}
              value={localQuestion.multiSelect || 2}
              onChange={(e) => updateQuestion({ multiSelect: parseInt(e.target.value) || 2 })}
            />
          </div>
        )}

        {/* Options Section */}
        {['single', 'multiple', 'both', 'image'].includes(localQuestion.type) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Opções</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
              >
                Adicionar Opção
              </Button>
            </div>

            {localQuestion.options.map((option, optionIndex) => (
              <Card key={option.id} className="p-3 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Opção {optionIndex + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteOption(option.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </Button>
                  </div>

                  <div>
                    <Label>Texto</Label>
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(option.id, { text: e.target.value })}
                      placeholder="Digite o texto da opção"
                    />
                  </div>

                  <div>
                    <Label>Categoria de Estilo</Label>
                    <Select
                      value={option.styleCategory}
                      onValueChange={(value: QuizOption['styleCategory']) => 
                        updateOption(option.id, { styleCategory: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Natural">Natural</SelectItem>
                        <SelectItem value="Clássico">Clássico</SelectItem>
                        <SelectItem value="Contemporâneo">Contemporâneo</SelectItem>
                        <SelectItem value="Elegante">Elegante</SelectItem>
                        <SelectItem value="Romântico">Romântico</SelectItem>
                        <SelectItem value="Sexy">Sexy</SelectItem>
                        <SelectItem value="Dramático">Dramático</SelectItem>
                        <SelectItem value="Criativo">Criativo</SelectItem>
                        <SelectItem value="Strategic">Strategic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Pontos</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={option.points || 1}
                      onChange={(e) => updateOption(option.id, { points: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Excluir
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
