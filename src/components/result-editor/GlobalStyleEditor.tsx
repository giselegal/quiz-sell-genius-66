
import React from 'react';
import { Label } from '@/components/ui/label';
import { ColorPicker } from './ColorPicker';
interface GlobalStyleEditorProps {
  globalStyles: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  onUpdate: (styles: any) => void;
}
const GlobalStyleEditor: React.FC<GlobalStyleEditorProps> = ({
  globalStyles,
  onUpdate
}) => {
  const handleChange = (key: string, value: string) => {
    onUpdate({
      ...globalStyles,
      [key]: value
    });
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Cores da Marca</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cor Primária</Label>
            <ColorPicker
              color={globalStyles.primaryColor || '#B89B7A'}
              onChange={(color) => handleChange('primaryColor', color)}
            />
            <p className="text-xs text-[#8F7A6A]">Usada em títulos, botões e destaques</p>
          </div>
          
            <Label>Cor Secundária</Label>
              color={globalStyles.secondaryColor || '#432818'}
              onChange={(color) => handleChange('secondaryColor', color)}
            <p className="text-xs text-[#8F7A6A]">Usada em subtítulos e elementos secundários</p>
            <Label>Cor do Texto</Label>
              color={globalStyles.textColor || '#1A1818'}
              onChange={(color) => handleChange('textColor', color)}
            <Label>Cor de Fundo</Label>
              color={globalStyles.backgroundColor || '#fffaf7'}
              onChange={(color) => handleChange('backgroundColor', color)}
        </div>
      </div>
      
        <h3 className="text-lg font-medium mb-4">Tipografia</h3>
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Fonte Principal</Label>
          <select
            id="fontFamily"
            className="w-full border rounded-md p-2"
            value={globalStyles.fontFamily || ''}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
          >
            <option value="">Padrão do Sistema</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Arial', sans-serif">Arial</option>
          </select>
    </div>
  );
};
export default GlobalStyleEditor;
