import React, { useState, useRef, useEffect } from 'react';
import { useClient } from '../../context/ClientContext'; // Asumo que la ruta es correcta
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // --- NUEVO: Importamos supabase
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ activeProject = null, onProjectSelect }) => {
  const { clients, currentClient, setCurrentClient } = useClient();
  const navigate = useNavigate();
  const location = useLocation(); // Añadimos useLocation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const clientDropdownRef = useRef(null);
  const moreMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Clientes', path: '/client-management', icon: 'Users' },
    { label: 'Proyectos', path: '/project-details', icon: 'FolderOpen' },
    { label: 'Editor', path: '/template-editor', icon: 'Edit3', isSmart: true }, // --- NUEVO: Marcamos la ruta del editor
    { label: 'Publicar', path: '/content-publishing', icon: 'Upload' }
  ];

  const secondaryItems = [
    { label: 'Redes Sociales', path: '/social-media-integration', icon: 'Share2' },
    { label: 'Configuración', path: '/settings', icon: 'Settings' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target)) { setIsClientDropdownOpen(false); }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) { setIsMoreMenuOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- LÓGICA INTELIGENTE DE NAVEGACIÓN ---
  const handleNavigation = async (item) => {
    // Si es la ruta del editor, aplicamos la lógica especial
    if (item.isSmart && item.path === '/template-editor') {
      if (!currentClient) {
        // Si no hay cliente, lo mandamos a la página de clientes
        alert('Por favor, selecciona un cliente primero.');
        navigate('/client-management');
        return;
      }
      
      // Si hay cliente, buscamos su primer proyecto en Supabase
      const { data: projects, error } = await supabase
        .from('projects')
        .select('id')
        .eq('client_id', currentClient.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error || !projects || projects.length === 0) {
        alert('Este cliente no tiene proyectos. Por favor, crea uno primero.');
        // Lo llevamos a la página de proyectos del cliente para que pueda crear uno
        navigate('/project-details');
      } else {
        // Si encontramos un proyecto, navegamos al editor con su ID
        const firstProjectId = projects[0].id;
        navigate(`/template-editor/${firstProjectId}`);
      }
    } else {
      // Para cualquier otro enlace, navegamos normalmente
      navigate(item.path);
    }
    
    // Cerramos los menús móviles
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const handleClientSelect = (client) => {
    setCurrentClient(client);
    setIsClientDropdownOpen(false);
  };

  const isActivePath = (path) => {
    // Hacemos que la pestaña "Editor" se active aunque tenga un ID
    if (path === '/template-editor') {
      return location.pathname.startsWith('/template-editor');
    }
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><Icon name="Code2" size={20} color="white" /></div>
      <span className="text-xl font-semibold text-foreground">WebStudio Pro</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-shrink-0"><Logo /></div>

        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item)} // Pasamos el 'item' completo
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath(item.path) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.tooltip}
            ><Icon name={item.icon} size={16} /><span>{item.label}</span></button>
          ))}
          <div className="relative" ref={moreMenuRef}>
            <button onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Icon name="MoreHorizontal" size={16} /><span>Más</span>
            </button>
            {isMoreMenuOpen && (<div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-lg z-10"><div className="py-1">{secondaryItems.map((item) => (<button key={item.path} onClick={() => handleNavigation(item)} className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${isActivePath(item.path) ? 'bg-accent text-accent-foreground' : 'text-popover-foreground hover:bg-muted'}`} title={item.tooltip}><Icon name={item.icon} size={16} /><span>{item.label}</span></button>))}</div></div>)}
          </div>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative" ref={clientDropdownRef}>
            <button onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)} className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Building2" size={16} /><span>{currentClient ? currentClient.name : 'Sin cliente'}</span><Icon name="ChevronDown" size={14} />
            </button>
            {isClientDropdownOpen && (<div className="absolute top-full right-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-10"><div className="py-1"><div className="px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">Seleccionar Cliente</div>{clients?.map((client) => (<button key={client.id} onClick={() => handleClientSelect(client)} className="w-full flex items-center justify-between px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"><div className="flex flex-col items-start"><span className="font-medium">{client.name}</span><span className="text-xs text-muted-foreground">{client.businessType}</span></div>{currentClient?.id === client.id && (<Icon name="Check" size={16} className="text-success" />)}</button>))}</div></div>)}
          </div>
          {activeProject && (<div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-md text-sm font-medium"><div className="w-2 h-2 bg-success rounded-full"></div><span>{activeProject.name}</span></div>)}
        </div>

        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (<div className="lg:hidden fixed inset-0 top-16 bg-background z-40"><div className="flex flex-col p-6 space-y-4"><div className="pb-4 border-b border-border"><div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2"><Icon name="Building2" size={16} /><span>Cliente Actual</span></div><div className="text-base font-medium">{currentClient ? currentClient.name : 'Sin cliente seleccionado'}</div></div><div className="space-y-2">{[...navigationItems, ...secondaryItems].map((item) => (<button key={item.path} onClick={() => handleNavigation(item)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors ${isActivePath(item.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}><Icon name={item.icon} size={20} /><div className="flex flex-col"><span className="font-medium">{item.label}</span><span className="text-xs opacity-75">{item.tooltip}</span></div></button>))}</div></div></div>)}
    </header>
  );
};

export default Header;