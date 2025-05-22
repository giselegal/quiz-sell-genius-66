#!/bin/bash

# Script para importar favicons para o projeto
# Este script deve ser executado no ambiente onde os arquivos de favicon estão disponíveis

echo "Importando favicons para o projeto..."

# Verifica se o diretório de destino existe
if [ ! -d "/workspaces/quiz-sell-genius-66/public/favicon" ]; then
  mkdir -p /workspaces/quiz-sell-genius-66/public/favicon
  echo "Diretório de destino criado."
fi

# Configurar para copiar do Windows (ajuste conforme necessário)
if [ -d "C:/Users/Public/favicon" ]; then
  echo "Copiando favicons do caminho Windows..."
  cp -r "C:/Users/Public/favicon/"* /workspaces/quiz-sell-genius-66/public/favicon/
  echo "Favicons copiados com sucesso!"
else
  echo "Diretório de origem não encontrado."
  echo "Por favor, copie manualmente os arquivos de favicon para:"
  echo "/workspaces/quiz-sell-genius-66/public/favicon/"
  
  # Crie alguns placeholders para uso temporário
  echo "Criando favicons placeholder temporários..."
  
  # Touch para criar arquivos vazios
  touch /workspaces/quiz-sell-genius-66/public/favicon/favicon.ico
  touch /workspaces/quiz-sell-genius-66/public/favicon/favicon-16x16.png
  touch /workspaces/quiz-sell-genius-66/public/favicon/favicon-32x32.png
  touch /workspaces/quiz-sell-genius-66/public/favicon/apple-touch-icon.png
  touch /workspaces/quiz-sell-genius-66/public/favicon/android-chrome-192x192.png
  touch /workspaces/quiz-sell-genius-66/public/favicon/android-chrome-512x512.png
  
  echo "Arquivos placeholder criados. Substitua-os pelos reais quando possível."
fi

echo "Concluído! Os favicons estão configurados no projeto."
