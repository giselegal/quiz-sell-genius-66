
// src/utils/builderModels.ts
import { builder } from '@builder.io/react';

// Configuração dos modelos Builder.io para as páginas A/B
export const builderModels = {
  RESULTADO_PAGE: 'resultado-page',
  QUIZ_OFFER_PAGE: 'quiz-offer-page'
} as const;

// Função para verificar se os modelos existem
export const checkBuilderModels = async () => {
  try {
    const resultModel = await builder.get(builderModels.RESULTADO_PAGE).promise();
    const quizOfferModel = await builder.get(builderModels.QUIZ_OFFER_PAGE).promise();

    return {
      resultModelExists: !!resultModel,
      quizOfferModelExists: !!quizOfferModel,
      bothExist: !!resultModel && !!quizOfferModel
    };
  } catch (error) {
    console.warn('Erro ao verificar modelos Builder.io:', error);
    return {
      resultModelExists: false,
      quizOfferModelExists: false,
      bothExist: false
    };
  }
};

// Função para buscar conteúdo de um modelo específico
export const getBuilderContent = async (modelName: string, options: any = {}) => {
  try {
    const content = await builder
      .get(modelName, options)
      .promise();
    
    return content;
  } catch (error) {
    console.warn(`Erro ao buscar conteúdo do modelo ${modelName}:`, error);
    return null;
  }
};

// Função simplificada para "criar" modelos (na verdade, apenas log informativo)
export const createBuilderModels = async () => {
  console.log('ℹ️  Para criar modelos no Builder.io:');
  console.log('1. Acesse https://builder.io/content');
  console.log('2. Clique em "Create" e selecione "Model"');
  console.log('3. Configure os modelos:', builderModels);
  console.log('4. Use os nomes exatos dos modelos listados acima');
  
  // Retornar true para compatibilidade com o código existente
  return true;
};
