import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ContentScheduler = ({ onSchedulePost, onSaveDraft }) => {
  const [postData, setPostData] = useState({
    content: '',
    platforms: [],
    scheduledDate: '',
    scheduledTime: '',
    images: [],
    hashtags: '',
    status: 'draft'
  });

  const [isScheduling, setIsScheduling] = useState(false);

  const platformOptions = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'linkedin', label: 'LinkedIn' }];


  const scheduledPosts = [
  {
    id: 1,
    content: `¡Nueva promoción especial! 🎉\n\nDisfruta de nuestros deliciosos platos con un 20% de descuento este fin de semana.\n\n#RestauranteElSabor #Promoción #FinDeSemana`,
    platforms: ['facebook', 'instagram'],
    scheduledDate: '2025-10-22',
    scheduledTime: '18:00',
    status: 'scheduled',
    image: "https://images.unsplash.com/photo-1676300184021-96fa00e1a987",
    imageAlt: 'Delicious grilled salmon with vegetables and herbs on white plate'
  },
  {
    id: 2,
    content: `Tips para mantener tu negocio siempre limpio y organizado 💡\n\n1. Establece rutinas diarias\n2. Capacita a tu equipo\n3. Usa productos de calidad\n\n#Consejos #Negocio #Limpieza`,
    platforms: ['linkedin', 'facebook'],
    scheduledDate: '2025-10-23',
    scheduledTime: '10:00',
    status: 'scheduled',
    image: "https://images.unsplash.com/photo-1633611574494-eec92eedd084",
    imageAlt: 'Clean modern restaurant interior with organized tables and chairs'
  }];


  const handleInputChange = (field, value) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSchedulePost = async () => {
    if (!postData?.content?.trim() || postData?.platforms?.length === 0) {
      return;
    }

    setIsScheduling(true);

    setTimeout(() => {
      if (onSchedulePost) {
        onSchedulePost({
          ...postData,
          id: Date.now(),
          status: 'scheduled'
        });
      }

      // Reset form
      setPostData({
        content: '',
        platforms: [],
        scheduledDate: '',
        scheduledTime: '',
        images: [],
        hashtags: '',
        status: 'draft'
      });

      setIsScheduling(false);
    }, 1000);
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'Linkedin'
    };
    return icons?.[platform] || 'Globe';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: '#1877F2',
      instagram: '#E4405F',
      twitter: '#1DA1F2',
      linkedin: '#0A66C2'
    };
    return colors?.[platform] || 'var(--color-primary)';
  };

  return (
    <div className="space-y-6">
      {/* Create New Post */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Programar Nueva Publicación
            </h3>
            <p className="text-sm text-muted-foreground">
              Crear y programar contenido para redes sociales
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contenido de la Publicación
            </label>
            <textarea
              value={postData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              placeholder="Escribe el contenido de tu publicación..."
              className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />

            <div className="text-xs text-muted-foreground mt-1">
              {postData?.content?.length}/280 caracteres
            </div>
          </div>

          {/* Platform Selection */}
          <Select
            label="Plataformas de Publicación"
            description="Selecciona dónde publicar este contenido"
            options={platformOptions}
            value={postData?.platforms}
            onChange={(value) => handleInputChange('platforms', value)}
            multiple
            searchable />


          {/* Schedule Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Fecha de Publicación"
              type="date"
              value={postData?.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]} />

            
            <Input
              label="Hora de Publicación"
              type="time"
              value={postData?.scheduledTime}
              onChange={(e) => handleInputChange('scheduledTime', e?.target?.value)} />

          </div>

          {/* Hashtags */}
          <Input
            label="Hashtags"
            type="text"
            placeholder="#hashtag1 #hashtag2 #hashtag3"
            description="Separar hashtags con espacios"
            value={postData?.hashtags}
            onChange={(e) => handleInputChange('hashtags', e?.target?.value)} />


          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onSaveDraft && onSaveDraft(postData)}
              iconName="Save"
              iconPosition="left">

              Guardar Borrador
            </Button>
            <Button
              variant="default"
              onClick={handleSchedulePost}
              loading={isScheduling}
              iconName="Calendar"
              iconPosition="left"
              disabled={!postData?.content?.trim() || postData?.platforms?.length === 0}>

              Programar Publicación
            </Button>
          </div>
        </div>
      </div>
      {/* Scheduled Posts List */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Publicaciones Programadas
            </h3>
            <p className="text-sm text-muted-foreground">
              {scheduledPosts?.length} publicaciones pendientes
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left">

            Actualizar
          </Button>
        </div>

        <div className="space-y-4">
          {scheduledPosts?.map((post) =>
          <div key={post?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-smooth">
              <div className="flex items-start space-x-4">
                {post?.image &&
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                  src={post?.image}
                  alt={post?.imageAlt}
                  className="w-full h-full object-cover" />

                  </div>
              }
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-foreground line-clamp-3">
                      {post?.content}
                    </p>
                    <div className="flex space-x-1 ml-4">
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit3" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {post?.platforms?.map((platform) =>
                      <div
                        key={platform}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getPlatformColor(platform) }}
                        title={platform}>

                            <Icon
                          name={getPlatformIcon(platform)}
                          size={12}
                          color="white" />

                          </div>
                      )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {post?.scheduledDate} a las {post?.scheduledTime}
                      </div>
                    </div>
                    
                    <div className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium">
                      Programado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default ContentScheduler;