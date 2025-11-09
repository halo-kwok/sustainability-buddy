# Agentic AI Behavior Plan
## Context-Aware Personalization Based on User Profile

This document outlines how the agentic AI adapts its behavior, suggestions, and prompts based on the user's profile data.

---

## Task 1: Context-Aware Quick Prompts

### Prompt Generation Logic

The AI generates 3 quick prompts based on the user's profile. Prompts are selected to be:
- **Relevant** to their current routine and preferences
- **Actionable** within their time constraints
- **Personalized** to their priorities and past actions
- **Encouraging** and non-judgmental

---

### Commute-Based Prompts

#### IF `commuteMethod === "car"`
1. "How can I make my car commute more sustainable?"
2. "What's the best way to reduce driving emissions?"
3. "Should I try public transit? Help me plan."

#### IF `commuteMethod === "bus"` OR `commuteMethod === "train"`
1. "How can I maximize my public transit sustainability?"
2. "What else can I do beyond taking transit?"
3. "Tips for sustainable commuting?"

#### IF `commuteMethod === "bike"`
1. "You're already biking—what's next for sustainability?"
2. "How can I make my bike commute even better?"
3. "Beyond biking: other quick sustainability wins?"

#### IF `commuteMethod === "walk"`
1. "Walking is great! What other sustainable habits can I build?"
2. "How can I reduce my impact beyond transportation?"
3. "Quick sustainability wins for walkers?"

#### IF `commuteMethod === "remote"`
1. "Working from home eliminates commute emissions! What's next?"
2. "How can I make my home office more sustainable?"
3. "Remote work sustainability tips?"

---

### Diet-Based Prompts

#### IF `dietType === "omnivore"` OR `dietType === null`
1. "How can I reduce my food's environmental impact?"
2. "What are the most sustainable food choices?"
3. "Tips for sustainable meal planning?"

#### IF `dietType === "vegetarian"`
1. "How can I reduce my food waste?"
2. "What's the most sustainable way to shop for produce?"
3. "Tips for a lower-impact vegetarian diet?"

#### IF `dietType === "vegan"`
1. "Beyond being vegan: what else can I do?"
2. "How can I reduce packaging waste in my vegan diet?"
3. "Sustainable shopping tips for vegans?"

#### IF `dietType === "pescatarian"`
1. "How can I make sustainable seafood choices?"
2. "What's the environmental impact of my pescatarian diet?"
3. "Tips for sustainable pescatarian meal planning?"

---

### Time Commitment-Based Prompts

#### IF `timeCommitment === "minimal"` OR `timeCommitment === "<30 min"`
1. "What's the easiest sustainability win for me?"
2. "Quick actions that fit my schedule?"
3. "5-minute daily habits that matter?"

#### IF `timeCommitment === "moderate"` OR `timeCommitment === "30-60 min"`
1. "What sustainability actions fit my moderate schedule?"
2. "30-minute weekly habits that make a difference?"
3. "Balanced sustainability tips for busy people?"

#### IF `timeCommitment === "high"` OR `timeCommitment === "1-2 hours"`
1. "What bigger sustainability projects can I tackle?"
2. "How can I make a significant impact with more time?"
3. "Comprehensive sustainability actions for committed users?"

#### IF `timeCommitment === "very-high"` OR `timeCommitment === "2+ hours"`
1. "What major sustainability changes can I make?"
2. "How can I transform my lifestyle sustainably?"
3. "Deep-dive sustainability actions for dedicated users?"

---

### Priority-Based Prompts

#### IF `priorities.includes("carbon")` AND `priorities.length === 1`
1. "What are the biggest carbon reduction wins for me?"
2. "How can I reduce my carbon footprint most effectively?"
3. "Carbon-focused sustainability actions?"

#### IF `priorities.includes("waste")` AND `priorities.length === 1`
1. "How can I reduce my waste to zero?"
2. "What's the best way to minimize my trash?"
3. "Waste reduction strategies that work?"

