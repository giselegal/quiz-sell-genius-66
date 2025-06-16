
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const generateDeterministicId = (prefix: string, ...parts: string[]): string => {
  const hash = parts.join('-').replace(/[^a-zA-Z0-9-]/g, '');
  return `${prefix}-${hash}-${Date.now()}`;
};

export const generateComponentId = (stepId: string, componentType: string, order: number): string => {
  return `${stepId}-${componentType}-${order}-${Math.random().toString(36).substring(2)}`;
};
