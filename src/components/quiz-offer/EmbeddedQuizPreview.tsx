
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmbeddedQuizPreviewProps {
  quizId?: string;
  className?: string;
}

const EmbeddedQuizPreview: React.FC<EmbeddedQuizPreviewProps> = ({
  quizId,
  className = ""
}) => {
  const mockQuizData = {
    title: "Descubra Seu Estilo Pessoal",
    description: "Um quiz personalizado para descobrir suas preferências de estilo",
    totalQuestions: 8,
    estimatedTime: "3-5 minutos"
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="border border-[#B89B7A]/20">
        <CardHeader className="bg-[#FAF9F7]">
          <CardTitle className="text-[#432818] font-playfair">
            {mockQuizData.title}
          </CardTitle>
          <CardDescription>
            {mockQuizData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-[#8F7A6A]">
              <span>{mockQuizData.totalQuestions} perguntas</span>
              <span>{mockQuizData.estimatedTime}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#B89B7A] h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            
            <div className="text-center">
              <p className="text-[#8F7A6A] text-sm mb-4">
                Clique no botão abaixo para começar seu quiz personalizado
              </p>
              <button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Começar Quiz
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddedQuizPreview;
