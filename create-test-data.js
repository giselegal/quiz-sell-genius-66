// Script para criar dados de teste no localStorage para a página de resultado

const mockQuizResult = {
  primaryStyle: {
    category: 'Elegante',
    score: 15,
    percentage: 65
  },
  secondaryStyles: [
    {
      category: 'Clássico',
      score: 8,
      percentage: 25
    },
    {
      category: 'Natural',
      score: 4,
      percentage: 10
    }
  ],
  totalSelections: 27,
  userName: 'Usuário Teste',
  timestamp: Date.now()
};

// Para executar no console do navegador:
console.log('Execute no console do navegador:');
console.log(`localStorage.setItem('quizResult', '${JSON.stringify(mockQuizResult)}');`);
console.log('window.location.reload();');

// Para verificar se foi salvo:
console.log('\nPara verificar se foi salvo, execute:');
console.log('JSON.parse(localStorage.getItem("quizResult"));');
