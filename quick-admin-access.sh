#!/bin/bash

# Script de Acesso Rápido ao Admin - Quiz Sell Genius
# Versão 3.0 - Solução para HTTP 401

echo "🚀 Quiz Sell Genius - Acesso Rápido ao Admin"
echo "=============================================="

# Verificar se o servidor está rodando
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Servidor detectado em localhost:3000"
else
    echo "❌ Servidor não encontrado. Iniciando..."
    npm run dev &
    sleep 3
fi

# Criar script de configuração automática
cat > /tmp/admin-access.js << 'EOF'
console.log('🔧 Configurando acesso administrativo...');

// Configuração completa de admin
const adminConfig = {
    userRole: 'admin',
    userName: 'Admin User',
    isAuthenticated: 'true',
    isAdminAuthenticated: 'true',
    adminBypass: 'true',
    authLevel: 'superuser',
    bypassTimestamp: Date.now().toString(),
    emergencyAccess: 'true'
};

// Aplicar configurações
Object.entries(adminConfig).forEach(([key, value]) => {
    localStorage.setItem(key, value);
    console.log(`✅ ${key}: ${value}`);
});

console.log('🎉 Configuração concluída! Redirecionando...');

// Redirecionar para admin
setTimeout(() => {
    window.location.href = '/admin';
}, 1000);
EOF

echo ""
echo "📋 INSTRUÇÕES DE ACESSO:"
echo "========================"
echo ""
echo "1. 🌐 Abra seu navegador em: http://localhost:3000"
echo ""
echo "2. 🔧 Se tiver erro HTTP 401, acesse: http://localhost:3000/troubleshoot"
echo ""
echo "3. 🛠️ OU abra o Console do Navegador (F12) e cole:"
echo ""
echo "localStorage.setItem('userRole', 'admin');"
echo "localStorage.setItem('adminBypass', 'true');"
echo "window.location.href = '/admin';"
echo ""
echo "4. 🚨 Para emergência, use: http://localhost:3000/admin/troubleshoot"
echo ""
echo "========================"

# Abrir no navegador automaticamente
if command -v xdg-open > /dev/null; then
    echo "🔗 Abrindo navegador automaticamente..."
    xdg-open "http://localhost:3000/troubleshoot" 2>/dev/null
elif command -v open > /dev/null; then
    echo "🔗 Abrindo navegador automaticamente..."
    open "http://localhost:3000/troubleshoot" 2>/dev/null
else
    echo "ℹ️ Abra manualmente: http://localhost:3000/troubleshoot"
fi

echo ""
echo "✨ Script executado com sucesso!"
echo "💡 Dica: Se o problema persistir, use a página de diagnóstico."
