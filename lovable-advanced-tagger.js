#!/usr/bin/env node

console.log("🔧 SISTEMA AVANÇADO DE TAGGING LOVABLE");
console.log("=====================================");

import fs from "fs";
import path from "path";

const COMPONENT_DIRS = [
  "src/components",
  "src/pages",
  "src/components/quiz",
  "src/components/result",
  "src/components/admin",
];

const createLovableTags = () => {
  console.log("🏷️ Criando tags Lovable...\n");

  let taggedComponents = 0;

  // Função para adicionar tags aos componentes
  const addLovableTag = (filePath, componentName) => {
    try {
      let content = fs.readFileSync(filePath, "utf8");

      // Verificar se já tem tag Lovable
      if (content.includes("lovable-tagger")) {
        console.log(`✅ ${componentName} já está taggeado`);
        return;
      }

      // Adicionar import do lovable-tagger se não existir
      if (
        !content.includes("import { withLovable }") &&
        !content.includes("lovable-tagger")
      ) {
        const importLine = `import { withLovable } from 'lovable-tagger';\n`;

        // Encontrar onde inserir o import
        const lines = content.split("\n");
        let insertIndex = 0;

        // Procurar o último import
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith("import ")) {
            insertIndex = i + 1;
          }
        }

        lines.splice(insertIndex, 0, importLine);
        content = lines.join("\n");
      }

      // Encontrar o export default e envolver com withLovable
      const exportRegex = /export default (\w+);?/;
      const match = content.match(exportRegex);

      if (match) {
        const originalComponent = match[1];
        const newExport = `export default withLovable(${originalComponent}, '${componentName}');`;
        content = content.replace(exportRegex, newExport);

        fs.writeFileSync(filePath, content);
        console.log(`🏷️ ${componentName} taggeado com sucesso!`);
        taggedComponents++;
      }
    } catch (error) {
      console.log(`❌ Erro ao taggear ${componentName}: ${error.message}`);
    }
  };

  // Componentes principais para taggear
  const componentsToTag = [
    { path: "src/components/QuizContent.tsx", name: "QuizContent" },
    { path: "src/components/QuizFlow.tsx", name: "QuizFlow" },
    { path: "src/components/QuizQuestion.tsx", name: "QuizQuestion" },
    { path: "src/components/QuizResult.tsx", name: "QuizResult" },
    { path: "src/pages/Quiz.tsx", name: "Quiz" },
    { path: "src/pages/ResultPage.tsx", name: "ResultPage" },
    {
      path: "src/pages/quiz-descubra-seu-estilo.tsx",
      name: "QuizDescubraSeuEstilo",
    },
    { path: "src/pages/admin/DashboardPage.tsx", name: "DashboardPage" },
    { path: "src/pages/admin/QuizPage.tsx", name: "AdminQuizPage" },
    { path: "src/pages/admin/OverviewPage.tsx", name: "OverviewPage" },
  ];

  // Taggear todos os componentes
  componentsToTag.forEach(({ path: componentPath, name }) => {
    const fullPath = path.join(process.cwd(), componentPath);
    if (fs.existsSync(fullPath)) {
      addLovableTag(fullPath, name);
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${componentPath}`);
    }
  });

  console.log(
    `\n🎉 Processo concluído! ${taggedComponents} componentes taggeados.`
  );
};

// Função para criar arquivo de configuração avançado
const createAdvancedConfig = () => {
  console.log("\n📁 Criando configuração avançada...");

  const lovableDir = "src/components/lovable";
  if (!fs.existsSync(lovableDir)) {
    fs.mkdirSync(lovableDir, { recursive: true });
  }

  // Configuração avançada
  const advancedConfig = {
    projectId: "quiz-sell-genius-66",
    projectName: "Quiz Sell Genius",
    version: "2.1.0",
    components: {
      QuizContent: {
        path: "/src/components/QuizContent.tsx",
        type: "interactive",
        editable: true,
        category: "quiz",
      },
      QuizFlow: {
        path: "/src/components/QuizFlow.tsx",
        type: "layout",
        editable: true,
        category: "quiz",
      },
      QuizQuestion: {
        path: "/src/components/QuizQuestion.tsx",
        type: "interactive",
        editable: true,
        category: "quiz",
      },
      QuizResult: {
        path: "/src/components/QuizResult.tsx",
        type: "display",
        editable: true,
        category: "result",
      },
      ResultPage: {
        path: "/src/pages/ResultPage.tsx",
        type: "page",
        editable: true,
        category: "page",
      },
      DashboardPage: {
        path: "/src/pages/admin/DashboardPage.tsx",
        type: "page",
        editable: true,
        category: "admin",
      },
    },
    sync: {
      enabled: true,
      autoTag: true,
      autoSync: true,
      branch: "main",
    },
  };

  fs.writeFileSync(
    path.join(lovableDir, "advanced-config.json"),
    JSON.stringify(advancedConfig, null, 2)
  );

  console.log("✅ Configuração avançada criada!");
};

// Executar funções
createLovableTags();
createAdvancedConfig();

console.log("\n🚀 SISTEMA LOVABLE RECONFIGURADO!");
console.log("=================================");
console.log("📝 Próximos passos:");
console.log("1. Faça commit das mudanças");
console.log("2. Faça push para o GitHub");
console.log("3. Verifique no Lovable Studio");
