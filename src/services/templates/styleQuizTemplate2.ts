
export const styleQuizTemplate2 = {
  id: 'style-quiz-template-2',
  name: 'Quiz de Estilo Avançado',
  description: 'Template avançado para descoberta de estilo pessoal com mais opções',
  questions: [
    {
      id: 'q1',
      text: 'Como você se sente mais confiante?',
      type: 'multiple-choice',
      options: [
        { id: 'o1', text: 'Com roupas que destacam minha silhueta', value: 'sexy' },
        { id: 'o2', text: 'Com peças clássicas e bem cortadas', value: 'classico' },
        { id: 'o3', text: 'Com looks criativos e únicos', value: 'criativo' },
        { id: 'o4', text: 'Com roupas confortáveis e naturais', value: 'natural' },
        { id: 'o5', text: 'Com peças românticas e femininas', value: 'romantico' },
        { id: 'o6', text: 'Com looks modernos e estruturados', value: 'contemporaneo' },
        { id: 'o7', text: 'Com roupas elegantes e sofisticadas', value: 'elegante' },
        { id: 'o8', text: 'Com peças marcantes e dramáticas', value: 'dramatico' }
      ]
    },
    {
      id: 'q2',
      text: 'Qual dessas cores você mais usa?',
      type: 'multiple-choice',
      options: [
        { id: 'o9', text: 'Tons terrosos e naturais', value: 'natural' },
        { id: 'o10', text: 'Preto, branco e cinza', value: 'classico' },
        { id: 'o11', text: 'Cores vibrantes e ousadas', value: 'criativo' },
        { id: 'o12', text: 'Tons pastéis e suaves', value: 'romantico' },
        { id: 'o13', text: 'Cores neutras modernas', value: 'contemporaneo' },
        { id: 'o14', text: 'Cores que destacam', value: 'sexy' },
        { id: 'o15', text: 'Tons escuros e intensos', value: 'dramatico' },
        { id: 'o16', text: 'Cores clássicas refinadas', value: 'elegante' }
      ]
    },
    {
      id: 'q3',
      text: 'Qual acessório você nunca deixa de usar?',
      type: 'multiple-choice',
      options: [
        { id: 'o17', text: 'Joias delicadas', value: 'romantico' },
        { id: 'o18', text: 'Peças statement', value: 'dramatico' },
        { id: 'o19', text: 'Acessórios minimalistas', value: 'contemporaneo' },
        { id: 'o20', text: 'Joias clássicas', value: 'elegante' },
        { id: 'o21', text: 'Acessórios únicos', value: 'criativo' },
        { id: 'o22', text: 'Peças naturais', value: 'natural' },
        { id: 'o23', text: 'Acessórios atemporais', value: 'classico' },
        { id: 'o24', text: 'Joias que chamam atenção', value: 'sexy' }
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
      description: 'Você valoriza autenticidade e simplicidade',
      characteristics: ['Autenticidade', 'Simplicidade', 'Conforto', 'Sustentabilidade']
    },
    {
      id: 'classico',
      name: 'Clássico',
      description: 'Seu estilo é atemporal e sempre apropriado',
      characteristics: ['Atemporalidade', 'Elegância', 'Qualidade', 'Tradição']
    },
    {
      id: 'contemporaneo',
      name: 'Contemporâneo',
      description: 'Você está sempre em sintonia com as tendências atuais',
      characteristics: ['Modernidade', 'Inovação', 'Minimalismo', 'Funcionalidade']
    },
    {
      id: 'elegante',
      name: 'Elegante',
      description: 'Sofisticação e refinamento definem seu estilo',
      characteristics: ['Sofisticação', 'Refinamento', 'Luxo', 'Distinção']
    },
    {
      id: 'romantico',
      name: 'Romântico',
      description: 'Você ama feminilidade e delicadeza',
      characteristics: ['Feminilidade', 'Delicadeza', 'Romantismo', 'Suavidade']
    },
    {
      id: 'sexy',
      name: 'Sexy',
      description: 'Confiança e sensualidade são suas marcas',
      characteristics: ['Confiança', 'Sensualidade', 'Ousadia', 'Magnetismo']
    },
    {
      id: 'dramatico',
      name: 'Dramático',
      description: 'Você gosta de causar impacto e ser notada',
      characteristics: ['Impacto', 'Intensidade', 'Ousadia', 'Dramaticidade']
    },
    {
      id: 'criativo',
      name: 'Criativo',
      description: 'Originalidade e expressão pessoal são fundamentais',
      characteristics: ['Originalidade', 'Criatividade', 'Expressão', 'Individualidade']
    }
  ]
};
