import fs from 'fs';
import path from 'path';

// Lista de componentes para marcar
const componentsToMark = [
  'src/components/QuizQuestion.tsx',
  'src/pages/admin/editors/ResultPageEditor.tsx',
  'src/components/result-editor/ResultPageEditorWithControls.tsx',
  'src/components/QuizOfferPage.tsx',
  'src/components/QuizWelcome.tsx'
];

// Verificar se os arquivos existem e marcá-los
componentsToMark.forEach(componentPath => {
  if (fs.existsSync(componentPath)) {
    console.log(`Marcando componente: ${componentPath}`);
    
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Verificar se o componente já está marcado
    if (!content.includes('// @lovable')) {
      const newContent = `// @lovable\n${content}`;
      fs.writeFileSync(componentPath, newContent);
      console.log(`✅ Componente marcado com sucesso: ${componentPath}`);
    } else {
      console.log(`ℹ️ Componente já está marcado: ${componentPath}`);
    }
  } else {
    console.log(`⚠️ Componente não encontrado: ${componentPath}`);
    // Tente buscar o arquivo em outras pastas
    console.log(`��� Procurando por arquivos semelhantes...`);
  }
});

console.log('✅ Marcação de componentes concluída!');
