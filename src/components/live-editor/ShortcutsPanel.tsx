import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Keyboard, Command } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Shortcut {
  keys: string[];
  description: string;
  mac: string[];
}

interface ShortcutsPanelProps {
  shortcuts: Shortcut[];
}

export const ShortcutsPanel: React.FC<ShortcutsPanelProps> = ({
  shortcuts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const formatKeys = (keys: string[], macKeys: string[]) => {
    const keysToUse = isMac ? macKeys : keys;
    return keysToUse.join(' + ');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "bg-white/90 backdrop-blur-sm shadow-lg border-[#B89B7A]/20",
              "hover:bg-[#FAF9F7] hover:border-[#B89B7A]/40",
              "transition-all duration-200"
            )}
          >
            <Keyboard className="h-4 w-4 mr-2" />
            Atalhos
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          className="w-80 p-0 bg-white/95 backdrop-blur-sm border-[#B89B7A]/20"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Command className="h-4 w-4 text-[#B89B7A]" />
              <h3 className="font-semibold text-[#432818]">Atalhos de Teclado</h3>
            </div>
            
            <div className="space-y-2">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#FAF9F7]/50 transition-colors"
                >
                  <span className="text-sm text-[#432818]">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {formatKeys(shortcut.keys, shortcut.mac).split(' + ').map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        {keyIndex > 0 && <span className="text-xs text-[#8F7A6A] mx-1">+</span>}
                        <Badge
                          variant="outline"
                          className="text-xs font-mono bg-white border-[#B89B7A]/30 text-[#432818]"
                        >
                          {key}
                        </Badge>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#B89B7A]/20">
              <p className="text-xs text-[#8F7A6A] text-center">
                {isMac ? '⌘ = Command, ⇧ = Shift' : 'Ctrl = Control'}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
