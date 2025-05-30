#!/bin/bash

echo "🧪 TESTE AUTOMÁTICO - Página /resultado"
echo "======================================"

# Verificar se o servidor está rodando
echo "1. Verificando servidor..."
if curl -s http://localhost:8080/ > /dev/null; then
    echo "✅ Servidor está rodando na porta 8080"
else
    echo "❌ Servidor não está respondendo"
    echo "   Iniciando servidor..."
    npm run dev &
    echo "   Aguardando servidor iniciar..."
    sleep 5
fi

# Preparar dados de teste usando JavaScript no navegador
echo ""
echo "2. Preparando dados de teste..."

# Criar arquivo JavaScript temporário para executar no navegador
cat > /tmp/setup_test_data.js << 'EOF'
// Script para preparar dados de teste para a página /resultado
console.log("🧪 Preparando dados de teste...");

// Limpar dados anteriores
localStorage.clear();
sessionStorage.clear();

// Dados do usuário
const userName = 'Teste Automático';

// Resultado do quiz
const quizResult = {
    primaryStyle: {
        category: 'Natural',
        name: 'Natural',
        percentage: 87,
        description: 'Você possui um estilo natural e autêntico.'
    },
    secondaryStyles: [
        { category: 'Romântico', percentage: 73, name: 'Romântico' },
        { category: 'Clássico', percentage: 68, name: 'Clássico' }
    ],
    userName: userName,
    completedAt: new Date().toISOString(),
    timestamp: Date.now()
};

// Formato alternativo
const quizResults = {
    primaryStyle: { category: 'Natural', percentage: 87 },
    secondaryStyles: [
        { category: 'Romântico', percentage: 73 },
        { category: 'Clássico', percentage: 68 }
    ]
};

// Salvar dados
localStorage.setItem('userName', userName);
localStorage.setItem('quiz_result', JSON.stringify(quizResult));
localStorage.setItem('quizResults', JSON.stringify(quizResults));

// Session storage
sessionStorage.setItem('introCompleted', 'true');
sessionStorage.setItem('quizCompleted', 'true');

console.log("✅ Dados de teste criados:");
console.log("   - userName:", userName);
console.log("   - primaryStyle:", quizResult.primaryStyle.category);
console.log("   - percentage:", quizResult.primaryStyle.percentage + "%");

// Verificar se os dados foram salvos
const savedUserName = localStorage.getItem('userName');
const savedResult = localStorage.getItem('quiz_result');

if (savedUserName && savedResult) {
    console.log("✅ Verificação: dados salvos corretamente");
    
    // Aguardar um momento e redirecionar
    setTimeout(() => {
        console.log("🎯 Navegando para /resultado...");
        window.location.href = '/resultado';
    }, 1000);
} else {
    console.error("❌ Erro: dados não foram salvos corretamente");
}
EOF

echo "✅ Script de dados criado"

# Criar página HTML temporária que executará o script
echo ""
echo "3. Criando página de setup..."