#### IF `priorities.includes("water")` AND `priorities.length === 1`
1. "How can I conserve more water?"
2. "What are the biggest water-saving opportunities?"
3. "Water conservation tips for daily life?"

#### IF `priorities.includes("energy")` AND `priorities.length === 1`
1. "How can I reduce my energy consumption?"
2. "What's the most effective way to lower my energy use?"
3. "Energy efficiency tips for my home?"

#### IF `priorities.length > 1` AND `priorities.length < 4`
1. "How can I address multiple sustainability goals at once?"
2. "What actions help with {priority1} and {priority2}?"
3. "Multi-impact sustainability strategies?"

#### IF `priorities.length === 4` OR `priorities.includes("all")`
1. "How can I make a comprehensive sustainability impact?"
2. "What actions address climate, waste, water, and energy?"
3. "Holistic sustainability approach?"

---

### Combined Profile Prompts (Multi-Factor)

#### IF `commuteMethod === "car"` AND `timeCommitment === "minimal"`
1. "Quick ways to make my car commute greener?"
2. "5-minute car sustainability improvements?"
3. "Easy wins for drivers with limited time?"

#### IF `commuteMethod === "car"` AND `priorities.includes("carbon")`
1. "How can I reduce my car's carbon footprint?"
2. "What's the most effective way to cut driving emissions?"
3. "Carbon-focused car commute improvements?"

#### IF `dietType === "vegetarian"` AND `priorities.includes("waste")`
1. "How can I reduce food waste in my vegetarian diet?"
2. "Zero-waste vegetarian shopping tips?"
3. "Waste reduction for vegetarians?"

#### IF `timeCommitment === "minimal"` AND `priorities.includes("carbon")`
1. "Quick carbon reduction wins?"
2. "5-minute actions that cut my carbon footprint?"
3. "Fastest ways to reduce my emissions?"

#### IF `commuteMethod === "remote"` AND `priorities.includes("energy")`
1. "How can I reduce my home office energy use?"
2. "Energy-efficient remote work tips?"
3. "Sustainable home office practices?"

#### IF `dietType === "vegan"` AND `timeCommitment === "moderate"`
1. "Moderate-time sustainability actions for vegans?"
2. "30-minute vegan sustainability habits?"
3. "Balanced vegan sustainability approach?"

#### IF `commuteMethod === "bike"` AND `priorities.includes("carbon")`
1. "Beyond biking: more carbon reduction ideas?"
2. "What else can I do to reduce emissions?"
3. "Additional carbon wins after biking?"

#### IF `dietType === "omnivore"` AND `priorities.includes("carbon")`
1. "How can my food choices reduce carbon emissions?"
2. "Low-carbon meal planning tips?"
3. "Carbon-conscious eating habits?"

#### IF `timeCommitment === "high"` AND `priorities.length > 2`
1. "Comprehensive sustainability projects I can tackle?"
2. "How can I address multiple priorities with more time?"
3. "Big-impact sustainability actions?"

#### IF `commuteMethod === "car"` AND `dietType === "vegetarian"` AND `timeCommitment === "moderate"`
1. "How can I balance car commuting with my vegetarian lifestyle?"
2. "Moderate-time sustainability actions for car-driving vegetarians?"
3. "What sustainability wins fit my routine?"

---

### Fallback Prompts (When Profile Data is Missing)

#### IF `userName === ""` OR `onboardingComplete === false`
1. "What should I know about your sustainability goals?"
2. "How can I help you get started?"
3. "What's your biggest sustainability challenge?"

#### IF `routine === null` OR `preferences === null`
1. "Let's set up your profile for personalized suggestions!"
2. "What sustainability areas interest you most?"
3. "How can I tailor my advice to you?"

---

## Task 2: Proactive Suggestion Timing

### Time-Based Suggestion Triggers

#### Morning Suggestions (6 AM - 12 PM)
- **IF** `commuteMethod === "car"` AND `commuteTime` includes "AM"
  - Suggest: "Consider carpooling or public transit today"
  - Suggest: "Plan your route to minimize driving"
