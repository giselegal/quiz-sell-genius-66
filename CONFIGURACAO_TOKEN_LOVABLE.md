# 🔑 GUIA COMPLETO: Configuração do Token Lovable

## 📋 PASSO A PASSO OBRIGATÓRIO:

### 1. **Obter Token do Lovable**

```
🌐 Acesse: https://lovable.dev
👤 Faça login na sua conta
⚙️ Vá para: Settings → API Tokens → Generate New Token
📋 Copie o token gerado
```

### 2. **Configurar no GitHub Secrets**

```
🔗 Acesse: https://github.com/vdp2025/quiz-sell-genius-66/settings/secrets/actions
➕ Clique em "New repository secret"
📝 Nome: LOVABLE_TOKEN
📋 Valor: [cole o token copiado do Lovable]
💾 Clique em "Add secret"
```

### 3. **Configurar Webhook (Opcional)**

```
📝 Nome: LOVABLE_WEBHOOK_URL
📋 Valor: https://api.lovable.dev/webhook/github
💾 Adicione o secret
```

## 🔧 VERIFICAR CONFIGURAÇÃO:

### Status dos Workflows:

- ✅ `lovable-sync-main.yml` (ATIVO - principal)
- 🚫 `lovable-deploy.yml.disabled` (DESABILITADO)
- 🚫 `lovable-sync.yml.disabled` (DESABILITADO)
- 🚫 `fixed-lovable-deploy.yml.disabled` (DESABILITADO)

### Scripts Unificados:

- ✅ `package.json` → `scripts/prepare-lovable.js`
- ✅ Timestamps sincronizados
- ✅ Configurações unificadas

## 🎯 APÓS CONFIGURAR O TOKEN:

1. **Teste Manual:**

```bash
# Execute no VS Code:
npm run lovable:prepare
node scripts/force-lovable-sync.js
git push origin main
```

2. **Verificação:**

- Acesse GitHub Actions para ver se o workflow executa sem erros
- Faça uma alteração no Lovable Studio
- Verifique se aparece um novo commit no GitHub

## 🚨 TROUBLESHOOTING:

### Se ainda não funcionar:

1. Verifique se o token está correto
2. Reconecte o repositório no Lovable Studio:
   - Settings → GitHub → Add Repository
   - Selecione: vdp2025/quiz-sell-genius-66
   - Enable Auto-sync

### Comandos de Emergência:

```bash
# Sincronização forçada completa:
./reativar-lovable.sh

# Reset completo:
node scripts/force-lovable-sync.js
git add . && git commit -m "🔄 Reset Lovable sync" && git push origin main
```

## ✅ CHECKLIST FINAL:

- [ ] Token LOVABLE_TOKEN configurado no GitHub
- [ ] Repositório conectado no Lovable Studio
- [ ] Auto-sync ativado nas configurações
- [ ] Workflow principal funcionando
- [ ] Workflows duplicados desabilitados

**Após completar este checklist, o Lovable funcionará perfeitamente!** 🚀
