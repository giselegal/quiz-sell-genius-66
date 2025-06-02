// src/utils/builderModelCreator.ts
import { builder } from '@builder.io/react';

interface ModelTemplate {
  name: string;
  displayName: string;
  description: string;
  content: any;
}

// Templates básicos para os modelos
const modelTemplates: Record<string, ModelTemplate> = {
  'resultado-page': {
    name: 'resultado-page',
    displayName: 'Página de Resultado',
    description: 'Página que exibe os resultados do quiz de estilo',
    content: {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'resultado-template',
      children: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'div',
            options: {
              className: 'min-h-screen bg-[#fffaf7] p-6'
            }
          },
          children: [
            {
              '@type': '@builder.io/sdk:Element',
              component: {
                name: 'div',
                options: {
                  className: 'max-w-4xl mx-auto text-center'
                }
              },
              children: [
                {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                    name: 'h1',
                    options: {
                      className: 'text-4xl font-bold text-[#432818] mb-6',
                      text: 'Seu Resultado de Estilo!'
                    }
                  }
                },
                {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                    name: 'p',
                    options: {
                      className: 'text-lg text-[#8B7355] mb-8',
                      text: 'Descubra seu estilo predominante baseado nas suas respostas'
                    }
                  }
                },
                {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                    name: 'CustomButton',
                    options: {
                      text: 'Ver Meu Estilo',
                      variant: 'default',
                      className: 'bg-[#B89B7A] text-white hover:bg-[#A38A69]'
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  'quiz-offer-page': {
    name: 'quiz-offer-page',
    displayName: 'Página de Oferta do Quiz',
    description: 'Página de apresentação e convite para participar do quiz',
    content: {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'quiz-offer-template',
      children: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'div',
            options: {
              className: 'min-h-screen bg-[#fffaf7] p-6'
            }
          },
          children: [
            {
              '@type': '@builder.io/sdk:Element',
              component: {
                name: 'div',
                options: {
                  className: 'max-w-4xl mx-auto text-center'
                }
              },
              children: [
                {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                    name: 'h1',
                    options: {
                      className: 'text-4xl font-bold text-[#432818] mb-6',
                      text: 'Descubra Seu Estilo com Gisele Galvão'
                    }
                  }
                },
                {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                    name: 'p',
                    options: {
                      className: 'text-lg text-[#8B7355] mb-8',
                      text: 'Faça nosso quiz exclusivo e descubra qual é o seu estilo predominante'
                    }
                  }
                },
                {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                    name: 'CustomButton',
                    options: {
                      text: 'Começar Quiz',
                      variant: 'default',
                      className: 'bg-[#B89B7A] text-white hover:bg-[#A38A69]'
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

export const createBuilderModel = async (modelName: string): Promise<boolean> => {
  try {
    const template = modelTemplates[modelName];
    if (!template) {
      console.error(`Template não encontrado para o modelo: ${modelName}`);
      return false;
    }

    // Tentar criar o modelo via API do Builder.io
    const BUILDER_API_KEY = '15b188fc9daf4dc5a37e11da13166d10';
    
    const response = await fetch('https://builder.io/api/v1/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BUILDER_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelName,
        published: 'published',
        data: template.content,
        name: template.displayName,
        meta: {
          description: template.description
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`Modelo ${modelName} criado com sucesso:`, result);
      return true;
    } else {
      console.warn(`Erro ao criar modelo ${modelName}:`, response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error(`Erro ao criar modelo ${modelName}:`, error);
    return false;
  }
};

export const createAllRequiredModels = async (): Promise<{ success: boolean; createdModels: string[] }> => {
  const requiredModels = ['resultado-page', 'quiz-offer-page'];
  const createdModels: string[] = [];
  
  for (const modelName of requiredModels) {
    try {
      const success = await createBuilderModel(modelName);
      if (success) {
        createdModels.push(modelName);
      }
    } catch (error) {
      console.error(`Falha ao criar modelo ${modelName}:`, error);
    }
  }
  
  return {
    success: createdModels.length > 0,
    createdModels
  };
};

// Função alternativa que abre o Builder.io com instruções
export const openBuilderSetupInstructions = () => {
  const instructionsUrl = 'https://builder.io/models';
  
  // Abrir instruções em nova aba
  window.open(instructionsUrl, '_blank');
  
  // Mostrar instruções localmente
  const instructions = `
    Para configurar os modelos Builder.io:
    
    1. Acesse: https://builder.io/models
    2. Clique em "New Model"
    3. Crie os seguintes modelos:
       - resultado-page (Página de Resultado)
       - quiz-offer-page (Página de Oferta do Quiz)
    4. Configure as páginas conforme necessário
    5. Publique as páginas no Builder.io
    
    Após criar os modelos, retorne aqui e recarregue a página.
  `;
  
  return instructions;
};
