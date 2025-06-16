
// Netlify Function para Webhook Facebook
// Arquivo: netlify/functions/facebook-webhook.ts

import {
  getCurrentFunnelConfig,
  trackFunnelEvent,
} from "../../src/services/pixelManager";

interface FacebookWebhookEntry {
  id: string;
  time: number;
  changes?: {
    field: string;
    value: any;
  }[];
}

interface FacebookWebhookData {
  object: string;
  entry: FacebookWebhookEntry[];
}

export async function handler(event: any, context: any) {
  try {
    // Verificar método HTTP
    if (event.httpMethod === "GET") {
      // Verificação do webhook Facebook
      const queryParams = event.queryStringParameters || {};
      const mode = queryParams["hub.mode"];
      const token = queryParams["hub.verify_token"];
      const challenge = queryParams["hub.challenge"];

      const VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || "facebook_webhook_verify_token_123";

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("[Facebook Webhook Netlify] Webhook verificado com sucesso");
        return {
          statusCode: 200,
          body: challenge,
          headers: {
            "Content-Type": "text/plain",
          },
        };
      } else {
        console.log("[Facebook Webhook Netlify] Falha na verificação do webhook");
        return {
          statusCode: 403,
          body: JSON.stringify({ error: "Forbidden" }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
    }

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Verificar Content-Type
    const contentType = event.headers["content-type"];
    if (!contentType?.includes("application/json")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid content type" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Parsear dados do webhook
    const webhookData: FacebookWebhookData = JSON.parse(event.body);

    // Validar estrutura básica
    if (!webhookData.object || !webhookData.entry) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid webhook data" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Log do webhook recebido
    console.log("[Facebook Webhook Netlify] Webhook recebido:", {
      object: webhookData.object,
      entries: webhookData.entry.length,
      timestamp: new Date().toISOString(),
    });

    // Processar cada entry do webhook
    for (const entry of webhookData.entry) {
      await processFacebookWebhookEntry(entry);
    }

    // Resposta de sucesso para o Facebook
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
        entries_processed: webhookData.entry.length,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("[Facebook Webhook Netlify] Erro ao processar webhook:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}

async function processFacebookWebhookEntry(entry: FacebookWebhookEntry) {
  try {
    console.log("[Facebook Webhook Netlify] Processando entry:", {
      id: entry.id,
      time: entry.time,
      changes: entry.changes?.length || 0,
    });

    if (entry.changes) {
      for (const change of entry.changes) {
        await processFacebookWebhookChange(change, entry);
      }
    }

    // Registrar evento de webhook recebido
    trackFunnelEvent("FacebookWebhookReceived", {
      entry_id: entry.id,
      entry_time: entry.time,
      changes_count: entry.changes?.length || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Facebook Webhook Netlify] Erro ao processar entry:", error);
  }
}

async function processFacebookWebhookChange(change: any, entry: FacebookWebhookEntry) {
  try {
    console.log("[Facebook Webhook Netlify] Processando change:", {
      field: change.field,
      value_type: typeof change.value,
      entry_id: entry.id,
    });

    const funnelConfig = getCurrentFunnelConfig();

    // Processar diferentes tipos de mudanças
    switch (change.field) {
      case "leadgen":
        await processLeadGenChange(change.value, funnelConfig);
        break;
      case "conversions":
        await processConversionsChange(change.value, funnelConfig);
        break;
      case "feed":
        await processFeedChange(change.value, funnelConfig);
        break;
      default:
        console.log(`[Facebook Webhook Netlify] Campo não processado: ${change.field}`);
        break;
    }

    // Registrar mudança processada
    trackFunnelEvent("FacebookWebhookChangeProcessed", {
      field: change.field,
      entry_id: entry.id,
      funnel_name: funnelConfig.funnelName,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Facebook Webhook Netlify] Erro ao processar change:", error);
  }
}

async function processLeadGenChange(value: any, funnelConfig: any) {
  console.log("[Facebook Webhook Netlify] Processando Lead Gen:", value);
  
  // Processar dados de lead gerado
  if (value.leadgen_id) {
    trackFunnelEvent("FacebookLeadGenerated", {
      leadgen_id: value.leadgen_id,
      funnel_name: funnelConfig.funnelName,
      pixel_id: funnelConfig.pixelId,
      timestamp: new Date().toISOString(),
    });
  }
}

async function processConversionsChange(value: any, funnelConfig: any) {
  console.log("[Facebook Webhook Netlify] Processando Conversions:", value);
  
  // Processar dados de conversão
  if (value.conversion_id) {
    trackFunnelEvent("FacebookConversionTracked", {
      conversion_id: value.conversion_id,
      funnel_name: funnelConfig.funnelName,
      pixel_id: funnelConfig.pixelId,
      timestamp: new Date().toISOString(),
    });
  }
}

async function processFeedChange(value: any, funnelConfig: any) {
  console.log("[Facebook Webhook Netlify] Processando Feed:", value);
  
  // Processar mudanças no feed
  trackFunnelEvent("FacebookFeedChanged", {
    feed_id: value.item,
    verb: value.verb,
    funnel_name: funnelConfig.funnelName,
    timestamp: new Date().toISOString(),
  });
}
