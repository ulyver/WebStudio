import React from 'react';
import { Link } from 'react-router-dom'; // Para el botón de "Volver"

const ClientForm = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Crear Nuevo Cliente
      </h1>

      {/* Aquí irá nuestro formulario en el futuro */}
      <div style={{ border: '1px dashed #ccc', padding: '2rem', textAlign: 'center', color: '#666' }}>
        <p>Próximamente: Formulario para añadir los detalles del cliente.</p>
      </div>

      <Link 
        to="/client-management" 
        style={{ 
          display: 'inline-block', 
          marginTop: '1.5rem', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#666', 
          color: 'white', 
          borderRadius: '0.25rem',
          textDecoration: 'none'
        }}
      >
        Volver a la Lista de Clientes
      </Link>
    </div>
  );
};

export default ClientForm;