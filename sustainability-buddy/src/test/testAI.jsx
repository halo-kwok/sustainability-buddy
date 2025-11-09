/**
 * TestAI Component - Temporary Testing Component
 * 
 * This component is for testing the agentic AI integration.
 * It loads demo user profile data and tests the AI call functionality.
 * 
 * TODO: Delete this component after testing is complete.
 */

import { useState } from 'react';
import userProfile from '../utils/userProfile.js';
import { callAgenticAI } from '../utils/agenticAI.js';

function TestAI() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  /**
   * Load demo user profile data for testing
   */
  const loadDemoProfile = () => {
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

      // Add some demo actions
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
      setProfileLoaded(true);
      
      console.log('Demo profile loaded:', userProfile);
    } catch (err) {
      console.error('Error loading demo profile:', err);
      setError(`Failed to load demo profile: ${err.message}`);
    }
  };

  /**
   * Test the AI call functionality
   */
  const handleTestAI = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      // Ensure profile is loaded
      if (!profileLoaded) {
        loadDemoProfile();
      }

      // Call the AI with test message
      const message = "What should I focus on today?";
      console.log('Calling AI with message:', message);
      
      const aiResponse = await callAgenticAI(message, []);
      
      setResponse(aiResponse);
      console.log('AI Response:', aiResponse);
    } catch (err) {
      console.error('Error calling AI:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">
          ⚠️ Test Component - Delete After Testing
        </h2>
        <p className="text-sm text-yellow-700">
          This component is for testing the agentic AI integration only.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">AI Test Component</h2>

        {/* Load Demo Profile Button */}
        {!profileLoaded && (
          <div className="mb-4">
            <button
              onClick={loadDemoProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-smooth tap-target"
            >
              Load Demo User Profile
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Load demo data first, then test the AI call.
            </p>
          </div>
        )}

        {profileLoaded && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              ✅ Demo profile loaded: {userProfile.userName}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Commute: {userProfile.routine.commuteMethod} | 
              Diet: {userProfile.routine.dietType} | 
              Priorities: {userProfile.preferences.priorities.join(', ')}
            </p>
          </div>
        )}

        {/* Test AI Button */}
        <div className="mb-4">
          <button
            onClick={handleTestAI}
            disabled={loading || !profileLoaded}
            className="px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-smooth tap-target-lg font-semibold"
          >
            {loading ? 'Calling AI...' : 'Test AI Call'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
            <p className="text-sm text-red-700 whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h3 className="font-semibold text-gray-800 mb-2">AI Response:</h3>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-green"></div>
            <p className="text-sm text-gray-600 mt-2">Calling GPT-4.1-mini via LiteLLM...</p>
          </div>
        )}
      </div>

      {/* Profile Summary (for debugging) */}
      {profileLoaded && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
            View Profile Summary (Debug)
          </summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
            {userProfile.getSummaryForAI()}
          </pre>
        </details>
      )}
    </div>
  );
}

export default TestAI;

