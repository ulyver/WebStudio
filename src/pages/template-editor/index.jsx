import React, { useState, useEffect } from 'react';
// --- NUEVO: Importamos los hooks para leer parámetros de la URL y navegar ---
import { useParams, useNavigate } from 'react-router-dom';
// --- NUEVO: Importamos supabase para cargar los datos del proyecto ---
import { supabase } from '../../supabaseClient'; 

import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TemplateEditor = () => {
  const navigate = useNavigate();
  // --- NUEVO: useParams() nos da los parámetros de la URL.
  // Lo llamamos 'projectId' porque así lo nombramos en Routes.jsx -> /:projectId
  const { projectId } = useParams();

  // --- NUEVO: Estados para guardar la información del proyecto y el estado de carga ---
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NUEVO: useEffect que se ejecuta cuando el componente carga o el projectId cambia ---
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        setIsLoading(false);
        setError('No se ha proporcionado un ID de proyecto.');
        return;
      }

      // Hacemos la llamada a Supabase para traer el proyecto específico
      const { data, error } = await supabase
        .from('projects')
        .select('*') // Podríamos especificar columnas, ej: 'name, description'
        .eq('id', projectId)
        .single(); // .single() nos asegura que solo esperamos un resultado

      if (error) {
        console.error('Error fetching project details:', error);
        setError('No se pudo encontrar el proyecto.');
        setProject(null);
      } else {
        setProject(data);
        setError(null);
      }
      setIsLoading(false);
    };

    fetchProjectDetails();
  }, [projectId]); // Este hook depende del projectId de la URL

  // --- RENDERIZADO CONDICIONAL ---

  // Mientras carga, mostramos un mensaje
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto text-primary mb-4" size={48} />
          <p className="text-muted-foreground">Cargando editor...</p>
        </div>
      </div>
    );
  }

  // Si hubo un error, lo mostramos
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-card p-12 rounded-lg shadow-modal border border-destructive/20">
          <Icon name="AlertTriangle" className="mx-auto text-destructive mb-4" size={48} />
          <h2 className="text-2xl font-bold text-foreground mb-2">Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate('/client-management')}>
            Volver a la Gestión de Clientes
          </Button>
        </div>
      </div>
    );
  }

  // Si todo fue bien, mostramos el editor
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Editor de Plantillas</h1>
            {/* --- CONFIRMACIÓN VISUAL --- */}
            {/* Ahora mostramos el nombre del proyecto que cargamos desde Supabase */}
            <p className="text-muted-foreground mt-2">
              Editando el proyecto: <span className="font-semibold text-primary">{project?.name}</span>
            </p>
          </div>

          {/* Aquí es donde irá tu editor visual en el futuro */}
          <div className="bg-card border border-border rounded-lg h-[60vh] flex items-center justify-center">
            <p className="text-muted-foreground">El editor visual para "{project?.name}" irá aquí.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateEditor;