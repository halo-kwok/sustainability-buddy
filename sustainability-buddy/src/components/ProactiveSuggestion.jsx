/**
 * ProactiveSuggestion Component
 * 
 * Displays AI-generated sustainability suggestions with action buttons
 * and handles user responses (accept, remind later, reject).
 */

import { useState, useEffect } from 'react';
import { 
  Sparkles, ChevronDown, ChevronUp, X, CheckCircle, 
  Clock, ThumbsDown, PartyPopper
} from 'lucide-react';
import userProfile from '../utils/userProfile.js';
import { generateProactiveSuggestion } from '../utils/agenticAI.js';

function ProactiveSuggestion({ suggestion: initialSuggestion, onDismiss }) {
  const [suggestion, setSuggestion] = useState(initialSuggestion);
  const [showReasoning, setShowReasoning] = useState(false);
  const [loading, setLoading] = useState(!initialSuggestion);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState('');

  // Check for queued reminders on mount
  useEffect(() => {
    checkQueuedReminders();
    if (!initialSuggestion) {
      generateNewSuggestion();
    }
  }, []);

  /**
   * Check if there's a queued reminder that's ready
   */
  const checkQueuedReminders = () => {
    const reminders = JSON.parse(localStorage.getItem('sbReminders') || '[]');
    const now = new Date();
    
    const readyReminder = reminders.find(reminder => {
      const reminderTime = new Date(reminder.timestamp);
      return reminderTime <= now;
    });

    if (readyReminder) {
      setSuggestion(readyReminder.suggestion);
      // Remove from queue
      const updatedReminders = reminders.filter(r => r.id !== readyReminder.id);
      localStorage.setItem('sbReminders', JSON.stringify(updatedReminders));
    }
  };

  /**
   * Generate a new proactive suggestion
   */
  const generateNewSuggestion = async () => {
    setLoading(true);
    try {
      const newSuggestion = await generateProactiveSuggestion();
      setSuggestion(newSuggestion);
    } catch (error) {
      console.error('Error generating suggestion:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle "Let's do it!" button
   */
  const handleAccept = () => {
    if (!suggestion) return;

    // Add to user profile actions
    userProfile.addAction(suggestion.action, true, 'Completed proactive suggestion');
    
    // Show celebration
    setShowCelebration(true);
    
    // Dismiss after celebration
    setTimeout(() => {
      setShowCelebration(false);
      if (onDismiss) {
        onDismiss();
      }
    }, 3000);
  };

  /**
   * Handle "Remind me later" button
   */
  const handleRemindLater = () => {
    setShowReminderModal(true);
  };

  /**
   * Set reminder time
   */
  const setReminder = (hours) => {
    if (!suggestion) return;

    const now = new Date();
    const reminderTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    
    const reminders = JSON.parse(localStorage.getItem('sbReminders') || '[]');
    reminders.push({
      id: Date.now().toString(),
      suggestion: suggestion,
      timestamp: reminderTime.toISOString()
    });
    localStorage.setItem('sbReminders', JSON.stringify(reminders));

    setShowReminderModal(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  /**
   * Handle "Not interested" button
   */
  const handleNotInterested = () => {
    setShowFeedbackModal(true);
  };

  /**
   * Submit feedback and record rejection
   */
  const submitFeedback = () => {
    if (!suggestion) return;

    userProfile.addRejection(suggestion.action, feedbackReason || 'No reason provided');
    
    setShowFeedbackModal(false);
    setFeedbackReason('');
    if (onDismiss) {
      onDismiss();
    }
  };

  if (loading) {
    return (
      <div className="bg-white border-2 border-primary-green rounded-lg shadow-lg p-6 mb-4 animate-slide-down">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
          <span className="ml-3 text-gray-600">Generating your personalized suggestion...</span>
        </div>
      </div>
    );
  }

  if (!suggestion) {
    return null;
  }

  return (
    <>
      {/* Main Suggestion Card */}
      <div className="bg-white border-2 border-primary-green rounded-lg shadow-lg p-6 mb-4 animate-slide-down">
        {/* Header with Agent Avatar */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/agent-avatar.png" 
              alt="Eco-Coach" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Sustainability Tip</h3>
              <p className="text-xs text-gray-500">Personalized for you</p>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-smooth tap-target"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Suggestion Message */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">{suggestion.message}</p>
        </div>

        {/* Impact Badge */}
        <div className="flex items-center space-x-4 mb-4 p-3 bg-green-50 rounded-lg">
          {suggestion.impact.co2 > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-700">CO₂:</span>
              <span className="text-sm font-bold text-primary-green">
                {suggestion.impact.co2} lbs
              </span>
            </div>
          )}
          {suggestion.impact.water > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-700">Water:</span>
              <span className="text-sm font-bold text-secondary-blue">
                {suggestion.impact.water} gal
              </span>
            </div>
          )}
          {suggestion.impact.waste > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-700">Waste:</span>
              <span className="text-sm font-bold text-accent-amber">
                {suggestion.impact.waste} lbs
              </span>
            </div>
          )}
        </div>

        {/* Why Now? Collapsible Section */}
        <div className="mb-4">
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-smooth tap-target"
          >
            <span className="text-sm font-medium text-gray-700">Why now?</span>
            {showReasoning ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {showReasoning && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">{suggestion.reasoning}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleAccept}
            className="px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg font-medium text-sm flex items-center justify-center space-x-1"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Let's do it!</span>
            <span className="sm:hidden">Do it</span>
          </button>
          <button
            onClick={handleRemindLater}
            className="px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-smooth tap-target-lg font-medium text-sm flex items-center justify-center space-x-1"
          >
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Later</span>
            <span className="sm:hidden">Later</span>
          </button>
          <button
            onClick={handleNotInterested}
            className="px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-smooth tap-target-lg font-medium text-sm flex items-center justify-center space-x-1"
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="hidden sm:inline">No thanks</span>
            <span className="sm:hidden">No</span>
          </button>
        </div>
      </div>

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-slide-down">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">When should I remind you?</h3>
            <div className="space-y-2">
              <button
                onClick={() => setReminder(1)}
                className="w-full px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg"
              >
                In 1 hour
              </button>
              <button
                onClick={() => setReminder(3)}
                className="w-full px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg"
              >
                In 3 hours
              </button>
              <button
                onClick={() => setReminder(24)}
                className="w-full px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg"
              >
                Tomorrow
              </button>
              <button
                onClick={() => setShowReminderModal(false)}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-smooth tap-target-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-slide-down">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Why not interested?</h3>
            <p className="text-sm text-gray-600 mb-4">This helps me suggest better things in the future.</p>
            <textarea
              value={feedbackReason}
              onChange={(e) => setFeedbackReason(e.target.value)}
              placeholder="e.g., Too expensive, not feasible right now, already doing this..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green mb-4 tap-target min-h-[100px]"
            />
            <div className="flex space-x-2">
              <button
                onClick={submitFeedback}
                className="flex-1 px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackReason('');
                }}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-smooth tap-target-lg"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center animate-slide-down">
            <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
              <PartyPopper className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Awesome! 🎉</h3>
            <p className="text-gray-600 mb-4">
              You're making a difference! Keep it up!
            </p>
            {suggestion.impact && (
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">Your impact:</p>
                <div className="flex justify-center space-x-4">
                  {suggestion.impact.co2 > 0 && (
                    <div>
                      <p className="text-2xl font-bold text-primary-green">{suggestion.impact.co2}</p>
                      <p className="text-xs text-gray-600">lbs CO₂</p>
                    </div>
                  )}
                  {suggestion.impact.water > 0 && (
                    <div>
                      <p className="text-2xl font-bold text-secondary-blue">{suggestion.impact.water}</p>
                      <p className="text-xs text-gray-600">gal water</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProactiveSuggestion;

