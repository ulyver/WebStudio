import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Importamos useParams
import { useClient } from '../../context/ClientContext';
import { supabase } from '../../supabaseClient';
import AddProjectModal from '../client-management/components/AddProjectModal';

import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import ProjectHeader from './components/ProjectHeader';
import ProjectProgress from './components/ProjectProgress';
import ProjectActions from './components/ProjectActions';
import CommunicationLog from './components/CommunicationLog';
import ProjectFiles from './components/ProjectFiles';
import ProjectTimeline from './components/ProjectTimeline';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon'; // Importamos Icon para el estado de carga

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // Leemos el ID opcional de la URL
  const { currentClient, setCurrentClient } = useClient();

  const [activeProject, setActiveProject] = useState(null);
  const [clientOfProject, setClientOfProject] = useState(null); // Guardamos el cliente del proyecto cargado
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      
      if (projectId) {
        // --- LÓGICA A: Hay un ID en la URL, esta es la prioridad ---
        const { data, error } = await supabase
          .from('projects')
          .select('*, clients (*)') // Traemos el proyecto Y su cliente
          .eq('id', projectId)
          .single();

        if (error) {
          console.error('Error fetching specific project:', error);
        } else {
          setActiveProject(data);
          setClientOfProject(data.clients);
          // Opcional: Sincronizamos el contexto global
          if (!currentClient || currentClient.id !== data.clients.id) {
            setCurrentClient(data.clients);
          }
        }
      } else if (currentClient) {
        // --- LÓGICA B: No hay ID en la URL, usamos el cliente del contexto ---
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', currentClient.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects for client:', error);
        } else {
          setActiveProject(data && data.length > 0 ? data[0] : null);
          setClientOfProject(currentClient); // El cliente es el del contexto
        }
      } else {
        // --- LÓGICA C: No hay ID en la URL ni cliente en el contexto ---
        setActiveProject(null);
        setClientOfProject(null);
      }
      setIsLoading(false);
    };

    fetchProjectData();
  }, [projectId, currentClient, setCurrentClient]);

  const handleSaveProject = async (projectData) => {
    try {
      const { data, error } = await supabase.from('projects').insert([projectData]).select('*, clients (*)').single();
      if (error) throw error;
      setActiveProject(data);
      setClientOfProject(data.clients);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error.message);
      alert('Hubo un error al guardar el proyecto.');
    }
  };

  const handleEditProject = () => {
    if (activeProject) navigate(`/template-editor/${activeProject.id}`);
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'LayoutDashboard' },
    // ... tus otras pestañas
  ];
  
  // --- RENDERIZADO MEJORADO ---
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!clientOfProject) {
    // Si después de cargar, no hay cliente (ni por URL ni por contexto)
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16"><WorkflowBreadcrumb />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Ningún cliente seleccionado</h2>
              <p className="text-muted-foreground mb-4">Por favor, selecciona un cliente para ver sus proyectos.</p>
              <Link to="/client-management"><Button>Ir a la lista de Clientes</Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Si llegamos aquí, tenemos un cliente (clientOfProject) y puede que un proyecto (activeProject)
  return (
    <div className="min-h-screen bg-background">
      <Header activeProject={activeProject} onProjectSelect={setActiveProject} />
      <div className="pt-16">
        <WorkflowBreadcrumb currentClient={clientOfProject} activeProject={activeProject} />
        
        <main className="container mx-auto px-6 py-8">
          {activeProject ? (
            // Si hay un proyecto activo, mostramos los detalles
            <>
              <div className="mb-8"><ProjectHeader project={activeProject} client={clientOfProject} onEditProject={handleEditProject} /></div>
              {/* ... El resto de tu JSX para mostrar los detalles del proyecto ... */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                <div className="space-y-8"><ProjectProgress project={activeProject} /></div>
                {/* ... etc ... */}
              </div>
            </>
          ) : (
            // Si hay cliente pero no proyectos, mostramos la opción para crear
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium">Este cliente no tiene proyectos</h3>
              <p className="text-muted-foreground mt-2 mb-4">Comienza creando el primer proyecto para {clientOfProject.name}.</p>
              <Button onClick={() => setIsAddModalOpen(true)}>Crear Primer Proyecto</Button>
            </div>
          )}
        </main>
      </div>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveProject}
        clientId={clientOfProject?.id}
      />
    </div>
  );
};

export default ProjectDetails;