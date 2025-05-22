## Instruções para resolver o problema do favicon da Lovable

### Problema Identificado
O site está carregando o ícone (favicon) da plataforma "Lovable" em vez do favicon personalizado do projeto. Isso acontece porque:

1. O projeto usa a plataforma Lovable para edição visual dos componentes
2. O plugin Lovable está injetando seu próprio favicon durante o build ou desenvolvimento
3. As referências de favicon atuais no projeto apontam para um local incorreto ou inexistente

### Solução Implementada

Para resolver este problema, as seguintes mudanças foram feitas:

1. Criado um diretório dedicado para os favicons em `/public/favicon/`
2. Atualizado o arquivo `index.html` para apontar para o local correto dos favicons
3. Criado um arquivo `site.webmanifest` para melhorar a compatibilidade com dispositivos móveis
4. Criado um script `import-favicons.sh` para facilitar a importação dos favicons corretos

### Como Usar os Novos Favicons

1. Certifique-se de ter seus arquivos de favicon prontos. Você precisará de:
   - `favicon.ico` (ícone principal)
   - `favicon-16x16.png` (ícone 16x16)
   - `favicon-32x32.png` (ícone 32x32)
   - `apple-touch-icon.png` (para dispositivos Apple)
   - `android-chrome-192x192.png` (para Android)
   - `android-chrome-512x512.png` (para Android)

2. Execute o script de importação:
   ```
   ./import-favicons.sh
   ```
   
   Ou copie manualmente seus arquivos de favicon para:
   ```
   /workspaces/quiz-sell-genius-66/public/favicon/
   ```

3. Compile e implante o projeto para ver as mudanças:
   ```
   npm run build
   ```

### Nota sobre o Lovable

Quando você estiver usando o ambiente de desenvolvimento do Lovable, ele ainda poderá mostrar seu próprio favicon. Isso é normal durante o desenvolvimento, mas o favicon correto será usado em produção após o build.

Para garantir que o Lovable não sobrescreva suas configurações de favicon, certifique-se de que o arquivo `index.html` na raiz do projeto sempre mantenha as referências corretas aos seus favicons personalizados.

### Localização Original dos Favicons

Foi mencionado que os favicons originais estão localizados em:
```
C:\Users\Public\favicon
```

Este é um caminho local do Windows e não está acessível diretamente pelo servidor. Use o script de importação para copiar estes arquivos para o local correto no projeto.