cat > /workspaces/quiz-sell-genius-66/setup-and-test.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup e Teste - Página Resultado</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: rgba(255,255,255,0.95);
            color: #333;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
        }
        .status {
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            font-weight: bold;
        }
        .success { background: #d4edda; color: #155724; }
        .loading { background: #d1ecf1; color: #0c5460; }
        .error { background: #f8d7da; color: #721c24; }
        .countdown {
            font-size: 24px;
            font-weight: bold;
            color: #B89B7A;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Setup Automático - Teste da Página Resultado</h1>
        <div id="status" class="status loading">
            ⏳ Preparando dados de teste...
        </div>
        <div id="countdown"></div>
        <div id="details"></div>
    </div>

    <script>
        console.log("🧪 Iniciando setup automático...");
        
        function updateStatus(message, type = 'loading') {
            const statusDiv = document.getElementById('status');
            statusDiv.className = 'status ' + type;
            statusDiv.innerHTML = message;
        }
        
        function updateDetails(message) {
            document.getElementById('details').innerHTML = message;
        }

        // Executar setup
        async function runSetup() {
            try {
                updateStatus("🗑️ Limpando dados anteriores...");
                await sleep(500);
                
                localStorage.clear();
                sessionStorage.clear();
                
                updateStatus("📝 Criando dados de teste...");
                await sleep(800);
                
                const userName = 'Ana Silva Teste';
                const quizResult = {
                    primaryStyle: {
                        category: 'Natural',
                        name: 'Natural',
                        percentage: 89,
                        description: 'Você possui um estilo natural e autêntico que valoriza a simplicidade elegante.'
                    },
                    secondaryStyles: [
                        { category: 'Romântico', percentage: 76, name: 'Romântico' },
                        { category: 'Clássico', percentage: 71, name: 'Clássico' },
                        { category: 'Boho', percentage: 48, name: 'Boho' }
                    ],
                    userName: userName,
                    completedAt: new Date().toISOString(),
                    timestamp: Date.now()
                };

                const quizResults = {
                    primaryStyle: { category: 'Natural', percentage: 89 },
                    secondaryStyles: [
                        { category: 'Romântico', percentage: 76 },
                        { category: 'Clássico', percentage: 71 }
                    ]
                };

                localStorage.setItem('userName', userName);
                localStorage.setItem('quiz_result', JSON.stringify(quizResult));
                localStorage.setItem('quizResults', JSON.stringify(quizResults));
                sessionStorage.setItem('introCompleted', 'true');
                sessionStorage.setItem('quizCompleted', 'true');
                
                updateStatus("✅ Dados criados com sucesso!", 'success');
                updateDetails(`
                    <p><strong>Nome:</strong> ${userName}</p>
                    <p><strong>Estilo:</strong> ${quizResult.primaryStyle.category}</p>
                    <p><strong>Compatibilidade:</strong> ${quizResult.primaryStyle.percentage}%</p>
                `);
                
                await sleep(1000);
                
                updateStatus("🔍 Verificando dados...");
                await sleep(500);
                
                const savedUserName = localStorage.getItem('userName');
                const savedResult = localStorage.getItem('quiz_result');
                
                if (savedUserName && savedResult) {
                    updateStatus("✅ Verificação concluída! Redirecionando...", 'success');
                    
                    // Countdown para redirecionamento
                    let countdown = 3;
                    const countdownDiv = document.getElementById('countdown');
                    
                    const countdownInterval = setInterval(() => {
                        countdownDiv.innerHTML = `<div class="countdown">Redirecionando em ${countdown}s</div>`;
                        countdown--;
                        
                        if (countdown < 0) {
                            clearInterval(countdownInterval);
                            window.location.href = '/resultado';
                        }
                    }, 1000);
                    
                } else {
                    updateStatus("❌ Erro: dados não foram salvos corretamente", 'error');
                }
                
            } catch (error) {
                updateStatus("❌ Erro durante o setup: " + error.message, 'error');
                console.error("Erro:", error);
            }
        }
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        // Iniciar setup automaticamente
        window.onload = () => {
            runSetup();
        };
    </script>
</body>
</html>
EOF

echo "✅ Página de setup criada"

echo ""
echo "4. Abrindo navegador..."
echo ""
echo "🎯 INSTRUÇÕES:"
echo "   1. A página de setup será aberta automaticamente"
echo "   2. Ela criará os dados de teste necessários"
echo "   3. Redirecionará automaticamente para /resultado"
echo ""
echo "📱 URL de acesso direto: http://localhost:8080/setup-and-test.html"
echo ""

# Se estiver em um ambiente com navegador
if command -v xdg-open > /dev/null; then
    echo "🌐 Abrindo navegador..."
    xdg-open "http://localhost:8080/setup-and-test.html"
elif command -v open > /dev/null; then
    echo "🌐 Abrindo navegador..."
    open "http://localhost:8080/setup-and-test.html"
else
    echo "⚠️  Abra manualmente: http://localhost:8080/setup-and-test.html"
fi

echo ""
echo "✅ Teste automático configurado!"
echo "   Se a página não abrir, acesse: http://localhost:8080/setup-and-test.html"
