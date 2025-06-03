
import React from 'react';
import { motion } from 'framer-motion';

const BeforeAfterTransformation4: React.FC = () => {
  return (
    <motion.div
      className="my-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Sua Transformação Começa Agora
        </h3>
        <p className="text-gray-600 mb-6">
          Descobra como realçar sua beleza natural com o estilo perfeito para você
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Antes</span>
            </div>
            <p className="text-sm text-gray-600">Sem direcionamento de estilo</p>
          </div>
          <div className="text-center">
            <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-700 font-semibold">Depois</span>
            </div>
            <p className="text-sm text-gray-600">Com seu estilo personalizado</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BeforeAfterTransformation4;
