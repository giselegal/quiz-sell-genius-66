
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AppearanceTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>
            Customize the appearance of your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <Input 
              id="primary-color" 
              type="color"
              defaultValue="#B89B7A"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <Input 
              id="secondary-color" 
              type="color"
              defaultValue="#aa6b5d"
            />
          </div>

          <Button className="bg-[#B89B7A] hover:bg-[#A38A69]">
            Save Appearance Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
