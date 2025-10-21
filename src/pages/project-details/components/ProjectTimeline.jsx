import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTimeline = ({ project }) => {
  const timelineEvents = [
    {
      id: 1,
      type: 'created',
      title: 'Proyecto Creado',
      description: 'Proyecto iniciado con especificaciones del cliente',
      date: '2025-10-15',
      time: '09:00',
      user: 'Sistema',
      icon: 'Plus',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Planificación Completada',
      description: 'Análisis de requisitos y arquitectura definida',
      date: '2025-10-15',
      time: '14:30',
      user: 'Desarrollador',
      icon: 'CheckCircle2',
      color: 'text-success'
    },
    {
      id: 3,
      type: 'update',
      title: 'Plantillas Generadas',
      description: 'IA generó 3 plantillas iniciales para el restaurante',
      date: '2025-10-16',
      time: '10:15',
      user: 'IA Assistant',
      icon: 'Sparkles',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'communication',
      title: 'Feedback del Cliente',
      description: 'Cliente revisó diseños y solicitó modificaciones',
      date: '2025-10-18',
      time: '16:20',
      user: 'María González',
      icon: 'MessageCircle',
      color: 'text-secondary'
    },
    {
      id: 5,
      type: 'update',
      title: 'Diseño Actualizado',
      description: 'Implementados cambios solicitados por el cliente',
      date: '2025-10-19',
      time: '11:45',
      user: 'Desarrollador',
      icon: 'Edit3',
      color: 'text-primary'
    },
    {
      id: 6,
      type: 'milestone',
      title: 'Contenido Aprobado',
      description: 'Cliente aprobó el diseño final y contenido',
      date: '2025-10-20',
      time: '13:30',
      user: 'María González',
      icon: 'ThumbsUp',
      color: 'text-success'
    },
    {
      id: 7,
      type: 'in-progress',
      title: 'Desarrollo en Curso',
      description: 'Implementación técnica del sitio web (75% completado)',
      date: '2025-10-21',
      time: '08:00',
      user: 'Desarrollador',
      icon: 'Code2',
      color: 'text-warning'
    }
  ];

  const upcomingMilestones = [
    {
      id: 1,
      title: 'Pruebas de Funcionalidad',
      description: 'Testing completo del sitio web',
      dueDate: '2025-10-23',
      priority: 'Alta'
    },
    {
      id: 2,
      title: 'Configuración de Hosting',
      description: 'Despliegue en servidor de producción',
      dueDate: '2025-10-25',
      priority: 'Alta'
    },
    {
      id: 3,
      title: 'Entrega Final',
      description: 'Presentación final al cliente',
      dueDate: '2025-10-28',
      priority: 'Crítica'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Crítica':
        return 'text-error bg-error/10';
      case 'Alta':
        return 'text-warning bg-warning/10';
      case 'Media':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-6">Cronología del Proyecto</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Events */}
        <div className="lg:col-span-2">
          <h3 className="font-medium text-foreground mb-4">Historial de Eventos</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {timelineEvents?.map((event, index) => (
                <div key={event?.id} className="relative flex gap-4">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center ${event?.color}`}>
                    <Icon name={event?.icon} size={18} />
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{event?.title}</h4>
                      <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {event?.date} • {event?.time}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="User" size={12} />
                      <span>{event?.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="lg:col-span-1">
          <h3 className="font-medium text-foreground mb-4">Próximos Hitos</h3>
          <div className="space-y-4">
            {upcomingMilestones?.map((milestone) => (
              <div key={milestone?.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{milestone?.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(milestone?.priority)}`}>
                    {milestone?.priority}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{milestone?.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Calendar" size={12} />
                  <span>Vence: {milestone?.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Project Stats */}
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-medium text-foreground mb-3">Estadísticas</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Días transcurridos</span>
                <span className="font-medium text-foreground">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Días restantes</span>
                <span className="font-medium text-foreground">7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hitos completados</span>
                <span className="font-medium text-foreground">3 de 6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Comunicaciones</span>
                <span className="font-medium text-foreground">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;