- **IF** `commuteMethod === "bike"` OR `commuteMethod === "walk"`
  - Suggest: "Great day for active commuting!"
  - Suggest: "Check weather and plan your route"

#### Afternoon Suggestions (12 PM - 5 PM)
- **IF** `shoppingDay` matches current day
  - Suggest: "Remember reusable bags for shopping"
  - Suggest: "Plan sustainable shopping list"
- **IF** `dietType === "vegetarian"` OR `dietType === "vegan"`
  - Suggest: "Meal prep for sustainable eating"
  - Suggest: "Plan plant-based meals for the week"

#### Evening Suggestions (5 PM - 10 PM)
- **IF** `priorities.includes("energy")`
  - Suggest: "Turn off lights and unplug devices"
  - Suggest: "Energy-saving evening routine"
- **IF** `timeCommitment === "minimal"`
  - Suggest: "Quick 5-minute sustainability action"
  - Suggest: "Easy evening habit to build"

#### Weekend Suggestions (Saturday/Sunday)
- **IF** `shoppingDay === "Saturday"` OR `shoppingDay === "Sunday"`
  - Suggest: "Sustainable shopping day tips"
  - Suggest: "Plan your shopping trip sustainably"
- **IF** `timeCommitment === "high"` OR `timeCommitment === "very-high"`
  - Suggest: "Weekend sustainability project ideas"
  - Suggest: "Bigger actions you can tackle this weekend"

---

## Task 3: Suggestion Personalization Rules

### Rule 1: Respect Past Rejections
- **IF** user rejected suggestion X with reason Y
- **THEN** don't suggest similar actions
- **EXAMPLE:** If rejected "electric car" because "too expensive"
  - Don't suggest: "hybrid car", "EV charging", "car upgrade"
  - Do suggest: "carpooling", "public transit", "bike for short trips"

### Rule 2: Build on Successes
- **IF** user successfully completed action X
- **THEN** suggest related or next-level actions
- **EXAMPLE:** If completed "used public transit"
  - Suggest: "Try public transit 2x per week"
  - Suggest: "Explore bike + transit combination"
  - Suggest: "Plan transit routes for errands"

### Rule 3: Match Time Commitment
- **IF** `timeCommitment === "minimal"`
- **THEN** only suggest actions < 30 minutes
- **IF** `timeCommitment === "moderate"`
- **THEN** suggest actions 30-60 minutes
- **IF** `timeCommitment === "high"`
- **THEN** suggest actions 1-2 hours
- **IF** `timeCommitment === "very-high"`
- **THEN** suggest comprehensive projects

### Rule 4: Align with Priorities
- **IF** `priorities.includes("carbon")`
- **THEN** prioritize carbon-reducing actions
- **IF** `priorities.includes("waste")`
- **THEN** prioritize waste-reduction actions
- **IF** `priorities.length === 1`
- **THEN** focus 80% of suggestions on that priority
- **IF** `priorities.length > 1`
- **THEN** balance suggestions across priorities

### Rule 5: Consider Budget Constraints
- **IF** `preferences.budget === "low"`
- **THEN** avoid expensive suggestions (EVs, solar panels, major upgrades)
- **THEN** focus on free/low-cost actions
- **IF** `preferences.budget === "high"`
- **THEN** can suggest investment-level actions

### Rule 6: Routine Integration
- **IF** `commuteMethod === "car"` AND `commuteTime === "8:30 AM"`
- **THEN** suggest commute-related actions around 8 AM
- **IF** `shoppingDay === "Saturday"`
- **THEN** suggest shopping-related actions on Fridays/Saturdays
- **IF** `dietType === "vegetarian"`
- **THEN** suggest meal-related actions aligned with meal times

---

## Task 4: Conversation Tone and Style Adaptation

### Based on Success Rate

