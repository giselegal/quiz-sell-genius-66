// Script para executar a inserção das questões estratégicas
import { insertStrategicQuestions } from './src/utils/insertStrategicQuestions.ts';

const runUpdate = async () => {
  console.log('🚀 Iniciando atualização das questões estratégicas...');
  
  try {
    const success = await insertStrategicQuestions();
    
    if (success) {
      console.log('🎉 SUCESSO: Questões estratégicas atualizadas com sucesso!');
    } else {
      console.log('❌ ERRO: Falha ao atualizar questões estratégicas');
    }
  } catch (error) {
    console.error('❌ ERRO CRÍTICO:', error);
  }
};

runUpdate();
