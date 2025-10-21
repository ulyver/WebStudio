import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const PublishingPanel = ({ selectedContent, onPublish, isPublishing }) => {
  const [selectedHosting, setSelectedHosting] = useState('');
  const [domainConfig, setDomainConfig] = useState({
    type: 'existing',
    domain: '',
    subdomain: ''
  });

  const hostingProviders = [
    { value: 'vercel', label: 'Vercel', description: 'Despliegue automático y CDN global' },
    { value: 'netlify', label: 'Netlify', description: 'Hosting estático con CI/CD integrado' },
    { value: 'hostinger', label: 'Hostinger', description: 'Hosting compartido económico' },
    { value: 'siteground', label: 'SiteGround', description: 'Hosting premium con soporte 24/7' },
    { value: 'godaddy', label: 'GoDaddy', description: 'Hosting tradicional con dominio incluido' }
  ];

  const domainTypes = [
    { value: 'existing', label: 'Dominio Existente' },
    { value: 'new', label: 'Registrar Nuevo Dominio' },
    { value: 'subdomain', label: 'Usar Subdominio' }
  ];

  const handlePublish = () => {
    if (!selectedHosting) {
      alert('Por favor selecciona un proveedor de hosting');
      return;
    }

    const publishConfig = {
      content: selectedContent,
      hosting: selectedHosting,
      domain: domainConfig
    };

    onPublish(publishConfig);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Upload" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Panel de Publicación</h3>
            <p className="text-sm text-muted-foreground">Configura y despliega tu sitio web</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Última actualización: hace 2 min</span>
        </div>
      </div>
      {/* Content Preview */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Contenido a Publicar</h4>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-background rounded-lg border border-border flex items-center justify-center overflow-hidden">
                <Icon name="FileText" size={20} color="var(--color-muted-foreground)" />
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedContent?.name || 'Plantilla Principal'}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedContent?.pages || 5} páginas • {selectedContent?.size || '2.4 MB'}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
              Vista Previa
            </Button>
          </div>
        </div>
      </div>
      {/* Hosting Configuration */}
      <div className="mb-6">
        <Select
          label="Proveedor de Hosting"
          description="Selecciona dónde deseas alojar tu sitio web"
          placeholder="Elige un proveedor de hosting"
          options={hostingProviders}
          value={selectedHosting}
          onChange={setSelectedHosting}
          required
          className="mb-4"
        />
      </div>
      {/* Domain Configuration */}
      <div className="mb-6">
        <Select
          label="Configuración de Dominio"
          description="Define cómo configurar el dominio para tu sitio"
          options={domainTypes}
          value={domainConfig?.type}
          onChange={(value) => setDomainConfig(prev => ({ ...prev, type: value }))}
          className="mb-4"
        />

        {domainConfig?.type === 'existing' && (
          <Input
            label="Dominio Existente"
            type="text"
            placeholder="ejemplo.com"
            value={domainConfig?.domain}
            onChange={(e) => setDomainConfig(prev => ({ ...prev, domain: e?.target?.value }))}
            description="Ingresa tu dominio existente"
          />
        )}

        {domainConfig?.type === 'new' && (
          <div className="space-y-4">
            <Input
              label="Nuevo Dominio"
              type="text"
              placeholder="mi-negocio"
              value={domainConfig?.domain}
              onChange={(e) => setDomainConfig(prev => ({ ...prev, domain: e?.target?.value }))}
              description="Nombre del dominio sin extensión"
            />
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Se verificará disponibilidad automáticamente</span>
            </div>
          </div>
        )}

        {domainConfig?.type === 'subdomain' && (
          <Input
            label="Subdominio"
            type="text"
            placeholder="mi-negocio"
            value={domainConfig?.subdomain}
            onChange={(e) => setDomainConfig(prev => ({ ...prev, subdomain: e?.target?.value }))}
            description="Ejemplo: mi-negocio.webstudio.pro"
          />
        )}
      </div>
      {/* Publishing Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Configuración Avanzada
          </Button>
          <Button variant="ghost" iconName="TestTube" iconPosition="left">
            Entorno de Pruebas
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Save" iconPosition="left">
            Guardar Config
          </Button>
          <Button
            variant="default"
            onClick={handlePublish}
            loading={isPublishing}
            iconName="Upload"
            iconPosition="left"
            disabled={!selectedHosting}
          >
            {isPublishing ? 'Publicando...' : 'Publicar Sitio'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishingPanel;