
import React from 'react';
import { motion } from 'framer-motion';

const ResultPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Seu Resultado
          </h1>
          
          {/* Content goes here */}
          <p className="text-center text-gray-600">
            Esta é a página de resultados do seu quiz.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
