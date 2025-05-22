
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the root path where QuizIntro/QuizPage will be shown
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
