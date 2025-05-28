
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useUniversalNavigation } from '@/hooks/useUniversalNavigation';

interface QuizIntroProps {
  onStart?: (nome: string) => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [nome, setNome] = useState('');
  const { navigate } = useUniversalNavigation();

  const handleStartQuiz = () => {
    if (nome.trim()) {
      if (onStart) {
        onStart(nome.trim());
      } else {
        // Se não há função onStart, navegar para QuizPage
        localStorage.setItem('userName', nome.trim());
        navigate('/quiz');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-6">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#432818] mb-4">
            Descubra Seu Estilo Pessoal
          </h1>
          <p className="text-[#8F7A6A] text-lg">
            Responda nosso quiz personalizado e descubra qual estilo combina perfeitamente com você.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-[#432818] mb-2">
              Como podemos te chamar?
            </label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu primeiro nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="text-center"
              onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
            />
          </div>
          
          <Button 
            onClick={handleStartQuiz}
            disabled={!nome.trim()}
            className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A] text-white py-3 text-lg"
          >
            Começar Quiz
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-[#8F7A6A]">
          <p>⏱️ Leva apenas 3 minutos</p>
          <p>🎯 Resultado personalizado</p>
          <p>💫 Transforme seu guarda-roupa</p>
        </div>
      </Card>
    </div>
  );
};

export default QuizIntro;
