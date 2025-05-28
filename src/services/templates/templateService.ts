
import { QuizTemplate, TemplateListItem } from '@/types/quizTemplate';
import { styleQuizTemplate } from './styleQuizTemplate';
// Chave para armazenamento local
const TEMPLATES_STORAGE_KEY = 'quiz_templates';
// Carregar templates do armazenamento local
const loadTemplates = (): QuizTemplate[] => {
  try {
    const saved = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Se não existir, inicializa com o template padrão
    const defaultTemplates = [styleQuizTemplate];
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(defaultTemplates));
    return defaultTemplates;
  } catch (error) {
    console.error('Erro ao carregar templates:', error);
    return [styleQuizTemplate];
  }
};
// Salvar templates no armazenamento local
const saveTemplates = (templates: QuizTemplate[]): void => {
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
    console.error('Erro ao salvar templates:', error);
// Obter todos os templates como lista resumida
export const getAllTemplates = (): TemplateListItem[] => {
  const templates = loadTemplates();
  return templates.map(({ id, name, description, isPublished, updatedAt }) => ({
    id,
    name,
    description,
    isPublished,
    updatedAt
  }));
// Obter um template específico pelo ID
export const getTemplateById = (id: string): QuizTemplate | null => {
  return templates.find(template => template.id === id) || null;
// Criar novo template
export const createTemplate = (template: Omit<QuizTemplate, 'id' | 'createdAt' | 'updatedAt'>): string => {
  const now = new Date().toISOString();
  const newTemplate: QuizTemplate = {
    ...template,
    id: `template_${Date.now()}`,
    createdAt: now,
    updatedAt: now
  };
  
  templates.push(newTemplate);
  saveTemplates(templates);
  return newTemplate.id;
// Duplicar template existente
export const duplicateTemplate = (id: string): string | null => {
  const templateToDuplicate = templates.find(template => template.id === id);
  if (!templateToDuplicate) return null;
  const duplicatedTemplate: QuizTemplate = {
    ...templateToDuplicate,
    name: `${templateToDuplicate.name} (Cópia)`,
    isPublished: false,
  templates.push(duplicatedTemplate);
  return duplicatedTemplate.id;
// Atualizar template existente
export const updateTemplate = (id: string, updates: Partial<QuizTemplate>): boolean => {
  const index = templates.findIndex(template => template.id === id);
  if (index === -1) return false;
  templates[index] = {
    ...templates[index],
    ...updates,
    updatedAt: new Date().toISOString()
  return true;
// Salvar template completo
export const saveTemplate = (template: QuizTemplate): boolean => {
  const index = templates.findIndex(t => t.id === template.id);
  if (index >= 0) {
    templates[index] = {
      ...template,
      updatedAt: new Date().toISOString()
    };
  } else {
    templates.push({
      createdAt: new Date().toISOString(),
    });
// Excluir template
export const deleteTemplate = (id: string): boolean => {
  const filteredTemplates = templates.filter(template => template.id !== id);
  if (filteredTemplates.length === templates.length) return false;
  saveTemplates(filteredTemplates);
// Publicar/despublicar template
export const toggleTemplatePublication = (id: string): boolean => {
  templates[index].isPublished = !templates[index].isPublished;
  templates[index].updatedAt = new Date().toISOString();
