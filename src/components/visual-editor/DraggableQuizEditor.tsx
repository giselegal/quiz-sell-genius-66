import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, GripVertical, Eye, Save, Download, Upload } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';
import SortableQuestionItem from './SortableQuestionItem';
import { cn } from '@/lib/utils';

interface QuizComponentData {
  type: string;
  content: any;
}

interface StyleSettings {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  paddingX?: number;
  paddingY?: number;
}

interface QuestionSettings {
  questionText?: string;
  questionType?: 'text' | 'image' | 'both';
  multiSelect?: number;
  options?: string[];
  optionImages?: string[];
  layout?: {
    columns: number;
  };
  displayType?: 'text' | 'image' | 'both';
  imageSize?: 'small' | 'medium' | 'large';
  selectionIndicator?: 'border' | 'checkbox' | 'highlight';
  backgroundColorQuestion?: string;
  textColorQuestion?: string;
}

const initialQuestions: QuizQuestion[] = [
  {
    id: '1',
    text: 'Qual seu estilo favorito?',
    title: 'Qual seu estilo favorito?',
    type: 'image',
    multiSelect: 1,
    options: [
      { id: '1a', text: 'Casual', styleCategory: 'Natural', points: 1, imageUrl: 'https://example.com/casual.jpg' },
      { id: '1b', text: 'Elegante', styleCategory: 'Elegante', points: 1, imageUrl: 'https://example.com/elegant.jpg' }
    ]
  },
  {
    id: '2',
    text: 'Como você se define?',
    title: 'Como você se define?',
    type: 'text',
    multiSelect: 1,
    options: [
      { id: '2a', text: 'Criativa', styleCategory: 'Criativo', points: 1 },
      { id: '2b', text: 'Prática', styleCategory: 'Natural', points: 1 }
    ]
  }
];

const DraggableQuizEditor: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [questionSettings, setQuestionSettings] = useState<QuestionSettings>({});
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex((question) => question.id === active.id);
      const newIndex = questions.findIndex((question) => question.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setQuestions((prevQuestions) => arrayMove(prevQuestions, oldIndex, newIndex));
      }
    }

    setActiveId(null);
  };

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestionId(questionId);
    const selectedQuestion = questions.find(q => q.id === questionId);

    if (selectedQuestion) {
      setQuestionSettings({
        questionText: selectedQuestion.title,
        questionType: selectedQuestion.type,
        multiSelect: selectedQuestion.multiSelect,
        options: selectedQuestion.options.map(opt => opt.text),
        optionImages: selectedQuestion.options.map(opt => opt.imageUrl || ''),
      });
    }
  };

  const handleSettingsChange = (field: keyof QuestionSettings, value: any) => {
    setQuestionSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleStyleChange = (field: keyof StyleSettings, value: any) => {
    setStyleSettings(prev => ({ ...prev, [field]: value }));
  };

  const applySettingsToQuestion = () => {
    if (!selectedQuestionId) return;

    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (question.id === selectedQuestionId) {
          const updatedQuestion: QuizQuestion = {
            ...question,
            title: questionSettings.questionText || question.title,
            text: questionSettings.questionText || question.title,
            type: questionSettings.questionType || question.type,
            multiSelect: questionSettings.multiSelect || question.multiSelect,
            options: (questionSettings.options || question.options.map(opt => opt.text)).map((text, index) => ({
              id: question.options[index]?.id || `new-opt-${Date.now()}-${index}`,
              text: text,
              styleCategory: question.options[index]?.styleCategory || 'Natural',
              points: question.options[index]?.points || 1,
              imageUrl: questionSettings.optionImages?.[index] || question.options[index]?.imageUrl
            }))
          };
          return updatedQuestion;
        }
        return question;
      });
    });
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
    setSelectedQuestionId(null);
    setQuestionSettings({});
  };

  const addNewQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      text: `Nova Pergunta ${questions.length + 1}`,
      title: `Nova Pergunta ${questions.length + 1}`,
      type: 'text',
      multiSelect: 1,
      options: [
        { id: `opt-1-${Date.now()}`, text: 'Opção 1', styleCategory: 'Natural', points: 1 },
        { id: `opt-2-${Date.now()}`, text: 'Opção 2', styleCategory: 'Clássico', points: 1 },
        { id: `opt-3-${Date.now()}`, text: 'Opção 3', styleCategory: 'Contemporâneo', points: 1 },
        { id: `opt-4-${Date.now()}`, text: 'Opção 4', styleCategory: 'Elegante', points: 1 }
      ]
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar with Draggable Questions */}
      <div className="w-full md:w-1/4 p-4 border-r overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Questões do Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={questions.map(question => question.id)}
                strategy={verticalListSortingStrategy}
              >
                {questions.map((question) => (
                  <SortableQuestionItem
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    isActive={activeId === question.id}
                    isSelected={selectedQuestionId === question.id}
                    onClick={() => handleQuestionClick(question.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <Button variant="outline" className="w-full mt-4" onClick={addNewQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pergunta
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Question Settings */}
      <div className="w-full md:w-3/4 p-4 overflow-y-auto">
        {selectedQuestionId ? (
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="style">Estilo</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-2">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Pergunta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="questionText">Texto da Pergunta</Label>
                    <Input
                      id="questionText"
                      value={questionSettings.questionText || ''}
                      onChange={(e) => handleSettingsChange('questionText', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Pergunta</Label>
                    <Select value={questionSettings.questionType || 'text'} onValueChange={(value) => handleSettingsChange('questionType', value as 'text' | 'image' | 'both')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="multiSelect">Número de Seleções</Label>
                    <Input
                      type="number"
                      id="multiSelect"
                      value={String(questionSettings.multiSelect || 1)}
                      onChange={(e) => handleSettingsChange('multiSelect', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="options">Opções (separadas por vírgula)</Label>
                    <Textarea
                      id="options"
                      value={(questionSettings.options || []).join(', ')}
                      onChange={(e) => handleSettingsChange('options', e.target.value.split(',').map(s => s.trim()))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="optionImages">URLs das Imagens das Opções (separadas por vírgula)</Label>
                    <Textarea
                      id="optionImages"
                      value={(questionSettings.optionImages || []).join(', ')}
                      onChange={(e) => handleSettingsChange('optionImages', e.target.value.split(',').map(s => s.trim()))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="style">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Estilo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                    <Input
                      type="color"
                      id="backgroundColor"
                      value={styleSettings.backgroundColor || '#f0f0f0'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Cor do Texto</Label>
                    <Input
                      type="color"
                      id="textColor"
                      value={styleSettings.textColor || '#000000'}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="borderRadius">Raio da Borda</Label>
                    <Input
                      type="number"
                      id="borderRadius"
                      value={String(styleSettings.borderRadius || 0)}
                      onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paddingX">Padding Horizontal</Label>
                    <Input
                      type="number"
                      id="paddingX"
                      value={String(styleSettings.paddingX || 16)}
                      onChange={(e) => handleStyleChange('paddingX', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paddingY">Padding Vertical</Label>
                    <Input
                      type="number"
                      id="paddingY"
                      value={String(styleSettings.paddingY || 16)}
                      onChange={(e) => handleStyleChange('paddingY', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <Button variant="secondary" onClick={applySettingsToQuestion}>
              Aplicar Configurações
            </Button>
            <Button variant="destructive" onClick={() => deleteQuestion(selectedQuestionId)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Pergunta
            </Button>
          </Tabs>
        ) : (
          <div className="text-center">
            <p className="text-lg">Selecione uma pergunta para editar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableQuizEditor;
