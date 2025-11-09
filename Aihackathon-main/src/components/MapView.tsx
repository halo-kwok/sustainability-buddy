import { MapPin, Calendar, Users, Award, Navigation, Bus, Bike, Train, Instagram } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MapViewProps {
  onBack: () => void;
}

export function MapView({ onBack }: MapViewProps) {
  const events = [
    { id: 1, name: 'Beach Cleanup', date: 'Nov 10, 2025', location: 'Sunset Beach', attendees: 24 },
    { id: 2, name: 'Tree Planting Day', date: 'Nov 12, 2025', location: 'City Park', attendees: 42 },
    { id: 3, name: 'Recycling Workshop', date: 'Nov 15, 2025', location: 'Community Center', attendees: 18 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-500 to-blue-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="rounded-xl"
          >
            ← Back
          </Button>
          <h1 className="text-gray-800">Map & Community</h1>
        </div>

        {/* Community Challenge Banner */}
        <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg text-white overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  <span className="text-sm opacity-90">Team Challenge</span>
                </div>
                <h2 className="text-white">Your team reduced 120 kg CO₂ this week! 🎉</h2>
                <p className="text-emerald-100 text-sm">Ranking: #3 out of 47 teams</p>
              </div>
              <div className="text-5xl">🏅</div>
            </div>
            
            <div className="mt-4 flex gap-4">
              <div className="flex-1 bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl">24</div>
                <div className="text-sm text-emerald-100">Team Members</div>
              </div>
              <div className="flex-1 bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl">856</div>
                <div className="text-sm text-emerald-100">Total Points</div>
              </div>
            </div>
          </div>
          
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        </Card>

        {/* Map Area */}
        <Card className="rounded-2xl border-2 border-blue-200 overflow-hidden shadow-sm">
          <div className="relative h-80 bg-gradient-to-br from-blue-100 to-emerald-100">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1605615923013-f26c14fe7155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGVhcnRofGVufDF8fHx8MTc2MjU3MjYzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Map view"
              className="w-full h-full object-cover opacity-30"
            />
            
            {/* Map Pins */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2">
                  <div className="bg-emerald-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4 transform translate-x-1/2">
                  <div className="bg-blue-500 text-white p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-cyan-500 text-white p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.4s' }}>
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Map overlay text */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <Badge className="bg-white text-gray-800 border-2 border-emerald-200 rounded-xl px-4 py-2">
                <Navigation className="w-4 h-4 mr-2" />
                3 events nearby
              </Badge>
            </div>
          </div>
        </Card>

        {/* Upcoming Events List */}
        <div className="space-y-4">
          <h2 className="text-gray-800">Upcoming Events</h2>
          
          {events.map((event) => (
            <Card
              key={event.id}
              className="p-6 rounded-2xl border-2 border-blue-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-gray-800">{event.name}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>

                <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600">
                  Join
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Local Transport Information */}
        <div className="space-y-4">
          <h2 className="text-gray-800">Local Transport Information</h2>
          
          <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200">
                  <Bus className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800">Public Transit</h3>
                  <p className="text-sm text-gray-600 mt-1">Metro Line 2, Bus Routes 12, 45, 67</p>
                  <p className="text-sm text-emerald-600 mt-1">Save up to 2.3 kg CO₂ per day</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200">
                  <Bike className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800">Bike Share Stations</h3>
                  <p className="text-sm text-gray-600 mt-1">3 stations within 0.5 miles</p>
                  <p className="text-sm text-emerald-600 mt-1">Save up to 3.1 kg CO₂ per day</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200">
                  <Train className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800">Train Stations</h3>
                  <p className="text-sm text-gray-600 mt-1">Central Station - 0.8 miles away</p>
                  <p className="text-sm text-emerald-600 mt-1">Save up to 4.2 kg CO₂ per trip</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Local Nonprofits */}
        <Card className="p-6 rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-cyan-900">Partner Organizations</h3>
              <p className="text-sm text-cyan-700 mt-1">Connect with local eco-nonprofits</p>
            </div>
            <Button variant="outline" className="rounded-xl border-2 border-cyan-300 hover:bg-cyan-100">
              View All
            </Button>
          </div>
        </Card>

        {/* Share Impact Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => {
              alert('Share your impact to Instagram! 🌍');
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <span>Share Impact</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
