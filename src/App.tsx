
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { QuizProvider } from '@/context/QuizContext';
import AppRouter from '@/routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <AppRouter />
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
