import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectHeader = ({ project, client, onEditProject, onViewClient }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'En Progreso':
        return 'text-warning bg-warning/10';
      case 'Completado':
        return 'text-success bg-success/10';
      case 'En Revisión':
        return 'text-primary bg-primary/10';
      case 'Pausado':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'text-error bg-error/10';
      case 'Media':
        return 'text-warning bg-warning/10';
      case 'Baja':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">{project?.name}</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project?.status)}`}>
              {project?.status}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project?.priority)}`}>
              Prioridad {project?.priority}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <button
              onClick={onViewClient}
              className="flex items-center gap-2 hover:text-foreground transition-smooth"
            >
              <Icon name="Building2" size={16} />
              <span>{client?.name}</span>
            </button>
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span>Creado: {project?.createdDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>Entrega: {project?.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Globe" size={16} />
              <span>{project?.websiteType}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="Edit3"
            iconPosition="left"
            onClick={onEditProject}
          >
            Editar Proyecto
          </Button>
          <Button
            variant="default"
            iconName="ExternalLink"
            iconPosition="left"
          >
            Ver Sitio Web
          </Button>
        </div>
      </div>
      {project?.description && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-muted-foreground">{project?.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;