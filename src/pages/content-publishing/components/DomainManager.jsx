import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const DomainManager = ({ domains, onRegisterDomain, onConfigureDomain }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExtensions, setSelectedExtensions] = useState(['.com']);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const extensions = [
    { value: '.com', label: '.com', price: '€12.99/año' },
    { value: '.es', label: '.es', price: '€8.99/año' },
    { value: '.org', label: '.org', price: '€14.99/año' },
    { value: '.net', label: '.net', price: '€13.99/año' },
    { value: '.info', label: '.info', price: '€11.99/año' },
    { value: '.biz', label: '.biz', price: '€15.99/año' }
  ];

  const mockSearchResults = [
    { domain: 'mi-restaurante.com', available: true, price: '€12.99', premium: false },
    { domain: 'mi-restaurante.es', available: true, price: '€8.99', premium: false },
    { domain: 'mi-restaurante.org', available: false, price: null, premium: false },
    { domain: 'mi-restaurante.net', available: true, price: '€13.99', premium: false },
    { domain: 'mirestaurante.com', available: true, price: '€299.99', premium: true }
  ];

  const handleSearch = async () => {
    if (!searchTerm?.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockSearchResults?.map(result => ({
        ...result,
        domain: result?.domain?.replace('mi-restaurante', searchTerm?.toLowerCase())
      })));
      setIsSearching(false);
    }, 1500);
  };

  const handleRegister = (domain) => {
    onRegisterDomain(domain);
  };

  const getDomainStatus = (domain) => {
    if (domain?.ssl && domain?.active) return { status: 'active', color: 'text-success', icon: 'CheckCircle' };
    if (domain?.ssl && !domain?.active) return { status: 'pending', color: 'text-warning', icon: 'Clock' };
    if (!domain?.ssl) return { status: 'setup', color: 'text-muted-foreground', icon: 'Settings' };
    return { status: 'error', color: 'text-error', icon: 'XCircle' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Globe" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Gestión de Dominios</h3>
            <p className="text-sm text-muted-foreground">Registra y configura dominios</p>
          </div>
        </div>
      </div>
      {/* Domain Search */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Buscar Nuevo Dominio</h4>
        <div className="flex items-end space-x-3 mb-4">
          <div className="flex-1">
            <Input
              label="Nombre del Dominio"
              type="text"
              placeholder="mi-negocio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              description="Ingresa el nombre sin extensión"
            />
          </div>
          <Button
            variant="default"
            onClick={handleSearch}
            loading={isSearching}
            iconName="Search"
            iconPosition="left"
            disabled={!searchTerm?.trim()}
          >
            Buscar
          </Button>
        </div>

        {/* Extension Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {extensions?.map((ext) => (
            <div key={ext?.value} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedExtensions?.includes(ext?.value)}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    setSelectedExtensions([...selectedExtensions, ext?.value]);
                  } else {
                    setSelectedExtensions(selectedExtensions?.filter(item => item !== ext?.value));
                  }
                }}
              />
              <div className="text-sm">
                <p className="font-medium text-foreground">{ext?.label}</p>
                <p className="text-xs text-muted-foreground">{ext?.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Results */}
        {searchResults?.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">Resultados de Búsqueda</h5>
            {searchResults?.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={result?.available ? 'CheckCircle' : 'XCircle'}
                    size={20}
                    className={result?.available ? 'text-success' : 'text-error'}
                  />
                  <div>
                    <p className="font-medium text-foreground">{result?.domain}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {result?.premium && (
                        <span className="bg-warning/20 text-warning px-2 py-0.5 rounded">Premium</span>
                      )}
                      <span>{result?.available ? 'Disponible' : 'No disponible'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {result?.available && (
                    <>
                      <span className="text-sm font-medium text-foreground">{result?.price}/año</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRegister(result)}
                        iconName="ShoppingCart"
                        iconPosition="left"
                      >
                        Registrar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Existing Domains */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Dominios Configurados</h4>
        <div className="space-y-3">
          {domains?.map((domain) => {
            const status = getDomainStatus(domain);
            return (
              <div
                key={domain?.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={status?.icon} size={20} className={status?.color} />
                  <div>
                    <p className="font-medium text-foreground">{domain?.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Expira: {domain?.expiryDate}</span>
                      <span>Registrador: {domain?.registrar}</span>
                      {domain?.ssl && (
                        <span className="flex items-center space-x-1 text-success">
                          <Icon name="Shield" size={12} />
                          <span>SSL Activo</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onConfigureDomain(domain)}
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Configurar
                  </Button>
                  {domain?.active && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="left"
                    >
                      Visitar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DomainManager;