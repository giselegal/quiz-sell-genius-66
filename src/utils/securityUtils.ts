
// Security utilities for input validation and sanitization

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'.-]{2,50}$/;
  return nameRegex.test(name.trim());
};

export const validateQuizAnswer = (answer: any): boolean => {
  return (
    answer &&
    typeof answer.questionId === 'string' &&
    typeof answer.optionId === 'string' &&
    typeof answer.points === 'number' &&
    answer.points >= 0 &&
    answer.points <= 10
  );
};

export const rateLimitCheck = (key: string, maxAttempts: number = 5, timeWindow: number = 60000): boolean => {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
  
  // Clean old attempts
  const validAttempts = attempts.filter((time: number) => now - time < timeWindow);
  
  if (validAttempts.length >= maxAttempts) {
    return false; // Rate limit exceeded
  }
  
  validAttempts.push(now);
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(validAttempts));
  
  return true; // Within rate limit
};

export const generateCSRFToken = (): string => {
  return btoa(Math.random().toString(36) + Date.now().toString());
};

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = sessionStorage.getItem('csrf_token');
  return token === storedToken;
};

export const setCSRFToken = (): string => {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrf_token', token);
  return token;
};
