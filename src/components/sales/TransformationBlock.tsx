
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface TransformationItem {
  title: string;
  description: string;
}

interface TransformationBlockProps {
  items?: TransformationItem[];
}

const TransformationBlock: React.FC<TransformationBlockProps> = ({ items }) => {
  const defaultItems: TransformationItem[] = [
    {
      title: "Descobrir seu estilo único",
      description: "Encontre as peças que revelam sua personalidade autêntica"
    },
    {
      title: "Comprar com propósito",
      description: "Pare de acumular roupas que não combinam entre si"
    },
    {
      title: "Criar looks versáteis",
      description: "Monte combinações incríveis com menos peças"
    },
    {
      title: "Aumentar sua autoconfiança",
      description: "Sinta-se segura em qualquer ocasião"
    }
  ];

  const transformationItems = items || defaultItems;

  return (
    <div className="py-12 px-4 bg-[#fffaf7]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-playfair text-[#432818] text-center mb-8">
          O que você vai transformar
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {transformationItems.map((item, index) => (
            <Card key={index} className="p-6 bg-white shadow-sm border border-[#B89B7A]/20">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#432818] mb-2">{item.title}</h3>
                  <p className="text-[#8F7A6A]">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformationBlock;
