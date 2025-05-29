import React from 'react';
import { Shield, Award } from 'lucide-react';

interface GuaranteeSealProps {
  variant?: 'compact' | 'inline' | 'floating';
  className?: string;
}

const GuaranteeSeal: React.FC<GuaranteeSealProps> = ({ 
  variant = 'compact', 
  className = '' 
}) => {
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white px-4 py-3 rounded-full shadow-lg border-2 border-white/20 animate-pulse">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-bold">7 DIAS GARANTIA</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#45a049]/10 text-[#4CAF50] px-4 py-2 rounded-full border border-[#4CAF50]/30 ${className}`}>
        <Shield className="w-4 h-4" />
        <span className="text-sm font-semibold">GARANTIA 7 DIAS</span>
      </div>
    );
  }

  // variant === 'compact'
  return (
    <div className={`bg-gradient-to-br from-white to-[#fff7f3] rounded-xl shadow-lg border-2 border-[#4CAF50]/30 p-6 relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/5 to-[#45a049]/5 pointer-events-none"></div>
      
      <div className="relative z-10 text-center">
        {/* Compact guarantee circle */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
              <div className="bg-white w-16 h-16 rounded-full flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-[#4CAF50]">7</span>
                <span className="text-xs font-semibold text-[#45a049] -mt-1">DIAS</span>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 bg-[#B89B7A] w-6 h-6 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#432818]">
              Garantia Total
            </h3>
            <p className="text-sm text-[#6B5B4E]">
              Risco zero no seu investimento
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-[#4CAF50]">
            <Shield className="w-4 h-4" />
            <span className="font-medium">100% Seguro</span>
          </div>
          <p className="text-xs text-[#6B5B4E] leading-relaxed">
            Se não ficar satisfeita, devolvemos seu dinheiro sem perguntas
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSeal;
