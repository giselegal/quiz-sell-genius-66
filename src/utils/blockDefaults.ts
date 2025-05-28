
export const blockDefaults = {
  header: {
    title: 'Título Principal',
    subtitle: 'Subtítulo do cabeçalho',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    alignment: 'center',
    fontSize: 'large'
  },

  text: {
    content: 'Digite seu texto aqui...',
    fontSize: 'medium',
    textColor: '#333333',
    alignment: 'left',
    backgroundColor: 'transparent'
  },

  image: {
    src: '',
    alt: 'Imagem',
    width: '100%',
    height: 'auto',
    alignment: 'center',
    caption: ''
  },

  cta: {
    text: 'Clique Aqui',
    url: '#',
    backgroundColor: '#007bff',
    textColor: '#ffffff',
    size: 'medium',
    alignment: 'center'
  },

  testimonial: {
    quote: 'Depoimento do cliente...',
    author: 'Nome do Cliente',
    position: 'Cargo',
    avatar: '',
    rating: 5
  },

  pricing: {
    title: 'Plano Premium',
    price: 'R$ 97',
    originalPrice: 'R$ 197',
    features: ['Recurso 1', 'Recurso 2', 'Recurso 3'],
    buttonText: 'Comprar Agora',
    buttonUrl: '#'
  },

  guarantee: {
    title: 'Garantia de 30 Dias',
    description: 'Se não ficar satisfeito, devolvemos seu dinheiro.',
    icon: 'shield'
  }
};
