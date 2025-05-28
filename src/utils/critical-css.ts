
export const injectCriticalCSS = (cssContent: string, id: string = 'critical-css'): void => {
  // Check if already injected
  if (document.getElementById(id)) {
    return;
  }

  const style = document.createElement('style');
  style.id = id;
  style.textContent = cssContent;
  document.head.appendChild(style);
};

export const removeCriticalCSS = (id: string = 'critical-css'): void => {
  const existingStyle = document.getElementById(id);
  if (existingStyle) {
    existingStyle.remove();
  }
};

export const criticalCSS = {
  generateCriticalCSS: (): string => {
    return `
      /* Critical CSS for initial page load */
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #faf9f7;
      }
      
      .quiz-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      
      .quiz-question {
        margin-bottom: 30px;
      }
      
      .quiz-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }
      
      .quiz-option {
        border: 2px solid #e5e5e5;
        border-radius: 8px;
        padding: 15px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .quiz-option:hover {
        border-color: #b89b7a;
      }
      
      .quiz-option.selected {
        border-color: #b89b7a;
        background-color: #f5f2ee;
      }
    `;
  },

  injectCriticalCSS: (): void => {
    const style = document.createElement('style');
    style.textContent = criticalCSS.generateCriticalCSS();
    document.head.appendChild(style);
  }
};
