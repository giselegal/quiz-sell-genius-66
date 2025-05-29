import React from 'react';
import { Card } from '@/components/ui/card';
import { Award, Shield, CheckCircle, Clock, RefreshCw } from 'lucide-react'; // Ícones para o selo

const GuaranteeSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white to-[#fff7f3]/30 rounded-2xl shadow-xl border-2 border-[#B89B7A]/30 p-8 md:p-12 relative overflow-hidden">
      {/* Decorative background with enhanced patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/70 to-[#f9f4ef]/40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B89B7A]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#aa6b5d]/10 to-transparent rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Enhanced guarantee circle with premium design */}
        <div className="flex flex-col items-center gap-8 mb-10">
          <div className="relative">
            {/* Enhanced animated borders for premium feel */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#B89B7A]/30 via-[#aa6b5d]/30 to-[#B89B7A]/30 blur-md animate-pulse"></div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] animate-spin opacity-50" style={{ animationDuration: '10s' }}></div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] animate-spin opacity-40" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            
            {/* Main circle with enhanced shadow and gradient */}
            <div className="relative bg-gradient-to-br from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] w-44 h-44 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-white to-[#fefefe] w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-inner border-2 border-[#B89B7A]/20">
                <div className="text-center">
                  <span className="text-4xl font-bold bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent leading-none block">7</span>
                  <span className="text-sm font-semibold text-[#aa6b5d] tracking-wider mt-1 block">DIAS DE</span>
                  <span className="text-sm font-bold text-[#432818] tracking-wider block">GARANTIA</span>
                </div>
              </div>
              
              {/* Premium shield icon */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-[#4CAF50] to-[#45a049] w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Enhanced floating particles effect */}
            <div className="absolute top-3 right-6 w-3 h-3 bg-[#B89B7A]/70 rounded-full animate-ping"></div>
            <div className="absolute bottom-6 left-2 w-2 h-2 bg-[#aa6b5d]/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1 w-1.5 h-1.5 bg-[#B89B7A]/50 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-8 left-8 w-2 h-2 bg-[#4CAF50]/60 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B89B7A]"></div>
              <Award className="w-6 h-6 text-[#B89B7A] animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B89B7A]"></div>
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