
#!/bin/bash

# Script para testar o webhook Facebook
# Este script simula um webhook do Facebook para testar a integração

echo "🔗 Testando Webhook Facebook..."

# URL do webhook - SEU DOMÍNIO
WEBHOOK_URL="https://giselegalvao.com.br/api/webhook/facebook"

# Para testar localmente, descomente a linha abaixo:
# WEBHOOK_URL="http://localhost:5173/api/webhook/facebook"

# Dados de teste do webhook Facebook
WEBHOOK_DATA='{
  "object": "page",
  "entry": [
    {
      "id": "123456789",
      "time": '$(date +%s)',
      "changes": [
        {
          "field": "leadgen",
          "value": {
            "leadgen_id": "123456789",
            "page_id": "987654321",
            "form_id": "456789123",
            "adgroup_id": "789123456",
            "ad_id": "321654987",
            "created_time": "'$(date -Iseconds)'"
          }
        }
      ]
    }
  ]
}'

echo "📡 Enviando requisição para: $WEBHOOK_URL"
echo "📦 Dados: $WEBHOOK_DATA"

# Enviar requisição POST
response=$(curl -X POST \
  "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "$WEBHOOK_DATA" \
  -w "HTTP_STATUS:%{http_code}" \
  -s)

# Extrair status HTTP
http_status=$(echo "$response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
response_body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*$//')

echo ""
echo "📋 Resposta:"
echo "Status HTTP: $http_status"
echo "Body: $response_body"

if [ "$http_status" = "200" ]; then
    echo "✅ Teste bem-sucedido! Webhook Facebook funcionando corretamente."
else
    echo "❌ Teste falhou. Status HTTP: $http_status"
    echo "Verifique se o endpoint está funcionando e se a URL está correta."
fi

echo ""
echo "🔍 Para testar verificação do webhook:"
echo "curl \"$WEBHOOK_URL?hub.mode=subscribe&hub.verify_token=facebook_webhook_verify_token_123&hub.challenge=test_challenge\""

echo ""
echo "🔍 Para testar em produção, substitua WEBHOOK_URL pelo seu domínio real."
echo "🔍 Para testar localmente, rode 'npm run dev' e use http://localhost:3000"
