
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface QuizEditorPanelProps {
  isVisible: boolean;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isVisible }) => {
  const [selectedStyle, setSelectedStyle] = useState<"Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo">("Natural");
  const [quizConfig, setQuizConfig] = useState({
    title: 'Descubra Seu Estilo Pessoal',
    description: 'Um quiz para descobrir seu estilo único',
    questionsCount: 15
  });

  if (!isVisible) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editor do Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="quiz-title">Título do Quiz</Label>
          <Input
            id="quiz-title"
            value={quizConfig.title}
            onChange={(e) => setQuizConfig(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="quiz-description">Descrição</Label>
          <Textarea
            id="quiz-description"
            value={quizConfig.description}
            onChange={(e) => setQuizConfig(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="style-select">Estilo Padrão</Label>
          <Select value={selectedStyle} onValueChange={(value: any) => setSelectedStyle(value)}>
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
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="questions-count">Número de Questões</Label>
          <Input
            id="questions-count"
            type="number"
            value={quizConfig.questionsCount}
            onChange={(e) => setQuizConfig(prev => ({ ...prev, questionsCount: parseInt(e.target.value) }))}
          />
        </div>

        <Button className="w-full">
          Salvar Configurações do Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizEditorPanel;
