import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Video } from 'lucide-react';

interface VideoPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const VideoPropertyEditor: React.FC<VideoPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content || {};

  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Video className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Vídeo</div>
          <div className="text-xs text-[#8F7A6A]">Configure o player de vídeo</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="videoUrl" className="text-sm font-medium text-[#432818]">
            URL do Vídeo
          </Label>
          <Input
            id="videoUrl"
            type="url"
            value={content.videoUrl || ''}
            onChange={(e) => handleUpdate('videoUrl', e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
          <div className="text-xs text-[#8F7A6A]">
            Suporta YouTube, Vimeo e links diretos
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail" className="text-sm font-medium text-[#432818]">
            Thumbnail Personalizada (Opcional)
          </Label>
          <Input
            id="thumbnail"
            type="url"
            value={content.thumbnail || ''}
            onChange={(e) => handleUpdate('thumbnail', e.target.value)}
            placeholder="https://exemplo.com/thumb.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
            Título do Vídeo (Opcional)
          </Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
            placeholder="Título do vídeo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-[#432818]">
            Descrição (Opcional)
          </Label>
          <Textarea
            id="description"
            rows={3}
            value={content.description || ''}
            onChange={(e) => handleUpdate('description', e.target.value)}
            placeholder="Breve descrição do vídeo..."
            className="resize-none"
          />
        </div>

        {content.thumbnail && (
          <div className="p-3 bg-[#FAF9F7] rounded-lg">
            <div className="text-xs text-[#8F7A6A] mb-2">Preview da thumbnail:</div>
            <img 
              src={content.thumbnail} 
              alt="Preview" 
              className="w-full max-w-xs h-auto rounded object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
