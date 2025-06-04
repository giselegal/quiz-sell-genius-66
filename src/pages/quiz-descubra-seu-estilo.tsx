import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, Star, Users, Shield, Award } from 'lucide-react';
import MentorSection from '@/components/result/MentorSection';

const QuizDescubraSeuEstilo = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const painPoints = [
    {
      title: "Guarda-roupa lotado, mas nada para vestir",
      description: "Você tem muitas peças, mas sempre sente que falta algo"
    },
    {
      title: "Gastando dinheiro em roupas erradas",
      description: "Compra impulsiva que depois fica no armário sem usar"
    },
    {
      title: "Perdendo tempo todas as manhãs",
      description: "Demora para escolher looks e ainda sai insatisfeita"
    }
  ];

  const benefits = [
    "Descubra seu estilo único e autêntico",
    "Monte looks incríveis com o que já tem",
    "Economize tempo e dinheiro em compras",
    "Ganhe confiança e autoestima",
    "Transforme sua relação com o vestir"
  ];

  const testimonials = [
    {
      name: "Ana Paula",
      text: "Descobri que posso ser elegante sem gastar muito. Aprendi a valorizar o que já tinha!",
      rating: 5
    },
    {
      name: "Mariana",
      text: "Finalmente entendi meu estilo. Agora me visto com propósito e confiança.",
      rating: 5
    },
    {
      name: "Carla",
      text: "O quiz mudou minha vida. Hoje sei exatamente o que me favorece.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#B89B7A] text-white px-4 py-2 text-sm">
                  Quiz Exclusivo
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#432818] leading-tight">
                  Descubra Seu <span className="text-[#B89B7A]">Estilo Único</span> em 3 Minutos
                </h1>
                <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed">
                  Transforme sua relação com o vestir e ganhe confiança para se expressar autenticamente
                </p>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-[#B89B7A] hover:bg-[#A1835D] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.location.href = '/quiz'}
                >
                  Descobrir Meu Estilo Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-[#8F7A6A]">
                  ✨ Gratuito • Sem cadastro • Resultado imediato
                </p>
              </div>

              {/* Countdown */}
              <div className="bg-white p-4 rounded-lg border-l-4 border-[#B89B7A] shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#B89B7A]" />
                  <div>
                    <p className="text-sm font-semibold text-[#432818]">Oferta por tempo limitado</p>
                    <p className="text-lg font-bold text-[#B89B7A]">{formatTime(timeLeft)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_85,w_600,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up"
                alt="Descubra seu estilo único"
                className="w-full h-auto rounded-lg shadow-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#432818] mb-4">
              Você já passou por isso?
            </h2>
            <p className="text-lg text-[#8F7A6A]">
              Se você se identifica com essas situações, este quiz é para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-l-4 border-[#B89B7A] shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#432818] mb-3 text-lg">
                    {point.title}
                  </h3>
                  <p className="text-[#8F7A6A]">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 px-4 bg-[#FAF9F7]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#432818] mb-4">
              O que você vai descobrir
            </h2>
            <p className="text-lg text-[#8F7A6A]">
              Transforme sua relação com o vestir em apenas 3 minutos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#B89B7A] flex-shrink-0 mt-0.5" />
                  <p className="text-[#432818] text-lg">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_85,w_400,c_limit/v1744735317/1_srgjwx.webp"
                alt="Transformação de estilo"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#432818] mb-4">
              Transformações reais
            </h2>
            <p className="text-lg text-[#8F7A6A]">
              Veja o que outras mulheres descobriram sobre si mesmas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-[#B89B7A]" />
                    ))}
                  </div>
                  <p className="text-[#432818] mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-[#B89B7A]">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <MentorSection />

      {/* Social Proof */}
      <section className="py-8 md:py-12 px-4 bg-[#FAF9F7]">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <Users className="h-8 w-8 text-[#B89B7A] mx-auto" />
              <p className="text-2xl font-bold text-[#432818]">50,000+</p>
              <p className="text-sm text-[#8F7A6A]">Mulheres transformadas</p>
            </div>
            <div className="space-y-2">
              <Star className="h-8 w-8 text-[#B89B7A] mx-auto" />
              <p className="text-2xl font-bold text-[#432818]">4.9/5</p>
              <p className="text-sm text-[#8F7A6A]">Avaliação média</p>
            </div>
            <div className="space-y-2">
              <Shield className="h-8 w-8 text-[#B89B7A] mx-auto" />
              <p className="text-2xl font-bold text-[#432818]">100%</p>
              <p className="text-sm text-[#8F7A6A]">Seguro e privado</p>
            </div>
            <div className="space-y-2">
              <Award className="h-8 w-8 text-[#B89B7A] mx-auto" />
              <p className="text-2xl font-bold text-[#432818]">15 anos</p>
              <p className="text-sm text-[#8F7A6A]">De experiência</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 px-4 bg-[#432818]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Está pronta para descobrir seu estilo único?
            </h2>
            <p className="text-lg text-[#FAF9F7] opacity-90">
              São apenas 3 minutos que podem transformar sua relação com o vestir para sempre
            </p>
            <Button 
              size="lg"
              className="w-full md:w-auto bg-[#B89B7A] hover:bg-[#A1835D] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.location.href = '/quiz'}
            >
              Descobrir Meu Estilo Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-[#FAF9F7] opacity-75">
              ✨ Gratuito • Sem cadastro • Resultado imediato
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
