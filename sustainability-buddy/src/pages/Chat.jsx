/**
 * Chat Component
 * 
 * Interactive chat interface with the AI sustainability coach.
 * Supports conversation history, quick prompts, and actionable suggestions.
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Leaf, Send, Loader2, ChevronDown, ChevronUp,
  TrendingUp, Droplet, Trash2
} from 'lucide-react';
import userProfile from '../utils/userProfile.js';
import { callAgenticAI, generateProactiveSuggestion } from '../utils/agenticAI.js';
import { generateContextAwarePrompts } from '../utils/quickPromptsGenerator.js';

function Chat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileSummary, setShowProfileSummary] = useState(true);
  const [quickPrompts, setQuickPrompts] = useState([]);
  const [showActionPrompt, setShowActionPrompt] = useState(null);

  // Load conversation history on mount
  useEffect(() => {
    loadConversationHistory();
    generateQuickPrompts();
    // Focus input on mount
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /**
   * Load conversation history from localStorage
   */
  const loadConversationHistory = () => {
    try {
      const stored = localStorage.getItem('sbChatHistory');
      if (stored) {
        const history = JSON.parse(stored);
        setMessages(history);
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  /**
   * Save conversation history to localStorage
   */
  const saveConversationHistory = (newMessages) => {
    try {
      localStorage.setItem('sbChatHistory', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving conversation history:', error);
    }
  };

  /**
   * Generate context-aware quick prompts using rule-based generator
   */
  const generateQuickPrompts = () => {
    try {
      const prompts = generateContextAwarePrompts();
      setQuickPrompts(prompts);
    } catch (error) {
      console.error('Error generating quick prompts:', error);
      // Fallback prompts
      setQuickPrompts([
        `How can I make my ${userProfile.routine?.commuteMethod || 'commute'} more sustainable?`,
        'What are some easy sustainability wins I can do today?',
        'How can I reduce my environmental impact?'
      ]);
    }
  };

  /**
   * Check if AI response contains actionable suggestion
   */
  const checkForActionableSuggestion = (response) => {
    // Look for action keywords
    const actionKeywords = [
      'try', 'do', 'take', 'use', 'switch', 'start', 'begin', 
      'consider', 'suggest', 'recommend', 'action', 'bring',
      'buy', 'install', 'replace', 'reduce', 'cut', 'save'
    ];
    
    const lowerResponse = response.toLowerCase();
    const hasAction = actionKeywords.some(keyword => lowerResponse.includes(keyword));
    
    // Check if it's a specific suggestion (not just general advice)
    // Look for imperative sentences or specific instructions
    const hasImperative = /^(try|do|take|use|bring|buy|install|switch|start|consider)/i.test(response.trim());
    const isSpecific = (response.length < 300 && hasAction) || hasImperative;
    
    return isSpecific;
  };

  /**
   * Extract action details from AI response using AI
   */
  const extractActionDetails = async (aiResponse) => {
    try {
      const extractionPrompt = `Extract the actionable sustainability suggestion from this AI response: "${aiResponse}"

Format your response as a JSON object with these exact keys:
{
  "action": "Concise action title (e.g., 'Bring lunch from home (2x this week)')",
  "difficulty": "Easy" | "Medium" | "Hard",
  "impact": {
    "co2": number (in lbs),
    "water": number (in gallons),
    "waste": number (in lbs)
  },
  "timing": "when to check in (e.g., 'in 1 week', 'on Saturday', 'in 3 days')"
}

Only return the JSON object, no other text.`;

      const response = await callAgenticAI(extractionPrompt, []);
      
      // Parse JSON
      let jsonStr = response.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const extracted = JSON.parse(jsonMatch[0]);
        return {
          action: extracted.action || extractAction(aiResponse),
          difficulty: extracted.difficulty || 'Medium',
          impact: extracted.impact || { co2: 2, water: 0, waste: 0 },
          timing: extracted.timing || 'in a few days'
        };
      }
    } catch (error) {
      console.error('Error extracting action details:', error);
    }
    
    // Fallback extraction
    return {
      action: extractAction(aiResponse),
      difficulty: 'Medium',
      impact: { co2: 2, water: 0, waste: 0 },
      timing: 'in a few days'
    };
  };

  /**
   * Handle sending a message
   */
  const handleSend = async (messageText = null) => {
    const text = messageText || inputValue.trim();
    if (!text || isLoading) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Convert messages to format expected by callAgenticAI
      const conversationHistory = updatedMessages
        .slice(0, -1) // Exclude the just-added user message
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Call AI
      const aiResponse = await callAgenticAI(text, conversationHistory);

      // Add AI response
      const aiMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      saveConversationHistory(finalMessages);

      // Check if response contains actionable suggestion
      if (checkForActionableSuggestion(aiResponse)) {
        // Extract action details
        const actionDetails = await extractActionDetails(aiResponse);
        setShowActionPrompt({
          message: aiResponse,
          action: actionDetails.action,
          difficulty: actionDetails.difficulty,
          impact: actionDetails.impact,
          timing: actionDetails.timing
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveConversationHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Extract action from AI response
   */
  const extractAction = (response) => {
    // Try to extract a concise action phrase
    const sentences = response.split(/[.!?]/);
    const actionSentence = sentences.find(s => 
      s.toLowerCase().includes('try') || 
      s.toLowerCase().includes('do') ||
      s.toLowerCase().includes('take')
    );
    return actionSentence?.trim() || response.substring(0, 100);
  };

  /**
   * Handle quick prompt click
   */
  const handleQuickPrompt = (prompt) => {
    handleSend(prompt);
  };

  /**
   * Handle adding suggestion as action
   */
  const handleAddAction = async () => {
    if (showActionPrompt) {
      // Add action to userProfile (not completed yet, so success = false)
      // Pass extracted difficulty and impact
      userProfile.addAction(
        showActionPrompt.action, 
        false, 
        'From chat conversation',
        {
          difficulty: showActionPrompt.difficulty,
          impact: showActionPrompt.impact
        }
      );
      setShowActionPrompt(null);
      
      // Generate confirmation message with timing
      const timing = showActionPrompt.timing || 'in a few days';
      const confirmation = {
        role: 'assistant',
        content: `Added! I'll check in about this ${timing}. You can mark it complete in your Action Tracker when you're done! 🌱`,
        timestamp: new Date().toISOString()
      };
      const updatedMessages = [...messages, confirmation];
      setMessages(updatedMessages);
      saveConversationHistory(updatedMessages);
    }
  };

  /**
   * Handle dismissing action prompt
   */
  const handleDismissAction = () => {
    setShowActionPrompt(null);
  };

  /**
   * Format timestamp for display
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const currentStreak = userProfile.history?.actions?.filter(a => a.success).length || 0;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-blue-50 safe-all">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link
              to="/home"
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth tap-target"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-800">Your Eco-Coach</h1>
          </div>
          <button
            onClick={() => setShowProfileSummary(!showProfileSummary)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth tap-target"
          >
            <User className="w-5 h-5 text-primary-green" />
          </button>
        </div>
      </div>

      {/* Profile Summary Banner (Collapsible) */}
      {showProfileSummary && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 animate-slide-down">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-800">
              {userProfile.userName || 'Your'} Profile
            </h2>
            <button
              onClick={() => setShowProfileSummary(false)}
              className="text-gray-500 hover:text-gray-700 tap-target"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
            <div>
              <strong>Commute:</strong> {userProfile.routine?.commuteMethod || 'Not set'}
            </div>
            <div>
              <strong>Diet:</strong> {userProfile.routine?.dietType || 'Not set'}
            </div>
            <div>
              <strong>Streak:</strong> {currentStreak} actions
            </div>
            <div>
              <strong>Priorities:</strong> {userProfile.preferences?.priorities?.length || 0}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-primary-green" />
              <span className="text-gray-600">
                {userProfile.history?.totalImpact?.co2 || 0} lbs CO₂
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplet className="w-3 h-3 text-secondary-blue" />
              <span className="text-gray-600">
                {userProfile.history?.totalImpact?.water || 0} gal
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Trash2 className="w-3 h-3 text-accent-amber" />
              <span className="text-gray-600">
                {userProfile.history?.totalImpact?.waste || 0} lbs
              </span>
            </div>
          </div>
        </div>
      )}

      {!showProfileSummary && (
        <button
          onClick={() => setShowProfileSummary(true)}
          className="bg-white border-b border-gray-200 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-smooth tap-target flex items-center justify-center space-x-1"
        >
          <ChevronDown className="w-3 h-3" />
          <span>Show profile summary</span>
        </button>
      )}

      {/* Messages Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && quickPrompts.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600 text-center mb-3">Quick questions to get started:</p>
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="w-full px-4 py-3 bg-white border-2 border-primary-green text-primary-green rounded-lg hover:bg-green-50 transition-smooth tap-target-lg text-left text-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <img 
                src="/agent-avatar.png" 
                alt="Eco-Coach" 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-secondary-blue text-white rounded-tr-none'
                  : 'bg-white border border-gray-200 rounded-tl-none'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-primary-green">Eco-Coach</span>
                </div>
              )}
              <p className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-2 justify-start">
            <img 
              src="/agent-avatar.png" 
              alt="Eco-Coach" 
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-tl-none">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-primary-green animate-spin" />
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Prompt */}
        {showActionPrompt && (
          <div className="bg-green-50 border-2 border-primary-green rounded-lg p-4 mb-4 animate-slide-down">
            <p className="text-sm font-medium text-gray-800 mb-2">
              💡 I heard you mention an action. Want me to track this for you?
            </p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                {showActionPrompt.action}
              </p>
              <div className="flex items-center space-x-3 text-xs">
                {showActionPrompt.difficulty && (
                  <span className={`px-2 py-1 rounded ${
                    showActionPrompt.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    showActionPrompt.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {showActionPrompt.difficulty}
                  </span>
                )}
                {showActionPrompt.impact?.co2 > 0 && (
                  <span className="text-gray-600">
                    {showActionPrompt.impact.co2} lbs CO₂
                  </span>
                )}
                {showActionPrompt.impact?.water > 0 && (
                  <span className="text-gray-600">
                    {showActionPrompt.impact.water} gal water
                  </span>
                )}
                {showActionPrompt.impact?.waste > 0 && (
                  <span className="text-gray-600">
                    {showActionPrompt.impact.waste} lbs waste
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAddAction}
                className="flex-1 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-smooth tap-target-lg text-sm font-medium"
              >
                Yes, add it!
              </button>
              <button
                onClick={handleDismissAction}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-smooth tap-target-lg text-sm"
              >
                No, just talking
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Bar */}
      <div className="bg-white border-t border-gray-200 safe-bottom">
        <div className="px-4 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? "AI is thinking..." : "Ask your eco-coach anything..."}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed tap-target"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth tap-target-lg flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;

