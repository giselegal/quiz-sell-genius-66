
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type QuestionOption = {
  id: string;
  text: string;
  value: number;
};

type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
};

// Dados simulados para o quiz
const quizQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Qual é o seu principal objetivo?',
    options: [
      { id: 'q1_a', text: 'Aumentar vendas', value: 10 },
      { id: 'q1_b', text: 'Melhorar engajamento', value: 5 },
      { id: 'q1_c', text: 'Construir autoridade', value: 8 }
    ]
  },
  {
    id: 'q2',
    text: 'Qual é o seu maior desafio atualmente?',
    options: [
      { id: 'q2_a', text: 'Atrair clientes', value: 8 },
      { id: 'q2_b', text: 'Converter leads', value: 10 },
      { id: 'q2_c', text: 'Fidelizar clientes', value: 5 }
    ]
  }
];

const QuizFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Simular resultado e navegar para página de resultado
      navigate('/resultado');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const canProceed = answers[currentQuestion.id];

  if (!currentQuestion) {
    return <div>Carregando quiz...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">
            Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-xl font-medium text-center">
            {currentQuestion.text}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant={answers[currentQuestion.id] === option.id ? "default" : "outline"}
                className="w-full text-left justify-start"
                onClick={() => handleAnswer(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full"
          >
            {isLastQuestion ? 'Ver Resultado' : 'Próxima'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizFlow;
