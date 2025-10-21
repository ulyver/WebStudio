import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientSocialOverview = ({ client, onSelectClient }) => {
  const getTotalFollowers = () => {
    return client?.socialAccounts?.filter(account => account?.connected)?.reduce((total, account) => total + (account?.followers || 0), 0);
  };

  const getConnectedPlatforms = () => {
    return client?.socialAccounts?.filter(account => account?.connected)?.length;
  };

  const getTotalPlatforms = () => {
    return client?.socialAccounts?.length;
  };

  const getEngagementRate = () => {
    const connectedAccounts = client?.socialAccounts?.filter(account => account?.connected);
    if (connectedAccounts?.length === 0) return 0;
    
    const totalEngagement = connectedAccounts?.reduce((total, account) => 
      total + (account?.engagementRate || 0), 0
    );
    return (totalEngagement / connectedAccounts?.length)?.toFixed(1);
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth cursor-pointer"
      onClick={() => onSelectClient(client)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <Image
              src={client?.logo}
              alt={client?.logoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{client?.name}</h3>
            <p className="text-sm text-muted-foreground">{client?.type}</p>
          </div>
        </div>
        
        <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {getTotalFollowers()?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Seguidores Totales</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {getEngagementRate()}%
          </div>
          <div className="text-xs text-muted-foreground">Engagement Promedio</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Plataformas conectadas:</span>
        <div className="flex items-center space-x-2">
          <span className="font-medium">
            {getConnectedPlatforms()}/{getTotalPlatforms()}
          </span>
          <div className={`w-2 h-2 rounded-full ${
            getConnectedPlatforms() === getTotalPlatforms() 
              ? 'bg-success' 
              : getConnectedPlatforms() > 0 
                ? 'bg-warning' :'bg-muted-foreground'
          }`}></div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-3">
        {client?.socialAccounts?.slice(0, 4)?.map((account, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              account?.connected 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
            title={account?.platform}
          >
            {account?.platform?.charAt(0)?.toUpperCase()}
          </div>
        ))}
        {client?.socialAccounts?.length > 4 && (
          <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
            +{client?.socialAccounts?.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSocialOverview;