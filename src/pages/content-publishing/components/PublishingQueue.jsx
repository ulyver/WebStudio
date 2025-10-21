import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PublishingQueue = ({ queueItems, onPause, onResume, onCancel, onPrioritize }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const statusOptions = [
    { value: 'all', label: 'Todos los Estados' },
    { value: 'queued', label: 'En Cola' },
    { value: 'processing', label: 'Procesando' },
    { value: 'completed', label: 'Completado' },
    { value: 'failed', label: 'Fallido' },
    { value: 'paused', label: 'Pausado' }
  ];

  const sortOptions = [
    { value: 'priority', label: 'Prioridad' },
    { value: 'created', label: 'Fecha de Creación' },
    { value: 'status', label: 'Estado' },
    { value: 'client', label: 'Cliente' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'processing': return 'text-primary';
      case 'paused': return 'text-warning';
      case 'queued': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'processing': return 'Loader';
      case 'paused': return 'Pause';
      case 'queued': return 'Clock';
      default: return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  const filteredItems = queueItems?.filter(item => 
    filterStatus === 'all' || item?.status === filterStatus
  );

  const sortedItems = [...filteredItems]?.sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'status':
        return a?.status?.localeCompare(b?.status);
      case 'client':
        return a?.client?.localeCompare(b?.client);
      default:
        return 0;
    }
  });

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `hace ${Math.floor(diffInMinutes / 60)} h`;
    return `hace ${Math.floor(diffInMinutes / 1440)} días`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="List" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Cola de Publicación</h3>
            <p className="text-sm text-muted-foreground">
              {queueItems?.length} elementos • {queueItems?.filter(i => i?.status === 'processing')?.length} procesando
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" iconName="Pause" iconPosition="left">
            Pausar Cola
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Actualizar
          </Button>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <Select
            placeholder="Filtrar por estado"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
        </div>
        <div className="flex-1">
          <Select
            placeholder="Ordenar por"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>
      {/* Queue Items */}
      <div className="space-y-3">
        {sortedItems?.map((item) => (
          <div
            key={item?.id}
            className="p-4 rounded-lg border border-border hover:border-muted-foreground/30 transition-smooth"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon
                  name={getStatusIcon(item?.status)}
                  size={20}
                  className={`${getStatusColor(item?.status)} ${
                    item?.status === 'processing' ? 'animate-spin' : ''
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-foreground">{item?.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(item?.priority)} bg-current/10`}>
                      {getPriorityLabel(item?.priority)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>👤 {item?.client}</span>
                    <span>📁 {item?.project}</span>
                    <span>🕒 {formatTimeAgo(item?.createdAt)}</span>
                    {item?.estimatedTime && (
                      <span>⏱️ ~{item?.estimatedTime} min</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {item?.status === 'processing' && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onPause(item?.id)}
                    iconName="Pause"
                    iconPosition="left"
                  >
                    Pausar
                  </Button>
                )}
                {item?.status === 'paused' && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onResume(item?.id)}
                    iconName="Play"
                    iconPosition="left"
                  >
                    Reanudar
                  </Button>
                )}
                {(item?.status === 'queued' || item?.status === 'paused') && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onPrioritize(item?.id)}
                    iconName="ArrowUp"
                    iconPosition="left"
                  >
                    Priorizar
                  </Button>
                )}
                {item?.status !== 'completed' && item?.status !== 'processing' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onCancel(item?.id)}
                    iconName="X"
                    iconPosition="left"
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar for Processing Items */}
            {item?.status === 'processing' && item?.progress !== undefined && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{item?.currentStep || 'Procesando...'}</span>
                  <span>{item?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item?.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error Details for Failed Items */}
            {item?.status === 'failed' && item?.error && (
              <div className="mt-3 p-3 bg-error/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-error">Error de Publicación</p>
                    <p className="text-xs text-error/80 mt-1">{item?.error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {sortedItems?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {filterStatus === 'all' ?'No hay elementos en la cola de publicación'
              : `No hay elementos con estado "${statusOptions?.find(o => o?.value === filterStatus)?.label}"`
            }
          </p>
        </div>
      )}
      {/* Queue Statistics */}
      {queueItems?.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">
                {queueItems?.filter(i => i?.status === 'completed')?.length} completados
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">
                {queueItems?.filter(i => i?.status === 'processing')?.length} procesando
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              <span className="text-muted-foreground">
                {queueItems?.filter(i => i?.status === 'queued')?.length} en cola
              </span>
            </div>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Exportar Log
          </Button>
        </div>
      )}
    </div>
  );
};

export default PublishingQueue;