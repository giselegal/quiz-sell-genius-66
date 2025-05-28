import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp,
  Link as LinkIcon,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy
} from 'lucide-react';
import { useHotmart, hotmart, HotmartProduct, HotmartSale } from '@/utils/hotmartIntegration';
import { toast } from '@/components/ui/use-toast';
import { whatsappRemarketing } from '@/utils/whatsappRemarketing';
import WhatsAppRemarketingTab from '@/components/admin/integrations/WhatsAppRemarketingTab';

export default function HotmartDashboard() {
  // ...existing code...
}