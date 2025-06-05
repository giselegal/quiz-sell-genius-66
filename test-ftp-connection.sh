#!/bin/bash
# Script para testar conexão FTP com Hostinger

echo "🔍 Testando conexão FTP com Hostinger..."
echo "=====================================+"

# Servidores FTP comuns da Hostinger para testar
SERVERS=(
    "185.158.133.1"
    "ftp.hostinger.com"
    "files.000webhost.com"
    "giselegalvao.com.br"
)

USERNAME="u116045488.giselegalvao"

echo "📋 Testando servidores FTP disponíveis:"
echo ""

for server in "${SERVERS[@]}"; do
    echo "🔗 Testando: $server"
    
    # Verificar se o servidor responde
    if command -v nc >/dev/null 2>&1; then
        if timeout 5 nc -z "$server" 21 2>/dev/null; then
            echo "✅ $server:21 - PORTA ABERTA"
        else
            echo "❌ $server:21 - SEM RESPOSTA"
        fi
    else
        echo "⚠️  netcat não disponível para testar porta 21"
    fi
    
    # Verificar DNS
    if getent hosts "$server" >/dev/null 2>&1; then
        IP=$(getent hosts "$server" | awk '{print $1}')
        echo "🌐 DNS: $server → $IP"
    else
        echo "❌ DNS: $server não resolve"
    fi
    
    echo ""
done

echo "📝 INSTRUÇÕES PARA VERIFICAR MANUALMENTE:"
echo ""
echo "1. Acesse o painel da Hostinger"
echo "2. Vá em: Files → FTP Accounts"
echo "3. Procure por 'Server' ou 'Hostname'"
echo "4. Use esse valor no workflow"
echo ""
echo "🔧 CONFIGURAÇÃO ATUAL DOS WORKFLOWS:"
echo "   Server: 185.158.133.1"
echo "   Username: $USERNAME"
echo "   Server-dir: /u116045488/domains/giselegalvao.com.br/public_html/quiz-de-estilo/"
echo ""
echo "⚠️  Se ainda não funcionar, verifique:"
echo "   - Se a conta FTP está ativa no painel Hostinger"
echo "   - Se a senha FTP está correta no GitHub Secrets (FTP_PASSWORD)"
echo "   - Se o caminho do diretório está correto"
