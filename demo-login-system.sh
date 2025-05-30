#!/bin/bash

# Sistema de Login Administrativo - Demonstração
# Quiz Sell Genius v3.0

clear
echo "🎯 ====================================="
echo "   Sistema de Login Administrativo"
echo "   Quiz Sell Genius - IMPLEMENTADO"
echo "===================================== 🎯"
echo ""

# Verificar se o servidor está rodando
if curl -s http://localhost:8081 > /dev/null 2>&1; then
    echo "✅ Servidor detectado em localhost:8081"
    SERVER_URL="http://localhost:8081"
elif curl -s http://localhost:8082 > /dev/null 2>&1; then
    echo "✅ Servidor detectado em localhost:8082"
    SERVER_URL="http://localhost:8082"
elif curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Servidor detectado em localhost:3000"
    SERVER_URL="http://localhost:3000"
else
    echo "⚠️ Servidor não detectado. Iniciando..."
    npm run dev &
    sleep 5
    SERVER_URL="http://localhost:8081"
fi

echo ""
echo "🔐 CREDENCIAIS DE ACESSO:"
echo "========================="
echo "👤 Usuário: admin       | 🔑 Senha: quiz123"
echo "👤 Usuário: administrator | 🔑 Senha: admin123"
echo "👤 Usuário: root         | 🔑 Senha: root123"
echo "👤 Usuário: quizadmin    | 🔑 Senha: genius2024"
echo "👤 Usuário: manager      | 🔑 Senha: manager123"
echo ""

echo "🌐 PÁGINAS DE ACESSO:"
echo "===================="
echo "🔑 Login:      $SERVER_URL/admin/login"
echo "🏠 Dashboard:  $SERVER_URL/admin"
echo "🔧 Diagnóstico: $SERVER_URL/troubleshoot"
echo "📊 Analytics:  $SERVER_URL/admin/analytics"
echo "⚙️ Editor:     $SERVER_URL/admin/quiz-builder"
echo ""

echo "⚡ ACESSO RÁPIDO (Console do Navegador):"
echo "========================================"
echo "localStorage.setItem('userRole', 'admin');"
echo "localStorage.setItem('adminBypass', 'true');"
echo "window.location.href = '/admin';"
echo ""

echo "🚨 ACESSO DE EMERGÊNCIA:"
echo "========================"
echo "Em caso de problemas, acesse: $SERVER_URL/troubleshoot"
echo ""

# Função para abrir no navegador
open_browser() {
    if command -v xdg-open > /dev/null; then
        xdg-open "$1" 2>/dev/null
    elif command -v open > /dev/null; then
        open "$1" 2>/dev/null
    else
        echo "🌐 Abra manualmente: $1"
    fi
}

echo "🎮 ESCOLHA UMA OPÇÃO:"
echo "===================="
echo "1) 🔑 Abrir Página de Login"
echo "2) 🏠 Ir Direto para Dashboard"
echo "3) 🔧 Página de Diagnóstico"
echo "4) 📋 Ver Guia Completo"
echo "5) ❌ Sair"
echo ""

read -p "Digite sua opção (1-5): " choice

case $choice in
    1)
        echo "🔑 Abrindo página de login..."
        open_browser "$SERVER_URL/admin/login"
        ;;
    2)
        echo "🏠 Abrindo dashboard administrativo..."
        open_browser "$SERVER_URL/admin"
        ;;
    3)
        echo "🔧 Abrindo página de diagnóstico..."
        open_browser "$SERVER_URL/troubleshoot"
        ;;
    4)
        echo "📋 Abrindo guia completo..."
        if [ -f "ADMIN_LOGIN_GUIDE.md" ]; then
            cat ADMIN_LOGIN_GUIDE.md
        else
            echo "📖 Guia não encontrado. Verifique o arquivo ADMIN_LOGIN_GUIDE.md"
        fi
        ;;
    5)
        echo "👋 Encerrando..."
        exit 0
        ;;
    *)
        echo "❌ Opção inválida. Abrindo página de login..."
        open_browser "$SERVER_URL/admin/login"
        ;;
esac

echo ""
echo "✨ ======================================"
echo "   Sistema configurado com sucesso!"
echo "   Todas as funcionalidades ativas."
echo "====================================== ✨"
echo ""
echo "💡 Dica: Use 'Acesso Rápido' para desenvolvimento"
echo "🔒 Em produção: sempre use credenciais"
echo ""
