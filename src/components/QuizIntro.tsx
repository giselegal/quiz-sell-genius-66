'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Design tokens centralizados - apenas os essenciais
const colors = {
  primary: '#B89B7A',
  primaryDark: '#A1835D',
  secondary: '#432818',
  background: '#FEFEFE',
  backgroundAlt: '#F8F5F0',
  text: '#432818',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

// --- Constantes e funções movidas para o escopo do módulo ---
const LOGO_BASE_URL = 'https://res.cloudinary.com/dqljyf76t/image/upload/';
const LOGO_IMAGE_ID = 'v1744911572/LOGO_DA_MARCA_GISELE_r14oz2';

const INTRO_IMAGE_BASE_URL = 'https://res.cloudinary.com/dqljyf76t/image/upload/';
const INTRO_IMAGE_ID =
  'v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up';

// Otimizado para carregamento mais rápido - URLs pré-construídas
const STATIC_LOGO_IMAGE_URLS = {
  webp: `${LOGO_BASE_URL}f_webp,q_70,w_120,h_50,c_fit/${LOGO_IMAGE_ID}.webp`,
  png: `${LOGO_BASE_URL}f_png,q_70,w_120,h_50,c_fit/${LOGO_IMAGE_ID}.png`,
};

// Imagem LCP: Otimizada para carregamento mais rápido - URLs pré-construídas
const STATIC_INTRO_IMAGE_URLS = {
  avif: `${INTRO_IMAGE_BASE_URL}f_avif,q_85,w_300,c_limit/${INTRO_IMAGE_ID}.avif`,
  webp: `${INTRO_IMAGE_BASE_URL}f_webp,q_85,w_300,c_limit/${INTRO_IMAGE_ID}.webp`,
  png: `${INTRO_IMAGE_BASE_URL}f_png,q_85,w_300,c_limit/${INTRO_IMAGE_ID}.png`,
};

interface QuizIntroProps {
  onStart: (nome: string) => void;
}

/**
 * QuizIntro - Componente ultra-otimizado da página inicial do quiz
 * Renderização imediata sem estados de carregamento
 */
type QuizIntroComponent = React.FC<QuizIntroProps>;
const QuizIntro: QuizIntroComponent = ({ onStart }) => {
  const [nome, setNome] = useState('');
  
  // Função simplificada de submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      onStart(nome);
      
      // Reportar Web Vitals após interação do usuário
      if (typeof window !== 'undefined' && 'performance' in window) {
        window.performance.mark('user-interaction');
      }
    }
  };

  // Efeito de inicialização única - executa apenas uma vez
  useEffect(() => {
    // Reportar Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('component-mounted');
    }
    
    // Reportar que o LCP foi renderizado (para analytics)
    const reportLcpRendered = () => {
      if (typeof window !== 'undefined' && window.QUIZ_PERF) {
        window.QUIZ_PERF.mark('lcp_rendered');
      }
    };
    
    // Usar requestAnimationFrame para garantir que o reporte aconteça após a renderização
    requestAnimationFrame(() => {
      requestAnimationFrame(reportLcpRendered);
    });
  }, []);

  // Renderizar diretamente o conteúdo principal sem estados de carregamento
  return (
    <main
      className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-[#fffaf4] to-[#f8f5f0] py-8 relative overflow-x-hidden"
      data-section="intro"
    >
      {/* Animação de entrada para o card principal */}
      <div className="absolute inset-0 pointer-events-none select-none animate-intro-bg z-0" />
      {/* Skip link para acessibilidade */}
      <a 
        href="#quiz-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white text-[#432818] px-4 py-2 rounded-md shadow-md"
      >
        Pular para o formulário
      </a>
      {/* Card glassmorphism central */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg px-4 mx-auto relative z-10 animate-fade-in-up">
        <div className="backdrop-blur-xl bg-white/70 border border-[#e7dac2] rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-8">
          <header className="w-full space-y-8">
            {/* Logo centralizado */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <picture>
                  <source srcSet={STATIC_LOGO_IMAGE_URLS.webp} type="image/webp" />
                  <img
                    src={STATIC_LOGO_IMAGE_URLS.png}
                    alt="Logo Gisele Galvão"
                    className="h-auto mx-auto drop-shadow-lg"
                    width={120}
                    height={50}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      aspectRatio: '120 / 50',
                    }}
                  />
                </picture>
                {/* Barra dourada */}
                <div
                  className="h-[3px] bg-gradient-to-r from-[#B89B7A] via-[#e7dac2] to-[#B89B7A] rounded-full mt-1.5 shadow"
                  style={{
                    width: '300px',
                    maxWidth: '90%',
                    margin: '0 auto',
                  }}
                />
              </div>
            </div>
            {/* Título principal */}
            <h1
              className="text-2xl font-bold text-center leading-tight px-2 sm:text-3xl md:text-4xl playfair-display text-[#432818] drop-shadow-md"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 400,
              }}
            >
              <span className="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com{' '}
              <span className="text-[#B89B7A]">Você</span>.
            </h1>
          </header>
          <section className="w-full space-y-6 md:space-y-8">
            {/* Imagem principal */}
            <div className="mt-2 w-full mx-auto">
              <div
                className="w-full overflow-hidden rounded-xl shadow-lg border border-[#e7dac2] bg-[#f8f5f0]/80"
                style={{ aspectRatio: '1.47', maxHeight: '204px' }}
              >
                <div className="relative w-full h-full">
                  <picture>
                    <source srcSet={STATIC_INTRO_IMAGE_URLS.avif} type="image/avif" />
                    <source srcSet={STATIC_INTRO_IMAGE_URLS.webp} type="image/webp" />
                    <img
                      src={STATIC_INTRO_IMAGE_URLS.png}
                      alt="Descubra seu estilo predominante e transforme seu guarda-roupa"
                      className="w-full h-full object-contain"
                      width={300}
                      height={204}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      id="lcp-image"
                    />
                  </picture>
                  {/* Overlay dourado sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#b89b7a22] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
            {/* Texto descritivo */}
            <p className="text-base text-center leading-relaxed px-2 sm:text-lg text-[#6B5C4B] font-medium">
              Em poucos minutos, descubra seu{' '}
              <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span>{' '}
              — e aprenda a montar looks que realmente refletem sua{' '}
              <span className="font-semibold text-[#432818]">essência</span>, com praticidade e{' '}
              <span className="font-semibold text-[#432818]">confiança</span>.
            </p>
            {/* Formulário */}
            <div id="quiz-form" className="mt-8">
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-6"
                autoComplete="off"
              >
                <div className="relative">
                  <Input
                    id="name"
                    placeholder=" "
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={cn(
                      'w-full p-3 bg-[#FEFEFE]/90 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2 text-lg font-semibold text-[#432818] transition-all',
                      nome ? 'shadow-lg' : ''
                    )}
                    autoFocus
                    aria-label="Seu nome"
                    required
                  />
                  <label
                    htmlFor="name"
                    className={cn(
                      "absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-[#6B7280]",
                      nome ? "top-1.5 text-xs" : "top-1/2 -translate-y-1/2 text-base"
                    )}
                  >
                    Seu nome
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!nome.trim()}
                  className={cn(
                    "w-full rounded-lg py-3 text-white font-semibold transition-all duration-300 ease-in-out relative overflow-hidden group",
                    "bg-[#432818] hover:bg-[#A1835D] focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2 focus:ring-offset-[#FEFEFE]",
                    "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500",
                    "text-base sm:text-lg", // Fonte base, sm:text-lg para telas maiores
                    "h-12 sm:h-14" // Altura ajustada para mobile e desktop
                  )}
                  style={{
                    boxShadow: nome.trim() ? '0 4px 14px 0 rgba(184, 155, 122, 0.39)' : 'none',
                  }}
                >
                  <span className="relative z-10">Descobrir meu Estilo</span>
                  {/* Efeito de brilho lateral mais discreto */}
                  <span
                    className={cn(
                      "absolute top-0 right-0 h-full w-0 bg-white/20 transform -skew-x-12 transition-all duration-500 ease-in-out",
                      "group-hover:w-1/3 group-focus:w-1/3"
                    )}
                  />
                </button>
              </form>
            </div>
          </section>
          {/* Rodapé com informações adicionais */}
          <footer className="w-full px-2 mt-6 text-center mx-auto">
            <p className="text-xs text-[#B89B7A] font-medium drop-shadow-sm">
              © {new Date().getFullYear()} Gisele Galvão - Todos os direitos reservados
            </p>
          </footer>
        </div>
      </div>
      {/* Animações utilitárias */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(.4,1.2,.4,1) both; }
        @keyframes intro-bg {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-intro-bg { animation: intro-bg 1.2s cubic-bezier(.4,1.2,.4,1) both; background: radial-gradient(ellipse 80% 60% at 50% 0%, #e7dac2cc 0%, #fffaf400 100%); }
        @keyframes shine {
          0% { transform: translateX(100%); opacity: 0; }
          10% { opacity: 0.7; }
          50% { transform: translateX(-10%); opacity: 0.7; }
          100% { transform: translateX(-120%); opacity: 0; }
        }
        @media (max-width: 640px) {
          button[type=submit] {
            font-size: 0.98rem !important;
            min-height: 44px !important;
          }
        }
      `}</style>
    </main>
  );
};

export default QuizIntro;
