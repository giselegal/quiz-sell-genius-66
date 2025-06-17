#!/bin/bash

# Script para corrigir todas as importações de Sliders nos componentes
echo "Corrigindo importações do componente Sliders..."

# Arquivo 1: ModernVisualEditor.tsx
if grep -q "import {.*} from \"lucide-react\";" src/components/visual-editor/ModernVisualEditor.tsx; then
  # Se importação de lucide-react já existe, adicionar Sliders se não estiver presente
  if ! grep -q "import {.*Sliders.*} from \"lucide-react\";" src/components/visual-editor/ModernVisualEditor.tsx; then
    sed -i 's/import {/import { Sliders, /g' src/components/visual-editor/ModernVisualEditor.tsx
    echo "✅ Adicionado Sliders à importação existente em ModernVisualEditor.tsx"
  else
    echo "✓ ModernVisualEditor.tsx já tem importação de Sliders"
  fi
else
  # Se não existe importação de lucide-react, adicionar
  sed -i '1s/^/import { Sliders } from "lucide-react";\n/' src/components/visual-editor/ModernVisualEditor.tsx
  echo "✅ Adicionada nova importação de Sliders em ModernVisualEditor.tsx"
fi

# Arquivo 2: ModernConfigurationPanel.tsx
if grep -q "import {.*} from \"lucide-react\";" src/components/visual-editor/panels/ModernConfigurationPanel.tsx; then
  # Se importação de lucide-react já existe, adicionar Sliders se não estiver presente
  if ! grep -q "import {.*Sliders.*} from \"lucide-react\";" src/components/visual-editor/panels/ModernConfigurationPanel.tsx; then
    sed -i 's/import {/import { Sliders, /g' src/components/visual-editor/panels/ModernConfigurationPanel.tsx
    echo "✅ Adicionado Sliders à importação existente em ModernConfigurationPanel.tsx"
  else
    echo "✓ ModernConfigurationPanel.tsx já tem importação de Sliders"
  fi
else
  # Se não existe importação de lucide-react, adicionar
  sed -i '1s/^/import { Sliders } from "lucide-react";\n/' src/components/visual-editor/panels/ModernConfigurationPanel.tsx
  echo "✅ Adicionada nova importação de Sliders em ModernConfigurationPanel.tsx"
fi

# Arquivo 3: AdvancedControlsPanel.tsx
if grep -q "import {.*} from \"lucide-react\";" src/components/visual-editor/panels/AdvancedControlsPanel.tsx; then
  # Se importação de lucide-react já existe, adicionar Sliders se não estiver presente
  if ! grep -q "import {.*Sliders.*} from \"lucide-react\";" src/components/visual-editor/panels/AdvancedControlsPanel.tsx; then
    sed -i 's/import {/import { Sliders, /g' src/components/visual-editor/panels/AdvancedControlsPanel.tsx
    echo "✅ Adicionado Sliders à importação existente em AdvancedControlsPanel.tsx"
  else
    echo "✓ AdvancedControlsPanel.tsx já tem importação de Sliders"
  fi
else
  # Se não existe importação de lucide-react, adicionar
  sed -i '1s/^/import { Sliders } from "lucide-react";\n/' src/components/visual-editor/panels/AdvancedControlsPanel.tsx
  echo "✅ Adicionada nova importação de Sliders em AdvancedControlsPanel.tsx"
fi

echo "Concluído!"
