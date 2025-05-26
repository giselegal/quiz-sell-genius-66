"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the root path where QuizIntro/QuizPage will be shown
    router.push('/');
  }, [router]);

  return null;
};

export default Index;
