# Instruções Detalhadas para Deploy na Hostinger - Versão Otimizada

Este documento fornece instruções completas para implantar a versão otimizada do quiz na Hostinger, garantindo que todas as melhorias de performance sejam efetivamente aplicadas.

## Pré-Requisitos

- Acesso ao painel da Hostinger
- Pacote de deploy zipado (gerado pelo script `prepare-deploy.sh`)
- Backup dos arquivos atuais (recomendado)

## Método 1: Upload via Painel da Hostinger

### Passo 1: Preparação
1. Faça login no painel da Hostinger
2. Vá para "Gerenciador de Arquivos"
3. **IMPORTANTE**: Faça backup dos arquivos existentes antes de prosseguir
   - Selecione todos os arquivos na pasta `public_html`
   - Clique em "Mais" > "Comprimir" para criar um backup em ZIP

### Passo 2: Upload e Extração
1. Navegue até a pasta `public_html`
2. Clique em "Upload" e selecione o arquivo ZIP gerado pelo script de deploy
3. Após o upload, selecione o arquivo ZIP
4. Clique em "Extrair" e escolha extrair para a pasta atual (`public_html`)
5. Confirme a extração

### Passo 3: Verificação Crítica
1. Certifique-se de que o arquivo `.htaccess` está presente na raiz
   - Se não estiver, faça upload manual do arquivo `.htaccess` fornecido
2. Verifique se a estrutura de pastas está correta, com a pasta `assets` e `src` no nível raiz

## Método 2: Upload via FTP/SFTP

### Passo 1: Configuração da Conexão FTP
1. Obtenha os dados de acesso FTP no painel da Hostinger:
   - Hospedagem > Detalhes > Acesso FTP
2. Configure um cliente FTP (como FileZilla) com:
   - Host: seu domínio ou endereço FTP fornecido
   - Nome de usuário: seu nome de usuário FTP
   - Senha: sua senha FTP
   - Porta: geralmente 21 (ou a especificada pela Hostinger)

### Passo 2: Upload dos Arquivos
1. Conecte-se ao servidor via FTP
2. Navegue até a pasta `public_html` (ou pasta raiz do seu domínio)
3. **IMPORTANTE**: Faça backup dos arquivos existentes
4. Faça upload de todo o conteúdo da pasta `dist` para a pasta raiz
   - Você pode arrastar e soltar todos os arquivos e pastas
   - Alternativamente, você pode extrair o ZIP localmente e fazer upload dos arquivos extraídos

### Passo 3: Verificação de Permissões
1. Certifique-se de que os arquivos HTML, CSS e JavaScript tenham permissão 644
2. Certifique-se de que as pastas tenham permissão 755
3. Verifique especialmente as permissões do arquivo `.htaccess` (deve ser 644)

## Verificações Pós-Deploy

### Verificação Funcional
1. Acesse a página inicial em [https://giselegalvao.com.br/](https://giselegalvao.com.br/)
2. Teste a navegação pelo quiz
3. Verifique se a página de resultados carrega em [https://giselegalvao.com.br/resultado](https://giselegalvao.com.br/resultado)
4. Teste a página de vendas em [https://giselegalvao.com.br/quiz-descubra-seu-estilo](https://giselegalvao.com.br/quiz-descubra-seu-estilo)

### Verificação de Performance
1. Abra o Chrome DevTools (F12) > aba Lighthouse
2. Execute um teste de performance no modo Mobile
3. Verifique se o score de performance está acima de 90
4. Preste atenção especial às métricas:
   - LCP (Largest Contentful Paint)
   - CLS (Cumulative Layout Shift)
   - TBT (Total Blocking Time)

## Solução de Problemas

### Problema 1: Tela Branca / Página Não Carrega
- **Solução**: Verifique o arquivo `.htaccess` e certifique-se de que ele contém as configurações corretas para MIME types
- **Alternativa**: Adicione manualmente os cabeçalhos Content-Type no painel da Hostinger > Opções Avançadas > Headers

### Problema 2: Imagens Borradas
- **Solução**: Abra o console do navegador e execute: `window.fixBlurryIntroQuizImages()`
- **Verificação**: Confirme se os atributos width, height e aspectRatio estão presentes nas tags de imagem

### Problema 3: SPA Não Funciona (Rotas 404)
- **Solução**: Verifique se o `.htaccess` tem as regras de reescrita para SPA
- **Alternativa**: Configure manualmente o redirecionamento no painel da Hostinger

## Confirmação Final

Após concluir o deploy e as verificações, execute um teste final de Lighthouse e compare com a pontuação anterior (66) para confirmar a melhoria significativa no desempenho.

Para qualquer problema persistente, consulte o documento `monitoring-and-troubleshooting.md` para soluções mais detalhadas.
