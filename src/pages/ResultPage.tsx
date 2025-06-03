
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
        const savedResult = localStorage.getItem('quiz_result');
        if (savedResult) {
          const parsedResult = JSON.parse(savedResult);
          setQuizResult(parsedResult);
        } else {
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

    loadQuizResult();
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('quiz_result');
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
