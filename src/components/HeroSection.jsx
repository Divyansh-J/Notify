import React from 'react';
import { Calendar } from 'lucide-react';

const HeroSection = ({ scrollToUpcomingEvents }) => {
  return (
    <div className="bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        <Calendar className="w-16 h-16 mb-8 animate-bounce-subtle text-primary-dark dark:text-primary-light" />
        <h1 className="text-5xl font-bold mb-6 text-primary-dark dark:text-primary-light">Discover Amazing Events</h1>
        <p className="text-xl mb-8 max-w-2xl text-text-light dark:text-text-dark">
          Find and join exciting events in your area. From music festivals to tech conferences, we've got you covered.
        </p>
        <button
          className="bg-primary-DEFAULT text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-dark dark:hover:bg-primary-light dark:hover:text-primary-dark transition duration-300 transform hover:scale-105 shadow-lg"
          onClick={scrollToUpcomingEvents} // Use the function to scroll
        >
          Explore Events
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
