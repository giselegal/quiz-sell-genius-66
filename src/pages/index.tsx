import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import React, { useState } from 'react';

export default function HomePage() {
  const [activeComponent, setActiveComponent] = useState<'intro' | 'quiz'>('intro');
  
  const handleStartQuiz = () => {
    setActiveComponent('quiz');
  };
  
  return (
    <div>
      {activeComponent === 'intro' && (
        <QuizIntro onStartQuiz={handleStartQuiz} />
      )}
      
      {activeComponent === 'quiz' && (
        <QuizPage />
      )}
    </div>
  );
}