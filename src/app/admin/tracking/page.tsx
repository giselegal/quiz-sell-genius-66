
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Code, Eye, Save } from 'lucide-react';

export default function TrackingPage() {
  const [facebookPixelId, setFacebookPixelId] = useState('');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [gtmId, setGtmId] = useState('');
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#432818]">Pixels & Tracking</h1>
        <p className="text-[#B89B7A] mt-1">Configure seus pixels de conversão e ferramentas de analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-5 h-5 text-[#B89B7A]" />
            <h3 className="text-lg font-semibold text-[#432818]">Facebook Pixel</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="facebook-pixel">Pixel ID</Label>
              <Input
                id="facebook-pixel"
                value={facebookPixelId}
                onChange={(e) => setFacebookPixelId(e.target.value)}
                placeholder="123456789012345"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="facebook-enabled">Ativo</Label>
              <Switch
                id="facebook-enabled"
                checked={trackingEnabled}
                onCheckedChange={setTrackingEnabled}
              />
            </div>
            
            <Button className="w-full bg-[#1877F2] hover:bg-[#166FE5]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-5 h-5 text-[#B89B7A]" />
            <h3 className="text-lg font-semibold text-[#432818]">Google Analytics</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="ga-id">Measurement ID</Label>
              <Input
                id="ga-id"
                value={googleAnalyticsId}
                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            
            <div>
              <Label htmlFor="gtm-id">GTM Container ID</Label>
              <Input
                id="gtm-id"
                value={gtmId}
                onChange={(e) => setGtmId(e.target.value)}
                placeholder="GTM-XXXXXXX"
              />
            </div>
            
            <Button className="w-full bg-[#4285F4] hover:bg-[#3367D6]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#432818] mb-4">Status dos Pixels</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F5F2E9] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-[#432818]">Facebook Pixel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600">Ativo</span>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#F5F2E9] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-[#432818]">Google Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-yellow-600">Configuração Pendente</span>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#F5F2E9] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="font-medium text-[#432818]">Google Tag Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Inativo</span>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
