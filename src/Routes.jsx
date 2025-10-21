import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Settings from './pages/settings';
import TemplateEditor from './pages/template-editor';
import ContentPublishing from './pages/content-publishing';
import SocialMediaIntegration from './pages/social-media-integration';
import ClientManagement from './pages/client-management';
import ProjectDetails from './pages/project-details';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Todas tus rutas deben estar aquí */}
          <Route path="/" element={<ClientManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/template-editor" element={<TemplateEditor />} />
          <Route path="/content-publishing" element={<ContentPublishing />} />
          <Route path="/social-media-integration" element={<SocialMediaIntegration />} />
          
          {/* Esta ruta es redundante, puedes quitarla si quieres, ya que la ruta "/" hace lo mismo */}
          <Route path="/client-management" element={<ClientManagement />} /> 
          
          <Route path="/project-details" element={<ProjectDetails />} />

          {/* Esta es la ruta para la página 404, muy importante */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;