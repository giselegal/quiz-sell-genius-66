
import React from 'react';
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

interface StageSectionProps {
  stage: QuizStage;
  components: QuizComponentData[];
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddComponent: () => void;
}

const StageSection: React.FC<StageSectionProps> = ({
  stage,
  components,
  isActive,
  onSelect,
  onEdit,
  onDelete,
  onAddComponent
}) => {
  const getStageTypeBadge = (type: string) => {
    const variants = {
      cover: 'default',
      question: 'secondary',
      result: 'outline',
      strategic: 'destructive'
    } as const;
    
    const labels = {
      cover: 'Capa',
      question: 'Pergunta',
      result: 'Resultado',
      strategic: 'Estratégica'
    };

    return (
      <Badge variant={variants[type as keyof typeof variants] || 'default'}>
        {labels[type as keyof typeof labels] || type}
      </Badge>
    );
  };

  return (
    <Card className={`cursor-pointer transition-all ${isActive ? 'ring-2 ring-[#B89B7A]' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {stage.title || `Etapa ${stage.order + 1}`}
          </CardTitle>
          {getStageTypeBadge(stage.type)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="text-xs text-muted-foreground">
          {components.length} componente{components.length !== 1 ? 's' : ''}
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSelect}
            className="h-8 px-2"
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEdit}
            className="h-8 px-2"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onAddComponent}
            className="h-8 px-2"
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            className="h-8 px-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StageSection;
