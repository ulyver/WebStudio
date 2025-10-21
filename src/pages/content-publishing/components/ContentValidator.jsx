import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentValidator = ({ content, onValidate, onFix }) => {
  const [validationResults, setValidationResults] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const mockValidationResults = [
    {
      id: 1,
      category: 'SEO',
      type: 'warning',
      title: 'Falta meta descripción',
      description: 'La página principal no tiene meta descripción definida',
      impact: 'medium',
      fixable: true,
      file: 'index.html',
      line: 8
    },
    {
      id: 2,
      category: 'Performance',
      type: 'error',
      title: 'Imágenes sin optimizar',
      description: '3 imágenes superan los 500KB y no están optimizadas',
      impact: 'high',
      fixable: true,
      file: 'assets/images/',
      details: ['hero-image.jpg (1.2MB)', 'gallery-1.png (800KB)', 'about-us.jpg (650KB)']
    },
    {
      id: 3,
      category: 'Accessibility',
      type: 'warning',
      title: 'Contraste insuficiente',
      description: 'Algunos elementos de texto no cumplen con WCAG AA',
      impact: 'medium',
      fixable: true,
      file: 'styles.css',
      line: 145
    },
    {
      id: 4,
      category: 'Mobile',
      type: 'success',
      title: 'Responsive design',
      description: 'El sitio es completamente responsive en todos los dispositivos',
      impact: 'none',
      fixable: false
    },
    {
      id: 5,
      category: 'Security',
      type: 'info',
      title: 'HTTPS configurado',
      description: 'Certificado SSL válido y redirección HTTPS activa',
      impact: 'none',
      fixable: false
    }
  ];

  useEffect(() => {
    if (content) {
      runValidation();
    }
  }, [content]);

  const runValidation = async () => {
    setIsValidating(true);
    // Simulate validation process
    setTimeout(() => {
      setValidationResults(mockValidationResults);
      setIsValidating(false);
    }, 2000);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'high':
        return <span className="bg-error/20 text-error px-2 py-0.5 rounded text-xs">Alto</span>;
      case 'medium':
        return <span className="bg-warning/20 text-warning px-2 py-0.5 rounded text-xs">Medio</span>;
      case 'low':
        return <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">Bajo</span>;
      default:
        return null;
    }
  };

  const getCategoryStats = () => {
    const stats = validationResults?.reduce((acc, result) => {
      if (!acc?.[result?.category]) {
        acc[result.category] = { total: 0, errors: 0, warnings: 0, success: 0 };
      }
      acc[result.category].total++;
      acc[result.category][result.type]++;
      return acc;
    }, {});
    return stats;
  };

  const handleFixIssue = (issue) => {
    onFix(issue);
    // Remove fixed issue from results
    setValidationResults(prev => prev?.filter(item => item?.id !== issue?.id));
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Validación de Contenido</h3>
            <p className="text-sm text-muted-foreground">Verifica calidad y optimización</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={runValidation}
          loading={isValidating}
          iconName="RefreshCw"
          iconPosition="left"
        >
          {isValidating ? 'Validando...' : 'Revalidar'}
        </Button>
      </div>
      {/* Validation Summary */}
      {validationResults?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(categoryStats)?.map(([category, stats]) => (
            <div key={category} className="bg-muted/30 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">{category}</p>
              <div className="flex items-center justify-center space-x-2">
                {stats?.errors > 0 && (
                  <span className="text-error text-sm font-medium">{stats?.errors}</span>
                )}
                {stats?.warnings > 0 && (
                  <span className="text-warning text-sm font-medium">{stats?.warnings}</span>
                )}
                {stats?.success > 0 && (
                  <span className="text-success text-sm font-medium">{stats?.success}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Validation Results */}
      {isValidating ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Icon name="Loader" size={32} className="text-primary animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Validando contenido...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {validationResults?.map((result) => (
            <div
              key={result?.id}
              className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
                selectedIssue?.id === result?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground/30'
              }`}
              onClick={() => setSelectedIssue(selectedIssue?.id === result?.id ? null : result)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon
                    name={getTypeIcon(result?.type)}
                    size={20}
                    className={getTypeColor(result?.type)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground">{result?.title}</p>
                      {getImpactBadge(result?.impact)}
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {result?.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{result?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>📁 {result?.file}</span>
                      {result?.line && <span>Línea {result?.line}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {result?.fixable && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleFixIssue(result);
                      }}
                      iconName="Wrench"
                      iconPosition="left"
                    >
                      Corregir
                    </Button>
                  )}
                  <Icon
                    name={selectedIssue?.id === result?.id ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-muted-foreground"
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {selectedIssue?.id === result?.id && result?.details && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Detalles:</p>
                  <ul className="space-y-1">
                    {result?.details?.map((detail, index) => (
                      <li key={index} className="text-sm text-foreground flex items-center space-x-2">
                        <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Quick Actions */}
      {validationResults?.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {validationResults?.filter(r => r?.type === 'error')?.length} errores, {' '}
            {validationResults?.filter(r => r?.type === 'warning')?.length} advertencias
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Exportar Reporte
            </Button>
            <Button
              variant="default"
              iconName="Wrench"
              iconPosition="left"
              disabled={!validationResults?.some(r => r?.fixable)}
            >
              Corregir Todo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentValidator;