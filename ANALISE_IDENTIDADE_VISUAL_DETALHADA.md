# Análise Detalhada da Identidade Visual do Quiz

## Estrutura e Layout

### Layout Principal
- **Container**: `group relative main-content w-full min-h-full mx-auto`
- **Flexbox**: `flex flex-col gap-4 md:gap-6 h-full justify-between`
- **Padding responsivo**: `p-3 group-[.screen-mobile]:p-3 md:p-5 pb-10`

### Header do Quiz
- **Botão de voltar**: Posicionado absoluto à esquerda com ícone de seta
- **Logo centralizado**: 96x96px com `max-w-24 object-cover`
- **Barra de progresso**: 
  - Container: `relative w-full overflow-hidden rounded-full bg-zinc-300 h-2`
  - Progresso: `progress h-full w-full flex-1 bg-primary transition-all`
  - Posição atual: `transform: translateX(-78.5714%)`

## Componentes Principais

### 1. Título da Pergunta
```html
<h1 class="min-w-full text-3xl font-bold text-center">
  2- Qual é o seu tipo de roupa favorita?
</h1>
```

### 2. Espaçador
```html
<div class="min-w-full py-2 border-dashed border-yellow-500 border rounded-lg">
```

### 3. Grid de Opções
- **Layout**: `grid grid-cols-2 gap-2`
- **Botões de opção**:
  - Classes base: `whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors`
  - Estados: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
  - Disabled: `disabled:pointer-events-none disabled:opacity-50`
  - Estilo: `option border-zinc-200 bg-background hover:bg-primary hover:text-foreground`
  - Layout interno: `px-4 hover:shadow-2xl overflow-hidden min-w-full gap-2 flex h-auto py-2 flex-col items-center justify-start border drop-shadow-md option-button`

### 4. Imagens das Opções
- **Tamanho**: `width="256" height="256"`
- **Classes**: `w-full rounded-t-md bg-white h-full`
- **CDN**: `https://cakto-quiz-br01.b-cdn.net/uploads/`

### 5. Texto das Opções
- **Container**: `py-2 px-4 w-full flex flex-row text-base items-center text-full-primary justify-between`
- **Editor**: `break-words w-full custom-quill quill ql-editor quill-option text-centered mt-2`

### 6. Botão Continuar
```html
<button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 min-w-full h-14">
  Continuar
</button>
```

### 7. Script JavaScript
- **Container**: `w-full p-2 text-sm ignore-customization text-green-500 h-auto min-h-[120px] bg-zinc-800 rounded-md border-none`
- **Badge**: `ignore-customization bg-yellow-400 opacity-75 text-white p-2 rounded-md absolute bottom-2 right-2`

## Sistema de Cores Identificado

### Cores Primárias
- **Primary**: Usado em hover states e botão principal
- **Background**: Cor de fundo padrão dos botões
- **Foreground**: Cor do texto
- **Zinc-200**: Bordas dos botões de opção
- **Zinc-300**: Fundo da barra de progresso
- **Zinc-800**: Fundo do container de script

### Cores de Estado
- **Blue-500**: Bordas de hover dos elementos editáveis
- **Yellow-500**: Bordas do espaçador
- **Yellow-400**: Badge de status
- **Green-500**: Texto do script
- **White**: Fundo das imagens

## Sistema de Espaçamento

### Gaps
- **Principal**: `gap-4 md:gap-6`
- **Grid de opções**: `gap-2`
- **Header**: `gap-4`

### Padding
- **Container principal**: `p-3 md:p-5 pb-10`
- **Botões**: `px-4 py-2`
- **Texto das opções**: `py-2 px-4`
- **Script container**: `p-2`

## Sistema de Tipografia

### Hierarquia
- **H1**: `text-3xl font-bold text-center`
- **Texto das opções**: `text-base`
- **Script**: `text-sm`

### Quebra de texto
- **Opções**: `break-words w-full`
- **Botões**: `whitespace-nowrap`

## Responsividade

### Breakpoints
- **Mobile**: `group-[.screen-mobile]:p-3`
- **MD**: `md:gap-6`, `md:p-5`, `md:pt-24`

### Layout adaptativo
- **Grid**: Mantém 2 colunas em mobile
- **Imagens**: Responsivas com `w-full`
- **Logo**: `max-w-24`

## Estados Interativos

### Hover Effects
- **Botões de opção**: `hover:bg-primary hover:text-foreground hover:shadow-2xl`
- **Botão principal**: `hover:bg-primary/90`
- **Elementos editáveis**: `hover:border-2 border-blue-500`

### Focus States
- **Todos os botões**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

### Disabled States
- **Desabilitado**: `disabled:pointer-events-none disabled:opacity-50`

## Funcionalidades JavaScript

### Seleção de Opções
- Limite de 2-3 seleções
- Classe `selected` para destaque visual
- Controle do estado do botão "Continuar"

### Armazenamento de Dados
- `selectedOptions` em Set
- Sincronização com elemento `KGgqvK`
- localStorage/sessionStorage integration

## Elementos de Drag & Drop

### Sortable Items
- **Atributos**: `role="button" tabindex="0" aria-disabled="false" aria-roledescription="sortable"`
- **Classes**: `group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto`
- **Transform**: `transform: translate3d(0px, 0px, 0px) scaleX(1) scaleY(1)`

### Canvas Items
- **Container**: `min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap`
- **Hover**: `group-hover/canvas-item:border-2 border-dashed hover:border-2 border-blue-500 rounded-md`

## Recomendações para o Editor

### 1. Sistema de Cores Consistente
- Definir variáveis CSS para primary, secondary, accent
- Padronizar cores de estado (hover, focus, disabled)
- Implementar modo escuro/claro

### 2. Grid Responsivo Aprimorado
- Sistema de breakpoints mais granular
- Grid flexível (1-4 colunas)
- Espaçamento proporcional

### 3. Componentes Reutilizáveis
- OptionButton component
- ProgressBar component
- EditableHeading component
- ImageUploader component

### 4. Animações e Transições
- Micro-interações nos botões
- Animações de seleção
- Transições suaves entre estados

### 5. Acessibilidade
- ARIA labels consistentes
- Navegação por teclado
- Contraste adequado
- Screen reader support

### 6. Performance
- Lazy loading de imagens
- Otimização de re-renders
- Debounce em inputs
- Virtual scrolling para muitas opções
