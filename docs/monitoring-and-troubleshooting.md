# Guia de Monitoramento de Performance e Resolução de Problemas

Este guia fornece instruções detalhadas para verificar, monitorar e resolver problemas de desempenho após o deploy da versão otimizada do site de quiz.

## Verificação de Performance Pós-Deploy

### 1. Executar Teste do Lighthouse

Acesse o site em produção e execute o Lighthouse para verificar se as melhorias de desempenho foram efetivas:

1. Abra o site em uma guia anônima no Chrome
2. Abra o DevTools (F12 ou Ctrl+Shift+I / Cmd+Option+I)
3. Vá para a aba "Lighthouse"
4. Selecione "Performance" e "Mobile"
5. Clique em "Generate Report"

**Meta**: Score de performance acima de 90

### 2. Verificar Métricas Específicas

Preste atenção especial às seguintes métricas:

- **LCP (Largest Contentful Paint)**: Deve ser menor que 2,5 segundos
- **CLS (Cumulative Layout Shift)**: Deve ser menor que 0,1
- **FID/TBT (First Input Delay/Total Blocking Time)**: FID menor que 100ms

## Resolução de Problemas Comuns

### Problema 1: Imagens Borradas

Se as imagens continuarem borradas após o deploy:

1. Abra o console do navegador e execute:
   ```javascript
   window.fixBlurryIntroQuizImages()
   ```

2. Verifique se há erros no console relacionados à função de correção

3. Solução alternativa: Adicione manualmente a classe `will-animate` aos containers de imagem:
   ```javascript
   document.querySelectorAll('.quiz-intro img').forEach(img => {
     img.parentElement.classList.add('will-animate');
   });
   ```

### Problema 2: Tela Branca / JavaScript Não Carrega

Se a página exibir apenas uma tela branca:

1. Verifique os erros no console do navegador
2. Confirme se o arquivo `.htaccess` foi corretamente implantado com as configurações de MIME type
3. Solução:
   - Verifique se o arquivo `critical-js.js` está presente no caminho correto
   - Verifique se o servidor está servindo os arquivos JavaScript com o MIME type correto

### Problema 3: Layout Shifts Durante o Carregamento

Se você observar mudanças bruscas no layout durante o carregamento:

1. Verifique se o CSS crítico no `index.html` foi preservado
2. Confirme se as dimensões das imagens estão sendo corretamente aplicadas
3. Solução:
   - Adicione explicitamente dimensões width/height em todas as imagens
   - Reforce o uso de `aspect-ratio` nos containers de imagem

## Monitoramento Contínuo

### 1. Configurar Web Vitals no Google Analytics

Implemente o monitoramento de Web Vitals para acompanhar a performance real dos usuários:

```javascript
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToAnalytics({name, delta, id}) {
  // Código para enviar ao Google Analytics
  gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(delta),
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

### 2. Acompanhar Taxas de Conversão

Monitore as métricas de negócio para verificar o impacto das melhorias de performance:

- Taxa de conclusão do quiz
- Taxa de conversão para a página de vendas
- Tempo médio de permanência na página

## Melhorias Futuras

Para continuar melhorando o desempenho após esta otimização inicial:

1. **Reduzir JavaScript Não Utilizado**: Identificar e remover os 139 KiB de JavaScript não utilizado mencionados no relatório do Lighthouse

2. **Implementar Lazy Loading para Componentes Pesados**: Aplicar code-splitting em componentes não críticos para a experiência inicial

3. **Otimizar Imagens Dinâmicas**: Implementar um sistema que detecta automaticamente o tamanho do dispositivo e carrega a imagem otimizada correspondente

4. **Implementar Cache no Service Worker**: Para melhorar o desempenho em visitas repetidas

## Recursos Adicionais

- [Web Vitals - Google Developers](https://web.dev/vitals/)
- [Guia de Otimização de Sites - Google Developers](https://developers.google.com/web/fundamentals/performance/get-started)
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
