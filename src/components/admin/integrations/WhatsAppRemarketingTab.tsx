
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { whatsappRemarketing, WhatsAppContact, RemarketingCampaign } from '@/utils/whatsappRemarketing';
import { MessageCircle, Users, Send, Plus } from 'lucide-react';

const WhatsAppRemarketingTab: React.FC = () => {
  const [campaigns, setCampaigns] = useState<RemarketingCampaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
    targetTags: ''
  });
  
  useEffect(() => {
    setCampaigns(whatsappRemarketing.getCampaigns());
  }, []);
  
  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.message) return;
    
    const campaignId = whatsappRemarketing.createCampaign({
      name: newCampaign.name,
      message: newCampaign.message,
      targetTags: newCampaign.targetTags.split(',').map(tag => tag.trim()),
      status: 'active'
    });
    
    setCampaigns(whatsappRemarketing.getCampaigns());
    setNewCampaign({ name: '', message: '', targetTags: '' });
  };
  
  const handleSendCampaign = async (campaignId: string) => {
    try {
      await whatsappRemarketing.sendCampaign(campaignId);
      alert('Campanha enviada com sucesso!');
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert('Erro ao enviar campanha');
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            WhatsApp Remarketing
          </CardTitle>
          <CardDescription>
            Configure campanhas de remarketing via WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nome da campanha"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Tags alvo (separadas por vírgula)"
              value={newCampaign.targetTags}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, targetTags: e.target.value }))}
            />
          </div>
          <Textarea
            placeholder="Mensagem da campanha"
            value={newCampaign.message}
            onChange={(e) => setNewCampaign(prev => ({ ...prev, message: e.target.value }))}
            rows={3}
          />
          <Button onClick={handleCreateCampaign} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Criar Campanha
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription>
                    Tags: {campaign.targetTags.join(', ')}
                  </CardDescription>
                </div>
                <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{campaign.message}</p>
              <Button 
                onClick={() => handleSendCampaign(campaign.id)}
                size="sm"
                disabled={campaign.status !== 'active'}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Campanha
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppRemarketingTab;
