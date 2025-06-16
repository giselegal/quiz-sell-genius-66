
import React, { useState } from 'react';
import { InlineEditableText } from '../canvas/InlineEditableText';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditableQuizIntroProps {
  isPreviewMode?: boolean;
  onStart?: (name: string) => void;
}

export const EditableQuizIntro: React.FC<EditableQuizIntroProps> = ({
  isPreviewMode = false,
  onStart
}) => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [logoSrc, setLogoSrc] = useState('https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png');
  const [title, setTitle] = useState('Teste de Estilo Pessoal');
  const [imageSrc, setImageSrc] = useState('https://cakto-quiz-br01.b-cdn.net/uploads/ecbe689b-1c0a-4071-98d3-4d391b6dd98f.png');
  const [buttonText, setButtonText] = useState('Continuar');
  const [nameLabel, setNameLabel] = useState('NOME');
  const [namePlaceholder, setNamePlaceholder] = useState('Digite seu nome aqui...');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError('Por favor, digite seu nome para continuar');
      return;
    }
    
    setError('');
    if (onStart) {
      onStart(nome);
    }
  };

  if (isPreviewMode) {
    // Renderização em modo preview (funcional)
    return (
      <div className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 md:p-5 pb-10">
        {/* Header */}
        <div className="grid gap-4 opacity-100">
          <div className="flex flex-row w-full h-auto justify-center relative">
            <Button variant="ghost" className="absolute left-0 h-10 w-10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col w-full justify-start items-center gap-4">
              <img 
                width="96" 
                height="96" 
                className="max-w-24 object-cover" 
                alt="Logo" 
                src={logoSrc}
              />
              <Progress value={7.14} className="w-full h-2 bg-zinc-300" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content w-full relative mx-auto h-full">
          <div className="flex flex-row flex-wrap pb-10 space-y-6">
            {/* Title */}
            <div className="w-full">
              <h1 className="min-w-full text-3xl font-bold text-center">
                {title}
              </h1>
            </div>

            {/* Image */}
            <div className="w-full">
              <div className="grid">
                <div className="text-lg">
                  <div className="text-lg flex items-center justify-center">
                    <img 
                      src={imageSrc} 
                      width="640" 
                      height="480" 
                      alt="Imagem" 
                      className="object-cover w-full h-auto rounded-lg max-w-96"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm font-medium leading-none">
                  {nameLabel} <span>*</span>
                </Label>
                <Input
                  className="flex h-10 w-full rounded-md border border-input bg-background text-base text-left p-4"
                  placeholder={namePlaceholder}
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (error) setError('');
                  }}
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="min-w-full h-14"
              >
                {buttonText}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-10 md:pt-24"></div>
      </div>
    );
  }

  // Renderização em modo de edição
  return (
    <div className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 md:p-5 pb-10">
      {/* Header Editável */}
      <div className="grid gap-4 opacity-100">
        <div className="flex flex-row w-full h-auto justify-center relative border-2 border-dashed border-blue-300 rounded-md p-2">
          <Button variant="ghost" className="absolute left-0 h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col w-full justify-start items-center gap-4">
            <div className="border border-blue-300 rounded p-2">
              <InlineEditableText
                value={logoSrc}
                onChange={setLogoSrc}
                placeholder="URL do logo"
                className="text-sm"
              />
              <img 
                width="96" 
                height="96" 
                className="max-w-24 object-cover mt-2" 
                alt="Logo" 
                src={logoSrc}
              />
            </div>
            <Progress value={7.14} className="w-full h-2 bg-zinc-300" />
          </div>
        </div>
      </div>

      {/* Main Content Editável */}
      <div className="main-content w-full relative mx-auto h-full">
        <div className="flex flex-row flex-wrap pb-10 space-y-6">
          {/* Title Editável */}
          <div className="w-full border-2 border-dashed border-blue-300 rounded-md p-2">
            <InlineEditableText
              value={title}
              onChange={setTitle}
              placeholder="Título da introdução"
              className="min-w-full text-3xl font-bold text-center"
            />
          </div>

          {/* Image Editável */}
          <div className="w-full border-2 border-dashed border-blue-300 rounded-md p-2">
            <InlineEditableText
              value={imageSrc}
              onChange={setImageSrc}
              placeholder="URL da imagem"
              className="text-sm mb-2"
            />
            <div className="grid">
              <div className="text-lg">
                <div className="text-lg flex items-center justify-center">
                  <img 
                    src={imageSrc} 
                    width="640" 
                    height="480" 
                    alt="Imagem" 
                    className="object-cover w-full h-auto rounded-lg max-w-96"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Editável */}
          <div className="w-full border-2 border-dashed border-blue-300 rounded-md p-4 space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <div className="flex items-center gap-2">
                <InlineEditableText
                  value={nameLabel}
                  onChange={setNameLabel}
                  placeholder="Label do campo"
                  className="text-sm font-medium"
                />
                <span>*</span>
              </div>
              <InlineEditableText
                value={namePlaceholder}
                onChange={setNamePlaceholder}
                placeholder="Placeholder do input"
                className="text-sm text-gray-500 mb-2"
              />
              <Input
                className="flex h-10 w-full rounded-md border border-input bg-background text-base text-left p-4"
                placeholder={namePlaceholder}
                type="text"
                value=""
                disabled
              />
            </div>

            <div className="border border-blue-300 rounded p-2">
              <InlineEditableText
                value={buttonText}
                onChange={setButtonText}
                placeholder="Texto do botão"
                className="text-center font-medium"
              />
              <Button className="min-w-full h-14 mt-2" disabled>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 md:pt-24"></div>
    </div>
  );
};
