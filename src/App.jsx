
import React from "react";
import Routes from "./Routes";
import { ClientProvider } from "./context/ClientContext.jsx";

function App() {
  return (
    // 2. Envolvemos las Rutas con el Proveedor.
    // Ahora, cualquier página dentro de <Routes /> podrá acceder al contexto.
    <ClientProvider>
      <Routes />
    </ClientProvider>
  );
}

export default App;