import React from 'react';
import type { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ContactPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const ContactPropertyEditor: React.FC<ContactPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Entre em Contato',
    subtitle: 'Estamos aqui para ajudar você',
    phone: '(11) 99999-9999',
    email: 'contato@exemplo.com',
    address: 'Rua Exemplo, 123\nSão Paulo, SP\n01234-567',
    hours: 'Segunda a Sexta: 9h às 18h\nSábado: 9h às 12h'
  };

  const updateContent = (field: string, value: string) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contact-title">Título</Label>
        <Input
          id="contact-title"
          value={content.title}
          onChange={(e) => updateContent('title', e.target.value)}
          placeholder="Título do contato"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subtitle">Subtítulo</Label>
        <Input
          id="contact-subtitle"
          value={content.subtitle}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          placeholder="Subtítulo do contato"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-phone">Telefone</Label>
        <Input
          id="contact-phone"
          value={content.phone}
          onChange={(e) => updateContent('phone', e.target.value)}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">E-mail</Label>
        <Input
          id="contact-email"
          type="email"
          value={content.email}
          onChange={(e) => updateContent('email', e.target.value)}
          placeholder="contato@exemplo.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-address">Endereço</Label>
        <Textarea
          id="contact-address"
          value={content.address}
          onChange={(e) => updateContent('address', e.target.value)}
          placeholder="Endereço completo"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-hours">Horário de Funcionamento</Label>
        <Textarea
          id="contact-hours"
          value={content.hours}
          onChange={(e) => updateContent('hours', e.target.value)}
          placeholder="Horários de atendimento"
          rows={2}
        />
      </div>
    </Card>
  );
};
