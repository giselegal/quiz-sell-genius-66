# 🎯 Builder.io - Integração Completa

## ✅ Status da Implementação

A integração do Builder.io foi **100% concluída** e está funcionando. Todas as funcionalidades foram implementadas e testadas.

## 📁 Arquivos Implementados

### Configuração Base
- ✅ `src/utils/builderConfig.ts` - Configuração e inicialização do Builder.io
- ✅ `src/utils/builderComponentRegistry.ts` - Registro de componentes customizados
- ✅ `src/utils/builderAnalytics.ts` - Analytics e tracking integrado

### Interface de Usuário
- ✅ `src/pages/admin/BuilderDashboard.tsx` - Dashboard completo do Builder.io
- ✅ `src/components/builder/BuilderQuizEditor.tsx` - Editor visual de quiz
- ✅ `src/components/builder/BuilderResultEditor.tsx` - Editor visual de resultados

### Integração com o App
- ✅ Rota `/admin/builder` adicionada no `App.tsx`
- ✅ Card "Builder.io Dashboard" adicionado no `AdminDashboard`
- ✅ Inicialização automática do Builder.io no startup

## 🚀 Como Usar

### 1. Acessar o Builder.io
1. Navegue para `/admin` no seu projeto
2. Clique no card **"Builder.io Dashboard"**
3. Você será redirecionado para `/admin/builder`

### 2. Funcionalidades Disponíveis

#### **Overview Tab**
- Status da API Key
- Ações rápidas (Criar página, Abrir Builder.io, Ver modelos)
- Lista de modelos pré-configurados

#### **Modelos Tab**
- **Página do Quiz**: Editor visual para páginas de perguntas
- **Página de Resultados**: Editor visual para resultados do quiz  
- **Landing Page**: Páginas de entrada e captura
- **Página de Oferta**: Páginas de vendas e conversão

#### **Preview Tab**
- Visualização em tempo real das páginas
- Editor visual integrado para Quiz e Resultados
- Teste das páginas antes de publicar

#### **Configurações Tab**
- Gerenciamento da API Key
- Configurações de tracking e analytics
- Status da conexão com Builder.io

### 3. Componentes Registrados

Os seguintes componentes do seu projeto estão disponíveis no Builder.io:

#### **QuizQuestion**
- `question` (texto): Pergunta do quiz
- `options` (lista): Opções de resposta
- `questionType` (seleção): Tipo da questão

#### **CustomButton** 
- `text` (texto): Texto do botão
- `onClick` (ação): Ação ao clicar
- `variant` (seleção): Estilo do botão
- `size` (seleção): Tamanho do botão

#### **CustomCard**
- `title` (texto): Título do card
- `content` (texto): Conteúdo do card
- `imageUrl` (URL): Imagem do card

## ⚙️ Configuração da API Key

### Atual: Demo Key
```typescript
const DEMO_API_KEY = 'YJIGb4i01jvw0SRdL5Bt';
```

### Para Produção:
1. Crie uma conta no [Builder.io](https://builder.io)
2. Obtenha sua API Key real
3. Substitua no arquivo `src/utils/builderConfig.ts`:

```typescript
const PRODUCTION_API_KEY = 'sua-api-key-aqui';
```

4. Ou use a função para trocar dinamicamente:
```typescript
import { reinitializeBuilder } from '@/utils/builderConfig';
reinitializeBuilder('sua-nova-api-key');
```

## 📊 Analytics Integrado

O Builder.io está integrado com o sistema de analytics existente:

- ✅ Tracking de visualizações de páginas
- ✅ Tracking de interações com componentes
- ✅ Tracking de conversões
- ✅ Integração com Facebook Pixel

## 🔧 Desenvolvimento

### Adicionar Novos Componentes
1. Crie o componente React
2. Registre em `builderComponentRegistry.ts`:

```typescript
registerComponent(SeuComponente, {
  name: 'SeuComponente',
  inputs: [
    { name: 'propriedade', type: 'text' }
  ]
});
```

### Testar Localmente
1. Execute: `npm run dev`
2. Acesse: `http://localhost:5173/admin/builder`
3. Teste as funcionalidades

## 🎨 Design System

O dashboard usa o mesmo design system do projeto:
- **Cores**: #432818, #B89B7A, #8F7A6A
- **Componentes**: Cards, Buttons, Tabs do sistema UI
- **Layout**: AdminLayout padrão

## 🚨 Troubleshooting

### Erro de API Key
- Verifique se a API Key está correta
- Confirme se tem acesso à internet
- Teste com a demo key primeiro

### Componentes não aparecem
- Verifique se estão registrados em `builderComponentRegistry.ts`
- Confirme se o componente está exportado corretamente

### Páginas não carregam
- Verifique o console do navegador
- Confirme se as rotas estão configuradas
- Teste o ambiente de desenvolvimento

## 📝 Próximos Passos

1. **Obter API Key Real**: Criar conta no Builder.io
2. **Configurar Domínio**: Adicionar domínio nas configurações
3. **Treinar Equipe**: Ensinar uso das funcionalidades
4. **Criar Templates**: Desenvolver templates personalizados
5. **Monitorar Performance**: Acompanhar métricas de uso

---

**🎉 A integração está 100% funcional e pronta para uso!**

Para suporte técnico, verifique a documentação do Builder.io ou entre em contato com a equipe de desenvolvimento.
