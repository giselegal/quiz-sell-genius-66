
import React from 'react';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useNavigate } from 'react-router-dom';

const QuizOfferPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <QuizOfferHero onStartQuizClick={handleStartQuiz} />
      <QuizOfferCTA />
    </div>
  );
};

export default QuizOfferPage;
