import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import ProjectHeader from './components/ProjectHeader';
import ProjectProgress from './components/ProjectProgress';
import ProjectActions from './components/ProjectActions';
import CommunicationLog from './components/CommunicationLog';
import ProjectFiles from './components/ProjectFiles';
import ProjectTimeline from './components/ProjectTimeline';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [currentClient, setCurrentClient] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data para el proyecto actual
  const mockProject = {
    id: 1,
    name: "Sitio Web Restaurante El Sabor",
    description: "Desarrollo de sitio web completo para restaurante familiar con enfoque en menú digital, reservas online y presencia en redes sociales.",
    status: "En Progreso",
    priority: "Alta",
    progress: 75,
    createdDate: "15/10/2025",
    deadline: "28/10/2025",
    websiteType: "Restaurante",
    clientId: 1,
    budget: "€2,500",
    estimatedHours: 40,
    completedHours: 30
  };

  const mockClient = {
    id: 1,
    name: "Restaurante El Sabor",
    type: "Restaurante",
    contact: "María González",
    email: "maria@elsabor.com",
    phone: "+34 666 123 456",
    address: "Calle Mayor 123, Madrid"
  };

  useEffect(() => {
    setCurrentClient(mockClient);
    setActiveProject(mockProject);
  }, []);

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

  if (!activeProject || !currentClient) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          currentClient={currentClient}
          activeProject={activeProject}
          onClientChange={handleClientChange}
          onProjectSelect={() => {}}
        />
        <div className="pt-16">
          <WorkflowBreadcrumb 
            currentClient={currentClient}
            activeProject={activeProject}
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Cargando proyecto...</h2>
              <p className="text-muted-foreground">Por favor espera mientras cargamos los detalles del proyecto.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentClient={currentClient}
        activeProject={activeProject}
        onClientChange={handleClientChange}
        onProjectSelect={() => {}}
      />
      <div className="pt-16">
        <WorkflowBreadcrumb 
          currentClient={currentClient}
          activeProject={activeProject}
        />
        
        <main className="container mx-auto px-6 py-8">
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
            {/* Left Column - Progress & Actions */}
            <div className="space-y-8">
              <ProjectProgress project={activeProject} />
              <ProjectActions 
                project={activeProject}
                onExportProject={handleExportProject}
              />
            </div>

            {/* Right Column - Communication & Files */}
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
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;