
export interface User {
  id: string;
  email: string;
  name?: string;
  userName?: string;
  features?: string[];
  plan?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: any) => Promise<void>;
  hasPremiumFeatures?: boolean;
  hasFeature?: (feature: string) => boolean;
}
