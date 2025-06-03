
// WhatsApp Remarketing utilities

export interface WhatsAppContact {
  phone: string;
  name?: string;
  tags?: string[];
  lastInteraction?: Date;
}

export interface RemarketingCampaign {
  id: string;
  name: string;
  message: string;
  targetTags: string[];
  status: 'active' | 'paused' | 'completed';
}

class WhatsAppRemarketing {
  private contacts: WhatsAppContact[] = [];
  private campaigns: RemarketingCampaign[] = [];
  
  // Add contact to remarketing list
  addContact(contact: WhatsAppContact): void {
    try {
      const existingIndex = this.contacts.findIndex(c => c.phone === contact.phone);
      
      if (existingIndex >= 0) {
        // Update existing contact
        this.contacts[existingIndex] = {
          ...this.contacts[existingIndex],
          ...contact,
          lastInteraction: new Date()
        };
      } else {
        // Add new contact
        this.contacts.push({
          ...contact,
          lastInteraction: new Date()
        });
      }
      
      console.log('Contact added to WhatsApp remarketing:', contact.phone);
    } catch (error) {
      console.error('Error adding contact to remarketing:', error);
    }
  }
  
  // Get contacts by tags
  getContactsByTags(tags: string[]): WhatsAppContact[] {
    return this.contacts.filter(contact => 
      contact.tags?.some(tag => tags.includes(tag))
    );
  }
  
  // Create remarketing campaign
  createCampaign(campaign: Omit<RemarketingCampaign, 'id'>): string {
    const id = `campaign_${Date.now()}`;
    const newCampaign: RemarketingCampaign = {
      ...campaign,
      id
    };
    
    this.campaigns.push(newCampaign);
    console.log('WhatsApp remarketing campaign created:', id);
    
    return id;
  }
  
  // Get all campaigns
  getCampaigns(): RemarketingCampaign[] {
    return this.campaigns;
  }
  
  // Send campaign (mock implementation)
  async sendCampaign(campaignId: string): Promise<void> {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    const targets = this.getContactsByTags(campaign.targetTags);
    
    // Mock sending messages
    for (const contact of targets) {
      console.log(`Sending WhatsApp message to ${contact.phone}: ${campaign.message}`);
    }
    
    console.log(`Campaign ${campaignId} sent to ${targets.length} contacts`);
  }
}

export const whatsappRemarketing = new WhatsAppRemarketing();
