# 🚀 Configuração FTP GitHub + Hostinger - GUIA COMPLETO

## ✅ **CONFIGURAÇÕES APLICADAS**

### **1. GitHub Secrets Necessários:**

- `FTP_PASSWORD` - Senha do FTP da Hostinger

### **2. Configurações do Workflow:**

- **Server:** `185.158.133.1` (IP correto da Hostinger)
- **Username:** `u116045488.giselegalvao`
- **Diretório:** `/u116045488/domains/giselegalvao.com.br/public_html/`
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
- [ ] Workflow atualizado com IP correto (185.158.133.1)
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
2. Confirme se o IP 185.158.133.1 ainda é válido
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
