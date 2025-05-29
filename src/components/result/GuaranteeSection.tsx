import React from 'react';
import { Card } from '@/components/ui/card';

const GuaranteeSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 relative">
      <div className="text-center">
        <h3 className="text-xl font-medium text-[#432818] mb-4">
          7 dias de garantia
        </h3>
        
        <p className="text-md text-[#6B5B4E]">
          Você tem 7 dias para avaliar o conteúdo.
        </p>
      </div>
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] font-bold leading-tight">
              Sua Satisfação 100% Garantida
            </h2>
            <p className="text-lg text-[#aa6b5d] font-medium">
              Risco Zero • Investimento Protegido
            </p>
          </div>
        </div>

        {/* Enhanced guarantee content */}
        <div className="space-y-8 mb-8">
          <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/20">
            <p className="text-lg md:text-xl text-[#432818] max-w-3xl mx-auto leading-relaxed font-medium">
              Acreditamos tanto na <span className="font-bold text-[#B89B7A]">transformação extraordinária</span> que o Guia de Estilo proporciona que oferecemos uma <span className="font-bold text-[#aa6b5d]">garantia incondicional de 7 dias</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 rounded-lg p-6 border border-[#B89B7A]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#432818]">Reembolso Total</h3>
              </div>
              <p className="text-[#6B5B4E] leading-relaxed">
                Se por qualquer motivo você não ficar 100% satisfeita, reembolsamos o valor integral sem perguntas.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-lg p-6 border border-[#B89B7A]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#432818]">Processo Rápido</h3>
              </div>
              <p className="text-[#6B5B4E] leading-relaxed">
                Basta enviar um e-mail e processamos seu reembolso em até 48 horas úteis.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#4CAF50]/10 to-[#45a049]/10 rounded-xl p-6 border-2 border-[#4CAF50]/30">
            <p className="text-xl text-[#432818] max-w-2xl mx-auto leading-relaxed font-semibold text-center">
              <span className="text-[#4CAF50]">✓</span> Sem perguntas • <span className="text-[#4CAF50]">✓</span> Sem burocracia • <span className="text-[#4CAF50]">✓</span> Seu investimento é totalmente seguro
            </p>
          </div>
        </div>
        
        {/* Enhanced guarantee features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#432818] max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-lg border border-[#B89B7A]/20">
            <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
            <span className="font-medium text-center">100% Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-lg border border-[#B89B7A]/20">
            <Shield className="w-6 h-6 text-[#B89B7A]" />
            <span className="font-medium text-center">Risco Zero</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-lg border border-[#B89B7A]/20">
            <RefreshCw className="w-6 h-6 text-[#aa6b5d]" />
            <span className="font-medium text-center">Reembolso Fácil</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-lg border border-[#B89B7A]/20">
            <Award className="w-6 h-6 text-[#4CAF50]" />
            <span className="font-medium text-center">Garantia Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSection;