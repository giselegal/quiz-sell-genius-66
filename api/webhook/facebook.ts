
// API Endpoint para Webhook Facebook
// Compatível com Vercel Serverless Functions

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

export default async function handler(req: any, res: any) {
  try {
    // Verificar método HTTP
    if (req.method === "GET") {
      // Verificação do webhook Facebook
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      const VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || "facebook_webhook_verify_token_123";

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("[Facebook Webhook] Webhook verificado com sucesso");
        return res.status(200).send(challenge);
      } else {
        console.log("[Facebook Webhook] Falha na verificação do webhook");
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Verificar Content-Type
    const contentType = req.headers["content-type"];
    if (!contentType?.includes("application/json")) {
      return res.status(400).json({ error: "Invalid content type" });
    }

    // Parsear dados do webhook
    const webhookData: FacebookWebhookData = req.body;

    // Validar estrutura básica
    if (!webhookData.object || !webhookData.entry) {
      return res.status(400).json({ error: "Invalid webhook data" });
    }

    // Log do webhook recebido
    console.log("[Facebook Webhook] Webhook recebido:", {
      object: webhookData.object,
      entries: webhookData.entry.length,
      timestamp: new Date().toISOString(),
    });

    // Processar cada entry do webhook
    for (const entry of webhookData.entry) {
      await processFacebookWebhookEntry(entry);
    }

    // Resposta de sucesso para o Facebook
    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      entries_processed: webhookData.entry.length,
    });
  } catch (error) {
    console.error("[Facebook Webhook] Erro ao processar webhook:", error);

    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function processFacebookWebhookEntry(entry: FacebookWebhookEntry) {
  try {
    console.log("[Facebook Webhook] Processando entry:", {
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
    console.error("[Facebook Webhook] Erro ao processar entry:", error);
  }
}

async function processFacebookWebhookChange(change: any, entry: FacebookWebhookEntry) {
  try {
    console.log("[Facebook Webhook] Processando change:", {
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
        console.log(`[Facebook Webhook] Campo não processado: ${change.field}`);
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
    console.error("[Facebook Webhook] Erro ao processar change:", error);
  }
}

async function processLeadGenChange(value: any, funnelConfig: any) {
  console.log("[Facebook Webhook] Processando Lead Gen:", value);
  
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
  console.log("[Facebook Webhook] Processando Conversions:", value);
  
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
  console.log("[Facebook Webhook] Processando Feed:", value);
  
  // Processar mudanças no feed
  trackFunnelEvent("FacebookFeedChanged", {
    feed_id: value.item,
    verb: value.verb,
    funnel_name: funnelConfig.funnelName,
    timestamp: new Date().toISOString(),
  });
}

// Configuração para Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
