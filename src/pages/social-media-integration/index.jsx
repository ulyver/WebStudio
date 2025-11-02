// src/pages/social-media-integration/index.jsx

import React, { useState } from 'react';
// --- AÑADIDO ---
// 1. Importamos nuestro hook 'useClient' para acceder al contexto global.
import { useClient } from '../../context/ClientContext'; 
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
import AddSocialAccountModal from './components/AddSocialAccountModal'; 
const SocialMediaIntegration = () => {
  
  // 2. Obtenemos el cliente actual, la función para cambiarlo y la lista de todos los clientes del contexto.
  const { currentClient, setCurrentClient, clients } = useClient();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'LayoutDashboard' },
    { id: 'accounts', label: 'Cuentas', icon: 'Users' },
    { id: 'automation', label: 'Automatización', icon: 'Bot' },
    { id: 'scheduler', label: 'Programador', icon: 'Calendar' },
    { id: 'analytics', label: 'Análisis', icon: 'BarChart3' }
  ];

  // --- MODIFICADO ---
  // 4. El selector de clientes ahora se construye con la lista real de 'clients' del contexto.
  const clientOptions = clients?.map((client) => ({
    value: client.id,
    label: client.name,
    description: client.businessType
  }));

  // --- MODIFICADO ---
  // 5. Esta función ahora usa 'setCurrentClient' del contexto para cambiar el cliente activo globalmente.
  const handleClientChange = (clientId) => {
    const client = clients?.find((c) => c.id === clientId);
    setCurrentClient(client);
  };
  
  // Estas funciones de abajo las dejamos como están por ahora.
  // Más adelante las conectaremos a Supabase.
  const handleConnectAccount = (account) => console.log('Connecting account:', account);
  const handleDisconnectAccount = (account) => console.log('Disconnecting account:', account);
  const handleConfigureAccount = (account) => console.log('Configuring account:', account);
  const handleUpdateAutomation = (clientId, settings) => console.log('Updating automation for client:', clientId, settings);
  const handleSchedulePost = (postData) => console.log('Scheduling post:', postData);
  const handleSaveDraft = (draftData) => console.log('Saving draft:', draftData);

  // --- LA GRAN MEJORA ---
  // 6. Si no hay ningún cliente seleccionado, mostramos un mensaje limpio en lugar de la página.
  if (!currentClient) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <WorkflowBreadcrumb />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center py-20 bg-card border border-border rounded-lg shadow-card">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No hay un cliente seleccionado</h2>
              <p className="text-muted-foreground mb-6">
                Por favor, ve a la sección de "Gestión de Clientes" o usa el selector en la cabecera para elegir un cliente.
              </p>
              <Button onClick={() => navigate('/client-management')}>
                Ir a Clientes
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- LÓGICA PRINCIPAL (RENDERIZADO) ---
  // Si llegamos aquí, es porque SÍ hay un 'currentClient' seleccionado.
  // Todo el JSX de abajo ahora usará 'currentClient' para mostrar datos.
  const renderTabContent = () => {
    // NOTA: Tu cliente de Supabase todavía no tiene un campo 'socialAccounts'.
    // Por ahora, mostraremos un estado vacío para que no se rompa la aplicación.
    const socialAccounts = currentClient?.socialAccounts || [];
    const automation = currentClient?.automation || { enabled: false };

    switch (activeTab) {
      case 'overview':
        // El overview lo dejamos simple por ahora
        return (
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground">
                Resumen de Redes Sociales para {currentClient.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Actualmente no hay datos de redes sociales para este cliente. El próximo paso será añadirlos en Supabase.
              </p>
          </div>
        );
      case 'accounts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Cuentas de Redes Sociales</h2>
                <p className="text-sm text-muted-foreground">Gestionar cuentas de {currentClient.name}</p>
              </div>
              <Button variant="default" iconName="Plus" iconPosition="left">Conectar Nueva Cuenta</Button>
            </div>
            {socialAccounts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialAccounts.map((account, index) =>
                  <SocialAccountCard key={index} account={account} onConnect={handleConnectAccount} onDisconnect={handleDisconnectAccount} onConfigure={handleConfigureAccount} />
                )}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No hay cuentas conectadas</h3>
                <p className="text-muted-foreground">Comienza conectando la primera cuenta de red social para {currentClient.name}.</p>
              </div>
            )}
          </div>
        );
      // Los otros casos (automation, scheduler, analytics) mostrarán un mensaje similar.
      case 'automation':
        return <AutomationPanel client={currentClient} onUpdateAutomation={handleUpdateAutomation} />;
      case 'scheduler':
        return <ContentScheduler onSchedulePost={handleSchedulePost} onSaveDraft={handleSaveDraft} />;
      case 'analytics':
        return <AnalyticsDashboard selectedClient={currentClient} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowBreadcrumb />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
              <div>
                  <h1 className="text-3xl font-bold text-foreground">Integración de Redes Sociales</h1>
                  <p className="text-muted-foreground mt-2">Gestiona la presencia online del cliente: <span className="font-semibold text-primary">{currentClient.name}</span></p>
              </div>
              {/* Este selector ahora está sincronizado con el contexto global */}
              <Select
                options={clientOptions}
                value={currentClient.id}
                onChange={handleClientChange}
                placeholder="Cambiar de cliente"
                className="w-64"
              />
          </div>
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              )}
            </nav>
          </div>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default SocialMediaIntegration;