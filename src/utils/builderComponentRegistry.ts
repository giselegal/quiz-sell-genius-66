// src/utils/builderComponentRegistry.ts
import { builder } from '@builder.io/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizQuestion } from '@/components/QuizQuestion';

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
  }
];

// Registrar todos os componentes no Builder.io
export const registerComponents = () => {
  componentRegistry.forEach(({ component, name, inputs }) => {
    builder.registerComponent(component, { 
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
