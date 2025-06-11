import React, { useCallback } from 'react';
import { Stage } from '@/types/quiz';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tokens } from '@/config/designTokens';

interface StageResultComponentProps {
  stage: Stage;
  onUpdate: (stageId: string, updates: Partial<Stage>) => void;
}

const StageResultComponent: React.FC<StageResultComponentProps> = ({ stage, onUpdate }) => {
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(stage.id, { description: e.target.value });
  }, [onUpdate, stage.id]);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(stage.id, { category: e.target.value });
  }, [onUpdate, stage.id]);

  const handleScoreChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value, 10) || 0;
    onUpdate(stage.id, { score: newScore });
  }, [onUpdate, stage.id]);

  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold"
        style={{ color: tokens.colors.text }}
      >
        Configurações do Resultado
      </h3>
      
      <div>
        <Label htmlFor="category">Categoria</Label>
        <Input
          type="text"
          id="category"
          value={stage.category || ''}
          onChange={handleCategoryChange}
          placeholder="Ex: Elegante"
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Input
          type="text"
          id="description"
          value={stage.description || ''}
          onChange={handleDescriptionChange}
          placeholder="Ex: Você tem um estilo elegante..."
        />
      </div>

      <div>
        <Label htmlFor="score">Pontuação</Label>
        <Input
          type="number"
          id="score"
          value={stage.score || 0}
          onChange={handleScoreChange}
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default StageResultComponent;
