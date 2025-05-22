# Otimização de Layout e Fonte para Dispositivos Móveis

Este documento descreve as otimizações realizadas para melhorar a visualização do quiz em dispositivos móveis, especialmente para questões estratégicas e opções com texto.

## Problemas Identificados

1. **Largura limitada em dispositivos móveis:**
   - O contêiner estava com 95% da largura, causando limitação em textos e imagens
   - Opções de resposta ficavam estreitas, dificultando leitura do conteúdo

2. **Tamanho de fonte insuficiente:**
   - Questões estratégicas não tinham destaque suficiente em mobile
   - Opções de texto em questões normais ficavam muito pequenas
   - Palavras estratégicas destacadas eram pouco perceptíveis

3. **Espaçamento e padding inadequados:**
   - Padding horizontal insuficiente em opções de texto
   - Espaço entre colunas pequeno demais

## Soluções Implementadas

### 1. Ampliação do Contêiner de Questões
- Aumentado para 99% da largura total em dispositivos móveis
- Reduzido padding lateral para maximizar espaço útil
- Melhorado contraste de fundo para questões estratégicas

### 2. Otimização de Tamanhos de Fonte
- Questões estratégicas: 1.55rem com leading tight em mobile
- Opções estratégicas: 1.25rem com leading tight em mobile
- Opções normais: 1.1rem com leading snug em mobile
- Destacadores estratégicos: 1.15em com linha decorativa mais evidente

### 3. Melhoria de Espaçamento e Padding
- Padding horizontal maior para opções de texto:
  - Opções estratégicas: 7px (aumentado de 6px)
  - Opções normais: 6px (aumentado de 5px)
- Redução de gap vertical em questões estratégicas para caber mais conteúdo
- Aumento de espaço entre colunas em layout de opções com imagem

### 4. Ajustes Visuais Adicionais
- Melhorado contraste dos destaques de texto com linha decorativa mais visível
- Aumentado tamanho da linha decorativa de 4px para 5px
- Aumentado a opacidade de 40% para 50% para maior contraste
- Ajustado transformações de texto para melhor fluidez de leitura

## Referências Técnicas

- **QuizQuestion.tsx**: Controlador principal de layout e estilo das questões
- **QuizOption.tsx**: Componente de opções com personalização condicional
- **QuizOptionImage.tsx**: Wrapper para opções com imagens
- **textHighlight.ts**: Utilitário para destaque visual de palavras estratégicas

## Resultados Esperados

1. Melhor legibilidade do texto em todos os dispositivos móveis
2. Maior destaque para questões estratégicas, facilitando a percepção de importância
3. Melhor proporção de espaço entre elementos, eliminando sensação de "apertado"
4. Experiência visual mais consistente e agradável para o usuário

## Próximos Passos Recomendados

1. Implementar teste A/B para validar a eficácia dessas mudanças
2. Coletar métricas de engajamento para confirmar melhoria na experiência
3. Monitorar feedback dos usuários em diferentes dispositivos

---

Documentação criada em: 22 de maio de 2025  
Última atualização: 22 de maio de 2025
