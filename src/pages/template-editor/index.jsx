import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import EditorSidebar from './components/EditorSidebar';
import TemplatePreview from './components/TemplatePreview';
import VersionHistory from './components/VersionHistory';
import AIContentGenerator from './components/AIContentGenerator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TemplateEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [currentClient, setCurrentClient] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock data
  const mockClient = {
    id: 1,
    name: "Restaurante El Sabor",
    type: "Restaurante",
    email: "contacto@elsabor.com",
    phone: "+34 912 345 678"
  };

  const mockProject = {
    id: 1,
    name: "Sitio Web Principal",
    status: "in_progress",
    clientId: 1
  };

  const mockTemplate = {
    id: 1,
    name: "Plantilla Restaurante Mediterráneo",
    type: "restaurant",
    status: "draft",
    content: {
      headline: "Descubre el Sabor Auténtico en Cada Bocado",
      description: "Restaurante familiar con más de 20 años de tradición culinaria, ofreciendo los mejores platos de la cocina mediterránea con ingredientes frescos y locales.",
      body: `Bienvenidos a nuestro acogedor restaurante donde cada plato cuenta una historia de tradición y pasión por la gastronomía.\n\nNuestro chef ejecutivo, con más de 15 años de experiencia, ha creado un menú que combina recetas tradicionales con toques modernos, utilizando únicamente ingredientes de la más alta calidad.\n\nVen y disfruta de una experiencia culinaria única en un ambiente cálido y familiar.`
    },
    contact: {
      phone: "+34 912 345 678",
      email: "contacto@elsabor.com",
      address: "Calle Mayor, 45 - Madrid"
    },
    images: {
      hero: "https://images.unsplash.com/photo-1647695822638-a40e238ddc39",
      heroAlt: "Interior elegante de restaurante con mesas de madera y iluminación cálida",
      gallery: [
      {
        src: "https://images.unsplash.com/photo-1697898108745-bd718dcf41b2",
        alt: "Plato gourmet de pasta con salsa de tomate y albahaca fresca"
      },
      {
        src: "https://images.unsplash.com/photo-1669839718073-861aa4f360bc",
        alt: "Deliciosa pizza margarita recién horneada con mozzarella derretida"
      }]

    },
    style: {
      colorScheme: "modern",
      font: "inter"
    }
  };

  // Initialize data
  useEffect(() => {
    setCurrentClient(mockClient);
    setActiveProject(mockProject);
    setActiveTemplate(mockTemplate);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges]);

  // Event handlers
  const handleContentUpdate = (field, value) => {
    setActiveTemplate((prev) => ({
      ...prev,
      content: {
        ...prev?.content,
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleImageUpdate = (imageType, imageData) => {
    setActiveTemplate((prev) => ({
      ...prev,
      images: {
        ...prev?.images,
        [imageType]: imageData
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleStyleUpdate = (styleProperty, value) => {
    setActiveTemplate((prev) => ({
      ...prev,
      style: {
        ...prev?.style,
        [styleProperty]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleAutoSave = async () => {
    setIsSaving(true);
    // Simulate auto-save
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    // Simulate manual save
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
    }, 1500);
  };

  const handleGenerateContent = (type, content) => {
    if (type === 'text') {
      setActiveTemplate((prev) => ({
        ...prev,
        content: {
          ...prev?.content,
          ...content
        }
      }));
    } else if (type === 'images') {
      setActiveTemplate((prev) => ({
        ...prev,
        images: {
          ...prev?.images,
          gallery: content
        }
      }));
    }
    setHasUnsavedChanges(true);
  };

  const handleRestoreVersion = (version) => {
    // Simulate version restoration
    console.log('Restoring version:', version);
    setHasUnsavedChanges(true);
  };

  const handlePublish = () => {
    navigate('/content-publishing', {
      state: {
        template: activeTemplate,
        client: currentClient,
        project: activeProject
      }
    });
  };

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      template: activeTemplate,
      client: currentClient,
      project: activeProject,
      exportDate: new Date()?.toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${activeTemplate?.name || 'export'}-${Date.now()}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentClient={currentClient}
        activeProject={activeProject}
        onClientChange={setCurrentClient}
        onProjectSelect={setActiveProject} />

      <WorkflowBreadcrumb
        currentClient={currentClient}
        activeProject={activeProject}
        workflowState={{ currentStep: 'template' }} />

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Editor Sidebar */}
        <EditorSidebar
          activeTemplate={activeTemplate}
          onContentUpdate={handleContentUpdate}
          onImageUpdate={handleImageUpdate}
          onStyleUpdate={handleStyleUpdate}
          onGenerateContent={() => setIsAIGeneratorOpen(true)} />


        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-card border-b border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold text-foreground">
                  {activeTemplate?.name || 'Editor de Plantillas'}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {isSaving ?
                  <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span>Guardando...</span>
                    </div> :
                  hasUnsavedChanges ?
                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span>Cambios sin guardar</span>
                    </div> :

                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Guardado: {lastSaved?.toLocaleTimeString('es-ES')}</span>
                    </div>
                  }
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="History"
                  onClick={() => setIsVersionHistoryOpen(true)}>

                  Historial
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Sparkles"
                  onClick={() => setIsAIGeneratorOpen(true)}>

                  IA
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Save"
                  loading={isSaving}
                  onClick={handleManualSave}>

                  Guardar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={handleExport}>

                  Exportar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Upload"
                  onClick={handlePublish}>

                  Publicar
                </Button>
              </div>
            </div>
          </div>

          {/* Template Preview */}
          <TemplatePreview
            activeTemplate={activeTemplate}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            isLoading={false} />

        </div>
      </div>
      {/* Modals */}
      <VersionHistory
        isOpen={isVersionHistoryOpen}
        onClose={() => setIsVersionHistoryOpen(false)}
        onRestoreVersion={handleRestoreVersion} />

      <AIContentGenerator
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
        onContentGenerated={handleGenerateContent} />

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-3 shadow-modal text-xs text-muted-foreground">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="Keyboard" size={12} />
          <span className="font-medium">Atajos de teclado</span>
        </div>
        <div className="space-y-1">
          <div>Ctrl+S: Guardar</div>
          <div>Ctrl+Z: Deshacer</div>
          <div>Ctrl+Shift+P: Vista previa</div>
        </div>
      </div>
    </div>);

};

export default TemplateEditor;