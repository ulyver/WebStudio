// src/context/ClientContext.jsx (la versión con Local Storage)

import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  
  const [currentClient, setCurrentClient] = useState(() => {
    const savedClientId = localStorage.getItem('selectedClientId');
    return savedClientId ? { id: savedClientId } : null; 
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase.from('clients').select('*').order('name');
        if (error) throw error;
        setClients(data);

        const savedClientId = localStorage.getItem('selectedClientId');
        if (savedClientId) {
          const fullClientObject = data.find(client => client.id === savedClientId);
          if (fullClientObject) {
            setCurrentClient(fullClientObject);
          }
        }
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (currentClient && currentClient.id) {
      localStorage.setItem('selectedClientId', currentClient.id);
    } else {
      localStorage.removeItem('selectedClientId');
    }
  }, [currentClient]);

  const value = { clients, setClients, currentClient, setCurrentClient };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};