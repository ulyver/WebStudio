import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const SystemPreferences = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('es');
  const [timezone, setTimezone] = useState('Europe/Madrid');
  const [dateFormat, setDateFormat] = useState('dd/mm/yyyy');
  const [currency, setCurrency] = useState('EUR');

  const themeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'auto', label: 'Automático (Sistema)' }
  ];

  const languageOptions = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' }
  ];

  const timezoneOptions = [
    { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
    { value: 'Europe/London', label: 'Londres (GMT+0)' },
    { value: 'America/New_York', label: 'Nueva York (GMT-5)' },
    { value: 'America/Los_Angeles', label: 'Los Ángeles (GMT-8)' },
    { value: 'Asia/Tokyo', label: 'Tokio (GMT+9)' }
  ];

  const dateFormatOptions = [
    { value: 'dd/mm/yyyy', label: 'DD/MM/AAAA (21/10/2025)' },
    { value: 'mm/dd/yyyy', label: 'MM/DD/AAAA (10/21/2025)' },
    { value: 'yyyy-mm-dd', label: 'AAAA-MM-DD (2025-10-21)' },
    { value: 'dd-mm-yyyy', label: 'DD-MM-AAAA (21-10-2025)' }
  ];

  const currencyOptions = [
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'USD', label: 'Dólar Estadounidense ($)' },
    { value: 'GBP', label: 'Libra Esterlina (£)' },
    { value: 'JPY', label: 'Yen Japonés (¥)' }
  ];

  const notificationSettings = [
    {
      id: 'email_notifications',
      label: 'Notificaciones por Email',
      description: 'Recibir actualizaciones importantes por correo',
      enabled: true
    },
    {
      id: 'browser_notifications',
      label: 'Notificaciones del Navegador',
      description: 'Mostrar notificaciones en tiempo real',
      enabled: false
    },
    {
      id: 'project_updates',
      label: 'Actualizaciones de Proyectos',
      description: 'Notificar cambios en el estado de proyectos',
      enabled: true
    },
    {
      id: 'client_messages',
      label: 'Mensajes de Clientes',
      description: 'Alertas de nuevos mensajes de clientes',
      enabled: true
    },
    {
      id: 'system_maintenance',
      label: 'Mantenimiento del Sistema',
      description: 'Avisos de actualizaciones y mantenimiento',
      enabled: true
    }
  ];

  const workflowSettings = [
    {
      id: 'auto_save',
      label: 'Guardado Automático',
      description: 'Guardar cambios automáticamente cada 30 segundos',
      enabled: true
    },
    {
      id: 'template_suggestions',
      label: 'Sugerencias de Plantillas',
      description: 'Mostrar plantillas recomendadas basadas en el tipo de cliente',
      enabled: true
    },
    {
      id: 'ai_assistance',
      label: 'Asistencia IA Automática',
      description: 'Activar sugerencias de IA durante la edición',
      enabled: false
    },
    {
      id: 'backup_reminders',
      label: 'Recordatorios de Respaldo',
      description: 'Notificar cuando sea necesario hacer respaldo',
      enabled: true
    },
    {
      id: 'client_approval',
      label: 'Aprobación de Cliente Requerida',
      description: 'Solicitar aprobación antes de publicar cambios',
      enabled: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Interface Customization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Palette" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Personalización de Interfaz</h3>
            <p className="text-sm text-muted-foreground">
              Configura la apariencia y comportamiento de la aplicación
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select
            label="Tema"
            description="Apariencia visual de la aplicación"
            options={themeOptions}
            value={theme}
            onChange={setTheme}
          />

          <Select
            label="Idioma"
            description="Idioma de la interfaz"
            options={languageOptions}
            value={language}
            onChange={setLanguage}
          />

          <Select
            label="Zona Horaria"
            description="Zona horaria para fechas y horas"
            options={timezoneOptions}
            value={timezone}
            onChange={setTimezone}
          />

          <Select
            label="Formato de Fecha"
            description="Cómo mostrar las fechas"
            options={dateFormatOptions}
            value={dateFormat}
            onChange={setDateFormat}
          />

          <Select
            label="Moneda"
            description="Moneda predeterminada para precios"
            options={currencyOptions}
            value={currency}
            onChange={setCurrency}
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Configuración de Notificaciones</h3>
            <p className="text-sm text-muted-foreground">
              Controla qué notificaciones recibir y cómo
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {notificationSettings?.map(setting => (
            <div key={setting?.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{setting?.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">{setting?.description}</p>
              </div>
              <Checkbox
                checked={setting?.enabled}
                onChange={() => {}}
                className="ml-4"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Horario de Notificaciones</h4>
              <p className="text-sm text-muted-foreground">
                Solo recibir notificaciones durante horas laborales
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                options={[
                  { value: '09:00', label: '09:00' },
                  { value: '10:00', label: '10:00' },
                  { value: '11:00', label: '11:00' }
                ]}
                value="09:00"
                onChange={() => {}}
                className="w-24"
              />
              <span className="text-muted-foreground">a</span>
              <Select
                options={[
                  { value: '17:00', label: '17:00' },
                  { value: '18:00', label: '18:00' },
                  { value: '19:00', label: '19:00' }
                ]}
                value="18:00"
                onChange={() => {}}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Workflow Automation */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Automatización de Flujo de Trabajo</h3>
            <p className="text-sm text-muted-foreground">
              Configura automatizaciones para mejorar tu productividad
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {workflowSettings?.map(setting => (
            <div key={setting?.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{setting?.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">{setting?.description}</p>
              </div>
              <Checkbox
                checked={setting?.enabled}
                onChange={() => {}}
                className="ml-4"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Performance Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Gauge" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Configuración de Rendimiento</h3>
            <p className="text-sm text-muted-foreground">
              Optimiza el rendimiento según tus necesidades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Precarga de Imágenes</h4>
                <p className="text-sm text-muted-foreground">Cargar imágenes antes de mostrarlas</p>
              </div>
              <Checkbox checked onChange={() => {}} />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Caché de Plantillas</h4>
                <p className="text-sm text-muted-foreground">Guardar plantillas en memoria local</p>
              </div>
              <Checkbox checked onChange={() => {}} />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Compresión de Datos</h4>
                <p className="text-sm text-muted-foreground">Reducir el uso de ancho de banda</p>
              </div>
              <Checkbox onChange={() => {}} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-3">Límites de Recursos</h4>
              <div className="space-y-3">
                <Select
                  label="Calidad de Imágenes"
                  options={[
                    { value: 'high', label: 'Alta (Mejor calidad)' },
                    { value: 'medium', label: 'Media (Balanceado)' },
                    { value: 'low', label: 'Baja (Más rápido)' }
                  ]}
                  value="medium"
                  onChange={() => {}}
                />

                <Select
                  label="Elementos por Página"
                  options={[
                    { value: '10', label: '10 elementos' },
                    { value: '25', label: '25 elementos' },
                    { value: '50', label: '50 elementos' },
                    { value: '100', label: '100 elementos' }
                  ]}
                  value="25"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Limpiar Caché</h4>
            <p className="text-sm text-muted-foreground">
              Eliminar archivos temporales y datos en caché
            </p>
          </div>
          <Button variant="outline" iconName="Trash2" iconPosition="left">
            Limpiar Caché
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemPreferences;