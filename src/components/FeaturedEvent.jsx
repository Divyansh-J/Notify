import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const FeaturedEvent = ({ event }) => {
  if (!event) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="md:flex">
        <div className="md:flex-shrink-0 relative">
          <img 
            className="h-48 w-full object-cover md:h-full md:w-64 lg:w-80" 
            src={event.image} 
            alt={event.name} 
          />
          <div className="absolute top-0 left-0 bg-indigo-600 text-white px-2 py-1 text-xs font-semibold">
            Featured
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition duration-300">
            {event.name}
          </h2>
          <p className="mt-2 text-gray-600 line-clamp-3">{event.description}</p>
          <div className="mt-4 space-y-2">
            <EventDetail icon={<Calendar className="h-5 w-5" />} text={formatDate(event.date)} />
            <EventDetail icon={<MapPin className="h-5 w-5" />} text={event.location} />
            <EventDetail icon={<Users className="h-5 w-5" />} text={`${event.spotsLeft} spots left`} />
          </div>
          <div className="mt-6">
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventDetail = ({ icon, text }) => (
  <div className="flex items-center text-gray-600">
    <span className="mr-2">{icon}</span>
    <span>{text}</span>
  </div>
);

export default FeaturedEvent;
