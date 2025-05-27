
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UtmParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  id?: string;
  fbclid?: string;
}

export const useUtmParameters = () => {
  const [utmParams, setUtmParams] = useState<UtmParameters>({});
  const [domainBase, setDomainBase] = useState<string>('giselegalvao.com.br');
  
  useEffect(() => {
    const savedDomain = localStorage.getItem('domain_base');
    if (savedDomain) {
      setDomainBase(savedDomain);
    }
    
    const capturedParams = captureUtmParameters();
    setUtmParams(capturedParams);
    
    if (Object.keys(capturedParams).length > 0) {
      saveUtmToSupabase(capturedParams);
    }
  }, []);

  const saveUtmToSupabase = async (params: UtmParameters) => {
    try {
      const { error } = await supabase.from('utm_analytics').insert({
        utm_source: params.source,
        utm_medium: params.medium,
        utm_campaign: params.campaign
      });
      
      if (error) {
        console.error('Error saving UTM parameters to Supabase:', error);
      } else {
        console.log('UTM parameters saved to Supabase successfully');
      }
    } catch (error) {
      console.error('Error in saveUtmToSupabase:', error);
    }
  };

  const captureUtmParameters = (): UtmParameters => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams: UtmParameters = {};
      
      if (urlParams.has('utm_source')) utmParams.source = urlParams.get('utm_source') || undefined;
      if (urlParams.has('utm_medium')) utmParams.medium = urlParams.get('utm_medium') || undefined;
      if (urlParams.has('utm_campaign')) utmParams.campaign = urlParams.get('utm_campaign') || undefined;
      if (urlParams.has('utm_content')) utmParams.content = urlParams.get('utm_content') || undefined;
      if (urlParams.has('utm_term')) utmParams.term = urlParams.get('utm_term') || undefined;
      if (urlParams.has('utm_id')) utmParams.id = urlParams.get('utm_id') || undefined;
      if (urlParams.has('fbclid')) utmParams.fbclid = urlParams.get('fbclid') || undefined;
      
      if (Object.keys(utmParams).length > 0) {
        localStorage.setItem('utm_parameters', JSON.stringify(utmParams));
        console.log('UTM parameters captured:', utmParams);
      } else {
        const storedUtmParams = localStorage.getItem('utm_parameters');
        if (storedUtmParams) {
          return JSON.parse(storedUtmParams);
        }
      }
      
      return utmParams;
    } catch (error) {
      console.error('Error capturing UTM parameters:', error);
      return {};
    }
  };

  const isFromCampaign = (campaignName?: string): boolean => {
    if (!campaignName) return Object.keys(utmParams).length > 0;
    return utmParams.campaign === campaignName;
  };

  const isFromSource = (sourceName?: string): boolean => {
    if (!sourceName) return !!utmParams.source;
    return utmParams.source === sourceName;
  };

  const getUtmParameter = (param: keyof UtmParameters): string | undefined => {
    return utmParams[param];
  };

  const addUtmToUrl = (url: string): string => {
    if (Object.keys(utmParams).length === 0) return url;
    
    try {
      const urlObj = new URL(url);
      if (utmParams.source) urlObj.searchParams.append('utm_source', utmParams.source);
      if (utmParams.medium) urlObj.searchParams.append('utm_medium', utmParams.medium);
      if (utmParams.campaign) urlObj.searchParams.append('utm_campaign', utmParams.campaign);
      if (utmParams.content) urlObj.searchParams.append('utm_content', utmParams.content);
      if (utmParams.term) urlObj.searchParams.append('utm_term', utmParams.term);
      if (utmParams.id) urlObj.searchParams.append('utm_id', utmParams.id);
      if (utmParams.fbclid) urlObj.searchParams.append('fbclid', utmParams.fbclid);
      
      return urlObj.toString();
    } catch (error) {
      console.error('Error adding UTM parameters to URL:', error);
      return url;
    }
  };

  const setBaseDomain = (domain: string) => {
    setDomainBase(domain);
    localStorage.setItem('domain_base', domain);
  };

  const generateUtmLink = (
    path: string = '',
    source: string = 'facebook',
    medium: string = 'social',
    campaign: string = 'brand',
    content?: string,
    term?: string
  ): string => {
    let baseUrl = `https://${domainBase}`;
    if (path && !path.startsWith('/')) {
      baseUrl += '/';
    }
    baseUrl += path;

    const url = new URL(baseUrl);
    url.searchParams.append('utm_source', source);
    url.searchParams.append('utm_medium', medium);
    url.searchParams.append('utm_campaign', campaign);
    if (content) url.searchParams.append('utm_content', content);
    if (term) url.searchParams.append('utm_term', term);

    return url.toString();
  };

  return {
    utmParams,
    captureUtmParameters,
    isFromCampaign,
    isFromSource,
    getUtmParameter,
    addUtmToUrl,
    domainBase,
    setBaseDomain,
    generateUtmLink
  };
};
