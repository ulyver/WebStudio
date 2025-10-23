

import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto
const ClientContext = createContext();

// 2. Creamos un "Hook" personalizado para usar el contexto fácilmente
export const useClient = () => {
  return useContext(ClientContext);
};

// 3. Creamos el "Proveedor" del Contexto. Este componente envolverá nuestra aplicación.
export const ClientProvider = ({ children }) => {
  const [currentClient, setCurrentClient] = useState(null); // Aquí vivirá el cliente seleccionado
  const [clients, setClients] = useState([]); // También podemos guardar la lista completa aquí

  const value = {
    currentClient,
    setCurrentClient,
    clients,
    setClients,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};