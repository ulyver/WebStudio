// src/pages/project-details/components/ProjectProgress.jsx

import React from 'react';
import Icon from '../../../components/AppIcon';

// Función para calcular el progreso general
const calculateOverallProgress = (project) => {
  if (!project) return 0;
  const progresses = [
    project.progress_planning, project.progress_design,
    project.progress_development, project.progress_content,
    project.progress_testing, project.progress_deployment,
  ].filter(p => typeof p === 'number'); // Filtramos por si algún dato es null
  
  if (progresses.length === 0) return 0;
  const total = progresses.reduce((sum, current) => sum + current, 0);
  return Math.round(total / progresses.length);
};

const ProjectProgress = ({ project }) => {
  // --- GUARDA DE SEGURIDAD ---
  // Si no se recibe un objeto 'project', no se renderiza nada.
  // Esto evita el error cuando un cliente no tiene proyectos activos.
  if (!project) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-card text-center">
        <p className="text-muted-foreground">No hay un proyecto activo para mostrar el progreso.</p>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress(project);

  const getStatusFromProgress = (progress) => {
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'pending';
  };

  const phases = [
    { name: 'Planificación', progress: project.progress_planning || 0 },
    { name: 'Diseño y Plantillas', progress: project.progress_design || 0 },
    { name: 'Desarrollo', progress: project.progress_development || 0 },
    { name: 'Contenido', progress: project.progress_content || 0 },
    { name: 'Pruebas', progress: project.progress_testing || 0 },
    { name: 'Despliegue', progress: project.progress_deployment || 0 },
  ];

  const getPhaseIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle2';
      case 'in-progress': return 'Timer'; // Cambiado de Clock para más claridad
      default: return 'Circle';
    }
  };
  
  const getPhaseColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      default: return 'text-muted-foreground/50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Progreso del Proyecto</h3>
        <span className="text-xl font-bold text-primary">{overallProgress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 mb-6">
        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${overallProgress}%` }}></div>
      </div>
      <div className="space-y-3">
        {phases.map((phase) => {
          const status = getStatusFromProgress(phase.progress);
          return (
            <div key={phase.name} className="flex items-center space-x-3">
              <Icon name={getPhaseIcon(status)} size={20} className={getPhaseColor(status)} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-foreground">{phase.name}</p>
                  <p className={`text-sm font-medium ${status === 'completed' ? 'text-success' : 'text-muted-foreground'}`}>{phase.progress}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectProgress;