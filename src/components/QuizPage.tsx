
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Quiz de Estilo Pessoal
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Descubra seu estilo único respondendo algumas perguntas simples.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/quiz-descubra-seu-estilo')} 
              className="w-full"
            >
              Iniciar Quiz
            </Button>
            <Button 
              onClick={() => navigate('/admin')} 
              variant="outline"
              className="w-full"
            >
              Painel Admin
            </Button>
            <Button 
              onClick={() => navigate('/teste')} 
              variant="outline"
              className="w-full"
            >
              Página de Teste
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizPage;
