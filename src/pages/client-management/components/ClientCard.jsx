import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ClientCard = ({ client, onSelect, onEdit, onViewProjects }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSubscriptionBadge = (type) => {
    const badges = {
      premium: { label: 'Premium', color: 'bg-primary text-primary-foreground' },
      standard: { label: 'Estándar', color: 'bg-secondary text-secondary-foreground' },
      basic: { label: 'Básico', color: 'bg-muted text-muted-foreground' }
    };
    return badges?.[type] || badges?.basic;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-smooth cursor-pointer"
         onClick={() => onSelect(client)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image 
              src={client?.logo} 
              alt={client?.logoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{client?.name}</h3>
            <p className="text-sm text-muted-foreground">{client?.businessType}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client?.status)}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current mr-1"></div>
                {client?.status === 'active' ? 'Activo' : client?.status === 'pending' ? 'Pendiente' : 'Inactivo'}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionBadge(client?.subscription)?.color}`}>
                {getSubscriptionBadge(client?.subscription)?.label}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onEdit(client);
            }}
          >
            <Icon name="Edit2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onViewProjects(client);
            }}
          >
            <Icon name="FolderOpen" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{client?.activeProjects}</div>
          <div className="text-xs text-muted-foreground">Proyectos Activos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{client?.completedProjects}</div>
          <div className="text-xs text-muted-foreground">Completados</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${client?.websiteStatus === 'live' ? 'text-success' : 'text-warning'}`}>
            <Icon name={client?.websiteStatus === 'live' ? 'Globe' : 'Clock'} size={20} />
          </div>
          <div className="text-xs text-muted-foreground">
            {client?.websiteStatus === 'live' ? 'Sitio Activo' : 'En Desarrollo'}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${client?.socialConnected ? 'text-success' : 'text-muted-foreground'}`}>
            <Icon name="Share2" size={20} />
          </div>
          <div className="text-xs text-muted-foreground">
            {client?.socialConnected ? 'Conectado' : 'Sin Conectar'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Mail" size={14} />
          <span>{client?.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={14} />
          <span>{client?.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;