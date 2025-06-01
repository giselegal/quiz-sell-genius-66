
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Resultado do Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Aqui serão exibidos os resultados do seu quiz de estilo pessoal.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Fazer Quiz Novamente
            </Button>
            <Button 
              onClick={() => navigate('/quiz-descubra-seu-estilo')} 
              variant="outline"
              className="w-full"
            >
              Ver Oferta Especial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPage;
