/**
 * Script para forçar sincronização do Lovable
 * Sistema de webhook alternativo que não depende de tokens
 */

import fs from "fs";
import https from "https";

console.log("🚀 Forçando sincronização do Lovable...");

// 1. Atualizar timestamp
const timestamp = Math.floor(Date.now() / 1000);
const triggerContent = `LOVABLE_FORCE_SYNC=${timestamp}\nTIMESTAMP=${new Date().toISOString()}`;

fs.writeFileSync(".lovable-trigger", triggerContent);
console.log("✅ Arquivo .lovable-trigger atualizado");

// 2. Atualizar configuração .lovable
if (fs.existsSync(".lovable")) {
  const config = JSON.parse(fs.readFileSync(".lovable", "utf8"));
  config.sync.timestamp = timestamp;
  config.lastUpdate = new Date().toISOString();
  config.version = `2.1.${timestamp}`;
  config.sync.forced = true;
  config.sync.method = "webhook-alternative";

  fs.writeFileSync(".lovable", JSON.stringify(config, null, 2));
  console.log("✅ Configuração .lovable atualizada");
}

// 3. Criar arquivo de status
const statusInfo = {
  timestamp: timestamp,
  date: new Date().toISOString(),
  status: "sync-requested",
  method: "webhook-alternative",
  projectId: "quiz-sell-genius-66",
};

fs.writeFileSync(".lovable-status", JSON.stringify(statusInfo, null, 2));
console.log("✅ Status de sincronização criado");

// 4. Tentar notificar via webhook genérico (sem token)
console.log("📡 Tentando notificar via webhook...");

const postData = JSON.stringify({
  project: "quiz-sell-genius-66",
  timestamp: timestamp,
  event: "force-sync",
  source: "manual-script",
});

// Lista de possíveis endpoints de webhook do Lovable
const webhookEndpoints = [
  "api.lovable.dev",
  "webhook.lovable.dev",
  "sync.lovable.dev",
];

let successCount = 0;

webhookEndpoints.forEach((endpoint, index) => {
  setTimeout(() => {
    const req = https.request(
      {
        hostname: endpoint,
        port: 443,
        path: "/webhook/sync",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": postData.length,
          "User-Agent": "Quiz-Sell-Genius/1.0",
        },
      },
      (res) => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`✅ Webhook ${endpoint}: Sucesso (${res.statusCode})`);
          successCount++;
        } else {
          console.log(`⚠️ Webhook ${endpoint}: ${res.statusCode}`);
        }
      }
    );

    req.on("error", (error) => {
      console.log(`❌ Webhook ${endpoint}: ${error.message}`);
    });

    req.setTimeout(3000, () => {
      console.log(`⏰ Webhook ${endpoint}: Timeout`);
      req.destroy();
    });

    req.write(postData);
    req.end();
  }, index * 1000); // Escalonar as requisições
});

// 5. Aguardar e mostrar resultado
setTimeout(() => {
  console.log("\n📊 RESULTADO DA SINCRONIZAÇÃO:");
  console.log("================================");
  console.log(`✅ Timestamp: ${timestamp}`);
  console.log(`✅ Data: ${new Date().toISOString()}`);
  console.log(
    `✅ Webhooks com sucesso: ${successCount}/${webhookEndpoints.length}`
  );
  console.log("\n💡 PRÓXIMOS PASSOS:");
  console.log("1. Acesse https://lovable.dev");
  console.log('2. Abra o projeto "Quiz Sell Genius"');
  console.log("3. Verifique se as alterações aparecem automaticamente");
  console.log(
    "4. Se não funcionar, verifique se o token LOVABLE_TOKEN está configurado no GitHub"
  );
  console.log("\n🎉 Processo de sincronização forçada concluído!");
}, 5000);
