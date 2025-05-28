
export interface UserProgressItem {
  questionId: string;
  uniqueUsers: number;
  totalAnswers: number;
}

export const getUserProgressData = (events: any[]): UserProgressItem[] => {
  if (!events || !Array.isArray(events)) {
    return [];
  }

  // Mock implementation for now - replace with actual analytics logic
  return [
    { questionId: '1', uniqueUsers: 1000, totalAnswers: 1000 },
    { questionId: '2', uniqueUsers: 850, totalAnswers: 850 },
    { questionId: '3', uniqueUsers: 720, totalAnswers: 720 },
    { questionId: '4', uniqueUsers: 650, totalAnswers: 650 },
    { questionId: '5', uniqueUsers: 580, totalAnswers: 580 },
  ];
};
