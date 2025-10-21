import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientStats = ({ clients }) => {
  const stats = {
    total: clients?.length,
    active: clients?.filter(c => c?.status === 'active')?.length,
    pending: clients?.filter(c => c?.status === 'pending')?.length,
    inactive: clients?.filter(c => c?.status === 'inactive')?.length,
    withWebsite: clients?.filter(c => c?.websiteStatus === 'live')?.length,
    socialConnected: clients?.filter(c => c?.socialConnected)?.length,
    totalProjects: clients?.reduce((sum, c) => sum + c?.activeProjects + c?.completedProjects, 0),
    activeProjects: clients?.reduce((sum, c) => sum + c?.activeProjects, 0)
  };

  const statCards = [
    {
      title: 'Total Clientes',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Clientes Activos',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Sitios Web Activos',
      value: stats?.withWebsite,
      icon: 'Globe',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Redes Conectadas',
      value: stats?.socialConnected,
      icon: 'Share2',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Proyectos Activos',
      value: stats?.activeProjects,
      icon: 'FolderOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Total Proyectos',
      value: stats?.totalProjects,
      icon: 'BarChart3',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={16} className={stat?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            <div className="text-xs text-muted-foreground">{stat?.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientStats;