/**
 * UserProfile - Agent's Memory System
 * 
 * This class manages persistent user data and context for the agentic AI system.
 * It serves as the "memory" that allows the AI to understand user preferences,
 * track actions, learn from rejections, and personalize suggestions over time.
 * 
 * All data is persisted to localStorage for continuity across sessions.
 */

class UserProfile {
  /**
   * Initialize a new UserProfile with default values
   */
  constructor() {
    // Routine information about user's daily habits
    this.routine = {
      commuteMethod: null,      // "car" | "bus" | "bike" | "walk" | "remote"
      commuteTime: null,        // "8:30 AM" format
      dietType: null,           // "vegetarian" | "vegan" | "omnivore" | "pescatarian"
      shoppingDay: null,        // "Saturday" | "Sunday" etc.
      workSchedule: null        // "9-5" | "flexible" | "shift-work"
    };

    // User preferences for sustainability actions
    this.preferences = {
      budget: "medium",         // "low" | "medium" | "high"
      timeCommitment: "moderate", // "minimal" | "moderate" | "high"
      priorities: []            // Array like ["carbon", "waste", "water", "energy"]
    };

    // Historical data about actions and rejections
    this.history = {
      actions: [],              // Array of {action, date, success, feedback, impact}
      rejections: [],           // Array of {suggestion, reason, date}
      totalImpact: {
        co2: 0,                 // pounds
        water: 0,               // gallons
        waste: 0                // pounds
      }
    };

    // User identification and onboarding state
    this.userName = "";
    this.onboardingComplete = false;
    this.lastActive = null;     // ISO timestamp

    // Load existing data from storage on instantiation
    this.loadFromStorage();
  }

