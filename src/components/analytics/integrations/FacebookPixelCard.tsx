
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import { FUNNEL_CONFIGS, getCurrentFunnel } from '@/services/pixelManager';

interface FacebookPixelCardProps {
  testFunction: () => boolean;
}

export const FacebookPixelCard: React.FC<FacebookPixelCardProps> = ({
  testFunction
}) => {
  const [pixelEnabled, setPixelEnabled] = useState(() => {
    return localStorage.getItem('fb_pixel_enabled') !== 'false';
  });
  
  const [activeTab, setActiveTab] = useState('funnel1');

  const handleTestPixel = () => {
    try {
      const result = testFunction();
      if (result) {
        toast({
          title: 'Teste bem-sucedido',
          description: 'Evento de teste enviado ao Facebook Pixel com sucesso.',
        });
      } else {
        toast({
          title: 'Falha no teste',
          description: 'O Facebook Pixel não está inicializado corretamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao testar o Facebook Pixel.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyPixelId = (pixelId: string) => {
    navigator.clipboard.writeText(pixelId);
    toast({
      title: 'Copiado',
      description: 'ID do Pixel copiado para a área de transferência.',
    });
  };

  const handleTogglePixel = (enabled: boolean) => {
    setPixelEnabled(enabled);
    localStorage.setItem('fb_pixel_enabled', String(enabled));
    
    toast({
      title: enabled ? 'Pixel ativado' : 'Pixel desativado',
      description: enabled 
        ? 'O Facebook Pixel está agora rastreando eventos.' 
        : 'O Facebook Pixel foi desativado para todas as páginas.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Facebook Pixel
          <Switch 
            checked={pixelEnabled}
            onCheckedChange={handleTogglePixel}
          />
        </CardTitle>
        <CardDescription>
          Gerencie a configuração do Facebook Pixel para rastreamento de eventos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="funnel1">Funil 1 - Quiz como Isca</TabsTrigger>
            <TabsTrigger value="funnel2">Funil 2 - Quiz Embutido</TabsTrigger>
          </TabsList>
          
          <TabsContent value="funnel1" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="pixel-id-1">ID do Pixel</Label>
              <div className="flex">
                <Input 
                  id="pixel-id-1" 
                  value={FUNNEL_CONFIGS.default.pixelId}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => handleCopyPixelId(FUNNEL_CONFIGS.default.pixelId)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Este é o ID do Pixel usado no Funil 1 (caminho raiz "/")
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Rota do Funil</Label>
              <div className="bg-muted p-2 rounded text-sm font-mono flex items-center">
                <span className="text-green-600">/</span>
                <ArrowRight className="h-3 w-3 mx-2 text-muted-foreground" />
                <span className="text-green-600">/resultado</span>
                <ArrowRight className="h-3 w-3 mx-2 text-muted-foreground" />
                <span>Checkout</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Campanha UTM</Label>
              <div className="bg-muted p-2 rounded text-sm font-mono">
                {FUNNEL_CONFIGS.default.utmCampaign}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="funnel2" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="pixel-id-2">ID do Pixel</Label>
              <div className="flex">
                <Input 
                  id="pixel-id-2" 
                  value={FUNNEL_CONFIGS['quiz-descubra-seu-estilo'].pixelId}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => handleCopyPixelId(FUNNEL_CONFIGS['quiz-descubra-seu-estilo'].pixelId)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Este é o ID do Pixel usado no Funil 2 (caminho "/quiz-descubra-seu-estilo")
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Rota do Funil</Label>
              <div className="bg-muted p-2 rounded text-sm font-mono flex items-center">
                <span className="text-green-600">/quiz-descubra-seu-estilo</span>
                <ArrowRight className="h-3 w-3 mx-2 text-muted-foreground" />
                <span>Checkout</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Campanha UTM</Label>
              <div className="bg-muted p-2 rounded text-sm font-mono">
                {FUNNEL_CONFIGS['quiz-descubra-seu-estilo'].utmCampaign}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            onClick={handleTestPixel}
            className="w-full"
          >
            Testar Pixel
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 border-t px-6 py-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Check className="h-3 w-3 mr-1 text-green-500" />
          <span>Funil atual: </span>
          <span className="ml-1 font-medium">
            {getCurrentFunnel() === 'default' ? 'Quiz como Isca' : 'Quiz Embutido'} 
            ({getCurrentFunnel()})
          </span>
        </div>
        <Button 
          variant="link" 
          className="h-auto p-0 text-xs"
          asChild
        >
          <a 
            href="https://business.facebook.com/events_manager/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            Abrir Facebook Events Manager
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FacebookPixelCard;
