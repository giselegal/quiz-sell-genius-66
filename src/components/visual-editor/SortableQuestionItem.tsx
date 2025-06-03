
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuizQuestion } from '@/types/quiz';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

interface SortableQuestionItemProps {
  question: QuizQuestion;
  onEdit: (question: QuizQuestion) => void;
  onDelete: (id: string) => void;
}

export const SortableQuestionItem: React.FC<SortableQuestionItemProps> = ({
  question,
  onEdit,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div {...listeners} className="cursor-move">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className="font-semibold">{question.title}</h3>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(question)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{question.text}</p>
          <p className="text-xs text-gray-500">
            Tipo: {question.type} | Opções: {question.options.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
