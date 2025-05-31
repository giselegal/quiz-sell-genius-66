# 🎨 Analytics de Criativos - Guia de Implementação

## 🚀 Resumo das Alterações

O **Analytics de Criativos** foi integrado ao sistema administrativo principal. Esta nova funcionalidade permite análises detalhadas do desempenho de diferentes criativos usados nas campanhas.

## 📊 Como Acessar

### URL Direta:
```
http://localhost:8082/admin/creative-analytics
```

### Através do Sistema de Arquivos:
A página pode ser acessada em:
- **Arquivo Principal**: `/src/pages/CreativeAnalyticsPage.tsx`
- **Componente Principal**: `/src/components/analytics/CreativePerformanceDashboard.tsx`

## 🔄 Rotas Atualizadas

As seguintes atualizações foram feitas ao sistema de rotas:

1. **Adição de Nova Rota em `src/utils/routes.ts`**:
   ```typescript
   CREATIVE_ANALYTICS: '/admin/creative-analytics'
   ```

2. **Rota Adicionada em `src/App.tsx`**:
   ```tsx
   <Route path="/admin/creative-analytics" element={<CreativeAnalyticsPage />} />
   ```

## 📝 O Que Foi Corrigido?

1. **Problema**: O dashboard de analytics de criativos, criado em 30/05/2025, não estava integrado ao sistema de rotas administrativas.

2. **Solução**: 
   - Adição de rotas específicas para o componente
   - URL direta acessível em `/admin/creative-analytics`

## 🔍 Funcionalidades Implementadas

O Analytics de Criativos fornece:

1. **Análise por UTM Content**:
   - Gerenciamento detalhado para parâmetro `utm_content` que identifica os criativos
   - Comparação entre diferentes variações de anúncios

2. **Métricas por Criativo**:
   - Views
   - Inicializações do quiz
   - Leads gerados
   - Vendas concluídas
   - Receita total

3. **Geração de Dados de Teste**:
   - Funcionalidade para testar a interface com dados simulados
   - Três criativos de exemplo incluídos

4. **Exportação de Dados**:
   - Relatórios em JSON para análise externa
   - Capacidade de limpar dados antigos

## 🔧 Notas de Manutenção

- Instruções detalhadas para testes de criativos estão em: `/workspaces/quiz-sell-genius-66/GUIA_TRACKING_VENDAS_E_CRIATIVOS.md`
- A análise de UTM em geral está disponível no dashboard principal em: `/admin/analytics` > Tab "Campanhas UTM"

---

*Documento criado em: 31/05/2025*
