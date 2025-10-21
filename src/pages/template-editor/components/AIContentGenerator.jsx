import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AIContentGenerator = ({ isOpen, onClose, onContentGenerated }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationParams, setGenerationParams] = useState({
    businessType: 'restaurant',
    tone: 'professional',
    language: 'spanish',
    contentType: 'homepage',
    keywords: '',
    targetAudience: 'general'
  });

  const businessTypes = [
  { value: 'restaurant', label: 'Restaurante' },
  { value: 'retail', label: 'Tienda/Retail' },
  { value: 'services', label: 'Servicios' },
  { value: 'healthcare', label: 'Salud' },
  { value: 'beauty', label: 'Belleza' },
  { value: 'automotive', label: 'Automotriz' }];


  const toneOptions = [
  { value: 'professional', label: 'Profesional' },
  { value: 'friendly', label: 'Amigable' },
  { value: 'elegant', label: 'Elegante' },
  { value: 'casual', label: 'Casual' },
  { value: 'luxury', label: 'Lujo' }];


  const contentTypes = [
  { value: 'homepage', label: 'Página Principal' },
  { value: 'about', label: 'Acerca de' },
  { value: 'services', label: 'Servicios' },
  { value: 'contact', label: 'Contacto' },
  { value: 'blog', label: 'Blog/Artículo' }];


  const imageStyles = [
  { value: 'professional', label: 'Profesional' },
  { value: 'lifestyle', label: 'Estilo de Vida' },
  { value: 'product', label: 'Producto' },
  { value: 'interior', label: 'Interiores' },
  { value: 'food', label: 'Comida' }];


  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      if (activeTab === 'text') {
        const generatedContent = {
          headline: "Descubre la Excelencia Culinaria en Cada Plato",
          description: "Restaurante de alta cocina mediterránea con más de 15 años de experiencia, ofreciendo una experiencia gastronómica única con ingredientes frescos y de temporada.",
          body: `Bienvenidos a nuestro restaurante, donde la pasión por la gastronomía se encuentra con la tradición familiar.\n\nNuestro equipo de chefs especializados ha creado un menú que celebra los sabores auténticos de la cocina mediterránea, utilizando técnicas modernas y ingredientes de la más alta calidad.\n\nCada plato es una obra de arte culinaria, diseñada para despertar todos tus sentidos y crear recuerdos inolvidables.\n\nVen y descubre por qué somos el destino gastronómico preferido de la ciudad.`,
          cta: "Reserva tu Mesa Ahora"
        };

        if (onContentGenerated) {
          onContentGenerated('text', generatedContent);
        }
      } else {
        const generatedImages = [
        {
          src: "https://images.unsplash.com/photo-1662472460736-e26f7a49e90a",
          alt: "Elegante comedor de restaurante con mesas de madera y iluminación cálida ambiente"
        },
        {
          src: "https://images.unsplash.com/photo-1697898108745-bd718dcf41b2",
          alt: "Plato gourmet de pasta con salsa de tomate fresco y albahaca"
        },
        {
          src: "https://images.unsplash.com/photo-1596887307013-f373307a7e35",
          alt: "Hamburguesa artesanal con ingredientes frescos y papas fritas doradas"
        }];


        if (onContentGenerated) {
          onContentGenerated('images', generatedImages);
        }
      }

      setIsGenerating(false);
      onClose();
    }, 3000);
  };

  const renderTextTab = () =>
  <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
        label="Tipo de Negocio"
        options={businessTypes}
        value={generationParams?.businessType}
        onChange={(value) => setGenerationParams((prev) => ({ ...prev, businessType: value }))} />

        <Select
        label="Tono de Comunicación"
        options={toneOptions}
        value={generationParams?.tone}
        onChange={(value) => setGenerationParams((prev) => ({ ...prev, tone: value }))} />

      </div>

      <Select
      label="Tipo de Contenido"
      options={contentTypes}
      value={generationParams?.contentType}
      onChange={(value) => setGenerationParams((prev) => ({ ...prev, contentType: value }))} />


      <Input
      label="Palabras Clave"
      type="text"
      placeholder="Ej: cocina mediterránea, ingredientes frescos, ambiente familiar"
      description="Separa las palabras clave con comas"
      value={generationParams?.keywords}
      onChange={(e) => setGenerationParams((prev) => ({ ...prev, keywords: e?.target?.value }))} />


      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Información Adicional
        </label>
        <textarea
        className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        rows={4}
        placeholder="Proporciona detalles específicos sobre tu negocio, servicios únicos, historia, valores, etc." />

      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Sugerencias de IA
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Incluye información sobre tu experiencia y especialidades</li>
          <li>• Menciona qué te hace único frente a la competencia</li>
          <li>• Describe el ambiente y la experiencia que ofreces</li>
          <li>• Agrega detalles sobre tu ubicación o historia</li>
        </ul>
      </div>
    </div>;


  const renderImagesTab = () =>
  <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
        label="Tipo de Negocio"
        options={businessTypes}
        value={generationParams?.businessType}
        onChange={(value) => setGenerationParams((prev) => ({ ...prev, businessType: value }))} />

        <Select
        label="Estilo de Imagen"
        options={imageStyles}
        value={generationParams?.imageStyle || 'professional'}
        onChange={(value) => setGenerationParams((prev) => ({ ...prev, imageStyle: value }))} />

      </div>

      <Input
      label="Descripción de Imágenes"
      type="text"
      placeholder="Ej: interior moderno, platos gourmet, equipo de trabajo"
      description="Describe qué tipo de imágenes necesitas" />


      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Cantidad de Imágenes
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 3, 5, 8]?.map((count) =>
        <button
          key={count}
          className="flex items-center justify-center p-3 border border-border rounded-md hover:bg-muted transition-smooth text-sm font-medium">

              {count} {count === 1 ? 'imagen' : 'imágenes'}
            </button>
        )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Resolución Preferida
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center p-3 border border-border rounded-md hover:bg-muted transition-smooth text-sm">
            1920x1080 (HD)
          </button>
          <button className="flex items-center justify-center p-3 border border-border rounded-md hover:bg-muted transition-smooth text-sm">
            1200x800 (Web)
          </button>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Camera" size={16} className="mr-2 text-primary" />
          Tipos de Imágenes Sugeridas
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>• Imagen principal/hero</div>
          <div>• Productos/servicios</div>
          <div>• Equipo de trabajo</div>
          <div>• Instalaciones</div>
          <div>• Proceso de trabajo</div>
          <div>• Clientes satisfechos</div>
        </div>
      </div>
    </div>;


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Generador de Contenido IA</h2>
              <p className="text-sm text-muted-foreground">
                Crea contenido personalizado para tu plantilla
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}>

            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border px-6">
          <div className="flex space-x-1">
            {[
            { id: 'text', label: 'Contenido de Texto', icon: 'FileText' },
            { id: 'images', label: 'Imágenes', icon: 'Image' }]?.
            map((tab) =>
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-smooth ${
              activeTab === tab?.id ?
              'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
              }>

                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'text' && renderTextTab()}
          {activeTab === 'images' && renderImagesTab()}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {isGenerating ?
              <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Generando contenido con IA...</span>
                </div> :

              <span>El contenido se generará basado en los parámetros seleccionados</span>
              }
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} disabled={isGenerating}>
                Cancelar
              </Button>
              <Button
                variant="default"
                iconName="Sparkles"
                loading={isGenerating}
                onClick={handleGenerate}>

                Generar Contenido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default AIContentGenerator;