#!/bin/bash

# 🚀 Script de Deploy DIRETO para Hostinger
# Com credenciais configuradas - USE APENAS PARA TESTE

echo "🚀 DEPLOY DIRETO PARA HOSTINGER"
echo "==============================="

# Configurações FTP (já configuradas)
FTP_SERVER="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"
FTP_DIR="/"

# Verificar se a pasta dist existe
if [ ! -d "dist" ]; then
    echo "❌ Pasta dist não encontrada. Executando build..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Erro no build. Verifique os erros acima."
        exit 1
    fi
fi

BUILD_SIZE=$(du -sh dist | cut -f1)
echo "📦 Pasta dist encontrada ($BUILD_SIZE)"

echo ""
echo "🔄 Iniciando upload FTP..."
echo "📡 Servidor: $FTP_SERVER"
echo "👤 Usuário: $FTP_USER"
echo "📁 Destino: $FTP_DIR"

# Instalar lftp se não existir (mais confiável que ftp)
if ! command -v lftp &> /dev/null; then
    echo "📥 Instalando lftp..."
    sudo apt-get update && sudo apt-get install -y lftp
fi

# Upload usando lftp (mais robusto) - SEM --delete para evitar erros de permissão
lftp -c "
set ssl:verify-certificate false
set ftp:list-options -a
open ftp://$FTP_USER:$FTP_PASS@$FTP_SERVER
cd $FTP_DIR
lcd dist
mirror --reverse --verbose --exclude-glob .git* --exclude-glob error_log* --exclude-glob mail.log --exclude-glob .logs .
bye
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOY CONCLUÍDO COM SUCESSO!"
    echo "🌐 Site atualizado na Hostinger"
    echo "🔗 Teste agora: [Seu domínio da Hostinger]"
    echo ""
    echo "📊 Estatísticas:"
    echo "   - Build size: $BUILD_SIZE"
    echo "   - Servidor: $FTP_SERVER"
    echo "   - Diretório: $FTP_DIR"
else
    echo ""
    echo "❌ Erro no deploy FTP"
    echo "🔍 Verifique conexão de internet"
fi

echo ""
echo "🔒 IMPORTANTE: Configure o secret FTP_PASSWORD no GitHub para deploy automático!"
echo "   Settings > Secrets and variables > Actions > New repository secret"
echo "   Name: FTP_PASSWORD | Value: GiseleG@l0809"
