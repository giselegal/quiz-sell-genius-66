# 🚀 INTEGRAÇÃO GITHUB + HOSTINGER - GUIA COMPLETO

## 🎯 OBJETIVO
Conectar o repositório GitHub diretamente à Hostinger para deploy automático, eliminando problemas de FTP.

## ✅ VANTAGENS DA INTEGRAÇÃO GITHUB
- ✅ **Deploy automático** a cada push/merge
- ✅ **Sem problemas de FTP** ou permissões
- ✅ **Build automático** na Hostinger
- ✅ **Rollback fácil** para versões anteriores
- ✅ **SSL automático** configurado
- ✅ **Domínio personalizado** fácil configuração

## 🔧 PASSO A PASSO - HOSTINGER

### 1. ACESSAR PAINEL HOSTINGER
1. Acesse: https://hpanel.hostinger.com
2. Faça login com suas credenciais

### 2. CRIAR NOVO WEBSITE COM GITHUB
1. No painel principal, clique em **"Websites"**
2. Clique em **"+ Create Website"** ou **"Add New Website"**
3. Selecione **"GitHub Integration"** ou **"Connect GitHub"**

### 3. CONECTAR REPOSITÓRIO
1. **Autorizar Hostinger** no GitHub (se ainda não autorizado)
2. **Selecionar repositório**: `quiz-sell-genius-66`
3. **Branch**: `main` (ou branch de produção)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### 4. CONFIGURAÇÕES DE BUILD
```yaml
# Configurações que você deve definir na Hostinger:
Node Version: 18.x ou 20.x
Build Command: npm run build
Install Command: npm install
Output Directory: dist
Environment Variables:
  - NODE_ENV=production
  - VITE_BUILD_MODE=production
```

### 5. CONFIGURAR DOMÍNIO
1. Após deploy bem-sucedido, vá em **"Domains"**
2. **Adicionar domínio personalizado** (ex: giselegalvao.com.br)
3. **Configurar DNS** para apontar para Hostinger
4. **Ativar SSL** (automático)

## 🌐 CONFIGURAÇÃO DE DNS

### Se você tem domínio próprio:
1. **No seu provedor de domínio** (Registro.br, GoDaddy, etc.)
2. **Alterar nameservers** para Hostinger:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   OU configurar registros A:
   ```
   A @ 147.93.39.155
   A www 147.93.39.155
   ```

## 📋 PREPARAÇÃO DO REPOSITÓRIO

### 1. Verificar package.json
Certifique-se que tem os scripts corretos:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 2. Criar/Verificar .gitignore
```
node_modules/
dist/
.env.local
.env.*.local
```

### 3. Commit e Push das alterações
```bash
git add .
git commit -m "Preparação para deploy Hostinger + GitHub"
git push origin main
```

## 🎯 CONFIGURAÇÕES ESPECÍFICAS HOSTINGER

### Build Settings na Hostinger:
```yaml
Framework: Vite
Node Version: 18.x
Build Command: npm run build
Install Command: npm install
Output Directory: dist
Environment Variables:
  NODE_ENV: production
  VITE_BUILD_MODE: production
```

### Environment Variables importantes:
- `NODE_ENV=production`
- `VITE_BUILD_MODE=production`
- Adicione outras variáveis se necessário

## 🔍 VERIFICAÇÕES PÓS-DEPLOY

### 1. Build Logs
- Verifique logs de build na Hostinger
- Confirme que `npm install` e `npm run build` executaram com sucesso

### 2. Teste do Site
- Acesse URL temporária da Hostinger
- Teste todas as rotas principais
- Verifique console do browser por erros

### 3. SSL e Domínio
- Confirme que SSL está ativo
- Teste redirects HTTP → HTTPS
- Verifique domínio personalizado

## 🚨 SOLUÇÃO DE PROBLEMAS COMUNS

### Build Falha
```bash
# Se build falhar, verifique:
1. package.json tem script "build"
2. Todas dependências estão no package.json
3. Não há erros no código
4. Node version compatível
```

### Rotas SPA não funcionam
```bash
# Criar _redirects na pasta public/
/*    /index.html   200
```

### Assets não carregam
```bash
# Verificar vite.config.js:
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist'
  }
})
```

## 🎉 PASSOS FINAIS

### 1. Primeiro Deploy
1. **Conectar GitHub** na Hostinger
2. **Aguardar build** (5-10 minutos)
3. **Verificar site** na URL temporária
4. **Configurar domínio** personalizado

### 2. Deploys Futuros
- **Automático**: A cada push na branch main
- **Manual**: Trigger rebuild na Hostinger
- **Rollback**: Reverter para commit anterior

### 3. Monitoramento
- **Build status** no painel Hostinger
- **Logs de deploy** para debugging
- **Analytics** e performance

## 📞 SUPORTE

### Se precisar de ajuda:
1. **Documentação Hostinger**: https://support.hostinger.com
2. **Chat Suporte**: Disponível 24/7 no painel
3. **GitHub Integration**: Seção específica na documentação

## 🎯 VANTAGENS IMEDIATAS

✅ **Sem mais FTP** - Deploy direto do GitHub
✅ **Build automático** - Sempre a versão mais recente
✅ **SSL grátis** - Certificado automático
✅ **Domínio fácil** - Configuração simplificada
✅ **Rollback simples** - Voltar versões anteriores
✅ **Logs completos** - Debug mais fácil

---

🚀 **RESULTADO**: Site funcionando automaticamente a cada push no GitHub!
