import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import SocialAccountCard from './components/SocialAccountCard';

import ClientSocialOverview from './components/ClientSocialOverview';
import AutomationPanel from './components/AutomationPanel';
import ContentScheduler from './components/ContentScheduler';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const SocialMediaIntegration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  // Mock clients data with social accounts
  const mockClients = [
  {
    id: 1,
    name: 'Restaurante El Sabor',
    type: 'Restaurante',
    logo: "https://images.unsplash.com/photo-1692189097318-668795e566f6",
    logoAlt: 'Modern restaurant logo with elegant typography and fork icon',
    socialAccounts: [
    {
      platform: 'facebook',
      username: '@restauranteelsabor',
      connected: true,
      followers: 2456,
      engagementRate: 4.2,
      autoPosting: true,
      lastPost: '2 horas'
    },
    {
      platform: 'instagram',
      username: '@elsabor_oficial',
      connected: true,
      followers: 1834,
      engagementRate: 6.8,
      autoPosting: true,
      lastPost: '5 horas'
    },
    {
      platform: 'twitter',
      username: '@ElSaborRest',
      connected: false,
      followers: 0,
      engagementRate: 0,
      autoPosting: false,
      lastPost: null
    }],

    automation: {
      enabled: true,
      frequency: 'daily',
      time: '18:00',
      contentType: 'promotional',
      approvalRequired: true
    }
  },
  {
    id: 2,
    name: 'Boutique Moda',
    type: 'Retail',
    logo: "https://images.unsplash.com/photo-1674319458028-754d1484a4cb",
    logoAlt: 'Elegant fashion boutique storefront with modern glass windows',
    socialAccounts: [
    {
      platform: 'instagram',
      username: '@boutiquemoda_style',
      connected: true,
      followers: 3421,
      engagementRate: 8.1,
      autoPosting: true,
      lastPost: '1 hora'
    },
    {
      platform: 'facebook',
      username: '@BoutiqueModa',
      connected: true,
      followers: 1567,
      engagementRate: 3.9,
      autoPosting: false,
      lastPost: '1 día'
    },
    {
      platform: 'tiktok',
      username: '@boutique_moda',
      connected: true,
      followers: 892,
      engagementRate: 12.3,
      autoPosting: true,
      lastPost: '3 horas'
    }],

    automation: {
      enabled: true,
      frequency: 'weekly',
      time: '14:00',
      contentType: 'mixed',
      approvalRequired: false
    }
  },
  {
    id: 3,
    name: 'Servicios Técnicos Pro',
    type: 'Servicios',
    logo: "https://images.unsplash.com/photo-1567093322503-341d262ad8f9",
    logoAlt: 'Professional technical services company logo with gear and wrench symbols',
    socialAccounts: [
    {
      platform: 'linkedin',
      username: '@servicios-tecnicos-pro',
      connected: true,
      followers: 543,
      engagementRate: 5.4,
      autoPosting: true,
      lastPost: '6 horas'
    },
    {
      platform: 'facebook',
      username: '@ServiciosTecnicosPro',
      connected: true,
      followers: 876,
      engagementRate: 2.8,
      autoPosting: false,
      lastPost: '2 días'
    },
    {
      platform: 'youtube',
      username: '@TecnicosPro',
      connected: false,
      followers: 0,
      engagementRate: 0,
      autoPosting: false,
      lastPost: null
    }],

    automation: {
      enabled: false,
      frequency: 'monthly',
      time: '10:00',
      contentType: 'educational',
      approvalRequired: true
    }
  }];


  const tabs = [
  { id: 'overview', label: 'Resumen', icon: 'LayoutDashboard' },
  { id: 'accounts', label: 'Cuentas', icon: 'Users' },
  { id: 'automation', label: 'Automatización', icon: 'Bot' },
  { id: 'scheduler', label: 'Programador', icon: 'Calendar' },
  { id: 'analytics', label: 'Análisis', icon: 'BarChart3' }];


  const clientOptions = mockClients?.map((client) => ({
    value: client?.id,
    label: client?.name,
    description: client?.type
  }));

  useEffect(() => {
    // Set first client as default
    if (mockClients?.length > 0 && !selectedClient) {
      setSelectedClient(mockClients?.[0]);
      setCurrentClient(mockClients?.[0]);
    }
  }, []);

  const handleClientChange = (clientId) => {
    const client = mockClients?.find((c) => c?.id === clientId);
    setSelectedClient(client);
    setCurrentClient(client);
  };

  const handleConnectAccount = (account) => {
    console.log('Connecting account:', account);
    // Simulate connection process
  };

  const handleDisconnectAccount = (account) => {
    console.log('Disconnecting account:', account);
    // Simulate disconnection process
  };

  const handleConfigureAccount = (account) => {
    console.log('Configuring account:', account);
    // Open configuration modal or navigate to settings
  };

  const handleUpdateAutomation = (clientId, settings) => {
    console.log('Updating automation for client:', clientId, settings);
    // Update automation settings
  };

  const handleSchedulePost = (postData) => {
    console.log('Scheduling post:', postData);
    // Schedule new post
  };

  const handleSaveDraft = (draftData) => {
    console.log('Saving draft:', draftData);
    // Save draft post
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Client Selection */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Gestión de Redes Sociales
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Administra las cuentas sociales y automatización de contenido
                  </p>
                </div>
                
                <Select
                  options={clientOptions}
                  value={selectedClient?.id}
                  onChange={handleClientChange}
                  placeholder="Seleccionar cliente"
                  className="w-64" />

              </div>

              {selectedClient &&
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon name="Users" size={20} color="var(--color-primary)" />
                      <span className="font-medium text-foreground">Seguidores Totales</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {selectedClient?.socialAccounts?.filter((acc) => acc?.connected)?.reduce((total, acc) => total + acc?.followers, 0)?.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon name="Link" size={20} color="var(--color-success)" />
                      <span className="font-medium text-foreground">Cuentas Conectadas</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {selectedClient?.socialAccounts?.filter((acc) => acc?.connected)?.length}/
                      {selectedClient?.socialAccounts?.length}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon name="Bot" size={20} color="var(--color-warning)" />
                      <span className="font-medium text-foreground">Automatización</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {selectedClient?.automation?.enabled ? 'Activa' : 'Inactiva'}
                    </div>
                  </div>
                </div>
              }
            </div>
            {/* Clients Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClients?.map((client) =>
              <ClientSocialOverview
                key={client?.id}
                client={client}
                onSelectClient={setSelectedClient} />

              )}
            </div>
          </div>);


      case 'accounts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Cuentas de Redes Sociales
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedClient ? `Gestionar cuentas de ${selectedClient?.name}` : 'Selecciona un cliente'}
                </p>
              </div>
              
              {selectedClient &&
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left">

                  Conectar Nueva Cuenta
                </Button>
              }
            </div>
            {selectedClient ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedClient?.socialAccounts?.map((account, index) =>
              <SocialAccountCard
                key={index}
                account={account}
                onConnect={handleConnectAccount}
                onDisconnect={handleDisconnectAccount}
                onConfigure={handleConfigureAccount} />

              )}
              </div> :

            <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selecciona un Cliente
                </h3>
                <p className="text-muted-foreground">
                  Elige un cliente para gestionar sus cuentas de redes sociales
                </p>
              </div>
            }
          </div>);


      case 'automation':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Automatización de Publicaciones
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedClient ? `Configurar automatización para ${selectedClient?.name}` : 'Selecciona un cliente'}
              </p>
            </div>
            {selectedClient ?
            <AutomationPanel
              client={selectedClient}
              onUpdateAutomation={handleUpdateAutomation} /> :


            <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
                <Icon name="Bot" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selecciona un Cliente
                </h3>
                <p className="text-muted-foreground">
                  Elige un cliente para configurar la automatización de sus publicaciones
                </p>
              </div>
            }
          </div>);


      case 'scheduler':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Programador de Contenido
              </h2>
              <p className="text-sm text-muted-foreground">
                Crear y programar publicaciones para redes sociales
              </p>
            </div>

            <ContentScheduler
              onSchedulePost={handleSchedulePost}
              onSaveDraft={handleSaveDraft} />

          </div>);


      case 'analytics':
        return <AnalyticsDashboard selectedClient={selectedClient} />;

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
        onProjectSelect={setActiveProject} />

      <WorkflowBreadcrumb
        currentClient={currentClient}
        activeProject={activeProject} />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`
                }>

                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>);

};

export default SocialMediaIntegration;