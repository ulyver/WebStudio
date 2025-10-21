import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemDiagnostics = () => {
  const [systemHealth, setSystemHealth] = useState('good');
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  const performanceMetrics = {
    cpu: { usage: 23, status: 'good' },
    memory: { usage: 67, status: 'warning' },
    storage: { usage: 45, status: 'good' },
    network: { latency: 45, status: 'good' }
  };

  const systemChecks = [
    {
      id: 'database_connection',
      name: 'Conexión a Base de Datos',
      status: 'success',
      lastCheck: '2025-10-21T08:45:00',
      message: 'Conexión estable y optimizada'
    },
    {
      id: 'api_endpoints',
      name: 'Endpoints de API',
      status: 'success',
      lastCheck: '2025-10-21T08:44:30',
      message: 'Todos los endpoints responden correctamente'
    },
    {
      id: 'external_services',
      name: 'Servicios Externos',
      status: 'warning',
      lastCheck: '2025-10-21T08:43:15',
      message: '2 de 8 servicios desconectados'
    },
    {
      id: 'ssl_certificates',
      name: 'Certificados SSL',
      status: 'success',
      lastCheck: '2025-10-21T08:42:00',
      message: 'Certificados válidos hasta 2026-03-15'
    },
    {
      id: 'backup_system',
      name: 'Sistema de Respaldos',
      status: 'success',
      lastCheck: '2025-10-21T08:00:00',
      message: 'Último respaldo completado exitosamente'
    },
    {
      id: 'security_scan',
      name: 'Escaneo de Seguridad',
      status: 'error',
      lastCheck: '2025-10-20T23:00:00',
      message: 'Se detectaron 3 vulnerabilidades menores'
    }
  ];

  const errorLogs = [
    {
      id: 1,
      timestamp: '2025-10-21T08:30:15',
      level: 'error',
      component: 'API Gateway',
      message: 'Rate limit exceeded for external service call',
      details: 'OpenAI API returned 429 status code'
    },
    {
      id: 2,
      timestamp: '2025-10-21T07:45:22',
      level: 'warning',
      component: 'Database',
      message: 'Slow query detected',
      details: 'Query execution time: 2.3s (threshold: 1s)'
    },
    {
      id: 3,
      timestamp: '2025-10-21T06:15:08',
      level: 'info',
      component: 'Backup Service',
      message: 'Automated backup completed successfully',
      details: 'Backup size: 245MB, Duration: 2m 34s'
    },
    {
      id: 4,
      timestamp: '2025-10-20T23:30:45',
      level: 'error',
      component: 'Security Scanner',
      message: 'Potential security vulnerability detected',
      details: 'Outdated dependency: react-router-dom@5.2.0'
    },
    {
      id: 5,
      timestamp: '2025-10-20T22:15:33',
      level: 'warning',
      component: 'Image Processor',
      message: 'Image compression failed',
      details: 'Unable to process image: invalid format'
    }
  ];

  const troubleshootingGuides = [
    {
      id: 'slow_performance',
      title: 'Rendimiento Lento',
      description: 'La aplicación responde lentamente',
      steps: [
        'Verificar uso de memoria y CPU',
        'Limpiar caché del navegador',
        'Optimizar consultas de base de datos',
        'Revisar conexión a internet'
      ]
    },
    {
      id: 'connection_errors',
      title: 'Errores de Conexión',
      description: 'Problemas para conectar con servicios externos',
      steps: [
        'Verificar credenciales de API',
        'Comprobar límites de uso',
        'Revisar configuración de red',
        'Contactar soporte del proveedor'
      ]
    },
    {
      id: 'backup_failures',
      title: 'Fallos en Respaldos',
      description: 'Los respaldos automáticos no se completan',
      steps: [
        'Verificar espacio de almacenamiento',
        'Comprobar permisos de escritura',
        'Revisar configuración de respaldos',
        'Ejecutar respaldo manual de prueba'
      ]
    }
  ];

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    
    // Simulate diagnostic process
    setTimeout(() => {
      setIsRunningDiagnostics(false);
      alert('Diagnóstico completado. Se encontraron 2 problemas menores.');
    }, 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return { icon: 'CheckCircle', color: 'text-success' };
      case 'warning': return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'error': return { icon: 'XCircle', color: 'text-error' };
      case 'info': return { icon: 'Info', color: 'text-primary' };
      default: return { icon: 'Clock', color: 'text-muted-foreground' };
    }
  };

  const getUsageColor = (usage, type = 'default') => {
    if (type === 'network') {
      if (usage <= 50) return 'bg-success';
      if (usage <= 100) return 'bg-warning';
      return 'bg-error';
    }
    
    if (usage <= 50) return 'bg-success';
    if (usage <= 80) return 'bg-warning';
    return 'bg-error';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString('es-ES'),
      time: date?.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Estado del Sistema</h3>
              <p className="text-sm text-muted-foreground">
                Monitoreo en tiempo real del rendimiento y salud del sistema
              </p>
            </div>
          </div>
          <Button 
            onClick={runDiagnostics}
            loading={isRunningDiagnostics}
            iconName="Search"
            iconPosition="left"
          >
            Ejecutar Diagnóstico
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">CPU</span>
              <Icon name="Cpu" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {performanceMetrics?.cpu?.usage}%
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getUsageColor(performanceMetrics?.cpu?.usage)}`}
                style={{ width: `${performanceMetrics?.cpu?.usage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Memoria</span>
              <Icon name="MemoryStick" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {performanceMetrics?.memory?.usage}%
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getUsageColor(performanceMetrics?.memory?.usage)}`}
                style={{ width: `${performanceMetrics?.memory?.usage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Almacenamiento</span>
              <Icon name="HardDrive" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {performanceMetrics?.storage?.usage}%
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getUsageColor(performanceMetrics?.storage?.usage)}`}
                style={{ width: `${performanceMetrics?.storage?.usage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Red</span>
              <Icon name="Wifi" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {performanceMetrics?.network?.latency}ms
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getUsageColor(performanceMetrics?.network?.latency, 'network')}`}
                style={{ width: `${Math.min(performanceMetrics?.network?.latency, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* System Checks */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="CheckSquare" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Verificaciones del Sistema</h3>
            <p className="text-sm text-muted-foreground">
              Estado de los componentes críticos del sistema
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {systemChecks?.map(check => {
            const statusConfig = getStatusIcon(check?.status);
            const timeInfo = formatTimestamp(check?.lastCheck);
            
            return (
              <div key={check?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
                  <div>
                    <h4 className="font-medium text-foreground">{check?.name}</h4>
                    <p className="text-sm text-muted-foreground">{check?.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{timeInfo?.time}</p>
                  <p className="text-xs text-muted-foreground">{timeInfo?.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Error Logs */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Registro de Errores</h3>
              <p className="text-sm text-muted-foreground">
                Eventos recientes del sistema y errores detectados
              </p>
            </div>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Exportar Logs
          </Button>
        </div>

        <div className="space-y-3">
          {errorLogs?.map(log => {
            const statusConfig = getStatusIcon(log?.level);
            const timeInfo = formatTimestamp(log?.timestamp);
            
            return (
              <div key={log?.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Icon name={statusConfig?.icon} size={16} className={statusConfig?.color} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{log?.component}</span>
                        <span className={`px-2 py-1 text-xs rounded-md ${
                          log?.level === 'error' ? 'bg-error text-error-foreground' :
                          log?.level === 'warning' ? 'bg-warning text-warning-foreground' :
                          'bg-primary text-primary-foreground'
                        }`}>
                          {log?.level?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mt-1">{log?.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{timeInfo?.time}</p>
                    <p className="text-xs text-muted-foreground">{timeInfo?.date}</p>
                  </div>
                </div>
                <div className="ml-7 mt-2">
                  <p className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 font-mono">
                    {log?.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Troubleshooting Guides */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Guías de Solución de Problemas</h3>
            <p className="text-sm text-muted-foreground">
              Pasos para resolver problemas comunes del sistema
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {troubleshootingGuides?.map(guide => (
            <div key={guide?.id} className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">{guide?.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{guide?.description}</p>
              
              <div className="space-y-2">
                {guide?.steps?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground">{step}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                Ver Guía Completa
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* System Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Info" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Información del Sistema</h3>
            <p className="text-sm text-muted-foreground">
              Detalles técnicos y configuración del entorno
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Versión de la Aplicación:</span>
              <span className="text-sm font-medium text-foreground">v2.1.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Entorno:</span>
              <span className="text-sm font-medium text-foreground">Producción</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Base de Datos:</span>
              <span className="text-sm font-medium text-foreground">PostgreSQL 14.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Servidor:</span>
              <span className="text-sm font-medium text-foreground">Node.js 18.17.0</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Última Actualización:</span>
              <span className="text-sm font-medium text-foreground">2025-10-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tiempo de Actividad:</span>
              <span className="text-sm font-medium text-foreground">15 días, 8 horas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Región:</span>
              <span className="text-sm font-medium text-foreground">Europa Oeste</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Zona Horaria:</span>
              <span className="text-sm font-medium text-foreground">Europe/Madrid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDiagnostics;