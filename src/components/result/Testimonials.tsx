
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Maria Silva",
    text: "Descobri meu estilo e agora me visto com muito mais confiança!",
    rating: 5
  },
  {
    name: "Ana Costa",
    text: "O guia me ajudou a entender quais cores e modelagens me favorecem.",
    rating: 5
  },
  {
    name: "Paula Santos",
    text: "Transformei completamente meu guarda-roupa seguindo as dicas.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#432818] mb-4">
          O Que Nossas Clientes Dizem
        </h2>
        <p className="text-lg text-[#8F7A6A]">
          Transformações reais de mulheres como você
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-6">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[#B89B7A]" />
                ))}
              </div>
              <p className="text-[#432818] mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-[#B89B7A]">
                {testimonial.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
