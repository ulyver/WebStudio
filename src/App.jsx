// src/App.jsx

import React from 'react';
import Routes from './Routes';
import { ClientProvider } from './context/ClientContext';
import AuthListener from './components/AuthListener'; 

function App() {
  return (
    <ClientProvider>
      <AuthListener />
      <Routes />
    </ClientProvider>
  );
}

export default App;