import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  subscriptionFilter,
  onSubscriptionFilterChange,
  businessTypeFilter,
  onBusinessTypeFilterChange,
  onClearFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'Todos los Estados' },
    { value: 'active', label: 'Activos' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'inactive', label: 'Inactivos' }
  ];

  const subscriptionOptions = [
    { value: 'all', label: 'Todas las Suscripciones' },
    { value: 'premium', label: 'Premium' },
    { value: 'standard', label: 'Estándar' },
    { value: 'basic', label: 'Básico' }
  ];

  const businessTypeOptions = [
    { value: 'all', label: 'Todos los Tipos' },
    { value: 'restaurant', label: 'Restaurante' },
    { value: 'retail', label: 'Comercio' },
    { value: 'services', label: 'Servicios' },
    { value: 'automotive', label: 'Automotriz' },
    { value: 'food', label: 'Alimentación' }
  ];

  const hasActiveFilters = statusFilter !== 'all' || subscriptionFilter !== 'all' || businessTypeFilter !== 'all' || searchTerm;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtros de Búsqueda</h3>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} iconName="X" iconPosition="left">
            Limpiar Filtros
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Input
            type="search"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {statusOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={subscriptionFilter}
            onChange={(e) => onSubscriptionFilterChange(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {subscriptionOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={businessTypeFilter}
            onChange={(e) => onBusinessTypeFilterChange(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {businessTypeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span>Activos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span>Pendientes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
            <span>Inactivos</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={14} />
          <span>Filtros aplicados</span>
        </div>
      </div>
    </div>
  );
};

export default ClientFilters;