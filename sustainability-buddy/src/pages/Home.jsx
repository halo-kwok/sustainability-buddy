/**
 * Home Component
 * 
 * Main dashboard/home page after onboarding
 * Displays proactive suggestions, quick stats, and navigation
 */

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, TrendingUp, Droplet, Trash2, MessageCircle, 
  CheckCircle2, Sparkles, Calendar, ArrowRight, MapPin
} from 'lucide-react';
import userProfile from '../utils/userProfile.js';
import ProactiveSuggestion from '../components/ProactiveSuggestion.jsx';

function Home() {
  const navigate = useNavigate();
  const [proactiveSuggestion, setProactiveSuggestion] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [stats, setStats] = useState({
    totalActions: 0,
    completedActions: 0,
    totalImpact: { co2: 0, water: 0, waste: 0 }
  });

  useEffect(() => {
    // Redirect to onboarding if not complete
    if (!userProfile.onboardingComplete) {
      navigate('/onboarding');
    }
    
    // Load stats
    loadStats();
  }, [navigate]);

  /**
   * Load user statistics
   */
  const loadStats = () => {
    const actions = userProfile.history?.actions || [];
    const completed = actions.filter(a => a.success).length;
    
    setStats({
      totalActions: actions.length,
      completedActions: completed,
      totalImpact: userProfile.history?.totalImpact || { co2: 0, water: 0, waste: 0 }
    });
  };

  /**
   * Get recent actions (last 3)
   */
  const getRecentActions = () => {
    const actions = userProfile.history?.actions || [];
    return actions
      .filter(a => a.success)
      .slice(-3)
      .reverse();
  };

  /**
   * Get active actions count
   */
  const getActiveActionsCount = () => {
    const actions = userProfile.history?.actions || [];
    return actions.filter(a => !a.success).length;
  };

  const recentActions = getRecentActions();
  const activeActionsCount = getActiveActionsCount();
  const successRate = stats.totalActions > 0 
    ? Math.round((stats.completedActions / stats.totalActions) * 100) 
    : 0;

  return (
    <div 
      className="min-h-screen safe-all relative"
      style={{
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          {/* Logo - Prominent Display */}
          <div className="flex justify-center mb-4">
            <img 
              src="/home-logo.png" 
              alt="Sustainability Buddy Logo" 
              className="h-40 md:h-48 w-auto object-contain drop-shadow-lg"
            />
          </div>
          
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {userProfile.userName || 'there'}! 🌱
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Link
              to="/profile"
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-smooth tap-target"
            >
              <User className="w-6 h-6 text-primary-green" />
            </Link>
          </div>
        </div>

        {/* Proactive Suggestion */}
        {showSuggestion && (
          <div className="mb-6">
            <ProactiveSuggestion 
              suggestion={proactiveSuggestion}
              onDismiss={() => setShowSuggestion(false)} 
            />
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Total Impact - CO₂ */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary-green" />
              <span className="text-xs text-gray-600">CO₂ Saved</span>
            </div>
            <p className="text-2xl font-bold text-primary-green">
              {stats.totalImpact.co2}
            </p>
            <p className="text-xs text-gray-500">lbs</p>
          </div>

          {/* Total Impact - Water */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Droplet className="w-5 h-5 text-secondary-blue" />
              <span className="text-xs text-gray-600">Water Saved</span>
            </div>
            <p className="text-2xl font-bold text-secondary-blue">
              {stats.totalImpact.water}
            </p>
            <p className="text-xs text-gray-500">gal</p>
          </div>

          {/* Completed Actions */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-xs text-gray-600">Completed</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {stats.completedActions}
            </p>
            <p className="text-xs text-gray-500">actions</p>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent-amber" />
              <span className="text-xs text-gray-600">Success Rate</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {successRate}%
            </p>
            <p className="text-xs text-gray-500">completion</p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Action Tracker Card */}
          <Link
            to="/actions"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-smooth tap-target-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Action Tracker</h3>
                  <p className="text-sm text-gray-600">
                    {activeActionsCount} active {activeActionsCount === 1 ? 'action' : 'actions'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Track your sustainability actions and see your progress
            </p>
          </Link>

          {/* Chat with Coach Card */}
          <Link
            to="/chat"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-smooth tap-target-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary-blue rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Chat with Coach</h3>
                  <p className="text-sm text-gray-600">Get personalized advice</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Ask questions and get sustainability tips from your AI coach
            </p>
          </Link>

          {/* Local Events Card */}
          <Link
            to="/events"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-smooth tap-target-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent-amber rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Local Events</h3>
                  <p className="text-sm text-gray-600">Find events near you</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Discover farmers' markets, recycling events, and more
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        {recentActions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary-green" />
                <span>Recent Activity</span>
              </h2>
              <Link
                to="/actions"
                className="text-sm text-primary-green hover:text-green-600 transition-smooth tap-target"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{action.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(action.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      {action.impact?.co2 > 0 && (
                        <span className="ml-2">
                          • {action.impact.co2} lbs CO₂ saved
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for New Users */}
        {stats.totalActions === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ready to make a difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Start by accepting a suggestion above or chat with your coach to get personalized tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/chat"
                className="px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg font-medium"
              >
                Chat with Coach
              </Link>
              <Link
                to="/actions"
                className="px-6 py-3 bg-white border-2 border-primary-green text-primary-green rounded-lg hover:bg-green-50 transition-smooth tap-target-lg font-medium"
              >
                View Actions
              </Link>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Home;


