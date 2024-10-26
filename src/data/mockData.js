import event1Image from '../assets/images/event2.jpg';
import event2Image from '../assets/images/event1.jpg';
import event3Image from '../assets/images/event3.jpg';
import event4Image from '../assets/images/event4.jpg';
import event5Image from '../assets/images/event5.jpg';
import event6Image from '../assets/images/event6.jpg';

const unsortedEvents = [
 
  {
    id: 1,
    name: "Tech Conference 2024",
    date: "2025-01-01",
    location: "CES , 2025",
    description: "Explore the latest in technology trends, join workshops, and network with industry leaders.",
    image: event2Image,
    category: "Technology"
  },
  {
    id: 2,
    name: "Summer Music Festival",
    date: "2024-11-15",
    location: "Central Park, New York",
    description: "Join us for a day of live music performances featuring local and international artists. Food trucks and refreshments will be available.",
    image: event1Image,
    category: "Music"
  },
  {
    id: 3,
    name: "Food & Wine Expo",
    date: "2024-11-20",
    location: "Downtown Plaza, Chicago",
    description: "Sample cuisines from top local restaurants and wine tastings from regional vineyards.",
    image: event3Image,
    category: "Food"
  },
  {
    id: 4,
    name: "Art Gallery Opening",
    date: "2024-11-25",
    location: "Modern Art Museum, Boston",
    description: "Be among the first to experience our new modern art exhibition featuring local artists.",
    image: event4Image,
    category: "Art"
  },
  {
    id: 5,
    name: "Marathon 2024",
    date: "2024-12-05",
    location: "Citywide, Seattle",
    description: "Annual city marathon with routes for all skill levels. Register early for early bird pricing.",
    image: event5Image,
    category: "Sports"
  },
  {
    id: 6,
    name: "Sunburn Festival",
    date: "2024-11-25",
    location: "Sunburn Arena, GOA",
    description: "Join us for a day of live music performances featuring local and international artists. Food trucks and refreshments will be available.",
    image: event6Image,
    category: "Music" 
  }
];

export const mockEvents = unsortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
