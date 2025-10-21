import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const DatabaseManagement = () => {
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [autoBackup, setAutoBackup] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState('30');

  const backupFrequencyOptions = [
    { value: 'hourly', label: 'Cada hora' },
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' }
  ];

  const retentionOptions = [
    { value: '7', label: '7 días' },
    { value: '30', label: '30 días' },
    { value: '90', label: '90 días' },
    { value: '365', label: '1 año' },
    { value: 'forever', label: 'Permanente' }
  ];

  const backupHistory = [
    {
      id: 1,
      date: '2025-10-21T08:00:00',
      type: 'Automático',
      size: '245 MB',
      status: 'success',
      duration: '2m 34s'
    },
    {
      id: 2,
      date: '2025-10-20T08:00:00',
      type: 'Automático',
      size: '243 MB',
      status: 'success',
      duration: '2m 28s'
    },
    {
      id: 3,
      date: '2025-10-19T15:30:00',
      type: 'Manual',
      size: '241 MB',
      status: 'success',
      duration: '2m 45s'
    },
    {
      id: 4,
      date: '2025-10-19T08:00:00',
      type: 'Automático',
      size: '240 MB',
      status: 'error',
      duration: '0m 15s'
    },
    {
      id: 5,
      date: '2025-10-18T08:00:00',
      type: 'Automático',
      size: '238 MB',
      status: 'success',
      duration: '2m 31s'
    }
  ];

  const storageStats = {
    totalUsed: 2.4,
    totalLimit: 10,
    breakdown: [
      { category: 'Proyectos', size: 1.2, color: 'bg-primary' },
      { category: 'Plantillas', size: 0.8, color: 'bg-accent' },
      { category: 'Imágenes', size: 0.3, color: 'bg-warning' },
      { category: 'Respaldos', size: 0.1, color: 'bg-secondary' }
    ]
  };

  const maintenanceTasks = [
    {
      id: 'optimize_db',
      name: 'Optimizar Base de Datos',
      description: 'Reorganizar índices y limpiar fragmentación',
      lastRun: '2025-10-20T02:00:00',
      nextRun: '2025-10-27T02:00:00',
      enabled: true
    },
    {
      id: 'cleanup_temp',
      name: 'Limpiar Archivos Temporales',
      description: 'Eliminar archivos temporales y caché obsoleto',
      lastRun: '2025-10-21T01:00:00',
      nextRun: '2025-10-22T01:00:00',
      enabled: true
    },
    {
      id: 'compress_images',
      name: 'Comprimir Imágenes',
      description: 'Optimizar imágenes para reducir espacio',
      lastRun: '2025-10-19T03:00:00',
      nextRun: '2025-10-26T03:00:00',
      enabled: false
    },
    {
      id: 'archive_old',
      name: 'Archivar Proyectos Antiguos',
      description: 'Mover proyectos inactivos a archivo',
      lastRun: '2025-10-15T04:00:00',
      nextRun: '2025-11-15T04:00:00',
      enabled: true
    }
  ];

  const handleBackupNow = () => {
    alert('Iniciando respaldo manual...');
  };

  const handleRestoreBackup = (backupId) => {
    if (confirm('¿Estás seguro de que quieres restaurar este respaldo? Esta acción no se puede deshacer.')) {
      alert(`Restaurando respaldo ${backupId}...`);
    }
  };

  const handleExportData = (format) => {
    alert(`Exportando datos en formato ${format}...`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return { icon: 'CheckCircle', color: 'text-success' };
      case 'error': return { icon: 'XCircle', color: 'text-error' };
      case 'warning': return { icon: 'AlertTriangle', color: 'text-warning' };
      default: return { icon: 'Clock', color: 'text-muted-foreground' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('es-ES'),
      time: date?.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getUsagePercentage = () => {
    return (storageStats?.totalUsed / storageStats?.totalLimit) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Backup Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Database" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Configuración de Respaldos</h3>
              <p className="text-sm text-muted-foreground">
                Protege tus datos con respaldos automáticos regulares
              </p>
            </div>
          </div>
          <Button onClick={handleBackupNow} iconName="Download" iconPosition="left">
            Respaldar Ahora
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Select
            label="Frecuencia de Respaldo"
            description="Con qué frecuencia crear respaldos automáticos"
            options={backupFrequencyOptions}
            value={backupFrequency}
            onChange={setBackupFrequency}
          />

          <Select
            label="Período de Retención"
            description="Cuánto tiempo mantener los respaldos"
            options={retentionOptions}
            value={retentionPeriod}
            onChange={setRetentionPeriod}
          />

          <div className="flex flex-col justify-end">
            <Checkbox
              label="Respaldo Automático"
              description="Crear respaldos automáticamente según la frecuencia configurada"
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e?.target?.checked)}
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Información de Respaldo</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Los respaldos se almacenan de forma segura y encriptada</p>
            <p>• Próximo respaldo automático: {new Date(Date.now() + 24 * 60 * 60 * 1000)?.toLocaleDateString('es-ES')} a las 08:00</p>
            <p>• Tamaño promedio de respaldo: ~245 MB</p>
          </div>
        </div>
      </div>
      {/* Storage Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="HardDrive" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Estadísticas de Almacenamiento</h3>
            <p className="text-sm text-muted-foreground">
              Monitoreo del uso de espacio y distribución de datos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Uso Total</span>
              <span className="text-sm text-muted-foreground">
                {storageStats?.totalUsed} GB de {storageStats?.totalLimit} GB
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3 mb-4">
              <div 
                className="bg-primary h-3 rounded-full transition-all"
                style={{ width: `${getUsagePercentage()}%` }}
              ></div>
            </div>

            <div className="space-y-3">
              {storageStats?.breakdown?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item?.color}`}></div>
                    <span className="text-sm text-foreground">{item?.category}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item?.size} GB</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Recomendaciones</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Considera comprimir imágenes antiguas</p>
                <p>• Archiva proyectos completados hace más de 6 meses</p>
                <p>• Limpia respaldos antiguos automáticamente</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Trash2" iconPosition="left">
                Limpiar Caché
              </Button>
              <Button variant="outline" size="sm" iconName="Archive" iconPosition="left">
                Archivar Antiguos
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Backup History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Historial de Respaldos</h3>
            <p className="text-sm text-muted-foreground">
              Registro de respaldos recientes y su estado
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {backupHistory?.map(backup => {
            const statusConfig = getStatusIcon(backup?.status);
            const dateInfo = formatDate(backup?.date);
            
            return (
              <div key={backup?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{backup?.type}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{backup?.size}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {dateInfo?.date} a las {dateInfo?.time} • Duración: {backup?.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {backup?.status === 'success' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRestoreBackup(backup?.id)}
                      >
                        Restaurar
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Download">
                        Descargar
                      </Button>
                    </>
                  )}
                  {backup?.status === 'error' && (
                    <Button variant="ghost" size="sm" iconName="RotateCcw">
                      Reintentar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Data Export */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="FileDown" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Exportación de Datos</h3>
            <p className="text-sm text-muted-foreground">
              Exporta tus datos en diferentes formatos para respaldo o migración
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="font-medium text-foreground mb-2">JSON</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Formato estructurado para desarrolladores
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExportData('JSON')}
              fullWidth
            >
              Exportar JSON
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Icon name="FileSpreadsheet" size={32} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="font-medium text-foreground mb-2">CSV</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Compatible con Excel y hojas de cálculo
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExportData('CSV')}
              fullWidth
            >
              Exportar CSV
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Icon name="Archive" size={32} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="font-medium text-foreground mb-2">ZIP</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Archivo completo con imágenes incluidas
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExportData('ZIP')}
              fullWidth
            >
              Exportar ZIP
            </Button>
          </div>
        </div>
      </div>
      {/* Automated Maintenance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Mantenimiento Automático</h3>
            <p className="text-sm text-muted-foreground">
              Tareas programadas para mantener la base de datos optimizada
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {maintenanceTasks?.map(task => {
            const lastRun = formatDate(task?.lastRun);
            const nextRun = formatDate(task?.nextRun);
            
            return (
              <div key={task?.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{task?.name}</h4>
                    {task?.enabled && (
                      <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-md">
                        Activo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task?.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <span>Última ejecución: {lastRun?.date} a las {lastRun?.time}</span>
                    {task?.enabled && (
                      <span className="ml-4">Próxima: {nextRun?.date} a las {nextRun?.time}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox
                    checked={task?.enabled}
                    onChange={() => {}}
                  />
                  <Button variant="ghost" size="sm" iconName="Play">
                    Ejecutar
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;