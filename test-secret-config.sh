#!/bin/bash

echo "🔍 VERIFICANDO CONFIGURAÇÃO DO SECRET FTP_PASSWORD"
echo "=================================================="

REPO_URL="https://github.com/vdp2025/quiz-sell-genius-66"

echo ""
echo "📋 CHECKLIST DE VERIFICAÇÃO:"
echo ""

echo "✅ 1. Repositório identificado:"
echo "   $REPO_URL"

echo ""
echo "✅ 2. Workflow configurado:"
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "   ✅ Arquivo .github/workflows/deploy.yml existe"
    echo "   📝 Conteúdo do secret no workflow:"
    grep -A 2 -B 2 "FTP_PASSWORD" .github/workflows/deploy.yml
else
    echo "   ❌ Arquivo .github/workflows/deploy.yml NÃO ENCONTRADO"
fi

echo ""
echo "✅ 3. Para verificar se o secret está configurado:"
echo "   🌐 Acesse: $REPO_URL/settings/secrets/actions"
echo "   🔍 Procure por: FTP_PASSWORD"
echo "   📋 Valor deve ser: GiseleG@l0809"

echo ""
echo "✅ 4. Para testar o deploy automático:"
echo "   📝 Faça uma pequena alteração em qualquer arquivo"
echo "   🚀 Execute: git add . && git commit -m 'Teste deploy' && git push"
echo "   👀 Acompanhe em: $REPO_URL/actions"

echo ""
echo "🧪 5. TESTE MANUAL DO FTP (para verificar credenciais):"
echo "   Se você quiser testar as credenciais manualmente:"
echo "   chmod +x deploy-now.sh && ./deploy-now.sh"

echo ""
echo "🎯 PRÓXIMOS PASSOS SE O SECRET ESTIVER CONFIGURADO:"
echo "1. Qualquer push para 'main' disparará deploy automático"
echo "2. Acompanhe o progresso em: $REPO_URL/actions"
echo "3. Site ficará disponível em: http://147.93.39.155"

echo ""
echo "⚠️  SE O SECRET NÃO ESTIVER CONFIGURADO:"
echo "   O workflow falhará com erro de autenticação FTP"
echo "   Você verá o erro em: $REPO_URL/actions"

echo ""
echo "🔗 LINKS ÚTEIS:"
echo "   Secrets: $REPO_URL/settings/secrets/actions"
echo "   Actions: $REPO_URL/actions"
echo "   Deploy logs: $REPO_URL/actions/workflows/deploy.yml"