#### IF `successRate < 30%` (Struggling)
- **Tone:** More encouraging, supportive
- **Style:** Suggest easier wins
- **Language:** "Let's try something simpler", "Small steps matter"
- **Frequency:** More frequent check-ins

#### IF `successRate >= 30%` AND `successRate < 70%` (Moderate)
- **Tone:** Balanced, supportive
- **Style:** Mix of easy and moderate actions
- **Language:** "You're making progress", "Let's build on this"
- **Frequency:** Regular suggestions

#### IF `successRate >= 70%` (Excelling)
- **Tone:** Celebratory, challenging
- **Style:** Suggest more ambitious actions
- **Language:** "You're crushing it!", "Ready for the next level?"
- **Frequency:** Can suggest more frequently

### Based on User Experience Level

#### IF `totalActions < 3` (New User)
- **Tone:** Welcoming, educational
- **Style:** Explain why actions matter
- **Language:** "Here's why this helps", "This is a great starting point"

#### IF `totalActions >= 3` AND `totalActions < 10` (Learning)
- **Tone:** Supportive, building momentum
- **Style:** Reference past successes
- **Language:** "You've done X, now try Y", "Building on your success"

#### IF `totalActions >= 10` (Experienced)
- **Tone:** Collaborative, advanced
- **Style:** Suggest complex, multi-impact actions
- **Language:** "You're ready for", "Advanced sustainability strategies"

---

## Task 5: Suggestion Generation Algorithm

### Step-by-Step Process

1. **Load User Profile**
   - Get routine, preferences, history, priorities

2. **Check Context**
   - Current time, day of week
   - Recent actions (last 7 days)
   - Recent rejections (last 30 days)

3. **Filter Suggestions**
   - Remove suggestions similar to recent rejections
   - Prioritize actions matching user priorities
   - Filter by time commitment
   - Filter by budget constraints

4. **Rank Suggestions**
   - Higher rank for actions matching multiple profile factors
   - Higher rank for actions building on past successes
   - Lower rank for actions similar to rejections
   - Consider time of day and routine alignment

5. **Generate Personalized Suggestion**
   - Use top-ranked action type
   - Personalize message with user's name and context
   - Explain why this suggestion fits their profile
   - Estimate impact based on their priorities

6. **Format Response**
   - Friendly, encouraging tone
   - Specific and actionable
   - Reference their routine/preferences
   - Include impact estimates

---

## Implementation Notes

### Quick Prompts Generation Function

```javascript
function generateQuickPrompts(userProfile) {
  const prompts = [];
  
  // Commute-based prompts
  if (userProfile.routine.commuteMethod === 'car') {
    prompts.push(...carPrompts);
  } else if (userProfile.routine.commuteMethod === 'bus') {
    prompts.push(...transitPrompts);
  }
  // ... etc
  
  // Combine with other factors
  // Return top 3 most relevant prompts
  return prompts.slice(0, 3);
}
```

### Suggestion Generation Priority Matrix

| Factor | Weight | Impact |
|--------|--------|--------|
| Matches priorities | 40% | High |
| Fits time commitment | 25% | High |
| Builds on success | 20% | Medium |
| Avoids rejections | 10% | Medium |
| Routine alignment | 5% | Low |

---

## Example Scenarios

### Scenario 1: Alex Chen (Demo Profile)
- **Profile:** Car commute, vegetarian, moderate time, carbon/waste priorities
- **Quick Prompts:**
  1. "How can I make my car commute more sustainable?"
  2. "What are the biggest carbon reduction wins for me?"
  3. "How can I reduce my food waste?"
- **Suggestion Focus:** Car alternatives, carbon reduction, waste reduction
- **Tone:** Supportive, building on vegetarian success

### Scenario 2: New User (Minimal Profile)
- **Profile:** Just completed onboarding, no actions yet
- **Quick Prompts:**
  1. "What's the easiest sustainability win for me?"
  2. "Quick actions that fit my schedule?"
  3. "How can I get started?"
