
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const FinalCTA: React.FC = () => {
  const handleCheckout = () => {
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="text-center bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] p-8 rounded-xl text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-4">
        Transforme Seu Estilo Hoje Mesmo
      </h3>
      <p className="text-lg mb-6 opacity-90">
        Não deixe para depois. Sua nova imagem te espera!
      </p>
      <Button
        onClick={handleCheckout}
        size="lg"
        className="bg-white text-[#B89B7A] hover:bg-gray-100 font-semibold px-8 py-4"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Garantir Meu Guia Agora
      </Button>
    </div>
  );
};

export default FinalCTA;
