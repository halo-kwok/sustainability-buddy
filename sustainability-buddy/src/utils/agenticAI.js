/**
 * AgenticAI - Sustainability Coach AI System
 * 
 * This module powers an agentic AI sustainability coach that:
 * - Generates personalized system prompts based on user profile
 * - Communicates with GPT-4.1-mini via Duke's LiteLLM Enterprise Edition gateway
 * - Provides proactive suggestions and learns from user feedback
 * - Adapts to user's routine, preferences, and history
 */

import userProfile from './userProfile.js';

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
  
  // Get current time context for better suggestions
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  return `You are an agentic AI sustainability coach for ${userName}.

Profile Summary:
${profileSummary}

Behavior Guidelines:
- Proactively suggest actions based on their routine and context. Consider their commute method, work schedule, and daily habits.
- Reference their past successes and failures. If they've succeeded with similar actions before, build on that momentum.
- Learn from rejections — if they rejected X because Y, don't suggest similar actions. Respect their constraints and preferences.
- Personalize everything — never give generic advice. Every suggestion should be tailored to their specific situation.
- Celebrate progress and adjust difficulty based on success rate (currently ${successRate}%). If they're struggling, suggest easier wins. If they're excelling, challenge them appropriately.
- Be encouraging but realistic about constraints. Acknowledge their budget, time commitments, and lifestyle limitations.
- Use their priorities (${profile.preferences.priorities.join(', ') || 'general sustainability'}) to guide suggestions.

Time/Day Context Awareness:
- Current time: ${timeOfDay} on ${dayOfWeek}
- Adapt tone and suggestions to fit current day rhythms and habits.
- Morning suggestions might focus on commute and daily routines.
- Evening suggestions might focus on meal planning and home energy use.
- Weekend suggestions might focus on shopping, meal prep, and community activities.

Response Style:
- Be conversational, warm, and supportive.
- Keep responses concise but informative.
- Ask clarifying questions when needed.
- Provide actionable, specific suggestions rather than vague advice.
- When suggesting actions, explain the environmental impact in relatable terms.`;
}

/**
 * Calls GPT-4.1-mini via Duke's LiteLLM Enterprise Edition gateway
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
    const apiKey = import.meta.env.VITE_LITELLM_API_KEY;
    const gatewayUrl = import.meta.env.VITE_LITELLM_GATEWAY_URL;

    // Validate environment variables
    if (!apiKey || !gatewayUrl) {
      console.error('Missing API configuration:', {
        hasApiKey: !!apiKey,
        hasGatewayUrl: !!gatewayUrl
      });
      throw new Error("Missing API key or gateway URL. Please check your .env file.");
    }

    // Construct the full endpoint URL
    // LiteLLM uses OpenAI-compatible /v1/chat/completions endpoint
    const endpoint = gatewayUrl.endsWith('/') 
      ? `${gatewayUrl}v1/chat/completions`
      : `${gatewayUrl}/v1/chat/completions`;

    // Prepare the request payload in OpenAI-compatible format
    const payload = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,  // Balance between creativity and consistency
      max_tokens: 1000,   // Limit response length for cost efficiency
    };

    // Make API request to LiteLLM gateway
    const response = await fetch(endpoint, {
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
      console.error('LiteLLM API error:', {
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
    // Log error for debugging
    console.error("Error in callAgenticAI:", err);
    
    // Return user-friendly error message
    if (err.message.includes("Missing API key") || err.message.includes("gateway URL")) {
      return "Sorry, the AI service is not properly configured. Please check your API settings.";
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

