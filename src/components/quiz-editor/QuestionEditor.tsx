
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Upload } from 'lucide-react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { generateId } from '@/utils/idGenerator';

interface QuestionEditorProps {
  question: QuizQuestion;
  onUpdate: (question: QuizQuestion) => void;
  onDelete: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onUpdate,
  onDelete
}) => {
  const [localQuestion, setLocalQuestion] = useState<QuizQuestion>(question);

  const updateQuestion = (updates: Partial<QuizQuestion>) => {
    const updatedQuestion = { ...localQuestion, ...updates };
    setLocalQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
  };

  const addOption = () => {
    const newOption: QuizOption = {
      id: generateId(),
      text: 'Nova opção',
      styleCategory: 'Natural'
    };
    
    updateQuestion({
      options: [...localQuestion.options, newOption]
    });
  };

  const updateOption = (optionIndex: number, updates: Partial<QuizOption>) => {
    const updatedOptions = localQuestion.options.map((option, index) =>
      index === optionIndex ? { ...option, ...updates } : option
    );
    updateQuestion({ options: updatedOptions });
  };

  const deleteOption = (optionIndex: number) => {
    const updatedOptions = localQuestion.options.filter((_, index) => index !== optionIndex);
    updateQuestion({ options: updatedOptions });
  };

  const handleImageUpload = (file: File, isQuestionImage: boolean = true, optionIndex?: number) => {
    // Simulate image upload
    const imageUrl = URL.createObjectURL(file);
    
    if (isQuestionImage) {
      updateQuestion({ imageUrl });
    } else if (typeof optionIndex === 'number') {
      updateOption(optionIndex, { imageUrl });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Pergunta {localQuestion.id}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Question Title */}
        <div className="space-y-2">
          <Label htmlFor={`title-${localQuestion.id}`}>Título da Pergunta</Label>
          <Input
            id={`title-${localQuestion.id}`}
            value={localQuestion.title}
            onChange={(e) => updateQuestion({ title: e.target.value })}
            placeholder="Digite o título da pergunta"
          />
        </div>

        {/* Question Subtitle */}
        <div className="space-y-2">
          <Label htmlFor={`subtitle-${localQuestion.id}`}>Subtítulo (opcional)</Label>
          <Input
            id={`subtitle-${localQuestion.id}`}
            value={localQuestion.subtitle || ''}
            onChange={(e) => updateQuestion({ subtitle: e.target.value })}
            placeholder="Digite o subtítulo da pergunta"
          />
        </div>

        {/* Question Type */}
        <div className="space-y-2">
          <Label>Tipo de Pergunta</Label>
          <Select
            value={localQuestion.type}
            onValueChange={(value: QuizQuestion['type']) => updateQuestion({ type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Escolha única</SelectItem>
              <SelectItem value="multiple">Múltipla escolha</SelectItem>
              <SelectItem value="text">Texto livre</SelectItem>
              <SelectItem value="both">Mista (imagem + texto)</SelectItem>
              <SelectItem value="image">Apenas imagem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Multi-select count for multiple choice */}
        {localQuestion.type === 'multiple' && (
          <div className="space-y-2">
            <Label htmlFor={`multiSelect-${localQuestion.id}`}>Número máximo de seleções</Label>
            <Input
              id={`multiSelect-${localQuestion.id}`}
              type="number"
              min="2"
              max={localQuestion.options.length}
              value={localQuestion.multiSelect || 2}
              onChange={(e) => updateQuestion({ multiSelect: parseInt(e.target.value) || 2 })}
            />
          </div>
        )}

        {/* Question Image */}
        <div className="space-y-2">
          <Label>Imagem da Pergunta (opcional)</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, true);
              }}
              className="hidden"
              id={`question-image-${localQuestion.id}`}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById(`question-image-${localQuestion.id}`)?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Imagem
            </Button>
            {localQuestion.imageUrl && (
              <img
                src={localQuestion.imageUrl}
                alt="Question preview"
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* Options Section - only for choice-based questions */}
        {(localQuestion.type === 'single' || localQuestion.type === 'multiple' || localQuestion.type === 'both' || localQuestion.type === 'image') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Opções de Resposta</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Opção
              </Button>
            </div>

            {localQuestion.options.map((option, index) => (
              <Card key={option.id} className="p-4 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Opção {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Texto da Opção</Label>
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(index, { text: e.target.value })}
                      placeholder="Digite o texto da opção"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Categoria de Estilo</Label>
                    <Select
                      value={option.styleCategory}
                      onValueChange={(value: QuizOption['styleCategory']) => 
                        updateOption(index, { styleCategory: value })
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

                  <div className="space-y-2">
                    <Label>Pontos</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={option.points || 1}
                      onChange={(e) => updateOption(index, { points: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  {/* Option Image */}
                  {(localQuestion.type === 'both' || localQuestion.type === 'image') && (
                    <div className="space-y-2">
                      <Label>Imagem da Opção</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, false, index);
                          }}
                          className="hidden"
                          id={`option-image-${option.id}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`option-image-${option.id}`)?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                        {option.imageUrl && (
                          <img
                            src={option.imageUrl}
                            alt={`Option ${index + 1} preview`}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionEditor;

