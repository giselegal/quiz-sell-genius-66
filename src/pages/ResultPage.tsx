
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuizResult from '../components/QuizResult';
import { QuizResult as QuizResultType, StyleResult } from '../types/quiz';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const ResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = () => {
      try {
        // Tentar carregar resultado do localStorage
        const savedResult = localStorage.getItem('quizResult');
        if (savedResult) {
          const parsedResult = JSON.parse(savedResult);
          setResult(parsedResult);
        } else {
          setError('Nenhum resultado encontrado. Por favor, refaça o quiz.');
        }
      } catch (err) {
        console.error('Erro ao carregar resultado:', err);
        setError('Erro ao carregar o resultado do quiz.');
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, []);

  const handleRetakeQuiz = () => {
    localStorage.removeItem('quizResult');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-[#432818]">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4">
        <Card className="max-w-md mx-auto p-6 text-center">
          <h2 className="text-xl font-bold text-[#432818] mb-4">
            Ops! Algo deu errado
          </h2>
          <p className="text-[#6B7280] mb-6">
            {error || 'Não foi possível carregar seu resultado.'}
          </p>
          <div className="space-y-3">
            <Button 
              onClick={handleRetakeQuiz}
              className="w-full bg-[#B89B7A] hover:bg-[#A68A6A] text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refazer Quiz
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <QuizResult
      primaryStyle={result.primaryStyle}
      secondaryStyles={result.secondaryStyles}
      onReset={handleRetakeQuiz}
    />
  );
};

export default ResultPage;
