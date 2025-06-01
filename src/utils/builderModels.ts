
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
