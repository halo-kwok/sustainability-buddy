/**
 * Profile Component
 * 
 * Displays and allows editing of user profile information,
 * shows impact statistics, action history, and AI insights.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Edit2, Save, X, TrendingUp, Droplet, Trash2, 
  Download, Sparkles, Calendar, CheckCircle, XCircle,
  Car, Bike, Bus, Footprints, Home, ShoppingBag, Utensils, ArrowLeft
} from 'lucide-react';
import userProfile from '../utils/userProfile.js';
import { callAgenticAI } from '../utils/agenticAI.js';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(userProfile);
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [aiAcknowledgment, setAiAcknowledgment] = useState('');

  // Refresh profile data
  useEffect(() => {
    userProfile.loadFromStorage();
    setProfile({ ...userProfile });
  }, []);

  /**
   * Handle edit button click
   */
  const handleEdit = (section, data) => {
    setEditingSection(section);
    setEditData({ ...data });
  };

  /**
   * Cancel editing
   */
  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditData({});
    setAiAcknowledgment('');
  };

  /**
   * Save edited data
   */
  const handleSave = async () => {
    setLoading(true);
    
    try {
      if (editingSection === 'routine') {
        userProfile.updateRoutine(editData);
      } else if (editingSection === 'preferences') {
        userProfile.preferences = { ...userProfile.preferences, ...editData };
        userProfile.saveToStorage();
      } else if (editingSection === 'name') {
        userProfile.userName = editData.userName;
        userProfile.saveToStorage();
      }

      // Generate AI acknowledgment
      const acknowledgmentPrompt = `The user just updated their ${editingSection}. 
Acknowledge this change warmly and briefly (1 sentence).`;
      const response = await callAgenticAI(acknowledgmentPrompt, []);
      setAiAcknowledgment(response);

      // Refresh profile
      setProfile({ ...userProfile });
      setEditingSection(null);
      setEditData({});

      // Clear acknowledgment after 3 seconds
      setTimeout(() => setAiAcknowledgment(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load demo profile for testing/demo purposes
   */
  const handleLoadDemoProfile = () => {
    if (window.confirm('Load demo profile? This will replace your current profile with Alex Chen\'s demo data.')) {
      try {
        // Set demo user data
        userProfile.userName = "Alex Chen";
        userProfile.onboardingComplete = true;
        
        // Set routine
        userProfile.updateRoutine({
          commuteMethod: "car",
          commuteTime: "8:30 AM",
          dietType: "vegetarian",
          shoppingDay: "Saturday",
          workSchedule: "9-5"
        });

        // Set preferences
        userProfile.preferences = {
          budget: "medium",
          timeCommitment: "moderate",
          priorities: ["carbon", "waste"]
        };

        // Clear existing actions and add demo actions
        userProfile.history.actions = [];
        userProfile.history.totalImpact = { co2: 0, water: 0, waste: 0 };
        
        userProfile.addAction("Used public transit", true, "Great experience!");
        userProfile.addAction("Brought reusable bags to store", true, "Easy habit");
        userProfile.addAction("Meatless Monday meal", true, "Delicious!");

        // Add a demo rejection
        userProfile.addRejection(
          "Switch to electric car",
          "Too expensive for my budget"
        );

        // Save to storage
        userProfile.saveToStorage();
        
        // Refresh profile display
        setProfile({ ...userProfile });
        
        // Navigate to home (proactive suggestion will trigger automatically)
        navigate('/home');
      } catch (error) {
        console.error('Error loading demo profile:', error);
        alert('Failed to load demo profile. Please try again.');
      }
    }
  };

  /**
   * Logout - Clear profile and restart as new user
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? This will clear all your data and you\'ll need to complete onboarding again as a new user.')) {
      userProfile.clearProfile();
      navigate('/onboarding');
    }
  };

  /**
   * Export profile data as JSON
   */
  const handleExportData = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sustainability-buddy-profile-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /**
   * Generate AI insights
   */
  const handleAnalyzePatterns = async () => {
    setLoading(true);
    setAiInsights('');
    
    try {
      const insightsPrompt = `Analyze this user's sustainability profile and provide personalized insights:
${userProfile.getSummaryForAI()}

Provide 3-4 specific insights about their patterns, strengths, and opportunities for improvement. Be encouraging and actionable. Format as a brief paragraph.`;
      
      const response = await callAgenticAI(insightsPrompt, []);
      setAiInsights(response);
    } catch (error) {
      console.error('Error generating insights:', error);
      setAiInsights('Sorry, I encountered an error generating insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get icon for commute method
   */
  const getCommuteIcon = (method) => {
    switch (method) {
      case 'car': return <Car className="w-5 h-5" />;
      case 'bus': return <Bus className="w-5 h-5" />;
      case 'bike': return <Bike className="w-5 h-5" />;
      case 'walk': return <Footprints className="w-5 h-5" />;
      case 'remote': return <Home className="w-5 h-5" />;
      default: return <Car className="w-5 h-5" />;
    }
  };

  const recentActions = profile.history?.actions?.slice(-10).reverse() || [];
  const allActions = profile.history?.actions?.reverse() || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 safe-all py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link
              to="/home"
              className="p-2 hover:bg-white rounded-lg transition-smooth tap-target"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Sustainability Buddy Logo" className="w-10 h-10 object-contain"/>
              <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
            </div>
          </div>
          <button
            onClick={() => {
              // Scroll to routine section and start editing
              setEditingSection('routine');
              setEditData({ ...profile.routine });
              setTimeout(() => {
                document.querySelector('[data-section="routine"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
            className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg font-medium flex items-center space-x-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Update Profile</span>
          </button>
        </div>
        
        {/* Update Profile Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Keep your profile up to date! Your commute method, diet, time commitment, and priorities help me personalize suggestions. Click "Update Profile" or use the edit buttons on each section.
          </p>
        </div>

        {/* AI Acknowledgment Banner */}
        {aiAcknowledgment && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">{aiAcknowledgment}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                <User className="w-6 h-6 text-primary-green" />
                <span>Profile</span>
              </h2>
              {editingSection !== 'name' && (
                <button
                  onClick={() => handleEdit('name', { userName: profile.userName })}
                  className="text-gray-500 hover:text-primary-green transition-smooth tap-target"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {editingSection === 'name' ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.userName || ''}
                  onChange={(e) => setEditData({ userName: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading || !editData.userName}
                    className="flex-1 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition-smooth tap-target"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth tap-target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile.userName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {profile.userName || 'User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Member since {profile.lastActive ? new Date(profile.lastActive).toLocaleDateString() : 'today'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Total Impact Stats Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-primary-green" />
              <span>Your Collective Impact</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Small actions add up. Here's your measurable difference.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary-green" />
                  <span className="text-gray-700">CO₂ Saved</span>
                </div>
                <span className="text-2xl font-bold text-primary-green">
                  {profile.history?.totalImpact?.co2 || 0} lbs
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplet className="w-5 h-5 text-secondary-blue" />
                  <span className="text-gray-700">Water Saved</span>
                </div>
                <span className="text-2xl font-bold text-secondary-blue">
                  {profile.history?.totalImpact?.water || 0} gal
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Trash2 className="w-5 h-5 text-accent-amber" />
                  <span className="text-gray-700">Waste Reduced</span>
                </div>
                <span className="text-2xl font-bold text-accent-amber">
                  {profile.history?.totalImpact?.waste || 0} lbs
                </span>
              </div>
            </div>
          </div>

          {/* Routine Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6" data-section="routine">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary-green" />
                <span>Your Daily Rhythm</span>
              </h2>
              {editingSection !== 'routine' && (
                <button
                  onClick={() => handleEdit('routine', { ...profile.routine })}
                  className="text-gray-500 hover:text-primary-green transition-smooth tap-target"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">I've learned your routine so I can suggest actions at the perfect moments.</p>

            {editingSection === 'routine' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commute Method</label>
                  <select
                    value={editData.commuteMethod || ''}
                    onChange={(e) => setEditData({ ...editData, commuteMethod: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                  >
                    <option value="">Select...</option>
                    <option value="car">Car</option>
                    <option value="bus">Bus/Train</option>
                    <option value="bike">Bike</option>
                    <option value="walk">Walk</option>
                    <option value="remote">Work from home</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commute Time</label>
                  <input
                    type="text"
                    value={editData.commuteTime || ''}
                    onChange={(e) => setEditData({ ...editData, commuteTime: e.target.value })}
                    placeholder="e.g., 8:30 AM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                  <select
                    value={editData.dietType || ''}
                    onChange={(e) => setEditData({ ...editData, dietType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                  >
                    <option value="">Select...</option>
                    <option value="omnivore">No restrictions</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shopping Day</label>
                  <input
                    type="text"
                    value={editData.shoppingDay || ''}
                    onChange={(e) => setEditData({ ...editData, shoppingDay: e.target.value })}
                    placeholder="e.g., Saturday"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition-smooth tap-target"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth tap-target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  {getCommuteIcon(profile.routine?.commuteMethod)}
                  <span>
                    <strong>Commute:</strong> {profile.routine?.commuteMethod || 'Not set'}
                    {profile.routine?.commuteTime && ` at ${profile.routine.commuteTime}`}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Utensils className="w-5 h-5" />
                  <span><strong>Diet:</strong> {profile.routine?.dietType || 'Not set'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <ShoppingBag className="w-5 h-5" />
                  <span><strong>Shopping:</strong> {profile.routine?.shoppingDay || 'Not set'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Preferences Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary-green" />
                <span>What Works for You</span>
              </h2>
              {editingSection !== 'preferences' && (
                <button
                  onClick={() => handleEdit('preferences', { ...profile.preferences })}
                  className="text-gray-500 hover:text-primary-green transition-smooth tap-target"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">These constraints help me suggest realistic actions you'll actually complete.</p>

            {editingSection === 'preferences' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <select
                    value={editData.budget || 'medium'}
                    onChange={(e) => setEditData({ ...editData, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Commitment</label>
                  <select
                    value={editData.timeCommitment || 'moderate'}
                    onChange={(e) => setEditData({ ...editData, timeCommitment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target"
                  >
                    <option value="minimal">Minimal</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorities</label>
                  <div className="space-y-2">
                    {['carbon', 'waste', 'water', 'energy'].map((priority) => (
                      <label key={priority} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={(editData.priorities || []).includes(priority)}
                          onChange={(e) => {
                            const current = editData.priorities || [];
                            const updated = e.target.checked
                              ? [...current, priority]
                              : current.filter(p => p !== priority);
                            setEditData({ ...editData, priorities: updated });
                          }}
                          className="rounded border-gray-300 text-primary-green focus:ring-primary-green tap-target"
                        />
                        <span className="text-sm text-gray-700 capitalize">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition-smooth tap-target"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth tap-target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-gray-700">
                  <strong>Budget:</strong> {profile.preferences?.budget || 'medium'}
                </div>
                <div className="text-gray-700">
                  <strong>Time:</strong> {profile.preferences?.timeCommitment || 'moderate'}
                </div>
                <div className="text-gray-700">
                  <strong>Priorities:</strong>{' '}
                  {profile.preferences?.priorities?.length > 0
                    ? profile.preferences.priorities.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')
                    : 'None set'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action History Card - Your Journey */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-primary-green" />
              <span>Your Journey</span>
            </h2>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-primary-green hover:text-green-600 transition-smooth tap-target"
            >
              {showHistory ? 'Show Less' : `Show All (${allActions.length})`}
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">Every action teaches me what works for you.</p>
          <div className="space-y-3">
            {(showHistory ? allActions : recentActions).map((action, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                {action.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-gray-800">{action.action}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(action.date).toLocaleDateString()} • 
                    {action.impact && ` ${action.impact.co2} lbs CO₂, ${action.impact.water} gal water`}
                  </p>
                  {action.feedback && (
                    <p className="text-sm text-gray-600 mt-1 italic">"{action.feedback}"</p>
                  )}
                </div>
              </div>
            ))}
            {allActions.length === 0 && (
              <p className="text-gray-500 text-center py-4">No actions recorded yet.</p>
            )}
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary-green" />
            <span>Personalized Insights</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">Based on your actions and preferences, here's what I've learned about your sustainability journey.</p>
          <button
            onClick={handleAnalyzePatterns}
            disabled={loading}
            className="w-full px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition-smooth tap-target-lg font-medium flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze My Patterns</span>
              </>
            )}
          </button>
          {aiInsights && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{aiInsights}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-4">
          {/* Demo Profile Loader (for testing/demo) */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 mb-3">
              <strong>Demo Mode:</strong> Load a complete demo profile instantly for testing or demonstrations.
            </p>
            <button
              onClick={handleLoadDemoProfile}
              className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-smooth tap-target-lg font-medium flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Load Demo Profile</span>
            </button>
          </div>

          {/* Other Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExportData}
              className="flex-1 px-6 py-3 bg-white border-2 border-primary-green text-primary-green rounded-lg hover:bg-green-50 transition-smooth tap-target-lg font-medium flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-6 py-3 bg-red-50 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition-smooth tap-target-lg font-medium flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

