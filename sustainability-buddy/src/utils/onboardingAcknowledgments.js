/**
 * Onboarding Acknowledgments
 * 
 * Predefined acknowledgments for each onboarding step based on user responses.
 * These provide consistent, personalized feedback without requiring AI calls.
 */

/**
 * Get acknowledgment for name step
 */
export function getNameAcknowledgment(name) {
  return `Nice to meet you, ${name}! I'm excited to be your sustainability buddy. Let's learn about your routine so I can give you advice that actually fits YOUR life.`;
}

/**
 * Get acknowledgment for commute method
 */
export function getCommuteAcknowledgment(method) {
  const acknowledgments = {
    'car': "Got it, you drive to work. No judgment here! Lots of people do. Later, we can explore ways to make your commute more sustainable when it makes sense for you.",
    'bus': "Love it! You're already making a sustainable choice. I'll help you build on that foundation.",
    'train': "Love it! You're already making a sustainable choice. I'll help you build on that foundation.",
    'bike': "Awesome! Biking is such a great way to stay active while reducing your carbon footprint. You're off to a strong start!",
    'walk': "Walking to work? That's fantastic! You're already doing something amazing for both your health and the planet.",
    'remote': "Working from home eliminates your commute entirely—that's a huge win! We can focus on other areas where you can make an impact."
  };
  return acknowledgments[method] || acknowledgments['car'];
}

/**
 * Get acknowledgment for commute time
 */
export function getCommuteTimeAcknowledgment(time) {
  // Parse time to determine if it's morning, mid-morning, or afternoon
  const hourMatch = time.match(/(\d+):?(\d+)?\s*(AM|PM)/i);
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const period = hourMatch[3]?.toUpperCase();
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    if (hour < 9) {
      return "Thanks for sharing! Knowing your schedule helps me suggest actions at the right times. Morning routines are perfect for building sustainable habits.";
    } else if (hour < 11) {
      return "Perfect timing noted! I'll make sure my suggestions work with your schedule and don't add stress to your day.";
    }
  }
  return "Got it! I'll keep your schedule in mind when suggesting actions. Sustainability should fit into your life, not complicate it.";
}

/**
 * Get acknowledgment for diet type
 */
export function getDietAcknowledgment(dietType) {
  const acknowledgments = {
    'omnivore': "Understood! I'll suggest food-related actions that work for any diet. There are plenty of sustainable choices regardless of what you eat.",
    'vegetarian': "Great choice! A vegetarian diet already has a lower environmental footprint. I'll help you find even more ways to reduce your impact.",
    'vegan': "Amazing! A vegan lifestyle is one of the most impactful choices for the planet. I'll help you discover additional sustainability wins beyond your diet.",
    'pescatarian': "Nice! A pescatarian diet balances nutrition with sustainability. I'll suggest actions that complement your dietary choices."
  };
  return acknowledgments[dietType] || acknowledgments['omnivore'];
}

/**
 * Get acknowledgment for shopping day
 */
export function getShoppingDayAcknowledgment(day) {
  const acknowledgments = {
    'Saturday': "Weekend shopping—perfect! I'll remind you to bring reusable bags and make sustainable choices when you're out on Saturdays.",
    'Sunday': "Sunday shopping noted! I'll help you plan sustainable shopping trips and make the most of your weekend errands.",
    'Weekday': "Weekday shopping works! I'll suggest quick, sustainable shopping tips that fit into your busy schedule.",
    'flexible': "Flexible shopping schedule—that gives us lots of options! I'll suggest sustainable shopping practices you can use anytime."
  };
  return acknowledgments[day] || acknowledgments['flexible'];
}

/**
 * Get acknowledgment for environmental concerns/priorities
 */
export function getPrioritiesAcknowledgment(priorities) {
  if (priorities.includes('all') || priorities.length === 4) {
    return "You care about everything—I love that! We'll tackle sustainability from all angles. Every action counts, and together we'll make a real difference.";
  }
  
  if (priorities.length === 1) {
    const single = {
      'carbon': "Climate change is a huge concern, and I'm here to help. We'll focus on reducing your carbon footprint with actions that make a real difference.",
      'waste': "Waste reduction is so important! I'll help you cut down on single-use items and find creative ways to reduce, reuse, and recycle.",
      'water': "Water conservation matters! I'll suggest practical ways to reduce your water usage without sacrificing comfort.",
      'energy': "Energy efficiency is key! I'll help you find ways to reduce your energy consumption and lower both your bills and your impact."
    };
    return single[priorities[0]] || single['carbon'];
  }
  
  // Multiple priorities
  const priorityNames = priorities.map(p => {
    const names = {
      'carbon': 'climate',
      'waste': 'waste',
      'water': 'water',
      'energy': 'energy'
    };
    return names[p] || p;
  });
  return `Great priorities! Focusing on ${priorityNames.join(' and ')} gives us a clear direction. I'll suggest actions that address multiple areas at once.`;
}

/**
 * Get acknowledgment for time commitment
 */
export function getTimeCommitmentAcknowledgment(commitment) {
  const acknowledgments = {
    'minimal': "Quick wins are perfect! I'll focus on simple, fast actions that fit into your busy schedule. Small steps lead to big changes.",
    '<30 min': "Quick wins are perfect! I'll focus on simple, fast actions that fit into your busy schedule. Small steps lead to big changes.",
    'moderate': "Moderate time commitment—that's realistic! I'll suggest actions that give you meaningful impact without overwhelming your schedule.",
    '30-60 min': "Moderate time commitment—that's realistic! I'll suggest actions that give you meaningful impact without overwhelming your schedule.",
    'high': "An hour or two a week is great! I'll suggest more involved actions that can make a bigger impact, like meal prep or home improvements.",
    '1-2 hours': "An hour or two a week is great! I'll suggest more involved actions that can make a bigger impact, like meal prep or home improvements.",
    'very-high': "You're ready to dive deep! I'll suggest comprehensive sustainability actions that can transform your lifestyle. Your commitment will make a huge difference.",
    '2+ hours': "You're ready to dive deep! I'll suggest comprehensive sustainability actions that can transform your lifestyle. Your commitment will make a huge difference."
  };
  return acknowledgments[commitment] || acknowledgments['moderate'];
}

/**
 * Get completion message
 */
export function getCompletionMessage() {
  return "Perfect! I've got everything I need to be your personalized sustainability coach. Let's start making a difference together! 🌱";
}

