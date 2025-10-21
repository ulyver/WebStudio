import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ isOpen, onClose, onRestoreVersion }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);

  const versionHistory = [
    {
      id: 1,
      version: "v1.3",
      timestamp: new Date(Date.now() - 300000),
      author: "Usuario",
      changes: "Actualización de imágenes de galería y texto principal",
      isCurrent: true
    },
    {
      id: 2,
      version: "v1.2",
      timestamp: new Date(Date.now() - 1800000),
      author: "Usuario",
      changes: "Modificación de colores y tipografía"
    },
    {
      id: 3,
      version: "v1.1",
      timestamp: new Date(Date.now() - 3600000),
      author: "Usuario",
      changes: "Ajustes en la información de contacto"
    },
    {
      id: 4,
      version: "v1.0",
      timestamp: new Date(Date.now() - 7200000),
      author: "IA Generator",
      changes: "Versión inicial generada por IA"
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `hace ${minutes} minutos`;
    } else if (hours < 24) {
      return `hace ${hours} horas`;
    } else {
      return timestamp?.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const handleRestore = (version) => {
    if (onRestoreVersion) {
      onRestoreVersion(version);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Historial de Versiones</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona y restaura versiones anteriores de tu plantilla
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Version List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {versionHistory?.map((version) => (
              <div
                key={version?.id}
                className={`border rounded-lg p-4 transition-smooth cursor-pointer ${
                  selectedVersion?.id === version?.id
                    ? 'border-primary bg-primary/5'
                    : version?.isCurrent
                    ? 'border-success bg-success/5' :'border-border hover:border-muted-foreground'
                }`}
                onClick={() => setSelectedVersion(version)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground">{version?.version}</h3>
                      {version?.isCurrent && (
                        <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded">
                          Actual
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        por {version?.author}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {version?.changes}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimestamp(version?.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{version?.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!version?.isCurrent && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Eye"
                          onClick={(e) => {
                            e?.stopPropagation();
                            // Preview version logic
                          }}
                        >
                          Vista Previa
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="RotateCcw"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleRestore(version);
                          }}
                        >
                          Restaurar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedVersion ? (
                <span>Versión seleccionada: {selectedVersion?.version}</span>
              ) : (
                <span>Selecciona una versión para ver las opciones</span>
              )}
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              {selectedVersion && !selectedVersion?.isCurrent && (
                <Button
                  variant="default"
                  iconName="RotateCcw"
                  onClick={() => handleRestore(selectedVersion)}
                >
                  Restaurar Versión
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;