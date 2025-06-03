# 🚀 GUIA: Por que o site não atualizou + Como resolver

## 🔍 **PROBLEMA IDENTIFICADO:**
O deploy automático não funcionou porque o **secret `FTP_PASSWORD` não está configurado** no GitHub.

---

## ✅ **SOLUÇÃO 1: CONFIGURAR SECRET (Recomendado)**

### Passo a passo:

1. **Acesse seu repositório no GitHub:**
   ```
   https://github.com/vdp2025/quiz-sell-genius-66
   ```

2. **Vá em Settings > Secrets and variables > Actions**

3. **Clique em "New repository secret"**

4. **Configure:**
   - **Name:** `FTP_PASSWORD`  
   - **Secret:** `[Sua senha FTP da Hostinger]`

5. **Salve e teste:**
   ```bash
   git add . && git commit -m "🔧 Teste deploy automático" && git push origin main
   ```

---

## ⚡ **SOLUÇÃO 2: DEPLOY MANUAL (Imediato)**

### Use o script criado:

```bash
# 1. Fazer build
npm run build

# 2. Deploy manual
./deploy-manual.sh
```

O script vai pedir sua senha FTP e fazer upload direto.

---

## 🎯 **DEPOIS DE CONFIGURAR O SECRET:**

### Comandos para sempre usar:
```bash
# Fazer alterações no código...

# Build + Deploy automático
npm run build && git add . && git commit -m "📝 Sua mensagem" && git push origin main
```

O GitHub Actions vai:
1. ✅ Fazer build automaticamente  
2. 🚀 Deploy FTP para Hostinger
3. 🌐 Site atualizado em ~2-3 minutos

---

## 🔧 **DADOS FTP (Para referência):**
- **Servidor:** 147.93.39.155
- **Usuário:** u116045488  
- **Porta:** 21
- **Diretório:** /public_html/

---

## ⚠️ **IMPORTANTE:**
- Sempre faça `npm run build` antes de deploy
- Aguarde 2-3 minutos após push para site atualizar
- Limpe cache do navegador se não ver mudanças

---

## 🎉 **RESULTADO:**
Após configurar, cada `git push origin main` = deploy automático! 🚀
