/**
 * ActionTracker Component
 * 
 * Tracks and manages user sustainability actions across different states:
 * active, completed, and suggested actions.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Circle, Sparkles, TrendingUp, Droplet, Trash2,
  Car, Bike, Bus, Footprints, Utensils, Zap, Home, ShoppingBag,
  Info, X, PartyPopper, Clock, MoreVertical, ArrowLeft
} from 'lucide-react';
import userProfile from '../utils/userProfile.js';
import { callAgenticAI, generateProactiveSuggestion } from '../utils/agenticAI.js';

function ActionTracker() {
  const [activeTab, setActiveTab] = useState('active');
  const [filter, setFilter] = useState('all');
  const [actions, setActions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(null);
  const [showReasoning, setShowReasoning] = useState(null);
  const [showFeedback, setShowFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(null);

  // Load actions on mount and when userProfile changes
  useEffect(() => {
    loadActions();
    loadSuggestions();
  }, []);

  /**
   * Load actions from userProfile
   */
  const loadActions = () => {
    const allActions = userProfile.history?.actions || [];
    setActions(allActions);
  };

  /**
   * Load suggested actions (from proactive suggestions)
   */
  const loadSuggestions = async () => {
    try {
      const suggestion = await generateProactiveSuggestion();
      setSuggestions([suggestion]);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  /**
   * Get icon for action category
   */
  const getCategoryIcon = (actionText) => {
    const lower = actionText.toLowerCase();
    if (lower.includes('car') || lower.includes('drive') || lower.includes('commute')) {
      return <Car className="w-5 h-5" />;
    }
    if (lower.includes('bike') || lower.includes('cycle')) {
      return <Bike className="w-5 h-5" />;
    }
    if (lower.includes('bus') || lower.includes('transit') || lower.includes('train')) {
      return <Bus className="w-5 h-5" />;
    }
    if (lower.includes('walk')) {
      return <Footprints className="w-5 h-5" />;
    }
    if (lower.includes('food') || lower.includes('meal') || lower.includes('diet') || lower.includes('vegetarian') || lower.includes('vegan')) {
      return <Utensils className="w-5 h-5" />;
    }
    if (lower.includes('energy') || lower.includes('power') || lower.includes('electric')) {
      return <Zap className="w-5 h-5" />;
    }
    if (lower.includes('shop') || lower.includes('buy') || lower.includes('purchase')) {
      return <ShoppingBag className="w-5 h-5" />;
    }
    if (lower.includes('home') || lower.includes('house')) {
      return <Home className="w-5 h-5" />;
    }
    return <Sparkles className="w-5 h-5" />;
  };

  /**
   * Get category from action text
   */
  const getCategory = (actionText) => {
    const lower = actionText.toLowerCase();
    if (lower.includes('car') || lower.includes('drive') || lower.includes('commute') || lower.includes('bike') || lower.includes('transit') || lower.includes('walk')) {
      return 'transport';
    }
    if (lower.includes('food') || lower.includes('meal') || lower.includes('diet') || lower.includes('vegetarian') || lower.includes('vegan')) {
      return 'food';
    }
    if (lower.includes('energy') || lower.includes('power') || lower.includes('electric')) {
      return 'energy';
    }
    if (lower.includes('waste') || lower.includes('recycle') || lower.includes('trash') || lower.includes('compost')) {
      return 'waste';
    }
    return 'all';
  };

  /**
   * Get difficulty level (simple heuristic)
   */
  const getDifficulty = (actionText) => {
    const lower = actionText.toLowerCase();
    const easyKeywords = ['walk', 'turn off', 'unplug', 'reusable bag'];
    const hardKeywords = ['install', 'switch', 'replace', 'upgrade'];
    
    if (easyKeywords.some(kw => lower.includes(kw))) return { level: 'Easy', color: 'bg-green-100 text-green-700' };
    if (hardKeywords.some(kw => lower.includes(kw))) return { level: 'Hard', color: 'bg-red-100 text-red-700' };
    return { level: 'Medium', color: 'bg-yellow-100 text-yellow-700' };
  };

  /**
   * Filter actions based on current filter
   */
  const getFilteredActions = () => {
    let filtered = [];
    
    if (activeTab === 'active') {
      // Active actions are those that are not completed (success = false or not set)
      filtered = actions.filter(a => !a.success);
    } else if (activeTab === 'completed') {
      // Completed actions
      filtered = actions.filter(a => a.success);
    } else if (activeTab === 'suggested') {
      // Return suggestions
      return suggestions;
    }

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(a => getCategory(a.action || a.message || '') === filter);
    }

    return filtered;
  };

  /**
   * Handle action completion
   */
  const handleCompleteAction = async (action) => {
    // Mark as completed
    const actionIndex = actions.findIndex(a => a.action === action.action && a.date === action.date);
    if (actionIndex !== -1) {
      actions[actionIndex].success = true;
      actions[actionIndex].completedDate = new Date().toISOString();
      
      // Update total impact
      if (action.impact) {
        userProfile.history.totalImpact.co2 += action.impact.co2 || 0;
        userProfile.history.totalImpact.water += action.impact.water || 0;
        userProfile.history.totalImpact.waste += action.impact.waste || 0;
      }
      
      userProfile.saveToStorage();
      loadActions();
    }

    // Show success modal
    setShowSuccessModal(action);
  };

  /**
   * Submit feedback
   */
  const handleSubmitFeedback = () => {
    if (showSuccessModal && feedbackText) {
      const actionIndex = actions.findIndex(a => 
        a.action === showSuccessModal.action && a.date === showSuccessModal.date
      );
      if (actionIndex !== -1) {
        actions[actionIndex].feedback = feedbackText;
        userProfile.saveToStorage();
        loadActions();
      }
    }
    
    setShowFeedback(false);
    setFeedbackText('');
    setShowSuccessModal(null);
    
    // Generate new suggestion
    loadSuggestions();
  };

  /**
   * Handle accept suggestion
   */
  const handleAcceptSuggestion = (suggestion) => {
    // Add to actions
    userProfile.addAction(suggestion.action, false, 'Accepted from suggestions');
    loadActions();
    
    // Remove from suggestions
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

  /**
   * Handle reject suggestion
   */
  const handleRejectSuggestion = (suggestion) => {
    userProfile.addRejection(suggestion.action, 'Not interested');
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

  /**
   * Get reasoning for action
   */
  const getReasoning = async (action) => {
    try {
      const prompt = `Explain why this sustainability action is beneficial: "${action.action || action.message}". 
Keep it brief (1-2 sentences.`;
      const reasoning = await callAgenticAI(prompt, []);
      return reasoning;
    } catch (error) {
      return 'This action helps reduce your environmental impact.';
    }
  };

  const filteredActions = getFilteredActions();
  const categories = ['all', 'food', 'transport', 'energy', 'waste'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 safe-all">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center space-x-3 mb-6">
          <Link
            to="/home"
            className="p-2 hover:bg-white rounded-lg transition-smooth tap-target"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <img src="/logo.png" alt="Sustainability Buddy Logo" className="w-10 h-10 object-contain"/>
          <h1 className="text-3xl font-bold text-gray-800">Action Tracker</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-4">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'active', label: 'Active', icon: Circle },
              { id: 'completed', label: 'Completed', icon: CheckCircle2 },
              { id: 'suggested', label: 'Suggested', icon: Sparkles }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 px-4 py-3 flex items-center justify-center space-x-2 transition-smooth tap-target-lg ${
                  activeTab === id
                    ? 'border-b-2 border-primary-green text-primary-green font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Chips */}
        {activeTab !== 'suggested' && (
          <div className="flex space-x-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth tap-target ${
                  filter === cat
                    ? 'bg-primary-green text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Action Cards */}
        <div className="space-y-4">
          {filteredActions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">
                {activeTab === 'active' && 'No active actions. Check out suggestions!'}
                {activeTab === 'completed' && 'No completed actions yet. Start tracking your progress!'}
                {activeTab === 'suggested' && 'No new suggestions at the moment.'}
              </p>
            </div>
          ) : (
            filteredActions.map((action, index) => {
              const actionText = action.action || action.message || '';
              const difficulty = getDifficulty(actionText);
              const category = getCategory(actionText);
              const isCompleted = action.success || activeTab === 'completed';
              const isSuggestion = activeTab === 'suggested';

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-smooth"
                >
                  <div className="flex items-start space-x-3">
                    {/* Checkbox (only for active tab) */}
                    {activeTab === 'active' && !isCompleted && (
                      <button
                        onClick={() => handleCompleteAction(action)}
                        className="mt-1 tap-target"
                      >
                        <Circle className="w-6 h-6 text-gray-400 hover:text-primary-green transition-smooth" />
                      </button>
                    )}

                    {/* Icon */}
                    <div className="mt-1 text-primary-green">
                      {getCategoryIcon(actionText)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {actionText}
                          </h3>
                          {action.feedback && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {action.feedback}
                            </p>
                          )}
                        </div>

                        {/* More options button */}
                        <button
                          onClick={() => setShowMoreOptions(showMoreOptions === index ? null : index)}
                          className="ml-2 text-gray-400 hover:text-gray-600 tap-target"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          {/* Difficulty badge */}
                          <span className={`px-2 py-1 rounded text-xs font-medium ${difficulty.color}`}>
                            {difficulty.level}
                          </span>
                          
                          {/* Impact badge */}
                          {action.impact?.co2 > 0 && (
                            <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 rounded">
                              <TrendingUp className="w-3 h-3 text-primary-green" />
                              <span className="text-xs text-gray-700">
                                {action.impact.co2} lbs CO₂
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Why this? button */}
                        {isSuggestion && (
                          <button
                            onClick={async () => {
                              const reasoning = await getReasoning(action);
                              setShowReasoning({ action, reasoning });
                            }}
                            className="flex items-center space-x-1 text-xs text-primary-green hover:text-green-600 tap-target"
                          >
                            <Info className="w-4 h-4" />
                            <span>Why this?</span>
                          </button>
                        )}

                        {/* Completion date */}
                        {isCompleted && action.completedDate && (
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>{new Date(action.completedDate).toLocaleDateString()}</span>
                            <span className="ml-1">🎉</span>
                          </div>
                        )}
                      </div>

                      {/* More options menu */}
                      {showMoreOptions === index && (
                        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                          {activeTab === 'active' && (
                            <>
                              <button
                                onClick={() => {
                                  handleCompleteAction(action);
                                  setShowMoreOptions(null);
                                }}
                                className="w-full px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target text-sm text-left flex items-center space-x-2"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Mark Complete</span>
                              </button>
                              <button
                                onClick={() => {
                                  // Snooze functionality
                                  setShowMoreOptions(null);
                                }}
                                className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-smooth tap-target text-sm text-left flex items-center space-x-2"
                              >
                                <Clock className="w-4 h-4" />
                                <span>Snooze</span>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => {
                              // Delete functionality
                              const updated = actions.filter((a, i) => 
                                a.action !== action.action || a.date !== action.date
                              );
                              setActions(updated);
                              setShowMoreOptions(null);
                            }}
                            className="w-full px-3 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-smooth tap-target text-sm text-left flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}

                      {/* Suggestion actions */}
                      {isSuggestion && (
                        <div className="mt-3 pt-3 border-t border-gray-200 flex space-x-2">
                          <button
                            onClick={() => handleAcceptSuggestion(action)}
                            className="flex-1 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg text-sm font-medium"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectSuggestion(action)}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-smooth tap-target-lg text-sm"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-slide-down">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-3">
                <PartyPopper className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Awesome! 🎉</h3>
              <p className="text-gray-600 mb-4">You completed: {showSuccessModal.action}</p>
              {showSuccessModal.impact && (
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 mb-1">Your impact:</p>
                  <div className="flex justify-center space-x-4">
                    {showSuccessModal.impact.co2 > 0 && (
                      <div>
                        <p className="text-lg font-bold text-primary-green">{showSuccessModal.impact.co2}</p>
                        <p className="text-xs text-gray-600">lbs CO₂</p>
                      </div>
                    )}
                    {showSuccessModal.impact.water > 0 && (
                      <div>
                        <p className="text-lg font-bold text-secondary-blue">{showSuccessModal.impact.water}</p>
                        <p className="text-xs text-gray-600">gal water</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {!showFeedback ? (
              <button
                onClick={() => setShowFeedback(true)}
                className="w-full px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg font-medium"
              >
                How was this?
              </button>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green tap-target min-h-[100px]"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSubmitFeedback}
                    className="flex-1 px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg font-medium"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setShowSuccessModal(null);
                    }}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-smooth tap-target-lg"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reasoning Tooltip */}
      {showReasoning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-slide-down">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Why this action?</h3>
              <button
                onClick={() => setShowReasoning(null)}
                className="text-gray-400 hover:text-gray-600 tap-target"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-700">{showReasoning.reasoning}</p>
            <button
              onClick={() => setShowReasoning(null)}
              className="mt-4 w-full px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionTracker;

