
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const QuizDescubraSeuEstiloPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log('📝 QuizDescubraSeuEstiloPage carregando...');

  useEffect(() => {
    console.log('📝 QuizDescubraSeuEstiloPage mounted');
    setTimeout(() => {
      setLoading(false);
      console.log('📝 Loading concluído');
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <Card className="w-full max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-white p-6 border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Descubra Seu Estilo Pessoal
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Responda algumas perguntas e descubra o estilo que mais combina com você!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Quiz em Desenvolvimento</h3>
            <p className="text-gray-600 mb-6">
              Este quiz está sendo desenvolvido. Em breve você poderá descobrir seu estilo pessoal!
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/resultado')} className="w-full">
                Ver Página de Resultado
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                Voltar ao Início
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDescubraSeuEstiloPage;
