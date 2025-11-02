import React from 'react';
import { supabase } from '../../../supabaseClient';
import { FaFacebook, FaLinkedin, FaTiktok, FaInstagram } from 'react-icons/fa'; // NUEVO: Iconos para que los botones se vean bien.

// =================================================================
// ELIMINADO: La antigua función 'handleFacebookConnect' ya no es necesaria.
// La nueva función 'handleSocialConnect' la reemplaza y es mucho más versátil.
// =================================================================

// NUEVO: Un objeto para asociar fácilmente un nombre a un componente de icono.
const iconMap = {
  Facebook: <FaFacebook className="mr-3 text-xl" />,
  Instagram: <FaInstagram className="mr-3 text-xl" />,
  Linkedin: <FaLinkedin className="mr-3 text-xl" />,
  Tiktok: <FaTiktok className="mr-3 text-xl" />,
};

const AddSocialAccountModal = ({ isOpen, onClose }) => {
  // NUEVO: La función centralizada para conectar CUALQUIER red social con Supabase.
  const handleSocialConnect = async (provider) => {
    try {
      // 'provider' debe ser el nombre en minúsculas que Supabase reconoce: 'facebook', 'linkedin', etc.
      const { error } = await supabase.auth.signInWithOAuth({ provider });

      if (error) {
        console.error(`Error al intentar conectar con ${provider}:`, error.message);
        alert(`Error: ${error.message}`); // Mostramos el error directamente al usuario.
      }
      // Si no hay error, Supabase maneja la redirección automáticamente. ¡No necesitamos hacer nada más!
    } catch (err) {
      console.error('Error inesperado en la conexión:', err);
    }
  };

  // Esta línea es perfecta, si el modal no está abierto, no renderiza nada.
  if (!isOpen) {
    return null;
  }

  // CAMBIO: Actualizamos este array. Ahora incluye el 'provider' exacto para Supabase.
  const socialPlatforms = [
    { name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600', hover: 'hover:bg-blue-700', provider: 'facebook' },
    { name: 'Instagram', icon: 'Instagram', color: 'bg-pink-600', hover: 'hover:bg-pink-700', provider: 'instagram' },
    { name: 'Linkedin', icon: 'Linkedin', color: 'bg-sky-600', hover: 'hover:bg-sky-700', provider: 'linkedin' },
    // OJO: Verifica en la documentación de Supabase si soportan TikTok como proveedor OAuth.
    // Si no lo soportan, puedes comentar o eliminar esta línea.
    { name: 'Tiktok', icon: 'Tiktok', color: 'bg-black', hover: 'hover:bg-gray-800', provider: 'tiktok' },
  ];

  return (
    // Tu JSX para el fondo oscuro y centrado es correcto.
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Tu cabecera del modal es correcta */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Conectar Nueva Cuenta</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
             {/* Usaremos un icono SVG simple para la 'X' para no necesitar otra librería */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Selecciona una plataforma para autenticar y conectar tu cuenta.
          </p>
          
          {/* CAMBIO TOTAL: Aquí mapeamos sobre el array y creamos botones funcionales */}
          <div className="space-y-4">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleSocialConnect(platform.provider)} // ¡LA MAGIA OCURRE AQUÍ!
                className={`w-full flex items-center justify-center py-3 px-4 text-white rounded-lg transition-colors font-semibold ${platform.color} ${platform.hover}`}
              >
                {iconMap[platform.icon]} {/* Muestra el icono correcto */}
                Conectar con {platform.name}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddSocialAccountModal;