"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FacebookPixelCard } from '@/components/analytics/integrations/FacebookPixelCard';
import { GoogleAnalyticsCard } from '@/components/analytics/integrations/GoogleAnalyticsCard';
import { ApiTokensCard } from '@/components/analytics/integrations/ApiTokensCard';
import { WebhookCard } from '@/components/analytics/integrations/WebhookCard';
import { MarketingPlatformsCard } from '@/components/analytics/integrations/MarketingPlatformsCard';
import EventLogger from '@/components/analytics/EventLogger';
interface IntegrationTabProps {
  analyticsData: any;
  testFunction: () => boolean;
}
export const IntegrationTab: React.FC<IntegrationTabProps> = ({
  analyticsData,
  testFunction
}) => {
  const [activeTab, setActiveTab] = useState('tracking');
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações e Conexões</CardTitle>
          <CardDescription>
            Conecte seus dados a outras plataformas e serviços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="tracking">Pixels</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="eventlog">Log de Eventos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracking">
              <div className="space-y-4">
                <FacebookPixelCard testFunction={testFunction} />
              </div>
            </TabsContent>
            <TabsContent value="analytics">
                <GoogleAnalyticsCard />
            <TabsContent value="marketing">
                <MarketingPlatformsCard />
            <TabsContent value="api">
                <ApiTokensCard />
            <TabsContent value="webhooks">
                <WebhookCard />
            <TabsContent value="eventlog">
                <EventLogger />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
export default IntegrationTab;
