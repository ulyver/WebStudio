import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectActions = ({ project, onExportProject }) => {
  const navigate = useNavigate();

  const actionItems = [
    {
      id: 'template-editor',
      title: 'Editor de Plantillas',
      description: 'Modificar diseño y contenido del sitio web',
      icon: 'Edit3',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      path: '/template-editor'
    },
    {
      id: 'content-publishing',
      title: 'Publicar Contenido',
      description: 'Desplegar cambios y actualizar sitio web',
      icon: 'Upload',
      color: 'text-success',
      bgColor: 'bg-success/10',
      path: '/content-publishing'
    },
    {
      id: 'social-media',
      title: 'Redes Sociales',
      description: 'Gestionar integración con redes sociales',
      icon: 'Share2',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      path: '/social-media-integration'
    },
    {
      id: 'client-management',
      title: 'Gestión de Cliente',
      description: 'Ver información y comunicación del cliente',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      path: '/client-management'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-6">Acciones del Proyecto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {actionItems?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.path)}
            className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth text-left group"
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon name={action?.icon} size={20} className={action?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                {action?.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{action?.description}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
          </button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-4">Acciones Rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExportProject}
          >
            Exportar Proyecto
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            iconPosition="left"
          >
            Duplicar Proyecto
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Archive"
            iconPosition="left"
          >
            Archivar
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
          >
            Vista Previa
          </Button>
        </div>
      </div>
      {/* External Services */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="font-medium text-foreground mb-4">Servicios Externos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="ghost"
            className="justify-start"
            iconName="Server"
            iconPosition="left"
          >
            Gestionar Hosting
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            iconName="Globe"
            iconPosition="left"
          >
            Configurar Dominio
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            iconName="Mail"
            iconPosition="left"
          >
            Email Empresarial
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            iconName="Shield"
            iconPosition="left"
          >
            Certificado SSL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectActions;