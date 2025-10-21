import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditorSidebar = ({ 
  activeTemplate, 
  onContentUpdate, 
  onImageUpdate, 
  onStyleUpdate,
  onGenerateContent 
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: 'content', label: 'Contenido', icon: 'FileText' },
    { id: 'images', label: 'Imágenes', icon: 'Image' },
    { id: 'style', label: 'Estilo', icon: 'Palette' },
    { id: 'layout', label: 'Diseño', icon: 'Layout' }
  ];

  const colorSchemes = [
    { value: 'modern', label: 'Moderno' },
    { value: 'classic', label: 'Clásico' },
    { value: 'vibrant', label: 'Vibrante' },
    { value: 'minimal', label: 'Minimalista' }
  ];

  const fontOptions = [
    { value: 'inter', label: 'Inter (Moderno)' },
    { value: 'roboto', label: 'Roboto (Limpio)' },
    { value: 'playfair', label: 'Playfair (Elegante)' },
    { value: 'montserrat', label: 'Montserrat (Versátil)' }
  ];

  const handleGenerateContent = async (type) => {
    setIsGenerating(true);
    // Simulate AI content generation
    setTimeout(() => {
      const generatedContent = {
        headline: "Descubre el Sabor Auténtico en Cada Bocado",
        description: "Restaurante familiar con más de 20 años de tradición culinaria, ofreciendo los mejores platos de la cocina mediterránea con ingredientes frescos y locales.",
        body: `Bienvenidos a nuestro acogedor restaurante donde cada plato cuenta una historia de tradición y pasión por la gastronomía.\n\nNuestro chef ejecutivo, con más de 15 años de experiencia, ha creado un menú que combina recetas tradicionales con toques modernos, utilizando únicamente ingredientes de la más alta calidad.\n\nVen y disfruta de una experiencia culinaria única en un ambiente cálido y familiar.`
      };
      
      if (onGenerateContent) {
        onGenerateContent(type, generatedContent);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Editor de Contenido</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Sparkles"
          iconPosition="left"
          loading={isGenerating}
          onClick={() => handleGenerateContent('text')}
        >
          Generar IA
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          label="Título Principal"
          type="text"
          placeholder="Ingresa el título principal"
          value={activeTemplate?.content?.headline || ''}
          onChange={(e) => onContentUpdate('headline', e?.target?.value)}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Descripción Breve
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={3}
            placeholder="Descripción corta del negocio"
            value={activeTemplate?.content?.description || ''}
            onChange={(e) => onContentUpdate('description', e?.target?.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Contenido Principal
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={8}
            placeholder="Contenido detallado del sitio web"
            value={activeTemplate?.content?.body || ''}
            onChange={(e) => onContentUpdate('body', e?.target?.value)}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Información de Contacto</h4>
          <div className="space-y-3">
            <Input
              label="Teléfono"
              type="tel"
              placeholder="+34 XXX XXX XXX"
              value={activeTemplate?.contact?.phone || ''}
              onChange={(e) => onContentUpdate('phone', e?.target?.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="contacto@empresa.com"
              value={activeTemplate?.contact?.email || ''}
              onChange={(e) => onContentUpdate('email', e?.target?.value)}
            />
            <Input
              label="Dirección"
              type="text"
              placeholder="Calle Principal, 123"
              value={activeTemplate?.contact?.address || ''}
              onChange={(e) => onContentUpdate('address', e?.target?.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderImagesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Imágenes</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Sparkles"
          iconPosition="left"
          loading={isGenerating}
          onClick={() => handleGenerateContent('images')}
        >
          Generar IA
        </Button>
      </div>

      <div className="space-y-4">
        <div className="border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Imagen Principal</h4>
          <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
            {activeTemplate?.images?.hero ? (
              <img
                src={activeTemplate?.images?.hero}
                alt="Vista previa de imagen principal del restaurante con ambiente acogedor"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <Icon name="Image" size={32} className="mx-auto mb-2" />
                <p className="text-sm">Sin imagen</p>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Upload" fullWidth>
              Subir Imagen
            </Button>
            <Button variant="ghost" size="sm" iconName="Trash2">
              Eliminar
            </Button>
          </div>
        </div>

        <div className="border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Galería de Productos</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[1, 2, 3, 4]?.map((index) => (
              <div key={index} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-muted-foreground" />
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" iconName="FolderPlus" fullWidth>
            Agregar Imágenes
          </Button>
        </div>

        <div className="border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Logo del Negocio</h4>
          <div className="w-24 h-24 bg-muted rounded-md mb-3 flex items-center justify-center mx-auto">
            <Icon name="Building2" size={24} className="text-muted-foreground" />
          </div>
          <Button variant="outline" size="sm" iconName="Upload" fullWidth>
            Subir Logo
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStyleTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Personalización de Estilo</h3>

      <div className="space-y-4">
        <Select
          label="Esquema de Colores"
          options={colorSchemes}
          value={activeTemplate?.style?.colorScheme || 'modern'}
          onChange={(value) => onStyleUpdate('colorScheme', value)}
        />

        <Select
          label="Tipografía"
          options={fontOptions}
          value={activeTemplate?.style?.font || 'inter'}
          onChange={(value) => onStyleUpdate('font', value)}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Colores Personalizados
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Color Principal</label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded border border-border"></div>
                <Input
                  type="text"
                  placeholder="#2563EB"
                  value="#2563EB"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Color Secundario</label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded border border-border"></div>
                <Input
                  type="text"
                  placeholder="#64748B"
                  value="#64748B"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Opciones de Diseño</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Bordes Redondeados</span>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Sombras Suaves</span>
              <button className="w-12 h-6 bg-muted rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Animaciones</span>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Configuración de Diseño</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Estructura de Página
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'single', name: 'Página Única', icon: 'FileText' },
              { id: 'multi', name: 'Multi-página', icon: 'Files' },
              { id: 'landing', name: 'Landing Page', icon: 'MousePointer' }
            ]?.map((layout) => (
              <button
                key={layout?.id}
                className="flex items-center space-x-3 p-3 border border-border rounded-md hover:bg-muted transition-smooth text-left"
              >
                <Icon name={layout?.icon} size={20} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{layout?.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Secciones Disponibles
          </label>
          <div className="space-y-2">
            {[
              { id: 'hero', name: 'Sección Principal', enabled: true },
              { id: 'about', name: 'Acerca de', enabled: true },
              { id: 'services', name: 'Servicios', enabled: false },
              { id: 'gallery', name: 'Galería', enabled: true },
              { id: 'contact', name: 'Contacto', enabled: true },
              { id: 'testimonials', name: 'Testimonios', enabled: false }
            ]?.map((section) => (
              <div key={section?.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                <span className="text-sm text-foreground">{section?.name}</span>
                <button className={`w-10 h-5 rounded-full relative ${section?.enabled ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${section?.enabled ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Configuración Responsive</h4>
          <div className="flex space-x-2">
            {[
              { device: 'desktop', icon: 'Monitor', active: true },
              { device: 'tablet', icon: 'Tablet', active: false },
              { device: 'mobile', icon: 'Smartphone', active: false }
            ]?.map((device) => (
              <button
                key={device?.device}
                className={`flex-1 flex items-center justify-center p-2 rounded-md border transition-smooth ${
                  device?.active 
                    ? 'border-primary bg-primary/10 text-primary' :'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={device?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="border-b border-border p-4">
        <div className="grid grid-cols-2 gap-1 bg-muted rounded-md p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center justify-center space-x-1 px-3 py-2 rounded text-xs font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'images' && renderImagesTab()}
        {activeTab === 'style' && renderStyleTab()}
        {activeTab === 'layout' && renderLayoutTab()}
      </div>
      {/* Action Buttons */}
      <div className="border-t border-border p-4 space-y-2">
        <Button variant="default" fullWidth iconName="Save">
          Guardar Cambios
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Eye">
            Vista Previa
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;