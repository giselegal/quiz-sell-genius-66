// Script para criar dados mock no localStorage para testar a página de resultados
const mockData = {
  primaryStyle: {
    category: 'Natural',
    percentage: 45,
    description: 'Você tem um estilo natural e descontraído, preferindo looks confortáveis e autênticos.',
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071344/GUIA_NATURAL_fzp6fc.webp'
  },
  secondaryStyles: [
    {
      category: 'Clássico',
      percentage: 30,
      description: 'Elementos clássicos também fazem parte do seu estilo.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071343/GUIA_CLÁSSICO_ux1yhf.webp'
    },
    {
      category: 'Contemporâneo',
      percentage: 25,
      description: 'Você aprecia toques modernos e contemporâneos.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071343/GUIA_CONTEMPORÂNEO_j4s9lk.webp'
    }
  ]
};

// Salvar no localStorage
localStorage.setItem('quizResult', JSON.stringify(mockData));
localStorage.setItem('strategicAnswers', JSON.stringify({
  'favoriteColors': ['Natural'],
  'bodyType': ['Natural'],
  'lifestyle': ['Natural']
}));

console.log('Dados mock criados com sucesso!');
console.log('Navegue para http://localhost:8081/resultado para testar as imagens');
