
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TestPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Página de Teste
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Esta é uma página de teste para verificar se as rotas estão funcionando.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Ir para o Quiz
            </Button>
            <Button 
              onClick={() => navigate('/admin')} 
              variant="outline"
              className="w-full"
            >
              Ir para Admin
            </Button>
            <Button 
              onClick={() => navigate('/resultado')} 
              variant="outline"
              className="w-full"
            >
              Ir para Resultado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;
