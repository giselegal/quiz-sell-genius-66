#!/usr/bin/env node

/**
 * 🚀 Webhook manual para Lovable
 * Envia notificação direta para o Lovable sobre mudanças no projeto
 */

import https from "https";
import fs from "fs";

class LovableWebhook {
  constructor() {
    this.projectId = "quiz-sell-genius-66";
    this.webhookUrl = "https://app.lovable.dev/api/webhooks/github";
    this.altWebhookUrl = "https://lovable.dev/api/v1/projects/sync";
  }

  async sendWebhook() {
    console.log("🚀 Enviando webhook para Lovable...");

    const payload = {
      repository: {
        name: "quiz-sell-genius-66",
        full_name: "vdp2025/quiz-sell-genius-66",
        html_url: "https://github.com/vdp2025/quiz-sell-genius-66",
      },
      ref: "refs/heads/main",
      commits: [
        {
          id: Date.now().toString(),
          message: "Manual sync trigger",
          timestamp: new Date().toISOString(),
          modified: ["src/components/visual-editor/ModernVisualEditor.tsx"],
        },
      ],
      head_commit: {
        id: Date.now().toString(),
        message: "Manual sync trigger",
        timestamp: new Date().toISOString(),
      },
    };

    try {
      await this.sendToEndpoint(this.webhookUrl, payload);
      console.log("✅ Webhook enviado com sucesso!");
    } catch (error) {
      console.log("⚠️  Tentando endpoint alternativo...");
      try {
        await this.sendToEndpoint(this.altWebhookUrl, {
          projectId: this.projectId,
          trigger: "manual",
          timestamp: Date.now(),
        });
        console.log("✅ Webhook alternativo enviado!");
      } catch (altError) {
        console.log("❌ Erro ao enviar webhook:", altError.message);
      }
    }
  }

  sendToEndpoint(url, data) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(data);
      const urlObj = new URL(url);

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
          "User-Agent": "Lovable-Sync/1.0",
          "X-GitHub-Event": "push",
        },
      };

      const req = https.request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => (responseData += chunk));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
          }
        });
      });

      req.on("error", reject);
      req.write(postData);
      req.end();
    });
  }
}

// Executar webhook
const webhook = new LovableWebhook();
webhook.sendWebhook();
