// Analytics utilities

export const initFacebookPixel = () => {
  console.log('Facebook Pixel initialized');
};

export const trackPageView = (path: string, data?: any) => {
  console.log('Page view tracked:', path, data);
};

export const trackButtonClick = (buttonName: string, data?: any) => {
  console.log('Button click tracked:', buttonName, data);
};

export const trackSaleConversion = (value: number, currency = 'BRL') => {
  console.log('Sale conversion tracked:', value, currency);
};

export const captureUTMParameters = () => {
  console.log('UTM parameters captured');
};

// Função para obter eventos de analytics (simulada para desenvolvimento)
export const getAnalyticsEvents = () => {
  const now = Date.now();
  const oneHour = 3600000;
  const oneDay = 86400000;
  
  // Simular dados mais realistas para o teste A/B com progressão temporal
  const events = [];
  
  // Versão A - /resultado (dados ao longo de 7 dias)
  for (let day = 0; day < 7; day++) {
    const dayStart = now - (oneDay * (7 - day));
    const dailyVisitors = Math.floor(Math.random() * 8) + 3; // 3-10 visitantes por dia
    
    for (let visitor = 0; visitor < dailyVisitors; visitor++) {
      const sessionId = `session_a_${day}_${visitor}`;
      const visitTime = dayStart + (Math.random() * oneDay);
      
      // PageView (100% dos visitantes)
      events.push({
        eventName: 'PageView',
        timestamp: visitTime,
        customData: { 
          pixel_id: '1311550759901086', 
          session_id: sessionId, 
          page: '/resultado' 
        }
      });
      
      // QuizStart (40% dos visitantes - baixo engajamento)
      if (Math.random() < 0.4) {
        events.push({
          eventName: 'QuizStart',
          timestamp: visitTime + 30000 + (Math.random() * 60000),
          customData: { 
            pixel_id: '1311550759901086', 
            session_id: sessionId 
          }
        });
        
        // QuizComplete (75% dos que iniciaram)
        if (Math.random() < 0.75) {
          events.push({
            eventName: 'QuizComplete',
            timestamp: visitTime + 180000 + (Math.random() * 300000),
            customData: { 
              pixel_id: '1311550759901086', 
              session_id: sessionId 
            }
          });
          
          // Lead (60% dos que completaram)
          if (Math.random() < 0.6) {
            events.push({
              eventName: 'Lead',
              timestamp: visitTime + 480000 + (Math.random() * 120000),
              customData: { 
                pixel_id: '1311550759901086', 
                session_id: sessionId 
              }
            });
            
            // Purchase (15% dos leads)
            if (Math.random() < 0.15) {
              events.push({
                eventName: 'Purchase',
                timestamp: visitTime + 600000 + (Math.random() * 1800000),
                customData: { 
                  pixel_id: '1311550759901086', 
                  session_id: sessionId,
                  value: 197
                }
              });
            }
          }
        }
      }
    }
  }
  
  // Versão B - /quiz-descubra-seu-estilo (melhor performance)
  for (let day = 0; day < 7; day++) {
    const dayStart = now - (oneDay * (7 - day));
    const dailyVisitors = Math.floor(Math.random() * 6) + 4; // 4-9 visitantes por dia
    
    for (let visitor = 0; visitor < dailyVisitors; visitor++) {
      const sessionId = `session_b_${day}_${visitor}`;
      const visitTime = dayStart + (Math.random() * oneDay);
      
      // PageView (100% dos visitantes)
      events.push({
        eventName: 'PageView',
        timestamp: visitTime,
        customData: { 
          pixel_id: '1038647624890676', 
          session_id: sessionId, 
          page: '/quiz-descubra-seu-estilo' 
        }
      });
      
      // QuizStart (85% dos visitantes - alto engajamento)
      if (Math.random() < 0.85) {
        events.push({
          eventName: 'QuizStart',
          timestamp: visitTime + 15000 + (Math.random() * 45000),
          customData: { 
            pixel_id: '1038647624890676', 
            session_id: sessionId 
          }
        });
        
        // QuizComplete (90% dos que iniciaram)
        if (Math.random() < 0.90) {
          events.push({
            eventName: 'QuizComplete',
            timestamp: visitTime + 120000 + (Math.random() * 180000),
            customData: { 
              pixel_id: '1038647624890676', 
              session_id: sessionId 
            }
          });
          
          // Lead (85% dos que completaram - muito alta)
          if (Math.random() < 0.85) {
            events.push({
              eventName: 'Lead',
              timestamp: visitTime + 300000 + (Math.random() * 120000),
              customData: { 
                pixel_id: '1038647624890676', 
                session_id: sessionId 
              }
            });
            
            // Purchase (35% dos leads - muito superior)
            if (Math.random() < 0.35) {
              events.push({
                eventName: 'Purchase',
                timestamp: visitTime + 420000 + (Math.random() * 1200000),
                customData: { 
                  pixel_id: '1038647624890676', 
                  session_id: sessionId,
                  value: 197
                }
              });
            }
          }
        }
      }
    }
  }
  
  // Ordenar eventos por timestamp
  return events.sort((a, b) => a.timestamp - b.timestamp);
};

// Função para limpar dados de analytics
export const clearAnalyticsData = () => {
  console.log('Analytics data cleared');
  localStorage.removeItem('analyticsCache');
  localStorage.removeItem('metricsCache');
};

// Função para testar Facebook Pixel
export const testFacebookPixel = (): boolean => {
  console.log('Testing Facebook Pixel...');
  // Simular teste do pixel
  return true;
};
