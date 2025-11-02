// src/components/AuthListener.jsx

import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useClient } from '../context/ClientContext'; 

const AuthListener = () => {
  // --- CAMBIO: Añadimos 'clients' para saber cuándo la lista está lista ---
  const { currentClient, clients } = useClient(); 

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // --- NUEVA CONDICIÓN ---
      // Solo actuar si el evento es SIGNED_IN Y tenemos un token.
      // A veces onAuthStateChange se dispara con sesiones parciales al inicio.
      if (event === 'SIGNED_IN' && session?.provider_token) {
        
        // --- NUEVA CONDICIÓN DE PACIENCIA ---
        // Si la lista de clientes aún no se ha cargado, no hacemos nada.
        // La lista vacía indica que el context todavía no ha ido a Supabase.
        if (clients.length === 0) {
            console.log("Auth event fired, but clients are not loaded yet. Waiting...");
            return;
        }

        if (!currentClient) {
          alert("Login exitoso, pero no había un cliente seleccionado. Por favor, selecciona un cliente y vuelve a conectar.");
          return;
        }
        
        const provider = session.user.app_metadata.provider;
        const accessToken = session.provider_token;
        const accountId = session.user.id;
        const accountName = session.user.user_metadata.name || session.user.email;

        try {
          // --- NUEVA LÓGICA: Evitar duplicados (UPSERT) ---
          // 'upsert' intenta actualizar si encuentra un registro que coincida, 
          // o lo inserta si no existe.
          const { error } = await supabase
            .from('social_connections') 
            .upsert({
              client_id: currentClient.id,
              platform: provider, // La plataforma (ej. 'facebook')
              access_token: accessToken,
              account_id: accountId,
              account_name: accountName,
              status: 'connected'
            }, { 
              onConflict: 'client_id, platform' // Le decimos a Supabase: "Si ya existe una conexión para este cliente y esta plataforma, actualízala".
            });

          if (error) throw error;
          
          alert(`¡Cuenta de ${provider} actualizada/conectada exitosamente para ${currentClient.name}!`);
          window.location.reload(); 

        } catch (error) {
          console.error("Error guardando la conexión social:", error.message);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  // --- CAMBIO: El efecto ahora depende de 'currentClient' Y 'clients' ---
  }, [currentClient, clients]); 

  return null;
};

export default AuthListener;