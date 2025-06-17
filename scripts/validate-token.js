#!/usr/bin/env node

/**
 * 🔍 Validador de Token Lovable
 * Testa se o token está funcionando corretamente
 */

import https from "https";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class TokenValidator {
  constructor() {
    this.projectRoot = join(__dirname, "..");
  }

  async getToken() {
    // Variável de ambiente
    if (process.env.LOVABLE_TOKEN) {
      return process.env.LOVABLE_TOKEN;
    }

    // Arquivo local
    try {
      const tokenFile = join(this.projectRoot, ".lovable-token");
      const token = await fs.readFile(tokenFile, "utf8");
      return token.trim();
    } catch (error) {
      return null;
    }
  }

  async testApiEndpoint(token, endpoint, description) {
    return new Promise((resolve) => {
      const url = new URL(endpoint);

      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Lovable-Token-Validator/1.0",
        },
        timeout: 10000,
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            endpoint: description,
            statusCode: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 300,
            response: data,
            error: null,
          });
        });
      });

      req.on("error", (error) => {
        resolve({
          endpoint: description,
          statusCode: 0,
          success: false,
          response: null,
          error: error.message,
        });
      });

      req.on("timeout", () => {
        req.destroy();
        resolve({
          endpoint: description,
          statusCode: 0,
          success: false,
          response: null,
          error: "Timeout",
        });
      });

      req.end();
    });
  }

  async validateToken(token) {
    console.log("🔍 Validando token Lovable...\n");

    if (!token) {
      console.log("❌ Token não encontrado!");
      console.log("💡 Configure seguindo: GUIA_CONFIGURACAO_LOVABLE_TOKEN.md");
      return false;
    }

    // Validações básicas
    if (!token.startsWith("lvb_")) {
      console.log('❌ Token deve começar com "lvb_"');
      return false;
    }

    if (token.length < 20) {
      console.log("❌ Token muito curto (deve ter pelo menos 20 caracteres)");
      return false;
    }

    console.log(
      `✅ Formato do token: ${token.substring(0, 8)}...${token.slice(-4)}`
    );
    console.log(`✅ Comprimento: ${token.length} caracteres\n`);

    // Testar endpoints da API
    const endpoints = [
      {
        url: "https://api.lovable.dev/v1/user",
        description: "User Info",
      },
      {
        url: "https://api.lovable.dev/v1/projects",
        description: "Projects List",
      },
      {
        url: "https://api.lovable.dev/v1/projects/quiz-sell-genius-66",
        description: "Project Specific",
      },
    ];

    console.log("🌐 Testando conectividade com API...\n");

    let successCount = 0;
    for (const endpoint of endpoints) {
      console.log(`🔗 Testando: ${endpoint.description}`);

      const result = await this.testApiEndpoint(
        token,
        endpoint.url,
        endpoint.description
      );

      if (result.success) {
        console.log(`✅ ${endpoint.description}: ${result.statusCode} - OK`);
        successCount++;
      } else if (result.statusCode === 401) {
        console.log(`❌ ${endpoint.description}: Token inválido (401)`);
      } else if (result.statusCode === 403) {
        console.log(`⚠️ ${endpoint.description}: Sem permissão (403)`);
      } else if (result.statusCode === 404) {
        console.log(
          `⚠️ ${endpoint.description}: Endpoint não encontrado (404)`
        );
      } else if (result.error) {
        console.log(`❌ ${endpoint.description}: ${result.error}`);
      } else {
        console.log(`⚠️ ${endpoint.description}: ${result.statusCode}`);
      }
    }

    console.log(
      `\n📊 Resultados: ${successCount}/${endpoints.length} endpoints funcionando\n`
    );

    if (successCount > 0) {
      console.log("✅ Token está funcionando!");
      console.log("🎯 Próximo passo: Conectar GitHub no Lovable Studio");
      console.log("🔗 Acesse: https://lovable.dev/settings/integrations");
      return true;
    } else {
      console.log("❌ Token pode estar inválido ou expirado");
      console.log("💡 Gere um novo token no Lovable Studio");
      return false;
    }
  }

  async checkGitHubSecret() {
    console.log("\n🔍 Verificando configuração GitHub...");

    if (process.env.GITHUB_ACTIONS) {
      if (process.env.LOVABLE_TOKEN) {
        console.log("✅ LOVABLE_TOKEN configurado no GitHub Actions");
      } else {
        console.log("❌ LOVABLE_TOKEN não configurado no GitHub Actions");
        console.log(
          "🔗 Configure em: https://github.com/vdp2025/quiz-sell-genius-66/settings/secrets/actions"
        );
      }
    } else {
      console.log("ℹ️ Não executando no GitHub Actions");
    }
  }
}

async function main() {
  console.log("🔑 VALIDADOR DE TOKEN LOVABLE");
  console.log("=============================\n");

  const validator = new TokenValidator();

  try {
    const token = await validator.getToken();
    const isValid = await validator.validateToken(token);

    await validator.checkGitHubSecret();

    if (isValid) {
      console.log("\n🎉 Validação concluída com sucesso!");
      process.exit(0);
    } else {
      console.log("\n❌ Validação falhou!");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Erro na validação:", error.message);
    process.exit(1);
  }
}

main();
