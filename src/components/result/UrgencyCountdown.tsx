import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, AlertTriangle } from 'lucide-react';

interface UrgencyCountdownProps {
  hours?: number;
  styleCategory?: string;
}

export const UrgencyCountdown: React.FC<UrgencyCountdownProps> = ({
  hours = 24,
  styleCategory = "seu estilo"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    // Removido o gradiente de fundo vermelho/laranja e ajustado a borda para um tom mais neutro e elegante
    <Card className="bg-white p-4 mb-6 border-[#B89B7A]/20 shadow-sm"> {/* Fundo branco, borda marrom/bege suave, sombra pequena */}
      <div className="flex items-center justify-center gap-3 mb-3">
        {/* Ícone AlertTriangle: mantido para urgência, mas sua cor já é o vermelho da Lucide */}
        <AlertTriangle className="w-5 h-5 text-[#ff6b6b]" />
        {/* Texto da oferta: mantido em vermelho, pois é a mensagem de urgência */}
        <span className="text-[#ff6b6b] font-medium text-sm uppercase tracking-wide">
          OFERTA ESPECIAL PARA {styleCategory.toUpperCase()}
        </span>
      </div>
      
      <div className="text-center">
        <p className="text-[#432818] mb-3 font-medium"> {/* Texto normal em marrom escuro */}
          Esta oferta exclusiva expira em:
        </p>
        
        <div className="flex justify-center gap-2 mb-2">
          {/* Selos dos números: Removido o fundo branco e a borda vermelha, usando a cor do texto para destaque */}
          <div className="rounded-lg px-3 py-2"> {/* Removido bg-white e shadow-md e border-[#ff6b6b]/20 */}
            <div className="text-xl font-bold text-[#aa6b5d]"> {/* Alterado para a cor de destaque principal (#aa6b5d) */}
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-[#432818]">HORAS</div> {/* Ajustado cor do texto para marrom escuro */}
          </div>
          <div className="rounded-lg px-3 py-2"> {/* Removido bg-white e shadow-md e border-[#ff6b6b]/20 */}
            <div className="text-xl font-bold text-[#aa6b5d]"> {/* Alterado para a cor de destaque principal (#aa6b5d) */}
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-[#432818]">MIN</div> {/* Ajustado cor do texto para marrom escuro */}
          </div>
          <div className="rounded-lg px-3 py-2"> {/* Removido bg-white e shadow-md e border-[#ff6b6b]/20 */}
            <div className="text-xl font-bold text-[#aa6b5d]"> {/* Alterado para a cor de destaque principal (#aa6b5d) */}
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-[#432818]">SEG</div> {/* Ajustado cor do texto para marrom escuro */}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-[#432818]/70">
          <Clock className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
};

export default UrgencyCountdown;