#!/bin/bash

# 🚀 Script de Deploy Manual para Hostinger
# Use este script enquanto não configura o secret FTP_PASSWORD no GitHub

echo "🚀 DEPLOY MANUAL PARA HOSTINGER"
echo "================================"

# Configurações FTP
FTP_SERVER="147.93.39.155"
FTP_USER="u116045488"
FTP_DIR="/public_html/"

# Verificar se a pasta dist existe
if [ ! -d "dist" ]; then
    echo "❌ Pasta dist não encontrada. Executando build..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Erro no build. Verifique os erros acima."
        exit 1
    fi
fi

echo "📦 Pasta dist encontrada ($(du -sh dist | cut -f1))"

# Solicitar senha FTP
echo ""
echo "🔑 Digite a senha FTP da Hostinger para o usuário $FTP_USER:"
read -s FTP_PASS

if [ -z "$FTP_PASS" ]; then
    echo "❌ Senha não fornecida. Deploy cancelado."
    exit 1
fi

echo ""
echo "🔄 Iniciando upload FTP..."
echo "📡 Servidor: $FTP_SERVER"
echo "👤 Usuário: $FTP_USER"
echo "📁 Destino: $FTP_DIR"

# Criar script FTP temporário
cat > /tmp/ftp_upload.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
binary
cd $FTP_DIR
lcd dist
prompt off
mput *
mput .*
cd assets
lcd assets
mput *
quit
EOF

# Executar upload FTP
ftp -n < /tmp/ftp_upload.txt

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOY CONCLUÍDO COM SUCESSO!"
    echo "🌐 Site atualizado na Hostinger"
    echo "🔗 Aguarde alguns minutos para propagação"
else
    echo ""
    echo "❌ Erro no deploy FTP"
    echo "🔍 Verifique: servidor, usuário, senha, conexão"
fi

# Limpar arquivo temporário
rm -f /tmp/ftp_upload.txt

echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configurar FTP_PASSWORD no GitHub: Settings > Secrets > Actions"
echo "2. Usar: git push origin main (deploy automático)"
