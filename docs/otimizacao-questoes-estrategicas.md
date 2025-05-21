# Otimização de Questões Estratégicas - Pré-carregamento Progressivo

## Visão Geral

Implementamos uma otimização significativa que aproveita o tempo que o usuário gasta respondendo às questões estratégicas (que não pontuam no resultado do quiz) para pré-carregar proativamente as imagens da página de resultados. Esta abordagem reduz significativamente o tempo de carregamento da página de resultados, melhorando a experiência do usuário e potencialmente aumentando a taxa de conversão.

## Implementação Técnica

### 1. Pré-carregamento Progressivo Durante Questões Estratégicas

Modificamos a função `handleStrategicAnswer` para implementar um pré-carregamento progressivo das imagens de resultado:

- **Primeira questão estratégica**: Inicia o carregamento das imagens principais da página de resultados
- **Segunda questão estratégica**: Carrega imagens das transformações "antes e depois"
- **Terceira questão em diante**: Carrega imagens de bônus e depoimentos

Esta abordagem distribui a carga de rede durante as questões estratégicas, quando o usuário está engajado mas não está gerando dados para o cálculo de resultado.

### 2. Otimização de Placeholders de Baixa Qualidade

Melhoramos a função `getLowQualityImage` para:

- Ajustar automaticamente a largura do placeholder com base no tipo de imagem
- Aumentar ligeiramente a qualidade para melhor percepção visual (de 20% para 25%)
- Identificar imagens grandes (banners/covers) e ajustar proporcionalmente

### 3. Priorização Contextual de Imagens Críticas

Aprimoramos `preloadCriticalImages` para:

- Ajustar dinamicamente a qualidade das imagens com base no contexto
- Aumentar o timeout para carregamentos em background durante questões estratégicas
- Dar maior prioridade às imagens de resultado quando explicitamente solicitadas

## Benefícios

1. **Experiência do Usuário Aprimorada**:
   - Redução significativa no tempo de carregamento da página de resultados
   - Experiência mais fluida e responsiva
   - Menor tempo de espera após a conclusão do quiz

2. **Otimização de Recursos de Rede**:
   - Distribuição mais equilibrada do uso de largura de banda
   - Aproveitamento de períodos de "tempo morto" durante as questões estratégicas
   - Prevenção de picos de uso de rede ao finalizar o quiz

3. **Potencial Aumento na Conversão**:
   - Menor taxa de abandono na transição para a página de resultados
   - Exibição mais rápida dos elementos de venda e CTA
   - Experiência mais profissional e confiável para o usuário

## Próximos Passos

1. **Analíticas de Desempenho**:
   - Implementar métricas para monitorar o tempo de carregamento antes/depois da otimização
   - Monitorar o impacto nas taxas de conversão

2. **Otimizações Adicionais**:
   - Considerar carregamento preditivo com base em respostas parciais do quiz
   - Implementar técnicas de streaming para componentes React críticos
   - Explorar o uso de Service Workers para cache avançado

3. **Testes A/B**:
   - Comparar diferentes estratégias de pré-carregamento
   - Testar o impacto da qualidade dos placeholders na percepção do usuário

---

> "Aproveitando o tempo para carregar o futuro." - Equipe de Engenharia
