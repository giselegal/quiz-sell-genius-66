#!/bin/bash

# Script para encontrar componentes que usam Sliders sem importação adequada
echo "Verificando arquivos que usam 'Sliders' como componente..."

# Encontra arquivos que contêm referências ao componente Sliders
FILES=$(grep -l "<Sliders" --include="*.tsx" --include="*.jsx" -r src/)
echo "$FILES"

# Verifica se esses arquivos importam o componente Sliders
echo -e "\nVerificando importações adequadas..."
for file in $FILES; do
  if ! grep -q "import.*Sliders.*from" "$file"; then
    echo "⚠️  ATENÇÃO: $file usa o componente Sliders, mas não parece importá-lo corretamente"
  else
    echo "✅ $file: importação parece correta"
  fi
done
