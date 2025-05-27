
export const giseleStyleTemplate = {
  styleType: "Natural",
  header: {
    visible: true,
    content: {
      title: "Olá, seu estilo predominante é:",
      subtitle: ""
    },
    style: {
      textAlign: "center",
      margin: "0 0 2rem 0",
      backgroundColor: "#fffaf7",
      padding: "40px 20px",
      fontSize: "16px",
      borderRadius: "8px"
    }
  },
  mainContent: {
    visible: true,
    content: {
      title: "NATURAL",
      description: "Você valoriza o conforto e a praticidade. seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia."
    },
    style: {
      borderRadius: "8px",
      fontSize: "16px"
    }
  },
  secondaryStyles: {
    content: {},
    margin: "1.5rem 0 0 0"
  },
  offer: {
    hero: {
      visible: true,
      content: {
        title: "Você descobriu seu estilo",
        subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
        price: "39,00",
        regularPrice: "175,00",
        ctaText: "Quero meu guia + bônus",
        ctaUrl: "Https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912"
      },
      style: {
        backgroundColor: "#fffaf7",
        padding: "40px 20px",
        borderRadius: "8px",
        margin: "2rem 0 0 0",
        textAlign: "center",
        fontSize: "16px"
      }
    },
    products: {
      title: "O que você vai receber:"
            },
    pricing: {
      ctaUrl: "Https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912",
      urgencyText: "Oferta por tempo limitado!"
    },
    benefits: {
      title: "Benefícios",
      items: [
        "Descubra seu estilo com precisão",
        "Aprenda a criar looks autênticos",
        "Economize tempo e dinheiro",
        "Ganhe confiança na sua imagem"
      ]
    }
  },
  testimonials: {
    visible: true,
    content: {
      title: "O que estão dizendo"
    }
  },
  guarantee: {
    visible: true,
    content: {
      title: "Garantia de 7 dias",
      text: "Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia."
    }
  },
  primaryColor: "#B89B7A",
  secondaryColor: "#432818",
  textColor: "#1A1818",
  backgroundColor: "#fffaf7",
  fontFamily: "Playfair Display",
  blocks: [
    {
      id: "header-1",
      type: "header",
      content: {
        title: "Seu estilo foi revelado. Agora é hora da transformação.",
        subtitle: "Você acabou de dar um passo essencial: descobrir o seu estilo predominante."
      },
      order: 0
    },
    {
      id: "hero-1",
      type: "hero-section",
      content: {
        title: "VOCÊ DESCOBRIU SEU ESTILO",
        heroImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
        heroImage2: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
      },
      order: 1
    },
    {
      id: "benefits-1",
      type: "benefits",
      content: {
        title: "O que você vai aprender:",
        items: [
          "Aplicar seus estilos com autenticidade",
          "Montar looks práticos para o dia a dia",
          "Usar cores e modelagens que valorizam quem você é",
          "Parar de errar nas compras"
        ]
      },
      order: 2
    },
    {
      id: "products-1",
      type: "products",
      content: {
        title: "O que você vai receber:",
        images: [
          {
            url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp",
            alt: "Guia de Estilo - 3 Revistas"
          },
          {
            url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp",
            alt: "Todos os produtos e bônus"
          }
        ]
      },
      order: 3
    },
    {
      id: "pricing-1",
      type: "pricing",
      content: {
        salePrice: "39,00",
        buttonText: "Quero meu guia + bônus",
        ctaUrl: "https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912"
      },
      order: 4
    },
    {
      id: "guarantee-1",
      type: "guarantee",
      content: {
        text: "Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.",
        image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
      },
      order: 5
    }
  ]
};
