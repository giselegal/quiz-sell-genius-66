import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface BeforeAfterTransformationProps {
  className?: string;
}

export const BeforeAfterTransformation: React.FC<BeforeAfterTransformationProps> = ({ 
  className 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const transformations = [
    {
      id: 1,
      before: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/before1_example.webp',
      after: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/after1_example.webp',
      description: 'Transformação Natural para Elegante'
    },
    {
      id: 2,
      before: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/before2_example.webp',
      after: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/after2_example.webp',
      description: 'Do Casual ao Sofisticado'
    },
    {
      id: 3,
      before: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/before3_example.webp',
      after: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/after3_example.webp',
      description: 'Elegância em Cada Detalhe'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  const renderTransformationCard = (transformation: any, isActive: boolean) => (
    <Card key={transformation.id} className={`${isActive ? 'block' : 'hidden'} bg-white shadow-lg`}>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <h4 className="text-lg font-medium text-[#432818] mb-3">Antes</h4>
            <OptimizedImage
              src={transformation.before}
              alt="Antes da transformação"
              width={250}
              height={300}
              className="rounded-lg shadow-md mx-auto"
            />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-[#432818] mb-3">Depois</h4>
            <OptimizedImage
              src={transformation.after}
              alt="Depois da transformação"
              width={250}
              height={300}
              className="rounded-lg shadow-md mx-auto"
            />
          </div>
        </div>
        <p className="text-center text-[#8F7A6A] mt-4">{transformation.description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className={`text-center ${className}`}>
      <h3 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
        Transformações Reais
      </h3>
      <p className="text-[#8F7A6A] mb-8 max-w-2xl mx-auto">
        Veja como outras mulheres descobriram e aplicaram seu estilo único
      </p>

      <div className="relative max-w-4xl mx-auto">
        {transformations.map((transformation, index) => 
          renderTransformationCard(transformation, index === currentSlide)
        )}

        {transformations.length > 1 && (
          <div className="flex justify-center items-center mt-6 gap-4">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-[#8F7A6A]">
              {currentSlide + 1} de {transformations.length}
            </span>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
