#!/bin/bash

# 🚀 SCRIPT AUTOMÁTICO DE ATUALIZAÇÃO GITHUB + LOVABLE
# Uso: ./atualizar-github.sh "Mensagem do commit"
# Exemplo: ./atualizar-github.sh "✨ FEAT: Nova funcionalidade"

echo "🚀 ATUALIZANDO PROJETO PARA GITHUB + LOVABLE..."
echo "=============================================="

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na raiz do projeto!"
    exit 1
fi

# 1. Verificar status atual
echo ""
echo "📊 STATUS ATUAL:"
git status --porcelain | head -10

if [ -n "$(git status --porcelain)" ]; then
    echo "✅ Há alterações para commitar"
else
    echo "ℹ️ Nenhuma alteração detectada"
    echo "🎯 Executando build mesmo assim para verificar..."
fi

# 2. Build obrigatório
echo ""
echo "🔧 EXECUTANDO BUILD OBRIGATÓRIO..."
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ BUILD FALHOU!"
    echo "🔍 Erros encontrados. Corrija antes de continuar."
    echo "💡 Dica: Verifique sintaxe TypeScript/JSX"
    exit 1
fi

echo "✅ Build bem-sucedido!"

# 3. Adicionar alterações
echo ""
echo "📦 ADICIONANDO ALTERAÇÕES..."
git add .

# Verificar se há algo para commitar
if [ -z "$(git diff --cached --name-only)" ]; then
    echo "ℹ️ Nenhuma alteração nova para commitar"
    echo "🎉 Projeto já está atualizado!"
    exit 0
fi

# 4. Commit
echo ""
echo "💾 FAZENDO COMMIT..."
if [ -n "$1" ]; then
    COMMIT_MSG="$1"
    echo "📝 Mensagem: $COMMIT_MSG"
else
    COMMIT_MSG="🔄 AUTO: Atualização $(date +%Y-%m-%d\ %H:%M:%S)"
    echo "📝 Mensagem automática: $COMMIT_MSG"
fi

git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo "❌ Erro no commit!"
    exit 1
fi

# 5. Push para GitHub
echo ""
echo "📤 ENVIANDO PARA GITHUB..."
git push

if [ $? -ne 0 ]; then
    echo "❌ Erro no push!"
    echo "💡 Tente: git pull && git push"
    exit 1
fi

# 6. Verificações finais
echo ""
echo "🎉 ATUALIZAÇÃO CONCLUÍDA COM SUCESSO!"
echo "====================================="
echo ""
echo "📊 RESUMO:"
echo "✅ Build executado sem erros"
echo "✅ Commit criado: $COMMIT_MSG"
echo "✅ Push realizado para GitHub"
echo ""
echo "🔗 LINKS ÚTEIS:"
echo "📱 GitHub: https://github.com/vdp2025/quiz-sell-genius-66"
echo "🎨 Lovable: https://lovable.dev/@graciele"
echo ""
echo "⏰ PRÓXIMOS PASSOS:"
echo "1. Verifique se o commit apareceu no GitHub"
echo "2. Aguarde alguns minutos para sincronização"
echo "3. Verifique no Lovable se as alterações apareceram"
echo ""
echo "💡 Para ver o último commit:"
echo "   git log --oneline -1"
