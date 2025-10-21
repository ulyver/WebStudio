import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExternalServices = () => {
  const [activeService, setActiveService] = useState(null);

  const hostingProviders = [
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Plataforma de despliegue para aplicaciones web modernas',
      status: 'connected',
      icon: 'Globe',
      category: 'Hosting',
      credentials: {
        apiToken: '••••••••••••••••vcel_abc123',
        teamId: 'team_webstudio'
      },
      features: ['Despliegue automático', 'CDN global', 'SSL automático', 'Analytics'],
      pricing: 'Gratuito hasta 100GB/mes'
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Hosting y CI/CD para sitios web estáticos',
      status: 'disconnected',
      icon: 'Server',
      category: 'Hosting',
      credentials: {
        accessToken: '',
        siteId: ''
      },
      features: ['Build automático', 'Forms handling', 'Edge functions', 'Split testing'],
      pricing: 'Gratuito hasta 300 min build/mes'
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      description: 'Infraestructura en la nube para aplicaciones escalables',
      status: 'connected',
      icon: 'Cloud',
      category: 'Hosting',
      credentials: {
        apiKey: '••••••••••••••••do_abc123',
        spaceKey: '••••••••••••••••space_key'
      },
      features: ['Droplets', 'Spaces CDN', 'Load balancers', 'Databases'],
      pricing: 'Desde $5/mes por droplet'
    }
  ];

  const domainRegistrars = [
    {
      id: 'namecheap',
      name: 'Namecheap',
      description: 'Registro de dominios y servicios DNS',
      status: 'connected',
      icon: 'Link',
      category: 'Dominios',
      credentials: {
        apiUser: 'webstudio_user',
        apiKey: '••••••••••••••••nc_key123',
        username: 'webstudio'
      },
      features: ['Registro de dominios', 'DNS management', 'SSL certificates', 'Email hosting'],
      pricing: 'Desde $8.88/año por dominio'
    },
    {
      id: 'godaddy',
      name: 'GoDaddy',
      description: 'Proveedor integral de servicios de dominio',
      status: 'disconnected',
      icon: 'Globe2',
      category: 'Dominios',
      credentials: {
        apiKey: '',
        apiSecret: ''
      },
      features: ['Dominios premium', 'Website builder', 'Email marketing', 'SSL'],
      pricing: 'Desde $11.99/año por dominio'
    }
  ];

  const socialPlatforms = [
    {
      id: 'facebook',
      name: 'Facebook Business',
      description: 'Gestión de páginas y publicidad en Facebook',
      status: 'connected',
      icon: 'Facebook',
      category: 'Redes Sociales',
      credentials: {
        appId: '••••••••••••••••fb_123456',
        appSecret: '••••••••••••••••fb_secret',
        accessToken: '••••••••••••••••fb_token'
      },
      features: ['Publicación automática', 'Gestión de páginas', 'Facebook Ads', 'Analytics'],
      pricing: 'Gratuito (costos de publicidad aparte)'
    },
    {
      id: 'instagram',
      name: 'Instagram Business',
      description: 'Automatización de contenido para Instagram',
      status: 'connected',
      icon: 'Instagram',
      category: 'Redes Sociales',
      credentials: {
        accessToken: '••••••••••••••••ig_token123',
        businessAccountId: '••••••••••••••••ig_biz123'
      },
      features: ['Posts automáticos', 'Stories', 'Instagram Shopping', 'Insights'],
      pricing: 'Gratuito con cuenta business'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      description: 'Publicación y gestión de contenido en X',
      status: 'disconnected',
      icon: 'Twitter',
      category: 'Redes Sociales',
      credentials: {
        apiKey: '',
        apiSecret: '',
        accessToken: '',
        accessTokenSecret: ''
      },
      features: ['Tweets programados', 'Hilos automáticos', 'Analytics', 'Engagement tracking'],
      pricing: 'API Basic: $100/mes'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Gestión de contenido profesional y empresarial',
      status: 'disconnected',
      icon: 'Linkedin',
      category: 'Redes Sociales',
      credentials: {
        clientId: '',
        clientSecret: '',
        accessToken: ''
      },
      features: ['Posts de empresa', 'LinkedIn Ads', 'Analytics', 'Lead generation'],
      pricing: 'Gratuito para posts básicos'
    }
  ];

  const allServices = [...hostingProviders, ...domainRegistrars, ...socialPlatforms];

  const handleTestConnection = async (serviceId) => {
    alert(`Probando conexión con ${serviceId}...`);
  };

  const handleConnect = (serviceId) => {
    alert(`Conectando con ${serviceId}...`);
  };

  const handleDisconnect = (serviceId) => {
    if (confirm('¿Estás seguro de que quieres desconectar este servicio?')) {
      alert(`Desconectando ${serviceId}...`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-muted-foreground';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const categories = ['Hosting', 'Dominios', 'Redes Sociales'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Servicios Externos</h3>
          <p className="text-sm text-muted-foreground">
            Conecta y gestiona integraciones con proveedores de hosting, dominios y redes sociales
          </p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Agregar Servicio
        </Button>
      </div>
      {categories?.map(category => {
        const categoryServices = allServices?.filter(service => service?.category === category);
        
        return (
          <div key={category} className="space-y-4">
            <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
              {category}
            </h4>
            <div className="grid gap-4">
              {categoryServices?.map(service => (
                <div key={service?.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name={service?.icon} size={24} />
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground">{service?.name}</h5>
                        <p className="text-sm text-muted-foreground">{service?.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{service?.pricing}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 ${getStatusColor(service?.status)}`}>
                        <div className={`w-2 h-2 rounded-full ${
                          service?.status === 'connected' ? 'bg-success' : 'bg-muted-foreground'
                        }`}></div>
                        <span className="text-sm font-medium capitalize">{service?.status}</span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveService(activeService === service?.id ? null : service?.id)}
                      >
                        <Icon name={activeService === service?.id ? "ChevronUp" : "ChevronDown"} size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service?.features?.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Configuration */}
                  {activeService === service?.id && (
                    <div className="border-t border-border pt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(service?.credentials)?.map(([key, value]) => (
                          <Input
                            key={key}
                            label={
                              key === 'apiToken' ? 'API Token' :
                              key === 'apiKey' ? 'API Key' :
                              key === 'apiSecret' ? 'API Secret' :
                              key === 'accessToken' ? 'Access Token' :
                              key === 'accessTokenSecret' ? 'Access Token Secret' :
                              key === 'clientId' ? 'Client ID' :
                              key === 'clientSecret' ? 'Client Secret' :
                              key === 'teamId' ? 'Team ID' :
                              key === 'siteId' ? 'Site ID' :
                              key === 'spaceKey' ? 'Space Key' :
                              key === 'apiUser' ? 'API User' :
                              key === 'username' ? 'Username' :
                              key === 'appId' ? 'App ID' :
                              key === 'appSecret' ? 'App Secret' :
                              key === 'businessAccountId' ? 'Business Account ID' :
                              key
                            }
                            type={key?.toLowerCase()?.includes('secret') || key?.toLowerCase()?.includes('token') || key?.toLowerCase()?.includes('key') ? 'password' : 'text'}
                            value={value}
                            placeholder={`Ingresa tu ${key}`}
                            className="mb-0"
                          />
                        ))}
                      </div>

                      {/* Service-specific settings */}
                      {service?.category === 'Hosting' && (
                        <div className="space-y-3">
                          <h6 className="font-medium text-foreground">Configuración de Despliegue</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                              label="Región Predeterminada"
                              options={[
                                { value: 'eu-west-1', label: 'Europa Oeste (Irlanda)' },
                                { value: 'us-east-1', label: 'EE.UU. Este (Virginia)' },
                                { value: 'ap-southeast-1', label: 'Asia Pacífico (Singapur)' }
                              ]}
                              value="eu-west-1"
                              onChange={() => {}}
                            />
                            <div className="space-y-2">
                              <Checkbox label="Auto-deploy en push" checked />
                              <Checkbox label="Habilitar HTTPS automático" checked />
                              <Checkbox label="Comprimir assets" />
                            </div>
                          </div>
                        </div>
                      )}

                      {service?.category === 'Redes Sociales' && (
                        <div className="space-y-3">
                          <h6 className="font-medium text-foreground">Configuración de Publicación</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                              label="Frecuencia de Publicación"
                              options={[
                                { value: 'manual', label: 'Manual' },
                                { value: 'daily', label: 'Diaria' },
                                { value: 'weekly', label: 'Semanal' },
                                { value: 'monthly', label: 'Mensual' }
                              ]}
                              value="manual"
                              onChange={() => {}}
                            />
                            <div className="space-y-2">
                              <Checkbox label="Publicación automática" />
                              <Checkbox label="Incluir hashtags sugeridos" checked />
                              <Checkbox label="Notificar después de publicar" checked />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(service?.id)}
                          iconName="Zap"
                          iconPosition="left"
                        >
                          Probar Conexión
                        </Button>

                        {service?.status === 'connected' ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDisconnect(service?.id)}
                          >
                            Desconectar
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConnect(service?.id)}
                          >
                            Conectar
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          Documentación
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {/* Connection Status Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Estado de Conexiones</h3>
            <p className="text-sm text-muted-foreground">
              Resumen del estado de todas las integraciones
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {allServices?.filter(s => s?.status === 'connected')?.length}
            </div>
            <div className="text-sm text-success">Servicios Conectados</div>
          </div>

          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground mb-1">
              {allServices?.filter(s => s?.status === 'disconnected')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Servicios Disponibles</div>
          </div>

          <div className="bg-warning/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">0</div>
            <div className="text-sm text-warning">Errores de Conexión</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalServices;