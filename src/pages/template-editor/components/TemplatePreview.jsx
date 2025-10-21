import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplatePreview = ({
  activeTemplate,
  previewMode = 'desktop',
  onPreviewModeChange,
  isLoading = false
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mockTemplate = {
    id: 1,
    name: "Restaurante El Sabor",
    type: "restaurant",
    content: {
      headline: "Descubre el Sabor Auténtico en Cada Bocado",
      description: "Restaurante familiar con más de 20 años de tradición culinaria, ofreciendo los mejores platos de la cocina mediterránea con ingredientes frescos y locales.",
      body: `Bienvenidos a nuestro acogedor restaurante donde cada plato cuenta una historia de tradición y pasión por la gastronomía.\n\nNuestro chef ejecutivo, con más de 15 años de experiencia, ha creado un menú que combina recetas tradicionales con toques modernos, utilizando únicamente ingredientes de la más alta calidad.\n\nVen y disfruta de una experiencia culinaria única en un ambiente cálido y familiar.`
    },
    contact: {
      phone: "+34 912 345 678",
      email: "contacto@elsabor.com",
      address: "Calle Mayor, 45 - Madrid"
    },
    images: {
      hero: "https://images.unsplash.com/photo-1647695822638-a40e238ddc39",
      heroAlt: "Interior elegante de restaurante con mesas de madera y iluminación cálida",
      gallery: [
      {
        src: "https://images.unsplash.com/photo-1697898108745-bd718dcf41b2",
        alt: "Plato gourmet de pasta con salsa de tomate y albahaca fresca"
      },
      {
        src: "https://images.unsplash.com/photo-1669839718073-861aa4f360bc",
        alt: "Deliciosa pizza margarita recién horneada con mozzarella derretida"
      },
      {
        src: "https://images.unsplash.com/photo-1609722719705-11f7c7472b5c",
        alt: "Hamburguesa gourmet con ingredientes frescos y papas fritas"
      }]

    },
    style: {
      colorScheme: "modern",
      font: "inter"
    }
  };

  const template = activeTemplate || mockTemplate;

  const getPreviewContainerClass = () => {
    const baseClass = "bg-white rounded-lg shadow-card overflow-hidden transition-all duration-300";

    switch (previewMode) {
      case 'mobile':
        return `${baseClass} w-80 mx-auto`;
      case 'tablet':
        return `${baseClass} w-full max-w-2xl mx-auto`;
      case 'desktop':
      default:
        return `${baseClass} w-full`;
    }
  };

  const renderPreviewContent = () =>
  <div className="bg-white">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Utensils" size={16} color="white" />
            </div>
            <span className="text-xl font-bold text-gray-900">El Sabor</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary">Inicio</a>
            <a href="#" className="text-gray-700 hover:text-primary">Menú</a>
            <a href="#" className="text-gray-700 hover:text-primary">Nosotros</a>
            <a href="#" className="text-gray-700 hover:text-primary">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
        src={template?.images?.hero}
        alt={template?.images?.heroAlt}
        className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {template?.content?.headline}
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              {template?.content?.description}
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Ver Menú
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <div className="text-gray-700 space-y-4">
                {template?.content?.body?.split('\n\n')?.map((paragraph, index) =>
              <p key={index}>{paragraph}</p>
              )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {template?.images?.gallery?.slice(0, 2)?.map((image, index) =>
            <Image
              key={index}
              src={image?.src}
              alt={image?.alt}
              className="w-full h-48 object-cover rounded-lg" />

            )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Platos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {template?.images?.gallery?.map((image, index) =>
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-card">
                <Image
              src={image?.src}
              alt={image?.alt}
              className="w-full h-48 object-cover" />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Especialidad {index + 1}
                  </h3>
                  <p className="text-gray-600">
                    Deliciosa preparación con ingredientes frescos y de temporada.
                  </p>
                </div>
              </div>
          )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Visítanos</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Teléfono</h3>
                    <p className="text-gray-600">{template?.contact?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">{template?.contact?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dirección</h3>
                    <p className="text-gray-600">{template?.contact?.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Ubicación del Restaurante El Sabor"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.4168,-3.7038&z=14&output=embed"
              className="rounded-lg" />

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Utensils" size={16} color="white" />
            </div>
            <span className="text-xl font-bold">El Sabor</span>
          </div>
          <p className="text-gray-400 mb-4">
            Restaurante familiar con tradición culinaria desde 2003
          </p>
          <p className="text-sm text-gray-500">
            © {new Date()?.getFullYear()} Restaurante El Sabor. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>;


  return (
    <div className="flex-1 bg-muted/30 flex flex-col h-full">
      {/* Preview Controls */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground">Vista Previa</h2>
            <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
              {[
              { mode: 'desktop', icon: 'Monitor', label: 'Escritorio' },
              { mode: 'tablet', icon: 'Tablet', label: 'Tablet' },
              { mode: 'mobile', icon: 'Smartphone', label: 'Móvil' }]?.
              map((device) =>
              <button
                key={device?.mode}
                onClick={() => onPreviewModeChange && onPreviewModeChange(device?.mode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-smooth ${
                previewMode === device?.mode ?
                'bg-background text-foreground shadow-sm' :
                'text-muted-foreground hover:text-foreground'}`
                }
                title={device?.label}>

                  <Icon name={device?.icon} size={16} />
                  <span className="hidden sm:inline">{device?.label}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName={isFullscreen ? "Minimize2" : "Maximize2"}
              onClick={() => setIsFullscreen(!isFullscreen)}>

              {isFullscreen ? 'Salir' : 'Pantalla Completa'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink">

              Abrir en Nueva Pestaña
            </Button>
          </div>
        </div>
      </div>
      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ?
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando vista previa...</p>
            </div>
          </div> :

        <div className={getPreviewContainerClass()}>
            {renderPreviewContent()}
          </div>
        }
      </div>
      {/* Preview Status Bar */}
      <div className="bg-card border-t border-border px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span>Última actualización: {new Date()?.toLocaleTimeString('es-ES')}</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Sincronizado</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Zap" size={14} />
            <span>Vista previa en tiempo real</span>
          </div>
        </div>
      </div>
    </div>);

};

export default TemplatePreview;