import React, { memo, useCallback } from 'react';
import { Calendar, MapPin, Tag, Heart, Share2 } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const EventCard = memo(({ 
  event, 
  onClick,
  isFavorite,
  onFavoriteToggle,
  onShare,
  className = "" 
}) => {
  const handleClick = useCallback(() => onClick(event), [event, onClick]);

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    onFavoriteToggle(event.id);
  }, [event.id, onFavoriteToggle]);

  const handleShareClick = useCallback((e) => {
    e.stopPropagation();
    onShare(event);
  }, [event, onShare]);

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-indigo-600 shadow-lg">
            {event.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
          <button 
            onClick={handleFavoriteClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200 group"
          >
            <Heart 
              className={`w-5 h-5 ${
                isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-700 group-hover:text-pink-500'
              }`} 
            />
          </button>
          <button 
            onClick={handleShareClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200 group"
          >
            <Share2 className="w-5 h-5 text-gray-700 group-hover:text-indigo-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
          {event.name}
        </h2>
        
        <div className="space-y-3">
          <EventInfo icon={Calendar} text={formatDate(event.date)} />
          <EventInfo icon={MapPin} text={event.location} />
        </div>

        {/* Price Tag */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <EventInfo 
            icon={Tag} 
            text={event.price ? `$${event.price}` : 'Free'} 
          />
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onClick(event);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

const EventInfo = memo(({ icon: Icon, text }) => (
  <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
    <Icon className="w-4 h-4 mr-2" />
    <span className="text-sm line-clamp-1">{text}</span>
  </div>
));

EventCard.displayName = 'EventCard';
EventInfo.displayName = 'EventInfo';

export default EventCard;
