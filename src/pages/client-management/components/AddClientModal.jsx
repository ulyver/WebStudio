import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddClientModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessType: '',
    email: '',
    phone: '',
    address: '',
    subscription: 'basic',
    website: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre del negocio es requerido';
    }
    
    if (!formData?.businessType?.trim()) {
      newErrors.businessType = 'El tipo de negocio es requerido';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const newClient = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        activeProjects: 0,
        completedProjects: 0,
        websiteStatus: 'development',
        socialConnected: false,
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
        logoAlt: `Logo del negocio ${formData?.name}`,
        createdAt: new Date()?.toISOString(),
        projects: [],
        socialAccounts: [],
        communications: []
      };
      
      onSave(newClient);
      
      // Reset form
      setFormData({
        name: '',
        businessType: '',
        email: '',
        phone: '',
        address: '',
        subscription: 'basic',
        website: '',
        notes: ''
      });
      setErrors({});
    }
  };

  const businessTypes = [
    'Restaurante',
    'Comercio Minorista',
    'Servicios Profesionales',
    'Taller Mecánico',
    'Panadería',
    'Pastelería',
    'Peluquería',
    'Gimnasio',
    'Consultorio Médico',
    'Otro'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Agregar Nuevo Cliente</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre del Negocio"
                required
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                placeholder="Ej: Restaurante El Sabor"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Negocio *
                </label>
                <select
                  value={formData?.businessType}
                  onChange={(e) => handleInputChange('businessType', e?.target?.value)}
                  className={`w-full px-3 py-2 bg-input border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors?.businessType ? 'border-destructive' : 'border-border'
                  }`}
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  {businessTypes?.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors?.businessType && (
                  <p className="mt-1 text-sm text-destructive">{errors?.businessType}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                required
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                placeholder="contacto@negocio.com"
              />

              <Input
                label="Teléfono"
                required
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                placeholder="+34 123 456 789"
              />
            </div>

            <Input
              label="Dirección"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              placeholder="Calle Principal 123, Ciudad"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Sitio Web (opcional)"
                type="url"
                value={formData?.website}
                onChange={(e) => handleInputChange('website', e?.target?.value)}
                placeholder="https://www.negocio.com"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Plan de Suscripción
                </label>
                <select
                  value={formData?.subscription}
                  onChange={(e) => handleInputChange('subscription', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="basic">Básico</option>
                  <option value="standard">Estándar</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Información adicional sobre el cliente..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" iconName="Plus" iconPosition="left">
              Agregar Cliente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;