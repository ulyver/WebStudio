import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../context/ClientContext';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import ProjectHeader from './components/ProjectHeader';
import ProjectProgress from './components/ProjectProgress';
import ProjectActions from './components/ProjectActions';
import CommunicationLog from './components/CommunicationLog';
import ProjectFiles from './components/ProjectFiles';
import ProjectTimeline from './components/ProjectTimeline';
import Button from '../../components/ui/Button'; //

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { currentClient } = useClient();
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
  // Si el cliente del contexto cambia, actualizamos el proyecto activo
  if (currentClient && currentClient.projects && currentClient.projects.length > 0) {
    // Por ahora, seleccionamos el primer proyecto de la lista
    setActiveProject(currentClient.projects[0]);
  } else {
    setActiveProject(null);
  }
}, [currentClient]);

  const handleClientChange = (client) => {
    setCurrentClient(client);
  };

  const handleEditProject = () => {
    navigate('/template-editor');
  };

  const handleViewClient = () => {
    navigate('/client-management');
  };

  const handleExportProject = () => {
    // Lógica para exportar proyecto
    console.log('Exportando proyecto...');
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'LayoutDashboard' },
    { id: 'timeline', label: 'Cronología', icon: 'Clock' },
    { id: 'files', label: 'Archivos', icon: 'FolderOpen' },
    { id: 'communication', label: 'Comunicación', icon: 'MessageCircle' }
  ];

  if (!currentClient) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <WorkflowBreadcrumb />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Ningún cliente seleccionado</h2>
            <p className="text-muted-foreground mb-4">Por favor, selecciona un cliente para ver sus proyectos.</p>
            <Link to="/client-management">
              <Button>Ir a la lista de Clientes</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeProject={activeProject}
        onProjectSelect={() => {}}
      />
      <div className="pt-16">
        <WorkflowBreadcrumb 
          currentClient={currentClient}
          activeProject={activeProject}
        />
        
        {/* --- INICIO DE LA LÓGICA MODIFICADA --- */}
        {/* Primero, verificamos si hay un cliente seleccionado */}
        {!currentClient ? (
          // Si NO hay cliente, mostramos el mensaje de ayuda
          <main className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Ningún cliente seleccionado</h2>
                <p className="text-muted-foreground mb-4">Por favor, selecciona un cliente para ver sus proyectos.</p>
                <Link to="/client-management">
                  <Button>Ir a la lista de Clientes</Button>
                </Link>
              </div>
            </div>
          </main>
        ) : (
          // Si SÍ hay cliente, entonces renderizamos el contenido principal
          <main className="container mx-auto px-6 py-8">
            {/* Ahora, dentro de un cliente, verificamos si hay un proyecto activo */}
            {activeProject ? (
              // Si SÍ hay un proyecto, mostramos toda la UI del proyecto
              <>
                {/* Project Header */}
                <div className="mb-8">
                  <ProjectHeader
                    project={activeProject}
                    client={currentClient}
                    onEditProject={handleEditProject}
                    onViewClient={handleViewClient}
                  />
                </div>

                {/* Mobile Tab Navigation */}
                <div className="lg:hidden mb-6">
                  <div className="flex overflow-x-auto space-x-1 bg-muted p-1 rounded-lg">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                  <div className="space-y-8">
                    <ProjectProgress project={activeProject} />
                    <ProjectActions 
                      project={activeProject}
                      onExportProject={handleExportProject}
                    />
                  </div>
                  <div className="lg:col-span-2 space-y-8">
                    <CommunicationLog project={activeProject} />
                    <ProjectTimeline project={activeProject} />
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="lg:hidden">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <ProjectProgress project={activeProject} />
                      <ProjectActions 
                        project={activeProject}
                        onExportProject={handleExportProject}
                      />
                    </div>
                  )}
                  {activeTab === 'timeline' && (
                    <ProjectTimeline project={activeProject} />
                  )}
                  {activeTab === 'files' && (
                    <ProjectFiles project={activeProject} />
                  )}
                  {activeTab === 'communication' && (
                    <CommunicationLog project={activeProject} />
                  )}
                </div>

                {/* Desktop Files Section */}
                <div className="hidden lg:block mt-8">
                  <ProjectFiles project={activeProject} />
                </div>
              </>
            ) : (
              // Si el cliente NO tiene proyectos, mostramos un mensaje para crear uno
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-medium">Este cliente no tiene proyectos</h3>
                <p className="text-muted-foreground mt-2 mb-4">Comienza creando el primer proyecto para {currentClient.name}.</p>
                <Button>Crear Primer Proyecto</Button>
              </div>
            )}
          </main>
        )}
        {/* --- FIN DE LA LÓGICA MODIFICADA --- */}

      </div>
    </div>
  );
};
export default ProjectDetails;