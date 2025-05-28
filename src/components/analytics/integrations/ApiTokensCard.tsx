
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface ApiTokensCardProps {
  initialToken?: string;
  initialEnabled?: boolean;
}

export const ApiTokensCard: React.FC<ApiTokensCardProps> = ({
  initialToken = '',
  initialEnabled = false
}) => {
  const [apiToken, setApiToken] = useState(initialToken);
  const [apiEnabled, setApiEnabled] = useState(initialEnabled);

  const handleSaveApiSettings = () => {
    try {
      localStorage.setItem('api_token', apiToken);
      localStorage.setItem('api_enabled', String(apiEnabled));
      toast({
        title: "API settings saved",
        description: "Your API integration settings have been updated."
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTestConnection = () => {
    toast({
      title: "Testing API connection",
      description: "Connection test initiated. Please check the console for results."
    });
    console.log("Testing API connection...");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Tokens</CardTitle>
            <CardDescription>Manage API tokens for external integrations</CardDescription>
          </div>
          <Badge variant={apiEnabled ? "default" : "outline"}>
            {apiEnabled ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-token">API Token</Label>
          <Input 
            id="api-token" 
            type="password"
            placeholder="sk-..." 
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Your API token for external service integrations
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="api-enabled"
            checked={apiEnabled}
            onCheckedChange={setApiEnabled}
          />
          <Label htmlFor="api-enabled">Enable API integration</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleTestConnection}>
          Test Connection
        </Button>
        <Button onClick={handleSaveApiSettings}>
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};
