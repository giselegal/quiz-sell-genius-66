
# Configuração para Facebook Webhook no Lovable/Vercel

## 📋 Status da Configuração

✅ **Frontend Integrado**: Sistema de webhook completamente implementado  
✅ **API Endpoint Criado**: `/api/webhook/facebook.ts` configurado  
✅ **Netlify Function**: `netlify/functions/facebook-webhook.ts` criado  
✅ **Script de Teste**: `test-facebook-webhook.sh` para validação  
✅ **Conversions API**: Integração bidirecional implementada  

## 🔗 URLs do Webhook

**Produção**: `https://giselegalvao.com.br/api/webhook/facebook`  
**Local**: `http://localhost:3000/api/webhook/facebook`  
**Netlify**: `https://seudominio.netlify.app/.netlify/functions/facebook-webhook`  

## ⚙️ Configuração no Facebook Business Manager

### 1. Criar App no Facebook Developers

1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Clique em **"My Apps"** → **"Create App"**
3. Selecione **"Business"** como tipo de app
4. Preencha os dados do app

### 2. Configurar Webhooks

1. No painel do app, vá em **"Webhooks"**
2. Clique em **"Edit Subscription"** para Page
3. Configure:
   - **Callback URL**: `https://giselegalvao.com.br/api/webhook/facebook`
   - **Verify Token**: `facebook_webhook_verify_token_123`
   - **Subscription Fields**:
     - ✅ `leadgen` (para captura de leads)
     - ✅ `conversions` (para tracking de conversões)
     - ✅ `feed` (para mudanças no feed)

### 3. Configurar Conversions API

1. Vá em **"Marketing API"** → **"Conversions API"**
2. Gere um **Access Token** com permissões:
   - `ads_management`
   - `business_management`
3. Configure os dados de teste

## 🔑 Variáveis de Ambiente Necessárias

```env
FACEBOOK_APP_SECRET=seu_app_secret_aqui
FACEBOOK_ACCESS_TOKEN=seu_access_token_aqui
FACEBOOK_WEBHOOK_VERIFY_TOKEN=facebook_webhook_verify_token_123
```

## 🧪 Como Testar

### Teste Local:

```bash
# 1. Iniciar servidor de desenvolvimento
npm run dev

# 2. Em outro terminal, executar teste
./test-facebook-webhook.sh
```

### Teste de Verificação:

```bash
curl "https://giselegalvao.com.br/api/webhook/facebook?hub.mode=subscribe&hub.verify_token=facebook_webhook_verify_token_123&hub.challenge=test_challenge"
```

### Teste em Produção:

```bash
# Editar test-facebook-webhook.sh e alterar WEBHOOK_URL para seu domínio
# Depois executar:
./test-facebook-webhook.sh
```

## 📊 Monitoramento

Os logs do webhook aparecerão:

- **Localmente**: No terminal onde roda `npm run dev`
- **Produção**: No painel do Lovable/Vercel (seção Functions/Logs)
- **Facebook**: Facebook Business Manager → Events Manager → Diagnostics

## 🔧 Funcionalidades Implementadas

1. **Verificação de Webhook**: Sistema de verificação automática do Facebook
2. **Processamento de Leads**: Captura automática de leads gerados
3. **Tracking de Conversões**: Processamento de eventos de conversão
4. **Conversions API**: Envio bidirecional de dados para o Facebook
5. **Validação de Segurança**: Verificação HMAC SHA256 das requisições
6. **Armazenamento Local**: Dados armazenados para analytics offline

## 📁 Arquivos Importantes

- `/api/webhook/facebook.ts` - Endpoint principal da API
- `/netlify/functions/facebook-webhook.ts` - Function para Netlify
- `/src/utils/facebookWebhook.ts` - Sistema de gerenciamento
- `test-facebook-webhook.sh` - Script de teste
- Integração com `/src/services/pixelManager.ts` existente

## 🎯 Integração com Sistema Existente

O webhook do Facebook está **100% integrado** com:

✅ **Sistema de Pixels A/B**: Usa automaticamente o pixel correto baseado na rota  
✅ **Pixel Manager**: Aproveita toda a infraestrutura existente  
✅ **UTM Tracking**: Mantém compatibilidade com sistema de UTMs  
✅ **Analytics**: Registra eventos no sistema de analytics atual  

## 📈 Próximos Passos

1. **Configurar no Facebook Business Manager** usando as URLs acima
2. **Adicionar variáveis de ambiente** com tokens do Facebook
3. **Testar webhooks** usando os scripts fornecidos
4. **Monitorar logs** para validar funcionamento
5. **Integrar com campanhas** do Facebook Ads

O sistema está pronto para receber webhooks do Facebook! 🚀
