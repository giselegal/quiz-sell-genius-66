#!/usr/bin/env node

/**
 * 🚀 Força sincronização com Lovable usando endpoints corretos
 * Versão 2.0 - Com token e webhooks aprimorados
 */

import { promises as fs } from "fs";
import https from "https";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class LovableSyncForce {
  constructor() {
    this.projectRoot = join(__dirname, "..");
    this.lovableFile = join(this.projectRoot, ".lovable");
    this.triggerFile = join(this.projectRoot, ".lovable-trigger");
    this.statusFile = join(this.projectRoot, ".lovable-status");
  }

  async getToken() {
    // Tentar variável de ambiente primeiro
    if (process.env.LOVABLE_TOKEN) {
      return process.env.LOVABLE_TOKEN;
    }

    // Tentar arquivo local
    try {
      const tokenFile = join(this.projectRoot, ".lovable-token");
      const token = await fs.readFile(tokenFile, "utf8");
      return token.trim();
    } catch (error) {
      return null;
    }
  }

  async makeWebhookRequest(url, data, token) {
    return new Promise((resolve) => {
      const postData = JSON.stringify(data);
      const urlObj = new URL(url);

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname + urlObj.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
          "User-Agent": "Lovable-Sync-Force/2.0",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        timeout: 15000,
      };

      const req = https.request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => (responseData += chunk));
        res.on("end", () => {
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            response: responseData,
            error: null,
          });
        });
      });

      req.on("error", (error) => {
        resolve({
          success: false,
          statusCode: 0,
          response: null,
          error: error.message,
        });
      });

      req.on("timeout", () => {
        req.destroy();
        resolve({
          success: false,
          statusCode: 0,
          response: null,
          error: "Timeout",
        });
      });

      req.write(postData);
      req.end();
    });
  }

  async notifyWebhooks(token) {
    console.log("📡 Tentando notificar via webhook...");

    const timestamp = Date.now();
    const webhookData = {
      project: "quiz-sell-genius-66",
      repository: "vdp2025/quiz-sell-genius-66",
      action: "force-sync",
      timestamp: timestamp,
      source: "github-actions",
    };

    // URLs de webhook para tentar (baseadas na documentação e padrões)
    const webhookUrls = [
      "https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com/api/sync",
      "https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com/api/webhook/sync",
      "https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com/api/github/sync",
      "https://api.lovable.dev/v1/sync/github",
      "https://api.lovable.dev/v1/projects/quiz-sell-genius-66/sync",
    ];

    let successCount = 0;
    const results = [];

    for (const url of webhookUrls) {
      console.log(`🔗 Tentando: ${url}`);

      const result = await this.makeWebhookRequest(url, webhookData, token);
      results.push({ url, ...result });

      if (result.success) {
        console.log(`✅ Sucesso: ${url} (${result.statusCode})`);
        successCount++;
      } else if (result.statusCode === 404) {
        console.log(`⚠️ Endpoint não encontrado: ${url}`);
      } else if (result.statusCode === 401) {
        console.log(`❌ Token inválido: ${url}`);
      } else if (result.error) {
        console.log(`❌ Erro: ${url} - ${result.error}`);
      } else {
        console.log(`⚠️ Falha: ${url} (${result.statusCode})`);
      }
    }

    return { successCount, totalTried: webhookUrls.length, results };
  }

  async updateFiles() {
    const timestamp = Math.floor(Date.now() / 1000);

    console.log("✅ Atualizando arquivos de configuração...");

    // Atualizar .lovable-trigger
    const triggerContent = `LOVABLE_FORCE_SYNC=${timestamp}
SYNC_METHOD=force-lovable-sync
TIMESTAMP=${new Date().toISOString()}`;

    await fs.writeFile(this.triggerFile, triggerContent);
    console.log("✅ Arquivo .lovable-trigger atualizado");

    // Atualizar .lovable se existir
    try {
      const lovableData = await fs.readFile(this.lovableFile, "utf8");
      const config = JSON.parse(lovableData);

      config.sync = config.sync || {};
      config.sync.timestamp = timestamp;
      config.sync.lastForceSync = new Date().toISOString();
      config.lastUpdate = new Date().toISOString();
      config.version = `2.2.${timestamp}`;

      await fs.writeFile(this.lovableFile, JSON.stringify(config, null, 2));
      console.log("✅ Configuração .lovable atualizada");
    } catch (error) {
      console.log("⚠️ Erro ao atualizar .lovable:", error.message);
    }

    // Atualizar status
    const status = {
      lastSync: new Date().toISOString(),
      method: "force-sync",
      status: "sync-requested",
      timestamp: timestamp,
    };

    await fs.writeFile(this.statusFile, JSON.stringify(status, null, 2));
    console.log("✅ Status de sincronização atualizado");

    return timestamp;
  }

  async execute() {
    console.log("🚀 Forçando sincronização do Lovable...");

    try {
      // Atualizar arquivos
      const timestamp = await this.updateFiles();

      // Obter token
      const token = await this.getToken();

      if (!token) {
        console.log("⚠️ LOVABLE_TOKEN não encontrado");
        console.log("💡 Configure em: GUIA_CONFIGURACAO_LOVABLE_TOKEN.md");
      }

      // Tentar notificar webhooks
      const webhookResult = await this.notifyWebhooks(token);

      console.log("\n📊 RESULTADO DA SINCRONIZAÇÃO:");
      console.log("================================");
      console.log(`✅ Timestamp: ${timestamp}`);
      console.log(`✅ Data: ${new Date().toISOString()}`);
      console.log(
        `✅ Webhooks com sucesso: ${webhookResult.successCount}/${webhookResult.totalTried}`
      );

      if (token) {
        console.log(`✅ Token: ${token.substring(0, 8)}...${token.slice(-4)}`);
      } else {
        console.log("⚠️ Token: NÃO CONFIGURADO");
      }

      console.log("\n💡 PRÓXIMOS PASSOS:");
      if (!token) {
        console.log(
          "1. Configure o LOVABLE_TOKEN seguindo GUIA_CONFIGURACAO_LOVABLE_TOKEN.md"
        );
        console.log("2. Execute: npm run lovable:configure-token");
      } else {
        console.log("1. Acesse https://lovable.dev");
        console.log('2. Abra o projeto "Quiz Sell Genius"');
        console.log("3. Verifique se as alterações aparecem automaticamente");
        if (webhookResult.successCount === 0) {
          console.log(
            "4. Se não funcionar, conecte o GitHub no Lovable Studio"
          );
        }
      }

      console.log("\n🎉 Processo de sincronização forçada concluído!");
    } catch (error) {
      console.error("❌ Erro na sincronização:", error.message);
      process.exit(1);
    }
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const syncForce = new LovableSyncForce();
  syncForce.execute();
}
