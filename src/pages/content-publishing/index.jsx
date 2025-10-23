// src/pages/content-publishing/index.jsx

import React, { useState, useEffect } from 'react';
// --- AÑADIDO ---
// 1. Importamos nuestro hook 'useClient' para acceder al contexto global.
import { useClient } from '../../context/ClientContext';
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
  // --- AÑADIDO ---
  // 2. Obtenemos el cliente actual del contexto.
  const { currentClient } = useClient();

  const [activeTab, setActiveTab] = useState('publish');
  
  // --- ELIMINADO ---
  // 3. Hemos borrado todos los 'mockData' (mockContent, mockDeployments, etc.).
  // La página ahora estará limpia, esperando datos reales.

  // --- ELIMINADO ---
  // Se ha borrado el 'useState' local para 'currentClient' y el 'useEffect' que lo inicializaba.

  const tabs = [
    { id: 'publish', label: 'Publicar', icon: 'Upload', count: null },
    { id: 'deployments', label: 'Despliegues', icon: 'Activity', count: 0 },
    { id: 'domains', label: 'Dominios', icon: 'Globe', count: 0 },
    { id: 'validation', label: 'Validación', icon: 'Shield', count: null },
    { id: 'queue', label: 'Cola', icon: 'List', count: 0 }
  ];

  // Las funciones de manejo las dejamos por ahora.
  const handlePublish = async (publishConfig) => console.log('Publishing with config:', publishConfig);
  // ... (el resto de funciones handle... se quedan como estaban)

  // --- LA GRAN MEJORA ---
  // 4. Igual que antes, si no hay cliente, mostramos un mensaje.
  if (!currentClient) {
    return (
        <div className="min-h-screen bg-background">
          <Header />
          <WorkflowBreadcrumb />
          <main className="pt-16">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center py-20 bg-card border border-border rounded-lg shadow-card">
                <Icon name="UploadCloud" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No hay un cliente seleccionado</h2>
                <p className="text-muted-foreground">Para gestionar la publicación, primero selecciona un cliente.</p>
              </div>
            </div>
          </main>
        </div>
    );
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      // Por ahora, todas las pestañas mostrarán un mensaje de estado vacío.
      case 'publish':
      case 'deployments':
      case 'domains':
      case 'validation':
      case 'queue':
      default:
        return (
          <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
            <Icon name={tabs.find(t => t.id === activeTab)?.icon || 'FileText'} size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Módulo en Construcción</h3>
            <p className="text-muted-foreground">
              Esta sección mostrará los datos de publicación para <span className="font-semibold text-primary">{currentClient.name}</span>.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowBreadcrumb />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Publicación de Contenido</h1>
            <p className="text-muted-foreground">
              Gestionando el despliegue para el cliente: <span className="font-semibold text-primary">{currentClient.name}</span>
            </p>
          </div>
          
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPublishing;