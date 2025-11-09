```
Configure Tailwind CSS for this project with the following requirements:

1. Update tailwind.config.js to:
   - Set content paths to: ["./index.html", "./src/**/*.{js,jsx}"]
   - Add a mobile-first theme with custom colors for sustainability:
     * Primary green: #10B981 (green-500)
     * Secondary blue: #3B82F6 (blue-500)
     * Accent amber: #F59E0B (amber-500)
   - Add custom container utilities for mobile-first responsive design:
     * Default container with padding and max-width
     * Mobile max-width: 100%
     * Tablet max-width: 768px
     * Desktop max-width: 1024px

2. Update src/index.css to include:
   - All three Tailwind directive layers (@tailwind base, components, utilities)
   - Custom base styles for smooth scrolling
   - Mobile-optimized font sizes and line heights

3. Add mobile-first utility classes:
   - Safe area insets for mobile devices
   - Touch-friendly tap target sizes (minimum 44px)
   - Smooth transitions for interactive elements

Ensure the configuration prioritizes mobile viewport (375px-428px) as the primary design target, with responsive scaling for larger screens.

Create src/utils/userProfile.js with a UserProfile class that manages persistent user data and context for the agentic AI system:

CLASS STRUCTURE:

1. Properties (initialize in constructor):
   - routine: {
       commuteMethod: null,      // "car" | "bus" | "bike" | "walk" | "remote"
       commuteTime: null,        // "8:30 AM" format
       dietType: null,           // "vegetarian" | "vegan" | "omnivore" | "pescatarian"
       shoppingDay: null,        // "Saturday" | "Sunday" etc.
       workSchedule: null        // "9-5" | "flexible" | "shift-work"
     }
   - preferences: {
       budget: "medium",         // "low" | "medium" | "high"
       timeCommitment: "moderate", // "minimal" | "moderate" | "high"
       priorities: []            // Array like ["carbon", "waste", "water", "energy"]
     }
   - history: {
       actions: [],              // Array of {action, date, success, feedback, impact}
       rejections: [],           // Array of {suggestion, reason, date}
       totalImpact: {
         co2: 0,                 // pounds
         water: 0,               // gallons
         waste: 0                // pounds
       }
     }
   - userName: ""
   - onboardingComplete: false
   - lastActive: null            // ISO timestamp

2. Required Methods:

   loadFromStorage()
   - Retrieves data from localStorage key "sbUserProfile"
   - Parses JSON safely with try-catch
   - If no data exists, returns default empty profile
   - If data exists, merges with current instance
   - Returns this for chaining

   saveToStorage()
   - Stringifies current profile state
   - Saves to localStorage key "sbUserProfile"
   - Updates lastActive to current timestamp
   - Includes error handling
   - Returns boolean success status

   updateRoutine(data)
   - Takes object with routine fields to update
   - Merges new data with existing routine (don't overwrite other fields)
   - Calls saveToStorage() automatically
   - Returns updated routine object

   addAction(action, success, feedback = "")
   - Creates action record: {action, date: new Date().toISOString(), success, feedback, impact: estimateImpact(action)}
   - Pushes to history.actions array
   - If success, updates totalImpact stats
   - Calls saveToStorage()
   - Returns the action record

   addRejection(suggestion, reason)
   - Creates rejection record: {suggestion, reason, date: new Date().toISOString()}
   - Pushes to history.rejections array
   - Calls saveToStorage()
   - Returns the rejection record

   getSummaryForAI()
   - Returns formatted multi-line string for GPT-4.1-mini's system prompt
   - Include: userName, all routine fields, preferences, recent successes (last 5), recent rejections (last 3), totalImpact stats
   - Format example:
     "USER: Alex Chen
      COMMUTE: car at 8:30 AM
      DIET: vegetarian
      PRIORITIES: carbon, waste
      RECENT SUCCESSES: [list actions]
      RECENT REJECTIONS: [list with reasons]
      TOTAL IMPACT: 23 lbs CO2, 45 gal water saved"
   - Handle null/empty values gracefully

   isNewUser()
   - Returns true if onboardingComplete === false
   - Used to trigger onboarding flow

3. Helper Methods (add these too):

   getRecentActions(count = 5)
   - Returns last N actions from history.actions
   - Sorted by date descending

   getRecentRejections(count = 3)
   - Returns last N rejections from history.rejections
   - Sorted by date descending

   calculateSuccessRate()
   - Returns percentage of successful actions from history
   - Formula: (successful actions / total actions) * 100
   - Returns 0 if no actions yet

   estimateImpact(action)
   - Simple helper that estimates impact based on action keywords
   - Return object: {co2: number, water: number, waste: number}
   - Examples:
     * "public transit" → {co2: 15, water: 0, waste: 0}
     * "reusable bags" → {co2: 5, water: 0, waste: 2}
     * "meatless meal" → {co2: 8, water: 50, waste: 0}
   - Default: {co2: 2, water: 0, waste: 0}

EXPORT:
- Create singleton instance: const userProfile = new UserProfile();
- Call loadFromStorage() on instantiation
- Export as default: export default userProfile;

COMMENTS:
- Add JSDoc comments for each method explaining parameters and return values
- Include inline comments explaining the "why" for complex logic
- Add comment at top of file explaining this is the "agent's memory system"

ERROR HANDLING:
- Wrap localStorage operations in try-catch
- Log errors to console but don't crash
- Gracefully handle corrupted localStorage data

Make this production-ready with comprehensive error handling and clear documentation.
```