- **Suggestion Focus:** Easy wins, educational
- **Tone:** Welcoming, encouraging

### Scenario 3: Experienced User
- **Profile:** 15+ completed actions, 80% success rate
- **Quick Prompts:**
  1. "What advanced sustainability actions can I tackle?"
  2. "How can I make a bigger impact?"
  3. "Comprehensive sustainability strategies?"
- **Suggestion Focus:** Complex, multi-impact actions
- **Tone:** Challenging, collaborative

---

## Summary

The agentic AI adapts its behavior across multiple dimensions:
- **Quick Prompts:** Generated based on commute, diet, time, priorities
- **Suggestion Timing:** Aligned with user's routine and time of day
- **Suggestion Content:** Filtered by rejections, built on successes
- **Tone & Style:** Adjusted based on success rate and experience level
- **Personalization:** Every interaction references user's specific profile

This creates a truly personalized, adaptive AI coach that learns and grows with each user.

---

## Task 2: Sample Chat Conversations

### Conversation 1: Follow-up on Past Action

**User Profile:** Alex Chen - Car commute, vegetarian, moderate time, carbon/waste priorities

**Conversation:**

**User:** "What should I focus on today?"

**AI:** "Hey Alex! I noticed you took the bus last Tuesday—nice work! You saved 15 lbs of CO₂. Want to make it a twice-weekly habit? Today's a good day since your afternoon meeting got cancelled (more flexibility). The 22 line runs every 15 minutes during your usual commute window."

**User:** "Yeah, but it takes longer..."

**AI:** "Totally fair. It adds about 20 minutes. But here's something I learned about you: you successfully completed actions when they had a side benefit. Remember you liked using bus time for podcasts? That 20 minutes could be 'you time' instead of traffic stress. Worth trying once more to see if it clicks?"

**User:** "Okay, you're right. I'll try it."

**AI:** "Awesome! I'll check in tomorrow to see how it went. And hey—if it doesn't work out, no pressure. We'll find something else that fits better. You're doing great either way! 🌱"

---

### Conversation 2: Learning from Rejection

**User Profile:** Sarah - Remote work, vegan diet, minimal time, all priorities

**Conversation:**

**User:** "Any suggestions for today?"

**AI:** "Hi Sarah! Since you're working from home today, I was thinking about your energy use. I know you mentioned last month that smart thermostats were too expensive—totally get it. But what about something simpler? Your home office gets afternoon sun, right? A small desk fan uses way less energy than AC and costs under $20. Plus, you can take it with you if you move."

**User:** "Hmm, maybe. But I'm not sure it'll help much."

**AI:** "Fair point! Here's the math: running a fan uses about 50 watts vs 3,500 watts for AC. For your 8-hour workday, that's about 0.4 kWh vs 28 kWh. At your energy rates, that's roughly $0.05 vs $3.50 per day. Over a summer month, that's about $100 saved. And since you care about energy AND budget, this hits both. Want me to find some good options under $25?"

**User:** "Actually, that makes sense. Send me some links?"

**AI:** "Perfect! I'll send you 3 highly-rated options that fit your budget. Also, since you're vegan and care about waste, I noticed you've been doing great with meal prep. Want a quick tip for reducing food packaging waste while you're at it?"

**User:** "Sure!"

**AI:** "Awesome! Since you shop on Sundays, try bringing your own containers to the bulk section. Your local co-op has great bulk options for grains, nuts, and even some produce. It cuts down on plastic bags and often saves money too. Plus, it aligns with your zero-waste goals! 🌱"

---

### Conversation 3: Time-Based Routine Integration

**User Profile:** Marcus - Bike commute, omnivore diet, high time commitment, carbon priority

**Conversation:**

**User:** "What's up?"

**AI:** "Hey Marcus! It's Saturday morning—perfect timing! I know you usually shop on Saturdays, and you've been crushing it with your bike commute (5 days this week—amazing!). Since you have more time on weekends and you're focused on carbon reduction, want to try something new?"

