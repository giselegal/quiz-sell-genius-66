
import React from 'react';

const QuizOfferPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2EE]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-4">
            Descubra Seu Estilo Verdadeiro
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Em poucos minutos, descubra seu estilo predominante e transforme seu guarda-roupa
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <iframe 
            src="/tools-and-demos/quiz-descubra-seu-estilo.html"
            className="w-full h-screen border-0 rounded-lg shadow-lg"
            title="Quiz Descubra Seu Estilo"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizOfferPage;
