import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeploymentMonitor = ({ deployments, onRetry, onRollback }) => {
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'failed': return 'text-error';
      case 'pending': return 'text-warning';
      case 'deploying': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'pending': return 'Clock';
      case 'deploying': return 'Loader';
      default: return 'Circle';
    }
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Monitor de Despliegue</h3>
            <p className="text-sm text-muted-foreground">Estado y métricas de publicación</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
          Actualizar
        </Button>
      </div>
      {/* Deployment List */}
      <div className="space-y-3 mb-6">
        {deployments?.map((deployment) => (
          <div
            key={deployment?.id}
            className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
              selectedDeployment?.id === deployment?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground/30'
            }`}
            onClick={() => setSelectedDeployment(deployment)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon
                  name={getStatusIcon(deployment?.status)}
                  size={20}
                  className={`${getStatusColor(deployment?.status)} ${
                    deployment?.status === 'deploying' ? 'animate-spin' : ''
                  }`}
                />
                <div>
                  <p className="font-medium text-foreground">{deployment?.site}</p>
                  <p className="text-sm text-muted-foreground">
                    {deployment?.branch} • {deployment?.commit?.substring(0, 7)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getStatusColor(deployment?.status)}`}>
                  {deployment?.status === 'success' && 'Exitoso'}
                  {deployment?.status === 'failed' && 'Falló'}
                  {deployment?.status === 'pending' && 'Pendiente'}
                  {deployment?.status === 'deploying' && 'Desplegando'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {deployment?.duration ? formatDuration(deployment?.duration) : '--'}
                </p>
              </div>
            </div>

            {deployment?.status === 'deploying' && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progreso del despliegue</span>
                  <span>{deployment?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${deployment?.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {deployment?.url && deployment?.status === 'success' && (
              <div className="mt-3 flex items-center justify-between">
                <a
                  href={deployment?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center space-x-1"
                >
                  <Icon name="ExternalLink" size={14} />
                  <span>{deployment?.url}</span>
                </a>
                <div className="flex items-center space-x-2">
                  {deployment?.status === 'failed' && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onRetry(deployment?.id);
                      }}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Reintentar
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onRollback(deployment?.id);
                    }}
                    iconName="Undo"
                    iconPosition="left"
                  >
                    Revertir
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Deployment Details */}
      {selectedDeployment && (
        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Detalles del Despliegue</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Iniciado</p>
                <p className="text-sm font-medium text-foreground">{selectedDeployment?.startTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Finalizado</p>
                <p className="text-sm font-medium text-foreground">
                  {selectedDeployment?.endTime || 'En progreso...'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Proveedor</p>
                <p className="text-sm font-medium text-foreground">{selectedDeployment?.provider}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Tamaño del Build</p>
                <p className="text-sm font-medium text-foreground">{selectedDeployment?.buildSize}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Archivos</p>
                <p className="text-sm font-medium text-foreground">{selectedDeployment?.fileCount} archivos</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CDN</p>
                <p className="text-sm font-medium text-foreground">{selectedDeployment?.cdn}</p>
              </div>
            </div>
          </div>

          {selectedDeployment?.logs && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Logs de Despliegue</p>
              <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
                <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">
                  {selectedDeployment?.logs}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeploymentMonitor;