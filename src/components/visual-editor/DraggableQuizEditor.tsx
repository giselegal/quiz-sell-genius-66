
import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { QuizQuestion } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save } from 'lucide-react';
import { SortableQuestionItem } from './SortableQuestionItem';

interface DraggableQuizEditorProps {
  questions: QuizQuestion[];
  onQuestionsChange: (questions: QuizQuestion[]) => void;
}

export const DraggableQuizEditor: React.FC<DraggableQuizEditorProps> = ({
  questions,
  onQuestionsChange
}) => {
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex(q => q.id === active.id);
      const newIndex = questions.findIndex(q => q.id === over.id);

      onQuestionsChange(arrayMove(questions, oldIndex, newIndex));
    }
  };

  const addNewQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      text: 'Nova pergunta',
      title: 'Nova pergunta',
      type: 'text',
      multiSelect: 1,
      options: [
        {
          id: `option-${Date.now()}`,
          text: 'Nova opção',
          styleCategory: 'Natural',
          points: 1
        }
      ]
    };

    setEditingQuestion(newQuestion);
    setIsEditorOpen(true);
  };

  const saveQuestion = () => {
    if (!editingQuestion) return;

    const existingIndex = questions.findIndex(q => q.id === editingQuestion.id);
    
    if (existingIndex >= 0) {
      const updatedQuestions = [...questions];
      updatedQuestions[existingIndex] = editingQuestion;
      onQuestionsChange(updatedQuestions);
    } else {
      onQuestionsChange([...questions, editingQuestion]);
    }

    setEditingQuestion(null);
    setIsEditorOpen(false);
  };

  const deleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
  };

  const editQuestion = (question: QuizQuestion) => {
    setEditingQuestion({ ...question });
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editor de Quiz</h2>
        <Button onClick={addNewQuestion}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Pergunta
        </Button>
      </div>

      {isEditorOpen && editingQuestion && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Pergunta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editingQuestion.title}
                onChange={(e) => setEditingQuestion({
                  ...editingQuestion,
                  title: e.target.value,
                  text: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="text">Texto da Pergunta</Label>
              <Textarea
                id="text"
                value={editingQuestion.text}
                onChange={(e) => setEditingQuestion({
                  ...editingQuestion,
                  text: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={editingQuestion.type}
                onValueChange={(value: 'text' | 'image' | 'both') =>
                  setEditingQuestion({ ...editingQuestion, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="image">Imagem</SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={saveQuestion}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
          {questions.map((question) => (
            <SortableQuestionItem
              key={question.id}
              question={question}
              onEdit={editQuestion}
              onDelete={deleteQuestion}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
