// Interceptador global para substituir URLs problemáticas
(function() {
  console.log('🛡️ Interceptador de URLs problemáticas ativado');
  
  // Lista de URLs problemáticas para interceptar
  const problematicUrls = [
    'via.placeholder.com/120x40/3b82f6/ffffff?text=LOGO',
    'via.placeholder.com/120x40',
    'https://via.placeholder.com/120x40/3b82f6/ffffff?text=LOGO'
  ];
  
  function isProblematicUrl(url) {
    if (!url || typeof url !== 'string') return false;
    return problematicUrls.some(problemUrl => url.includes(problemUrl)) || 
           (url.includes('via.placeholder.com') && url.includes('120x40'));
  }
  
  function getReplacementUrl(url) {
    console.warn('🔄 URL problemática detectada:', url);
    console.trace('🔍 Stack trace da chamada:'); // Isso vai mostrar onde está sendo chamada
    
    if (url.includes('120x40') && url.includes('text=LOGO')) {
      return '/logo-placeholder.svg';
    }
    return '/placeholder.svg';
  }
  
  // Interceptar createElement para img
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'img') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && isProblematicUrl(value)) {
          value = getReplacementUrl(value);
          console.log('✅ URL substituída via setAttribute:', value);
        }
        return originalSetAttribute.call(this, name, value);
      };
      
      // Interceptar propriedade src
      Object.defineProperty(element, 'src', {
        get: function() {
          return this.getAttribute('src') || '';
        },
        set: function(value) {
          if (isProblematicUrl(value)) {
            value = getReplacementUrl(value);
            console.log('✅ URL substituída via src property:', value);
          }
          this.setAttribute('src', value);
        }
      });
    }
    
    return element;
  };
  
  // Interceptar fetch
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    if (isProblematicUrl(input)) {
      const newUrl = getReplacementUrl(input);
      console.log('✅ Fetch redirecionado:', newUrl);
      return originalFetch.call(this, newUrl, init);
    }
    return originalFetch.call(this, input, init);
  };
  
  // Interceptar XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    if (isProblematicUrl(url)) {
      url = getReplacementUrl(url);
      console.log('✅ XHR redirecionado:', url);
    }
    return originalXHROpen.call(this, method, url, async, user, password);
  };
  
  // Interceptar Image constructor
  const OriginalImage = window.Image;
  window.Image = function(width, height) {
    const img = new OriginalImage(width, height);
    
    Object.defineProperty(img, 'src', {
      get: function() {
        return this.getAttribute('src') || '';
      },
      set: function(value) {
        if (isProblematicUrl(value)) {
          value = getReplacementUrl(value);
          console.log('✅ Image src substituída:', value);
        }
        this.setAttribute('src', value);
      }
    });
    
    return img;
  };
  
  // Interceptar todas as tentativas de rede (último recurso)
  if ('serviceWorker' in navigator) {
    // Registrar um service worker inline para interceptar requests
    const swCode = `
      self.addEventListener('fetch', event => {
        const url = event.request.url;
        if (url.includes('via.placeholder.com') && url.includes('120x40')) {
          console.warn('🔄 Service Worker interceptou:', url);
          event.respondWith(fetch('/logo-placeholder.svg'));
        }
      });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker.register(swUrl).then(() => {
      console.log('🛡️ Service Worker registrado para interceptar URLs');
    }).catch(err => {
      console.log('⚠️ Não foi possível registrar Service Worker:', err);
    });
  }
  
  console.log('🛡️ Todos os interceptadores ativados');
})();
