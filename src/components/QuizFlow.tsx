import { useState } from 'react';

export default function QuizFlow() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold">Quiz</h1>
      
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
        <p className="mb-6 text-center">
          Responda algumas perguntas para descobrir o resultado ideal para você
        </p>
        
        {/* Conteúdo do quiz */}
        <div className="space-y-6">
          {/* Implementação do quiz aqui */}
        </div>
      </div>
    </div>
  );
}
