
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FUNNEL_CONFIGS } from '@/services/pixelManager';

export const MarketingTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('utm');
  const [funnel1PixelId, setFunnel1PixelId] = useState(FUNNEL_CONFIGS.default.pixelId);
  const [funnel2PixelId, setFunnel2PixelId] = useState(FUNNEL_CONFIGS['quiz-descubra-seu-estilo'].pixelId);
  const [funnel1Campaign, setFunnel1Campaign] = useState(FUNNEL_CONFIGS.default.utmCampaign);
  const [funnel2Campaign, setFunnel2Campaign] = useState(FUNNEL_CONFIGS['quiz-descubra-seu-estilo'].utmCampaign);

  const handleSavePixelSettings = () => {
    // In a real application, this would update the pixelManager.ts file
    // Here we just show a toast notification
    toast({
      title: "Configurações salvas",
      description: "As configurações dos Pixels foram atualizadas com sucesso.",
    });
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="utm">Configuração UTM</TabsTrigger>
        <TabsTrigger value="pixel">Facebook Pixel</TabsTrigger>
      </TabsList>
      
      <TabsContent value="utm">
        <Card>
          <CardHeader>
            <CardTitle>UTM Configuration</CardTitle>
            <CardDescription>Configure UTM parameter tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              UTM parameters help track the effectiveness of your marketing campaigns.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base">Default UTM Sources</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  These sources are automatically tracked when present in URLs.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="utm-google" defaultChecked={true} />
                    <Label htmlFor="utm-google">Google (utm_source=google)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="utm-facebook" defaultChecked={true} />
                    <Label htmlFor="utm-facebook">Facebook (utm_source=facebook)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="utm-instagram" defaultChecked={true} />
                    <Label htmlFor="utm-instagram">Instagram (utm_source=instagram)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="utm-email" defaultChecked={true} />
                    <Label htmlFor="utm-email">Email (utm_source=email)</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base">Analytics Integration</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="utm-to-ga" defaultChecked={true} />
                  <Label htmlFor="utm-to-ga">Send UTM data to Google Analytics</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="utm-to-fb" defaultChecked={true} />
                  <Label htmlFor="utm-to-fb">Send UTM data to Facebook Pixel</Label>
                </div>
              </div>
            </div>
            
            <Button className="mt-4 bg-[#B89B7A] hover:bg-[#A38A69]">
              Save UTM Settings
            </Button>
            
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/admin/analytics?tab=utm">
                  View UTM Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="pixel">
        <Card>
          <CardHeader>
            <CardTitle>Facebook Pixel Configuration</CardTitle>
            <CardDescription>Configure Facebook Pixel IDs for each funnel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">Funnel 1 - Quiz como Isca</Label>
                <p className="text-sm text-muted-foreground">
                  Configurações para o funil iniciado na página raiz (/)
                </p>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="funnel1-pixel-id">Pixel ID</Label>
                    <Input 
                      id="funnel1-pixel-id" 
                      value={funnel1PixelId}
                      onChange={(e) => setFunnel1PixelId(e.target.value)}
                      placeholder="e.g. 123456789012345"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="funnel1-campaign">UTM Campaign</Label>
                    <Input 
                      id="funnel1-campaign" 
                      value={funnel1Campaign}
                      onChange={(e) => setFunnel1Campaign(e.target.value)}
                      placeholder="e.g. Quiz como Isca"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label className="text-base">Funnel 2 - Quiz Embutido</Label>
                <p className="text-sm text-muted-foreground">
                  Configurações para o funil iniciado em /quiz-descubra-seu-estilo
                </p>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="funnel2-pixel-id">Pixel ID</Label>
                    <Input 
                      id="funnel2-pixel-id" 
                      value={funnel2PixelId}
                      onChange={(e) => setFunnel2PixelId(e.target.value)}
                      placeholder="e.g. 123456789012345"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="funnel2-campaign">UTM Campaign</Label>
                    <Input 
                      id="funnel2-campaign" 
                      value={funnel2Campaign}
                      onChange={(e) => setFunnel2Campaign(e.target.value)}
                      placeholder="e.g. Quiz Embutido"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="pixel-enabled" defaultChecked={true} />
              <Label htmlFor="pixel-enabled">Enable Facebook Pixel tracking</Label>
            </div>
            
            <Button 
              className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
              onClick={handleSavePixelSettings}
            >
              Save Pixel Settings
            </Button>
            
            <div className="pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/admin/analytics?tab=integration">
                  View Pixel Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
