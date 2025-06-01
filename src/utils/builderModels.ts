// src/utils/builderModels.ts
import { builder } from '@builder.io/react';

// Configuração dos modelos Builder.io para as páginas A/B
export const builderModels = {
  RESULTADO_PAGE: 'resultado-page',
  QUIZ_OFFER_PAGE: 'quiz-offer-page'
} as const;

// Função para criar modelos no Builder.io programaticamente
export const createBuilderModels = async () => {
  try {
    // Modelo para página de resultado
    await builder.create('model', {
      name: builderModels.RESULTADO_PAGE,
      kind: 'page',
      description: 'Página de resultados do quiz - editável no Builder.io',
      fields: [
        {
          name: 'title',
          type: 'string',
          defaultValue: 'Seu Resultado do Quiz',
          helperText: 'Título principal da página'
        },
        {
          name: 'subtitle',
          type: 'string',
          defaultValue: 'Descobra seu estilo único',
          helperText: 'Subtítulo da página'
        },
        {
          name: 'showOriginalContent',
          type: 'boolean',
          defaultValue: false,
          helperText: 'Mostrar conteúdo original da página em vez da versão Builder.io'
        }
      ],
      defaultStyles: {
        backgroundColor: '#fffaf7',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    });

    // Modelo para página de oferta do quiz
    await builder.create('model', {
      name: builderModels.QUIZ_OFFER_PAGE,
      kind: 'page',
      description: 'Página de oferta do quiz - editável no Builder.io',
      fields: [
        {
          name: 'heroTitle',
          type: 'string',
          defaultValue: 'Descubra Seu Estilo Único',
          helperText: 'Título principal da seção hero'
        },
        {
          name: 'heroSubtitle',
          type: 'string',
          defaultValue: 'Faça nosso quiz personalizado',
          helperText: 'Subtítulo da seção hero'
        },
        {
          name: 'ctaText',
          type: 'string',
          defaultValue: 'Começar Quiz',
          helperText: 'Texto do botão de chamada para ação'
        },
        {
          name: 'showOriginalContent',
          type: 'boolean',
          defaultValue: false,
          helperText: 'Mostrar conteúdo original da página em vez da versão Builder.io'
        }
      ],
      defaultStyles: {
        background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F2EE 50%, #F0EBE5 100%)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    });

    console.log('Modelos Builder.io criados com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao criar modelos Builder.io:', error);
    return false;
  }
};

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
