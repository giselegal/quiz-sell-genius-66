
export interface QuizResult {
  style: string;
  score: number;
  answers: Record<string, string>;
}

export interface QuizData {
  questions: any[];
  results: any[];
  config: any;
}

export const quizService = {
  calculateResult: (answers: Record<string, string>): QuizResult => {
    // Simple calculation logic
    const styles = ['Natural', 'Clássico', 'Contemporâneo', 'Elegante', 'Romântico', 'Sexy', 'Dramático', 'Criativo'];
    
    // For now, return a random style - in a real app this would be based on the answers
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    return {
      style: randomStyle,
      score: Math.floor(Math.random() * 100) + 1,
      answers
    };
  },

  saveResult: (result: QuizResult): void => {
    try {
      const existingResults = JSON.parse(localStorage.getItem('quiz-results') || '[]');
      existingResults.push({
        ...result,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('quiz-results', JSON.stringify(existingResults));
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  },

  getResults: (): QuizResult[] => {
    try {
      return JSON.parse(localStorage.getItem('quiz-results') || '[]');
    } catch (error) {
      console.error('Error getting quiz results:', error);
      return [];
    }
  },

  getQuizData: (): QuizData => {
    return {
      questions: [],
      results: [],
      config: {}
    };
  }
};
