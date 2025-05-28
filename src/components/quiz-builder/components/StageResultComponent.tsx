
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/shared/ContentContainer';
import { GridLayout } from '@/components/shared/GridLayout';
import { sharedStyles } from '@/styles/sharedStyles';

interface StageResultComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const StageResultComponent: React.FC<StageResultComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || sharedStyles.colors.background,
        color: style?.textColor || sharedStyles.colors.textPrimary,
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <ContentContainer size="md">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair mb-2">
            {data.title || 'Seu Resultado de Estilo Pessoal'}
          </h2>
          
          <p className="text-lg text-[#432818]/80">
            {data.subtitle || 'Baseado nas suas escolhas, calculamos seu estilo predominante'}
          </p>
        </div>
        
        <GridLayout columns={2} gap="lg" className="mb-8">
          <div>
            <img
              src={data.offerImageUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"}
              alt="Guia Completo de Estilo"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <img
              src={data.authorImageUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"}
              alt="Autor do Guia"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </GridLayout>
        
        <div className="flex justify-center">
          <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-md text-lg">
            {data.callToActionText || 'Conhecer o Guia Completo'}
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-[#432818]/60 text-center">
          {data.stageTitle || 'Resultado'} • {data.stageNumber || 7} de 7
        </div>
      </ContentContainer>
    </div>
  );
};

export default StageResultComponent;

