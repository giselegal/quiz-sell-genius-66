/**
 * Script para verificar status completo do Lovable
 */

import fs from "fs";
import { execSync } from "child_process";

console.log("📊 STATUS COMPLETO DO LOVABLE");
console.log("==============================");

// 1. Status dos arquivos de configuração
console.log("\n📄 ARQUIVOS DE CONFIGURAÇÃO:");

const configFiles = [
  ".lovable",
  ".lovable-trigger",
  ".lovable-status",
  "lovable.config.js",
  "CONFIGURACAO_TOKEN_LOVABLE.md",
];

configFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const size = (stats.size / 1024).toFixed(2);
    const modified = stats.mtime.toLocaleString();
    console.log(`✅ ${file} (${size}KB, modificado: ${modified})`);
  } else {
    console.log(`❌ ${file} - AUSENTE`);
  }
});

// 2. Status da configuração .lovable
if (fs.existsSync(".lovable")) {
  console.log("\n⚙️ CONFIGURAÇÃO .LOVABLE:");
  try {
    const config = JSON.parse(fs.readFileSync(".lovable", "utf8"));
    console.log(`✅ Projeto: ${config.projectName}`);
    console.log(`✅ ID: ${config.projectId}`);
    console.log(`✅ Versão: ${config.version}`);
    console.log(`✅ Última atualização: ${config.lastUpdate}`);
    console.log(
      `✅ Auto-sync GitHub: ${
        config.github?.autoSyncFromGithub ? "ATIVO" : "INATIVO"
      }`
    );
    console.log(
      `✅ Auto-push GitHub: ${
        config.github?.autoPushToGithub ? "ATIVO" : "INATIVO"
      }`
    );
    console.log(`✅ Timestamp sync: ${config.sync?.timestamp}`);
  } catch (error) {
    console.log("❌ Erro ao ler configuração:", error.message);
  }
}

// 3. Status dos workflows
console.log("\n⚙️ WORKFLOWS GITHUB ACTIONS:");

if (fs.existsSync(".github/workflows")) {
  const workflows = fs
    .readdirSync(".github/workflows")
    .filter((f) => f.endsWith(".yml"));
  const lovableWorkflows = workflows.filter((f) => f.includes("lovable"));

  lovableWorkflows.forEach((workflow) => {
    const isDisabled = workflow.includes(".disabled");
    const isMain = workflow.includes("main");

    if (isMain && !isDisabled) {
      console.log(`🟢 ${workflow} - PRINCIPAL ATIVO`);
    } else if (isDisabled) {
      console.log(`🔴 ${workflow} - DESABILITADO`);
    } else {
      console.log(`🟡 ${workflow} - SECUNDÁRIO`);
    }
  });
} else {
  console.log("❌ Diretório workflows não encontrado");
}

// 4. Status dos scripts
console.log("\n📜 SCRIPTS LOVABLE:");

try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const lovableScripts = Object.entries(packageJson.scripts || {}).filter(
    ([key]) => key.startsWith("lovable:")
  );

  if (lovableScripts.length > 0) {
    lovableScripts.forEach(([name, command]) => {
      console.log(`✅ ${name}: ${command}`);
    });
  } else {
    console.log("❌ Nenhum script lovable encontrado");
  }
} catch (error) {
  console.log("❌ Erro ao ler package.json:", error.message);
}

// 5. Status do Git
console.log("\n🔄 STATUS GIT:");

try {
  const gitStatus = execSync("git status --porcelain", {
    encoding: "utf8",
  }).trim();
  const gitBranch = execSync("git branch --show-current", {
    encoding: "utf8",
  }).trim();
  const lastCommit = execSync("git log -1 --oneline", {
    encoding: "utf8",
  }).trim();

  console.log(`✅ Branch: ${gitBranch}`);
  console.log(`✅ Último commit: ${lastCommit}`);

  if (gitStatus) {
    console.log("⚠️ Alterações pendentes:");
    gitStatus.split("\n").forEach((line) => {
      console.log(`   ${line}`);
    });
  } else {
    console.log("✅ Working tree limpo");
  }
} catch (error) {
  console.log("❌ Erro ao verificar Git:", error.message);
}

// 6. Verificar últimas execuções
console.log("\n📈 ESTATÍSTICAS:");

if (fs.existsSync(".lovable-status")) {
  try {
    const status = JSON.parse(fs.readFileSync(".lovable-status", "utf8"));
    console.log(`✅ Última sincronização: ${status.date}`);
    console.log(`✅ Método: ${status.method}`);
    console.log(`✅ Status: ${status.status}`);
  } catch (error) {
    console.log("⚠️ Erro ao ler status:", error.message);
  }
}

// 7. Verificar componentes
if (fs.existsSync("lovable-components.json")) {
  try {
    const components = JSON.parse(
      fs.readFileSync("lovable-components.json", "utf8")
    );
    console.log(`✅ Componentes mapeados: ${components.length || 0}`);
  } catch (error) {
    console.log("⚠️ Erro ao ler componentes:", error.message);
  }
}

// 8. Resumo final
console.log("\n🎯 RESUMO:");

let issues = 0;
let warnings = 0;

if (!fs.existsSync(".lovable")) {
  console.log("❌ Arquivo .lovable ausente");
  issues++;
}

if (!fs.existsSync(".github/workflows/lovable-sync-main.yml")) {
  console.log("❌ Workflow principal não encontrado");
  issues++;
}

try {
  const gitStatus = execSync("git status --porcelain", {
    encoding: "utf8",
  }).trim();
  if (gitStatus) {
    console.log("⚠️ Há alterações não commitadas");
    warnings++;
  }
} catch (error) {
  console.log("❌ Problema com Git");
  issues++;
}

console.log("\n📊 RESULTADO:");
if (issues === 0 && warnings === 0) {
  console.log("🟢 SISTEMA FUNCIONANDO PERFEITAMENTE");
} else if (issues === 0) {
  console.log(`🟡 SISTEMA OK COM ${warnings} AVISO(S)`);
} else {
  console.log(`🔴 SISTEMA COM ${issues} PROBLEMA(S) E ${warnings} AVISO(S)`);
}

console.log("\n💡 COMANDOS ÚTEIS:");
console.log("npm run lovable:setup  - Configuração completa");
console.log("npm run lovable:force  - Sincronização forçada");
console.log("npm run lovable:test   - Testar conectividade");
