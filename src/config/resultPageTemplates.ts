
export const resultPageTemplates = {
  natural: {
    id: 'natural',
    name: 'Natural',
    description: 'Estilo clean e minimalista',
    blocks: [
      {
        id: 'header-1',
        type: 'header',
        content: {
          title: 'Seu Estilo: Natural',
          subtitle: 'Simplicidade e elegância em perfeita harmonia'
        }
      },
      {
        id: 'style-desc-1',
        type: 'styleDescription',
        content: {
          description: 'Você prefere looks clean, confortáveis e atemporais. Sua beleza natural é o seu maior charme.'
        }
      }
    ]
  },
  classico: {
    id: 'classico',
    name: 'Clássico',
    description: 'Elegância atemporal',
    blocks: [
      {
        id: 'header-2',
        type: 'header',
        content: {
          title: 'Seu Estilo: Clássico',
          subtitle: 'Elegância que nunca sai de moda'
        }
      },
      {
        id: 'style-desc-2',
        type: 'styleDescription',
        content: {
          description: 'Você valoriza peças atemporais e de qualidade. Seu estilo é refinado e sempre apropriado.'
        }
      }
    ]
  }
};
