// src/pages/social-media-integration/components/AddSocialAccountModal.jsx

import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Esta es la misma lógica de redirección que pusimos en SocialAccountCard
const handleFacebookConnect = () => {
  const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:4028/social-callback/facebook';
  const SCOPES = 'pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_manage_insights';

  if (!FACEBOOK_CLIENT_ID) {
    alert("Error: El Client ID de Facebook no está configurado en el fichero .env");
    return;
  }
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code`;
  window.location.href = authUrl;
};

const AddSocialAccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

 const socialPlatforms = [
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2', action: handleFacebookConnect, disabled: false },
    { name: 'Instagram', icon: 'Instagram', color: '#E4405F', action: null, disabled: true, note: 'Se conecta a través de Facebook' },
    { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2', action: null, disabled: true },
    { name: 'TikTok', icon: 'Music', color: '#000000', action: null, disabled: true },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-md m-4">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Conectar una Nueva Cuenta Social</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground mb-6 text-center">Selecciona la plataforma que deseas conectar.</p>
          <div className="space-y-3">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.name}
                onClick={platform.action}
                disabled={platform.disabled}
                fullWidth
                className="justify-start text-left"
                style={{ '--btn-bg': platform.color, '--btn-hover-bg': platform.color + 'E6' }} // Para un hover más oscuro
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3"><Icon name={platform.icon} size={20} style={{ color: platform.color }} /><span>Conectar con {platform.name}</span></div>
                  {platform.note && <span className="text-xs text-muted-foreground italic">{platform.note}</span>}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddSocialAccountModal;