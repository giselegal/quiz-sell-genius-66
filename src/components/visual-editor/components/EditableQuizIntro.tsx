import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQuizStyles } from "@/hooks/useQuizConfig";

// Constantes das imagens (copiadas do QuizIntro original)
const LOGO_BASE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/";
const LOGO_IMAGE_ID = "v1744911572/LOGO_DA_MARCA_GISELE_r14oz2";

const INTRO_IMAGE_BASE_URL =
  "https://res.cloudinary.com/dqljyf76t/image/upload/";
const INTRO_IMAGE_ID =
  "v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up";

const STATIC_LOGO_IMAGE_URLS = {
  webp: `${LOGO_BASE_URL}f_webp,q_70,w_120,h_50,c_fit/${LOGO_IMAGE_ID}.webp`,
  png: `${LOGO_BASE_URL}f_png,q_70,w_120,h_50,c_fit/${LOGO_IMAGE_ID}.png`,
};

const STATIC_INTRO_IMAGE_URLS = {
  avif: `${INTRO_IMAGE_BASE_URL}f_avif,q_85,w_300,c_limit/${INTRO_IMAGE_ID}.avif`,
  webp: `${INTRO_IMAGE_BASE_URL}f_webp,q_85,w_300,c_limit/${INTRO_IMAGE_ID}.webp`,
  png: `${INTRO_IMAGE_BASE_URL}f_png,q_85,w_300,c_limit/${INTRO_IMAGE_ID}.png`,
};

interface EditableQuizIntroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onStart?: (nome?: string) => void;
}

/**
 * EditableQuizIntro - Versão editável do QuizIntro para o visual editor
 * Aceita props customizáveis para título, subtítulo e texto do botão
 */
export const EditableQuizIntro: React.FC<EditableQuizIntroProps> = ({
  title = "Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.",
  subtitle = "Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.",
  buttonText = "Quero Descobrir meu Estilo Agora!",
  onStart,
}) => {
  const [nome, setNome] = useState("");
  const { cssVariables } = useQuizStyles();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError("Por favor, digite seu nome para continuar");
      return;
    }

    setError("");
    onStart?.(nome);
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F5F4F2] to-[#FAF9F7] flex items-center justify-center p-4 font-inter"
      style={cssVariables}
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Seção Esquerda - Texto e Formulário */}
        <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <picture>
              <source srcSet={STATIC_LOGO_IMAGE_URLS.webp} type="image/webp" />
              <img
                src={STATIC_LOGO_IMAGE_URLS.png}
                alt="Graciele Louback"
                className="h-12 w-auto object-contain"
                width={120}
                height={50}
                loading="eager"
              />
            </picture>
          </div>

          {/* Título Principal */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-playfair text-[#432818] leading-tight">
              {title.includes("Chega") && title.includes("Você") ? (
                <>
                  <span className="text-[#B89B7A]">Chega</span> de um
                  guarda-roupa lotado e da sensação de que nada combina com{" "}
                  <span className="text-[#B89B7A]">Você</span>.
                </>
              ) : (
                title
              )}
            </h1>
            <p className="text-lg lg:text-xl text-[#6B5B4D] leading-relaxed max-w-lg mx-auto lg:mx-0">
              {subtitle.includes("Estilo Predominante") ? (
                <>
                  Em poucos minutos, descubra seu{" "}
                  <span className="font-semibold text-[#B89B7A]">
                    Estilo Predominante
                  </span>{" "}
                  — e aprenda a montar looks que realmente refletem sua{" "}
                  <span className="font-semibold text-[#432818]">essência</span>
                  , com praticidade e{" "}
                  <span className="font-semibold text-[#432818]">
                    confiança
                  </span>
                  .
                </>
              ) : (
                subtitle
              )}
            </p>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-md mx-auto lg:mx-0"
          >
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Digite seu primeiro nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (error) setError("");
                }}
                className={cn(
                  "h-14 text-lg bg-white/90 border-2 border-[#E5DDD5] focus:border-[#B89B7A] rounded-xl px-6 placeholder:text-[#A0937B] shadow-sm backdrop-blur-sm",
                  error && "border-red-400 focus:border-red-400"
                )}
                required
                autoComplete="given-name"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 px-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!nome.trim()}
              className="w-full h-14 bg-[#B89B7A] hover:bg-[#A08A74] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {buttonText}
            </button>
          </form>

          {/* Indicadores de Benefícios */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-[#6B5B4D]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
              <span>2 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
              <span>Resultado imediato</span>
            </div>
          </div>
        </div>

        {/* Seção Direita - Imagem */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative">
            <picture>
              <source srcSet={STATIC_INTRO_IMAGE_URLS.avif} type="image/avif" />
              <source srcSet={STATIC_INTRO_IMAGE_URLS.webp} type="image/webp" />
              <img
                src={STATIC_INTRO_IMAGE_URLS.png}
                alt="Mulher elegante descobrindo seu estilo"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded-2xl shadow-2xl"
                width={300}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
            </picture>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#B89B7A] rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#D4C4B0] rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Footer com informações legais */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-[#A0937B] text-center max-w-md mx-auto">
          Ao continuar, você concorda com nossos termos de uso e política de
          privacidade. Seus dados estão seguros conosco.
        </p>
      </footer>
    </main>
  );
};

export default EditableQuizIntro;
