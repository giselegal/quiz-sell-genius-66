# Instruções para Deploy no Hostinger

Após todas as otimizações implementadas e com todos os problemas de build corrigidos, siga estas etapas para fazer o deploy do site no Hostinger:

## 1. Preparação dos Arquivos

1. Execute o build final:
```bash
npm run build
```

2. Execute a verificação de desempenho pré-deploy:
```bash
./pre-deploy-performance-check.sh
```

3. Verifique se não há erros no build e se a verificação de desempenho está ok.

## 2. Upload dos Arquivos

### Método 1: Via FTP

1. Conecte-se ao servidor FTP do Hostinger:
   - Host: ftp.seudominio.com (substitua pelo seu domínio)
   - Usuário: seu_usuario_ftp
   - Senha: sua_senha_ftp

2. Faça upload de todos os arquivos da pasta `dist/` para a pasta raiz do seu site (geralmente `/public_html/`).

3. Renomeie `htaccess-final.txt` para `.htaccess` e faça upload para a pasta raiz.

### Método 2: Via Painel do Hostinger

1. Compacte a pasta `dist/` em um arquivo ZIP:
```bash
cd dist
zip -r ../site.zip .
```

2. No painel de controle do Hostinger, vá para "Gerenciador de Arquivos".

3. Navegue até a pasta `public_html`.

4. Faça upload do arquivo ZIP e extraia-o.

5. Faça upload do arquivo `.htaccess` separadamente (renomeando `htaccess-final.txt` para `.htaccess`).

## 3. Configurações no Painel do Hostinger

1. Verifique se as configurações de PHP estão na versão mais recente (PHP 8.1+).

2. No painel Hostinger, vá para "Websites" > Seu site > "Configurações" > "Avançado":
   - Verifique se o modo HTTPS está ativado
   - Verifique se a compressão GZIP está ativada
   - Ative o cache do navegador

## 4. Verificação Pós-Deploy

1. Teste seu site em diferentes dispositivos e navegadores.

2. Execute o teste Lighthouse novamente para verificar se o score de desempenho está 95+.

3. Verifique se as seguintes funcionalidades estão operando corretamente:
   - Navegação entre páginas
   - Formulários e interações
   - Carregamento de imagens
   - Rastreamento de eventos

## 5. Monitoramento Contínuo

1. Configure o Google Analytics para monitorar métricas de Web Vitals em tempo real.

2. Considere configurar alertas para quedas significativas de desempenho.

3. Realize testes de desempenho regularmente após atualizações do site.

---

Com todas as otimizações implementadas, o site deve alcançar um score de desempenho Lighthouse de 95+ em ambiente de produção. Se o score estiver abaixo do esperado, verifique se todos os passos de otimização foram corretamente aplicados no ambiente de produção.
