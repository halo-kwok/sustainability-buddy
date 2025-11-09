/**
 * Events Component
 * 
 * Displays local sustainability events including:
 * - Flea markets (fashion/sustainable shopping)
 * - Farmers' markets (produce)
 * - Recycling events (food drives, e-waste collection, etc.)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, ArrowLeft, 
  ShoppingBag, Apple, Recycle, Filter, X,
  TrendingUp, Droplet, Zap, Leaf, Target, Award
} from 'lucide-react';

function Events() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [collectiveStats, setCollectiveStats] = useState({
    totalParticipants: 12456,
    activeThisMonth: 3241,
    co2Reduced: 234560, // lbs
    energySaved: 123450, // kWh
    waterSaved: 3450000, // gallons
    wasteDiverted: 45230, // lbs
    moneySaved: 67890 // dollars
  });

  // Animate counters on mount
  useEffect(() => {
    // Simulate real-time updates (in production, this would come from API)
    const interval = setInterval(() => {
      setCollectiveStats(prev => ({
        ...prev,
        totalParticipants: prev.totalParticipants + Math.floor(Math.random() * 3),
        co2Reduced: prev.co2Reduced + Math.floor(Math.random() * 5),
        energySaved: prev.energySaved + Math.floor(Math.random() * 2),
        waterSaved: prev.waterSaved + Math.floor(Math.random() * 10),
        wasteDiverted: prev.wasteDiverted + Math.floor(Math.random() * 2)
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate equivalent impacts
  const equivalents = {
    homesPowered: Math.floor(collectiveStats.energySaved / 1000), // ~1000 kWh per home per month
    treesPlanted: Math.floor(collectiveStats.co2Reduced / 50), // ~50 lbs CO₂ per tree per year
    carsRemoved: Math.floor(collectiveStats.co2Reduced / 11000), // ~11,000 lbs CO₂ per car per year
    poolsFilled: Math.floor(collectiveStats.waterSaved / 20000) // ~20,000 gallons per pool
  };

  // Mock event data
  const events = [
    // Flea Markets / Fashion
    {
      id: 1,
      title: "Downtown Vintage Market",
      category: "fashion",
      description: "Sustainable fashion market featuring vintage clothing, upcycled items, and local designers. Bring your old clothes to swap!",
      date: "2024-01-15",
      time: "10:00 AM - 4:00 PM",
      location: "City Center Plaza, 123 Main St",
      distance: "2.3 miles",
      attendees: 150,
      participants: 1247,
      impact: "Reduces textile waste, supports circular fashion",
      impactMetrics: {
        co2: 2340,
        water: 890000,
        waste: 3450
      },
      icon: ShoppingBag,
      color: "purple"
    },
    {
      id: 2,
      title: "Community Clothing Swap",
      category: "fashion",
      description: "Bring clothes you no longer wear and swap them with neighbors. Free event, all sizes welcome!",
      date: "2024-01-20",
      time: "1:00 PM - 5:00 PM",
      location: "Community Center, 456 Oak Ave",
      distance: "3.1 miles",
      attendees: 80,
      participants: 1456,
      impact: "Extends clothing life, reduces waste",
      impactMetrics: {
        co2: 2340,
        water: 890000,
        waste: 3450
      },
      icon: ShoppingBag,
      color: "purple"
    },
    {
      id: 3,
      title: "Sustainable Fashion Pop-up",
      category: "fashion",
      description: "Local sustainable fashion brands showcasing eco-friendly clothing and accessories.",
      date: "2024-01-25",
      time: "11:00 AM - 6:00 PM",
      location: "Green Market Square, 789 Elm St",
      distance: "1.8 miles",
      attendees: 200,
      impact: "Supports ethical fashion, reduces carbon footprint",
      icon: ShoppingBag,
      color: "purple"
    },
    // Farmers' Markets / Produce
    {
      id: 4,
      title: "Saturday Farmers' Market",
      category: "produce",
      description: "Weekly farmers' market with fresh local produce, organic options, and seasonal fruits and vegetables.",
      date: "2024-01-13",
      time: "8:00 AM - 1:00 PM",
      location: "Farmers Market Plaza, 321 Market St",
      distance: "0.9 miles",
      attendees: 300,
      participants: 3421,
      impact: "Supports local farmers, reduces food miles",
      impactMetrics: {
        co2: 12340,
        foodMiles: 89230,
        localEconomy: 67890
      },
      icon: Apple,
      color: "green"
    },
    {
      id: 5,
      title: "Organic Produce Fair",
      category: "produce",
      description: "Monthly organic produce fair featuring certified organic fruits, vegetables, and herbs from local farms.",
      date: "2024-01-18",
      time: "9:00 AM - 2:00 PM",
      location: "Park District, 654 Pine Rd",
      distance: "2.7 miles",
      attendees: 180,
      impact: "Promotes organic farming, reduces pesticides",
      icon: Apple,
      color: "green"
    },
    {
      id: 6,
      title: "Community Garden Harvest Festival",
      category: "produce",
      description: "Celebrate the harvest season with fresh produce, garden tours, and workshops on sustainable gardening.",
      date: "2024-01-22",
      time: "10:00 AM - 3:00 PM",
      location: "Community Garden, 987 Garden Way",
      distance: "1.5 miles",
      attendees: 120,
      impact: "Promotes local food production, community building",
      icon: Apple,
      color: "green"
    },
    // Recycling Events
    {
      id: 7,
      title: "E-Waste Collection Drive",
      category: "recycling",
      description: "Drop off old electronics for responsible recycling. Accepting computers, phones, tablets, and small appliances.",
      date: "2024-01-14",
      time: "9:00 AM - 2:00 PM",
      location: "Recycling Center, 147 Tech Blvd",
      distance: "4.2 miles",
      attendees: 250,
      participants: 1245,
      impact: "Prevents e-waste in landfills, recovers valuable materials",
      impactMetrics: {
        waste: 18450,
        devices: 2340,
        toxicDiverted: 890
      },
      icon: Recycle,
      color: "blue"
    },
    {
      id: 8,
      title: "Food Drive & Composting Workshop",
      category: "recycling",
      description: "Donate non-perishable food items and learn about home composting. Free composting bins for first 50 attendees!",
      date: "2024-01-16",
      time: "10:00 AM - 1:00 PM",
      location: "Community Center, 456 Oak Ave",
      distance: "3.1 miles",
      attendees: 100,
      impact: "Reduces food waste, supports food security",
      icon: Recycle,
      color: "blue"
    },
    {
      id: 9,
      title: "Textile Recycling Event",
      category: "recycling",
      description: "Bring old clothes, towels, and linens for recycling. Items will be sorted for reuse, upcycling, or material recovery.",
      date: "2024-01-19",
      time: "11:00 AM - 4:00 PM",
      location: "Green Market Square, 789 Elm St",
      distance: "1.8 miles",
      attendees: 175,
      impact: "Diverts textiles from landfills, supports circular economy",
      icon: Recycle,
      color: "blue"
    },
    {
      id: 10,
      title: "Battery & Light Bulb Collection",
      category: "recycling",
      description: "Properly dispose of batteries and light bulbs. Free event, accepting all types of batteries and bulbs.",
      date: "2024-01-21",
      time: "12:00 PM - 5:00 PM",
      location: "City Hall, 111 Civic Center Dr",
      distance: "2.5 miles",
      attendees: 90,
      impact: "Prevents toxic materials in landfills",
      icon: Recycle,
      color: "blue"
    },
    {
      id: 11,
      title: "Plastic-Free Swap Meet",
      category: "recycling",
      description: "Swap single-use plastic items for sustainable alternatives. Learn about reducing plastic waste in daily life.",
      date: "2024-01-23",
      time: "2:00 PM - 6:00 PM",
      location: "Eco Center, 258 Green St",
      distance: "3.8 miles",
      attendees: 140,
      impact: "Reduces plastic waste, promotes sustainable alternatives",
      icon: Recycle,
      color: "blue"
    },
    {
      id: 12,
      title: "Community Compost Day",
      category: "recycling",
      description: "Drop off food scraps for community composting. Free compost available for pickup (bring your own container).",
      date: "2024-01-24",
      time: "8:00 AM - 12:00 PM",
      location: "Community Garden, 987 Garden Way",
      distance: "1.5 miles",
      attendees: 200,
      impact: "Diverts organic waste, creates nutrient-rich soil",
      icon: Recycle,
      color: "blue"
    }
  ];

  // Filter events by category
  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // Get category display info
  const getCategoryInfo = (category) => {
    const categories = {
      fashion: { label: "Fashion & Flea Markets", color: "purple", icon: ShoppingBag },
      produce: { label: "Farmers' Markets", color: "green", icon: Apple },
      recycling: { label: "Recycling Events", color: "blue", icon: Recycle }
    };
    return categories[category] || { label: category, color: "gray", icon: Calendar };
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const categories = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'fashion', label: 'Fashion', icon: ShoppingBag },
    { value: 'produce', label: 'Produce', icon: Apple },
    { value: 'recycling', label: 'Recycling', icon: Recycle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 safe-all">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/home"
              className="p-2 hover:bg-white rounded-lg transition-smooth tap-target"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Local Events</h1>
              <p className="text-sm text-gray-600 mt-1">
                Discover sustainability events near you
              </p>
            </div>
          </div>
        </div>

        {/* Collective Impact Dashboard */}
        <div className="mb-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-2 border-primary-green">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-primary-green" />
              <h2 className="text-2xl font-bold text-gray-800">Our Collective Impact</h2>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span className="font-semibold">{collectiveStats.activeThisMonth.toLocaleString()} active this month</span>
            </div>
          </div>

          {/* Social Proof Message */}
          <div className="mb-4 p-3 bg-white/60 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-primary-green">Together, we're making a difference!</strong> Join {collectiveStats.totalParticipants.toLocaleString()} others who are taking action for sustainability. Every small step adds up to big change.
            </p>
          </div>

          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-green" />
                <span className="text-xs font-semibold text-gray-600 uppercase">CO₂ Reduced</span>
              </div>
              <p className="text-2xl font-bold text-primary-green">
                {Math.floor(collectiveStats.co2Reduced / 1000).toLocaleString()}k
              </p>
              <p className="text-xs text-gray-500">lbs</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-xs font-semibold text-gray-600 uppercase">Energy Saved</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {Math.floor(collectiveStats.energySaved / 1000).toLocaleString()}k
              </p>
              <p className="text-xs text-gray-500">kWh</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Droplet className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-semibold text-gray-600 uppercase">Water Saved</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(collectiveStats.waterSaved / 1000000).toLocaleString()}M
              </p>
              <p className="text-xs text-gray-500">gallons</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Recycle className="w-5 h-5 text-green-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase">Waste Diverted</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {Math.floor(collectiveStats.wasteDiverted / 1000).toLocaleString()}k
              </p>
              <p className="text-xs text-gray-500">lbs</p>
            </div>
          </div>

          {/* Equivalent Impacts */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-primary-green" />
              <span>This is equivalent to:</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-primary-green">{equivalents.homesPowered}</p>
                <p className="text-xs text-gray-600">homes powered for a month</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary-green">{equivalents.treesPlanted}</p>
                <p className="text-xs text-gray-600">trees planted</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary-green">{equivalents.carsRemoved}</p>
                <p className="text-xs text-gray-600">cars removed from road</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary-green">{equivalents.poolsFilled}</p>
                <p className="text-xs text-gray-600">swimming pools filled</p>
              </div>
            </div>
          </div>

          {/* Community Goals Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Award className="w-4 h-4 text-accent-amber" />
                <span>2024 Community Goal</span>
              </h3>
              <span className="text-xs text-gray-500">Reduce 1M lbs CO₂</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-primary-green to-accent-amber h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((collectiveStats.co2Reduced / 1000000) * 100, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">
                {((collectiveStats.co2Reduced / 1000000) * 100).toFixed(1)}% complete
              </span>
              <span className="text-primary-green font-semibold">
                {((1000000 - collectiveStats.co2Reduced) / 1000).toLocaleString()}k lbs to go!
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth tap-target whitespace-nowrap ${
                    isActive
                      ? 'bg-primary-green text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  {isActive && selectedCategory !== 'all' && (
                    <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {events.filter(e => e.category === cat.value).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No events found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => {
              const Icon = event.icon;
              const categoryInfo = getCategoryInfo(event.category);
              const colorClasses = {
                purple: 'bg-purple-50 border-purple-200 text-purple-700',
                green: 'bg-green-50 border-green-200 text-green-700',
                blue: 'bg-blue-50 border-blue-200 text-blue-700'
              };

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-smooth overflow-hidden"
                >
                  {/* Event Header */}
                  <div className={`p-4 border-b-2 ${colorClasses[event.color]}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {categoryInfo.label}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                  </div>

                  {/* Event Details */}
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="flex-1">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees} expected</span>
                        </div>
                        <span className="text-primary-green font-medium">{event.distance} away</span>
                      </div>
                    </div>

                    {/* Collective Impact Metrics */}
                    {event.participants && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-700">Collective Impact:</span>
                          <span className="text-xs text-primary-green font-medium">
                            {event.participants.toLocaleString()} participants
                          </span>
                        </div>
                        {event.impactMetrics && (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {event.impactMetrics.co2 && (
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3 text-primary-green" />
                                <span className="text-gray-600">
                                  {event.impactMetrics.co2.toLocaleString()} lbs CO₂
                                </span>
                              </div>
                            )}
                            {event.impactMetrics.water && (
                              <div className="flex items-center space-x-1">
                                <Droplet className="w-3 h-3 text-blue-500" />
                                <span className="text-gray-600">
                                  {Math.floor(event.impactMetrics.water / 1000).toLocaleString()}k gal
                                </span>
                              </div>
                            )}
                            {event.impactMetrics.waste && (
                              <div className="flex items-center space-x-1">
                                <Recycle className="w-3 h-3 text-green-600" />
                                <span className="text-gray-600">
                                  {event.impactMetrics.waste.toLocaleString()} lbs
                                </span>
                              </div>
                            )}
                            {event.impactMetrics.foodMiles && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3 text-green-600" />
                                <span className="text-gray-600">
                                  {event.impactMetrics.foodMiles.toLocaleString()} miles saved
                                </span>
                              </div>
                            )}
                            {event.impactMetrics.devices && (
                              <div className="flex items-center space-x-1">
                                <Recycle className="w-3 h-3 text-blue-600" />
                                <span className="text-gray-600">
                                  {event.impactMetrics.devices.toLocaleString()} devices
                                </span>
                              </div>
                            )}
                            {event.impactMetrics.localEconomy && (
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3 text-green-600" />
                                <span className="text-gray-600">
                                  ${event.impactMetrics.localEconomy.toLocaleString()} to local economy
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Impact Badge */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-600 italic mb-3">
                        💚 {event.impact}
                      </p>
                      <button
                        onClick={() => {
                          // In production, this would track participation
                          alert(`You've joined "${event.title}"! Your participation will be tracked and added to our collective impact. 🌱`);
                        }}
                        className="w-full px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg text-sm font-medium flex items-center justify-center space-x-2"
                      >
                        <Users className="w-4 h-4" />
                        <span>Join Event</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Inspiring Footer */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-primary-green rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-center space-x-2">
              <Leaf className="w-5 h-5 text-primary-green" />
              <span>Every Action Counts</span>
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>You're not alone.</strong> Join {collectiveStats.totalParticipants.toLocaleString()} others making a difference in real-time. 
              Every small step you take adds up to big change. See how your participation contributes to our collective impact above.
            </p>
            <p className="text-xs text-gray-600 italic">
              Together, we've saved enough energy to power {equivalents.homesPowered} homes, 
              planted the equivalent of {equivalents.treesPlanted} trees, 
              and removed {equivalents.carsRemoved} cars from the road. 
              <strong className="text-primary-green"> Your actions matter.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;

