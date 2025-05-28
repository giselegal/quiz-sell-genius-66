
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Settings, Trash2, Copy, Move } from 'lucide-react';
import { QuizComponentData } from '@/types/quizBuilder';

interface ComponentToolbarProps {
  component: QuizComponentData;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onPreview: () => void;
}

const ComponentToolbar: React.FC<ComponentToolbarProps> = ({
  component,
  onEdit,
  onDuplicate,
  onDelete,
  onPreview
}) => {
  return (
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-1 bg-white rounded-md shadow-lg border p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPreview}
          className="h-6 w-6 p-0"
          title="Visualizar"
        >
          <Eye className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-6 w-6 p-0"
          title="Editar"
        >
          <Settings className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onDuplicate}
          className="h-6 w-6 p-0"
          title="Duplicar"
        >
          <Copy className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          title="Excluir"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default ComponentToolbar;
