
import { QuizQuestion } from '@/types/quiz';

export interface QuestionEditorProps {
  question: QuizQuestion;
  onSave: (updatedQuestion: QuizQuestion) => void;
  onCancel: () => void;
  onDelete: () => void;
}
