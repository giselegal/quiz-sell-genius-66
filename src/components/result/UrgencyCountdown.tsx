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
    <Card className="bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 border-[#ff6b6b]/30 p-4 mb-6">
      <div className="flex items-center justify-center gap-3 mb-3">
        <AlertTriangle className="w-5 h-5 text-[#ff6b6b]" />
        <span className="text-[#ff6b6b] font-medium text-sm uppercase tracking-wide">
          OFERTA ESPECIAL PARA {styleCategory.toUpperCase()}
        </span>
      </div>
      
      <div className="text-center">
        <p className="text-[#432818] mb-3 font-medium">
          Esta oferta exclusiva expira em:
        </p>
        
        <div className="flex justify-center gap-2 mb-2">
          <div className="bg-white rounded-lg px-3 py-2 shadow-md border border-[#ff6b6b]/20">
            <div className="text-xl font-bold text-[#ff6b6b]">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600">HORAS</div>
          </div>
          <div className="bg-white rounded-lg px-3 py-2 shadow-md border border-[#ff6b6b]/20">
            <div className="text-xl font-bold text-[#ff6b6b]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600">MIN</div>
          </div>
          <div className="bg-white rounded-lg px-3 py-2 shadow-md border border-[#ff6b6b]/20">
            <div className="text-xl font-bold text-[#ff6b6b]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600">SEG</div>
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