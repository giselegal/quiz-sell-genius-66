
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const benefits = [
  {
    title: "Guia de Estilo e Imagem",
    items: [
      "Descubra seu estilo com precisão",
      "Aprenda a criar looks autênticos",
      "Técnicas de composição visual"
    ]
  },
  {
    title: "Bônus Exclusivos",
    items: [
      "Visagismo Facial Estratégico",
      "Peças-Chave do Guarda-Roupa",
      "Consultoria em Grupo"
    ]
  }
];

const ProductShowcase = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"
          alt="Guia de Estilo - 3 Revistas"
          className="w-full rounded-lg shadow-lg"
        />
        <div className="space-y-6">
          <h2 className="text-3xl font-playfair text-[#aa6b5d]">
            Transforme seu Estilo
          </h2>
          {benefits.map((section, index) => (
            <Card key={index} className="p-6 bg-white border-[#aa6b5d]/20">
              <h3 className="text-xl font-playfair text-[#aa6b5d] mb-4">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#aa6b5d] mt-1" />
                    <p className="text-[#3a3a3a]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
