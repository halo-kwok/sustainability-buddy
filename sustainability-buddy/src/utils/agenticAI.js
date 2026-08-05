/**
 * AgenticAI - Sustainability Coach AI System
 * 
 * This module powers an agentic AI sustainability coach that:
 * - Generates personalized system prompts based on user profile
 * - Communicates with Gemini via Google AI Studio (OpenAI-compatible API)
 * - Provides proactive suggestions and learns from user feedback
 * - Adapts to user's routine, preferences, and history
 */

import userProfile from './userProfile.js';

const GEMINI_OPENAI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
const GEMINI_MODEL = 'gemini-3.6-flash';

/**
 * Builds a comprehensive system prompt for the AI sustainability coach
 * Incorporates user profile data to create personalized coaching context
 * 
 * @param {Object} profile - The userProfile instance
 * @returns {string} Complete system prompt string
 */
export function buildSystemPrompt(profile) {
  const userName = profile.userName || "a user";
  const profileSummary = profile.getSummaryForAI();
  const successRate = profile.calculateSuccessRate();
  const totalActions = profile.history?.actions?.length || 0;
  const recentRejections = profile.getRecentRejections(30); // Last 30 days
  const recentActions = profile.getRecentActions(7); // Last 7 days
  
  // Get current time context for better suggestions
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  
  // Determine user experience level
  let experienceLevel = 'new';
  let experienceContext = '';
  if (totalActions < 3) {
    experienceLevel = 'new';
    experienceContext = 'This is a new user. Be welcoming, educational, and explain why actions matter. Use language like "Here\'s why this helps" and "This is a great starting point."';
  } else if (totalActions < 10) {
    experienceLevel = 'learning';
    experienceContext = 'This user is building momentum. Be supportive and reference past successes. Use language like "You\'ve done X, now try Y" and "Building on your success."';
  } else {
    experienceLevel = 'experienced';
    experienceContext = 'This is an experienced user. Be collaborative and suggest advanced strategies. Use language like "You\'re ready for" and "Advanced sustainability strategies."';
  }
  
  // Determine tone based on success rate
  let toneGuidance = '';
  if (successRate < 30) {
    toneGuidance = 'User is struggling. Be MORE encouraging and supportive. Suggest easier wins. Use language like "Let\'s try something simpler" and "Small steps matter." Check in more frequently.';
  } else if (successRate >= 70) {
    toneGuidance = 'User is excelling! Be celebratory and challenging. Suggest more ambitious actions. Use language like "You\'re crushing it!" and "Ready for the next level?"';
  } else {
    toneGuidance = 'User has moderate success. Be balanced and supportive. Mix easy and moderate actions. Use language like "You\'re making progress" and "Let\'s build on this."';
  }
  
  // Build rejection learning context
  let rejectionContext = '';
  if (recentRejections.length > 0) {
    const rejectionReasons = recentRejections.map(r => `- Rejected "${r.suggestion}" because: ${r.reason}`).join('\n');
    rejectionContext = `Recent Rejections (DO NOT suggest similar actions):\n${rejectionReasons}\n\nIf they rejected something because of cost, suggest free/low-cost alternatives. If they rejected because of time, suggest quicker actions.`;
  }
  
  // Build success context
  let successContext = '';
  if (recentActions.length > 0) {
    const successfulActions = recentActions.filter(a => a.success).map(a => a.action);
    if (successfulActions.length > 0) {
      successContext = `Recent Successful Actions (build on these):\n${successfulActions.map(a => `- ${a}`).join('\n')}\n\nSuggest related or next-level actions based on these successes.`;
    }
  }
  
  // Time-based suggestion guidance
  let timeGuidance = '';
  if (timeOfDay === 'morning' && profile.routine?.commuteMethod === 'car' && profile.routine?.commuteTime?.includes('AM')) {
    timeGuidance = 'Morning commute time. Consider suggesting carpooling, public transit, or route optimization for today.';
  } else if (timeOfDay === 'afternoon' && profile.routine?.shoppingDay === dayOfWeek) {
    timeGuidance = 'Shopping day! Suggest reusable bags, sustainable shopping list, or local produce.';
  } else if (timeOfDay === 'evening' && profile.preferences?.priorities?.includes('energy')) {
    timeGuidance = 'Evening time. Suggest energy-saving actions like turning off lights, unplugging devices, or adjusting thermostat.';
  } else if (isWeekend && profile.preferences?.timeCommitment === 'high') {
    timeGuidance = 'Weekend with high time commitment. Suggest bigger projects like meal prep, home improvements, or community activities.';
  }

  return `You are an agentic AI sustainability coach for ${userName}.

Profile Summary:
${profileSummary}

Experience Level: ${experienceLevel}
${experienceContext}

Success Rate: ${successRate}%
${toneGuidance}

${rejectionContext ? rejectionContext + '\n\n' : ''}
${successContext ? successContext + '\n\n' : ''}

Personalization Rules:
1. RESPECT PAST REJECTIONS: ${recentRejections.length > 0 ? 'User has rejected similar actions. DO NOT suggest anything similar.' : 'No recent rejections to avoid.'}
2. BUILD ON SUCCESSES: ${successContext ? 'Reference their successful actions and suggest related next-level actions.' : 'No recent successes to build on yet.'}
3. MATCH TIME COMMITMENT: User has ${profile.preferences?.timeCommitment || 'moderate'} time. Only suggest actions that fit this constraint.
4. ALIGN WITH PRIORITIES: User priorities: ${profile.preferences?.priorities?.join(', ') || 'general sustainability'}. Focus ${profile.preferences?.priorities?.length === 1 ? '80%' : 'balance'} of suggestions on these.
5. CONSIDER BUDGET: User budget: ${profile.preferences?.budget || 'medium'}. ${profile.preferences?.budget === 'low' ? 'Avoid expensive suggestions. Focus on free/low-cost actions.' : 'Can suggest investment-level actions if appropriate.'}
6. ROUTINE INTEGRATION: ${profile.routine?.commuteMethod ? `Commute: ${profile.routine.commuteMethod}${profile.routine.commuteTime ? ` at ${profile.routine.commuteTime}` : ''}` : ''} ${profile.routine?.shoppingDay ? `Shopping: ${profile.routine.shoppingDay}` : ''} ${profile.routine?.dietType ? `Diet: ${profile.routine.dietType}` : ''}

Time/Day Context:
- Current: ${timeOfDay} on ${dayOfWeek}${isWeekend ? ' (weekend)' : ''}
${timeGuidance ? `- ${timeGuidance}` : ''}
- Morning: Focus on commute and daily routines
- Afternoon: Focus on shopping, meal planning, errands
- Evening: Focus on meal prep, home energy use, planning
- Weekend: Focus on shopping, meal prep, bigger projects

Response Style:
- Be conversational, warm, and supportive
- Keep responses concise but informative (2-4 sentences for suggestions)
- Ask clarifying questions when needed
- Provide actionable, specific suggestions (not vague advice)
- Explain environmental impact in relatable terms
- Reference their specific routine, preferences, and past actions
- Use their name (${userName}) naturally in conversation
- Celebrate progress and acknowledge constraints

Remember: Every suggestion must be personalized to THIS user's specific situation. Never give generic advice.`;
}

