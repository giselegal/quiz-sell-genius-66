
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizResult from '@/components/QuizResult';
import { QuizResult as QuizResultType } from '@/types/quiz';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizResult = () => {
      try {
        console.log('Loading quiz result from localStorage...');
        
        // Tentar carregar do localStorage
        const savedResult = localStorage.getItem('quiz_result');
        console.log('Found saved result:', !!savedResult);
        
        if (savedResult) {
          const parsedResult = JSON.parse(savedResult);
          console.log('Parsed result:', parsedResult);
          
          // Validar se o resultado tem a estrutura esperada
          if (parsedResult && parsedResult.primaryStyle && parsedResult.secondaryStyles) {
            setQuizResult(parsedResult);
            console.log('Result loaded successfully');
          } else {
            console.warn('Invalid result structure:', parsedResult);
            navigate('/');
          }
        } else {
          console.warn('No saved result found, redirecting to quiz');
          // If no result found, redirect to quiz
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading quiz result:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    // Pequeno delay para garantir que a navegação foi completada
    const timeoutId = setTimeout(loadQuizResult, 100);
    
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  const handleReset = () => {
    console.log('Resetting quiz...');
    localStorage.removeItem('quiz_result');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!quizResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Resultado não encontrado</h2>
          <p className="mb-4 text-gray-600">Não foi possível carregar seu resultado do quiz.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fazer Quiz Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizResult
      primaryStyle={quizResult.primaryStyle}
      secondaryStyles={quizResult.secondaryStyles}
      onReset={handleReset}
    />
  );
};

export default ResultPage;
