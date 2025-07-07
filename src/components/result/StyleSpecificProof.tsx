import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Users, Sparkles } from 'lucide-react';

interface StyleSpecificProofProps {
  styleCategory: string;
  userName?: string;
}

const styleProofData: Record<string, {
  count: number;
  testimonial: string;
  author: string;
  beforeAfter: string;
}> = {
  'Natural': {
    count: 847,
    testimonial: "Finalmente me visto com autenticidade! O estilo Natural me trouxe leveza e confiança.",
    author: "Marina, 34 anos",
    beforeAfter: "De looks forçados para um visual autêntico e confortável"
  },
  'Clássico': {
    count: 1243,
    testimonial: "Meu guarda-roupa se tornou atemporal e elegante. Nunca mais erro na hora de me vestir!",
    author: "Ana Paula, 41 anos",
    beforeAfter: "De peças aleatórias para um visual refinado e profissional"
  },
  'Contemporâneo': {
    count: 923,
    testimonial: "Consegui unir praticidade com estilo moderno. Meus looks têm mais personalidade agora!",
    author: "Camila, 29 anos",
    beforeAfter: "De looks básicos para combinações modernas e práticas"
  },
  'Elegante': {
    count: 756,
    testimonial: "Minha imagem ficou mais sofisticada e alinhada com meus objetivos profissionais.",
    author: "Fernanda, 38 anos",
    beforeAfter: "De visual comum para uma presença marcante e elegante"
  },
  'Romântico': {
    count: 612,
    testimonial: "Descobri como expressar minha feminilidade de forma delicada e autêntica.",
    author: "Juliana, 32 anos",
    beforeAfter: "De looks masculinizados para um visual doce e feminino"
  },
  'Sexy': {
    count: 534,
    testimonial: "Aprendi a valorizar minha sensualidade de forma elegante e confiante.",
    author: "Beatriz, 35 años",
    beforeAfter: "De insegurança para uma postura sensual e empoderada"
  },
  'Dramático': {
    count: 423,
    testimonial: "Meu estilo agora transmite força e presença. Me sinto uma verdadeira líder!",
    author: "Carla, 42 anos",
    beforeAfter: "De visual apagado para uma presença marcante e poderosa"
  },
  'Criativo': {
    count: 389,
    testimonial: "Finalmente posso expressar minha criatividade através do meu estilo pessoal!",
    author: "Renata, 28 anos",
    beforeAfter: "De looks convencionais para um visual único e criativo"
  }
};

export const StyleSpecificProof: React.FC<StyleSpecificProofProps> = ({
  styleCategory,
  userName
}) => {
  const data = styleProofData[styleCategory] || styleProofData['Natural'];
  
  return (
    <Card className="bg-gradient-to-r from-[#f8f5f1] to-[#f3ede6] border-[#B89B7A]/30 p-6 mb-6">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-5 h-5 text-[#B89B7A]" />
          <span className="text-[#B89B7A] font-medium">
            Mais de {data.count.toLocaleString()} mulheres {styleCategory} já se transformaram
          </span>
        </div>
        
        <div className="flex justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
          ))}
          <span className="ml-2 text-sm text-gray-600">4.9/5 (2.847 avaliações)</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 mb-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#B89B7A] mt-1 flex-shrink-0" />
          <div>
            <p className="text-[#432818] italic mb-2">"{data.testimonial}"</p>
            <p className="text-sm text-[#8F7A6A] font-medium">— {data.author}</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-[#432818] bg-[#B89B7A]/10 rounded-full px-4 py-2 inline-block">
          <strong>Transformação típica:</strong> {data.beforeAfter}
        </p>
      </div>
      
      {userName && (
        <div className="mt-4 text-center">
          <p className="text-[#aa6b5d] font-medium">
            {userName}, você está a um passo de sua transformação {styleCategory}!
          </p>
        </div>
      )}
    </Card>
  );
};

export default StyleSpecificProof;