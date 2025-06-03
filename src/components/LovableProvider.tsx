
import React from 'react';

interface LovableProviderProps {
  children: React.ReactNode;
}

const LovableProvider: React.FC<LovableProviderProps> = ({ children }) => {
  React.useEffect(() => {
    // Configurar Lovable para versão 2.1.0
    if (typeof window !== 'undefined') {
      window.LOVABLE_CONFIG = {
        projectId: "quiz-sell-genius-66",
        apiBaseUrl: "https://api.lovable.dev",
        enableLiveMode: true,
        enableRealTimeSync: true,
        version: "2.1.0",
        features: {
          componentTagger: true,
          liveEditing: true,
          enhancedSync: true,
          visualEditor: true,
          realTimeCollaboration: true
        }
      };

      window.__LOVABLE_VERSION__ = "2.1.0";
      window.__LOVABLE_FEATURES__ = [
        "componentTagger",
        "liveEditing", 
        "enhancedSync",
        "visualEditor",
        "realTimeCollaboration",
        "advancedTemplating"
      ];

      console.log('🎨 Lovable Provider v2.1.0 initialized');
    }
  }, []);

  return (
    <div data-lovable-provider="true" data-version="2.1.0">
      {children}
    </div>
  );
};

export default LovableProvider;
