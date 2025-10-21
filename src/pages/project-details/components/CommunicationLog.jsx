import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationLog = ({ project }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showAddMessage, setShowAddMessage] = useState(false);

  const communications = [
    {
      id: 1,
      type: 'email',
      sender: 'Cliente',
      senderName: 'María González',
      subject: 'Revisión del diseño inicial',
      message: `Hola,\n\nHe revisado el diseño inicial del sitio web y me parece muy bueno. Solo tengo algunas sugerencias:\n\n1. Me gustaría cambiar el color principal a un azul más oscuro\n2. La sección de menú podría tener más espacio\n3. ¿Podríamos añadir una galería de fotos de nuestros platos?\n\nGracias por el excelente trabajo.`,
      timestamp: '2025-10-20 14:30',
      status: 'read',
      attachments: []
    },
    {
      id: 2,
      type: 'note',
      sender: 'Desarrollador',
      senderName: 'Tú',
      subject: 'Nota interna - Cambios solicitados',
      message: `Cambios solicitados por el cliente:\n- Modificar paleta de colores (azul más oscuro)\n- Ajustar espaciado del menú\n- Implementar galería de imágenes\n\nEstimado: 4-6 horas de trabajo adicional`,
      timestamp: '2025-10-20 15:45',
      status: 'internal',
      attachments: []
    },
    {
      id: 3,
      type: 'email',
      sender: 'Desarrollador',
      senderName: 'Tú',
      subject: 'Re: Revisión del diseño inicial',
      message: `Hola María,\n\nGracias por tu feedback. He tomado nota de todos los cambios solicitados:\n\n✓ Color principal actualizado a azul oscuro\n✓ Espaciado del menú mejorado\n✓ Galería de fotos implementada\n\nPuedes revisar los cambios en el enlace de vista previa. Espero tu confirmación para proceder con la siguiente fase.`,
      timestamp: '2025-10-21 09:15',
      status: 'sent',
      attachments: [
        { name: 'vista-previa-v2.pdf', size: '2.3 MB' }
      ]
    },
    {
      id: 4,
      type: 'approval',
      sender: 'Cliente',
      senderName: 'María González',
      subject: 'Aprobación de cambios',
      message: 'Perfecto! Los cambios se ven excelentes. Aprobado para continuar con la siguiente fase.',
      timestamp: '2025-10-21 11:20',
      status: 'approved',
      attachments: []
    }
  ];

  const getMessageIcon = (type, status) => {
    if (type === 'email') {
      return status === 'sent' ? 'Send' : 'Mail';
    }
    if (type === 'note') return 'FileText';
    if (type === 'approval') return 'CheckCircle2';
    return 'MessageCircle';
  };

  const getMessageColor = (type, status) => {
    if (status === 'approved') return 'text-success';
    if (status === 'internal') return 'text-warning';
    if (type === 'email' && status === 'sent') return 'text-primary';
    return 'text-muted-foreground';
  };

  const handleAddMessage = () => {
    if (newMessage?.trim()) {
      // Aquí se añadiría la lógica para guardar el mensaje
      setNewMessage('');
      setShowAddMessage(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Comunicación con Cliente</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddMessage(!showAddMessage)}
        >
          Nueva Nota
        </Button>
      </div>
      {/* Add Message Form */}
      {showAddMessage && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
          <Input
            label="Nueva comunicación"
            type="text"
            placeholder="Escribe una nota o mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e?.target?.value)}
            className="mb-3"
          />
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleAddMessage}
            >
              Guardar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddMessage(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {/* Communications List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {communications?.map((comm) => (
          <div key={comm?.id} className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-smooth">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getMessageColor(comm?.type, comm?.status)}`}>
                <Icon name={getMessageIcon(comm?.type, comm?.status)} size={18} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{comm?.subject}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{comm?.senderName}</span>
                    <span>•</span>
                    <span>{comm?.timestamp}</span>
                    {comm?.status === 'approved' && (
                      <>
                        <span>•</span>
                        <span className="text-success font-medium">Aprobado</span>
                      </>
                    )}
                  </div>
                </div>
                
                {comm?.type === 'email' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Reply"
                    iconPosition="left"
                  >
                    Responder
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-foreground whitespace-pre-line mb-3">
                {comm?.message}
              </div>
              
              {comm?.attachments?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {comm?.attachments?.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md text-sm">
                      <Icon name="Paperclip" size={14} />
                      <span>{attachment?.name}</span>
                      <span className="text-muted-foreground">({attachment?.size})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border pt-4 mt-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Mail"
            iconPosition="left"
          >
            Enviar Email
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            iconPosition="left"
          >
            Programar Llamada
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
          >
            Agendar Reunión
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            iconPosition="left"
          >
            Generar Reporte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationLog;