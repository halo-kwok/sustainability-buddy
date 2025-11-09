/**
 * Context-Aware Quick Prompts Generator
 * 
 * Generates personalized quick prompts for the chat interface based on user profile.
 * Implements the comprehensive prompt generation rules from the behavior plan.
 */

import userProfile from './userProfile.js';

/**
 * Generate 3 context-aware quick prompts based on user profile
 * 
 * @returns {Array<string>} Array of 3 prompt strings
 */
export function generateContextAwarePrompts() {
  const profile = userProfile;
  const prompts = [];
  
  // If profile is incomplete, return fallback prompts
  if (!profile.onboardingComplete || !profile.routine || !profile.preferences) {
    return [
      "What should I know about your sustainability goals?",
      "How can I help you get started?",
      "What's your biggest sustainability challenge?"
    ];
  }
  
  const commuteMethod = profile.routine.commuteMethod;
  const dietType = profile.routine.dietType;
  const timeCommitment = profile.preferences.timeCommitment;
  const priorities = profile.preferences.priorities || [];
  const budget = profile.preferences.budget || 'medium';
  
  // Multi-factor combinations (highest priority)
  if (commuteMethod === 'car' && timeCommitment === 'minimal') {
    prompts.push(
      "Quick ways to make my car commute greener?",
      "5-minute car sustainability improvements?",
      "Easy wins for drivers with limited time?"
    );
  } else if (commuteMethod === 'car' && priorities.includes('carbon')) {
    prompts.push(
      "How can I reduce my car's carbon footprint?",
      "What's the most effective way to cut driving emissions?",
      "Carbon-focused car commute improvements?"
    );
  } else if (dietType === 'vegetarian' && priorities.includes('waste')) {
    prompts.push(
      "How can I reduce food waste in my vegetarian diet?",
      "Zero-waste vegetarian shopping tips?",
      "Waste reduction for vegetarians?"
    );
  } else if (timeCommitment === 'minimal' && priorities.includes('carbon')) {
    prompts.push(
      "Quick carbon reduction wins?",
      "5-minute actions that cut my carbon footprint?",
      "Fastest ways to reduce my emissions?"
    );
  } else if (commuteMethod === 'remote' && priorities.includes('energy')) {
    prompts.push(
      "How can I reduce my home office energy use?",
      "Energy-efficient remote work tips?",
      "Sustainable home office practices?"
    );
  } else if (dietType === 'vegan' && timeCommitment === 'moderate') {
    prompts.push(
      "Moderate-time sustainability actions for vegans?",
      "30-minute vegan sustainability habits?",
      "Balanced vegan sustainability approach?"
    );
  } else if (commuteMethod === 'bike' && priorities.includes('carbon')) {
    prompts.push(
      "Beyond biking: more carbon reduction ideas?",
      "What else can I do to reduce emissions?",
      "Additional carbon wins after biking?"
    );
  } else if (dietType === 'omnivore' && priorities.includes('carbon')) {
    prompts.push(
      "How can my food choices reduce carbon emissions?",
      "Low-carbon meal planning tips?",
      "Carbon-conscious eating habits?"
    );
  } else if (timeCommitment === 'high' && priorities.length > 2) {
    prompts.push(
      "Comprehensive sustainability projects I can tackle?",
      "How can I address multiple priorities with more time?",
      "Big-impact sustainability actions?"
    );
  } else if (commuteMethod === 'car' && dietType === 'vegetarian' && timeCommitment === 'moderate') {
    prompts.push(
      "How can I balance car commuting with my vegetarian lifestyle?",
      "Moderate-time sustainability actions for car-driving vegetarians?",
      "What sustainability wins fit my routine?"
    );
  }
  
  // If we have prompts from multi-factor, return them
  if (prompts.length >= 3) {
    return prompts.slice(0, 3);
  }
  
  // Commute-based prompts
  if (commuteMethod === 'car') {
    prompts.push(
      "How can I make my car commute more sustainable?",
      "What's the best way to reduce driving emissions?",
      "Should I try public transit? Help me plan."
    );
  } else if (commuteMethod === 'bus' || commuteMethod === 'train') {
    prompts.push(
      "How can I maximize my public transit sustainability?",
      "What else can I do beyond taking transit?",
      "Tips for sustainable commuting?"
    );
  } else if (commuteMethod === 'bike') {
    prompts.push(
      "You're already biking—what's next for sustainability?",
      "How can I make my bike commute even better?",
      "Beyond biking: other quick sustainability wins?"
    );
  } else if (commuteMethod === 'walk') {
    prompts.push(
      "Walking is great! What other sustainable habits can I build?",
      "How can I reduce my impact beyond transportation?",
      "Quick sustainability wins for walkers?"
    );
  } else if (commuteMethod === 'remote') {
    prompts.push(
      "Working from home eliminates commute emissions! What's next?",
      "How can I make my home office more sustainable?",
      "Remote work sustainability tips?"
    );
  }
  
  // Diet-based prompts
  if (dietType === 'omnivore' || !dietType) {
    prompts.push(
      "How can I reduce my food's environmental impact?",
      "What are the most sustainable food choices?",
      "Tips for sustainable meal planning?"
    );
  } else if (dietType === 'vegetarian') {
    prompts.push(
      "How can I reduce my food waste?",
      "What's the most sustainable way to shop for produce?",
      "Tips for a lower-impact vegetarian diet?"
    );
  } else if (dietType === 'vegan') {
    prompts.push(
      "Beyond being vegan: what else can I do?",
      "How can I reduce packaging waste in my vegan diet?",
      "Sustainable shopping tips for vegans?"
    );
  } else if (dietType === 'pescatarian') {
    prompts.push(
      "How can I make sustainable seafood choices?",
      "What's the environmental impact of my pescatarian diet?",
      "Tips for sustainable pescatarian meal planning?"
    );
  }
  
  // Time commitment-based prompts
  if (timeCommitment === 'minimal' || timeCommitment === '<30 min') {
    prompts.push(
      "What's the easiest sustainability win for me?",
      "Quick actions that fit my schedule?",
      "5-minute daily habits that matter?"
    );
  } else if (timeCommitment === 'moderate' || timeCommitment === '30-60 min') {
    prompts.push(
      "What sustainability actions fit my moderate schedule?",
      "30-minute weekly habits that make a difference?",
      "Balanced sustainability tips for busy people?"
    );
  } else if (timeCommitment === 'high' || timeCommitment === '1-2 hours') {
    prompts.push(
      "What bigger sustainability projects can I tackle?",
      "How can I make a significant impact with more time?",
      "Comprehensive sustainability actions for committed users?"
    );
  } else if (timeCommitment === 'very-high' || timeCommitment === '2+ hours') {
    prompts.push(
      "What major sustainability changes can I make?",
      "How can I transform my lifestyle sustainably?",
      "Deep-dive sustainability actions for dedicated users?"
    );
  }
  
  // Priority-based prompts
  if (priorities.includes('carbon') && priorities.length === 1) {
    prompts.push(
      "What are the biggest carbon reduction wins for me?",
      "How can I reduce my carbon footprint most effectively?",
      "Carbon-focused sustainability actions?"
    );
  } else if (priorities.includes('waste') && priorities.length === 1) {
    prompts.push(
      "How can I reduce my waste to zero?",
      "What's the best way to minimize my trash?",
      "Waste reduction strategies that work?"
    );
  } else if (priorities.includes('water') && priorities.length === 1) {
    prompts.push(
      "How can I conserve more water?",
      "What are the biggest water-saving opportunities?",
      "Water conservation tips for daily life?"
    );
  } else if (priorities.includes('energy') && priorities.length === 1) {
    prompts.push(
      "How can I reduce my energy consumption?",
      "What's the most effective way to lower my energy use?",
      "Energy efficiency tips for my home?"
    );
  } else if (priorities.length > 1 && priorities.length < 4) {
    const priorityNames = priorities.map(p => {
      const names = { carbon: 'climate', waste: 'waste', water: 'water', energy: 'energy' };
      return names[p] || p;
    });
    prompts.push(
      "How can I address multiple sustainability goals at once?",
      `What actions help with ${priorityNames[0]} and ${priorityNames[1]}?`,
      "Multi-impact sustainability strategies?"
    );
  } else if (priorities.length === 4 || priorities.includes('all')) {
    prompts.push(
      "How can I make a comprehensive sustainability impact?",
      "What actions address climate, waste, water, and energy?",
      "Holistic sustainability approach?"
    );
  }
  
  // Remove duplicates and return top 3
  const uniquePrompts = [...new Set(prompts)];
  return uniquePrompts.slice(0, 3);
}

