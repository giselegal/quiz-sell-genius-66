import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { ComponentDefinition } from './ComponentRegistry';

interface ComponentToolbarProps {
  categories: any[];
  components: ComponentDefinition[];
  collapsed: boolean;
}

const DraggableComponent: React.FC<{ component: ComponentDefinition }> = ({ component }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: component.id,
    data: { type: 'component' }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Icon = component.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border border-gray-200 rounded-lg cursor-grab hover:border-blue-400 hover:bg-blue-50 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <Icon className="w-6 h-6 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">{component.label}</span>
        <span className="text-xs text-gray-500">{component.description}</span>
      </div>
    </div>
  );
};

export const ComponentToolbar: React.FC<ComponentToolbarProps> = ({ 
  categories, 
  components, 
  collapsed 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('basic');

  if (collapsed) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-2">
          {components.slice(0, 4).map((component) => {
            const Icon = component.icon;
            return (
              <div
                key={component.id}
                className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                title={component.label}
              >
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const filteredComponents = components.filter(component =>
    component.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const componentsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = filteredComponents.filter(comp => comp.category === category.id);
    return acc;
  }, {} as Record<string, ComponentDefinition[]>);

  return (
    <div className="flex-1 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar componentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-4">
          {categories.slice(0, 2).map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-xs"
            >
              <category.icon className="w-4 h-4 mr-1" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsList className="grid grid-cols-3 mx-4 mt-2">
          {categories.slice(2).map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-xs"
            >
              <category.icon className="w-4 h-4 mr-1" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Components Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 gap-3">
                {componentsByCategory[category.id]?.map((component) => (
                  <DraggableComponent key={component.id} component={component} />
                ))}
                
                {componentsByCategory[category.id]?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <category.icon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Nenhum componente encontrado</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
