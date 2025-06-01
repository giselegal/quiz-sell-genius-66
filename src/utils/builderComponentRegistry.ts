// src/utils/builderComponentRegistry.ts
import { Builder } from '@builder.io/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizQuestion } from '@/components/QuizQuestion';
// Importar componentes das páginas específicas
import QuizOfferPage from '@/components/QuizOfferPage';
import QuizOfferHero from '@/components/quiz-offer/QuizOfferHero';
import QuizOfferCTA from '@/components/quiz-offer/QuizOfferCTA';
// Importar componentes principais das páginas
import ResultPage from '@/pages/ResultPage';
import BuilderResultPage from '@/components/builder/BuilderResultPage';
import BuilderQuizOfferPage from '@/components/builder/BuilderQuizOfferPage';

// Registrar componentes do Shadcn/UI para uso no Builder.io
const componentRegistry = [
  {
    component: Button,
    name: 'CustomButton',
    inputs: [
      { 
        name: 'variant', 
        type: 'text',
        defaultValue: 'default',
        enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        helperText: 'Estilo visual do botão'
      },
      { 
        name: 'size', 
        type: 'text',
        defaultValue: 'default',
        enum: ['default', 'sm', 'lg', 'icon'],
        helperText: 'Tamanho do botão'
      },
      { 
        name: 'children', 
        type: 'text',
        defaultValue: 'Clique aqui',
        helperText: 'Texto do botão'
      },
      {
        name: 'onClick',
        type: 'function',
        helperText: 'Função executada ao clicar no botão'
      }
    ]
  },
  {
    component: Card,
    name: 'CustomCard',
    inputs: [
      { 
        name: 'className', 
        type: 'text',
        helperText: 'Classes CSS customizadas'
      },
      { 
        name: 'children', 
        type: 'blocks',
        defaultValue: [],
        helperText: 'Conteúdo interno do card'
      }
    ]
  },
  {
    component: QuizQuestion,
    name: 'QuizQuestion',
    inputs: [
      { 
        name: 'question', 
        type: 'object',
        subFields: [
          {
            name: 'id',
            type: 'string',
            required: true,
            helperText: 'ID único da pergunta'
          },
          {
            name: 'title',
            type: 'text',
            required: true,
            helperText: 'Texto da pergunta'
          },
          {
            name: 'type',
            type: 'text',
            enum: ['single', 'multiple', 'text', 'both', 'image'],
            defaultValue: 'multiple',
            helperText: 'Tipo de pergunta'
          },
          {
            name: 'multiSelect',
            type: 'number',
            defaultValue: 3,
            helperText: 'Número máximo de seleções permitidas'
          },
          {
            name: 'options',
            type: 'list',
            subFields: [
              {
                name: 'id',
                type: 'string',
                required: true
              },
              {
                name: 'text',
                type: 'text',
                required: true
              },
              {
                name: 'imageUrl',
                type: 'file'
              },
              {
                name: 'styleCategory',
                type: 'text'
              }
            ],
            helperText: 'Opções de resposta da pergunta'
          }
        ],
        helperText: 'Dados da pergunta do quiz'
      },
      { 
        name: 'currentAnswers', 
        type: 'list',
        defaultValue: [],
        helperText: 'Respostas selecionadas atualmente'
      },
      {
        name: 'onAnswer',
        type: 'function',
        helperText: 'Função chamada ao responder a pergunta'
      },
      {
        name: 'autoAdvance',
        type: 'boolean',
        defaultValue: false,
        helperText: 'Avançar automaticamente após responder'
      },
      {
        name: 'hideTitle',
        type: 'boolean',
        defaultValue: false,
        helperText: 'Ocultar o título da pergunta'
      },
      {
        name: 'showQuestionImage',
        type: 'boolean',
        defaultValue: true,
        helperText: 'Mostrar imagem da pergunta se disponível'
      },
      {
        name: 'isStrategicQuestion',
        type: 'boolean',
        defaultValue: false,
        helperText: 'Pergunta estratégica (estilo diferenciado)'
      }
    ]
  },
  {
    component: QuizOfferPage,
    name: 'QuizOfferPage',
    inputs: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        helperText: 'ID do quiz associado a esta página'
      },
      {
        name: 'onStart',
        type: 'function',
        helperText: 'Função chamada ao iniciar o quiz'
      },
      {
        name: 'onComplete',
        type: 'function',
        helperText: 'Função chamada ao completar o quiz'
      }
    ]
  },
  {
    component: QuizOfferHero,
    name: 'QuizOfferHero',
    inputs: [
      {
        name: 'title',
        type: 'text',
        required: true,
        helperText: 'Título da seção hero'
      },
      {
        name: 'description',
        type: 'text',
        helperText: 'Descrição da seção hero'
      },
      {
        name: 'image',
        type: 'file',
        helperText: 'Imagem de fundo da seção hero'
      }
    ]
  },
  {
    component: QuizOfferCTA,
    name: 'QuizOfferCTA',
    inputs: [
      {
        name: 'text',
        type: 'text',
        defaultValue: 'Comece o Quiz',
        helperText: 'Texto do botão de chamada para ação'
      },
      {
        name: 'link',
        type: 'url',
        helperText: 'URL para onde o botão deve redirecionar'
      },
      {
        name: 'isPrimary',
        type: 'boolean',
        defaultValue: true,
        helperText: 'Se verdadeiro, estiliza como botão primário'
      }
    ]
  },
  {
    component: ResultPage,
    name: 'ResultPageOriginal',
    inputs: []
  },
  {
    component: BuilderResultPage,
    name: 'BuilderResultPage',
    inputs: [
      {
        name: 'model',
        type: 'string',
        defaultValue: 'resultado-page',
        helperText: 'Nome do modelo Builder.io'
      }
    ]
  },
  {
    component: BuilderQuizOfferPage,
    name: 'BuilderQuizOfferPage',
    inputs: [
      {
        name: 'model',
        type: 'string',
        defaultValue: 'quiz-offer-page',
        helperText: 'Nome do modelo Builder.io'
      }
    ]
  }
];

// Registrar todos os componentes no Builder.io
export const registerComponents = () => {
  componentRegistry.forEach(({ component, name, inputs }) => {
    Builder.registerComponent(component, { 
      name, 
      inputs,
      canHaveChildren: name === 'CustomCard',
      defaultChildren: name === 'CustomCard' ? [
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'Text', options: { text: 'Conteúdo do card' } }
        }
      ] : undefined
    });
  });
  
  console.log('Componentes registrados no Builder.io:', componentRegistry.map(c => c.name));
};

export default registerComponents;
