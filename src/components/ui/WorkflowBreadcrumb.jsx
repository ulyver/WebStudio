import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowBreadcrumb = ({ currentClient = null, activeProject = null, workflowState = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const workflowSteps = [
    {
      id: 'client',
      label: 'Cliente',
      path: '/client-management',
      icon: 'Users',
      condition: () => currentClient
    },
    {
      id: 'project',
      label: 'Proyecto',
      path: '/project-details',
      icon: 'FolderOpen',
      condition: () => currentClient && activeProject
    },
    {
      id: 'template',
      label: 'Plantilla',
      path: '/template-editor',
      icon: 'Edit3',
      condition: () => location?.pathname === '/template-editor' || location?.pathname === '/content-publishing'
    },
    {
      id: 'publish',
      label: 'Publicar',
      path: '/content-publishing',
      icon: 'Upload',
      condition: () => location?.pathname === '/content-publishing'
    }
  ];

  const activeSteps = workflowSteps?.filter(step => step?.condition());
  
  if (activeSteps?.length <= 1) {
    return null;
  }

  const handleStepClick = (step) => {
    navigate(step?.path);
  };

  const isCurrentStep = (stepPath) => {
    return location?.pathname === stepPath;
  };

  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="px-6 py-3">
        <nav className="flex items-center space-x-2 overflow-x-auto">
          {activeSteps?.map((step, index) => (
            <React.Fragment key={step?.id}>
              <button
                onClick={() => handleStepClick(step)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                  isCurrentStep(step?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
              >
                <Icon name={step?.icon} size={14} />
                <span>{step?.label}</span>
                {step?.id === 'client' && currentClient && (
                  <span className="text-xs opacity-75">({currentClient?.name})</span>
                )}
                {step?.id === 'project' && activeProject && (
                  <span className="text-xs opacity-75">({activeProject?.name})</span>
                )}
              </button>
              
              {index < activeSteps?.length - 1 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default WorkflowBreadcrumb;