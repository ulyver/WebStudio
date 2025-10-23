import React from 'react';
import Icon from '../../../components/AppIcon';

// 1. Ahora el componente recibe la lista de 'clients' como una "prop".
const ClientStats = ({ clients = [] }) => {

  // 2. Calculamos las estadísticas dinámicamente a partir de la lista de clientes.
  //    Usamos '|| 0' para asegurarnos de que si la lista está vacía, mostremos un 0.
  const totalClients = clients?.length || 0;
  
  const activeClients = clients?.filter(client => client.status === 'active')?.length || 0;
  
  const activeWebsites = clients?.filter(client => client.websiteStatus === 'live')?.length || 0;

  // Para los proyectos, sumamos el total de proyectos activos de todos los clientes.
  const activeProjects = clients?.reduce((total, client) => total + (client.activeProjects || 0), 0) || 0;

  // 3. Creamos un array con los datos calculados para renderizarlo de forma limpia.
  const stats = [
    {
      label: 'Total Clientes',
      value: totalClients,
      icon: 'Users',
      color: 'text-primary'
    },
    {
      label: 'Clientes Activos',
      value: activeClients,
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      label: 'Sitios Web Activos',
      value: activeWebsites,
      icon: 'Globe',
      color: 'text-info' // Asumiendo que tienes un color 'info'
    },
    {
      label: 'Proyectos Activos',
      value: activeProjects,
      icon: 'FolderKanban',
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card p-6 rounded-lg border border-border flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
            <Icon name={stat.icon} size={24} className={stat.color} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientStats;