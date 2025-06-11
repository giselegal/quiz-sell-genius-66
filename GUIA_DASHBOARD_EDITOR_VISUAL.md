# 🎨 Guia Completo do Dashboard Editor Visual

## 📋 Visão Geral

O Dashboard do Editor Visual é uma interface completa para gerenciar páginas criadas com o sistema de editor visual do Quiz Sell Genius. Ele oferece funcionalidades avançadas de criação, edição, visualização e publicação de páginas.

## 🚀 Como Acessar

### Rotas Disponíveis

1. **Dashboard Principal**: `http://localhost:5173/editor-dashboard`

   - Interface principal para gerenciar todas as páginas
   - Visualização em cards com estatísticas
   - Funcionalidades de busca e filtros

2. **Editor Visual**: `http://localhost:5173/visual-editor`

   - Criar nova página em branco
   - Interface de arrastar e soltar

3. **Editor com Página Existente**: `http://localhost:5173/visual-editor/{id}`
   - Editar página específica
   - Carrega dados salvos da página

## 🎯 Funcionalidades do Dashboard

### 📊 Estatísticas

- **Total de Páginas**: Contador de todas as páginas criadas
- **Publicadas**: Páginas que estão ativas e acessíveis
- **Rascunhos**: Páginas em desenvolvimento
- **Visualizações**: Total de visualizações das páginas

### 🔍 Busca e Filtros

- **Campo de Busca**: Pesquisa por nome ou descrição
- **Filtros Automáticos**: Por status (publicado/rascunho)
- **Ordenação**: Por data de modificação

### 📱 Cards de Páginas

Cada página é exibida em um card com:

- **Nome e Descrição**
- **Status**: Badge indicando se está publicada ou em rascunho
- **Data de Modificação**: Última vez que foi editada
- **Estatísticas**: Visualizações e conversões (se disponível)
- **Menu de Ações**: Dropdown com opções

### ⚡ Ações Disponíveis

#### 🎨 Criar Nova Página

```
Botão "Nova Página" → Redireciona para /visual-editor
```

#### ✏️ Editar Página

```
Botão "Editar" → Redireciona para /visual-editor/{id}
```

#### 👁️ Visualizar

```
Botão "Visualizar" → Abre preview em nova aba
```

#### 📋 Duplicar

```
Menu → "Duplicar" → Cria cópia da página com sufixo "(Cópia)"
```

#### 🗑️ Excluir

```
Menu → "Excluir" → Confirma e remove a página
```

#### 📥 Importar

```
Botão "Importar" → Upload de arquivo JSON exportado
```

## 💾 Sistema de Armazenamento

### Local Storage Structure

```
visual_editor_pages_list → Array com lista de páginas
visual_editor_page_{id} → Dados completos de cada página
```

### Formato de Dados

```typescript
interface PageSummary {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  isPublished: boolean;
  views?: number;
  conversions?: number;
}
```

## 🎨 Editor Visual

### 🏗️ Componentes Principais

1. **Toolbar**: Controles de salvar, visualizar, desfazer/refazer
2. **Sidebar**: Biblioteca de componentes para arrastar
3. **Canvas**: Área de design principal
4. **Properties Panel**: Propriedades do elemento selecionado

### 📚 Biblioteca de Componentes

- **Texto**: Títulos, parágrafos, listas
- **Botões**: CTAs customizáveis
- **Imagens**: Upload e configuração
- **Layouts**: Containers, seções, colunas
- **Formulários**: Inputs, selects, textareas

### 🎯 Propriedades Editáveis

- **Conteúdo**: Texto, links, imagens
- **Estilos**: Cores, fontes, espaçamentos
- **Layout**: Posicionamento, dimensões
- **Comportamento**: Ações, links, animações

## 📐 Design Responsivo

### 📱 Viewports Suportados

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### 🔧 Controles de Viewport

```
Toolbar → Ícones Monitor/Tablet/Smartphone
```

## 🔄 Sistema de Desfazer/Refazer

### ⏪ Funcionalidades

- **Undo**: Desfaz última ação (Ctrl+Z)
- **Redo**: Refaz ação desfeita (Ctrl+Y)
- **Histórico**: Mantém estado das últimas ações

## 📤 Exportação e Importação

### 📄 Formato de Exportação

```json
{
  "pageInfo": {
    "title": "Título da Página",
    "description": "Descrição",
    "slug": "url-amigavel"
  },
  "elements": [...],
  "globalStyles": {...},
  "settings": {...}
}
```

### 📥 Importação

1. Clique em "Importar"
2. Selecione arquivo JSON
3. Página será criada automaticamente

## 🎨 Personalização

### 🎨 Estilos Globais

- **Cores**: Palette de cores personalizável
- **Fontes**: Seleção de tipografias
- **Espaçamentos**: Configuração de margens/paddings

### ⚙️ Configurações

- **SEO**: Meta tags, títulos
- **Performance**: Otimizações de imagem
- **Analytics**: Integração com ferramentas

## 🚀 Publicação

### 📝 Status de Publicação

- **Rascunho**: Visível apenas no editor
- **Publicado**: Acessível publicamente

### 🔗 URLs de Acesso

```
Preview: /preview/{pageId}
Publicado: /{slug}
```

## 🛠️ Troubleshooting

### ❌ Problemas Comuns

#### Página não carrega

```
Verificar se o ID existe no localStorage
Verificar console para erros JavaScript
```

#### Elementos não aparecem

```
Verificar se os dados estão salvos corretamente
Verificar se há conflitos de CSS
```

#### Performance lenta

```
Limpar localStorage se muito cheio
Verificar se há muitos elementos na página
```

### 🔧 Debug Mode

```javascript
// Listar todas as páginas
console.log(JSON.parse(localStorage.getItem("visual_editor_pages_list")));

// Ver dados de página específica
console.log(JSON.parse(localStorage.getItem("visual_editor_page_{id}")));
```

## 📈 Próximas Funcionalidades

### 🚀 Em Desenvolvimento

- [ ] Templates pré-definidos
- [ ] Componentes avançados (gráficos, mapas)
- [ ] Integração com APIs externas
- [ ] Sistema de colaboração
- [ ] Versionamento de páginas
- [ ] A/B Testing integrado

### 🎯 Melhorias Planejadas

- [ ] Performance otimizada
- [ ] Mais opções de design
- [ ] Integração com CMS
- [ ] Analytics avançados
- [ ] SEO automático
- [ ] Backup em nuvem

## 📞 Suporte

Para dúvidas ou problemas:

1. Verificar este guia primeiro
2. Consultar console do navegador para erros
3. Verificar se dados estão salvos no localStorage
4. Reportar bugs específicos com passos para reproduzir

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2025  
**Compatibilidade**: Chrome 90+, Firefox 88+, Safari 14+
