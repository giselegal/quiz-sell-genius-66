import React, { useEffect } from "react";
import { getPixelId, trackFunnelEvent } from "../services/pixelManager";

declare global {
  interface Window {
    fbq?: any;
  }
}

export default function QuizDescubraSeuEstilo() {
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

  return (
    <div
      style={{
        fontFamily: "Montserrat, Arial, sans-serif",
        background: "#faf9f6",
        color: "#222",
      }}
    >
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(120deg, #fff 60%, #bfa46f1a 100%)",
          padding: "48px 0 32px 0",
          textAlign: "center",
        }}
      >
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Gisele Galvão"
          style={{ maxWidth: 160, marginBottom: 18 }}
        />
        <h1
          style={{
            fontSize: "2.3rem",
            fontWeight: 800,
            margin: "0 0 14px 0",
            color: "#222",
          }}
        >
          Descubra o Estilo Que Valoriza Sua Essência
        </h1>
        <p
          style={{
            fontSize: "1.18rem",
            maxWidth: 480,
            margin: "0 auto 22px auto",
            color: "#444",
          }}
        >
          Um método rápido, prático e validado por mais de{" "}
          <span style={{ color: "#BFA46F", fontWeight: 700 }}>
            3.000 mulheres
          </span>{" "}
          para você se sentir confiante e autêntica todos os dias.
        </p>
        <a
          href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
          onClick={() => handleCTAClick("hero")}
          style={{
            display: "inline-block",
            background: "#BFA46F",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.15rem",
            padding: "18px 44px",
            borderRadius: 32,
            marginTop: 10,
            textDecoration: "none",
            boxShadow: "0 4px 16px #bfa46f33",
            letterSpacing: 1,
            transition: "background 0.2s",
          }}
        >
          QUERO DESCOBRIR MEU ESTILO
        </a>
        <div
          style={{
            marginTop: 18,
            fontSize: "0.98rem",
            color: "#888",
          }}
        >
          Oferta exclusiva para esta página
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section
        style={{
          background: "#fff",
          textAlign: "center",
          padding: "18px 0 0 0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#BFA46F",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 16,
            padding: "7px 22px",
            fontSize: "1.05rem",
            marginBottom: 8,
            letterSpacing: 1,
          }}
        >
          +3.000 mulheres já transformaram seu estilo
        </span>
      </section>

      {/* DOR E IDENTIFICAÇÃO */}
      <section style={{ padding: "38px 0 0 0", background: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.45rem",
              fontWeight: 700,
              marginBottom: 14,
              color: "#222",
            }}
          >
            Você se identifica com algum desses cenários?
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 18px 0",
              color: "#444",
              fontSize: "1.08rem",
            }}
          >
            <li style={{ marginBottom: 8 }}>
              • Sente que suas roupas não refletem quem você é?
            </li>
            <li style={{ marginBottom: 8 }}>
              • Perde tempo e energia escolhendo o que vestir?
            </li>
            <li style={{ marginBottom: 8 }}>
              • Tem dificuldade para combinar peças e acessórios?
            </li>
            <li style={{ marginBottom: 8 }}>
              • Quer se sentir mais confiante e autêntica todos os dias?
            </li>
          </ul>
          <p style={{ fontWeight: 600, color: "#BFA46F", marginTop: 10 }}>
            Você não está sozinha. E existe um caminho prático para mudar isso!
          </p>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section style={{ background: "#faf9f6", padding: "48px 0 32px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: 36,
              color: "#222",
            }}
          >
            O que você recebe hoje:
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              justifyContent: "center",
            }}
          >
            {/* Produto principal */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 12px #bfa46f22",
                padding: 28,
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                border: "2px solid #BFA46F",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#BFA46F",
                  marginBottom: 8,
                  fontSize: "1.08rem",
                }}
              >
                Manual de Estilo Contemporâneo
              </div>
              <div style={{ fontSize: "1rem", marginBottom: 8 }}>
                Descubra combinações infalíveis de cores, tecidos e acessórios
                que valorizam sua personalidade única.
              </div>
              <div style={{ fontSize: "0.97rem", color: "#888" }}>
                Valor individual:{" "}
                <span style={{ color: "#BFA46F", fontWeight: 700 }}>
                  R$ 77,00
                </span>
              </div>
            </div>
            {/* Bônus 1 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 12px #bfa46f22",
                padding: 28,
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                border: "2px solid #BFA46F",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#BFA46F",
                  marginBottom: 8,
                  letterSpacing: 1,
                  fontSize: "0.98rem",
                }}
              >
                BÔNUS EXCLUSIVO
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                Guia das Peças Estratégicas
              </div>
              <div style={{ fontSize: "1rem", marginBottom: 8 }}>
                Peças-chave que maximizam combinações e garantem versatilidade
                em qualquer situação.
              </div>
              <div style={{ fontSize: "0.97rem", color: "#888" }}>
                Valor individual:{" "}
                <span style={{ color: "#BFA46F", fontWeight: 700 }}>
                  R$ 59,00
                </span>
              </div>
            </div>
            {/* Bônus 2 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 12px #bfa46f22",
                padding: 28,
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                border: "2px solid #BFA46F",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#BFA46F",
                  marginBottom: 8,
                  letterSpacing: 1,
                  fontSize: "0.98rem",
                }}
              >
                BÔNUS PREMIUM
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                Manual de Visagismo
              </div>
              <div style={{ fontSize: "1rem", marginBottom: 8 }}>
                Descubra os cortes ideais para seu rosto e realce sua beleza
                natural.
              </div>
              <div style={{ fontSize: "0.97rem", color: "#888" }}>
                Valor individual:{" "}
                <span style={{ color: "#BFA46F", fontWeight: 700 }}>
                  R$ 39,00
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section style={{ background: "#fff", padding: "48px 0" }}>
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            background: "#faf9f6",
            borderRadius: 18,
            boxShadow: "0 2px 12px #bfa46f22",
            padding: 36,
            textAlign: "center",
            border: "2px solid #BFA46F",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: "#BFA46F",
              fontSize: "1.25rem",
              marginBottom: 12,
              letterSpacing: 1,
            }}
          >
            Oferta Especial Só Hoje
          </div>
          <div style={{ fontSize: "1.1rem", marginBottom: 16 }}>
            Valor total dos produtos:{" "}
            <span style={{ textDecoration: "line-through", color: "#888" }}>
              R$ 175,00
            </span>
          </div>
          <div
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              color: "#BFA46F",
              marginBottom: 8,
            }}
          >
            R$ 39,90
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>
            ou 5x de R$ 8,83
          </div>
          <div
            style={{
              fontSize: "1.05rem",
              color: "#388e3c",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Economia de R$ 135,10{" "}
            <span style={{ color: "#BFA46F" }}>(77% OFF)</span>
          </div>
          <div
            style={{
              fontSize: "0.98rem",
              color: "#b71c1c",
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            Esta oferta expira quando você sair desta página!
          </div>
          <a
            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
            onClick={() => handleCTAClick("offer")}
            style={{
              display: "inline-block",
              background: "#BFA46F",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.15rem",
              padding: "18px 44px",
              borderRadius: 32,
              marginTop: 8,
              textDecoration: "none",
              boxShadow: "0 4px 16px #bfa46f33",
              letterSpacing: 1,
              transition: "background 0.2s",
            }}
          >
            GARANTIR MINHA TRANSFORMAÇÃO AGORA
          </a>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ background: "#faf9f6", padding: "48px 0 32px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: 36,
              color: "#222",
            }}
          >
            Veja a transformação de quem já passou pelo método:
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              justifyContent: "center",
            }}
          >
            {/* Depoimento 1 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 12px #bfa46f22",
                padding: 24,
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                border: "2px solid #BFA46F",
              }}
            >
              <div
                style={{ fontWeight: 700, marginBottom: 8, color: "#BFA46F" }}
              >
                Adriana S.
              </div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/adriana-antes-depois.webp"
                alt="Antes e depois Adriana"
                style={{ width: "100%", borderRadius: 12, marginBottom: 12 }}
              />
              <div style={{ fontSize: "1.01rem", color: "#444" }}>
                "Nunca imaginei que pequenas mudanças no meu estilo fariam tanta
                diferença. Hoje me sinto muito mais confiante!"
              </div>
            </div>
            {/* Depoimento 2 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 12px #bfa46f22",
                padding: 24,
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                border: "2px solid #BFA46F",
              }}
            >
              <div
                style={{ fontWeight: 700, marginBottom: 8, color: "#BFA46F" }}
              >
                Mariangela M.
              </div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/mariangela-antes-depois.webp"
                alt="Antes e depois Mariangela"
                style={{ width: "100%", borderRadius: 12, marginBottom: 12 }}
              />
              <div style={{ fontSize: "1.01rem", color: "#444" }}>
                "O método da Gisele me ajudou a enxergar meu guarda-roupa com
                outros olhos. Recomendo para todas!"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section style={{ background: "#fff", padding: "48px 0" }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "#faf9f6",
            borderRadius: 18,
            boxShadow: "0 2px 12px #bfa46f22",
            padding: 36,
            textAlign: "center",
            border: "2px solid #BFA46F",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: "#BFA46F",
              fontSize: "1.2rem",
              marginBottom: 12,
            }}
          >
            Garantia Incondicional de 7 Dias
          </div>
          <div style={{ fontSize: "1.08rem", color: "#444", marginBottom: 12 }}>
            Se você não amar o conteúdo, basta enviar um e-mail em até 7 dias e
            devolvemos 100% do seu dinheiro. Simples assim, sem perguntas!
          </div>
          <img
            src="https://placehold.co/120x120/fff/222?text=SELO+GARANTIA"
            alt="Selo de Garantia"
            style={{
              margin: "0 auto",
              display: "block",
              borderRadius: "50%",
              marginTop: 12,
            }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "24px 0",
          fontSize: "0.98rem",
        }}
      >
        <div>
          © {new Date().getFullYear()} Gisele Galvão | Todos os direitos
          reservados.
          <br />
          Este site não é afiliado ao Facebook, Google ou Hotmart.
        </div>
      </footer>
    </div>
  );
}
