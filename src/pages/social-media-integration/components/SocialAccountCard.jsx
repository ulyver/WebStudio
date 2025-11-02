import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialAccountCard = ({ account, onConnect, onDisconnect, onConfigure }) => {
  const [isConfiguring, setIsConfiguring] = useState(false);

  // --- NUEVA LÓGICA DE AUTENTICACIÓN ---
  const handleFacebookConnect = () => {
    // Leemos el Client ID desde el fichero .env
    const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;
    
    // La URL a la que Facebook debe devolver al usuario. ¡DEBE COINCIDIR EXACTAMENTE con la que pusiste en el panel de Facebook!
    const REDIRECT_URI = 'http://localhost:4028/social-callback/facebook'; 
    
    // Los permisos que solicitamos. Añade aquí los que configuraste en el panel.
    const SCOPES = 'pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_manage_insights';

    // Verificamos que el Client ID esté configurado antes de redirigir
    if (!FACEBOOK_CLIENT_ID) {
      alert("Error: El Client ID de Facebook no está configurado en el fichero .env");
      return;
    }

    // Construimos la URL de autorización
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code`;

    // Redirigimos al usuario a la página de login de Facebook
    window.location.href = authUrl;
  };
  // --- FIN DE LA NUEVA LÓGICA ---

  const getPlatformIcon = (platform) => {
    const icons = { facebook: 'Facebook', instagram: 'Instagram', twitter: 'Twitter', linkedin: 'Linkedin', youtube: 'Youtube', tiktok: 'Music' };
    return icons[platform] || 'Globe';
  };

  const getPlatformColor = (platform) => {
    const colors = { facebook: '#1877F2', instagram: '#E4405F', twitter: '#1DA1F2', linkedin: '#0A66C2', youtube: '#FF0000', tiktok: '#000000' };
    return colors[platform] || 'var(--color-primary)';
  };

  const handleConfigure = () => {
    setIsConfiguring(true);
    if (onConfigure) {
      onConfigure(account);
    }
    setTimeout(() => setIsConfiguring(false), 1000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: getPlatformColor(account?.platform) }}>
            <Icon name={getPlatformIcon(account?.platform)} size={24} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground capitalize">{account?.platform}</h3>
            <p className="text-sm text-muted-foreground">{account?.username || 'No conectado'}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${account?.connected ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
          {account?.connected ? 'Conectado' : 'Desconectado'}
        </div>
      </div>

      {account?.connected && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Seguidores:</span><span className="font-medium">{account?.followers?.toLocaleString() || '0'}</span></div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Publicaciones automáticas:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${account?.autoPosting ? 'bg-success' : 'bg-muted-foreground'}`}></div>
              <span className="text-xs">{account?.autoPosting ? 'Activo' : 'Inactivo'}</span>
            </div>
          </div>
          {account?.lastPost && (<div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Última publicación:</span><span className="text-xs">{account?.lastPost}</span></div>)}
        </div>
      )}

      <div className="flex space-x-2">
        {account?.connected ? (
          <>
            <Button variant="outline" size="sm" onClick={handleConfigure} loading={isConfiguring} iconName="Settings" iconPosition="left" className="flex-1">Configurar</Button>
            <Button variant="destructive" size="sm" onClick={() => onDisconnect(account)} iconName="Unlink" iconPosition="left" className="flex-1">Desconectar</Button>
          </>
        ) : (
          // --- ESTE ES EL CAMBIO PRINCIPAL ---
          // Solo aplicamos la nueva lógica si la plataforma es Facebook.
          // Para otras plataformas, mantenemos el comportamiento anterior por ahora.
          <>
            {account?.platform === 'facebook' ? (
              <Button
                variant="default"
                size="sm"
                onClick={handleFacebookConnect} // Llamamos a nuestra nueva función
                iconName="Link"
                iconPosition="left"
                fullWidth
              >
                Conectar Cuenta
              </Button>
            ) : (
              // Botón genérico para otras plataformas
              <Button
                variant="default"
                size="sm"
                onClick={() => onConnect(account)}
                iconName="Link"
                iconPosition="left"
                fullWidth
                disabled // Deshabilitado hasta que implementemos su lógica
              >
                Conectar (Próximamente)
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SocialAccountCard;