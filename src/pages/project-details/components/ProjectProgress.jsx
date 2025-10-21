import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectProgress = ({ project }) => {
  const phases = [
    {
      id: 'planning',
      name: 'Planificación',
      description: 'Análisis de requisitos y diseño inicial',
      status: 'completed',
      completedDate: '15/10/2025',
      progress: 100
    },
    {
      id: 'design',
      name: 'Diseño y Plantillas',
      description: 'Creación de plantillas y diseño visual',
      status: 'completed',
      completedDate: '18/10/2025',
      progress: 100
    },
    {
      id: 'development',
      name: 'Desarrollo',
      description: 'Implementación del sitio web',
      status: 'in-progress',
      completedDate: null,
      progress: 75
    },
    {
      id: 'content',
      name: 'Contenido',
      description: 'Creación y optimización de contenido',
      status: 'in-progress',
      completedDate: null,
      progress: 60
    },
    {
      id: 'testing',
      name: 'Pruebas',
      description: 'Testing y optimización',
      status: 'pending',
      completedDate: null,
      progress: 0
    },
    {
      id: 'deployment',
      name: 'Despliegue',
      description: 'Publicación y configuración final',
      status: 'pending',
      completedDate: null,
      progress: 0
    }
  ];

  const getPhaseIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle2';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getPhaseColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const overallProgress = Math.round(phases?.reduce((acc, phase) => acc + phase?.progress, 0) / phases?.length);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Progreso del Proyecto</h2>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-sm text-muted-foreground">Completado</div>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progreso General</span>
          <span className="text-sm text-muted-foreground">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
      {/* Phase List */}
      <div className="space-y-4">
        {phases?.map((phase, index) => (
          <div key={phase?.id} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Icon 
                name={getPhaseIcon(phase?.status)} 
                size={20} 
                className={getPhaseColor(phase?.status)}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground">{phase?.name}</h3>
                <span className="text-sm text-muted-foreground">{phase?.progress}%</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{phase?.description}</p>
              
              {phase?.completedDate && (
                <div className="flex items-center gap-2 text-xs text-success">
                  <Icon name="Check" size={12} />
                  <span>Completado el {phase?.completedDate}</span>
                </div>
              )}
              
              {phase?.status === 'in-progress' && (
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-warning h-2 rounded-full transition-all duration-300"
                    style={{ width: `${phase?.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;