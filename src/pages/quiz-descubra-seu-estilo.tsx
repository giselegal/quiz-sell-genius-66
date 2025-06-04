import React from "react";

export default function QuizDescubraSeuEstilo() {
  return (
    <div style={{ background: "#fff", fontFamily: "Montserrat, Arial, sans-serif", color: "#222" }}>
      {/* Hero Section */}
      <section style={{ padding: "40px 0 24px 0", textAlign: "center", background: "#f7f7f7" }}>
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Gisele Galvão"
          style={{ maxWidth: 180, marginBottom: 24 }}
        />
        <h1 style={{ fontSize: "2.2rem", fontWeight: 700, margin: "0 0 12px 0" }}>
          Descubra Seu Estilo Único em 5 Minutos
        </h1>
        <p style={{ fontSize: "1.15rem", maxWidth: 480, margin: "0 auto 18px auto" }}>
          Um método rápido, prático e validado por mais de 3.000 mulheres para você se sentir confiante e autêntica todos os dias.
        </p>
        <a
          href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
          style={{
            display: "inline-block",
            background: "#BFA46F",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.1rem",
            padding: "16px 36px",
            borderRadius: 32,
            marginTop: 18,
            textDecoration: "none",
            boxShadow: "0 4px 16px #bfa46f33",
            transition: "background 0.2s"
          }}
        >
          QUERO DESCOBRIR MEU ESTILO
        </a>
      </section>

      {/* Prova Social */}
      <section style={{ background: "#fff", textAlign: "center", padding: "18px 0 0 0" }}>
        <span style={{
          display: "inline-block",
          background: "#BFA46F",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 16,
          padding: "6px 18px",
          fontSize: "1rem",
          marginBottom: 8
        }}>
          +3.000 mulheres já transformaram seu estilo
        </span>
      </section>

      {/* Problemas */}
      <section style={{ padding: "36px 0 0 0", background: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>
            Você se identifica com algum desses cenários?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px 0", color: "#444" }}>
            <li style={{ marginBottom: 8 }}>• Sente que suas roupas não refletem quem você é?</li>
            <li style={{ marginBottom: 8 }}>• Perde tempo e energia escolhendo o que vestir?</li>
            <li style={{ marginBottom: 8 }}>• Tem dificuldade para combinar peças e acessórios?</li>
            <li style={{ marginBottom: 8 }}>• Quer se sentir mais confiante e autêntica todos os dias?</li>
          </ul>
          <p style={{ fontWeight: 500, color: "#BFA46F" }}>
            Você não está sozinha. E existe um caminho prático para mudar isso!
          </p>
        </div>
      </section>

      {/* O que você recebe */}
      <section style={{ background: "#f7f7f7", padding: "40px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginBottom: 32 }}>
            O que você recebe hoje:
          </h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center"
          }}>
            {/* Produto principal */}
            <div style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px"
            }}>
              <div style={{ fontWeight: 700, color: "#BFA46F", marginBottom: 8 }}>
                Manual de Estilo Contemporâneo
              </div>
              <div style={{ fontSize: "1rem", marginBottom: 8 }}>
                Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.
              </div>
              <div style={{ fontSize: "0.95rem", color: "#888" }}>
                Valor individual: <span style={{ color: "#BFA46F", fontWeight: 600 }}>R$ 77,00</span>
              </div>
            </div>
            {/* Bônus 1 */}
            <div style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px"
            }}>
              <div style={{
                fontWeight: 700,
                color: "#BFA46F",
                marginBottom: 8,
                letterSpacing: 1
              }}>
                BÔNUS EXCLUSIVO
              </div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Guia das Peças Estratégicas
              </div>
              <div style={{ fontSize: "1rem", marginBottom: 8 }}>
                Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.
              </div>
              <div style={{ fontSize: "0.95rem", color: "#888" }}>
                Valor individual: <span style={{ color: "#BFA46F", fontWeight: 600 }}>R$ 59,00</span>
              </div>
            </div>
            {/* Bônus 2 */}
            <div style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px"
            }}>
              <div style={{
                fontWeight: 700,
                color: "#BFA46F",
                marginBottom: 8,
                letterSpacing: 1
              }}>
                BÔNUS PREMIUM
              </div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Manual de Visagismo
              </div>
              <div style={{ fontSize: "1rem", marginBottom: 8 }}>
                Descubra os cortes ideais para seu rosto e realce sua beleza natural.
              </div>
              <div style={{ fontSize: "0.95rem", color: "#888" }}>
                Valor individual: <span style={{ color: "#BFA46F", fontWeight: 600 }}>R$ 39,00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section style={{ background: "#fff", padding: "40px 0" }}>
        <div style={{
          maxWidth: 480,
          margin: "0 auto",
          background: "#f7f7f7",
          borderRadius: 18,
          boxShadow: "0 2px 12px #0001",
          padding: 32,
          textAlign: "center"
        }}>
          <div style={{
            fontWeight: 700,
            color: "#BFA46F",
            fontSize: "1.2rem",
            marginBottom: 12
          }}>
            Oferta Especial Por Tempo Limitado
          </div>
          <div style={{ fontSize: "1.1rem", marginBottom: 16 }}>
            Valor total dos produtos: <span style={{ textDecoration: "line-through", color: "#888" }}>R$ 175,00</span>
          </div>
          <div style={{
            fontSize: "2.1rem",
            fontWeight: 800,
            color: "#BFA46F",
            marginBottom: 8
          }}>
            R$ 39,90
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8 }}>
            ou 5x de R$ 8,83
          </div>
          <div style={{
            fontSize: "1rem",
            color: "#388e3c",
            fontWeight: 600,
            marginBottom: 12
          }}>
            Economia de R$ 135,10 <span style={{ color: "#BFA46F" }}>(77% OFF)</span>
          </div>
          <div style={{
            fontSize: "0.95rem",
            color: "#b71c1c",
            fontWeight: 600,
            marginBottom: 18
          }}>
            Esta oferta expira quando você sair desta página!
          </div>
          <a
            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
            style={{
              display: "inline-block",
              background: "#BFA46F",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              padding: "16px 36px",
              borderRadius: 32,
              marginTop: 8,
              textDecoration: "none",
              boxShadow: "0 4px 16px #bfa46f33",
              transition: "background 0.2s"
            }}
          >
            GARANTIR MINHA TRANSFORMAÇÃO AGORA
          </a>
        </div>
      </section>

      {/* Depoimentos */}
      <section style={{ background: "#f7f7f7", padding: "40px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginBottom: 32 }}>
            Veja a transformação de quem já passou pelo método:
          </h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center"
          }}>
            {/* Exemplo de depoimento */}
            <div style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px"
            }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Adriana S.
              </div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/adriana-antes-depois.webp"
                alt="Antes e depois Adriana"
                style={{ width: "100%", borderRadius: 12, marginBottom: 12 }}
              />
              <div style={{ fontSize: "0.98rem", color: "#444" }}>
                “Nunca imaginei que pequenas mudanças no meu estilo fariam tanta diferença. Hoje me sinto muito mais confiante!”
              </div>
            </div>
            <div style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              minWidth: 260,
              maxWidth: 320,
              flex: "1 1 260px"
            }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Mariangela M.
              </div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/mariangela-antes-depois.webp"
                alt="Antes e depois Mariangela"
                style={{ width: "100%", borderRadius: 12, marginBottom: 12 }}
              />
              <div style={{ fontSize: "0.98rem", color: "#444" }}>
                “O método da Gisele me ajudou a enxergar meu guarda-roupa com outros olhos. Recomendo para todas!”
              </div>
            </div>
            {/* Adicione mais depoimentos conforme necessário */}
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section style={{ background: "#fff", padding: "40px 0" }}>
        <div style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#f7f7f7",
          borderRadius: 18,
          boxShadow: "0 2px 12px #0001",
          padding: 32,
          textAlign: "center"
        }}>
          <div style={{
            fontWeight: 700,
            color: "#BFA46F",
            fontSize: "1.2rem",
            marginBottom: 12
          }}>
            Garantia Incondicional de 7 Dias
          </div>
          <div style={{ fontSize: "1.05rem", color: "#444", marginBottom: 12 }}>
            Se você não amar o conteúdo, basta enviar um e-mail em até 7 dias e devolvemos 100% do seu dinheiro. Simples assim, sem perguntas!
          </div>
          <img
            src="https://placehold.co/120x120/fff/222?text=SELO+GARANTIA"
            alt="Selo de Garantia"
            style={{ margin: "0 auto", display: "block", borderRadius: "50%", marginTop: 12 }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "24px 0",
        fontSize: "0.95rem"
      }}>
        <div>
          © {new Date().getFullYear()} Gisele Galvão | Todos os direitos reservados.<br />
          Este site não é afiliado ao Facebook, Google ou Hotmart.
        </div>
      </footer>
    </div>
  );
}