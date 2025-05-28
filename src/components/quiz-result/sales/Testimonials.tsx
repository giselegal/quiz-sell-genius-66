
import React from 'react';
import { Card } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

interface TestimonialItem {
  name: string;
  role?: string;
  text: string;
}

interface TestimonialsProps {
  items?: TestimonialItem[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  items = [
    {
      name: "Mariangela",
      role: "Engenheira",
      text: "Antes, a roupa me vestia. Hoje, eu me visto com intenção. Essa jornada me reconectou com a mulher que sempre fui."
    },
    {
      name: "Patrícia Paranhos",
      role: "Advogada",
      text: "Aprendi a reconhecer meu valor e refletir isso na forma como me apresento. As pessoas começaram a me enxergar diferente — porque eu estava diferente."
    },
    {
      name: "Sônia Spier",
      role: "Terapeuta",
      text: "Com a Gisele, entendi o poder da linguagem visual. Hoje eu escolho minhas roupas com consciência, propósito e leveza."
    }
  ] 
}) => {
  return (
    <div className="py-8">
      <h3 className="text-2xl font-playfair text-center text-[#aa6b5d] mb-2">
        O que estão dizendo
      </h3>
      <p className="text-center text-[#3a3a3a] mb-4 max-w-2xl mx-auto">
        Histórias reais de mulheres que transformaram seu estilo e confiança
      </p>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card 
            key={index} 
            className="p-6 relative overflow-hidden card-elegant interactive-section"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B89B7A]/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B89B7A]/30"></div>
            
            <div className="mb-4 text-[#B89B7A] opacity-60">
              <QuoteIcon size={24} />
            </div>
            
            <p className="text-[#3a3a3a] italic mb-4">
              "{item.text}"
            </p>
            
            <div className="mt-auto pt-4 border-t border-[#B89B7A]/10">
              <p className="font-medium text-[#432818]">{item.name}</p>
              {item.role && (
                <p className="text-sm text-[#432818]/70">{item.role}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
