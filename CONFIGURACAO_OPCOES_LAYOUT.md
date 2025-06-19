# Configuração Avançada de Layout para Opções

## 📋 Visão Geral

O sistema de configuração de opções no **AdvancedQuizEditor** foi aprimorado para detectar automaticamente o tipo de questão e oferecer controles específicos para diferentes cenários de layout.

## 🔍 Detecção Automática de Tipo

### Questões com Texto + Imagem

- **Detecção**: Verifica se pelo menos uma opção possui propriedade `imageSrc`
- **Layout Padrão**: Grid 2 colunas
- **Controles Específicos**: Proporção de imagem, posição, altura, raio da borda

### Questões Apenas com Texto

- **Detecção**: Nenhuma opção possui `imageSrc`
- **Layout Padrão**: Grid 1 coluna ou lista
- **Controles Específicos**: Foco em tipografia e espaçamento

## ⚙️ Controles de Layout Disponíveis

### 1. Disposição da Grade

```typescript
gridLayout: "grid-1" | "grid-2" | "grid-3" | "grid-4" | "flex" | "list";
```

- **grid-1**: Uma coluna (ideal para texto longo)
- **grid-2**: Duas colunas (padrão para imagens)
- **grid-3**: Três colunas (cards compactos)
- **grid-4**: Quatro colunas (opções pequenas)
- **flex**: Layout flexível baseado no conteúdo
- **list**: Lista vertical com separadores

### 2. Controles para Imagens

#### Proporção da Imagem

```typescript
imageRatio: "square" | "landscape" | "portrait" | "wide" | "auto";
```

- **square**: 1:1 (256x256px)
- **landscape**: 16:9 (paisagem)
- **portrait**: 4:5 (retrato)
- **wide**: 21:9 (ultra-wide)
- **auto**: Proporção original

#### Posição da Imagem

```typescript
imagePosition: "top" | "bottom" | "left" | "right" | "background";
```

- **top**: Imagem acima do texto (padrão)
- **bottom**: Imagem abaixo do texto
- **left**: Imagem à esquerda do texto
- **right**: Imagem à direita do texto
- **background**: Imagem como fundo com texto sobreposto

#### Altura da Imagem

```typescript
imageHeight: number; // 80-400px
```

Controla a altura fixa das imagens (padrão: 160px)

#### Raio da Borda

```typescript
imageBorderRadius: number; // 0-24px
```

Arredondamento das bordas das imagens (padrão: 8px)

### 3. Controles de Texto

#### Alinhamento

```typescript
textAlignment: "left" | "center" | "right" | "justify";
```

- **left**: Alinhado à esquerda
- **center**: Centralizado (padrão)
- **right**: Alinhado à direita
- **justify**: Justificado

### 4. Espaçamento

#### Espaçamento entre Opções

```typescript
optionSpacing: number; // 0-24px
```

- **Padrão c/ Imagens**: 8px
- **Padrão Texto**: 4px

#### Padding da Opção

```typescript
optionPadding: number; // 4-32px
```

- **Padrão c/ Imagens**: 12px
- **Padrão Texto**: 16px

### 5. Layout Responsivo

#### Controle por Dispositivo

```typescript
desktopColumns: "1" | "2" | "3" | "4";
tabletColumns: "1" | "2" | "3";
mobileColumns: "1" | "2";
```

**Breakpoints:**

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎨 Exemplos de Configuração

### Questão com Imagens (E-commerce)

```javascript
{
  gridLayout: "grid-2",
  imageRatio: "portrait",
  imagePosition: "top",
  imageHeight: 200,
  imageBorderRadius: 12,
  textAlignment: "center",
  optionSpacing: 12,
  optionPadding: 16,
  desktopColumns: "2",
  tabletColumns: "2",
  mobileColumns: "1"
}
```

### Questão de Texto (Quiz Conhecimento)

```javascript
{
  gridLayout: "list",
  textAlignment: "left",
  optionSpacing: 6,
  optionPadding: 20,
  desktopColumns: "1",
  tabletColumns: "1",
  mobileColumns: "1"
}
```

### Questão com Muitas Opções (Múltipla Escolha)

```javascript
{
  gridLayout: "grid-3",
  textAlignment: "center",
  optionSpacing: 8,
  optionPadding: 12,
  desktopColumns: "3",
  tabletColumns: "2",
  mobileColumns: "1"
}
```

## 🔧 Como Usar

1. **Abra o AdvancedQuizEditor** em `/advanced-editor`
2. **Selecione uma questão do tipo "options"**
3. **No sidebar direito**, procure pelos cards:
   - **"Opções"**: Para editar texto e imagens das opções
   - **"Layout das Opções"**: Para configurar a apresentação
4. **O sistema detecta automaticamente** se tem imagens e ajusta os controles
5. **Configure os layouts** para desktop, tablet e mobile separadamente

## 🎯 Principais Melhorias

### ✅ Detecção Automática

- Identifica automaticamente questões com/sem imagens
- Ajusta controles e valores padrão baseado no tipo

### ✅ Interface Intuitiva

- Indicador visual do tipo detectado
- Controles organizados por categoria
- Preview em tempo real das mudanças

### ✅ Responsividade Avançada

- Configuração separada por dispositivo
- Breakpoints otimizados para diferentes telas
- Layout adaptativo baseado no conteúdo

### ✅ Flexibilidade Total

- Suporte a múltiplos layouts (grid, flex, list)
- Controles granulares de espaçamento e posicionamento
- CSS customizável através de propriedades

## 🚀 Próximos Passos Recomendados

1. **Testes de Usabilidade**: Validar os controles com usuários reais
2. **Presets de Layout**: Criar templates pré-configurados para casos comuns
3. **Preview Dinâmico**: Mostrar prévia ao vivo das mudanças no canvas
4. **Temas Visuais**: Integrar com sistema de temas do projeto
5. **Exportação**: Salvar configurações como templates reutilizáveis

---

**Localização dos Arquivos:**

- **Sidebar Principal**: `/src/components/visual-editor/panels/AdvancedConfigSidebar.tsx`
- **Editor Principal**: `/src/components/visual-editor/AdvancedQuizEditor.tsx`
- **Estilos**: `/src/styles/advanced-editor.css`
