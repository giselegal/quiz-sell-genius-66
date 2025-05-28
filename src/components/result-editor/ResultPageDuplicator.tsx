
"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ResultPageDuplicatorProps {
  onDuplicate: (fromStyle: string, toStyle: string, newTitle: string) => void;
  availableStyles: string[];
  currentStyle: string;
}

export const ResultPageDuplicator: React.FC<ResultPageDuplicatorProps> = ({
  onDuplicate,
  availableStyles,
  currentStyle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetStyle, setTargetStyle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [sourceStyle, setSourceStyle] = useState(currentStyle);

  const handleDuplicate = () => {
    if (!targetStyle || !newTitle.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de duplicar",
        variant: "destructive"
      });
      return;
    }

    try {
      onDuplicate(sourceStyle, targetStyle, newTitle.trim());
      setIsOpen(false);
      setTargetStyle('');
      setNewTitle('');
      
      toast({
        title: "Página duplicada",
        description: `Configuração copiada para ${targetStyle} com sucesso`,
      });
    } catch (error) {
      console.error('Error duplicating page:', error);
      toast({
        title: "Erro ao duplicar",
        description: "Não foi possível duplicar a página",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Duplicar para Outro Estilo
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Duplicar Página de Resultado</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="sourceStyle">Estilo de Origem</Label>
            <Select value={sourceStyle} onValueChange={setSourceStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="targetStyle">Estilo de Destino</Label>
            <Select value={targetStyle} onValueChange={setTargetStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estilo de destino" />
              </SelectTrigger>
              <SelectContent>
                {availableStyles
                  .filter(style => style !== sourceStyle)
                  .map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="newTitle">Título da Nova Página</Label>
            <Input
              id="newTitle"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Digite o título da nova página"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDuplicate}>
              <Plus className="w-4 h-4 mr-2" />
              Duplicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
