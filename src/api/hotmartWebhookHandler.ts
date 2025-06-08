
import { NextApiRequest, NextApiResponse } from 'next';
import { hotmartWebhookManager, HotmartWebhookPayload } from '../utils/hotmartWebhook';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const webhookData = req.body as HotmartWebhookPayload;
    const result = await hotmartWebhookManager.processWebhook(webhookData);
    
    if (result.success) {
      res.status(200).json({ message: 'Webhook processed successfully' });
    } else {
      res.status(400).json({ message: 'Webhook processing failed', error: result.error });
    }
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
