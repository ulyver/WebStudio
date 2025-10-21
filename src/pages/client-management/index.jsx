import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ClientCard from './components/ClientCard';
import ClientDetailModal from './components/ClientDetailModal';
import ClientFilters from './components/ClientFilters';
import AddClientModal from './components/AddClientModal';
import ClientStats from './components/ClientStats';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');

  // Mock data
  const mockClients = [
  {
    id: 1,
    name: "Restaurante El Sabor Mediterráneo",
    businessType: "Restaurante",
    email: "contacto@elsabormediterraneo.es",
    phone: "+34 912 345 678",
    address: "Calle Mayor 45, Madrid, España",
    status: "active",
    subscription: "premium",
    activeProjects: 2,
    completedProjects: 3,
    websiteStatus: "live",
    socialConnected: true,
    logo: "https://images.unsplash.com/photo-1686297497125-8e884ac9e2b4",
    logoAlt: "Interior elegante de restaurante mediterráneo con mesas de madera y decoración cálida",
    website: "https://www.elsabormediterraneo.es",
    createdAt: "2024-01-15T10:30:00Z",
    projects: [
    {
      name: "Rediseño Web Principal",
      description: "Actualización completa del sitio web con nuevo diseño responsive",
      status: "completed"
    },
    {
      name: "Sistema de Reservas Online",
      description: "Implementación de sistema de reservas integrado",
      status: "in-progress"
    }],

    socialAccounts: [
    {
      platform: "facebook",
      username: "elsabormediterraneo",
      connected: true,
      followers: "2.5K",
      posts: 156
    },
    {
      platform: "instagram",
      username: "elsabormed",
      connected: true,
      followers: "1.8K",
      posts: 89
    }],

    communications: [
    {
      type: "email",
      subject: "Reunión de seguimiento del proyecto",
      content: "Confirmación de la reunión para revisar el progreso del sistema de reservas online.",
      date: "2024-10-18"
    },
    {
      type: "call",
      subject: "Consulta sobre integración de pagos",
      content: "Llamada telefónica para discutir opciones de pasarelas de pago para el sistema de reservas.",
      date: "2024-10-15"
    }]

  },
  {
    id: 2,
    name: "Boutique Moda Elegante",
    businessType: "Comercio Minorista",
    email: "info@modaelegante.es",
    phone: "+34 923 456 789",
    address: "Avenida de la Moda 12, Barcelona, España",
    status: "active",
    subscription: "standard",
    activeProjects: 1,
    completedProjects: 2,
    websiteStatus: "live",
    socialConnected: true,
    logo: "https://images.unsplash.com/photo-1707376081814-bdba706c6f8e",
    logoAlt: "Interior moderno de boutique con ropa colgada en perchas y maniquíes elegantes",
    website: "https://www.modaelegante.es",
    createdAt: "2024-02-20T14:15:00Z",
    projects: [
    {
      name: "Tienda Online E-commerce",
      description: "Desarrollo de plataforma de venta online con catálogo de productos",
      status: "in-progress"
    }],

    socialAccounts: [
    {
      platform: "instagram",
      username: "modaelegante_bcn",
      connected: true,
      followers: "3.2K",
      posts: 234
    },
    {
      platform: "facebook",
      username: "modaelegantebcn",
      connected: false,
      followers: "1.1K",
      posts: 67
    }],

    communications: [
    {
      type: "email",
      subject: "Actualización del catálogo de productos",
      content: "Solicitud de nuevas fotografías de productos para la tienda online.",
      date: "2024-10-19"
    }]

  },
  {
    id: 3,
    name: "Servicios Técnicos ProFix",
    businessType: "Servicios Profesionales",
    email: "contacto@profix.es",
    phone: "+34 934 567 890",
    address: "Polígono Industrial Norte, Nave 15, Valencia, España",
    status: "pending",
    subscription: "basic",
    activeProjects: 1,
    completedProjects: 0,
    websiteStatus: "development",
    socialConnected: false,
    logo: "https://images.unsplash.com/photo-1604339571118-00e3d2eb281e",
    logoAlt: "Técnico profesional trabajando con herramientas en taller industrial moderno",
    website: "",
    createdAt: "2024-09-10T09:45:00Z",
    projects: [
    {
      name: "Sitio Web Corporativo",
      description: "Desarrollo de sitio web inicial para servicios técnicos",
      status: "in-progress"
    }],

    socialAccounts: [],
    communications: [
    {
      type: "meeting",
      subject: "Reunión inicial del proyecto",
      content: "Primera reunión para definir requisitos y alcance del proyecto web.",
      date: "2024-10-10"
    }]

  },
  {
    id: 4,
    name: "Taller Mecánico AutoExpert",
    businessType: "Taller Mecánico",
    email: "info@autoexpert.es",
    phone: "+34 945 678 901",
    address: "Carretera Nacional 340, Km 15, Sevilla, España",
    status: "active",
    subscription: "standard",
    activeProjects: 0,
    completedProjects: 1,
    websiteStatus: "live",
    socialConnected: true,
    logo: "https://images.unsplash.com/photo-1727893141025-35d62b3f4a03",
    logoAlt: "Mecánico profesional trabajando bajo el capó de un automóvil en taller moderno",
    website: "https://www.autoexpert.es",
    createdAt: "2024-03-05T11:20:00Z",
    projects: [
    {
      name: "Portal de Servicios",
      description: "Sitio web con información de servicios y sistema de citas",
      status: "completed"
    }],

    socialAccounts: [
    {
      platform: "facebook",
      username: "autoexpertsevilla",
      connected: true,
      followers: "892",
      posts: 45
    }],

    communications: [
    {
      type: "email",
      subject: "Mantenimiento mensual completado",
      content: "Confirmación de las tareas de mantenimiento y backup del sitio web.",
      date: "2024-10-01"
    }]

  },
  {
    id: 5,
    name: "Panadería Artesanal San Miguel",
    businessType: "Panadería",
    email: "pedidos@panaderiasanmiguel.es",
    phone: "+34 956 789 012",
    address: "Plaza San Miguel 8, Toledo, España",
    status: "inactive",
    subscription: "basic",
    activeProjects: 0,
    completedProjects: 1,
    websiteStatus: "development",
    socialConnected: false,
    logo: "https://images.unsplash.com/photo-1596579546269-b78ad2c858b8",
    logoAlt: "Panadero artesanal amasando pan en cocina tradicional con horno de leña",
    website: "",
    createdAt: "2024-06-12T16:30:00Z",
    projects: [
    {
      name: "Catálogo de Productos",
      description: "Sitio web básico con catálogo de panes y pasteles",
      status: "completed"
    }],

    socialAccounts: [],
    communications: [
    {
      type: "email",
      subject: "Renovación de servicios",
      content: "Propuesta de renovación y actualización de servicios web.",
      date: "2024-09-15"
    }]

  }];


  useEffect(() => {
    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  useEffect(() => {
    let filtered = clients;

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter((client) =>
      client?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      client?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      client?.businessType?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered?.filter((client) => client?.status === statusFilter);
    }

    // Subscription filter
    if (subscriptionFilter !== 'all') {
      filtered = filtered?.filter((client) => client?.subscription === subscriptionFilter);
    }

    // Business type filter
    if (businessTypeFilter !== 'all') {
      filtered = filtered?.filter((client) =>
      client?.businessType?.toLowerCase()?.includes(businessTypeFilter?.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter, subscriptionFilter, businessTypeFilter]);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setCurrentClient(client);
    setIsDetailModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const handleViewProjects = (client) => {
    setCurrentClient(client);
    navigate('/project-details');
  };

  const handleSaveClient = (clientData) => {
    if (clientData?.id) {
      // Update existing client
      setClients((prev) => prev?.map((c) => c?.id === clientData?.id ? clientData : c));
    } else {
      // Add new client
      setClients((prev) => [...prev, clientData]);
    }
    setIsDetailModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSubscriptionFilter('all');
    setBusinessTypeFilter('all');
  };

  // Add missing handler functions for Header component
  const handleClientChange = (client) => {
    setCurrentClient(client);
  };

  const handleProjectSelect = (project) => {
    // Handle project selection logic
    console.log('Project selected:', project);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentClient={currentClient}
        onClientChange={handleClientChange}
        onProjectSelect={handleProjectSelect} />

      <WorkflowBreadcrumb currentClient={currentClient} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
              <p className="text-muted-foreground mt-2">
                Administra tus clientes, proyectos y relaciones comerciales
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              iconName="Plus"
              iconPosition="left">

              Nuevo Cliente
            </Button>
          </div>

          {/* Client Statistics */}
          <ClientStats clients={clients} />

          {/* Filters */}
          <ClientFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            subscriptionFilter={subscriptionFilter}
            onSubscriptionFilterChange={setSubscriptionFilter}
            businessTypeFilter={businessTypeFilter}
            onBusinessTypeFilterChange={setBusinessTypeFilter}
            onClearFilters={handleClearFilters} />


          {/* Client List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Lista de Clientes ({filteredClients?.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>Total: {clients?.length} clientes</span>
              </div>
            </div>

            {filteredClients?.length === 0 ?
            <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {clients?.length === 0 ? 'No hay clientes registrados' : 'No se encontraron clientes'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {clients?.length === 0 ?
                'Comienza agregando tu primer cliente para gestionar proyectos y servicios' :
                'Intenta ajustar los filtros de búsqueda para encontrar los clientes que buscas'
                }
                </p>
                {clients?.length === 0 &&
              <Button
                onClick={() => setIsAddModalOpen(true)}
                iconName="Plus"
                iconPosition="left">

                    Agregar Primer Cliente
                  </Button>
              }
              </div> :

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredClients?.map((client) =>
              <ClientCard
                key={client?.id}
                client={client}
                onSelect={handleClientSelect}
                onEdit={handleEditClient}
                onViewProjects={handleViewProjects} />

              )}
              </div>
            }
          </div>
        </div>
      </main>
      {/* Modals */}
      <ClientDetailModal
        client={selectedClient}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedClient(null);
        }}
        onSave={handleSaveClient} />

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveClient} />

    </div>);

};

export default ClientManagement;