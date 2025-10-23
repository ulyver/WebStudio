import React, { useState, useEffect } from 'react';
// --- NUEVO ---
import { supabase } from 'supabaseClient'; // Importamos supabase
import AddProjectModal from './AddProjectModal'; // Importamos el modal de proyectos

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientDetailModal = ({ client, isOpen, onClose, onSave }) => {
  // --- MODIFICADO ---
  const [activeTab, setActiveTab] = useState('profile'); // Cambiado a 'profile' para que coincida con tu 'id'
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(client || {});

  // --- NUEVO ---
  // Estados para manejar los proyectos
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData(client);
    }
  }, [client]);

  // --- NUEVO ---
  // useEffect para cargar los proyectos del cliente seleccionado desde Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      if (!client?.id) {
        setProjects([]);
        return;
      }
      setIsLoadingProjects(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setIsLoadingProjects(false);
    };

    // Solo cargamos proyectos si el modal está abierto y la pestaña de proyectos está activa o a punto de activarse
    if (isOpen) {
      fetchProjects();
    }
  }, [client, isOpen]); // Se ejecuta cuando cambia el cliente o se abre/cierra el modal

  if (!isOpen || !client) return null;

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: 'User' },
    { id: 'projects', label: 'Proyectos', icon: 'FolderOpen' },
    { id: 'social', label: 'Redes Sociales', icon: 'Share2' },
    { id: 'communication', label: 'Comunicación', icon: 'MessageSquare' }
  ];

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- NUEVO ---
  // Función para guardar el nuevo proyecto en Supabase
  const handleSaveProject = async (projectData) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();
      
      if (error) throw error;

      setProjects(prevProjects => [data, ...prevProjects]);
      setIsAddProjectModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error.message);
      alert('Hubo un error al guardar el proyecto.');
    }
  };

  const renderProfileTab = () => (
    // Tu código de renderProfileTab no cambia en absoluto. Lo dejo aquí por completitud.
    <div className="space-y-6">
       <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
          <Image 
            src={client?.logo} 
            alt={client?.logoAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          {editMode ? (
            <div className="space-y-3">
              <Input
                label="Nombre del Negocio"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
              />
              <Input
                label="Tipo de Negocio"
                value={formData?.businessType}
                onChange={(e) => handleInputChange('businessType', e?.target?.value)}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-foreground">{client?.name}</h2>
              <p className="text-muted-foreground">{client?.businessType}</p>
            </div>
          )}
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Información de Contacto</h3>
          {editMode ? (
            <div className="space-y-3">
              <Input
                label="Email"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
              />
              <Input
                label="Teléfono"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
              />
              <Input
                label="Dirección"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{client?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{client?.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{client?.address}</span>
              </div>
            </div>
          )}
        </div>
         <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Estado del Servicio</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Suscripción</span>
              <span className="font-medium text-foreground capitalize">{client?.subscription}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estado del Sitio Web</span>
              <span className={`font-medium ${client?.websiteStatus === 'live' ? 'text-success' : 'text-warning'}`}>
                {client?.websiteStatus === 'live' ? 'En Línea' : 'En Desarrollo'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Redes Sociales</span>
              <span className={`font-medium ${client?.socialConnected ? 'text-success' : 'text-muted-foreground'}`}>
                {client?.socialConnected ? 'Conectadas' : 'Sin Conectar'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MODIFICADO ---
  // La pestaña de proyectos ahora es dinámica y se conecta a Supabase.
  const renderProjectsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Proyectos del Cliente</h3>
        <Button 
          variant="outline" 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => setIsAddProjectModalOpen(true)} // --- NUEVO: Abre el modal
        >
          Nuevo Proyecto
        </Button>
      </div>
      
      {isLoadingProjects ? (
        <p className="text-muted-foreground text-center py-4">Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <Icon name="FolderOpen" size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-foreground font-medium">No hay proyectos registrados</p>
          <p className="text-muted-foreground text-sm">Haz clic en "Nuevo Proyecto" para empezar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.description || 'Sin descripción'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    project.status === 'completed' ? 'bg-success/10 text-success' :
                    project.status === 'in-progress' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSocialTab = () => (
    // Sin cambios por ahora
    <div className="text-center py-8 bg-muted/30 rounded-lg">
      <Icon name="Share2" size={40} className="mx-auto text-muted-foreground mb-3" />
      <p className="text-foreground font-medium">Próximamente</p>
      <p className="text-muted-foreground text-sm">Aquí gestionarás las redes sociales del cliente.</p>
    </div>
  );

  const renderCommunicationTab = () => (
    // Sin cambios por ahora
    <div className="text-center py-8 bg-muted/30 rounded-lg">
      <Icon name="MessageSquare" size={40} className="mx-auto text-muted-foreground mb-3" />
      <p className="text-foreground font-medium">Próximamente</p>
      <p className="text-muted-foreground text-sm">Aquí verás el historial de comunicación.</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Detalles del Cliente</h2>
          <div className="flex items-center space-x-2">
            {activeTab === 'profile' && (
              editMode ? (
                <>
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancelar</Button>
                  <Button onClick={handleSave}>Guardar</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setEditMode(true)} iconName="Edit2" iconPosition="left">
                  Editar
                </Button>
              )
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'projects' && renderProjectsTab()}
          {activeTab === 'social' && renderSocialTab()}
          {activeTab === 'communication' && renderCommunicationTab()}
        </div>
      </div>
      
      {/* --- NUEVO --- */}
      {/* El modal para añadir proyectos se renderiza aquí */}
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSave={handleSaveProject}
        clientId={client?.id}
      />
    </div>
  );
};

export default ClientDetailModal;