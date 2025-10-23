import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useClient } from '../../context/ClientContext'; 
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
  // --- LA LÍNEA CORREGIDA ---
  // Ahora también extraemos 'currentClient' de nuestro contexto global.
  const { clients, setClients, currentClient, setCurrentClient } = useClient(); 

  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter states (sin cambios)
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');

  useEffect(() => {
    if (clients && clients.length > 0) {
      setFilteredClients(clients);
      return;
    }
    const fetchClients = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        const formattedData = data.map(client => ({ ...client, businessType: client.business_type }));
        setClients(formattedData);
        setFilteredClients(formattedData);
      }
      setIsLoading(false);
    };
    fetchClients();
  }, []); 

  useEffect(() => {
    let filtered = clients;
    if (searchTerm) {
      filtered = filtered?.filter((client) =>
        client?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.businessType?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered?.filter((client) => client?.status === statusFilter);
    }
    if (subscriptionFilter !== 'all') {
      filtered = filtered?.filter((client) => client?.subscription === subscriptionFilter);
    }
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
    setCurrentClient(client);
    setIsDetailModalOpen(true);
  };

  const handleViewProjects = (client) => {
    setCurrentClient(client); 
    navigate('/project-details');
  };
  
  const handleSaveClient = async (clientDataFromModal) => {
    if (clientDataFromModal.id && clients.find(c => c.id === clientDataFromModal.id)) {
        console.log("Lógica para actualizar cliente en Supabase (pendiente)...");
        setIsDetailModalOpen(false);
    } else {
      try {
        const { data, error } = await supabase.from('clients').insert([{
            name: clientDataFromModal.name,
            business_type: clientDataFromModal.businessType,
            email: clientDataFromModal.email,
            phone: clientDataFromModal.phone,
            address: clientDataFromModal.address,
            status: clientDataFromModal.status || 'pending',
            subscription: clientDataFromModal.subscription || 'basic',
            website: clientDataFromModal.website,
            logo_url: clientDataFromModal.logo,
        }]).select().single();
        if (error) throw error;
        if (data) {
          const newClientFormatted = { ...data, businessType: data.business_type };
          setClients(prevClients => [newClientFormatted, ...prevClients]); 
        }
      } catch (error) {
        console.error('Error adding client:', error.message);
        alert('Hubo un error al guardar el cliente.');
      } finally {
        setIsAddModalOpen(false);
      }
    }
  };

  const handleClearFilters = () => {
    setSearchTerm(''); setStatusFilter('all'); setSubscriptionFilter('all'); setBusinessTypeFilter('all');
  };
  const handleClientChange = (client) => { setCurrentClient(client); };
  const handleProjectSelect = (project) => { console.log('Project selected:', project); };

  // El JSX no ha cambiado. El error estaba en la lógica de arriba.
  return (
    <div className="min-h-screen bg-background">
      <Header
        currentClient={currentClient}
        onClientChange={handleClientChange}
        onProjectSelect={handleProjectSelect} />
      <WorkflowBreadcrumb currentClient={currentClient} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
              <p className="text-muted-foreground mt-2">Administra tus clientes, proyectos y relaciones comerciales</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} iconName="Plus" iconPosition="left">
              Nuevo Cliente
            </Button>
          </div>
          <ClientStats clients={clients} />
          <ClientFilters
            searchTerm={searchTerm} onSearchChange={setSearchTerm}
            statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
            subscriptionFilter={subscriptionFilter} onSubscriptionFilterChange={setSubscriptionFilter}
            businessTypeFilter={businessTypeFilter} onBusinessTypeFilterChange={setBusinessTypeFilter}
            onClearFilters={handleClearFilters} />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Lista de Clientes ({filteredClients?.length})</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>Total: {clients?.length} clientes</span>
              </div>
            </div>
            {isLoading ? (
                <div className="text-center py-12"><p className="text-muted-foreground">Cargando clientes...</p></div>
            ) : filteredClients?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{clients?.length === 0 ? 'No hay clientes registrados' : 'No se encontraron clientes'}</h3>
                <p className="text-muted-foreground mb-6">{clients?.length === 0 ? 'Comienza agregando tu primer cliente' : 'Intenta ajustar los filtros de búsqueda'}</p>
                {clients?.length === 0 && <Button onClick={() => setIsAddModalOpen(true)} iconName="Plus" iconPosition="left">Agregar Primer Cliente</Button>}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredClients?.map((client) =>
                  <ClientCard key={client?.id} client={client} onSelect={handleClientSelect} onEdit={handleEditClient} onViewProjects={handleViewProjects} />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <ClientDetailModal client={selectedClient} isOpen={isDetailModalOpen} onClose={() => { setIsDetailModalOpen(false); setSelectedClient(null); }} onSave={handleSaveClient} />
      <AddClientModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveClient} />
    </div>
  );
};

export default ClientManagement;