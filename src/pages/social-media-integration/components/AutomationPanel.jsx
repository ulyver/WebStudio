import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AutomationPanel = ({ client, onUpdateAutomation }) => {
  const [automationSettings, setAutomationSettings] = useState({
    enabled: client?.automation?.enabled || false,
    frequency: client?.automation?.frequency || 'daily',
    time: client?.automation?.time || '09:00',
    contentType: client?.automation?.contentType || 'mixed',
    approvalRequired: client?.automation?.approvalRequired || true
  });

  const [isSaving, setIsSaving] = useState(false);

  const frequencyOptions = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quincenal' },
    { value: 'monthly', label: 'Mensual' }
  ];

  const contentTypeOptions = [
    { value: 'mixed', label: 'Contenido Mixto' },
    { value: 'promotional', label: 'Promocional' },
    { value: 'educational', label: 'Educativo' },
    { value: 'entertainment', label: 'Entretenimiento' }
  ];

  const handleSettingChange = (key, value) => {
    setAutomationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onUpdateAutomation) {
        onUpdateAutomation(client?.id, automationSettings);
      }
      setIsSaving(false);
    }, 1000);
  };

  const getStatusColor = () => {
    if (!automationSettings?.enabled) return 'text-muted-foreground';
    return 'text-success';
  };

  const getStatusText = () => {
    if (!automationSettings?.enabled) return 'Desactivado';
    return 'Activo';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Automatización de Publicaciones
            </h3>
            <p className="text-sm text-muted-foreground">
              Configurar robot de publicación automática
            </p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
          <div className={`w-2 h-2 rounded-full ${
            automationSettings?.enabled ? 'bg-success' : 'bg-muted-foreground'
          }`}></div>
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
      </div>
      <div className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h4 className="font-medium text-foreground">Activar Automatización</h4>
            <p className="text-sm text-muted-foreground">
              Permitir publicaciones automáticas programadas
            </p>
          </div>
          <Button
            variant={automationSettings?.enabled ? "default" : "outline"}
            size="sm"
            onClick={() => handleSettingChange('enabled', !automationSettings?.enabled)}
            iconName={automationSettings?.enabled ? "ToggleRight" : "ToggleLeft"}
            iconPosition="left"
          >
            {automationSettings?.enabled ? 'Activado' : 'Desactivado'}
          </Button>
        </div>

        {automationSettings?.enabled && (
          <>
            {/* Frequency Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Frecuencia de Publicación"
                description="¿Con qué frecuencia publicar contenido?"
                options={frequencyOptions}
                value={automationSettings?.frequency}
                onChange={(value) => handleSettingChange('frequency', value)}
              />
              
              <Input
                label="Hora de Publicación"
                type="time"
                description="Hora preferida para publicar"
                value={automationSettings?.time}
                onChange={(e) => handleSettingChange('time', e?.target?.value)}
              />
            </div>

            {/* Content Type */}
            <Select
              label="Tipo de Contenido"
              description="Seleccionar el tipo de contenido a generar"
              options={contentTypeOptions}
              value={automationSettings?.contentType}
              onChange={(value) => handleSettingChange('contentType', value)}
            />

            {/* Approval Settings */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Aprobación Manual</h4>
                <p className="text-sm text-muted-foreground">
                  Revisar contenido antes de publicar
                </p>
              </div>
              <Button
                variant={automationSettings?.approvalRequired ? "default" : "outline"}
                size="sm"
                onClick={() => handleSettingChange('approvalRequired', !automationSettings?.approvalRequired)}
                iconName={automationSettings?.approvalRequired ? "CheckCircle" : "Circle"}
                iconPosition="left"
              >
                {automationSettings?.approvalRequired ? 'Requerida' : 'Automática'}
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">24</div>
                <div className="text-xs text-muted-foreground">Posts Programados</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-success">18</div>
                <div className="text-xs text-muted-foreground">Publicados</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-warning">6</div>
                <div className="text-xs text-muted-foreground">Pendientes</div>
              </div>
            </div>
          </>
        )}

        {/* Save Button */}
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setAutomationSettings({
              enabled: client?.automation?.enabled || false,
              frequency: client?.automation?.frequency || 'daily',
              time: client?.automation?.time || '09:00',
              contentType: client?.automation?.contentType || 'mixed',
              approvalRequired: client?.automation?.approvalRequired || true
            })}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutomationPanel;