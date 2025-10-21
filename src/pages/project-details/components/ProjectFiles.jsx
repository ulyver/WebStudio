import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFiles = ({ project }) => {
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
  { id: 'all', name: 'Todos los archivos', icon: 'FolderOpen', count: 24 },
  { id: 'designs', name: 'Diseños', icon: 'Palette', count: 8 },
  { id: 'content', name: 'Contenido', icon: 'FileText', count: 6 },
  { id: 'images', name: 'Imágenes', icon: 'Image', count: 12 },
  { id: 'documents', name: 'Documentos', icon: 'File', count: 4 },
  { id: 'presentations', name: 'Presentaciones', icon: 'Presentation', count: 2 }];


  const files = [
  {
    id: 1,
    name: 'Logo-Restaurante-El-Sabor.svg',
    type: 'image',
    folder: 'designs',
    size: '245 KB',
    modified: '2025-10-21 08:30',
    url: "https://images.unsplash.com/photo-1705909212738-b1d638cb892a",
    alt: 'Elegant restaurant logo design with golden fork and knife crossed over dark background'
  },
  {
    id: 2,
    name: 'Plantilla-Homepage-v3.figma',
    type: 'design',
    folder: 'designs',
    size: '1.2 MB',
    modified: '2025-10-20 16:45',
    url: null,
    alt: null
  },
  {
    id: 3,
    name: 'Menu-Completo-Octubre.pdf',
    type: 'document',
    folder: 'content',
    size: '890 KB',
    modified: '2025-10-19 14:20',
    url: null,
    alt: null
  },
  {
    id: 4,
    name: 'Foto-Interior-Restaurante-1.jpg',
    type: 'image',
    folder: 'images',
    size: '2.1 MB',
    modified: '2025-10-18 11:15',
    url: "https://images.unsplash.com/photo-1708430987268-22519ff418d1",
    alt: 'Cozy restaurant interior with warm lighting, wooden tables and modern decor'
  },
  {
    id: 5,
    name: 'Presentacion-Cliente-Final.pptx',
    type: 'presentation',
    folder: 'presentations',
    size: '3.4 MB',
    modified: '2025-10-17 09:30',
    url: null,
    alt: null
  },
  {
    id: 6,
    name: 'Contenido-Pagina-Nosotros.docx',
    type: 'document',
    folder: 'content',
    size: '156 KB',
    modified: '2025-10-16 13:45',
    url: null,
    alt: null
  },
  {
    id: 7,
    name: 'Galeria-Platos-Principales.zip',
    type: 'archive',
    folder: 'images',
    size: '15.2 MB',
    modified: '2025-10-15 10:20',
    url: null,
    alt: null
  },
  {
    id: 8,
    name: 'Especificaciones-Tecnicas.pdf',
    type: 'document',
    folder: 'documents',
    size: '445 KB',
    modified: '2025-10-14 16:00',
    url: null,
    alt: null
  }];


  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return 'Image';
      case 'design':
        return 'Palette';
      case 'document':
        return 'FileText';
      case 'presentation':
        return 'Presentation';
      case 'archive':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'image':
        return 'text-success';
      case 'design':
        return 'text-primary';
      case 'document':
        return 'text-warning';
      case 'presentation':
        return 'text-error';
      case 'archive':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredFiles = selectedFolder === 'all' ?
  files :
  files?.filter((file) => file?.folder === selectedFolder);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Archivos del Proyecto</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Upload"
          iconPosition="left">

          Subir Archivo
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="font-medium text-foreground mb-3">Carpetas</h3>
          <div className="space-y-1">
            {folders?.map((folder) =>
            <button
              key={folder?.id}
              onClick={() => setSelectedFolder(folder?.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth ${
              selectedFolder === folder?.id ?
              'bg-primary text-primary-foreground' :
              'hover:bg-muted text-foreground'}`
              }>

                <div className="flex items-center gap-3">
                  <Icon name={folder?.icon} size={16} />
                  <span className="text-sm font-medium">{folder?.name}</span>
                </div>
                <span className="text-xs opacity-75">{folder?.count}</span>
              </button>
            )}
          </div>
        </div>

        {/* Files List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">
              {folders?.find((f) => f?.id === selectedFolder)?.name || 'Archivos'}
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" iconName="Grid3X3" />
              <Button variant="ghost" size="sm" iconName="List" />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredFiles?.map((file) =>
            <div
              key={file?.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/30 transition-smooth">

                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {file?.url ?
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                    src={file?.url}
                    alt={file?.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }} />

                    </div> :

                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${getFileColor(file?.type)}`}>
                      <Icon name={getFileIcon(file?.type)} size={20} />
                    </div>
                }
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{file?.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{file?.size}</span>
                    <span>•</span>
                    <span>{file?.modified}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" iconName="Download" />
                  <Button variant="ghost" size="sm" iconName="Share2" />
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
              </div>
            )}
          </div>

          {filteredFiles?.length === 0 &&
          <div className="text-center py-12">
              <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">No hay archivos</h3>
              <p className="text-sm text-muted-foreground">
                Esta carpeta está vacía. Sube algunos archivos para comenzar.
              </p>
            </div>
          }
        </div>
      </div>
      {/* Storage Info */}
      <div className="border-t border-border pt-4 mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Almacenamiento usado</span>
          <span className="font-medium text-foreground">23.4 MB de 100 MB</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '23.4%' }}></div>
        </div>
      </div>
    </div>);

};

export default ProjectFiles;