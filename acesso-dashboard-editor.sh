#!/bin/bash
# Acesso Rápido ao Dashboard do Editor Visual
# Execute este script para abrir diretamente o dashboard

echo "🎨 Quiz Sell Genius - Editor Visual Dashboard"
echo "=============================================="
echo ""
echo "🚀 Iniciando servidor de desenvolvimento..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Iniciar servidor em background
echo "🔥 Iniciando servidor..."
npm run dev &
SERVER_PID=$!

# Aguardar servidor inicializar
echo "⏳ Aguardando servidor inicializar..."
sleep 5

# URLs disponíveis
echo ""
echo "🌐 URLs Disponíveis:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Dashboard:     http://localhost:5173/editor-dashboard"
echo "🎨 Editor Visual: http://localhost:5173/visual-editor"
echo "🏠 Home:          http://localhost:5173/"
echo ""

# Tentar abrir no navegador
if command -v xdg-open > /dev/null; then
    echo "🌐 Abrindo dashboard no navegador..."
    xdg-open "http://localhost:5173/editor-dashboard"
elif command -v open > /dev/null; then
    echo "🌐 Abrindo dashboard no navegador..."
    open "http://localhost:5173/editor-dashboard"
else
    echo "🌐 Abra manualmente: http://localhost:5173/editor-dashboard"
fi

echo ""
echo "✨ Dashboard do Editor Visual está pronto!"
echo "📝 Para parar o servidor: Ctrl+C"
echo ""

# Aguardar interrupção
trap "echo ''; echo '🛑 Parando servidor...'; kill $SERVER_PID 2>/dev/null; exit 0" INT

# Manter script rodando
wait $SERVER_PID