**User:** "What did you have in mind?"

**AI:** "Meal prep for the week! Here's why it fits you: You bike to work, which is great, but your lunch options near the office are limited and often packaged. Prepping 3-4 meals on Sunday means you can bring low-carbon, plant-forward lunches. Plus, you mentioned wanting to try more vegetarian meals—this is a perfect way to ease into it without committing to full vegetarianism."

**User:** "I'm not much of a cook though..."

**AI:** "No worries! I'm thinking simple: grain bowls. Cook rice or quinoa once, roast some veggies, add beans or tofu. Takes maybe 90 minutes on Sunday, and you're set for the week. Since you have 1-2 hours available, this fits your schedule. And here's the kicker: you already successfully meal-prepped snacks last month, so you've got the habit foundation. Want me to send you a super simple recipe to start?"

**User:** "Yeah, that sounds doable. Send it over."

**AI:** "Perfect! I'll send you a 3-recipe starter pack—all under 30 minutes prep time each. And since you're already biking, this adds another carbon win. You're building a really solid sustainability routine, Marcus! 🚴‍♂️"

---

### Conversation 4: Building on Success Streak

**User Profile:** Jamie - Walk commute, vegetarian diet, moderate time, waste/water priorities

**Conversation:**

**User:** "How am I doing?"

**AI:** "Jamie, you're on fire! 🎉 You've completed 8 actions in the last 2 weeks with a 100% success rate. That's incredible! You've saved 42 lbs of CO₂, 120 gallons of water, and reduced 8 lbs of waste. Your walking commute + vegetarian diet combo is really working."

**User:** "Thanks! What's next?"

**AI:** "Since you're crushing it and you have moderate time available, I think you're ready for something a bit bigger. You've mastered the basics—reusable bags, meatless meals, walking. Now let's tackle water waste. I noticed you mentioned wanting to reduce water use, and you have a small apartment, right?"

**User:** "Yeah, why?"

**AI:** "Perfect setup for a simple upgrade! Low-flow showerheads are super easy to install (literally 5 minutes), cost about $20, and can save 2,700 gallons per year. That's huge for your water priority. Plus, since you've been so successful with quick wins, this is a natural next step. Want me to find some highly-rated options that work for renters?"

**User:** "I'm renting though—can I even install that?"

**AI:** "Great question! Most landlords are fine with it (it actually saves them money on water bills), but you can always swap it back when you move. Or, even simpler: there are water-saving shower timers that just stick on—no installation needed. They help you cut shower time, which saves water AND energy. Since you care about both waste and water, this is a double win. Interested?"

**User:** "The timer sounds easier. Let's try that."

**AI:** "Smart choice! I'll send you some options. And Jamie—seriously, you're doing amazing. Your consistency is inspiring. Keep it up! 💪"

---

### Conversation 5: New User Guidance

**User Profile:** Taylor - Just completed onboarding, no actions yet, car commute, omnivore diet, minimal time, carbon priority

**Conversation:**

**User:** "I'm new here. What should I do first?"

**AI:** "Hey Taylor! Welcome! 👋 I'm so excited to be your sustainability coach. I just learned about your routine—you drive to work, eat a regular diet, and have limited time. Perfect! Let's start with something super easy that fits your life."

**User:** "Okay, what's that?"

**AI:** "Since you drive and care about carbon emissions, here's the easiest win: check your tire pressure. Under-inflated tires can increase fuel consumption by 3-4%, which means more emissions. Takes 2 minutes at a gas station, costs nothing, and you can do it anytime. Plus, it'll save you money on gas too!"

**User:** "That's it? Just tire pressure?"

**AI:** "Yep! Small actions add up, and I want to set you up for success. You've got limited time, so let's start with quick wins. Once you see how easy this is, we'll build from there. No pressure, no judgment—just one small step at a time. Sound good?"

**User:** "Sure, I can do that."

