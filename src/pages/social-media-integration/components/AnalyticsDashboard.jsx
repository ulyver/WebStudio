import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import MetricsChart from './MetricsChart';

const AnalyticsDashboard = ({ selectedClient }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const timeRangeOptions = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 3 meses' },
    { value: '1y', label: 'Último año' }
  ];

  const metricOptions = [
    { value: 'engagement', label: 'Engagement' },
    { value: 'reach', label: 'Alcance' },
    { value: 'impressions', label: 'Impresiones' },
    { value: 'followers', label: 'Seguidores' }
  ];

  // Mock analytics data
  const engagementData = [
    { name: 'Lun', value: 245 },
    { name: 'Mar', value: 312 },
    { name: 'Mié', value: 189 },
    { name: 'Jue', value: 428 },
    { name: 'Vie', value: 567 },
    { name: 'Sáb', value: 634 },
    { name: 'Dom', value: 423 }
  ];

  const reachData = [
    { name: 'Lun', value: 1245 },
    { name: 'Mar', value: 1567 },
    { name: 'Mié', value: 1123 },
    { name: 'Jue', value: 1890 },
    { name: 'Vie', value: 2134 },
    { name: 'Sáb', value: 2456 },
    { name: 'Dom', value: 1987 }
  ];

  const platformMetrics = [
    {
      platform: 'Facebook',
      icon: 'Facebook',
      color: '#1877F2',
      followers: 2456,
      engagement: 4.2,
      reach: 12450,
      posts: 8
    },
    {
      platform: 'Instagram',
      icon: 'Instagram',
      color: '#E4405F',
      followers: 1834,
      engagement: 6.8,
      reach: 8930,
      posts: 12
    },
    {
      platform: 'Twitter',
      icon: 'Twitter',
      color: '#1DA1F2',
      followers: 967,
      engagement: 3.1,
      reach: 5670,
      posts: 15
    },
    {
      platform: 'LinkedIn',
      icon: 'Linkedin',
      color: '#0A66C2',
      followers: 543,
      engagement: 5.4,
      reach: 3240,
      posts: 4
    }
  ];

  const topPosts = [
    {
      id: 1,
      content: `¡Nuevo menú de temporada! 🍂\n\nDescubre nuestros platos especiales de otoño preparados con ingredientes frescos y locales.`,
      platform: 'Instagram',
      engagement: 156,
      reach: 2340,
      likes: 89,
      comments: 23,
      shares: 12,
      date: '2025-10-20'
    },
    {
      id: 2,
      content: `Tips para elegir el mejor vino para tu cena 🍷\n\n1. Considera el plato principal\n2. Piensa en la ocasión\n3. No tengas miedo de experimentar`,
      platform: 'Facebook',
      engagement: 134,
      reach: 1890,
      likes: 67,
      comments: 18,
      shares: 8,
      date: '2025-10-19'
    }
  ];

  const getChartData = () => {
    switch (selectedMetric) {
      case 'reach':
        return reachData;
      case 'engagement':
      default:
        return engagementData;
    }
  };

  const getChartTitle = () => {
    const titles = {
      engagement: 'Engagement por Día',
      reach: 'Alcance por Día',
      impressions: 'Impresiones por Día',
      followers: 'Crecimiento de Seguidores'
    };
    return titles?.[selectedMetric] || 'Métricas';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Análisis de Redes Sociales
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedClient ? `Métricas para ${selectedClient?.name}` : 'Selecciona un cliente para ver métricas'}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>
        </div>
      </div>
      {selectedClient ? (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Seguidores Totales</p>
                  <p className="text-2xl font-bold text-foreground">
                    {platformMetrics?.reduce((total, platform) => total + platform?.followers, 0)?.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} color="var(--color-primary)" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Icon name="TrendingUp" size={14} className="text-success mr-1" />
                <span className="text-success">+12.5%</span>
                <span className="text-muted-foreground ml-1">vs mes anterior</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement Promedio</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(platformMetrics?.reduce((total, platform) => total + platform?.engagement, 0) / platformMetrics?.length)?.toFixed(1)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} color="var(--color-success)" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Icon name="TrendingUp" size={14} className="text-success mr-1" />
                <span className="text-success">+8.3%</span>
                <span className="text-muted-foreground ml-1">vs mes anterior</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alcance Total</p>
                  <p className="text-2xl font-bold text-foreground">
                    {platformMetrics?.reduce((total, platform) => total + platform?.reach, 0)?.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Eye" size={20} color="var(--color-warning)" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Icon name="TrendingDown" size={14} className="text-destructive mr-1" />
                <span className="text-destructive">-2.1%</span>
                <span className="text-muted-foreground ml-1">vs mes anterior</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Posts Publicados</p>
                  <p className="text-2xl font-bold text-foreground">
                    {platformMetrics?.reduce((total, platform) => total + platform?.posts, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} color="var(--color-accent)" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Icon name="TrendingUp" size={14} className="text-success mr-1" />
                <span className="text-success">+15.7%</span>
                <span className="text-muted-foreground ml-1">vs mes anterior</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Tendencias</h3>
                <Select
                  options={metricOptions}
                  value={selectedMetric}
                  onChange={setSelectedMetric}
                  className="w-40"
                />
              </div>
              <MetricsChart
                data={getChartData()}
                type="line"
                title={getChartTitle()}
                color="var(--color-primary)"
              />
            </div>

            <MetricsChart
              data={platformMetrics?.map(p => ({ name: p?.platform, value: p?.followers }))}
              type="bar"
              title="Seguidores por Plataforma"
              color="var(--color-success)"
            />
          </div>

          {/* Platform Performance */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Rendimiento por Plataforma
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {platformMetrics?.map((platform) => (
                <div key={platform?.platform} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: platform?.color }}
                    >
                      <Icon name={platform?.icon} size={16} color="white" />
                    </div>
                    <span className="font-medium text-foreground">{platform?.platform}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seguidores:</span>
                      <span className="font-medium">{platform?.followers?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engagement:</span>
                      <span className="font-medium">{platform?.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alcance:</span>
                      <span className="font-medium">{platform?.reach?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posts:</span>
                      <span className="font-medium">{platform?.posts}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Mejores Publicaciones
              </h3>
              <Button
                variant="outline"
                size="sm"
                iconName="BarChart3"
                iconPosition="left"
              >
                Ver Todas
              </Button>
            </div>
            
            <div className="space-y-4">
              {topPosts?.map((post) => (
                <div key={post?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-foreground flex-1 pr-4">
                      {post?.content}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{post?.platform}</span>
                      <span>•</span>
                      <span>{post?.date}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center text-sm">
                    <div>
                      <div className="font-medium text-foreground">{post?.likes}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{post?.comments}</div>
                      <div className="text-xs text-muted-foreground">Comentarios</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{post?.shares}</div>
                      <div className="text-xs text-muted-foreground">Compartidos</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{post?.reach}</div>
                      <div className="text-xs text-muted-foreground">Alcance</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="BarChart3" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Selecciona un Cliente
          </h3>
          <p className="text-muted-foreground">
            Elige un cliente para ver sus métricas y análisis de redes sociales
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;