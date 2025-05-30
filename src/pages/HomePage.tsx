
import React, { useEffect } from 'react';
import QuizIntro from '@/components/QuizIntro';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Limpar dados de sessão anterior quando acessar a homepage
  useEffect(() => {
    // Limpar dados da sessão anterior para permitir novo quiz
    sessionStorage.removeItem('introCompleted');
    // Manter o userName para UX, mas limpar outros dados do quiz
    localStorage.removeItem('quiz_result');
    localStorage.removeItem('quizResults');
    localStorage.removeItem('strategicAnswers');
    localStorage.removeItem('allAnswers');
    localStorage.removeItem('preloadedResults');
    localStorage.removeItem('quizCompletedAt');
  }, []);

  const handleStartQuiz = (name: string) => {
    // Salvar o nome no localStorage
    localStorage.setItem('userName', name);
    
    // Navegar para a página do quiz
    navigate('/quiz');
  };

  return <QuizIntro onStart={handleStartQuiz} />;
};

export default HomePage;