**AI:** "Awesome! Try it this week and let me know how it goes. And Taylor—everyone starts somewhere. You're already here, which means you care. That's the most important part. We'll figure out what works for YOU, not some generic advice. You've got this! 🌱"

**User:** "Thanks! What else can I do?"

**AI:** "Great question! Since you have minimal time, let me suggest one more quick win: when you're at the store this week, grab a reusable water bottle if you don't have one. It's a one-time purchase, and every time you use it instead of buying plastic bottles, you're reducing waste AND saving money. Plus, it fits your carbon priority since plastic production is carbon-intensive. Two birds, one stone!"

**User:** "I actually already have one, I just forget to use it."

**AI:** "Perfect! You're already ahead of the game. Here's a simple trick: put it right next to your keys or in your car. Out of sight, out of mind—so keep it visible! And since you drive, keeping it in your car means it's always there when you need it. Small habit tweak, big impact over time. Want me to check in next week to see how it's going?"

**User:** "Yes, that would be helpful!"

**AI:** "Perfect! I'll send you a reminder. And remember—progress, not perfection. Every small action matters. You're building habits that will last, and I'm here to support you every step of the way! 💚"

---

## Conversation Analysis

### Key Personalization Elements Demonstrated

1. **Conversation 1 (Follow-up):**
   - References specific past action (bus on Tuesday)
   - Knows user's schedule (cancelled meeting)
   - References past success pattern (side benefits)
   - Empathetic to concerns
   - Provides specific details (bus line, frequency)

2. **Conversation 2 (Learning from Rejection):**
   - Acknowledges past rejection (smart thermostat)
   - Offers alternative that addresses rejection reason (cost)
   - Provides concrete math/impact
   - Connects to multiple priorities (energy + budget)
   - Builds on existing success (meal prep)

3. **Conversation 3 (Time-Based):**
   - Uses time context (Saturday morning)
   - References routine (Saturday shopping)
   - Celebrates recent success (5 days biking)
   - Matches suggestion to time commitment (high)
   - References past successful habit (snack prep)

4. **Conversation 4 (Building on Success):**
   - Celebrates success streak
   - Provides specific stats
   - Suggests next-level action
   - Considers living situation (apartment)
   - Offers alternatives (showerhead vs timer)
   - Maintains encouraging tone

5. **Conversation 5 (New User):**
   - Welcoming and supportive
   - Starts with easiest possible action
   - Explains why (educational)
   - Sets expectations (no pressure)
   - Builds confidence
   - Offers follow-up support
   - Progressive suggestion (second action)

### Common Patterns Across Conversations

- **Specificity:** Always provides concrete details, not vague advice
- **Empathy:** Acknowledges concerns and constraints
- **Learning:** References past actions, successes, and rejections
- **Context-Aware:** Uses time, routine, and schedule information
- **Encouraging:** Celebrates progress and maintains positive tone
- **Flexible:** Offers alternatives when user has concerns
- **Actionable:** Every suggestion is specific and doable

---

## Task 3: Action Extraction Implementation

### Overview
After the AI suggests an action in chat, the system automatically detects it and prompts the user to add it to their Action Tracker.

### Implementation Details

#### 1. Action Detection (`checkForActionableSuggestion`)
- Detects action keywords: `try`, `do`, `take`, `use`, `switch`, `start`, `begin`, `consider`, `suggest`, `recommend`, `action`, `bring`, `buy`, `install`, `replace`, `reduce`, `cut`, `save`
- Checks for imperative sentences starting with action verbs
- Filters for specific suggestions (under 300 characters) vs general advice

#### 2. Action Extraction (`extractActionDetails`)
- Uses AI to extract structured action details from the AI response
- Extracts:
  - **Action title**: Concise, trackable description (e.g., "Bring lunch from home (2x this week)")
  - **Difficulty**: Easy | Medium | Hard
  - **Impact**: CO₂ (lbs), water (gallons), waste (lbs)
  - **Timing**: When to check in (e.g., "in 1 week", "on Saturday", "in 3 days")
