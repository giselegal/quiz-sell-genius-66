
export const styleQuizTemplate = {
  id: 'style-quiz-template',
  name: 'Quiz de Estilo',
  description: 'Template para quiz de descoberta de estilo pessoal',
  questions: [
    {
      id: 'q1',
      text: 'Qual dessas peças você usaria em um encontro especial?',
      type: 'multiple-choice',
      options: [
        { id: 'o1', text: 'Vestido clássico preto', value: 'classico', image: '/images/dress-classic.jpg' },
        { id: 'o2', text: 'Look moderno e estruturado', value: 'moderno', image: '/images/look-modern.jpg' },
        { id: 'o3', text: 'Peças fluidas e naturais', value: 'natural', image: '/images/look-natural.jpg' },
        { id: 'o4', text: 'Conjunto elegante e sofisticado', value: 'elegante', image: '/images/look-elegant.jpg' }
      ]
    },
    {
      id: 'q2',
      text: 'Qual ambiente reflete melhor sua personalidade?',
      type: 'multiple-choice',
      options: [
        { id: 'o5', text: 'Casa aconchegante com elementos naturais', value: 'natural' },
        { id: 'o6', text: 'Apartamento moderno e minimalista', value: 'moderno' },
        { id: 'o7', text: 'Espaço clássico e atemporal', value: 'classico' },
        { id: 'o8', text: 'Ambiente sofisticado e luxuoso', value: 'elegante' }
      ]
    }
  ],
  styles: {
    primaryColor: '#B89B7A',
    secondaryColor: '#432818',
    backgroundColor: '#FAF9F7',
    textColor: '#432818',
    fontFamily: 'Playfair Display, serif'
  },
  results: [
    {
      id: 'natural',
      name: 'Natural',
      description: 'Você tem um estilo autêntico e conectado com a natureza',
      characteristics: ['Autenticidade', 'Simplicidade', 'Conforto', 'Naturalidade']
    },
    {
      id: 'classico',
      name: 'Clássico',
      description: 'Seu estilo é atemporal e sempre elegante',
      characteristics: ['Atemporalidade', 'Elegância', 'Sofisticação', 'Tradição']
    }
  ]
};
