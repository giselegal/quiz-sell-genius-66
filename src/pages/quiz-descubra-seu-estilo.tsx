import React, { useEffect, useState } from "react";
import { useQuizPixel } from "../hooks/useQuizPixel";
import { trackPixelEvent } from "../utils/facebookPixel";

const QuizDescubraSeuEstilo: React.FC = () => {
  const { trackPageView, trackCTAClick, trackScroll } = useQuizPixel();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    trackPageView();
    // Scroll tracking
    const handleScroll = () => {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      trackScroll(Math.round(scrolled));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackPageView, trackScroll]);

  const handleCTAClick = (position: string) => {
    trackCTAClick(position);
    trackPixelEvent("Purchase", {
      content_name: "Manual de Estilo Contemporâneo",
      content_category: "Digital Product",
      value: 47,
      currency: "BRL",
    });
  };

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = document.querySelectorAll(".transformation-card")[
      index
    ] as HTMLElement;
    if (card) {
      if (isEntering) {
        card.style.transform = "scale(1.02)";
        card.style.boxShadow = "0 10px 30px rgba(184, 155, 122, 0.2)";
        setHoveredCard(index);
      } else {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
        setHoveredCard(null);
      }
    }
  };

  const handleCTAHover = (isEntering: boolean, element: EventTarget | null) => {
    const btn = element as HTMLElement;
    if (btn) {
      if (isEntering) {
        btn.style.transform = "scale(1.02)";
        btn.style.boxShadow = "0 8px 25px rgba(184, 155, 122, 0.4)";
      } else {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 4px 15px rgba(184, 155, 122, 0.2)";
      }
    }
  };

  // Estilos responsivos
  const containerStyle = {
    fontFamily: "Montserrat, Arial, sans-serif",
    background: "#faf9f6",
    color: "#222",
    lineHeight: "1.6",
  };

  const responsiveContainer = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    "@media (max-width: 768px)": {
      padding: "0 8px",
    },
  };

  return (
    <>
      <style>
        {`
          * { box-sizing: border-box; }
          body { background: #f8f6f2; }
          .responsive-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
          @media (max-width: 768px) {
            .responsive-container { padding: 0 8px; }
            .hero-title { font-size: 2rem; }
            .hero-subtitle { font-size: 1rem; }
            .pain-points { grid-template-columns: 1fr; }
            .testimonials-grid { grid-template-columns: 1fr; }
            .section-padding { padding: 28px 0 !important; }
            .cta-button { width: 100%; padding: 16px 0; font-size: 1rem; }
            .author-photo { width: 90px; height: 90px; }
          }
          .hero-title { font-size: clamp(2.2rem, 5vw, 3.2rem); line-height: 1.1; font-family: 'Playfair Display', serif; }
          .hero-subtitle { font-size: clamp(1.1rem, 2.5vw, 1.3rem); color: #6d5c3d; }
          .cta-button { background: linear-gradient(90deg, #bfa46f 60%, #d4b896 100%); color: #fff; font-weight: 800; font-size: 1.18rem; padding: 20px 44px; border-radius: 32px; box-shadow: 0 4px 16px #bfa46f33; letter-spacing: 1px; transition: all 0.3s; text-align: center; border: none; cursor: pointer; margin: 18px 0; }
          .cta-button:hover { background: #a8935f; transform: scale(1.04); box-shadow: 0 8px 24px #bfa46f44; }
          .pain-point-card { border: 2px solid #bfa46f33; background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 10px #bfa46f22; transition: 0.3s; display: flex; flex-direction: column; align-items: center; padding: 24px 16px; }
          .pain-point-card:hover { border-color: #bfa46f; box-shadow: 0 8px 24px #bfa46f33; transform: translateY(-4px) scale(1.03); }
          .pain-icon { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #bfa46f 60%, #d4b896 100%); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
          .pain-icon svg { color: #fff; width: 28px; height: 28px; }
          .testimonial-card { border: 2px solid #bfa46f22; background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 10px #bfa46f22; padding: 24px 18px; }
          .testimonial-name { color: #bfa46f; font-weight: 700; }
          .author-photo { border-radius: 50%; border: 4px solid #bfa46f; width: 120px; height: 120px; object-fit: cover; margin-bottom: 1rem; }
          .faq-item { border-bottom: 1px solid #e0d7c6; }
          .faq-question { cursor: pointer; }
        `}
      </style>
      <div style={containerStyle}>
        {/* HERO */}
        <section
          className="section-padding"
          style={{
            background: "linear-gradient(120deg, #fff 60%, #bfa46f1a 100%)",
            textAlign: "center",
          }}
        >
          <div className="responsive-container">
            <img
              src="/logo.png"
              alt="Gisele Galvão"
              className="logo"
              style={{ marginBottom: 18, maxWidth: 180 }}
            />
            <h1
              className="hero-title"
              style={{ fontWeight: 900, margin: "0 0 14px 0", color: "#222" }}
            >
              Descubra o Estilo Que Valoriza Sua Essência
            </h1>
            <p
              className="hero-subtitle"
              style={{ maxWidth: 480, margin: "0 auto 22px auto" }}
            >
              Método rápido, prático e validado por{" "}
              <span style={{ color: "#BFA46F", fontWeight: 700 }}>
                3.000+ mulheres
              </span>{" "}
              para você se sentir confiante e autêntica todos os dias.
            </p>
            <a
              href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
              onClick={() => handleCTAClick("hero")}
              className="cta-button"
            >
              QUERO DESCOBRIR MEU ESTILO
            </a>
          </div>
          <div style={{ marginTop: 18, fontSize: "1rem", color: "#888" }}>
            Oferta exclusiva para esta página
          </div>
        </section>
        {/* PAINEL DE DOR */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="responsive-container">
            <h2
              className="title"
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              Você se reconhece em alguma destas situações?
            </h2>
            <div
              className="pain-points"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                margin: "0 auto",
                maxWidth: "800px",
              }}
            >
              {/* Substituir emojis por ícones elegantes da marca */}
              <div className="pain-point-card">
                <div className="pain-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="text"
                  style={{
                    fontSize: "1.08rem",
                    color: "#333",
                    lineHeight: 1.4,
                  }}
                >
                  Guarda-roupa cheio, mas nada para vestir.
                </div>
              </div>
              <div className="pain-point-card">
                <div className="pain-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 16v-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="8" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div
                  className="text"
                  style={{
                    fontSize: "1.08rem",
                    color: "#333",
                    lineHeight: 1.4,
                  }}
                >
                  Dúvida se as roupas realmente combinam.
                </div>
              </div>
              <div className="pain-point-card">
                <div className="pain-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7a5 5 0 0110 0v4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  className="text"
                  style={{
                    fontSize: "1.08rem",
                    color: "#333",
                    lineHeight: 1.4,
                  }}
                >
                  Compras por impulso que nunca usa.
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SOLUÇÃO */}
        <section
          className="section-padding"
          style={{
            background: "linear-gradient(120deg, #f9f9f9 0%, #f1f1f1 100%)",
            textAlign: "center",
          }}
        >
          <div className="responsive-container">
            <h2
              className="title"
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              A solução está aqui!
            </h2>
            <p
              className="subtitle"
              style={{
                fontSize: "1.15rem",
                color: "#555",
                margin: "0 0 2rem 0",
                maxWidth: "700px",
                lineHeight: 1.6,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Apresentamos o{" "}
              <strong style={{ color: "#BFA46F" }}>Quiz do Estilo</strong>, uma
              ferramenta exclusiva para descobrir seu estilo pessoal em minutos!
            </p>
            <a
              href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
              onClick={() => handleCTAClick("solution")}
              className="cta-button"
            >
              FAZER O QUIZ AGORA
            </a>
          </div>
        </section>
        {/* DEPOIMENTOS */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="responsive-container">
            <h2
              className="title"
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              O que estão dizendo sobre nós
            </h2>
            <div
              className="testimonials-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                margin: "0 auto",
                maxWidth: "800px",
              }}
            >
              {[
                {
                  name: "Maria Silva",
                  testimonial:
                    "O quiz é incrível! Em poucos minutos consegui entender meu estilo e recebi dicas valiosas.",
                  rating: 5,
                },
                {
                  name: "Joana Souza",
                  testimonial:
                    "Amei o resultado do meu quiz! Agora sei exatamente como valorizar meu corpo e meu estilo pessoal.",
                  rating: 5,
                },
                {
                  name: "Ana Oliveira",
                  testimonial:
                    "As dicas são práticas e fáceis de seguir. Senti uma diferença enorme na minha confiança ao me vestir.",
                  rating: 5,
                },
                {
                  name: "Fernanda Lima",
                  testimonial:
                    "Nunca pensei que um quiz pudesse ser tão assertivo. Recomendo para todas as minhas amigas!",
                  rating: 5,
                },
              ].map((item, index) => (
                <div key={index} className="testimonial-card">
                  <div
                    className="rating"
                    style={{
                      marginBottom: "1rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#BFA46F] fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ marginRight: "0.125rem" }}
                      >
                        <path d="M10 15.27L16.18 20 14.54 13.97 20 9.24l-6.91-.59L10 2 8.91 8.65 2 9.24l5.46 4.73L7.82 20z" />
                      </svg>
                    ))}
                  </div>
                  <p
                    className="testimonial-text"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      lineHeight: 1.4,
                      marginBottom: "0.5rem",
                    }}
                  >
                    "{item.testimonial}"
                  </p>
                  <p
                    className="testimonial-name"
                    style={{
                      fontSize: "0.95rem",
                      color: "#777",
                      fontStyle: "italic",
                    }}
                  >
                    - {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* AUTORIDADE */}
        <section
          className="section-padding"
          style={{
            background: "linear-gradient(120deg, #fff 0%, #f1f1f1 100%)",
            textAlign: "center",
          }}
        >
          <div className="responsive-container">
            <h2
              className="title"
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              Sobre a Criadora
            </h2>
            <div
              className="author-info"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <img
                src="/logo.png"
                alt="Gisele Galvão"
                className="author-photo"
              />
              <h3
                className="author-name"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#222",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Gisele Galvão
              </h3>
              <p
                className="author-description"
                style={{
                  fontSize: "1rem",
                  color: "#555",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Consultora de Imagem e Estilo, especialista em ajudar mulheres a
                descobrirem seu estilo pessoal e a se vestirem com confiança.
                Com mais de 10 anos de experiência, Gisele já ajudou milhares de
                mulheres a transformarem sua relação com a moda.
              </p>
            </div>
          </div>
        </section>
        {/* CTA FINAL */}
        <section
          className="section-padding"
          style={{
            background: "linear-gradient(120deg, #BFA46F 0%, #D4B896 100%)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div className="responsive-container">
            <h2
              className="title"
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                margin: "0 0 1rem 0",
                color: "#fff",
              }}
            >
              Pronta para transformar seu estilo?
            </h2>
            <p
              className="subtitle"
              style={{
                fontSize: "1.15rem",
                color: "#fff",
                margin: "0 0 2rem 0",
                maxWidth: "700px",
                lineHeight: 1.6,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Não perca mais tempo se sentindo insegura sobre suas escolhas
              fashionistas. Descubra agora mesmo como valorizar sua beleza única
              e se vestir com confiança todos os dias.
            </p>
            <a
              href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
              onClick={() => handleCTAClick("final-cta")}
              className="cta-button"
              style={{
                background: "#fff",
                color: "#BFA46F",
                padding: "1rem 2rem",
                borderRadius: "2rem",
                fontSize: "1.125rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 0.3s, transform 0.3s",
                display: "inline-block",
                marginTop: "1rem",
              }}
            >
              QUERO DESCOBRIR MEU ESTILO AGORA
            </a>
          </div>
        </section>
        {/* FAQ */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="responsive-container">
            <h2
              className="title"
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              Perguntas Frequentes
            </h2>
            <div
              className="faq-list"
              style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}
            >
              {[
                {
                  question: "Quanto tempo leva para fazer o quiz?",
                  answer:
                    "O quiz leva apenas 3 minutos para ser concluído. São perguntas simples sobre suas preferências e personalidade.",
                },
                {
                  question: "O resultado é realmente personalizado?",
                  answer:
                    "Sim! Cada resultado é único e baseado nas suas respostas específicas. Nosso algoritmo analisa suas preferências para criar uma análise personalizada.",
                },
                {
                  question: "Preciso pagar alguma coisa?",
                  answer:
                    "O quiz é 100% gratuito. Você recebe seu resultado imediatamente após completar as perguntas, sem custo algum.",
                },
                {
                  question: "O quiz funciona para qualquer idade?",
                  answer:
                    "Sim! Nosso método se adapta a diferentes idades e estilos de vida. O importante é sua personalidade e preferências únicas.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="faq-item"
                  style={{
                    borderBottom: "1px solid #e0d7c6",
                    padding: "1rem 0",
                  }}
                >
                  <div
                    className="faq-question"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      const answer = (e.currentTarget as HTMLElement)
                        .nextElementSibling;
                      const icon = (
                        e.currentTarget as HTMLElement
                      ).querySelector(".faq-icon");
                      if (answer) {
                        const isHidden =
                          (answer as HTMLElement).style.display === "none" ||
                          !(answer as HTMLElement).style.display;
                        (answer as HTMLElement).style.display = isHidden
                          ? "block"
                          : "none";
                        if (icon)
                          (icon as HTMLElement).style.transform = isHidden
                            ? "rotate(45deg)"
                            : "rotate(0deg)";
                      }
                    }}
                  >
                    <h3
                      className="text"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#333",
                        margin: 0,
                      }}
                    >
                      {item.question}
                    </h3>
                    <span
                      className="faq-icon"
                      style={{
                        fontSize: "1.25rem",
                        color: "#BFA46F",
                        transition: "transform 0.3s",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className="faq-answer"
                    style={{
                      display: "none",
                      fontSize: "0.95rem",
                      color: "#555",
                      marginTop: "0.5rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QuizDescubraSeuEstilo;
