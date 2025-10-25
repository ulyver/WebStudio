import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AddProjectModal = ({ isOpen, onClose, onSave, clientId }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!projectName.trim()) {
      alert('El nombre del proyecto es obligatorio.');
      return;
    }
    onSave({
      name: projectName,
      description: projectDescription,
      client_id: clientId,
      status: 'pending',
    });
    setProjectName('');
    setProjectDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-lg m-4">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Crear Nuevo Proyecto</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-muted-foreground mb-1">
              Nombre del Proyecto <span className="text-red-500">*</span>
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Ej: Sitio Web Corporativo"
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-muted-foreground mb-1">
              Descripción (Opcional)
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows="3"
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Una breve descripción del alcance del proyecto."
            />
          </div>
        </div>
        <div className="flex justify-end items-center p-4 bg-muted/50 border-t border-border rounded-b-lg space-x-3">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} iconName="Plus" iconPosition="left">
            Guardar Proyecto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;