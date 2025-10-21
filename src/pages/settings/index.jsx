import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import Icon from '../../components/AppIcon';
import ApiIntegrationPanel from './components/ApiIntegrationPanel';
import SecuritySettings from './components/SecuritySettings';
import SystemPreferences from './components/SystemPreferences';
import DatabaseManagement from './components/DatabaseManagement';
import ExternalServices from './components/ExternalServices';
import SystemDiagnostics from './components/SystemDiagnostics';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('api-integration');
  const [currentClient] = useState({
    id: 1,
    name: 'Restaurante El Sabor',
    type: 'Restaurante'
  });
  const [activeProject] = useState({
    id: 1,
    name: 'Sitio Web Principal'
  });

  const settingsTabs = [
    {
      id: 'api-integration',
      label: 'Integraciones API',
      icon: 'Plug',
      description: 'Servicios de IA y APIs externas',
      component: ApiIntegrationPanel
    },
    {
      id: 'security',
      label: 'Seguridad',
      icon: 'Shield',
      description: 'Contraseñas y autenticación',
      component: SecuritySettings
    },
    {
      id: 'preferences',
      label: 'Preferencias',
      icon: 'Settings',
      description: 'Interfaz y notificaciones',
      component: SystemPreferences
    },
    {
      id: 'database',
      label: 'Base de Datos',
      icon: 'Database',
      description: 'Respaldos y mantenimiento',
      component: DatabaseManagement
    },
    {
      id: 'external-services',
      label: 'Servicios Externos',
      icon: 'Globe',
      description: 'Hosting y redes sociales',
      component: ExternalServices
    },
    {
      id: 'diagnostics',
      label: 'Diagnósticos',
      icon: 'Activity',
      description: 'Rendimiento y logs',
      component: SystemDiagnostics
    }
  ];

  const ActiveComponent = settingsTabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentClient={currentClient}
        activeProject={activeProject}
        onClientChange={() => {}}
        onProjectSelect={() => {}}
      />
      <WorkflowBreadcrumb 
        currentClient={currentClient}
        activeProject={activeProject}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
                <p className="text-muted-foreground">
                  Gestiona integraciones, seguridad y preferencias de WebStudio Pro
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">APIs Conectadas</p>
                    <p className="text-lg font-semibold text-foreground">6/10</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nivel de Seguridad</p>
                    <p className="text-lg font-semibold text-foreground">Alto</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Database" size={16} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Último Respaldo</p>
                    <p className="text-lg font-semibold text-foreground">Hoy</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado del Sistema</p>
                    <p className="text-lg font-semibold text-foreground">Óptimo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Categorías de Configuración</h3>
                <nav className="space-y-1">
                  {settingsTabs?.map(tab => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{tab?.label}</p>
                        <p className={`text-xs truncate ${
                          activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {tab?.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* System Status Indicator */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Sistema Operativo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Todos los servicios funcionando correctamente
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Última verificación: {new Date()?.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-lg p-6">
                {/* Tab Header */}
                <div className="mb-6 pb-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={settingsTabs?.find(tab => tab?.id === activeTab)?.icon || 'Settings'} 
                        size={20} 
                        className="text-primary" 
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {settingsTabs?.find(tab => tab?.id === activeTab)?.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {settingsTabs?.find(tab => tab?.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Content */}
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex items-center justify-between p-6 bg-card border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">¿Necesitas ayuda?</h4>
              <p className="text-sm text-muted-foreground">
                Consulta nuestra documentación o contacta soporte técnico
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="Book" size={16} />
                <span>Documentación</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="MessageCircle" size={16} />
                <span>Soporte</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;