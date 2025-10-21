import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import PublishingPanel from './components/PublishingPanel';
import DeploymentMonitor from './components/DeploymentMonitor';
import DomainManager from './components/DomainManager';
import ContentValidator from './components/ContentValidator';
import PublishingQueue from './components/PublishingQueue';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContentPublishing = () => {
  const location = useLocation();
  const [currentClient, setCurrentClient] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('publish');

  // Mock data
  const mockContent = {
    name: "Sitio Web Restaurante El Sabor",
    pages: 6,
    size: "3.2 MB",
    lastModified: "2025-10-21T08:45:00",
    templates: [
      { id: 1, name: "Página Principal", status: "ready" },
      { id: 2, name: "Menú", status: "ready" },
      { id: 3, name: "Reservas", status: "ready" },
      { id: 4, name: "Contacto", status: "ready" },
      { id: 5, name: "Galería", status: "ready" },
      { id: 6, name: "Sobre Nosotros", status: "ready" }
    ]
  };

  const mockDeployments = [
    {
      id: 1,
      site: "restaurante-el-sabor.com",
      status: "success",
      branch: "main",
      commit: "a1b2c3d4e5f6",
      startTime: "2025-10-21 08:30:15",
      endTime: "2025-10-21 08:32:45",
      duration: 150,
      provider: "Vercel",
      buildSize: "2.8 MB",
      fileCount: 47,
      cdn: "Global CDN",
      url: "https://restaurante-el-sabor.vercel.app",
      logs: `[08:30:15] Iniciando despliegue...\n[08:30:18] Clonando repositorio\n[08:30:25] Instalando dependencias\n[08:31:10] Construyendo aplicación\n[08:32:30] Optimizando assets\n[08:32:45] Despliegue completado ✓`
    },
    {
      id: 2,
      site: "staging.restaurante-el-sabor.com",
      status: "deploying",
      branch: "develop",
      commit: "f6e5d4c3b2a1",
      startTime: "2025-10-21 08:55:00",
      endTime: null,
      duration: null,
      provider: "Netlify",
      buildSize: "3.1 MB",
      fileCount: 52,
      cdn: "Netlify Edge",
      progress: 75,
      logs: `[08:55:00] Iniciando despliegue...\n[08:55:03] Clonando repositorio\n[08:55:10] Instalando dependencias\n[08:56:25] Construyendo aplicación\n[08:57:40] Optimizando imágenes...`
    },
    {
      id: 3,
      site: "old.restaurante-el-sabor.com",
      status: "failed",
      branch: "main",
      commit: "b2c3d4e5f6a1",
      startTime: "2025-10-21 07:15:30",
      endTime: "2025-10-21 07:17:12",
      duration: 102,
      provider: "Hostinger",
      buildSize: "2.9 MB",
      fileCount: 48,
      cdn: "CloudFlare",
      logs: `[07:15:30] Iniciando despliegue...\n[07:15:33] Clonando repositorio\n[07:15:40] Instalando dependencias\n[07:16:55] Error: Build failed - Missing environment variable\n[07:17:12] Despliegue fallido ✗`
    }
  ];

  const mockDomains = [
    {
      id: 1,
      name: "restaurante-el-sabor.com",
      registrar: "GoDaddy",
      expiryDate: "2026-03-15",
      ssl: true,
      active: true,
      autoRenew: true
    },
    {
      id: 2,
      name: "elsabor.es",
      registrar: "Namecheap",
      expiryDate: "2025-12-08",
      ssl: true,
      active: false,
      autoRenew: false
    },
    {
      id: 3,
      name: "staging.restaurante-el-sabor.com",
      registrar: "Vercel",
      expiryDate: "N/A",
      ssl: true,
      active: true,
      autoRenew: true
    }
  ];

  const mockQueueItems = [
    {
      id: 1,
      title: "Despliegue Restaurante El Sabor",
      description: "Publicación completa del sitio web con todas las páginas",
      client: "Restaurante El Sabor",
      project: "Sitio Web Principal",
      status: "processing",
      priority: "high",
      createdAt: "2025-10-21T08:55:00",
      estimatedTime: 5,
      progress: 75,
      currentStep: "Optimizando imágenes..."
    },
    {
      id: 2,
      title: "Actualización Boutique Moda",
      description: "Actualización de catálogo de productos temporada otoño",
      client: "Boutique Moda",
      project: "E-commerce",
      status: "queued",
      priority: "medium",
      createdAt: "2025-10-21T08:50:00",
      estimatedTime: 3
    },
    {
      id: 3,
      title: "Sitio Servicios Técnicos Pro",
      description: "Primera publicación del sitio web corporativo",
      client: "Servicios Técnicos Pro",
      project: "Web Corporativa",
      status: "completed",
      priority: "high",
      createdAt: "2025-10-21T08:30:00",
      estimatedTime: 4
    },
    {
      id: 4,
      title: "Landing Page Promocional",
      description: "Página de promoción especial para Black Friday",
      client: "Boutique Moda",
      project: "Campaña Promocional",
      status: "failed",
      priority: "high",
      createdAt: "2025-10-21T08:20:00",
      estimatedTime: 2,
      error: "Error de conexión con el servidor de hosting. Verificar credenciales de acceso."
    },
    {
      id: 5,
      title: "Backup Automático",
      description: "Respaldo programado de todos los sitios activos",
      client: "Sistema",
      project: "Mantenimiento",
      status: "paused",
      priority: "low",
      createdAt: "2025-10-21T08:00:00",
      estimatedTime: 10
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setCurrentClient({ id: 1, name: "Restaurante El Sabor", type: "Restaurante" });
    setActiveProject({ id: 1, name: "Sitio Web Principal" });
    setSelectedContent(mockContent);
  }, []);

  const tabs = [
    { id: 'publish', label: 'Publicar', icon: 'Upload', count: null },
    { id: 'deployments', label: 'Despliegues', icon: 'Activity', count: mockDeployments?.length },
    { id: 'domains', label: 'Dominios', icon: 'Globe', count: mockDomains?.length },
    { id: 'validation', label: 'Validación', icon: 'Shield', count: null },
    { id: 'queue', label: 'Cola', icon: 'List', count: mockQueueItems?.filter(item => item?.status !== 'completed')?.length }
  ];

  const handlePublish = async (publishConfig) => {
    setIsPublishing(true);
    console.log('Publishing with config:', publishConfig);
    
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      setActiveTab('deployments');
      alert('¡Sitio web publicado exitosamente!');
    }, 3000);
  };

  const handleRetryDeployment = (deploymentId) => {
    console.log('Retrying deployment:', deploymentId);
    alert('Reintentando despliegue...');
  };

  const handleRollbackDeployment = (deploymentId) => {
    console.log('Rolling back deployment:', deploymentId);
    alert('Revirtiendo despliegue...');
  };

  const handleRegisterDomain = (domain) => {
    console.log('Registering domain:', domain);
    alert(`Registrando dominio: ${domain?.domain}`);
  };

  const handleConfigureDomain = (domain) => {
    console.log('Configuring domain:', domain);
    alert(`Configurando dominio: ${domain?.name}`);
  };

  const handleValidateContent = (content) => {
    console.log('Validating content:', content);
  };

  const handleFixIssue = (issue) => {
    console.log('Fixing issue:', issue);
    alert(`Corrigiendo: ${issue?.title}`);
  };

  const handlePauseQueue = (itemId) => {
    console.log('Pausing queue item:', itemId);
  };

  const handleResumeQueue = (itemId) => {
    console.log('Resuming queue item:', itemId);
  };

  const handleCancelQueue = (itemId) => {
    console.log('Canceling queue item:', itemId);
  };

  const handlePrioritizeQueue = (itemId) => {
    console.log('Prioritizing queue item:', itemId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'publish':
        return (
          <PublishingPanel
            selectedContent={selectedContent}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        );
      case 'deployments':
        return (
          <DeploymentMonitor
            deployments={mockDeployments}
            onRetry={handleRetryDeployment}
            onRollback={handleRollbackDeployment}
          />
        );
      case 'domains':
        return (
          <DomainManager
            domains={mockDomains}
            onRegisterDomain={handleRegisterDomain}
            onConfigureDomain={handleConfigureDomain}
          />
        );
      case 'validation':
        return (
          <ContentValidator
            content={selectedContent}
            onValidate={handleValidateContent}
            onFix={handleFixIssue}
          />
        );
      case 'queue':
        return (
          <PublishingQueue
            queueItems={mockQueueItems}
            onPause={handlePauseQueue}
            onResume={handleResumeQueue}
            onCancel={handleCancelQueue}
            onPrioritize={handlePrioritizeQueue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentClient={currentClient}
        activeProject={activeProject}
        onClientChange={setCurrentClient}
        onProjectSelect={setActiveProject}
      />
      <WorkflowBreadcrumb
        currentClient={currentClient}
        activeProject={activeProject}
        workflowState={{ step: 'publish' }}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Publicación de Contenido</h1>
                <p className="text-muted-foreground">
                  Despliega y gestiona tus sitios web con herramientas integradas de hosting y dominio
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Settings" iconPosition="left">
                  Configuración
                </Button>
                <Button variant="outline" iconName="HelpCircle" iconPosition="left">
                  Ayuda
                </Button>
              </div>
            </div>
          </div>

          {/* Project Context */}
          {currentClient && activeProject && (
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Building2" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{currentClient?.name}</span>
                  </div>
                  <div className="w-1 h-4 bg-border"></div>
                  <div className="flex items-center space-x-2">
                    <Icon name="FolderOpen" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{activeProject?.name}</span>
                  </div>
                  <div className="w-1 h-4 bg-border"></div>
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedContent?.pages} páginas • {selectedContent?.size}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Actualizado hace 15 min</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.count !== null && tab?.count > 0 && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPublishing;