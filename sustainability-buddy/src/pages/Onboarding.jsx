/**
 * Onboarding Component
 * 
 * Interactive chat-style onboarding flow that collects user information
 * and uses AI to provide personalized acknowledgments.
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageCircle, Send, SkipForward, Loader2, ArrowLeft } from 'lucide-react';
import userProfile from '../utils/userProfile.js';
import {
  getNameAcknowledgment,
  getCommuteAcknowledgment,
  getCommuteTimeAcknowledgment,
  getDietAcknowledgment,
  getShoppingDayAcknowledgment,
  getPrioritiesAcknowledgment,
  getTimeCommitmentAcknowledgment,
  getCompletionMessage
} from '../utils/onboardingAcknowledgments.js';

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [aiAcknowledgment, setAiAcknowledgment] = useState('');
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, aiAcknowledgment, currentStep]);

  // Focus input on step change
  useEffect(() => {
    if (currentStep === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  // Onboarding questions configuration
  const onboardingSteps = [
    {
      question: "Hi! I'm your AI sustainability coach. What should I call you?",
      inputType: 'text',
      placeholder: 'Enter your name...',
      field: 'userName'
    },
    {
      question: "Tell me about your commute. How do you usually get to work?",
      inputType: 'buttons',
      options: [
        { label: 'Car', value: 'car' },
        { label: 'Bus/Train', value: 'bus' },
        { label: 'Bike', value: 'bike' },
        { label: 'Walk', value: 'walk' },
        { label: 'Work from home', value: 'remote' }
      ],
      field: 'commuteMethod'
    },
    {
      question: "What time do you usually leave?",
      inputType: 'text',
      placeholder: 'e.g., 8:30 AM',
      field: 'commuteTime'
    },
    {
      question: "Any dietary preferences?",
      inputType: 'buttons',
      options: [
        { label: 'No restrictions', value: 'omnivore' },
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Pescatarian', value: 'pescatarian' }
      ],
      field: 'dietType'
    },
    {
      question: "What day do you usually go shopping?",
      inputType: 'buttons',
      options: [
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
        { label: 'Weekday', value: 'Weekday' },
        { label: 'Flexible', value: 'flexible' }
      ],
      field: 'shoppingDay'
    },
    {
      question: "What's your biggest environmental concern?",
      inputType: 'buttons',
      options: [
        { label: 'Climate', value: 'carbon' },
        { label: 'Waste', value: 'waste' },
        { label: 'Water', value: 'water' },
        { label: 'Energy', value: 'energy' },
        { label: 'All of it!', value: 'all' }
      ],
      field: 'priorities',
      multiSelect: true
    },
    {
      question: "How much time can you dedicate weekly to sustainability?",
      inputType: 'buttons',
      options: [
        { label: '<30 min', value: 'minimal' },
        { label: '30-60 min', value: 'moderate' },
        { label: '1-2 hours', value: 'high' },
        { label: '2+ hours', value: 'very-high' }
      ],
      field: 'timeCommitment'
    }
  ];

  /**
   * Generate acknowledgment for user's response using predefined messages
   */
  const generateAcknowledgment = (step, answer) => {
    const stepInfo = onboardingSteps[step];
    let acknowledgment = '';
    
    switch (stepInfo.field) {
      case 'userName':
        acknowledgment = getNameAcknowledgment(answer);
        break;
      case 'commuteMethod':
        acknowledgment = getCommuteAcknowledgment(answer);
        break;
      case 'commuteTime':
        acknowledgment = getCommuteTimeAcknowledgment(answer);
        break;
      case 'dietType':
        acknowledgment = getDietAcknowledgment(answer);
        break;
      case 'shoppingDay':
        acknowledgment = getShoppingDayAcknowledgment(answer);
        break;
      case 'priorities':
        // Handle priorities (can be array or 'all')
        const priorities = Array.isArray(answer) ? answer : (answer === 'all' ? ['carbon', 'waste', 'water', 'energy'] : [answer]);
        acknowledgment = getPrioritiesAcknowledgment(priorities);
        break;
      case 'timeCommitment':
        acknowledgment = getTimeCommitmentAcknowledgment(answer);
        break;
      default:
        acknowledgment = 'Thanks! Let\'s continue.';
    }
    
    setAiAcknowledgment(acknowledgment);
    
    // Add to conversation history
    setConversationHistory(prev => [
      ...prev,
      { role: 'user', content: Array.isArray(answer) ? answer.join(', ') : answer },
      { role: 'assistant', content: acknowledgment }
    ]);
  };

  /**
   * Handle user response and move to next step
   */
  const handleResponse = async (value) => {
    const step = onboardingSteps[currentStep];
    
    // Special handling for priorities "continue" button
    if (step.field === 'priorities' && value === 'continue') {
      // Generate acknowledgment and advance
      generateAcknowledgment(currentStep, selectedPriorities);
      setTimeout(() => {
        if (currentStep < onboardingSteps.length - 1) {
          setCurrentStep(currentStep + 1);
          setUserInput('');
          setAiAcknowledgment('');
          setSelectedPriorities([]);
        } else {
          completeOnboarding();
        }
      }, 2000);
      return;
    }
    
    // Update user profile based on step
    if (step.field === 'userName') {
      userProfile.userName = value;
    } else if (step.field === 'commuteMethod') {
      userProfile.updateRoutine({ commuteMethod: value });
    } else if (step.field === 'commuteTime') {
      userProfile.updateRoutine({ commuteTime: value });
    } else if (step.field === 'dietType') {
      userProfile.updateRoutine({ dietType: value });
    } else if (step.field === 'shoppingDay') {
      userProfile.updateRoutine({ shoppingDay: value });
    } else if (step.field === 'priorities') {
      // Handle multi-select for priorities
      if (value === 'all') {
        setSelectedPriorities(['carbon', 'waste', 'water', 'energy']);
        userProfile.preferences.priorities = ['carbon', 'waste', 'water', 'energy'];
        // Auto-advance if "all" is selected
        userProfile.saveToStorage();
        generateAcknowledgment(currentStep, ['carbon', 'waste', 'water', 'energy']);
        setTimeout(() => {
          if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            setUserInput('');
            setAiAcknowledgment('');
            setSelectedPriorities([]);
          } else {
            completeOnboarding();
          }
        }, 2000);
        return;
      } else {
        // Toggle selection
        const newPriorities = selectedPriorities.includes(value)
          ? selectedPriorities.filter(p => p !== value)
          : [...selectedPriorities, value];
        setSelectedPriorities(newPriorities);
        userProfile.preferences.priorities = newPriorities;
        userProfile.saveToStorage();
        // Don't advance - wait for continue button
        return;
      }
    } else if (step.field === 'timeCommitment') {
      userProfile.preferences.timeCommitment = value;
    }

    // Save progress
    userProfile.saveToStorage();

    // Generate acknowledgment
    generateAcknowledgment(currentStep, value);

    // Wait a moment for user to read acknowledgment, then move to next step
    setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setUserInput('');
        setAiAcknowledgment('');
        setSelectedPriorities([]); // Reset for next use
      } else {
        // Complete onboarding
        completeOnboarding();
      }
    }, 2000);
  };

  /**
   * Handle text input submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleResponse(userInput.trim());
    }
  };

  /**
   * Handle skip button
   */
  const handleSkip = () => {
    // Save partial profile
    userProfile.saveToStorage();
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserInput('');
      setAiAcknowledgment('');
    } else {
      completeOnboarding();
    }
  };

  /**
   * Complete onboarding process
   */
  const completeOnboarding = async () => {
    userProfile.onboardingComplete = true;
    userProfile.saveToStorage();

    // Show completion message
    const completionMsg = getCompletionMessage();
    setAiAcknowledgment(completionMsg);
    
    // Add to conversation history
    setConversationHistory(prev => [
      ...prev,
      { role: 'assistant', content: completionMsg }
    ]);

    // Wait a moment for user to read, then navigate
    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 safe-all">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Back Button */}
        {currentStep > 0 && (
          <div className="mb-4">
            <Link
              to="/home"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-smooth tap-target"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>
        )}
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} / {onboardingSteps.length}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-green h-2 rounded-full transition-smooth-slow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-4 min-h-[400px] flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {/* AI Message Bubble */}
            <div className="flex items-start space-x-3">
              <img 
                src="/agent-avatar.png" 
                alt="Eco-Coach" 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-4 rounded-tl-none">
                  <p className="text-gray-800">{currentStepData.question}</p>
                </div>
              </div>
            </div>

            {/* AI Acknowledgment (if present) */}
            {aiAcknowledgment && (
              <div className="flex items-start space-x-3">
                <img 
                  src="/agent-avatar.png" 
                  alt="Eco-Coach" 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 rounded-tl-none">
                    <p className="text-gray-700 text-sm">{aiAcknowledgment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-4 rounded-tl-none">
                    <p className="text-gray-500 text-sm">Thinking...</p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t pt-4">
            {currentStepData.inputType === 'text' ? (
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={currentStepData.placeholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent tap-target"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || loading}
                  className="px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth tap-target-lg flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {currentStepData.options.map((option) => {
                    const isSelected = currentStepData.field === 'priorities' 
                      ? selectedPriorities.includes(option.value)
                      : false;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleResponse(option.value)}
                        disabled={loading}
                        className={`px-4 py-3 rounded-lg transition-smooth tap-target-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                          isSelected
                            ? 'bg-primary-green text-white border-2 border-primary-green'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-green hover:bg-green-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {currentStepData.field === 'priorities' && selectedPriorities.length > 0 && (
                  <button
                    onClick={() => {
                      // Continue with selected priorities
                      handleResponse('continue');
                    }}
                    disabled={loading || selectedPriorities.length === 0}
                    className="w-full mt-3 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth tap-target-lg font-medium"
                  >
                    Continue with {selectedPriorities.length} {selectedPriorities.length === 1 ? 'priority' : 'priorities'}
                  </button>
                )}
              </div>
            )}

            {/* Skip Button */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSkip}
                disabled={loading}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1 transition-smooth tap-target"
              >
                <SkipForward className="w-4 h-4" />
                <span>Skip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

