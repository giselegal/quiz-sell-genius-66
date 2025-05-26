import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link 
          href="/" 
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