- Falls back to simple extraction if AI parsing fails

#### 3. User Prompt UI
When an action is detected, displays:
- **Prompt**: "💡 I heard you mention an action. Want me to track this for you?"
- **Action card** showing:
  - Action title (bold)
  - Difficulty badge (color-coded: Easy=green, Medium=yellow, Hard=red)
  - Impact metrics (CO₂, water, waste if applicable)
- **Action buttons**:
  - "Yes, add it!" (primary green button)
  - "No, just talking" (secondary button)

#### 4. Action Storage
- Adds action to `userProfile.history.actions` with:
  - Action title
  - Difficulty level
  - Impact estimates
  - Status: `success: false` (not completed yet)
  - Source: "From chat conversation"
- Action appears in Action Tracker under "Active" tab

#### 5. Confirmation Message
After adding action, displays:
- "Added! I'll check in about this [TIMING]. You can mark it complete in your Action Tracker when you're done! 🌱"
- Timing is personalized based on action type (e.g., "in 1 week", "on Saturday")

### Example Flows

#### Example 1: "Bring lunch from home"
**AI says:** "Try bringing lunch from home twice this week"

**Extracted:**
- Action: "Bring lunch from home (2x this week)"
- Difficulty: Easy
- Impact: 6 lbs CO₂
- Timing: "in 1 week"

**User sees:**
```
💡 I heard you mention an action. Want me to track this for you?

Bring lunch from home (2x this week)
[Easy] 6 lbs CO₂

[Yes, add it!] [No, just talking]
```

**After clicking "Yes, add it!":**
```
Added! I'll check in about this in 1 week. You can mark it complete in your Action Tracker when you're done! 🌱
```

#### Example 2: "Buy local produce"
**AI says:** "Next time you shop, buy local produce"

**Extracted:**
- Action: "Buy local produce on Saturday"
- Difficulty: Medium
- Impact: 4 lbs CO₂
- Timing: "on Saturday"

**User sees:**
```
💡 I heard you mention an action. Want me to track this for you?

Buy local produce on Saturday
[Medium] 4 lbs CO₂

[Yes, add it!] [No, just talking]
```

**After clicking "Yes, add it!":**
```
Added! I'll check in about this on Saturday. You can mark it complete in your Action Tracker when you're done! 🌱
```

### Technical Implementation

#### Files Modified:
1. **`src/pages/Chat.jsx`**
   - Enhanced `checkForActionableSuggestion()` with more keywords and imperative detection
   - Added `extractActionDetails()` function using AI extraction
   - Updated `handleSend()` to extract action details after AI response
   - Enhanced action prompt UI with difficulty badges and impact metrics
   - Updated `handleAddAction()` to pass extracted details to userProfile
   - Added `handleDismissAction()` for dismissing prompts

2. **`src/utils/userProfile.js`**
   - Updated `addAction()` to accept optional `options` parameter
   - Stores `difficulty` and uses provided `impact` if available
   - Falls back to `estimateImpact()` if no impact provided

#### State Management:
- `showActionPrompt`: Stores extracted action details
  ```javascript
  {
    message: string,      // Original AI response
    action: string,       // Extracted action title
    difficulty: string,  // "Easy" | "Medium" | "Hard"
    impact: {            // Impact estimates
      co2: number,
      water: number,
      waste: number
    },
    timing: string       // Check-in timing
  }
  ```

### Benefits
1. **Seamless Integration**: Actions flow directly from chat to tracker
2. **Accurate Extraction**: AI-powered extraction ensures proper formatting
3. **Rich Metadata**: Difficulty and impact stored for better tracking
4. **Personalized Timing**: Check-in reminders based on action type
5. **User Control**: Users can dismiss if they're just discussing, not committing

### Future Enhancements
- Allow users to edit extracted action details before adding
- Support for recurring actions (e.g., "every Monday")
- Integration with calendar for timing-based reminders
- Batch action extraction from longer conversations

