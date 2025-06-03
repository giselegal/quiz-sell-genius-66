import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuizQuestion } from '@/types/quiz';
import { Plus, Trash2 } from 'lucide-react';

const VisualEditorPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
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
  ]);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      text: 'Nova pergunta',
      title: 'Nova pergunta',
      type: 'text',
      multiSelect: 1,
      options: [{ id: Date.now().toString() + '-1', text: 'Nova opção', styleCategory: 'Natural', points: 1 }],
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updatedFields: Partial<QuizQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updatedFields } : q));
  };

  const updateOption = (questionId: string, optionId: string, updatedFields: Partial<QuizQuestion['options'][0]>) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(option => option.id === optionId ? { ...option, ...updatedFields } : option)
        };
      }
      return q;
    }));
  };

  const addOption = (questionId: string) => {
    const newOption = {
      id: Date.now().toString(),
      text: 'Nova opção',
      styleCategory: 'Natural',
      points: 1
    };

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...q.options, newOption]
        };
      }
      return q;
    }));
  };

  const deleteOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.filter(option => option.id !== optionId)
        };
      }
      return q;
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editor Visual de Quiz</h1>
      <Button onClick={addQuestion} className="mb-4">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Pergunta
      </Button>
      {questions.map((question) => (
        <Card key={question.id} className="mb-4">
          <CardHeader>
            <CardTitle>
              <Input
                type="text"
                value={question.title}
                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Texto da Pergunta</Label>
            <Textarea
              value={question.text}
              onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
              className="mb-2"
            />
            <Label>Tipo de Pergunta</Label>
            <Select value={question.type} onValueChange={(value) => updateQuestion(question.id, { type: value as "text" | "image" | "both" })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="image">Imagem</SelectItem>
                <SelectItem value="both">Ambos</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Opções</h3>
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <Input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOption(question.id, option.id, { text: e.target.value })}
                    className="mr-2"
                  />
                  <Button variant="outline" size="icon" onClick={() => deleteOption(question.id, option.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="secondary" onClick={() => addOption(question.id)}>
                Adicionar Opção
              </Button>
            </div>
            <Button variant="destructive" className="mt-4" onClick={() => deleteQuestion(question.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Pergunta
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VisualEditorPage;
