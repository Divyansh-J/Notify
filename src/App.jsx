import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Search, Menu } from 'lucide-react';
import { mockEvents } from './data/mockData.js';
import logo from './assets/logo.jpg';
import HeroSection from './components/HeroSection';
import FeaturedEvent from './components/FeaturedEvent';
import Footer from './components/Footer';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favoriteEvents, setFavoriteEvents] = useState(new Set()); // Track favorite events
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const upcomingEventsRef = useRef(null);

  const filteredEvents = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return mockEvents.filter(event => 
      event.name.toLowerCase().includes(searchTermLower) ||
      event.location.toLowerCase().includes(searchTermLower) ||
      event.category.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm]);

  const scrollToUpcomingEvents = useCallback(() => {
    if (upcomingEventsRef.current) {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const offset = upcomingEventsRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    scrollToUpcomingEvents();
  }, [scrollToUpcomingEvents]);

  const handleFavoriteToggle = useCallback((eventId) => {
    setFavoriteEvents((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId);
      } else {
        newFavorites.add(eventId);
      }
      return newFavorites;
    });
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        logo={logo} 
        searchTerm={searchTerm} 
        handleSearch={handleSearch} 
        toggleMobileMenu={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />
      <MainContent 
        filteredEvents={filteredEvents} 
        setSelectedEvent={setSelectedEvent} 
        favoriteEvents={favoriteEvents} 
        handleFavoriteToggle={handleFavoriteToggle} 
        upcomingEventsRef={upcomingEventsRef} 
        scrollToUpcomingEvents={scrollToUpcomingEvents} // Pass the scroll function
      />
      <Footer />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

const Navbar = ({ logo, searchTerm, handleSearch, toggleMobileMenu, isMobileMenuOpen }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Notify Logo" className="w-8 h-8 rounded-lg object-cover" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">
            Notify
          </h1>
        </div>
        <div className="hidden md:block relative w-96">
          <label htmlFor="desktop-search" className="sr-only">Search events</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="desktop-search"
            type="search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Search events, locations, or categories..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <input
              id="mobile-search"
              type="search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Search events, locations, or categories..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
    </div>
  </nav>
);

const MainContent = ({ filteredEvents, setSelectedEvent, favoriteEvents, handleFavoriteToggle, upcomingEventsRef, scrollToUpcomingEvents }) => (
  <main className="flex-grow pt-20" role="main">
    <HeroSection scrollToUpcomingEvents={scrollToUpcomingEvents} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FeaturedEvent event={mockEvents[0]} />
      <h2 ref={upcomingEventsRef} className="text-3xl font-bold text-gray-900 mb-8 mt-16">Upcoming Events</h2>
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 animate-fade-in" role="alert">
          <p className="text-gray-600 text-lg">No events found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Events list">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
              isFavorite={favoriteEvents.has(event.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  </main>
);

export default App;
