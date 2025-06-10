
// Utilidade para integração com webhook do Hotmart
interface UserData {
  quiz_results?: any;
  funnel_step?: string;
  page_url?: string;
  timestamp?: number;
}

// Manager para webhook do Hotmart
export const hotmartWebhookManager = {
  isEnabled: () => {
    return process.env.NODE_ENV === 'production';
  }
};

// Função para armazenar dados do usuário para correlação futura
export const storeUserForHotmart = (email: string, data: UserData) => {
  if (!email || !hotmartWebhookManager.isEnabled()) {
    console.log('[Hotmart] Webhook disabled or missing email');
    return;
  }

  const userData = {
    ...data,
    timestamp: Date.now(),
    email
  };

  // Armazenar no localStorage para correlação futura
  try {
    localStorage.setItem(`hotmart_user_${email}`, JSON.stringify(userData));
    console.log('[Hotmart] User data stored for correlation:', email);
  } catch (error) {
    console.error('[Hotmart] Error storing user data:', error);
  }
};
