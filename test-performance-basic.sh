#!/bin/bash

# Script simples para testar performance básica
echo "🚀 Testando Performance do Quiz Sell Genius"
echo "============================================="

BASE_URL="http://localhost:8081"

# Função para testar uma URL
test_url() {
    local url=$1
    local name=$2
    
    echo "📊 Testando: $name"
    echo "URL: $url"
    
    # Teste de conectividade básica
    result=$(curl -s -o /dev/null -w "HTTP: %{http_code} | Total: %{time_total}s | TTFB: %{time_starttransfer}s | Size: %{size_download}B | DNS: %{time_namelookup}s | Connect: %{time_connect}s" "$url")
    
    echo "Resultado: $result"
    
    # Teste de múltiplas requisições para medir consistência
    echo "Testando consistência (5 requisições):"
    for i in {1..5}; do
        time=$(curl -s -o /dev/null -w "%{time_total}" "$url")
        echo "  Req $i: ${time}s"
    done
    
    echo ""
}

# URLs principais para teste
echo "Testando páginas principais..."
echo ""

test_url "$BASE_URL/" "Landing Page"
test_url "$BASE_URL/quiz" "Quiz Principal" 
test_url "$BASE_URL/quiz-descubra-seu-estilo" "Quiz Descubra Seu Estilo"
test_url "$BASE_URL/resultado" "Página de Resultado"

echo "✅ Testes básicos de performance concluídos!"
echo ""
echo "📋 RESUMO DAS OBSERVAÇÕES:"
echo "- TTFB < 100ms = Excelente"
echo "- TTFB 100-300ms = Bom" 
echo "- TTFB > 300ms = Precisa melhorar"
echo ""
echo "- Total < 1s = Excelente"
echo "- Total 1-3s = Bom"
echo "- Total > 3s = Precisa melhorar"