  /**
   * Load user profile data from localStorage
   * Safely parses JSON and merges with current instance
   * 
   * @returns {UserProfile} Returns this for method chaining
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem("sbUserProfile");
      if (!stored) {
        // No existing data - use defaults
        return this;
      }

      const parsed = JSON.parse(stored);
      
      // Merge stored data with current instance
      // This ensures we don't lose any new default properties
      if (parsed.routine) {
        this.routine = { ...this.routine, ...parsed.routine };
      }
      if (parsed.preferences) {
        this.preferences = { ...this.preferences, ...parsed.preferences };
      }
      if (parsed.history) {
        this.history = {
          actions: parsed.history.actions || [],
          rejections: parsed.history.rejections || [],
          totalImpact: {
            co2: parsed.history.totalImpact?.co2 || 0,
            water: parsed.history.totalImpact?.water || 0,
            waste: parsed.history.totalImpact?.waste || 0
          }
        };
      }
      if (parsed.userName !== undefined) {
        this.userName = parsed.userName;
      }
      if (parsed.onboardingComplete !== undefined) {
        this.onboardingComplete = parsed.onboardingComplete;
      }
      if (parsed.lastActive) {
        this.lastActive = parsed.lastActive;
      }
    } catch (error) {
      // Handle corrupted localStorage data gracefully
      console.error("Error loading user profile from storage:", error);
      // Continue with default values (already set in constructor)
    }

    return this;
  }

  /**
   * Save current profile state to localStorage
   * Updates lastActive timestamp before saving
   * 
   * @returns {boolean} True if save was successful, false otherwise
   */
  saveToStorage() {
    try {
      // Update last active timestamp before saving
      this.lastActive = new Date().toISOString();

      const dataToSave = {
        routine: this.routine,
        preferences: this.preferences,
        history: this.history,
        userName: this.userName,
        onboardingComplete: this.onboardingComplete,
        lastActive: this.lastActive
      };

      localStorage.setItem("sbUserProfile", JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      // Handle localStorage quota exceeded or other errors
      console.error("Error saving user profile to storage:", error);
      return false;
    }
  }

  /**
   * Clear all profile data and reset to defaults
   * Used for logout functionality
   * 
   * @returns {UserProfile} Returns this for method chaining
   */
  clearProfile() {
    // Reset to default values
    this.routine = {
      commuteMethod: null,
      commuteTime: null,
      dietType: null,
      shoppingDay: null,
      workSchedule: null
    };

    this.preferences = {
      budget: "medium",
      timeCommitment: "moderate",
      priorities: []
    };

    this.history = {
      actions: [],
      rejections: [],
      totalImpact: {
        co2: 0,
        water: 0,
        waste: 0
      }
    };

    this.userName = "";
    this.onboardingComplete = false;
    this.lastActive = null;

    // Remove from localStorage
    try {
      localStorage.removeItem("sbUserProfile");
      // Also clear chat history
      localStorage.removeItem("sbChatHistory");
    } catch (error) {
      console.error("Error clearing profile from storage:", error);
    }

    return this;
  }

  /**
   * Update routine information
   * Merges new data with existing routine without overwriting other fields
   * 
   * @param {Object} data - Object with routine fields to update
   * @returns {Object} Updated routine object
   */
  updateRoutine(data) {
    // Merge new data with existing routine
    this.routine = { ...this.routine, ...data };
    
    // Auto-save after update
    this.saveToStorage();
    
    return this.routine;
  }

  /**
   * Add a new action to history
   * Creates action record with impact estimation and updates total impact if successful
   * 
   * @param {string} action - Description of the action taken
   * @param {boolean} success - Whether the action was successful
   * @param {string} feedback - Optional feedback about the action
   * @param {Object} options - Optional parameters: { difficulty, impact }
   * @returns {Object} The created action record
   */
  addAction(action, success, feedback = "", options = {}) {
    // Use provided impact or estimate it
    const impact = options.impact || this.estimateImpact(action);
    
    const actionRecord = {
      action,
      date: new Date().toISOString(),
      success,
      feedback,
      impact,
      difficulty: options.difficulty || 'Medium'
    };

    this.history.actions.push(actionRecord);

    // Update total impact only if action was successful
    if (success) {
      this.history.totalImpact.co2 += impact.co2;
      this.history.totalImpact.water += impact.water;
      this.history.totalImpact.waste += impact.waste;
    }

    // Auto-save after adding action
    this.saveToStorage();

    return actionRecord;
  }

  /**
   * Add a rejection record when user declines a suggestion
   * Helps AI learn what doesn't work for this user
   * 
   * @param {string} suggestion - The suggestion that was rejected
   * @param {string} reason - Why the user rejected it
   * @returns {Object} The created rejection record
   */
  addRejection(suggestion, reason) {
    const rejectionRecord = {
      suggestion,
      reason,
      date: new Date().toISOString()
    };

    this.history.rejections.push(rejectionRecord);

    // Auto-save after adding rejection
    this.saveToStorage();

    return rejectionRecord;
  }

  /**
   * Generate formatted summary string for AI system prompt
   * Provides context about user for personalized suggestions
   * 
   * @returns {string} Multi-line formatted string with user context
   */
  getSummaryForAI() {
    const lines = [];

    // User name
    if (this.userName) {
      lines.push(`USER: ${this.userName}`);
    }

    // Routine information
    const routineParts = [];
    if (this.routine.commuteMethod && this.routine.commuteTime) {
      routineParts.push(`${this.routine.commuteMethod} at ${this.routine.commuteTime}`);
    } else if (this.routine.commuteMethod) {
      routineParts.push(this.routine.commuteMethod);
    }
    if (this.routine.dietType) {
      routineParts.push(`diet: ${this.routine.dietType}`);
    }
    if (this.routine.shoppingDay) {
      routineParts.push(`shops: ${this.routine.shoppingDay}`);
    }
    if (this.routine.workSchedule) {
      routineParts.push(`work: ${this.routine.workSchedule}`);
    }
    if (routineParts.length > 0) {
      lines.push(`ROUTINE: ${routineParts.join(", ")}`);
    }

    // Preferences
    if (this.preferences.priorities.length > 0) {
      lines.push(`PRIORITIES: ${this.preferences.priorities.join(", ")}`);
    }
    if (this.preferences.budget !== "medium") {
      lines.push(`BUDGET: ${this.preferences.budget}`);
    }
    if (this.preferences.timeCommitment !== "moderate") {
      lines.push(`TIME: ${this.preferences.timeCommitment}`);
    }

    // Recent successes
    const recentActions = this.getRecentActions(5);
    if (recentActions.length > 0) {
      const successActions = recentActions
        .filter(a => a.success)
        .map(a => a.action);
      if (successActions.length > 0) {
        lines.push(`RECENT SUCCESSES: ${successActions.join(", ")}`);
      }
    }

    // Recent rejections
    const recentRejections = this.getRecentRejections(3);
    if (recentRejections.length > 0) {
      const rejectionTexts = recentRejections.map(r => 
        `${r.suggestion} (${r.reason})`
      );
      lines.push(`RECENT REJECTIONS: ${rejectionTexts.join("; ")}`);
    }

    // Total impact
    const impactParts = [];
    if (this.history.totalImpact.co2 > 0) {
      impactParts.push(`${this.history.totalImpact.co2} lbs CO₂`);
    }
    if (this.history.totalImpact.water > 0) {
      impactParts.push(`${this.history.totalImpact.water} gal water`);
    }
    if (this.history.totalImpact.waste > 0) {
      impactParts.push(`${this.history.totalImpact.waste} lbs waste`);
    }
    if (impactParts.length > 0) {
      lines.push(`TOTAL IMPACT: ${impactParts.join(", ")} saved`);
    }

    return lines.join("\n");
  }

  /**
   * Check if user is new (hasn't completed onboarding)
   * 
   * @returns {boolean} True if onboarding is not complete
   */
  isNewUser() {
    return this.onboardingComplete === false;
  }

  /**
   * Get recent actions from history
   * 
   * @param {number} count - Number of recent actions to return (default: 5)
   * @returns {Array} Array of action records, sorted by date descending
   */
  getRecentActions(count = 5) {
    // Sort by date descending (most recent first)
    const sorted = [...this.history.actions].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    return sorted.slice(0, count);
  }

  /**
   * Get recent rejections from history
   * 
   * @param {number} count - Number of recent rejections to return (default: 3)
   * @returns {Array} Array of rejection records, sorted by date descending
   */
  getRecentRejections(count = 3) {
    // Sort by date descending (most recent first)
    const sorted = [...this.history.rejections].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    return sorted.slice(0, count);
  }

  /**
   * Calculate success rate percentage
   * 
   * @returns {number} Percentage of successful actions (0-100)
   */
  calculateSuccessRate() {
    if (this.history.actions.length === 0) {
      return 0;
    }

    const successful = this.history.actions.filter(a => a.success).length;
    return Math.round((successful / this.history.actions.length) * 100);
  }

  /**
   * Estimate environmental impact of an action
   * Uses keyword matching to provide rough estimates
   * 
   * @param {string} action - Description of the action
   * @returns {Object} Impact object with co2 (lbs), water (gal), waste (lbs)
   */
  estimateImpact(action) {
    const lowerAction = action.toLowerCase();

    // Transportation-related actions
    if (lowerAction.includes("public transit") || lowerAction.includes("bus") || lowerAction.includes("train")) {
      return { co2: 15, water: 0, waste: 0 };
    }
    if (lowerAction.includes("bike") || lowerAction.includes("cycling")) {
      return { co2: 0, water: 0, waste: 0 };
    }
    if (lowerAction.includes("walk") || lowerAction.includes("walking")) {
      return { co2: 0, water: 0, waste: 0 };
    }
    if (lowerAction.includes("carpool") || lowerAction.includes("ride share")) {
      return { co2: 10, water: 0, waste: 0 };
    }

    // Reusable items
    if (lowerAction.includes("reusable bag") || lowerAction.includes("reusable container")) {
      return { co2: 5, water: 0, waste: 2 };
    }
    if (lowerAction.includes("water bottle") || lowerAction.includes("reusable bottle")) {
      return { co2: 3, water: 0, waste: 1 };
    }

    // Diet-related actions
    if (lowerAction.includes("meatless") || lowerAction.includes("vegetarian meal") || lowerAction.includes("vegan meal")) {
      return { co2: 8, water: 50, waste: 0 };
    }
    if (lowerAction.includes("plant-based")) {
      return { co2: 10, water: 60, waste: 0 };
    }

    // Energy-related actions
    if (lowerAction.includes("led") || lowerAction.includes("energy efficient")) {
      return { co2: 5, water: 0, waste: 0 };
    }
    if (lowerAction.includes("unplug") || lowerAction.includes("power off")) {
      return { co2: 3, water: 0, waste: 0 };
    }

    // Waste reduction
    if (lowerAction.includes("compost")) {
      return { co2: 2, water: 0, waste: 5 };
    }
    if (lowerAction.includes("recycle")) {
      return { co2: 3, water: 0, waste: 3 };
    }

    // Default impact for unclassified actions
    return { co2: 2, water: 0, waste: 0 };
  }
}

// Create singleton instance and load from storage
const userProfile = new UserProfile();

// Export singleton instance
export default userProfile;

