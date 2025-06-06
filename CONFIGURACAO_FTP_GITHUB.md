# 🚀 Configuração FTP GitHub + Hostinger - GUIA COMPLETO

## 🚨 **ERRO TIMEOUT - SOLUÇÕES IMPLEMENTADAS**

### **Problema identificado:**

```
Error: Timeout (control socket)
Failed to connect, are you sure your server works via FTP or FTPS?
```

### **Soluções aplicadas:**

1. **✅ Workflow com múltiplas tentativas:**

   - Tentativa 1: IP (147.93.39.155)
   - Tentativa 2: Domínio (giselegalvao.com.br)
   - Tentativa 3: FTPS (protocolo seguro)

2. **✅ Workflow SFTP alternativo:**

   - Arquivo: `deploy-sftp-hostinger.yml`
   - Usa SFTP (porta 22) em vez de FTP (porta 21)
   - Mais comum em hospedagens modernas

3. **✅ Script de verificação:**
   - Execute: `./verificar-ftp-hostinger.sh`
   - Guia para verificar configurações no painel Hostinger

### **Como verificar configurações corretas:**

1. **Acesse o painel da Hostinger**
2. **Files → FTP Accounts**
3. **Anote:**
   - Server/Host (pode ser diferente de 185.158.133.1)
   - Port (21 para FTP, 22 para SFTP)
   - Protocol (FTP, FTPS ou SFTP)

## ✅ **CONFIGURAÇÕES APLICADAS**

### **1. GitHub Secrets Necessários:**

- `FTP_PASSWORD` - Senha do FTP da Hostinger

### **2. Configurações do Workflow:**

- **Server:** `147.93.39.155` (IP correto da Hostinger)
- **Username:** `u116045488`
- **Diretório:** `/home/u116045488/domains/giselegalvao.com.br/public_html/`
- **Action:** `SamKirkland/FTP-Deploy-Action@v4.3.5`

### **3. Scripts Automáticos:**

- ✅ **Pre-deploy checks:** `./pre-deploy-performance-check.sh`
- ✅ **Deploy preparation:** `./scripts/deploy-prepare.sh`
- ✅ **Post-deploy verification** incluída

## 🔧 **PASSO A PASSO PARA CONFIGURAR**

### **1. No GitHub:**

1. Vá para seu repositório → **Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret**
4. Name: `FTP_PASSWORD`
5. Value: `sua_senha_ftp_da_hostinger`
6. **Add secret**

### **2. Workflow Configurado:**

O arquivo `.github/workflows/deploy-to-hostinger.yml` está configurado com:

- Verificações de performance pré-deploy
- Build otimizado
- Preparação automática dos arquivos
- Deploy para o diretório correto
- Verificação pós-deploy

### **3. Testar o Deploy:**

```bash
# Push para main para acionar o workflow
git add .
git commit -m "feat: configuração FTP otimizada"
git push origin main
```

## 📋 **CHECKLIST DE VERIFICAÇÃO**

- [ ] Secret `FTP_PASSWORD` configurado no GitHub
- [ ] Workflow atualizado com IP correto (147.93.39.155)
- [ ] Scripts com permissão de execução
- [ ] Diretório de destino correto configurado
- [ ] Exclusões de arquivos desnecessários configuradas

## 🎯 **URLs PARA TESTAR APÓS DEPLOY**

- **Página Principal:** https://giselegalvao.com.br/
- **Página de Resultado:** https://giselegalvao.com.br/resultado
- **Página de Venda:** https://giselegalvao.com.br/quiz-descubra-seu-estilo

## 🚨 **TROUBLESHOOTING**

### **Se o deploy falhar:**

1. Verifique se o secret `FTP_PASSWORD` está correto
2. Confirme se o IP 147.93.39.155 ainda é válido
3. Verifique os logs do GitHub Actions
4. Teste a conexão FTP manualmente

### **Se o site não carregar:**

1. Verifique se o `.htaccess` foi enviado corretamente
2. Confirme se os arquivos estão no diretório correto
3. Teste no painel da Hostinger se os arquivos estão lá

## 📊 **MONITORAMENTO**

Após cada deploy, execute:

1. **Lighthouse** para verificar performance
2. **Teste funcional** das páginas principais
3. **Verificação do Google Analytics** para eventos

---

**Última atualização:** $(date)
**Status:** Configuração otimizada e pronta para uso
