import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const sessionOptions = [
    { value: '15', label: '15 minutos' },
    { value: '30', label: '30 minutos' },
    { value: '60', label: '1 hora' },
    { value: '120', label: '2 horas' },
    { value: '480', label: '8 horas' },
    { value: 'never', label: 'Nunca' }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro - Chrome',
      location: 'Madrid, España',
      ipAddress: '192.168.1.100',
      lastActive: '2025-10-21T08:45:00',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15 - Safari',
      location: 'Madrid, España',
      ipAddress: '192.168.1.101',
      lastActive: '2025-10-21T07:30:00',
      current: false
    },
    {
      id: 3,
      device: 'iPad Air - Safari',
      location: 'Barcelona, España',
      ipAddress: '10.0.0.45',
      lastActive: '2025-10-20T22:15:00',
      current: false
    }
  ];

  const securityLogs = [
    {
      id: 1,
      action: 'Inicio de sesión exitoso',
      timestamp: '2025-10-21T08:45:00',
      ipAddress: '192.168.1.100',
      device: 'MacBook Pro - Chrome',
      status: 'success'
    },
    {
      id: 2,
      action: 'Cambio de contraseña',
      timestamp: '2025-10-20T15:30:00',
      ipAddress: '192.168.1.100',
      device: 'MacBook Pro - Chrome',
      status: 'success'
    },
    {
      id: 3,
      action: 'Intento de acceso fallido',
      timestamp: '2025-10-19T23:45:00',
      ipAddress: '203.0.113.45',
      device: 'Desconocido',
      status: 'warning'
    }
  ];

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Simulate password change
    alert('Contraseña actualizada correctamente');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSessionTerminate = (sessionId) => {
    alert(`Sesión ${sessionId} terminada`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return { icon: 'CheckCircle', color: 'text-success' };
      case 'warning': return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'error': return { icon: 'XCircle', color: 'text-error' };
      default: return { icon: 'Info', color: 'text-muted-foreground' };
    }
  };

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    return `Hace ${diffDays} días`;
  };

  return (
    <div className="space-y-8">
      {/* Password Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Lock" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Gestión de Contraseña</h3>
            <p className="text-sm text-muted-foreground">
              Mantén tu cuenta segura con una contraseña fuerte
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Contraseña Actual"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e?.target?.value)}
              placeholder="Ingresa tu contraseña actual"
            />
            <Input
              label="Nueva Contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e?.target?.value)}
              placeholder="Ingresa una nueva contraseña"
              description="Mínimo 8 caracteres con mayúsculas, minúsculas y números"
            />
            <Input
              label="Confirmar Nueva Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e?.target?.value)}
              placeholder="Confirma tu nueva contraseña"
            />
            <Button 
              onClick={handlePasswordChange}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              Actualizar Contraseña
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Requisitos de Seguridad</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Mínimo 8 caracteres</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Al menos una mayúscula</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Al menos un número</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="X" size={14} className="text-muted-foreground" />
                <span>Carácter especial (recomendado)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Autenticación de Dos Factores</h3>
              <p className="text-sm text-muted-foreground">
                Añade una capa extra de seguridad a tu cuenta
              </p>
            </div>
          </div>
          <Checkbox
            checked={twoFactorEnabled}
            onChange={(e) => setTwoFactorEnabled(e?.target?.checked)}
          />
        </div>

        {twoFactorEnabled && (
          <div className="border-t border-border pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Configurar Aplicación</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Escanea este código QR con tu aplicación de autenticación
                </p>
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="QrCode" size={48} className="text-muted-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3">Códigos de Respaldo</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Guarda estos códigos en un lugar seguro
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                  <div>1A2B-3C4D-5E6F</div>
                  <div>7G8H-9I0J-1K2L</div>
                  <div>3M4N-5O6P-7Q8R</div>
                  <div>9S0T-1U2V-3W4X</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Session Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Monitor" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Gestión de Sesiones</h3>
              <p className="text-sm text-muted-foreground">
                Controla tus sesiones activas y configuraciones de tiempo
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <Select
              label="Tiempo de Inactividad"
              description="Cerrar sesión automáticamente después de"
              options={sessionOptions}
              value={sessionTimeout}
              onChange={setSessionTimeout}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Sesiones Activas</h4>
          {activeSessions?.map(session => (
            <div key={session?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                  <Icon name={session?.device?.includes('iPhone') || session?.device?.includes('iPad') ? 'Smartphone' : 'Monitor'} size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{session?.device}</span>
                    {session?.current && (
                      <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-md">
                        Actual
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session?.location} • {session?.ipAddress}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatLastActive(session?.lastActive)}
                  </p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSessionTerminate(session?.id)}
                >
                  Terminar
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Security Logs */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Registro de Seguridad</h3>
            <p className="text-sm text-muted-foreground">
              Historial de actividad y eventos de seguridad
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {securityLogs?.map(log => {
            const statusConfig = getStatusIcon(log?.status);
            return (
              <div key={log?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
                  <div>
                    <p className="font-medium text-foreground">{log?.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {log?.device} • {log?.ipAddress}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">
                    {new Date(log.timestamp)?.toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.timestamp)?.toLocaleTimeString('es-ES')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Exportar Registro Completo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;