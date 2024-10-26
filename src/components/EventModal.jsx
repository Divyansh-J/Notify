import React, { memo, useCallback } from 'react';
import { X, Calendar, MapPin, Share2, Heart, Users } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const EventModal = memo(({ 
  event, 
  onClose, 
  isFavorite = false, 
  onFavoriteToggle, 
  onShare 
}) => {
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    onFavoriteToggle?.(event.id);
  }, [event?.id, onFavoriteToggle]);

  const handleShareClick = useCallback((e) => {
    e.stopPropagation();
    onShare?.(event);
  }, [event, onShare]);

  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-700"
          />
          
          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {onShare && (
              <button 
                onClick={handleShareClick}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200 group"
              >
                <Share2 className="w-5 h-5 text-gray-700 group-hover:text-indigo-600" />
              </button>
            )}
            {onFavoriteToggle && (
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
            )}
            <button
              onClick={onClose}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200 group"
            >
              <X className="w-5 h-5 text-gray-700 group-hover:text-red-500" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-indigo-600 shadow-lg">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">{event.name}</h2>
            <div className="flex flex-wrap gap-4">
              <EventDetail icon={Calendar} text={formatDate(event.date)} />
              <EventDetail icon={MapPin} text={event.location} />
              <EventDetail icon={Users} text="500 spots left" />
            </div>
          </div>

          <p className="text-text-light dark:text-text-dark leading-relaxed text-lg">{event.description}</p>

          {/* Action Section */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="space-y-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Price per ticket</span>
              <div className="text-3xl font-bold text-primary-dark dark:text-primary-light">
                {event.price ? `$${event.price}` : 'Free'}
              </div>
            </div>
            <button className="px-8 py-3 bg-primary-DEFAULT text-white dark:bg-primary-dark dark:text-white rounded-xl font-medium shadow-lg hover:bg-primary-dark dark:hover:bg-primary-light dark:hover:text-primary-dark transform hover:-translate-y-0.5 transition-all duration-200">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const EventDetail = memo(({ icon: Icon, text }) => (
  <div className="flex items-center text-text-light dark:text-text-dark bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
    <Icon className="w-5 h-5 mr-2 text-primary-DEFAULT dark:text-primary-light" />
    <span>{text}</span>
  </div>
));

EventModal.displayName = 'EventModal';
EventDetail.displayName = 'EventDetail';

export default EventModal;
