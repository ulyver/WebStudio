import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApiIntegrationPanel = () => {
  const [activeService, setActiveService] = useState(null);
  const [testResults, setTestResults] = useState({});

  const apiServices = [
    {
      id: 'openai',
      name: 'OpenAI GPT',
      description: 'Generación de contenido con IA avanzada',
      status: 'connected',
      icon: 'Brain',
      category: 'AI Content',
      credentials: {
        apiKey: '••••••••••••••••sk-abc123',
        organization: 'org-webstudio'
      },
      usage: {
        current: 15420,
        limit: 50000,
        resetDate: '2025-11-01'
      },
      features: ['Generación de texto', 'Optimización SEO', 'Traducción automática']
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      description: 'Asistente IA para análisis y escritura',
      status: 'disconnected',
      icon: 'MessageSquare',
      category: 'AI Content',
      credentials: {
        apiKey: '',
        organization: ''
      },
      usage: {
        current: 0,
        limit: 25000,
        resetDate: '2025-11-01'
      },
      features: ['Análisis de contenido', 'Corrección de estilo', 'Generación creativa']
    },
    {
      id: 'unsplash',
      name: 'Unsplash API',
      description: 'Biblioteca de imágenes profesionales',
      status: 'connected',
      icon: 'Image',
      category: 'Media',
      credentials: {
        accessKey: '••••••••••••••••abc123',
        secretKey: '••••••••••••••••def456'
      },
      usage: {
        current: 2340,
        limit: 5000,
        resetDate: '2025-11-01'
      },
      features: ['Búsqueda de imágenes', 'Descarga HD', 'Filtros por categoría']
    },
    {
      id: 'pexels',
      name: 'Pexels API',
      description: 'Fotos y videos libres de derechos',
      status: 'connected',
      icon: 'Camera',
      category: 'Media',
      credentials: {
        apiKey: '••••••••••••••••pex789'
      },
      usage: {
        current: 1890,
        limit: 10000,
        resetDate: '2025-11-01'
      },
      features: ['Fotos gratuitas', 'Videos HD', 'Búsqueda avanzada']
    },
    {
      id: 'deepl',
      name: 'DeepL Translator',
      description: 'Traducción automática de alta calidad',
      status: 'disconnected',
      icon: 'Languages',
      category: 'Translation',
      credentials: {
        authKey: ''
      },
      usage: {
        current: 0,
        limit: 500000,
        resetDate: '2025-11-01'
      },
      features: ['Traducción precisa', 'Múltiples idiomas', 'Preservación de formato']
    }
  ];

  const handleTestConnection = async (serviceId) => {
    setTestResults(prev => ({ ...prev, [serviceId]: 'testing' }));
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setTestResults(prev => ({ 
        ...prev, 
        [serviceId]: success ? 'success' : 'error' 
      }));
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-muted-foreground';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getUsagePercentage = (current, limit) => {
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const categories = [...new Set(apiServices.map(service => service.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Integraciones API</h3>
          <p className="text-sm text-muted-foreground">
            Configura y gestiona conexiones con servicios externos
          </p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Agregar Servicio
        </Button>
      </div>
      {categories?.map(category => (
        <div key={category} className="space-y-4">
          <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
            {category}
          </h4>
          
          <div className="grid gap-4">
            {apiServices?.filter(service => service?.category === category)?.map(service => (
              <div key={service?.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={service?.icon} size={20} />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{service?.name}</h5>
                      <p className="text-sm text-muted-foreground">{service?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
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

                {/* Usage Statistics */}
                {service?.status === 'connected' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Uso mensual</span>
                      <span className="text-foreground font-medium">
                        {service?.usage?.current?.toLocaleString()} / {service?.usage?.limit?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getUsageColor(getUsagePercentage(service?.usage?.current, service?.usage?.limit))}`}
                        style={{ width: `${getUsagePercentage(service?.usage?.current, service?.usage?.limit)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Se reinicia el {new Date(service.usage.resetDate)?.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}

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
                          label={key === 'apiKey' ? 'API Key' : 
                                key === 'accessKey' ? 'Access Key' :
                                key === 'secretKey' ? 'Secret Key' :
                                key === 'authKey' ? 'Auth Key' :
                                key === 'organization' ? 'Organización' : key}
                          type={key?.toLowerCase()?.includes('key') ? 'password' : 'text'}
                          value={value}
                          placeholder={`Ingresa tu ${key}`}
                          className="mb-0"
                        />
                      ))}
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestConnection(service?.id)}
                        loading={testResults?.[service?.id] === 'testing'}
                        iconName="Zap"
                        iconPosition="left"
                      >
                        Probar Conexión
                      </Button>

                      {testResults?.[service?.id] === 'success' && (
                        <div className="flex items-center space-x-2 text-success">
                          <Icon name="CheckCircle" size={16} />
                          <span className="text-sm">Conexión exitosa</span>
                        </div>
                      )}

                      {testResults?.[service?.id] === 'error' && (
                        <div className="flex items-center space-x-2 text-error">
                          <Icon name="XCircle" size={16} />
                          <span className="text-sm">Error de conexión</span>
                        </div>
                      )}

                      <Button
                        variant={service?.status === 'connected' ? 'destructive' : 'default'}
                        size="sm"
                      >
                        {service?.status === 'connected' ? 'Desconectar' : 'Conectar'}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Checkbox 
                        label="Habilitar notificaciones de límite de uso"
                        checked
                      />
                      <Checkbox 
                        label="Renovación automática de credenciales"
                       
                      />
                      <Checkbox 
                        label="Registro detallado de actividad"
                        checked
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiIntegrationPanel;