"use client";
import { safeLocalStorage } from "@/utils/safeLocalStorage";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCcw, Info, Play, CheckCircle, Eye, Users, ShoppingCart, MousePointer } from 'lucide-react';
interface LoggedEvent {
  type: string;
  timestamp: string;
  details?: any;
}
export const EventLogger: React.FC = () => {
  const [events, setEvents] = useState<LoggedEvent[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const loadEvents = () => {
    try {
      const eventsJson = safeLocalStorage.getItem('fb_pixel_event_log');
      const loadedEvents = eventsJson ? JSON.parse(eventsJson) : [];
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      setEvents([]);
    }
  };
  useEffect(() => {
    loadEvents();
    // Configurar atualização automática a cada 5 segundos
    const interval = setInterval(() => {
      loadEvents();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const clearEvents = () => {
    safeLocalStorage.removeItem('fb_pixel_event_log');
    setEvents([]);
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'QuizStart':
        return <Play className="h-4 w-4" />;
      case 'QuizAnswer':
        return <Info className="h-4 w-4" />;
      case 'QuizComplete':
        return <CheckCircle className="h-4 w-4" />;
      case 'ResultView':
        return <Eye className="h-4 w-4" />;
      case 'Lead':
        return <Users className="h-4 w-4" />;
      case 'Purchase':
        return <ShoppingCart className="h-4 w-4" />;
      case 'ButtonClick':
        return <MousePointer className="h-4 w-4" />;
      default:
  const getEventColor = (type: string) => {
        return 'bg-blue-500';
        return 'bg-purple-500';
        return 'bg-green-500';
        return 'bg-yellow-500';
        return 'bg-indigo-500';
        return 'bg-red-500';
        return 'bg-orange-500';
        return 'bg-gray-500';
  const filteredEvents = filter 
    ? events.filter(event => event.type === filter)
    : events;
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">Log de Eventos Facebook Pixel</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Eventos enviados para o Facebook Pixel
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => loadEvents()}
            >
              <RefreshCcw className="h-3.5 w-3.5 mr-1" />
              Atualizar
            </Button>
              onClick={() => clearEvents()}
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Limpar
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge 
            variant={filter === null ? "default" : "outline"}
            className="cursor-pointer text-[10px] h-5"
            onClick={() => setFilter(null)}
          >
            Todos
          </Badge>
            variant={filter === 'QuizStart' ? "default" : "outline"}
            onClick={() => setFilter('QuizStart')}
            Início Quiz
            variant={filter === 'QuizAnswer' ? "default" : "outline"}
            onClick={() => setFilter('QuizAnswer')}
            Respostas
            variant={filter === 'QuizComplete' ? "default" : "outline"}
            onClick={() => setFilter('QuizComplete')}
            Conclusão
            variant={filter === 'ResultView' ? "default" : "outline"}
            onClick={() => setFilter('ResultView')}
            Resultados
            variant={filter === 'Lead' ? "default" : "outline"}
            onClick={() => setFilter('Lead')}
            Leads
            variant={filter === 'Purchase' ? "default" : "outline"}
            onClick={() => setFilter('Purchase')}
            Compras
            variant={filter === 'ButtonClick' ? "default" : "outline"}
            onClick={() => setFilter('ButtonClick')}
            Cliques
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto pb-0">
        <div className="space-y-2">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              {filter ? `Nenhum evento "${filter}" registrado` : "Nenhum evento registrado"}
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <div 
                key={index} 
                className="text-xs border rounded-md p-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1.5 ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <div className="font-medium">{event.type}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString('pt-BR')}
                      </div>
                  </div>
                </div>
                {event.details && (
                  <div className="mt-2 pl-8 text-[10px] text-muted-foreground">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(event.details, null, 2)}
                    </pre>
                )}
              </div>
            ))
          )}
      </CardContent>
    </Card>
  );
};
export default EventLogger;