/**
 * Calls Gemini via Google AI Studio's OpenAI-compatible chat completions API
 * Sends user message with conversation history and personalized system prompt
 * 
 * @param {string} userMessage - The user's message/query
 * @param {Array} conversationHistory - Array of previous messages in format [{ role: "user"|"assistant", content: string }]
 * @returns {Promise<string>} The AI assistant's response text
 */
export async function callAgenticAI(userMessage, conversationHistory = []) {
  try {
    // Build personalized system prompt from user profile
    const systemPrompt = buildSystemPrompt(userProfile);
    
    // Get API configuration from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Validate environment variables
    if (!apiKey) {
      console.error('Missing API configuration: VITE_GEMINI_API_KEY is not set');
      throw new Error("Missing Gemini API key. Please check your .env file.");
    }

    // Log request for debugging
    console.log('API Request Details:', {
      endpoint: GEMINI_OPENAI_ENDPOINT,
      model: GEMINI_MODEL,
      hasApiKey: !!apiKey,
      messageLength: userMessage.length
    });

    // Prepare the request payload in OpenAI-compatible format
    const payload = {
      model: GEMINI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,  // Balance between creativity and consistency
      max_tokens: 1000,   // Limit response length for cost efficiency
    };

    // Make API request to Google AI Studio
    const response = await fetch(GEMINI_OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    // Parse response
    const data = await response.json();
    
    // Extract assistant's message from OpenAI-compatible response format
    const assistantMessage = data.choices?.[0]?.message?.content;
    
    if (!assistantMessage) {
      console.warn('Unexpected API response format:', data);
      return "No response from assistant.";
    }

    return assistantMessage;
  } catch (err) {
    // Log detailed error for debugging
    console.error("Error in callAgenticAI:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
      apiKey: import.meta.env.VITE_GEMINI_API_KEY ? "***set***" : "MISSING",
      model: GEMINI_MODEL
    });
    
    // Return user-friendly error message with more context
    if (err.message.includes("Missing Gemini API key")) {
      return "Sorry, the AI service is not properly configured. Please check your API settings.";
    }
    
    // Network/CORS errors
    if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      return "Network error: Could not reach the AI service. Please check your internet connection.";
    }
    
    // API errors
    if (err.message.includes("API error")) {
      return `API Error: ${err.message}. Please check the browser console for details.`;
    }
    
    // Return detailed error for debugging (in development)
    if (import.meta.env.DEV) {
      return `Error: ${err.message}. Check console for details.`;
    }
    
    return "Sorry, I encountered a technical issue while processing your message. Please try again in a moment.";
  }
}

