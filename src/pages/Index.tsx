
import { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { startQuiz } = useQuizContext();

  const handleStart = async (name: string) => {
    setStarted(true);
    console.log(`Quiz started by ${name}`);
    localStorage.setItem('userName', name);
  };

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <QuizIntro onStart={handleStart} />
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default Index;
