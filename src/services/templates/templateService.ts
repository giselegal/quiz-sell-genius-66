
import { styleQuizTemplate } from './styleQuizTemplate';
import { styleQuizTemplate2 } from './styleQuizTemplate2';

export interface Template {
  id: string;
  name: string;
  description: string;
  questions: any[];
  styles: any;
  results?: any[];
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templates: Template[];
}

const availableTemplates: Template[] = [
  {
    id: 'style-quiz-basic',
    name: 'Quiz de Estilo Básico',
    description: 'Template básico para descoberta de estilo pessoal',
    questions: styleQuizTemplate.questions,
    styles: styleQuizTemplate.styles,
    results: styleQuizTemplate.results
  },
  {
    id: 'style-quiz-advanced',
    name: 'Quiz de Estilo Avançado',
    description: 'Template avançado com mais opções de estilo',
    questions: styleQuizTemplate2.questions,
    styles: styleQuizTemplate2.styles,
    results: styleQuizTemplate2.results
  }
];

const templateCategories: TemplateCategory[] = [
  {
    id: 'style',
    name: 'Estilo Pessoal',
    description: 'Templates para descoberta de estilo pessoal',
    templates: availableTemplates
  }
];

export const templateService = {
  getCategories: (): TemplateCategory[] => {
    return templateCategories;
  },

  getTemplateById: (id: string): Template | undefined => {
    return availableTemplates.find(template => template.id === id);
  },

  getAllTemplates: (): Template[] => {
    return availableTemplates;
  },

  saveCustomTemplate: (template: Template): void => {
    try {
      const customTemplates = JSON.parse(localStorage.getItem('custom-templates') || '[]');
      customTemplates.push(template);
      localStorage.setItem('custom-templates', JSON.stringify(customTemplates));
    } catch (error) {
      console.error('Error saving custom template:', error);
    }
  },

  getCustomTemplates: (): Template[] => {
    try {
      return JSON.parse(localStorage.getItem('custom-templates') || '[]');
    } catch (error) {
      console.error('Error loading custom templates:', error);
      return [];
    }
  }
};
