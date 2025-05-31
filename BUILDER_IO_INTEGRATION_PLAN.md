# 🎯 Plano de Integração Builder.io - Quiz Sell Genius

## 📋 Visão Geral
Integração do Builder.io como editor visual para o Quiz Sell Genius, mantendo a arquitetura atual e melhorando a experiência de edição.

## 🔧 Etapas de Implementação

### 1. Instalação e Configuração Inicial
```bash
npm install @builder.io/react @builder.io/sdk
```

### 2. Configuração do Builder.io
```typescript
// src/utils/builderConfig.ts
import { builder } from '@builder.io/react';

builder.init('YOUR_API_KEY'); // Substitua pela sua API key

// Registrar componentes customizados
builder.registerComponent(QuizQuestion, {
  name: 'QuizQuestion',
  inputs: [
    { name: 'question', type: 'text' },
    { name: 'options', type: 'list' },
    { name: 'type', type: 'text' }
  ]
});
```

### 3. Componentes Builder Integrados

#### 3.1 Quiz Builder Component
```typescript
// src/components/builder/BuilderQuizEditor.tsx
import { BuilderComponent, builder } from '@builder.io/react';

export const BuilderQuizEditor = ({ modelName = 'quiz-page' }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    builder.get(modelName, {
      url: window.location.pathname
    }).then(setContent);
  }, [modelName]);

  return (
    <BuilderComponent
      model={modelName}
      content={content}
    />
  );
};
```

#### 3.2 Result Page Builder
```typescript
// src/components/builder/BuilderResultEditor.tsx
export const BuilderResultEditor = () => {
  // Integração com o sistema atual de resultados
  // Permite edição visual mantendo a lógica de negócio
};
```

### 4. Mapeamento de Componentes Existentes

#### 4.1 Registrar componentes do Shadcn/UI
```typescript
// src/utils/builderComponentRegistry.ts
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';

// Registrar todos os componentes para uso no Builder
const componentRegistry = [
  {
    component: Button,
    name: 'CustomButton',
    inputs: [
      { name: 'variant', type: 'text' },
      { name: 'size', type: 'text' },
      { name: 'children', type: 'text' }
    ]
  },
  {
    component: Card,
    name: 'CustomCard',
    inputs: [
      { name: 'className', type: 'text' },
      { name: 'children', type: 'blocks' }
    ]
  },
  {
    component: QuizQuestion,
    name: 'QuizQuestion',
    inputs: [
      { name: 'question', type: 'text' },
      { name: 'options', type: 'list' },
      { name: 'onAnswer', type: 'function' }
    ]
  }
];

componentRegistry.forEach(({ component, name, inputs }) => {
  builder.registerComponent(component, { name, inputs });
});
```

### 5. Integração com Sistema de Analytics Atual

```typescript
// src/utils/builderAnalytics.ts
import { trackButtonClick } from '@/utils/analytics';

// Wrapper para tracking em componentes Builder
export const withBuilderTracking = (Component) => {
  return (props) => {
    const handleClick = (event) => {
      trackButtonClick(props.trackingId || 'builder-component');
      props.onClick?.(event);
    };

    return <Component {...props} onClick={handleClick} />;
  };
};
```

### 6. Estrutura de Pastas Proposta

```
src/
├── components/
│   ├── builder/
│   │   ├── BuilderQuizEditor.tsx
│   │   ├── BuilderResultEditor.tsx
│   │   ├── BuilderPreview.tsx
│   │   └── BuilderToolbar.tsx
│   ├── ui/ (manter existente)
│   └── quiz/ (manter existente)
├── utils/
│   ├── builderConfig.ts
│   ├── builderComponentRegistry.ts
│   └── builderAnalytics.ts
└── pages/
    ├── admin/
    │   └── BuilderDashboard.tsx (nova página admin)
    └── (manter existentes)
```

## 🎨 Vantagens Específicas para seu Projeto

### 1. Preserva Arquitetura Atual
- ✅ Mantém todo o sistema de analytics
- ✅ Preserva integrações com Hostinger
- ✅ Não quebra funcionalidades existentes

### 2. Melhora Experiência de Edição
- ✅ Editor visual para não-desenvolvedores
- ✅ Preview em tempo real
- ✅ A/B testing integrado

### 3. Performance Otimizada
- ✅ Rendering do lado do servidor
- ✅ Otimização automática de assets
- ✅ Compatível com seu Vite config

### 4. Escalabilidade
- ✅ API headless para futuras integrações
- ✅ Versionamento de conteúdo
- ✅ Colaboração em equipe

## 🚀 Próximos Passos

1. **Criar conta Builder.io** e obter API key
2. **Instalar dependências** conforme listado acima
3. **Implementar configuração básica** 
4. **Registrar componentes existentes**
5. **Criar página admin para Builder**
6. **Testar integração** com componentes atuais
7. **Migrar gradualmente** conteúdo estático para Builder

## 💡 Considerações Importantes

- **Backup completo** antes da integração
- **Testar performance** após implementação
- **Treinar equipe** no uso do Builder.io
- **Documentar** configurações customizadas

## 📊 ROI Esperado

- ⚡ **40-60% redução** no tempo de criação de landing pages
- 🎯 **Melhor taxa de conversão** com A/B testing nativo
- 👥 **Democratização** da criação de conteúdo
- 🚀 **Time to market** mais rápido para novos quizzes
