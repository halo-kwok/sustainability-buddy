import { Wind, Droplets, Users, Map, ListChecks, UsersRound, Instagram } from 'lucide-react';
import { ImpactStatCard } from './ImpactStatCard';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-500 to-blue-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="text-center py-4">
          <h1 className="text-gray-800 mb-2">Welcome back, Alex 🌎</h1>
          <p className="text-gray-800 font-bold">When small steps add up, they change the world.</p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100">
                <Wind className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl text-emerald-600">45 kg</div>
                <div className="text-gray-600 text-sm">CO₂ Saved</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-2 border-blue-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl text-blue-600">320 L</div>
                <div className="text-gray-600 text-sm">Water Saved</div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 rounded-2xl border-2 border-cyan-200 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('challenges')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-100">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <div className="text-2xl text-cyan-600">8</div>
                <div className="text-gray-600 text-sm">Challenges Joined</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Ring */}
        <Card className="p-8 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm">
          <div className="text-center space-y-6">
            <h2 className="text-emerald-700">Today's Tasks</h2>
            
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#d1fae5"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#10b981"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.6)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl text-emerald-600">3/5</div>
                <div className="text-gray-600 text-sm">Tasks Done</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-emerald-600">+45 leaves earned today!</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('tasks')}
            className="h-auto py-8 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <ListChecks className="w-8 h-8" />
              <span>Daily Tasks</span>
            </div>
          </Button>

          <Button
            onClick={() => onNavigate('taskTable')}
            className="h-auto py-8 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <ListChecks className="w-8 h-8" />
              <span>All Tasks</span>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('map')}
            className="h-auto py-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <Map className="w-8 h-8" />
              <span>Map</span>
            </div>
          </Button>

          <Button
            onClick={() => onNavigate('community')}
            className="h-auto py-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <UsersRound className="w-8 h-8" />
              <span>Community</span>
            </div>
          </Button>
        </div>

        {/* Share Impact Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => {
              // Share impact to Instagram
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
