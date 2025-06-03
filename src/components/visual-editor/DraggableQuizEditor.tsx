
import React from 'react';
import { QuizQuestion } from '@/types/quiz';
import { Card } from '@/components/ui/card';

interface DraggableQuizEditorProps {
  questions: QuizQuestion[];
  onQuestionsChange: (questions: QuizQuestion[]) => void;
}

const DraggableQuizEditor: React.FC<DraggableQuizEditorProps> = ({
  questions,
  onQuestionsChange
}) => {
  return (
    <div className="p-4">
      <Card className="p-6 text-center">
        <h3 className="text-xl font-medium text-[#432818] mb-2">Editor de Quiz</h3>
        <p className="text-[#8F7A6A]">
          Editor de quiz será implementado em breve.
        </p>
        <p className="text-sm text-[#8F7A6A] mt-2">
          {questions.length} perguntas carregadas
        </p>
      </Card>
    </div>
  );
};

export default DraggableQuizEditor;
