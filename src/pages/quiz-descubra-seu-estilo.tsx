
import React, { useEffect, useState } from "react";
import { getPixelId, trackFunnelEvent } from "../services/pixelManager";
import { CountdownTimer } from "../components/ui/countdown-timer";

declare global {
  interface Window {
    fbq?: any;
  }
}

export default function QuizDescubraSeuEstilo() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    // Inicializar pixel específico da página B
    const pixelId = getPixelId();
    if (window.fbq && pixelId) {
      window.fbq("init", pixelId);
      trackFunnelEvent("PageView_QuizPageB");
    }
  }, []);

  const handleCTAClick = (location: string) => {
    trackFunnelEvent("CTAClick_QuizPageB", { button_location: location });
  };

  const toggleFAQ = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "Funciona mesmo para o meu tipo de corpo?",
      answer: "Sim! O método funciona para todos os tipos de corpo, altura e idade. Não é sobre seguir padrões, mas sobre descobrir o que valoriza VOCÊ especificamente."
    },
    {
      question: "E se eu não tiver muito dinheiro para roupas?",
      answer: "Perfeito! O guia ensina exatamente como fazer mais com menos. Você vai aprender a escolher peças versáteis que criam múltiplos looks, economizando muito dinheiro."
    },
    {
      question: "Quanto tempo leva para ver resultado?",
      answer: "Muitas mulheres notam diferença já no primeiro look que montam seguindo o método. Em 30 dias, você terá transformado completamente a forma como se veste."
    },
    {
      question: "E se eu não ficar satisfeita?",
      answer: "Você tem 7 dias de garantia total. Se não ficar 100% satisfeita, devolvemos seu dinheiro sem perguntas. Simples assim."
    }
  ];

  return (
    <div
      style={{
        fontFamily: "Montserrat, Arial, sans-serif",
        background: "#faf9f6",
        color: "#222",
      }}
    >
      {/* HERO OTIMIZADO */}
      <section
        style={{
          background: "linear-gradient(135deg, #fff 0%, #bfa46f1a 100%)",
          padding: "40px 0 50px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "20px", right: "20px", background: "#d32f2f", color: "#fff", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700", letterSpacing: "1px" }}>
          OFERTA LIMITADA
        </div>
        
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Gisele Galvão"
          style={{ maxWidth: 160, marginBottom: 18 }}
        />
        
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: 900,
            margin: "0 0 20px 0",
            color: "#222",
            lineHeight: "1.2",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Pare de Abrir o Guarda-Roupa e Pensar:<br />
          <span style={{ color: "#BFA46F", fontSize: "2.4rem" }}>
            "Não Tenho Nada Para Vestir"
          </span>
        </h1>
        
        <p
          style={{
            fontSize: "1.3rem",
            maxWidth: 550,
            margin: "0 auto 25px auto",
            color: "#444",
            fontWeight: 600,
            lineHeight: "1.4",
          }}
        >
          Descubra seu <span style={{ color: "#BFA46F", fontWeight: 800 }}>Estilo Autêntico</span> em apenas 7 dias e transforme cada manhã em uma experiência de <strong>confiança total</strong>
        </p>

        <div style={{ marginBottom: "25px" }}>
          <CountdownTimer 
            initialHours={2} 
            initialMinutes={47} 
            initialSeconds={33}
            className="justify-center"
          />
          <p style={{ fontSize: "0.95rem", color: "#d32f2f", fontWeight: "700", marginTop: "8px" }}>
            ⏰ Oferta expira quando o tempo acabar!
          </p>
        </div>

        <a
          href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
          onClick={() => handleCTAClick("hero")}
          style={{
            display: "inline-block",
            background: "linear-gradient(45deg, #BFA46F 0%, #d4b87a 100%)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.25rem",
            padding: "22px 50px",
            borderRadius: 40,
            marginTop: 15,
            textDecoration: "none",
            boxShadow: "0 8px 25px rgba(191, 164, 111, 0.4)",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            border: "3px solid #fff",
            textTransform: "uppercase",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 12px 35px rgba(191, 164, 111, 0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 8px 25px rgba(191, 164, 111, 0.4)";
          }}
        >
          🔥 QUERO MINHA TRANSFORMAÇÃO AGORA
        </a>
        
        <div
          style={{
            marginTop: 20,
            fontSize: "1rem",
            color: "#666",
            fontWeight: "600",
          }}
        >
          ✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ +3.000 mulheres transformadas
        </div>
      </section>

      {/* PROVA SOCIAL FORTALECIDA */}
      <section
        style={{
          background: "#fff",
          textAlign: "center",
          padding: "30px 0",
          borderBottom: "3px solid #BFA46F",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#BFA46F" }}>+3.000</div>
            <div style={{ fontSize: "0.9rem", color: "#666", fontWeight: "600" }}>Mulheres Transformadas</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#BFA46F" }}>98%</div>
            <div style={{ fontSize: "0.9rem", color: "#666", fontWeight: "600" }}>Taxa de Satisfação</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#BFA46F" }}>8+</div>
            <div style={{ fontSize: "0.9rem", color: "#666", fontWeight: "600" }}>Anos de Experiência</div>
          </div>
        </div>
      </section>

      {/* DOR MAIS VISCERAL */}
      <section style={{ padding: "50px 0", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              marginBottom: 20,
              color: "#222",
              lineHeight: "1.3",
            }}
          >
            Você Está Cansada de Se Sentir <span style={{ color: "#d32f2f" }}>Invisível</span> Todos os Dias?
          </h2>
          
          <div style={{ background: "#f8f5f2", padding: "40px", borderRadius: "20px", marginBottom: "30px", textAlign: "left" }}>
            <p style={{ fontSize: "1.1rem", color: "#444", marginBottom: "20px", fontWeight: "600" }}>
              Se você se identifica com pelo menos 3 dessas situações, este guia vai mudar sua vida:
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#444", fontSize: "1.1rem" }}>
              <li style={{ marginBottom: 15, display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#d32f2f", marginRight: "10px", fontSize: "1.3rem" }}>😣</span>
                <span><strong>Você perde 20+ minutos toda manhã</strong> tentando escolher uma roupa e ainda sai de casa insatisfeita</span>
              </li>
              <li style={{ marginBottom: 15, display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#d32f2f", marginRight: "10px", fontSize: "1.3rem" }}>😔</span>
                <span><strong>Sente que suas roupas não refletem quem você é</strong> e que as pessoas não te veem como você realmente é</span>
              </li>
              <li style={{ marginBottom: 15, display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#d32f2f", marginRight: "10px", fontSize: "1.3rem" }}>💸</span>
                <span><strong>Gasta dinheiro em roupas que nunca usa</strong> porque comprou por impulso e não combina com nada</span>
              </li>
              <li style={{ marginBottom: 15, display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#d32f2f", marginRight: "10px", fontSize: "1.3rem" }}>😰</span>
                <span><strong>Evita eventos sociais ou profissionais</strong> porque não sabe o que vestir para a ocasião</span>
              </li>
              <li style={{ marginBottom: 15, display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#d32f2f", marginRight: "10px", fontSize: "1.3rem" }}>😩</span>
                <span><strong>Olha no espelho e pensa:</strong> "Nada fica bem em mim" ou "Não sei mais como me vestir"</span>
              </li>
              <li style={{ marginBottom: 15, display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#d32f2f", marginRight: "10px", fontSize: "1.3rem" }}>🙄</span>
                <span><strong>Escuta de amigas:</strong> "Nossa, que roupa diferente!" quando você tenta algo novo</span>
              </li>
            </ul>
          </div>
          
          <div style={{ background: "linear-gradient(45deg, #BFA46F, #d4b87a)", padding: "25px", borderRadius: "15px", color: "#fff", marginBottom: "20px" }}>
            <p style={{ fontSize: "1.3rem", fontWeight: "700", margin: 0, textAlign: "center" }}>
              💔 A verdade dolorosa: Enquanto você não descobrir seu estilo autêntico, vai continuar se sentindo deslocada e desperdiçando tempo e dinheiro todos os dias.
            </p>
          </div>
          
          <p style={{ fontSize: "1.2rem", fontWeight: "700", color: "#BFA46F", marginTop: "20px" }}>
            ✨ Mas e se eu te dissesse que existe um método simples para acabar com isso de uma vez por todas?
          </p>
        </div>
      </section>

      {/* SEÇÃO SOBRE A GISELE - AUTORIDADE */}
      <section style={{ background: "#f8f5f2", padding: "60px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "800", marginBottom: "40px", color: "#222" }}>
            Conheça Gisele Galvão: A Especialista Que Já Transformou +3.000 Mulheres
          </h2>
          
          <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1", minWidth: "300px" }}>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
                alt="Gisele Galvão"
                style={{ width: "100%", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              />
            </div>
            
            <div style={{ flex: "1.5", minWidth: "300px" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#BFA46F", marginBottom: "20px" }}>
                8+ Anos Transformando Vidas Através do Estilo
              </h3>
              
              <ul style={{ listStyle: "none", padding: 0, fontSize: "1.1rem", color: "#444" }}>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "10px", fontSize: "1.2rem" }}>✓</span>
                  <span><strong>Consultora de Imagem Certificada</strong> com formação internacional</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "10px", fontSize: "1.2rem" }}>✓</span>
                  <span><strong>+3.000 mulheres atendidas</strong> em consultoria presencial e online</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "10px", fontSize: "1.2rem" }}>✓</span>
                  <span><strong>Especialista em Coloração Pessoal</strong> e Análise de Estilo</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "10px", fontSize: "1.2rem" }}>✓</span>
                  <span><strong>Criadora do Método Vista-se de Você</strong> - o único que funciona de verdade</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "10px", fontSize: "1.2rem" }}>✓</span>
                  <span><strong>Reconhecida nacionalmente</strong> por grandes marcas de moda</span>
                </li>
              </ul>
              
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px", borderLeft: "4px solid #BFA46F" }}>
                <p style={{ fontSize: "1.1rem", color: "#444", fontStyle: "italic", margin: 0 }}>
                  <strong>"Minha missão é simples: fazer com que cada mulher desperte todos os dias sabendo exatamente como se vestir para expressar sua verdadeira essência e se sentir poderosa."</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA IRRESISTÍVEL */}
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", fontWeight: "800", marginBottom: "20px", color: "#222" }}>
            O Que Você Recebe Hoje (Valor Total: R$ 897,00)
          </h2>
          
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666", marginBottom: "40px", fontWeight: "600" }}>
            Um sistema completo para descobrir e aplicar seu estilo autêntico em apenas 7 dias
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", marginBottom: "40px" }}>
            {/* Produto Principal */}
            <div style={{ background: "#f8f5f2", borderRadius: "20px", padding: "30px", border: "3px solid #BFA46F", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "20px", background: "#BFA46F", color: "#fff", padding: "8px 20px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700" }}>
                PRODUTO PRINCIPAL
              </div>
              
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp" alt="Manual Principal" style={{ width: "120px", borderRadius: "10px" }} />
              </div>
              
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#BFA46F", marginBottom: "15px", textAlign: "center" }}>
                Manual de Estilo Contemporâneo
              </h3>
              
              <ul style={{ listStyle: "none", padding: 0, fontSize: "1rem", color: "#444" }}>
                <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "8px" }}>✓</span>
                  <span>Descubra seu estilo em 7 passos simples</span>
                </li>
                <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "8px" }}>✓</span>
                  <span>Paleta de cores personalizada</span>
                </li>
                <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "8px" }}>✓</span>
                  <span>Modelagens que valorizam seu corpo</span>
                </li>
                <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#BFA46F", marginRight: "8px" }}>✓</span>
                  <span>Combinações infalíveis para qualquer ocasião</span>
                </li>
              </ul>
              
              <div style={{ textAlign: "center", marginTop: "15px", fontSize: "1.1rem", color: "#666" }}>
                Valor: <span style={{ textDecoration: "line-through" }}>R$ 397,00</span>
              </div>
            </div>

            {/* Bônus 1 */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "30px", border: "2px solid #BFA46F", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "20px", background: "#d32f2f", color: "#fff", padding: "8px 20px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700" }}>
                BÔNUS #1
              </div>
              
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp" alt="Guia Peças-Chave" style={{ width: "120px", borderRadius: "10px" }} />
              </div>
              
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#d32f2f", marginBottom: "15px", textAlign: "center" }}>
                Guia das 12 Peças Estratégicas
              </h3>
              
              <p style={{ fontSize: "0.95rem", color: "#444", textAlign: "center", marginBottom: "15px" }}>
                As únicas 12 peças que você precisa ter no guarda-roupa para criar looks infinitos e nunca mais ficar sem roupa.
              </p>
              
              <div style={{ textAlign: "center", fontSize: "1rem", color: "#666" }}>
                Valor: <span style={{ textDecoration: "line-through" }}>R$ 297,00</span>
              </div>
            </div>

            {/* Bônus 2 */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "30px", border: "2px solid #BFA46F", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "20px", background: "#d32f2f", color: "#fff", padding: "8px 20px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700" }}>
                BÔNUS #2
              </div>
              
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp" alt="Manual Visagismo" style={{ width: "120px", borderRadius: "10px" }} />
              </div>
              
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#d32f2f", marginBottom: "15px", textAlign: "center" }}>
                Manual de Visagismo Facial
              </h3>
              
              <p style={{ fontSize: "0.95rem", color: "#444", textAlign: "center", marginBottom: "15px" }}>
                Descubra os cortes, penteados e acessórios ideais para o formato do seu rosto e realce sua beleza natural.
              </p>
              
              <div style={{ textAlign: "center", fontSize: "1rem", color: "#666" }}>
                Valor: <span style={{ textDecoration: "line-through" }}>R$ 203,00</span>
              </div>
            </div>
          </div>

          {/* Por que tão barato? */}
          <div style={{ background: "linear-gradient(45deg, #f8f5f2, #fff)", padding: "30px", borderRadius: "20px", marginBottom: "30px", border: "2px solid #BFA46F" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#222", marginBottom: "20px", textAlign: "center" }}>
              "Gisele, Por Que Está Tão Barato?"
            </h3>
            
            <p style={{ fontSize: "1.1rem", color: "#444", textAlign: "center", marginBottom: "15px" }}>
              Simples: <strong>Eu quero que TODA mulher tenha acesso a esse conhecimento.</strong>
            </p>
            
            <p style={{ fontSize: "1rem", color: "#444", textAlign: "center", marginBottom: "15px" }}>
              Uma única consultoria presencial comigo custa R$ 890,00. Mas criei este guia para democratizar o conhecimento e ajudar milhares de mulheres ao mesmo tempo.
            </p>
            
            <p style={{ fontSize: "1rem", color: "#444", textAlign: "center", fontWeight: "600" }}>
              Este preço promocional é para as <span style={{ color: "#d32f2f" }}>primeiras 500 mulheres</span> que tiverem coragem de se transformar hoje.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PREÇO PRINCIPAL */}
      <section style={{ background: "#222", padding: "50px 0", color: "#fff" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <div style={{ background: "linear-gradient(45deg, #BFA46F, #d4b87a)", padding: "40px", borderRadius: "25px", border: "4px solid #fff" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "20px", color: "#fff" }}>
              🔥 OFERTA ESPECIAL - LIMITADA
            </h3>
            
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "10px", textDecoration: "line-through", opacity: "0.8" }}>
                Valor normal: R$ 897,00
              </p>
              <p style={{ fontSize: "3rem", fontWeight: "900", margin: "0", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                R$ 39,90
              </p>
              <p style={{ fontSize: "1.2rem", fontWeight: "700", margin: "10px 0" }}>
                ou 5x de R$ 8,83 sem juros
              </p>
            </div>
            
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px", borderRadius: "15px", marginBottom: "25px" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0" }}>
                💰 Economia de R$ 857,10 (95% OFF)
              </p>
            </div>
            
            <div style={{ marginBottom: "25px" }}>
              <CountdownTimer 
                initialHours={2} 
                initialMinutes={47} 
                initialSeconds={33}
                className="justify-center"
              />
            </div>
            
            <a
              href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
              onClick={() => handleCTAClick("main-offer")}
              style={{
                display: "inline-block",
                background: "#fff",
                color: "#BFA46F",
                fontWeight: "900",
                fontSize: "1.3rem",
                padding: "20px 40px",
                borderRadius: "50px",
                textDecoration: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                border: "3px solid #fff",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
              }}
            >
              🛒 GARANTIR MINHA VAGA AGORA
            </a>
            
            <p style={{ fontSize: "0.9rem", marginTop: "15px", opacity: "0.9" }}>
              ✅ Acesso imediato por email<br />
              ✅ Garantia incondicional de 7 dias<br />
              ✅ Pagamento 100% seguro
            </p>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS DETALHADOS */}
      <section style={{ background: "#faf9f6", padding: "60px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "800", marginBottom: "50px", color: "#222" }}>
            O Que Dizem as +3.000 Mulheres Que Já Se Transformaram
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            {/* Depoimento 1 */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "2px solid #BFA46F" }}>
              <div style={{ display: "flex", marginBottom: "15px" }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#FFD700", fontSize: "1.2rem" }}>⭐</span>
                ))}
              </div>
              
              <p style={{ fontSize: "1.1rem", color: "#444", fontStyle: "italic", marginBottom: "20px", lineHeight: "1.6" }}>
                "Gente, eu não acreditava que ia funcionar tão rápido! Em 3 dias seguindo o método da Gisele, recebi 2 elogios no trabalho. Meu chefe até perguntou se eu tinha mudado alguma coisa porque estava 'radiante'. Pela primeira vez em anos me sinto EU mesma!"
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/adriana-antes-depois.webp" 
                  alt="Adriana S." 
                  style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: "700", color: "#BFA46F", fontSize: "1.1rem" }}>Adriana S.</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>Executiva, 34 anos</div>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "2px solid #BFA46F" }}>
              <div style={{ display: "flex", marginBottom: "15px" }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#FFD700", fontSize: "1.2rem" }}>⭐</span>
                ))}
              </div>
              
              <p style={{ fontSize: "1.1rem", color: "#444", fontStyle: "italic", marginBottom: "20px", lineHeight: "1.6" }}>
                "Chorei quando vi a diferença! Eram as MESMAS roupas, mas seguindo as dicas de combinação e cores do guia, parecia que eu tinha um guarda-roupa novo. Economizei mais de R$ 2.000 que ia gastar em roupas novas. Melhor investimento da minha vida!"
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/mariangela-antes-depois.webp" 
                  alt="Mariangela M." 
                  style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: "700", color: "#BFA46F", fontSize: "1.1rem" }}>Mariangela M.</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>Empresária, 42 anos</div>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "2px solid #BFA46F" }}>
              <div style={{ display: "flex", marginBottom: "15px" }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#FFD700", fontSize: "1.2rem" }}>⭐</span>
                ))}
              </div>
              
              <p style={{ fontSize: "1.1rem", color: "#444", fontStyle: "italic", marginBottom: "20px", lineHeight: "1.6" }}>
                "Minha autoestima estava no chão depois da gravidez. Nada ficava bem, me sentia feia e sem graça. O método da Gisele me ensinou a trabalhar com meu novo corpo e hoje me sinto mais poderosa que antes! Meu marido não para de elogiar 💕"
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#BFA46F", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "1.2rem" }}>
                  CF
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#BFA46F", fontSize: "1.1rem" }}>Carla F.</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>Mãe e Designer, 29 anos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ PARA QUEBRAR OBJEÇÕES */}
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "800", marginBottom: "40px", color: "#222" }}>
            Perguntas Frequentes (Suas Dúvidas Respondidas)
          </h2>
          
          <div style={{ space: "20px" }}>
            {faqData.map((faq, index) => (
              <div key={index} style={{ background: "#f8f5f2", borderRadius: "15px", marginBottom: "15px", overflow: "hidden", border: "2px solid #BFA46F" }}>
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: "100%",
                    padding: "20px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "#222",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {faq.question}
                  <span style={{ fontSize: "1.5rem", color: "#BFA46F" }}>
                    {faqOpen === index ? "−" : "+"}
                  </span>
                </button>
                
                {faqOpen === index && (
                  <div style={{ padding: "0 20px 20px 20px", fontSize: "1rem", color: "#444", lineHeight: "1.6" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA VISUAL */}
      <section style={{ background: "#f8f5f2", padding: "50px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ background: "#fff", borderRadius: "25px", padding: "40px", textAlign: "center", border: "3px solid #4CAF50", boxShadow: "0 10px 30px rgba(76, 175, 80, 0.2)" }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛡️</div>
            
            <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#4CAF50", marginBottom: "20px" }}>
              Garantia Total de 7 Dias
            </h3>
            
            <p style={{ fontSize: "1.2rem", color: "#444", marginBottom: "20px", lineHeight: "1.6" }}>
              Teste o método completo por <strong>7 dias</strong>. Se não ficar 100% satisfeita com os resultados, devolvemos todo seu dinheiro na hora.
            </p>
            
            <p style={{ fontSize: "1.1rem", color: "#666", fontWeight: "600" }}>
              Sem perguntas. Sem burocracia. Simples assim.
            </p>
            
            <div style={{ background: "#4CAF50", color: "#fff", padding: "15px", borderRadius: "10px", marginTop: "20px" }}>
              <p style={{ fontSize: "1rem", fontWeight: "700", margin: 0 }}>
                ✅ Risco ZERO para você • ✅ Satisfação garantida • ✅ Reembolso imediato
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "linear-gradient(135deg, #BFA46F 0%, #d4b87a 100%)", padding: "60px 0", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            ⏰ Não Deixe Esta Oportunidade Passar!
          </h2>
          
          <p style={{ fontSize: "1.3rem", marginBottom: "25px", fontWeight: "600" }}>
            Enquanto você pensa, <strong>outras mulheres estão se transformando</strong> agora mesmo.
          </p>
          
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>
              Este preço especial de R$ 39,90 é válido apenas por:
            </p>
            <div style={{ marginTop: "15px" }}>
              <CountdownTimer 
                initialHours={2} 
                initialMinutes={47} 
                initialSeconds={33}
                className="justify-center"
              />
            </div>
          </div>
          
          <a
            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
            onClick={() => handleCTAClick("final")}
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#BFA46F",
              fontWeight: "900",
              fontSize: "1.4rem",
              padding: "25px 50px",
              borderRadius: "50px",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              border: "4px solid #fff",
              marginBottom: "20px",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
            }}
          >
            🔥 SIM! QUERO MINHA TRANSFORMAÇÃO AGORA
          </a>
          
          <p style={{ fontSize: "1rem", opacity: "0.9", marginTop: "15px" }}>
            ✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ Suporte total
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#222", color: "#fff", textAlign: "center", padding: "30px 0", fontSize: "0.9rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <p style={{ marginBottom: "15px" }}>
            © {new Date().getFullYear()} Gisele Galvão | Todos os direitos reservados.
          </p>
          <p style={{ fontSize: "0.8rem", opacity: "0.8" }}>
            Este site não é afiliado ao Facebook, Google ou Hotmart.<br />
            Resultados podem variar de pessoa para pessoa.
          </p>
        </div>
      </footer>
    </div>
  );
}
