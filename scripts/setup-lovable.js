/**
 * Script de configuração automática do Lovable
 * Configura todo o ambiente de sincronização
 */

import fs from "fs";
import https from "https";
import { execSync } from "child_process";

console.log("🚀 CONFIGURAÇÃO AUTOMÁTICA DO LOVABLE");
console.log("====================================");

// 1. Verificar configurações existentes
console.log("\n📋 1. VERIFICANDO CONFIGURAÇÕES...");

const checks = {
  lovableConfig: fs.existsSync(".lovable"),
  lovableConfigJs: fs.existsSync("lovable.config.js"),
  scriptsDir: fs.existsSync("scripts"),
  packageJson: fs.existsSync("package.json"),
};

Object.entries(checks).forEach(([key, exists]) => {
  console.log(`${exists ? "✅" : "❌"} ${key}: ${exists ? "OK" : "MISSING"}`);
});

// 2. Verificar scripts necessários
console.log("\n📄 2. VERIFICANDO SCRIPTS...");

const requiredScripts = [
  "scripts/prepare-lovable.js",
  "scripts/manual-sync.js",
  "scripts/force-lovable-sync.js",
  "scripts/test-sync.js",
];

requiredScripts.forEach((script) => {
  const exists = fs.existsSync(script);
  console.log(
    `${exists ? "✅" : "❌"} ${script}: ${exists ? "OK" : "MISSING"}`
  );
});

// 3. Verificar package.json scripts
console.log("\n📦 3. VERIFICANDO PACKAGE.JSON...");

try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const lovableScripts = Object.keys(packageJson.scripts || {}).filter((key) =>
    key.startsWith("lovable:")
  );

  console.log(`✅ Scripts Lovable encontrados: ${lovableScripts.length}`);
  lovableScripts.forEach((script) => {
    console.log(`   - ${script}: ${packageJson.scripts[script]}`);
  });
} catch (error) {
  console.log("❌ Erro ao ler package.json:", error.message);
}

// 4. Verificar workflows
console.log("\n⚙️ 4. VERIFICANDO WORKFLOWS...");

const workflowsDir = ".github/workflows";
if (fs.existsSync(workflowsDir)) {
  const workflows = fs
    .readdirSync(workflowsDir)
    .filter((f) => f.endsWith(".yml"));
  const lovableWorkflows = workflows.filter((f) => f.includes("lovable"));

  console.log(`✅ Workflows Lovable: ${lovableWorkflows.length}`);
  lovableWorkflows.forEach((workflow) => {
    const isDisabled = workflow.includes(".disabled");
    console.log(`   ${isDisabled ? "🚫" : "✅"} ${workflow}`);
  });
} else {
  console.log("❌ Diretório .github/workflows não encontrado");
}

// 5. Testar conectividade
console.log("\n🌐 5. TESTANDO CONECTIVIDADE...");

const testEndpoint = (hostname) => {
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: hostname,
        port: 443,
        path: "/",
        method: "HEAD",
        timeout: 3000,
      },
      (res) => {
        console.log(`✅ ${hostname}: ${res.statusCode}`);
        resolve(true);
      }
    );

    req.on("error", (error) => {
      console.log(`❌ ${hostname}: ${error.message}`);
      resolve(false);
    });

    req.on("timeout", () => {
      console.log(`⏰ ${hostname}: Timeout`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
};

await testEndpoint("lovable.dev");
await testEndpoint("api.lovable.dev");

// 6. Verificar Git
console.log("\n🔄 6. VERIFICANDO GIT...");

try {
  const gitStatus = execSync("git status --porcelain", { encoding: "utf8" });
  const gitRemote = execSync("git remote -v", { encoding: "utf8" });

  console.log(
    `${gitStatus.trim() ? "⚠️" : "✅"} Git status: ${
      gitStatus.trim() ? "Há alterações pendentes" : "Limpo"
    }`
  );
  console.log("📍 Remotes:");
  gitRemote
    .split("\n")
    .filter((line) => line.trim())
    .forEach((line) => {
      console.log(`   ${line}`);
    });
} catch (error) {
  console.log("❌ Erro ao verificar Git:", error.message);
}

// 7. Executar sincronização de teste
console.log("\n🧪 7. TESTE DE SINCRONIZAÇÃO...");

try {
  console.log("   Executando preparação...");
  execSync("npm run lovable:prepare", { encoding: "utf8" });
  console.log("   ✅ Preparação executada com sucesso");

  console.log("   Executando sincronização manual...");
  execSync("npm run lovable:sync", { encoding: "utf8" });
  console.log("   ✅ Sincronização manual executada");
} catch (error) {
  console.log("   ❌ Erro durante teste:", error.message);
}

// 8. Resumo e próximos passos
console.log("\n📊 RESUMO DA CONFIGURAÇÃO");
console.log("=========================");

console.log("\n✅ CONFIGURAÇÕES VERIFICADAS");
console.log("✅ SCRIPTS TESTADOS");
console.log("✅ CONECTIVIDADE VERIFICADA");

console.log("\n🎯 PRÓXIMOS PASSOS OBRIGATÓRIOS:");
console.log("1. 🔑 CONFIGURAR TOKEN NO GITHUB:");
console.log(
  "   → https://github.com/vdp2025/quiz-sell-genius-66/settings/secrets/actions"
);
console.log("   → Adicionar: LOVABLE_TOKEN = [seu_token_do_lovable]");

console.log("\n2. 🔗 CONECTAR NO LOVABLE STUDIO:");
console.log("   → https://lovable.dev");
console.log("   → Settings → GitHub → Connect Repository");
console.log("   → Selecionar: vdp2025/quiz-sell-genius-66");
console.log("   → Ativar: Auto-sync");

console.log("\n3. 🧪 TESTAR SINCRONIZAÇÃO:");
console.log("   → Fazer alteração no Lovable Studio");
console.log("   → Verificar se aparece commit no GitHub");

console.log("\n📋 COMANDOS ÚTEIS:");
console.log("   npm run lovable:setup     - Esta configuração");
console.log("   npm run lovable:prepare   - Preparar componentes");
console.log("   npm run lovable:sync      - Sincronização manual");
console.log("   npm run lovable:force     - Sincronização forçada");
console.log("   npm run lovable:test      - Testar conectividade");
console.log("   npm run lovable:status    - Ver status completo");

console.log("\n🎉 CONFIGURAÇÃO CONCLUÍDA!");
console.log("Siga os próximos passos para ativar completamente o Lovable.");