/**
 * Helper function to get current time context for better suggestions
 * 
 * @returns {Object} Time context information
 */
export function getTimeContext() {
  const now = new Date();
  return {
    hour: now.getHours(),
    dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
    timeOfDay: now.getHours() < 12 ? 'morning' : now.getHours() < 17 ? 'afternoon' : 'evening',
    date: now.toLocaleDateString('en-US')
  };
}

/**
 * Generate a proactive sustainability suggestion based on user profile and context
 * 
 * @returns {Promise<Object>} Suggestion object with {message, action, reasoning, impact}
 */
export async function generateProactiveSuggestion() {
  try {
    const timeContext = getTimeContext();
    const profileSummary = userProfile.getSummaryForAI();
    const successRate = userProfile.calculateSuccessRate();
    const recentRejections = userProfile.getRecentRejections(30);
    const recentActions = userProfile.getRecentActions(7);
    const successfulActions = recentActions.filter(a => a.success).map(a => a.action);
    
    // Build context for suggestion
    let rejectionNote = '';
    if (recentRejections.length > 0) {
      rejectionNote = `\n\nIMPORTANT: User recently rejected: ${recentRejections.map(r => `"${r.suggestion}" (reason: ${r.reason})`).join(', ')}. DO NOT suggest anything similar.`;
    }
    
    let successNote = '';
    if (successfulActions.length > 0) {
      successNote = `\n\nUser successfully completed: ${successfulActions.join(', ')}. Consider building on these successes with related or next-level actions.`;
    }
    
    // Time-based guidance
    let timeGuidance = '';
    const isWeekend = timeContext.dayOfWeek === 'Saturday' || timeContext.dayOfWeek === 'Sunday';
    if (timeContext.timeOfDay === 'morning' && userProfile.routine?.commuteMethod === 'car') {
      timeGuidance = 'Morning commute time - consider commute-related suggestions.';
    } else if (timeContext.timeOfDay === 'afternoon' && userProfile.routine?.shoppingDay === timeContext.dayOfWeek) {
      timeGuidance = 'Shopping day - consider shopping-related sustainability actions.';
    } else if (timeContext.timeOfDay === 'evening' && userProfile.preferences?.priorities?.includes('energy')) {
      timeGuidance = 'Evening time - consider energy-saving home actions.';
    } else if (isWeekend && userProfile.preferences?.timeCommitment === 'high') {
      timeGuidance = 'Weekend with high time commitment - consider bigger projects.';
    }
    
    const suggestionPrompt = `Based on the user's profile and current context (${timeContext.timeOfDay} on ${timeContext.dayOfWeek}), generate ONE specific, actionable sustainability suggestion.

User Profile:
${profileSummary}

Current Context:
- Time: ${timeContext.timeOfDay} on ${timeContext.dayOfWeek}
- Success Rate: ${successRate}%
- Time Commitment: ${userProfile.preferences?.timeCommitment || 'moderate'}
- Budget: ${userProfile.preferences?.budget || 'medium'}
- Priorities: ${userProfile.preferences?.priorities?.join(', ') || 'general sustainability'}
${timeGuidance ? `- ${timeGuidance}` : ''}
${rejectionNote}
${successNote}

Requirements:
- Be SPECIFIC and ACTIONABLE (something they can do today/soon)
- Match their time commitment (${userProfile.preferences?.timeCommitment || 'moderate'})
- Align with their priorities: ${userProfile.preferences?.priorities?.join(', ') || 'general sustainability'}
- Consider their budget: ${userProfile.preferences?.budget || 'medium'}
- ${recentRejections.length > 0 ? 'AVOID anything similar to recent rejections.' : 'No rejections to avoid.'}
- ${successfulActions.length > 0 ? 'Consider building on recent successes.' : 'No recent successes to build on.'}
- Explain WHY this is a good time for this suggestion
- Estimate environmental impact (CO2 in lbs, water in gallons, waste in lbs)
- Adjust difficulty based on success rate: ${successRate < 30 ? 'Easier wins' : successRate >= 70 ? 'More challenging actions' : 'Moderate actions'}

Format your response as a JSON object with these exact keys:
{
  "message": "A friendly, encouraging 1-2 sentence suggestion personalized to this user",
  "action": "The specific action to take (e.g., 'Take public transit to work today')",
  "reasoning": "Why this is a good suggestion right now (2-3 sentences, reference their routine/context)",
  "impact": {
    "co2": number,
    "water": number,
    "waste": number
  }
}

Only return the JSON object, no other text.`;

    const response = await callAgenticAI(suggestionPrompt, []);
    
    // Try to parse JSON from response
    // AI might wrap it in markdown code blocks or add extra text
    let jsonStr = response.trim();
    
    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }
    
    // Extract JSON object if there's extra text
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    const suggestion = JSON.parse(jsonStr);
    
    // Validate and set defaults
    return {
      message: suggestion.message || 'Here\'s a sustainability tip for you!',
      action: suggestion.action || suggestion.message,
      reasoning: suggestion.reasoning || 'This aligns with your sustainability goals.',
      impact: {
        co2: suggestion.impact?.co2 || 0,
        water: suggestion.impact?.water || 0,
        waste: suggestion.impact?.waste || 0
      }
    };
  } catch (error) {
    console.error('Error generating proactive suggestion:', error);
    // Return a fallback suggestion
    return {
      message: 'Consider taking a walk or biking for short trips today!',
      action: 'Use active transportation for short trips',
      reasoning: 'Active transportation reduces emissions and improves health.',
      impact: {
        co2: 5,
        water: 0,
        waste: 0
      }
    };
  }
}

